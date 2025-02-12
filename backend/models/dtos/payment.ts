import type { ActionParamSchema } from "moleculer";

export const createParams: ActionParamSchema = {
	order_uuid: {
		type: "string",
		optional: false,
	},
	payment_method: {
		type: "string",
		optional: false,
		enum: ["alipay", "wxpay"]
	}
};

export const notifyParams: ActionParamSchema = {
	payment_no: {
		type: "string",
		optional: false,
	},
	transaction_id: {
		type: "string",
		optional: false,
	},
	status: {
		type: "number",
		optional: false,
	}
};