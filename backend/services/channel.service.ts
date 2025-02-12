import type { Context} from "moleculer";
import { Errors } from "moleculer";
import { Op, where } from "sequelize";
import createService from "./base";

const service = createService("channel");

service.actions = {
	...service.actions,
	get: {
		rest: "GET /:id",
		auth: true,
		params: { id: "string" },
		async handler(ctx: Context<any, any>) {
			const model = await this.adapter.findById(ctx.params.id);
			if (!model) {
				return {};
			}
			if (model.account_uuid && model.account_uuid !== ctx.meta.user.id && !ctx.meta.user.manage) {
				throw new Errors.MoleculerClientError("No permission");
			}
			let attrs = []
			if(model.attributes?.length>0){
				attrs = await this.broker.call("attribute.getByIds",{ ids: model.attributes })
			}
			return {
				...model.dataValues,
				attributes: attrs
			};
		},
	},
	all: {
		rest:"GET /all",
		async handler(){
			const dbSet = await this.adapter.find({
				sort: {
					display_order: 1
				}
			});
			return dbSet;
		}
	},
	getByName:{
		rest:"GET /",
		params:{
			name: {
				type: "string",
				optional: true
			},
			title: {
				type: "string",
				optional: true
			}
		},
		async handler(ctx){
			const {name, title} = ctx.params;
			let query = {}
			if(name){
				query = Object.assign(query, {
					[Op.and]:{
						name
					}
				});
			}
			if(title){
				query = Object.assign(query, {
					[Op.and]:{
						title
					}
				});
			}
			const model = await this.adapter.model.findOne({
				where: query
			});

			let attrs = []
			if(model.attributes?.length>0){
				attrs = await this.broker.call("attribute.getByIds",{ ids: model.attributes })
			}
			return {
				...model.dataValues,
				attributes: attrs
			};
		}
	}
}
export default service;
