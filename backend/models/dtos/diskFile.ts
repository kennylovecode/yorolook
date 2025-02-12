import type { ActionParamSchema } from "moleculer"

/**
 * @description 后台创建账号参数
 */
export const createParams:ActionParamSchema = {
}
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	id: {
		type: "string"
	},
	title: {
		type: "string"
	},
	payment_limit: {
		type: "number",
		optional: true,
		default: 0
	},
	payment_type: {
		type: "string",
		optional: true,
		default: 0
	},
	keywords:{
		type: "string",
		optional: true,
	},
	conditents: {
		type: "array",
		optional: true,
	},
	display_order: {
		type: "number",
		optional: true,
		default: 0
	},
	status:{
		type: "number",
		optional: true,
		default: 0
	}
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
	/** 指定路径 */
	paths: {
		type:"string",
		optional: false
	},
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
	sort:{
		type: "string",
		optional: true,
	},
}
