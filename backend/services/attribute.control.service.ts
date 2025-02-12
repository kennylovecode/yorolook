import _ from "lodash";
import { createParams } from "../models/dtos/attributeControl";
import createService from "./base";
import { Op } from "sequelize";

const service = createService("attributeControl");

service.actions = {
	...service.actions,
	createOrUpdate:{
		rest: "POST /create_or_update",
		params: createParams,
		async handler(ctx) {
			const model = _.pick(ctx.params,Object.keys(createParams));
			if(!model.attribute_uuid){
				throw Error("属性ID错误...");
			}
			const dbSet = await this.adapter.find({
				query:{
					attribute_uuid: model.attribute_uuid
				}
			})
			if(dbSet.length>0){
				const ogModel = dbSet[0];
				const res = await this.adapter.updateById(ogModel.id,{
					$set:{
						...model
					}
				})
				return res
			}
			const res = await this.adapter.insert(model)
			return res
		},
	},
	getAttrControls: {
		rest: "POST /get_attr_controls",
		params: {
			attribute_uuid: {
				type: "uuid",
				optional: true
			},
			attribute_uuid_list: {
				type: "array",
				optional: true
			}
		},
		async handler(ctx) {
			const { attribute_uuid, attribute_uuid_list } = ctx.params;
			if(attribute_uuid){
				const result = await this.adapter.find({ query: { attribute_uuid } });
				return result[0] || {};
			}

			if(attribute_uuid_list){
				const result = await this.adapter.find({ query: {
					attribute_uuid:{
						[Op.in]: attribute_uuid_list
					}
				 }
				});
				return result;
			}
			return []
		}
	},
}

export default service;
