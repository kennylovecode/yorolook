import type { Context } from "moleculer";
import createService from "./base";
import { Op } from "sequelize";

const service = createService("oldAlbums");

service.actions = {
	...service.actions,
	brandList: {
		rest: "POST /brand-list",
		params:{
			BrandId: {
				type: "number",
				optional: true,
				default: ""
			},
			dirIds: {
				type: "array",
				optional: true,
				default: ""
			}
		},
		async handler(ctx: Context<any, any>) {
			const { BrandId, dirIds } = ctx.params;
			const query = {
				[Op.or]:{
					BrandId,
					DirectoryId: {
						[Op.in]: dirIds
					}
				}
			}
			const dbset = await this.adapter.find({ query });

			return dbset
		},
	},
	articleList:{
		rest: "POST /article-list",
		params:{
			ArticleIds: {
				type: "array",
				optional: true,
				default: ""
			}
		},
		async handler(ctx: Context<any, any>) {
			const { ArticleIds } = ctx.params;
			const query = {
				ArticleId:{
					[Op.in]: ArticleIds
				}
			}
			const dbset = await this.adapter.find({ query });

			return dbset
		},
	}
}
export default service;
