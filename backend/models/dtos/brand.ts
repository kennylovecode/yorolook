import type { ActionParamSchema } from "moleculer"

export const createParams:ActionParamSchema = {
	title:{
		type: "string",
		optional: false,
	},
	sub_title:{
		type: "string",
		optional: false,
	},
	type: {
		type: "string",
		optional: false,
	},
	covers: {
		type: "string",
		optional: true,
		default: ""
	},
	banners: {
		type: "string",
		optional: true,
		default: ""
	},
	catalogs: {
		type: "string",
		optional: true,
		default: ""
	},
	country: {
		type: "string",
		optional: false,
	},
	city: {
		type: "string",
		optional: false,
	},
	initial: {
		type: "string",
		optional: false,
	},
	website: {
		type: "string",
		optional: true,
		default: ""
	},
	description: {
		type: "string",
		optional: true,
		default: ""
	},
	display_order: {
		type: "number",
		optional: true,
		default: 0
	},
	contacts: {
		type: "array",
		optional: true,
		default: []
	},
	other_message:{
		type: "array",
		optional: true,
		default: []
	},
	attributes: {
		type: "object",
		optional: true,
		default: {}
	}
}
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	id: {
		type: "string",
		optional: false,
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
		type:"number",
		optional: true,
		default: 1,
	},
	size:{
		type: "number",
		optional: false,
		default: 10,
	},
	catalog: {
		type: "string",
		optional: true,
		default: "",
	},
	keywords: {
		type: "string",
		optional: true,
		default: "",
	},
	initial: {
		type: "string",
		optional: true,
		default: "",
	},
	country:{
		type: "string",
		optional: true,
		default: "",
	},
	city: {
		type: "string",
		optional: true,
		default: "",
	},
	attributes:{
		type: "object",
		optional: true,
		default: {},
	},
	status: {
		type: "number",
		optional: true,
		default: 0,
	},
	owner: {
		type: "string",
		optional: true,
		default: "",
	},
	sort: {
		type: "string",
		optional: true,
		default: "",
	},
	type: {
		type: "string",
		optional: true,
		default: "",
	},
}
