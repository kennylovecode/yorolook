import { Errors, type Context } from "moleculer";
import { Op } from "sequelize";
import { approveParams, createParams,listParams } from "../models/dtos/accountRequest";
import createService from "./base";

const service = createService("accountRequest");

service.actions = {
	...service.actions,
	/** 提交申请 */
	doPost: {
		rest: "POST /",
		params: createParams,
		auth: true,
		async handler(ctx: Context<typeof createParams, any>) {
			/** 查询同类型的申请 */
			const dbSet = await this.adapter.find({
				query: {
					[Op.and]:{
						account_id: ctx.meta.user.id,
						to_type_id: ctx.params.to_type_id
					}
				}
			})
			if(dbSet.length>0)
			{
				const updateModel = dbSet[0];
				const res = await this.adapter.updateById(updateModel.id,{
					$set: ctx.params
				});
				return res;
			}
			if (ctx.params.id) {
				const model = await this.adapter.findById(ctx.params.id);
				if(model.account_uuid !== ctx.meta.user.id) return new Error("没有权限！")
				const res = await this.adapter.updateById(ctx.params.id, {
					$set: {
						account_uuid: ctx.meta.user.id,
						...ctx.params,
						status: 0
					}
				});
				return res;
			}else{
				delete ctx.params.id;
				const res = await this.adapter.insert({
					account_uuid: ctx.meta.user.id,
					...ctx.params,
				});
				return res;
			}
		},
	},
	/** 列出我的申请 */
	myPost: {
		rest: "POST /my",
		params: listParams,
		auth: true,
		async handler(ctx: Context<typeof listParams, any>) {
			const { idx, size, keywords, sort } = ctx.params;
			const res = await this.adapter.find({
				query:{
					account_uuid: ctx.meta.user.id,
				},
				limit: size,
				offset: (idx - 1) * size,
				sort,
			});
			return res;
		},
	},
	/**
	 * 删除我的申请
	 */
	myDelete: {
		rest: "POST /my/delete",
		params: {
			id: {
				type: "string",
				optional: false,
				min: 1
			},
		},
		async handler(ctx: Context<{
			id: string
		}, any>) {
			const { id } = ctx.params;
			const model = await this.adapter.findById(id);
			if(model.account_uuid !== ctx.meta.user.id)
			{
				throw new Error("NO_OWNER_DELETE");
			}
			const res = await this.adapter.removeById(id);
			return res;
		},
	},
	/**
	 *  审批申请
	 */
	approve: {
		rest:"POST /approve",
		auth: true,
		restricted: true,
		allows: [],
		params: approveParams,
		async handler(ctx: Context<typeof approveParams, any>) {
			const { id, status, reason } = ctx.params;
			const model = await this.adapter.findById(id);
			if(model.status>0)
			{
				throw new Error("已进行过审核处理...");
			}
			const accountRank = await this.broker.call("account.createType", {
				user_id: model.account_ud,
				type_id: model.to_type_id
			},{ meta: ctx.meta });

			if(accountRank) {
				const res = await this.adapter.updateById(model.id, { $set: {
					status: status,
					reason: reason,
					auditor_id: ctx.meta.user.id,
					auditor_name: ctx.meta.user.profile?.nickname
				} });
				return res;
			}
			throw new Errors.MoleculerError("服务调用出错...", 400, "NOT_FOUND");
		}
	},
	/** 列表接口 */
	list: {
		rest: "POST /list",
		auth: true,
		params: listParams,
		restricted: true,
		allows: [],
		async handler(ctx: Context<typeof listParams, any>) {
			const { idx, size, keywords, sort, to_type_id, status } = ctx.params;
			const opAnd = {}
			if(to_type_id){
				Object.assign(opAnd,{ to_type_id })
			}
			if(status>=0){
				Object.assign(opAnd,{ status })
			}
			const res = await this.adapter.find({
				query: {
					[Op.and]: opAnd
				},
				limit: size,
				offset: (idx - 1) * size,
				sort,
			});
			return res;
		},
	},
};

export default service;
