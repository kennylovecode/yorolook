import type { Context } from "moleculer";
import createService from "./base";

const service = createService("oldProduct");

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
		},
		async handler(ctx: Context<any, any>) {
			const { BrandId } = ctx.params;
			const query = {
				brand_id: BrandId
			}
			const dbset = await this.adapter.find({ query });
			return dbset
		},
	}
}
export default service;
