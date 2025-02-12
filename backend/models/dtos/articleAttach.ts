import type { ActionParamSchema } from "moleculer"

export const createParams:ActionParamSchema = {
	article_uuid: {
		type: "string",
		optional: false,
	},
	title: {
		type: "string",
		optional: false,
	},
	cover:{
		type: "string",
		optional: true,
	},
	file_val: {
		type: "string",
		optional: true,
	},
	display_order:{
		type: "number",
		optional: true,
		default: 0
	}
}
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	...createParams,
	id: {
		type: "number",
		optional: false,
	},
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
	sort: {
		type: "string",
		optional: true,
		default: "",
	}
}
