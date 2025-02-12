import type { ActionParamSchema } from "moleculer";

export const createParams : ActionParamSchema = {
	title: {
		type: "string",
		optional: false,
	},
	source_image: {
		type: "string",
		optional: false,
	},
	target_article_uuid: {
		type: "string",
		optional: true,
	},
	target_article_sku_uuid: {
		type: "string",
		optional: true,
	},
	target_amount: {
		type: "number",
		optional: true,
		default: 1
	},
	target_brand_uuid: {
		type: "string",
		optional: true,
	},
	start_x: {
		type: "number",
		optional: false,
	},
	start_y: {
		type: "number",
		optional: false,
	},
	end_x: {
		type: "number",
		optional: false,
	},
	end_y: {
		type: "number",
		optional: false,
	},
	jump_url: {
		type: "string",
		optional: true,
	}
}

export const updateParams : ActionParamSchema = {
	id: {
		type: "string",
		optional: false,
	},
	...createParams
}

/**
 * 【删除请求】参数配置模型
 */
export const deleteParams: ActionParamSchema = {
	id: {
		type: "string",
		optional: false,
	},
}
