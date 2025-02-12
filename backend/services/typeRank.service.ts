import type { Context } from "moleculer";
import { listParams } from "../models/dtos/typeRank";
import createService from "./base";
import { Op } from "sequelize";

const service = createService("typeRank");

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
		rest: "POST /default",
		params:{
			type_id: "number"
		},
		async handler(ctx: Context<any, any>){
			const dbSet = await this.adapter.find({
				query: {
					type_id: ctx.params.type_id,
					weight: 0,
				}
			})
			if(dbSet.length<=0){
				return null;
			}
			return dbSet[0]
		}
	},
	list:{
		rest:"POST /list",
		auth: true,
		params: listParams,
		async handler(ctx: Context<any, any>){
			const { idx, size, keywords, sort, type_id } = ctx.params;
			let query = {};
			if(type_id){
				query = {
					type_id
				};
			}

			const dbSet = await this.adapter.find({
				query,
				limit: size,
				offset: (idx - 1) * size,
				sort
			})
			const total = await this.adapter.count({query});
			return {
				list: dbSet,
				total
			};
		}
	},
	all:{
		rest:"POST /all",
		auth: true,
		params: {
			type_id:
			{
				type: "string",
				optional: true
			}
		},
		async handler(ctx: Context<any, any>){
			const { type_id } = ctx.params
			const query = type_id ? {type_id} : {}
			const dbSet = await this.adapter.find({
				query
			});
			return dbSet
		}
	}
}

export default service;
