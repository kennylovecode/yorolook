import type { ActionParamSchema } from "moleculer"

/**
 * @description 创建参数
 */
export const createParams: ActionParamSchema = {
	root_account_uuid:{
		type: "uuid",
		optional: false,
	},
	invite_account_uuid: {
		type: "uuid",
		optional: false,
	},
	account_uuid: {
		type: "uuid",
		optional: false,
	},
	invite_type: {
		type: "number",
		optional: true,
		default: 0
	}
}
/**
 * @description 创建参数
 */
export const createLeetParams: ActionParamSchema = {
	invite_account_uuid: {
		type: "uuid",
		optional: false,
	},
	account_uuid: {
		type: "uuid",
		optional: false,
	},
	invite_type: {
		type: "number",
		optional: true,
		default: 0
	}
}
/**
 * @description 更新参数
 */
export const updateParams: ActionParamSchema = {
	invite_type: {
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
