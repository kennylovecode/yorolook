import createService from "./base";
import { listParams } from "../models/dtos/dictionary";
import { Context } from "moleculer";

const service = createService("dictionary");

service.methods = {
	...service.methods,
}

service.actions = {
	...service.actions,
	getByKey:{
		rest:"GET /",
		params:{
			key: "string",
		},
		async handler(ctx: Context<{key: string}>)
		{
			const dbSet = await this.adapter.find({
				query:{
					key: ctx.params.key
				}
			})
			return dbSet[0] || null;
		}
	},
	/** 列表接口 */
	list:{
		rest:"POST /list",
		auth: true,
		params: listParams,
		restricted: true,
		allows: [],
		async handler(ctx: Context<typeof listParams, any>){
			const { idx, size, keywords, sort } = ctx.params;

			const res = await this.adapter.find({
				limit: size,
				offset: (idx - 1) * size,
				sort
			})
			return res;
		}
	}
}

export default service;
