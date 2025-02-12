import type { ActionParamSchema } from "moleculer"

/**
 * @description 创建参数
 */
export const createParams: ActionParamSchema = {
	type_id: {
		type: "number",
		optional: false,
	},
	permission_uuid:{
		type: "string",
		optional: false,
	},
	display_order: {
		type: "number",
		optional: true,
		default: 0
	}
}
/**
 * @description 更新参数
 */
export const updateParams: ActionParamSchema = {
	display_order: {
		type: "number",
		optional: true,
		default: 0
	}
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
