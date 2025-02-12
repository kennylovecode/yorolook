import type { ActionParamSchema } from "moleculer";

export const createParams: ActionParamSchema = {
	article_uuid: {
		type: "string",
		optional: false,
	},
	article_sku_uuid: {
		type: "string",
		optional: false,
	},
	quantity: {
		type: "number",
		optional: true,
		default: 1,
	}
};

export const updateParams: ActionParamSchema = {
	id: {
		type: "string",
		optional: false,
	},
	quantity: {
		type: "number",
		optional: true,
	},
	selected: {
		type: "boolean",
		optional: true,
	}
};

export const listParams: ActionParamSchema = {
	idx: {
		type: "number",
		optional: true,
		default: 1,
	},
	size: {
		type: "number",
		optional: true,
		default: 20,
	}
};
