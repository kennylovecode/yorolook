import type { ActionParamSchema } from "moleculer"
/**
 * @description 创建参数
 */
export const createParams: ActionParamSchema = {
	domain: {
		type: "string",
		optional: true
	},
	logo:{
		type: "string",
		optional: true
	},
	banners:{
		type: "string",
		optional: true
	},
	certificate:{
		type: "string",
		optional: true
	},
	title:{
		type: "string",
		optional: false
	},
	country:{
		type: "string",
		optional: false
	},
	province: {
		type: "string",
		optional: false
	},
	city:{
		type: "string",
		optional: false
	},
	address:{
		type: "string",
		optional: false
	},
	contacts:{
		type: "array",
		optional: false,
		default:[]
	},
	banks:{
		type: "array",
		optional: false,
		default:[]
	},
	face_tax_point:{
		type: "number",
		optional: false,
		default: 0
	},
	real_tax_point:{
		type: "number",
		optional: false,
		default: 0
	},
	discount:{
		type: "number",
		optional: false,
		default: 0
	},
	discount_remark:{
		type: "string",
		optional: true
	},
	account_uuid: {
		type: "string",
		optional: true
	},
	other_message:{
		type:"array",
		optional: true,
		default: []
	},
	display_order:{
		type: "number",
		optional: true,
		default: 0
	}
}

/**
 * @description 更新参数
 */
export const updateParams: ActionParamSchema = {
	id:{
		type:"uuid",
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
