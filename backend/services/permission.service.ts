import type { Context } from "moleculer";
import { listParams } from "../models/dtos/permission";
import createService from "./base";

const service = createService("permission");

service.actions = {
	...service.actions,
	list:{
		rest:"POST /list",
		auth: true,
		params: listParams,
		async handler(ctx: Context<typeof listParams, any>){
			const { idx, size, keywords, sort } = ctx.params;
			const res = await this.adapter.find({
				limit: size,
				offset: (idx - 1) * size,
				sort
			})
			return res;
		}
	},
}

export default service;
