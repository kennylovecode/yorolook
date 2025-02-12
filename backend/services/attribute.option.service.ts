import { Context } from "moleculer";
import { Op } from "sequelize";
import createService from "./base";

const service = createService("attributeOption");
service.actions = {
	...service.actions,
	getAttrOptions: {
		rest: "POST /get_attr_options",
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
			const { attribute_uuid,attribute_uuid_list } = ctx.params;
			if(attribute_uuid){
				const result = await this.adapter.find({ query: { attribute_uuid },sort:["display_order"] });
				return result;
			}

			if(attribute_uuid_list){
				const result = await this.adapter.find({ query: {
					attribute_uuid:{
						[Op.in]: attribute_uuid_list
					}
				 },
				 sort:["display_order"]
				});
				return result;
			}

			return []
		}
	},
	addBatch:{
		rest:"POST /add-batch",
		params:{
			options: { type: "array" }
		},
		async handler(ctx: Context<any,any>){
			const res = await this.adapter.insertMany(ctx.params.options);
			return res;
		}
	}
}
export default service;
