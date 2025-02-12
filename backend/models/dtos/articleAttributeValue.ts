import type { ActionParamSchema } from "moleculer"

export const createParams:ActionParamSchema = {
	article_id: {
		type: "string",
		optional: false,
	},
	attribute_uuid: {
		type: "string",
		optional: false,
	},
	value:{
		type: "string",
		optional: false,
	},
}
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	...createParams,
	id: {
		type: "string",
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
}
