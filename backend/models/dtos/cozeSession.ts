import type { ActionParamSchema } from "moleculer"
/**
 * @description 创建参数
 */
export const createParams: ActionParamSchema = {
	title: {
		type: "string"
	},
	conversation_id:{
		type: "string"
	},
}

/**
 * @description 更新参数
 */
export const updateParams: ActionParamSchema = {
	id:{
		type:"uuid",
		optional: false
	},
    title: {
		type: "string"
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
