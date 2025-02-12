// services/resque.service.ts
const { Queue, Worker,MultiWorker } = require('node-resque');
const { createClient } = require('redis');
import createDbServiceMixin from "../mixins/db.mixin";
import { model } from "../models/entities/task";
import { createParams, listParams, pushParams } from '../models/dtos/task';
import { QueueServiceSchema } from '../models/types';
import { Op } from 'sequelize';
import { processor } from '../common/task.processor';
import wss from '../common/websocket.processor';
import { Context, Errors } from "moleculer";
import path from "path";
import axios from "axios";

const redisHost = { host: "127.0.0.1", port: 6379 }

const startedHook = async function(){
	try {
		/**
		 * 启动websocket队列状态通知处理
		 */
		wss.startWs()

		/**
		 * 启动队列和工作程序
		 */
		const client = createClient(redisHost);
		this.queue = new Queue({ connection: { client } });

		this.worker = new Worker({ connection: { client }, queues: ["ProcessTask"] }, processor);
		this.worker.on("success", async (queue, job, result, duration)=>{
			await this.completedTask(queue, job, result, duration)
		});
		this.worker.on("failure", async (queue, job, result, duration)=>{
			await this.failureTask(queue, job, result, duration)
		});
		await this.queue.connect(); // 确保连接
		await this.worker.connect();
		await this.worker.start();
		console.log("worker started ... enqueue task ...");

		this.enqueue();
	} catch (error) {
		console.error("error starting worker:", error);
	}
}

