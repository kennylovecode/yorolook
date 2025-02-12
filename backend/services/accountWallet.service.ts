import type { Context } from "moleculer";
import { createParams, listParams } from "../models/dtos/accountWallet";
import createService from "./base";

const service = createService("accountWallet");

service.actions = {
	...service.actions,
    create:{
		auth: true,
		params: createParams,
		async handler(ctx: Context<typeof createParams, any>){
			const { remark, title, type, value } = ctx.params;
			const res = await this.adapter.insert({
				account_uuid: ctx.meta.user.id,
				remark,
				title,
				type,
				value,
                before: ctx.meta.user[type],
                after: ctx.meta.user[type] + value
			})
            return res
		}
    },
	myWallets:{
		rest:"POST /my",
		auth: true,
		params: listParams,
		async handler(ctx: Context<typeof listParams, any>){
			const { idx, size, keywords, sort } = ctx.params;
			const query = {
				account_uuid: ctx.meta.user.id
			}
			const dbSet = await this.adapter.find({
				query,
				limit: size,
				offset: (idx - 1) * size,
				sort:["-updated_at"]
			})
			const total = await this.adapter.count(query)
			return {
				list: dbSet,
				total
			};
		}
	},
}

export default service;
