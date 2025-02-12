import type { ActionParamSchema } from "moleculer"
/**
 * @description 登录参数
 */
export const createParams: ActionParamSchema = {
	key: {
		type: "string",
		optional: false,
	},
	text: {
		type: "string",
		optional: true,
	},
	options: {
		type: "array",
		optional: true,
	}
}

export const updateParams: ActionParamSchema = {
	key: {
		type: "string",
		optional: false,
	},
	text: {
		type: "string",
		optional: true,
	},
	options: {
		type: "array",
		optional: true,
	}
}

/**
 * 【根据key获取模型请求】参数配置模型
 */
export const getParams: ActionParamSchema = {
	key: {
		type: "string"
	}
}

/**
 * 【删除请求】参数配置模型
 */
export const deleteParams: ActionParamSchema = {
	key: {
		type: "string",
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
	keywords:{
		type: "array",
		optional: true,
	},
	sort:{
		type: "string",
		optional: true,
	},
}
