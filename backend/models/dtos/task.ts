import type { ActionParamSchema } from "moleculer"

export const createParams: ActionParamSchema = {
	title: {
		type: "string",
		optional: false,
	},
	method: {
		type: "string",
		optional: false,
	},
	params:{
		type: "object",
		optional: true,
	},
	priority: {
		type: "number",
		optional: false,
		defaultValue: 0
	},
}

/**
 * push 一条完整的数据
 * 在第三方完成任务调用后使用
 */

export const pushParams: ActionParamSchema = {
	...createParams,
	type: {
		type: "string",
		optional: false,
	},
	status:{
		type: "number",
		optional: false,
	},
	result:{
		type: "object",
		optional: true,
	},
	duration: {
		type: "number",
		optional: true,
	},
	errors:{
		type: "object",
		optional: true,
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
	status:{
		type: "number",
		optional: true,
		defaultValue: -1
	},
}
