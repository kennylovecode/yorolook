import type { Context } from "moleculer";
import { Op } from "sequelize";
import { createParams,updateParams } from "../models/dtos/articleSku";
import createService from "./base";

const service = createService("articleSku");


service.actions = {
	...service.actions,
	create: {
		rest: "PUT /create",
		auth: true,
		params: createParams,
		async handler(ctx: Context<any,any>) {
			const model = await this.adapter.insert(ctx.params);
			return model?.dataValues
		}
	},
	update: {
		rest: "PUT /update",
		auth: true,
		params: updateParams,
		async handler(ctx: Context<any,any>) {
			const model = await this.adapter.updateById(ctx.params.id, {
				$set: ctx.params
			});
			return model
		}
	},
	list: {
		rest: "GET /list",
		auth: true,
		params: {
			article_uuid: "string",
			channel: {
				type: "string",
				optional: true
			}
		},
		async handler(ctx: Context<any,any>) {
			const { article_uuid, channel } = ctx.params

			const list = await this.adapter.find({
				query: {
					article_uuid
				}
			});
			return {
				total: await this.adapter.count({query: { ...ctx.params }}),
				list
			}
		}
	},
}

export default service;
