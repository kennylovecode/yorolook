import type { ActionParamSchema } from "moleculer";

export const createParams: ActionParamSchema = {
	cart_ids: {
		type: "array",
		optional: false,
		items: "string"
	},
	shipping_address: {
		type: "object",
		optional: false,
		properties: {
			name: { type: "string" },
			phone: { type: "string" },
			province: { type: "string" },
			city: { type: "string" },
			district: { type: "string" },
			address: { type: "string" }
		}
	},
	remark: {
		type: "string",
		optional: true
	}
};

export const listParams: ActionParamSchema = {
	status: {
		type: "number",
		optional: true,
	},
	idx: {
		type: "number",
		optional: true,
		default: 1,
	},
	size: {
		type: "number",
		optional: true,
		default: 10,
	}
};