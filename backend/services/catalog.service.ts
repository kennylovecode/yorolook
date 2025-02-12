import _ from "lodash";
import { type Context, Errors } from "moleculer";
import { Op } from "sequelize";
import { listParams } from "../models/dtos/catalog";
import createService from "./base";

const service = createService("catalog");

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
			path_id: {
				type: "string",
				optional: true,
				default: ""
			}
		}),
		async handler(ctx: Context<any, any>){
			const { path_id, idx, size, sort } = ctx.params
			const query = path_id ? {
				[Op.and]: {
					path_id
				}
			} : {
				path_id : { [Op.is]: null }
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
	nodes: {
		rest: "POST /nodes",
		params:{
			parent_id: {
				type: "number",
				optional: true
			},
			deep:{
				type:"number",
				optional: true,
				default: 0
			}
		},
		async handler(ctx: Context<any, any>){
			const { parent_id, deep } = ctx.params
			const parent = await this.adapter.model.findOne({
				where: {
					id: parent_id
				}
			})
			let query = {
				[Op.and]:{
					deep
				}
			}
			if(parent_id){
				query = Object.assign(query, {
					[Op.and]:{
						deep,
						parent_id
					}
				})
			}
			const dbSet = await this.adapter.find({
				query,
				sort: ["display_order"]
			})

			const _parent =  parent ? (parent.dataValues) : {};
			let attributes:any[] = []
			if(_parent?.attributes?.length>0){
				attributes = await this.broker.call("attribute.getByIds",{
					ids: _parent.attributes
				})
			}
			const result = {
				..._parent,
				attributes,
				childrens: dbSet
			}
			return result;
		}
	},
	all:{
		rest: "GET /all",
		async handler(){
			const dbSet = await this.adapter.find({
				sort: ["display_order"]
			})
			const result = dbSet.map(item => {
				if(item.cover){
					const newItem = _.omit(item.dataValues,"cover")
					return newItem
				}
				return item.dataValues
			})
			return result;
		}
	},
	getByIds:{
		rest: "POST /getByIds",
		params:{
			ids: {
				type: "array"
			}
		},
		async handler(ctx: Context<any, any>){
			const { ids } = ctx.params
			const dbSet = await this.adapter.find({
				query: {
					id: {
						[Op.in]: ids
					}
				},
				sort: ["display_order"]
			})
			return dbSet;
		}
	},
	getByTitle:{
		rest: "POST /getByTitle",
		params:{
			title: {
				type: "string"
			}
		},
		async handler(ctx: Context<any, any>){
			const { title } = ctx.params
			const model = await this.adapter.model.findOne({
				where: {
					title
				}
			})
			return model?.dataValues;
		}
	},
	getByPathTitle: {
		rest: "POST /get_by_path",
		params:{
			path_title: {
				type: "string"
			},
		},
		async handler(ctx: Context<any, any>){
			const path_title_arr = ctx.params.path_title.split(",")

			const query = {
				[Op.or]: []
			}

			for(const item of path_title_arr){
				const _t = item.split("/")
				let i = 0;
				for(const _x of _t){
					query[Op.or].push({
						[Op.and]:[
							{
								title: _x
							},
							{
								path_title:  i<=0 ? "" : item.split("/").splice(0,i).join(",")
							}
						]
					})
					i += 1
				}
			}
			console.log()
			const dbSet = await this.adapter.find({
				query,
				sort: ["display_order"]
			})

			return dbSet;
		}
	}
}

export default service;
