import type { Context } from "moleculer";
import { listParams } from "../models/dtos/type";
import createService from "./base";
import { Op } from "sequelize";

const service = createService("type");

service.actions = {
	...service.actions,
	getByIds: {
		rest: "POST /get_by_ids",
		params: {
			ids: "array"
		},
		async handler(ctx: Context<any,any>) {
			const dbSet = await this.adapter.find({
				query:{
					id: {
						[Op.in]: ctx.params.ids
					}
				}
			})
			return dbSet
		}
	},
	default: {
		rest: "GET /default",
		async handler(ctx: Context<any,any>) {
			const dbSet = await this.adapter.find({
				query:{
					name: 'default'
				}
			})
			if(dbSet.length<=0) throw new Error("没有默认用户组...")
			const defaultType = dbSet[0]?.dataValues
			if(!defaultType) {
				throw new Error("没有默认用户组...")
			}
			const defaultRank = await this.broker.call("type_rank.default",{
				type_id: defaultType.id
			})
			return {
				type: defaultType,
				rank: defaultRank
			}
		}
	},
	list:{
		rest:"POST /list",
		auth: true,
		params: listParams,
		async handler(ctx: Context<typeof listParams, any>){
			const { idx, size, keywords, sort } = ctx.params;
			const search = {
				limit: size,
				offset: (idx - 1) * size,
				sort
			}
			const dbSet = await this.adapter.find(search)
			const total = await this.adapter.count({});
			return {
				list: dbSet,
				total
			};
		}
	},
	all:{
		rest:"POST /all",
		auth: true,
		async handler(ctx: Context<any, any>){
			const dbSet = await this.adapter.find({});
			return dbSet;
		}
	}
}

export default service;
