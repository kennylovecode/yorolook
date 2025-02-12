import type { ActionParamSchema } from "moleculer"

/**
 * @description 创建参数
 */
export const createParams: ActionParamSchema = {
	avatar: {
		type: "string",
		optional: true,
	},
	nickname:{
		type: "string",
		optional: false,
	},
	realname: {
		type: "string",
		optional: false,
	},
	idcard: {
		type: "string",
		optional: true,
	},
	gender: {
		type: "string",
		optional: true,
	},
	age: {
		type: "number",
		optional: true,
	},
	birthday: {
		type: "string",
		optional: true,
	},
	occupation:{
		type: "string",
		optional: true,
	},
	website:{
		type: "string",
		optional: true,
	},
	description:{
		type: "string",
		optional: true,
	}
}
/**
 * @description 更新参数
 */
export const updateParams: ActionParamSchema = {
	id: {
		type: "uuid",
		optional: false,
	},
	avatar: {
		type: "string",
		optional: false,
	},
	nickname:{
		type: "string",
		optional: false,
	},
	realname: {
		type: "string",
		optional: false,
	},
	idcard: {
		type: "string",
		optional: false,
	},
	gender: {
		type: "number",
		optional: false,
	},
	age: {
		type: "number",
		optional: false,
	},
	birthday: {
		type: "date",
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
	keywords:{
		type: "array",
		optional: true,
	},
	sort:{
		type: "string",
		optional: true,
	},
}
