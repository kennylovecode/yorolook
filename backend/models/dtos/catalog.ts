import type { ActionParamSchema } from "moleculer"

export const createParams:ActionParamSchema = {
	/** 名称 */
	name: {
		type: "string",
	},
	/** 标题 */
	title:{
		type: "string",
	},
	cover:{
		type: "string",
		optional: true
	},
	parent_id: {
		type: "number",
		optional: true
	},
	sketch: {
		type: "string",
		optional: true
	},
	keywords:{
		type: "string",
		optional: true
	},
	path_id: {
		type: "string",
		optional: true
	},
	path_title:{
		type: "string",
		optional: true
	},
	deep:{
		type: "number",
		default: 0
	},
	attributes:{
		type: "array",
		optional: true,
		default: []
	},
	display_order:{
		type: "number",
		default: 0
	}
}
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	id:{
		type: "number"
	},
	...createParams
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
}
