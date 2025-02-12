import type { ActionParamSchema } from "moleculer"

/**
 * @description 后台创建账号参数
 */
export const createParams:ActionParamSchema = {
}
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	id: {
		type: "uuid",
	},
	title:{
		type: "string",
		optional: true,
	},
	keywords:{
		type: "string",
		optional: true,
	},
	login_limit: {
		type: "number",
		optional: true,
	},
	type_id_limit: {
		type: "string",
		optional: true,
	},
	payment_limit: {
		type: "number",
		optional: true,
	},
	payment_type: {
		type: "string",
		optional: true,
	},
	publish_approve: {
		type: "number",
		optional: true,
	},
	covers: {
		type: "string",
		optional: true,
	},
	owner_recommend: {
		type: "number",
		optional: true,
	},
	sys_recommend: {
		type: "number",
		optional: true,
	},
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
	sort:{
		type: "string",
		optional: true,
	},
}
