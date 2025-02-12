import { type Context, Errors } from "moleculer";
import { Op } from "sequelize";
import createService from "./base";

const service = createService("articleAttributeValue");

service.actions = {
	createBatch:{
		rest: "POST /create_batch",
		params: {
			article_uuid: {
				type: "string"
			},
			attribute_value_list: {
				type: "string"
			},
		},
		async handler(ctx: Context<any, any>) {
			const { article_uuid, attribute_value_list } = ctx.params;
			const _attribute_value_list = JSON.parse(attribute_value_list)
			if(_attribute_value_list.length>0){
				await this.adapter.removeMany({
					article_uuid,
					attribute_uuid: {
						[Op.in]: _attribute_value_list.map(x => x.attribute_uuid)
					}
				})

				const dbSet = await this.adapter.insertMany(_attribute_value_list.map(x => ({
						article_uuid,
						attribute_uuid: x.attribute_uuid,
						value_uuid: x.value_uuid||"",
						value: x.value
					})));
				return dbSet
			}
			return new Errors.MoleculerClientError("保存失败...")
		}
	},
	_create: {
		params:{
			article_uuid: {
				type: "string"
			},
			attribute_uuid: {
				type: "string"
			},
			value_list:{
				type: "string"
			}
		},
		async handler(ctx: Context<any, any>){
			const { article_uuid, attribute_uuid, value_list } = ctx.params;
			const valueArr = value_list.split(',')
			await this.adapter.insertMany(valueArr.map(x => ({
					article_uuid,
					attribute_uuid,
					value_uuid: 'auto_generate',
					value: x
				})));
		}
	},
	create: {
		rest: "POST /create",
		params: {
			article_uuid: {
				type: "string"
			},
			attribute_uuid: {
				type: "string"
			},
			value_list:{
				type: "string"
			}
		},
		async handler(ctx: Context<any, any>) {
			const { article_uuid, attribute_uuid, value_list } = ctx.params;
			const _value_list = JSON.parse(value_list)
			const dbSet = await this.adapter.find({
				query: {
					article_uuid,
					attribute_uuid,
					value_uuid: {
						[Op.in]: _value_list.map(x=> x.id)
					},
					value: {
						[Op.in]: _value_list.map(x=> x.value)
					}
				}
			})
			_value_list.filter(item => !dbSet.map(dbItem => dbItem.dataValues.value_uuid.includes(item.id)))

			if(_value_list.length<=0) {
				return {}
			}
			const articleAttributeValue = await this.adapter.insertMany(_value_list.map(x => ({
					article_uuid,
					attribute_uuid,
					value_uuid: x.id,
					value: x.value
				})));
			return articleAttributeValue;
		}
	},
	remove: {
		rest: "POST /remove",
		auth: true,
		params: {
			article_uuid: "string",
			attribute_uuid: "string",
			value_list: "string"
		},
		async handler(ctx: Context<any, any>) {
			const { article_uuid, attribute_uuid, value_uuid_list ,value_list} = ctx.params;
			const _value_list = JSON.parse(value_list)
			const count = await this.adapter.removeMany({
					article_uuid,
					attribute_uuid,
					value_uuid: {
						[Op.in]: _value_list.map(x=> x.id)
					},
					value: {
						[Op.in]: _value_list.map(x=> x.value)
					}
			})
			return count;
		}
	},
	articleMatch: {
		rest: "POST /article_match",
		params:{
			attributes: "array"
		},
		async handler(ctx: Context<any, any>){
			const { attributes } = ctx.params;
			const queryOpAnd = []
			attributes.forEach((item: any) => {
				queryOpAnd.push({
					attribute_uuid: item.attribute_uuid
				})
				queryOpAnd.push({
					value_uuid: {
						[Op.in]: item.value_list.split(',')
					}
				})
			})
			const dbSet = await this.adapter.find({
				query: {
					[Op.and]: queryOpAnd
				}
			})
			return dbSet.map(x=> x.dataValues.article_uuid)
		}
	},
	list: {
		rest: "POST /list",
		params: {
			article_uuid: "string",
		},
		async handler(ctx: Context<any, any>) {
			const { article_uuid } = ctx.params;
			const articleAttributeValue = await this.adapter.find({
				query: {
					article_uuid,
				}
			})
			return articleAttributeValue;
		}
	}
}

export default service;
