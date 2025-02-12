import type { ActionParamSchema } from "moleculer"

/**
 * @description 创建参数
 */
export const createParams: ActionParamSchema = {
	name: {
		type: "string",
		optional: false,
	},
	title:{
		type: "string",
		optional: false,
	},
	description: {
		type: "string",
		optional: false,
	},
	url:{
		type: "string",
		optional: false,
	},
	method: {
		type: "number",
		optional: false,
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
	username: {
		type: "string",
		optional: false,
	},
	password: {
		type: "string",
		optional: false,
	},
	code: {
		type: "string",
		optional: true,
	},
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
		type: "array",
		optional: true,
	},
	sort:{
		type: "string",
		optional: true,
	},
}
