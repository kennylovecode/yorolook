import type { ActionParamSchema } from "moleculer"

export const createParams:ActionParamSchema = {
	/** 名称 */
	name: {
		type: "string",
		optional: false
	},
	/** 标题 */
	title:{
		type: "string",
		optional: false
	},
	banners:{
		type: "array",
		optional: true
	},
	/** 频道页面数量 */
	pagesize: {
		type: "number",
		optional: true
	},
	/** 每一行数量 */
	linesize:{
		type: "number",
		optional: true
	},
	/** 限制级别 0:无限制  1: 仅首页  255:全部不可见 */
	limit_level:{
		type: "number",
		optional: true
	},
	/** 账户类型可见 */
	type_rank_limits:{
		type: "array",
		optional: true
	},
	is_attach:{
		type: "boolean",
		optional: true
	},
	is_comment:{
		type: "boolean",
		optional: true
	},
	is_mark:{
		type: "boolean",
		optional: true
	},
	is_share:{
		type: "boolean",
		optional: true
	},
	is_theme:{
		type: "boolean",
		optional: true
	},
	is_shop:{
		type: "boolean",
		optional: true
	},
	catalogs:{
		type: "array",
		optional: true,
		default: []
	},
	attributes:{
		type: "array",
		optional: true,
		default: []
	},
	display_order:{
		type: "number",
		optional: true
	}
}
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	id: {
		type:"number",
		optional: false
	},
	...createParams
}

/**
 * 【根据id获取模型请求】参数配置模型
 */
export const getParams: ActionParamSchema = {
	id: {
		type:"number"
	},
}

/**
 * 【删除请求】参数配置模型
 */
export const deleteParams: ActionParamSchema = {
	id: {
		type:"number"
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
		type: "string",
		optional: true,
	},
	sort:{
		type: "string",
		optional: true,
	},
}
