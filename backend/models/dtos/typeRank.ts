import type { ActionParamSchema } from "moleculer"

/**
 * @description 创建参数
 */
export const createParams: ActionParamSchema = {
	type_id: {
		type: "number",
		optional: false,
	},
	title:{
		type: "string",
		optional: false,
	},
	height: {
		type: "number",
		optional: true,
	},
	growth_value: {
		type: "number",
		optional: true,
		default: 0
	},
	discount: {
		type: "number",
		optional: true,
		default: 100
	},
	display_order: {
		type: "number",
		optional: true,
		default: 0
	}
}
/**
 * @description 更新参数
 */
export const updateParams: ActionParamSchema = {
	...createParams,
	id: {
		type: "number",
		optional: false,
	}
}

/**
 * 【获取列表请求】参数配置模型
*/
export const listParams : ActionParamSchema = {
	idx: {
		type: "number",
		optional: true,
		default: 1
	},
	size: {
		type: "number",
		optional: true,
		default: 40
	},
	keywords:{
		type: "string",
		optional: true,
	},
	sort:{
		type: "string",
		optional: true,
	},
	type_id: {
		type: "number",
		optional: true,
	}
}
