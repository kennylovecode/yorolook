import type { Context } from "moleculer";
import { Op } from "sequelize";
import createService from "./base";

const service = createService("attribute");

service.actions = {
	...service.actions,
	get:{
		rest:"GET /:id",
		async handler(ctx: Context<any,any>){
			const { id } = ctx.params;
			const dbSet = await this.adapter.find({
				query: {
					id
				},
				sort:["display_order"]
			})
			if(dbSet.length>0){
				const control = await this.broker.call("attribute_control.getAttrControls",{
					attribute_uuid: dbSet[0].id
				})
				const options = await this.broker.call('attribute_option.getAttrOptions',{
					attribute_uuid: dbSet[0].id
				})
				const resultModel = {
					...dbSet[0].dataValues,
					control,
					options
				}
				return resultModel;
			}
			return {};
		}
	},
	commons:{
		rest:"GET /commons",
		async handler(){
			const dbSet = await this.adapter.find({
				query:{
					common: {
						[Op.gt]:0
					},
				},

				sort: ["display_order"]
			})
			const ids = dbSet.map((item: any) => item.id )
			const options = await this.broker.call("attribute_option.getAttrOptions",{
				attribute_uuid_list: ids
			})
			const controls = await this.broker.call("attribute_control.getAttrControls",{
				attribute_uuid_list: ids
			})
			return {
				attributes: dbSet,
				controls,
				options
			};
		}
	},
	all:{
		rest: "GET /all",
		async handler(){
			const dbSet = await this.adapter.find({
				query:{
					common: 0
				}
			})
			return dbSet
		}
	},
	getByIds:{
		rest: "POST /get_by_ids",
		params: {
			ids: "array"
		},
		async handler(ctx: Context<any,any>){
			const { ids } = ctx.params
			const dbSet = await this.adapter.find({
				query:{
					id: {
						[Op.in]: ctx.params.ids
					}
				}
			})
			const options = await this.broker.call("attribute_option.getAttrOptions",{
				attribute_uuid_list: ids
			})
			const controls = await this.broker.call("attribute_control.getAttrControls",{
				attribute_uuid_list: ids
			})
			return {
				attributes: dbSet,
				controls,
				options
			};
		}
	},
}
export default service;
