import type { ActionParamSchema } from "moleculer"

/**
 * @description 创建参数
 */
export const createParams: ActionParamSchema = {
	to_type_id: {
		type: "number",
		optional: false,
	},
	contact_name:{
		type: "string",
		optional: false,
	},
	contact_mobile: {
		type: "string",
		optional: false,
	},
	contact_wechat: {
		type: "string",
		optional: true,
	},
	company_name:{
		type: "string",
		optional: false,
	},
	company_address:{
		type: "string",
		optional: false,
	},
	position: {
		type: "string",
		optional: true,
	},
	remark: {
		type: "string",
		optional: true,
	},
	images: {
		type: "array",
		optional: true
	}
}
/**
 * @description 更新参数
 */
export const updateParams: ActionParamSchema = {
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
	to_type_id: {
		type: "number",
		optional: true
	},
	status: {
		type: "number",
		optional: true
	}
}

export const approveParams: ActionParamSchema = {
	id: {
		type: "string",
		optional: false,
	},
	status: {
		type: "number",
		optional: false,
	},
	reason: {
		type: "string",
		optional: true,
	},
}
