import type { Context } from "moleculer";
import { Op } from "sequelize";
import createService from "./base";

const service = createService("accountRank");

service.actions = {
	...service.actions,
	getByAccount: {
		rest: "GET /getByAccount",
		params: {
			account_uuid: "string",
			type_id: {
				type: "number",
				optional: true
			}
		},
		async handler(ctx: Context<any,any>){
			const { account_uuid, type_id } = ctx.params
			const queryOpAnd = { account_uuid }
			if(type_id) {Object.assign(queryOpAnd,{ type_id })}
		    /** 查询账户身份等级 */
			const dbSet = await this.adapter.find({ query:{
				[Op.and]: queryOpAnd
			}})

			if(dbSet.length>0){
				const accountRankModel = dbSet[0].dataValues
				const rankModel = await this.broker.call("type_rank.get", { id: `${accountRankModel.type_rank_id }` }) || {}
				Object.assign(accountRankModel,rankModel)
				return accountRankModel
			}
			return null
		}
	},
	/** 获取我的身份信息 */
	me:{
		rest: "POST /me",
		auth: true,
		async handler(ctx: Context<any,any>) {
			const dbSet = await this.adapter.find({
				query:{
					account_uuid: ctx.meta.user.id
				}
			})
			const typeIds = dbSet.map(item => item.type_id)
			const myTypes = await this.broker.call("type.getByIds",{
				ids: typeIds
			})
			const typeRanks = await this.broker.call("type_rank.getByIds",{
				ids: dbSet.map(item => item.type_rank_id)
			})
			const resultRanks = dbSet.map(item => ({
					...item.dataValues,
					type_rank: typeRanks.find(typeRank => typeRank.id === item.type_rank_id).dataValues
				}))
			return {
				ranks: resultRanks,
				types: myTypes
			}
		}
	}
}

export default service;
