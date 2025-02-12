import type { Context } from "moleculer";
import { Op } from "sequelize";
import createService from "./base";

const service = createService("imageLab");

service.actions=  {
	...service.actions,
	list: {
		rest: "POST /list",
		params: {
			source_image:{
				type: "string"
			},
			view: {
				type: "number",
				optional: true,
				default: 0
			}
		},
		async handler(ctx: Context<any,any>) {
			const { source_image } = ctx.params;
			const dbset = await this.adapter.find({
				query:{
					source_image
				}
			})
			const artilceIds = dbset.map(item=>item.target_article_uuid)
			const skuIds = dbset.map(item=>item.target_article_sku_uuid)
			const articles = await this.broker.call("article._listByQuery",{
				query: {
					id: {
						[Op.in]: artilceIds
					}
				}
			})
			const skus = await this.broker.call("article_sku._listByQuery",{
				query: {
					id: {
						[Op.in]: skuIds
					}
				}
			})
			const result = dbset.map(item => ({
				...item.dataValues,
				article: articles.find(article => article.id === item.target_article_uuid)?.dataValues || {},
				sku: skus.find(sku => sku.id === item.target_article_sku_uuid)?.dataValues || {}
			}))

			return result
		}
	},
	create: {
		rest: "POST /create",
		auth: true,
		restricted: true,
		allows: [],
		params: {
			source_image:{
				type: "string"
			},
			target_article_uuid:{
				type: "string",
				optional: true
			},
			target_article_sku_uuid:{
				type: "string",
				optional: true
			},
			target_amount:{
				type: "number",
				optional: true,
				default: 1
			},
			target_brand_uuid:{
				type: "string",
				optional: true
			},
			start_x: {
				type: "number"
			},
			start_y:{
				type: "number"
			},
			end_x:{
				type: "number"
			},
			end_y:{
				type: "number"
			},
			jump_url:{
				type: "string",
				optional: true
			}
		},
		async handler(ctx: Context<any,any>) {
			const lab = await this.adapter.insert(ctx.params);
			return lab?.dataValues
		}
	},
	update: {
		rest: "POST /update",
		auth: true,
		restricted: true,
		allows: [],
		params: {
			id:{
				type: "number"
			},
			title:{
				type: "string"
			},
			source_image:{
				type: "string"
			},
			target_article_uuid:{
				type: "string",
				optional: true
			},
			target_article_sku_uuid:{
				type: "string",
				optional: true
			},
			target_amount:{
				type: "number",
				optional: true,
				default: 1
			},
			target_brand_uuid:{
				type: "string",
				optional: true,
				default: ""
			},
			start_x: {
				type: "number"
			},
			start_y:{
				type: "number"
			},
			end_x:{
				type: "number"
			},
			end_y:{
				type: "number"
			},
			jump_url:{
				type: "string",
				optional: true
			}
		},
		async handler(ctx: Context<any,any>) {
			const labs = await this.adapter.updateById(ctx.params.id, {
				$set: {
					...ctx.params
				}
			});

			return labs?.dataValues
		}
	}
}

export default service
