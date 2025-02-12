// services/resque.service.ts
const { Queue, Worker,MultiWorker } = require('node-resque');
const { createClient } = require('redis');
import createDbServiceMixin from "../mixins/db.mixin";
import { model } from "../models/entities/taskPublish";
import { createParams, updateParams, listParams } from '../models/dtos/taskPublish';
import { QueueServiceSchema } from '../models/types';
import { Op } from 'sequelize';
import { createProcessor } from '../common/publish.processor';
import { Context, Errors } from "moleculer";

const redisHost = { host: "127.0.0.1", port: 6379 }

const startedHook = async function(){
	try {
		/**
		 * 初始化Redis客户端并启动队列和工作程序
		 */
		const client = createClient(redisHost);
		await client.connect(); // 先确保Redis客户端连接成功

		// 初始化队列
		this.queue = new Queue({
			connection: { client },
			timeout: 5000 // 添加超时设置
		});
		const processor = createProcessor(this.broker);
		console.log(processor)
		// 初始化worker并绑定事件处理
		this.worker = new Worker({ connection: { client } , queues: ["ProcessDownload"] },processor);
		// 使用箭头函数简化事件处理
		this.worker.on("success", async (...args) => await this.completedTask(...args));
		this.worker.on("failure", async (...args) => await this.failureTask(...args));
		this.worker.on("error", (error) => {
			console.error("Worker error:", error);
		});

		// 按顺序启动服务
		try {
			await this.queue.connect();
			await this.worker.connect();
			await this.worker.start();

			console.log("Worker started successfully, enqueueing publish tasks...");
			await this.enqueue();
		} catch (err) {
			console.error("Failed to start worker:", err);
			throw err;
		}
	} catch (error) {
		console.error("error starting worker:", error);
	}
}

const service: QueueServiceSchema = {
    name: 'task_publish',
	mixins:[createDbServiceMixin(model)],
    started: startedHook,
	methods:{
		async enqueue(){
			try
			{
				/// 获取发布任务列表
				if (!this.adapter) {
					throw new Error('Adapter not initialized');
				}

				const taskPublishList = await this.adapter.find({
					query: {
						status: {
							[Op.lte]: 1,
							[Op.gte]: 0
						}
					},
					sort: ["-status","created_at"],
					limit: 20
				});

				if (!taskPublishList || taskPublishList.length === 0) {
					console.error("tasks all done... retry after 10s")
					setTimeout(async ()=>{
						await this.enqueue()
					}, 10000)
					return;
				}

				this.taskCount = taskPublishList.length;
				this.taskCompletedCount = 0
				console.log(`start enqueue ${this.taskCount} ...`)
				// 更新任务状态为 "执行中"
				await Promise.all(taskPublishList.map(async (task) => {
					await this.adapter.updateById(task.id, {
						$set: { status: 1 }
					});
					await this.queue.enqueue('ProcessDownload', "download", task)
					console.log(`task ${task.title} is enqueue to worker ....`)
				}));
			}catch(error){
				console.log(error)
			}
		},
		async completedTask(queue, job, result, duration){
			const taskPublish = job.args[0];
			const images = result;
			if(images.length <= 0) return
			const cover = images[0]

			// 更新发布任务的图片和封面
			await this.adapter.updateById(taskPublish.id, {
				$set: {
					images,
					cover,
					status: 255, // 更新状态为完成
				}
			});

			this.taskCompletedCount++;
			if (this.taskCount > 0 && this.taskCompletedCount >= this.taskCount) {
				// 触发任务执行
				await this.enqueue();
			}
			console.log(result)
		},
		async failureTask(queue, job, failure, duration){
			console.log(failure)
		}
	},
    actions: {
        create: {
			rest: "POST /create",
			auth: true,
			params: createParams,
            async handler(ctx: Context<any,any>) {
				try {
					// 获取任务
					const task = await this.broker.call("task.get", { id: ctx.params.task_id },{ meta: ctx.meta });
					if(!task) return new Errors.MoleculerClientError("Task not found");
					const images = task.result?.images || [];
					if (task.status != 255) return new Errors.MoleculerClientError("Task is not completed");
					if (images.length === 0) return new Errors.MoleculerClientError("Task has no images");

					const directory = await this.broker.call("dir.makeDir", {
						title: ctx.params.title,
						parent_uuid: "",
						channel_relation: "task_" + task.id,
						payment_limit: ctx.params.cost,
						payment_type: ctx.params.cost_type
					 },{ meta: ctx.meta });
					let cover = images[0]
					if(task.type==='WORKFLOW')
						cover = images[0].previewPath
					// 创建发布任务
					const taskPublish = await this.adapter.insert({
						task_id: task.id,
						account_uuid: ctx.meta.user.id,
						directory_uuid: directory.id,
						cover,
						images: images,
					});
					return taskPublish;
				} catch (error) {
					console.error("Error creating taskPublish:", error);
					return new Errors.MoleculerServerError("Failed to create taskPublish");
				}
            },
        },
		update: {
			rest: "POST /update",
			auth: true,
			params: updateParams,
			async handler(ctx: Context<any,any>) {
				try {
					const result = await this.adapter.updateById(ctx.params.id, {
						$set: ctx.params
					});
					return result;
				} catch (error) {
					console.error("Error updating taskPublish:", error);
					return new Errors.MoleculerServerError("Failed to update taskPublish");
				}
			}
		},
        list: {
            rest: "POST /list",
            auth: true,
            params: listParams,
            async handler(ctx: Context<any, any>) {
                try {
					const { idx = 1, size = 40, status = -1 } = ctx.params;
                    let query = {
                        account_uuid: ctx.meta.user.id,
                        ...ctx.params.query
                    };
                    if (status >= 0) {
                        query.status = status;
                    }
                    const options = {
                        limit: size,
                        offset: (idx - 1) * size,
                        sort: ["-created_at"]
                    };
                    const result = await this.adapter.find({ query, ...options });

                    if (!result || result.length === 0) {
                        return [];
                    }

                    const accountIds = result.map(item => item.account_uuid);
                    const taskIds = result.map(item => item.task_id);

                    // Call accountProfile service to get account profiles
                    const accountProfiles = await this.broker.call("account_profile._list", {
                        query: { account_uuid: { [Op.in]: accountIds } }
                    });

                    // Call task service to get tasks
                    const tasks = await this.broker.call("task._list", {
                        query: { id: { [Op.in]: taskIds } }
                    });

                    // Call directory service to get directories
                    const directories = await this.broker.call("dir._list", {
                        query: { channel_relation: { [Op.in]: taskIds.map(id => "task_" + id) } }
                    });

                    // Combine results
                    const combinedResult = result.map(item => {
                        const accountProfile = accountProfiles.find(profile => profile.account_uuid === item.account_uuid);
                        const task = tasks.find(t => t.id === item.task_id);
                        const directory = directories.find(dir => dir.channel_relation === "task_" + item.task_id);
                        return {
                            ...item.dataValues,
                            user: accountProfile.dataValues,
                            task: task.dataValues,
                            directory: directory.dataValues
                        };
                    });

                    return combinedResult;
                } catch (error) {
                    console.error("Error listing taskPublish:", error);
                    return new Errors.MoleculerServerError("Failed to list taskPublish");
                }
            }
        },
    },
};

export default service;
