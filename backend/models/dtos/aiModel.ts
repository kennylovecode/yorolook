import type { ActionParamSchema } from "moleculer"

export const createParams: ActionParamSchema = {
	catalog: {
		type: "string",
		optional: false,
	},
	type: {
		type: "string",
		optional: false,
	},
	name:{
		type: "string",
		optional: false,
	},
	title: {
		type: "string",
		optional: false,
	},
    cost: {
		type: "number",
		optional: false,
		defaultValue: 0
	},
    cost_token: {
		type: "number",
		optional: false,
		defaultValue: 0
	},
}


/**
 * 【根据id获取模型请求】参数配置模型
 */
export const getParams: ActionParamSchema = {
	id: {
		type: "string"
	}
}

/**
 * 【删除请求】参数配置模型
 */
export const deleteParams: ActionParamSchema = {
	id: {
		type: "uuid",
		optional: false,
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
}
