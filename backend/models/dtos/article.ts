import type { ActionParamSchema } from "moleculer";

export const createParams: ActionParamSchema = {
	channel: {
		type: "string",
		optional: false,
	},
};
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	...createParams,
	id: {
		type: "string",
		optional: false,
	},
	catalogs: {
		type: "string",
		optional: false,
	},
	brand_uuid: {
		type: "string",
		optional: true,
	},
	title: {
		type: "string",
		optional: false,
	},
	sub_title: {
		type: "string",
		optional: true,
	},
	keywords: {
		type: "string",
		optional: true,
	},
	quick_code: {
		type: "string",
		optional: true,
	},
	cover: {
		type: "string",
		optional: true,
	},
	images: {
		type: "string",
		optional: true,
	},
	videos: {
		type: "string",
		optional: true,
	},
	lowest_price: {
		type: "number",
		optional: true,
	},
	highest_price: {
		type: "number",
		optional: true,
	},
	sketch: {
		type: "string",
		optional: true,
	},
	full_content: {
		type: "string",
		optional: true,
	},
	owner_recommend: {
		type: "number",
		optional: true,
	},
	publish_date: {
		type: "string",
		optional: true,
	},
	status: {
		type: "number",
		optional: true,
	},
	extends: {
		type: "object",
		optional: true,
	},
	sys_recommend: {
		type: "number",
		optional: true,
	},
	display_order: {
		type: "number",
		optional: true,
	},
};

/**
 * 【根据id获取模型请求】参数配置模型
 */
export const getParams: ActionParamSchema = {};

/**
 * 【删除请求】参数配置模型
 */
export const deleteParams: ActionParamSchema = {};

/**
 * 【获取列表请求】参数配置模型
 */

/**
 * 【获取列表请求】参数配置模型
 */
export const listParams: ActionParamSchema = {
	idx: {
		type: "number",
		optional: true,
		default: 1,
	},
	size: {
		type: "number",
		optional: true,
		default: 40,
	},
	keywords: {
		type: "string",
		optional: true,
	},
	sort: {
		type: "string",
		optional: true,
	},
	channel: {
		type: "string",
		optional: false,
	},
	catalog: {
		type: "string",
		optional: true,
	},
	attributes: {
		type: "array",
		optional: true,
	},
	lowest_price: {
		type: "number",
		optional: true,
	},
	highest_price: {
		type: "number",
		optional: true,
	},
	brands: {
		type: "array",
		optional: true,
		default: []
	},
	my: {
		type: "boolean",
		optional: true,
	},
};