const service: QueueServiceSchema = {
    name: 'task',
	mixins:[createDbServiceMixin(model)],
    started: startedHook,
	methods:{
		async enqueue(){
			try
			{
				const tasks = await this.adapter?.find({
					query: {
						status: {
							[Op.lte]: 1,
							[Op.gte]: 0
						}
					},
					sort: ["-status","-priority","created_at"],
					limit: 20
				})

				if (tasks.length === 0) {
					//console.error("tasks all done... retry after 10s")
					setTimeout(async ()=>{
						await this.enqueue()
					}, 10000)
					return;
				}
				this.taskCount = tasks.length;
				this.taskCompletedCount = 0
				console.log(`start enqueue ${this.taskCount} ...`)
				// 更新任务状态为 "执行中"
				await Promise.all(tasks.map(async (task) => {
					const taskRes = await this.adapter?.updateById(task.id, {
						$set: { status: 1 }
					});
					wss.notifyClient(task.account_uuid, {
						type: "task",
						data: taskRes
					});
					/* 调用的方法名称构成  */
					const methodCall = `${task.type}_${task.method}`
					await this.queue.enqueue('ProcessTask', methodCall, task)
					console.log(`task ${task.title} is enqueue to worker ....`)
				}));
			}catch(error){
				console.log(error)
			}
		},
		async completedTask(queue, job, result, duration){
			const task = job.args[0]
			console.log(`Completed task: ${task.title}`, result);
			// 更新任务状态为 "完成"
			const taskRes=await this.adapter?.updateById(task.id, { $set: { status: 255, result, duration } });
			this.taskCompletedCount++;
			wss.notifyClient(task.account_uuid, {
				type: "task",
				data: taskRes
			});
			if (this.taskCount>0 && this.taskCompletedCount >= this.taskCount) {
				/// 触发任务执行
				await this.enqueue();
			}
		},
		async failureTask(queue, job, failure, duration){
			const task = job.args[0]
			console.log(`failure task: ${task.title}`, failure);

			const taskRes=await this.adapter?.updateById(task.id, { $set: { status: 254, errors: failure, duration } });
			this.taskCompletedCount++;
			wss.notifyClient(task.account_uuid, {
				type: "task",
				data: taskRes
			});
			if (this.taskCount>0 && this.taskCompletedCount >= this.taskCount) {
				/// 触发任务执行
				await this.enqueue();
			}
		}
	},
    actions: {
		get: {
			rest: "GET /:id",
			auth: true,
			params: { id: "uuid" },
			async handler(ctx: Context<{ id: string }, any>) {
				const model = await this.adapter.findById(ctx.params.id)
				if (model && (model.account_uuid === ctx.meta.user.id || ctx.meta.user.manage)) {
					return model
				}
				return {}
			}
		},
		_list:{
			params: {
				query: {
					type: "object",
					optional: true,
				}
			},
			async handler(ctx: Context<any, any>){
				const { query } = ctx.params;
				if(query){
					const dbSet = await this.adapter.find({
						query
					});
					return dbSet;
				}
				return []
			}
		},
		_get: {
			params: { id: "uuid" },
			async handler(ctx: Context<{ id: string }, any>) {
				const model = await this.adapter.findById(ctx.params.id)
				return model
			}
		},
        create: {
			rest: "POST /create",
			auth: true,
			params: createParams,
            async handler(ctx) {
				if(ctx.params.method === 'MJ_action')
				{
					const dbSet = await this.adapter.find({
						query: {
							account_uuid: ctx.meta.user.id,
							method: ctx.params.method,
							params: ctx.params.params
						}
					})
					if(dbSet.length>0) {
						const task = dbSet[0]
						await this.adapter.updateById(task.id,{
							$set: {
								duration: task.duration+1
							}
						})
						return task
					}
				}
				const res = await this.adapter.insert({
					account_uuid: ctx.meta.user.id,
					...ctx.params
				});
				return res
            },
        },
		myTasks:{
			rest: "POST /my",
			auth: true,
			params: listParams,
			async handler(ctx) {
				const { idx, size, status } = ctx.params;
				const query = {
					account_uuid: ctx.meta.user.id
				}
				if(status>=0){
					Object.assign(query,{ status })
				}
				const dbSet = await this.adapter.find({
					query,
					sort: ["-updated_at"],
					limit: size,
					offset: (idx - 1) * size,
				})
				const total = await this.adapter.count({
					query
				})
				return {
					list: dbSet,
					total
				}
			}
		},
		updateMyTasks: {
			auth: true,
			params: {
				id: "string",
				data: "object"
			},
			async handler(ctx) {
				const task = await this.adapter.findById(ctx.params.id)
				if(task.account_uuid!==ctx.meta.user.id) return new Errors.MoleculerClientError("Permission denied")
				let { data } = ctx.params
				if (data?.images && task.type==='WORKFLOW') {
					const configImport = await import(path.resolve(`common/config/${task.type}.config.ts`))
					const model = configImport.config.models.find(x => x.name === task.params.model)
					if (model && model.sort_images) {
						data.images = model.sort_images(data?.images)
					}
				}

				return await this.adapter.updateById(ctx.params.id,{
					$set: {
						result: data,
						status: data.status
					}
				})
			}
		},
		recreate: {
			rest: "POST /create",
			params: {
				id: "string",
				replace: "boolean"
			},
			async handler(ctx){
				const dbSet = await this.adapter.find({
					query: {
						account_uuid: ctx.meta.user.id,
						id: ctx.params.id
					}
				})
				if (dbSet.length > 0) {
					const task = dbSet[0]
					if(ctx.params.replace)
					{
						return await this.adapter.updateById(task.id, {
							$set: {
								duration: 0,
								status: 0,
								result: null,
							}
						})
					}else{
						const newTask = {
							title: task.title,
							method: task.method,
							params: task.params,
							priority: task.priority,
							account_uuid: ctx.meta.user.id
						}
						return await this.adapter.insert(newTask)
					}
				}
				return new Errors.MoleculerClientError("errors.TaskNotExist")
			}
		},
		cancel: {
			rest: "POST /cancel",
			auth: true,
			params: {
				id: { type: "string" },
			},
			handler: async function(ctx: any){
				const taskRes = await this.adapter.findById(ctx.params.id)
				if(taskRes.account_uuid !== ctx.meta.user.id) return new Errors.MoleculerClientError("error.NoPermission")
				if(taskRes.status !== 254) return new Errors.MoleculerClientError("error.NoRefundCondition")
				if(taskRes.status < 0) return taskRes
				if(!taskRes.params.consum) {
					const task = await this.adapter.find(ctx.params.id)
					/// 将退款的记录添加到任务中
					const taskCanceled = await this.adapter.updateById(task.id,{
						$set: {
							status: -1,
							params: {
								...task.params,
							}
						}
					})
					return taskCanceled
				}
				/* 消费 */
				const walletRes = await this.broker.call('account_wallet.get', {
					id: taskRes.params.consum
				},{ meta: ctx.meta });
				if(walletRes.account_uuid !== ctx.meta.user.id) return new Errors.MoleculerClientError("error.NoPermission")
				if(walletRes.value<0){
					const refundWallet = await this.broker.call('account.consum', {
						type: walletRes.type,
						value: Math.abs(walletRes.value),
						title: "取消任务退费",
						remark: "消费ID: "+ walletRes.id +" 任务ID：" + taskRes.id
					},{ meta: ctx.meta });
					/// 将退款的记录添加到任务中
					const taskCanceled = await this.adapter.updateById(taskRes.id,{
						$set: {
							status: -1,
							params: {
								...taskRes.params,
								refund: refundWallet.id
							}
						}
					})
					return taskCanceled
				}
				return new Errors.MoleculerClientError("error.RefundFailed")
			}
		},
		push: {
			rest: "POST /push",
			params: pushParams,
			async handler(ctx: Context<any,any>){
				const res = await this.adapter.insert({
					account_uuid: ctx.meta.user.id,
					...ctx.params
				});
				return res
			}
		}
    },
};

export default service;
