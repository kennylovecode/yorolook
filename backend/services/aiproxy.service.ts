import { Context, Errors } from "moleculer";
import createService from "./base";
import axios from "axios";
import fs from "fs";
import { config as MJConfig } from "../common/config/MJ.config"
import path from "path";
import CHAT302Processor from "../common/processor/CHAT302.processor";
import { config as CHATConfig } from "../common/config/CHAT.config"
import { config as FLUXConfig } from "../common/config/FLUX.config"
import { config as WFConfig } from "../common/config/WORKFLOW.config"
import FLUXRPProcessor from "../common/processor/FLUXRP.processor";

const service = createService("aigc");

service.actions = {
	...service.actions,
	WORKFLOW_submit: {
		rest: "POST /wf/submit",
		auth: true,
		params: {
			title: { type: "string" },
			type: { type: "string" },
			method: { type: "string" },
			params: { type: "any" },
		},
		handler: async function (ctx: any) {
			/** 配置不存在 */
			if (!WFConfig) return new Errors.MoleculerClientError("error.ConfigNotExist")
			const { title, type, method, params } = ctx.params
			/** 任务处理器不存在 */
			if (!fs.existsSync(`common/processor/${type}.processor.ts`)) return new Errors.MoleculerClientError("ProcessorNotExist")
			/** 模型 */
			if (!params.model) return new Errors.MoleculerClientError("error.ModelNotExist")
			const model = WFConfig.models.find(x=> x.name===params.model)
			if (!model) return new Errors.MoleculerClientError("error.ModelNotExist")
			if (model.cost < 0) return new Errors.MoleculerClientError("error.ActionOrMethodNotExist")

			/** 钱包扣费 */
			const walletRes = await this.broker.call('account.consum', {
				type: MJConfig.cost_type,
				value: -model.cost,
				title,
				remark: `参数：${JSON.stringify(ctx.params)}`
			}, { meta: ctx.meta });

			/** 创建任务 */
			const taskRes = await this.broker.call('task.create', {
				title: ctx.params.title,
				type: `${ctx.params.type}`,
				method: ctx.params.method,
				params: {
					...ctx.params.params,
					consum: walletRes.id
				},
				priority: 0
			}, { meta: ctx.meta });

			return taskRes
		}
	},
	MJ_submit: {
		rest: "POST /mj/submit",
		auth: true,
		params: {
			title: { type: "string" },
			type: { type: "string" },
			method: { type: "string" },
			params: { type: "any" },
		},
		handler: async function (ctx: any) {
			/** 配置不存在 */
			if (!MJConfig) return new Errors.MoleculerClientError("error.ConfigNotExist")
			const { title, type, method, params } = ctx.params
			/** 任务处理器不存在 */
			if (!fs.existsSync(`common/processor/${type}.processor.ts`)) return new Errors.MoleculerClientError("ProcessorNotExist")
			/** 模型 */
			if (!params.model || MJConfig.models.indexOf(params.model) < 0) return new Errors.MoleculerClientError("error.ModelNotExist")

			/** 费用 */
			const cost = MJConfig.getCost(params.model, method, params.action || "");

			if (cost < 0) return new Errors.MoleculerClientError("error.ActionOrMethodNotExist")

			/** 钱包扣费 */
			const walletRes = await this.broker.call('account.consum', {
				type: MJConfig.cost_type,
				value: -cost,
				title,
				remark: `参数：${JSON.stringify(ctx.params)}`
			}, { meta: ctx.meta });

			/** 创建任务 */
			const taskRes = await this.broker.call('task.create', {
				title: ctx.params.title,
				type: `${ctx.params.type}`,
				method: ctx.params.method,
				params: {
					...ctx.params.params,
					consum: walletRes.id
				},
				priority: 0
			}, { meta: ctx.meta });

			return taskRes
		}
	},
	FLUX_submit: {
		rest: "POST /flux/submit",
		auth: true,
		params: {
			title: { type: "string" },
			type: { type: "string" },
			method: { type: "string" },
			params: { type: "any" },
		},
		handler: async function (ctx: any) {
			/** 配置不存在 */
			if (!FLUXConfig) return new Errors.MoleculerClientError("error.ConfigNotExist")
			const { title, type, method, params } = ctx.params
			/** 任务处理器不存在 */
			if (!fs.existsSync(`common/processor/${type}.processor.ts`)) return new Errors.MoleculerClientError("error.ProcessorNotExist")
			/** 模型 */
			const model = FLUXConfig.models.find(x => x.name === params.model)

			if (!model) return new Errors.MoleculerClientError("error.ModelNotExist")
			/** 费用 */

			if (model.cost < 0)
				model.cost = 0

			/** 钱包扣费 */
			const walletRes = await this.broker.call('account.consum', {
				type: model.cost_type,
				value: -model.cost,
				title,
				remark: `参数：${JSON.stringify(ctx.params)}`
			}, { meta: ctx.meta });

			/** 创建任务 */
			const taskRes = await this.broker.call('task.create', {
				title: ctx.params.title,
				type: `${ctx.params.type}`,
				method: ctx.params.method,
				params: {
					...ctx.params.params,
					consum: walletRes.id
				},
				priority: 0
			}, { meta: ctx.meta });

			return taskRes
		}
	},
	WF_fetch: {
		rest: "POST /wf/fetch",
		auth: true,
		params: {
			type: "string",
			taskId: "string",
			jobId: "string",
		},
		async handler(ctx: Context<{ type: string, taskId: string, jobId: string }, any>) {
			let { taskId, type, jobId } = ctx.params
			
			if(!jobId){
				const task = await this.broker.call("task._get", {
					id: taskId
				})

				if(task.status>0){
					jobId = task.result?.id || ""
				}

				if(!jobId){
					return task
				}
			}

			/** 任务处理器不存在 */
			if (!fs.existsSync(`common/processor/${type}.processor.ts`)) return new Errors.MoleculerClientError("ProcessorNotExist")
			
			const processor = await import(path.resolve(`common/processor/${type}.processor.ts`))
			/** 请求任务结果 */
			const fetchRes = await processor.default[`${type}_fetch`](jobId);
			if(fetchRes.percentCompleted===100)
			{
				return await this.broker.call("task.updateMyTasks", {
					id: taskId, data: {
						...fetchRes,
						status: 255
					}
				}, { meta: ctx.meta })
			}
			if (fetchRes.errCode) {
				return await this.broker.call("task.updateMyTasks", {
					id: taskId, data: {
						...fetchRes,
						status: 254
					}
				}, { meta: ctx.meta })
			}
			return {
				status: fetchRes.errCode ? 254 : 1,
				result: fetchRes
			}
		}
	},
	fetch: {
		rest: "POST /fetch",
		auth: true,
		params: {
			type: "string",
			taskId: "string",
			jobId: "string"
		},
		async handler(ctx: Context<{ type: string, taskId: string, jobId: string }, any>) {
			const { taskId, type, jobId } = ctx.params
			
			/** 任务处理器不存在 */
			if (!fs.existsSync(`common/processor/${type}.processor.ts`)) return new Errors.MoleculerClientError("ProcessorNotExist")
			
				
			const processor = await import(path.resolve(`common/processor/${type}.processor.ts`))
			/** 请求任务结果 */
			const fetchRes = await processor.default[`${type}_fetch`](jobId);
			
			if (fetchRes.data.progress && fetchRes.data.progress.indexOf('100') === 0) {
				return await this.broker.call("task.updateMyTasks", {
					id: taskId, data: {
						...fetchRes.data,
						status: 255
					}
				}, { meta: ctx.meta })
			}
			if (fetchRes.status === "FAILED") {
				return await this.broker.call("task.updateMyTasks", {
					id: taskId, data: {
						...fetchRes.data,
						progress: 100,
						status: 254
					}
				}, { meta: ctx.meta })
			}
			return {
				status: fetchRes.status === "FAILED" ? 254 : 1,
				result: fetchRes.data
			}
		}
	},
	config: {
		rest: "POST /config",
		params: {
			type: "string"
		},
		handler: async function (ctx: any) {
			if (fs.existsSync(`common/config/${ctx.params.type}.config.ts`)) {
				const { config } = await import(`../common/config/${ctx.params.type}.config.ts`)
				return {
					...config
				}
			}
			return {}
		}
	},
	chat: {
		rest: "POST /chat",
		auth: true,
		params: {
			model: { type: "string" },
			messages: { type: "array", optional: true },
		},
		handler: async function (ctx: any) {
			const model = CHATConfig.models.find(x => x.name === ctx.params.model)
			if (!model) return new Errors.MoleculerClientError("model not found")

			/** 创建任务 */
			const qChatRes = await this.broker.call('account_chat.create', {
				from_account_uuid: ctx.meta.user.id,
				from_name: ctx.meta.user.username,
				to_account_uuid: "",
				model: ctx.params.model,
				messages: ctx.params.messages,
				content: ctx.params.messages[ctx.params.messages.length - 1].content,
			}, { meta: ctx.meta });

			if (ctx.meta.user[model.cost_type] <= 0) return new Errors.MoleculerClientError("余额不足...")

			const data = await CHAT302Processor.CHAT302({
				...ctx.params,
				user: ctx.meta.user.id
			})
			let total_fee = 0;
			if (data.id && data.choices?.length > 0) {
				const { total_tokens } = data.usage
				let walletRes
				if (model.cost > 0) {
					total_fee = parseInt(total_tokens) * model.cost

					total_fee = total_fee > 1 ? total_fee : 1
					/** 钱包扣费 */
					walletRes = this.broker.call('account.consum', {
						type: model.cost_type,
						value: -total_fee,
						title: `AI智聊【${ctx.params.model}】`,
						remark: `参数：${JSON.stringify(ctx.params)}`
					}, { meta: ctx.meta });
				}

				let saveMessage = []
				data.choices.map(c => {
					saveMessage.push(c.message)
				})
				/** 创建任务 */
				const aChatRes = await this.broker.call('account_chat.create', {
					from_account_uuid: "",
					from_name: "",
					to_account_uuid: ctx.meta.user.id,
					model: model.name,
					model_reply: data,
					messages: saveMessage,
					content: saveMessage[saveMessage.length - 1].content,
					status: 1
				}, { meta: ctx.meta });
				this.broker.call('account_chat.success', {
					id: qChatRes.id
				}, { meta: ctx.meta })
				return {
					q: {
						...qChatRes.dataValues,
						status: 1
					},
					a: aChatRes,
					total_fee
				}
			}
			return new Errors.MoleculerClientError("error.Unknown")
		}
	},
	rechat: {
		rest: "POST /rechat",
		auth: true,
		params: {
			id: "string"
		},
		handler: async function (ctx: any) {
			const chatRes = await this.broker.call("account_chat.recreate", {
				id: ctx.params.id,
				from_account_uuid: ctx.meta.user.id
			}, { meta: ctx.meta });
			const model = CHATConfig.models.find(x => x.name === chatRes.model)
			if (!model) return new Errors.MoleculerClientError("model not found")
			if (ctx.meta.user[model.cost_type] <= 0) return new Errors.MoleculerClientError("余额不足...")

			const data = await CHAT302Processor.CHAT302({
				model: chatRes.model,
				messages: chatRes.messages,
				user: ctx.meta.user.id
			})
			let total_fee = 0;
			if (data.id && data.choices?.length > 0) {
				const { total_tokens } = data.usage
				let walletRes
				if (model.cost > 0) {
					total_fee = parseInt(total_tokens) * model.cost
					total_fee = total_fee > 1 ? total_fee : 1
					/** 钱包扣费 */
					walletRes = this.broker.call('account.consum', {
						type: model.cost_type,
						value: -total_fee,
						title: `AI智聊【${model.name}】`,
						remark: `参数：${JSON.stringify(ctx.params)}`
					}, { meta: ctx.meta });
				}
				let saveMessage = []
				data.choices.map(c => {
					saveMessage.push(c.message)
				})
				/** 创建任务 */
				const aChatRes = await this.broker.call('account_chat.create', {
					from_account_uuid: "",
					from_name: "",
					to_account_uuid: ctx.meta.user.id,
					model: model.name,
					model_reply: data,
					messages: saveMessage,
					content: saveMessage[saveMessage.length - 1].content,
					status: 1
				}, { meta: ctx.meta });
				const qChatRes = await this.broker.call('account_chat.success', {
					id: ctx.params.id
				}, { meta: ctx.meta })
				return {
					q: qChatRes,
					a: aChatRes,
					total_fee
				}
			}
			return new Errors.MoleculerClientError("error.Unknown")
		}
	},
	fanyi: {
		rest: "POST /fanyi",
		params: {
			content: "string",
			lang: {
				type: "string",
				optional: true,
			}
		},
		async handler(ctx){
			const res = await CHAT302Processor.CHATFY(ctx.params.content);
			
			return res.choices[0].message.content
		}
	}
}

export default service;
