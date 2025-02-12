import type { ActionParamSchema } from "moleculer"

export const createParams:ActionParamSchema = {
	channel: {
		type: "string",
		optional: false,
	},
	article_uuid: {
		type: "string",
		optional: false,
	},
	title: {
		type: "string",
		optional: false,
	},
	sub_title: {
		type: "string",
		optional: true,
	},
	quick_code: {
		type: "string",
		optional: true,
	},
	cover:{
		type: "string",
		optional: true,
	},
	cost_price: {
		type: "number",
		optional: true,
		default: 0
	},
	sale_price: {
		type: "number",
		optional: true,
		default: 0
	},
	market_price:{
		type: "number",
		optional: true,
		default: 0
	},
	is_discount:{
		type: "boolean",
		optional: true,
		default: true
	},
	is_activity:{
		type: "boolean",
		optional: true,
		default: true
	},
	display_order:{
		type: "number",
		optional: true,
		default: 0
	}
}
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	...createParams,
	id: {
		type: "string",
		optional: false,
	},
}

/**
 * 【根据id获取模型请求】参数配置模型
 */
export const getParams: ActionParamSchema = {
}

/**
 * 【删除请求】参数配置模型
 */
export const deleteParams: ActionParamSchema = {
}

/**
 * 【获取列表请求】参数配置模型
*/
export const listParams : ActionParamSchema = {
	idx: {
		type:"number",
		optional: true,
		default: 1,
	},
	size:{
		type: "number",
		optional: false,
		default: 10,
	},
	sort: {
		type: "string",
		optional: true,
		default: "",
	}
}
