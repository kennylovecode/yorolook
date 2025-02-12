import type { ActionParamSchema } from "moleculer"

/**
 * @description 创建参数
 */
export const createParams: ActionParamSchema = {
	account_uuid: {
		type: "string",
		optional: false
	},
	type_id:{
		type:"number",
		optional: false
	},
	type_rank_id: {
		type: "number",
		optional: false
	},
	expired_time:{
		type: "string",
		optional: true,
	}
}
/**
 * @description 更新参数
 */
export const updateParams: ActionParamSchema = {
	id:{
		type:"string",
		optional: false
	},
	...createParams
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
