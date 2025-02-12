import createService from "./base";
import { listParams } from "../models/dtos/tag";
import { Context, Errors } from "moleculer";
import { Op } from "sequelize";

const service = createService("tag");

service.actions = {
	...service.actions,
	get: {
		rest: "GET /:id",
		auth: true,
		params: { id: "string" },
		async handler(ctx: Context<{ id: string }, any>) {
			const model = await this.adapter.findById(ctx.params.id);
			if (!model) {
				return {};
			}
			if (model.account_uuid && model.account_uuid !== ctx.meta.user.id && !ctx.meta.user.manage) {
				throw new Errors.MoleculerClientError("No permission");
			}
			return model;
		},
	},
	list:{
		rest:"POST /list",
		params: Object.assign(listParams,{
			parent_id: {
				type: "number",
				optional: true,
				default: ""
			}
		}),
		async handler(ctx: Context<any, any>){
			const { parent_id, idx, size, sort, keywords } = ctx.params
			const query = {
				[Op.and]: [
					parent_id ? { parent_id } : { parent_id: { [Op.is]: null } },
					keywords ? {
						[Op.or]: [
							{ name: { [Op.like]: `%${keywords}%` } },
							{ title: { [Op.like]: `%${keywords}%` } }
						]
					} : {}
				]
			}
			const dbSet = await this.adapter.find({
				query,
				limit: size,
				offset: (idx - 1) * size,
				sort: sort ? [sort] : ""
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
}
export default service;
