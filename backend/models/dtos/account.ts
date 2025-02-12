import type { ActionParamSchema } from "moleculer"
import { options } from "../entities/account"
/**
 * @description 登录参数
 */
export const loginParams: ActionParamSchema = {
	/**
	 * 可能是手机号，邮箱或普通用户名，统一使用此属性 */
	username: {
		type: "string",
		optional: false,
	},
	/**
	 * 密码
	 */
	password: {
		type: "string",
		optional: true,
	},
	/**
	 * 验证码
	 */
	code: {
		type: "string",
		optional: true,
	},
	/**
	 * 是否需要记住登录态
	 */
	remember:{
		type: "boolean",
		optional: true,
		default: false
	},
	/**
	 * 邀请人
	 */
	invite: {
		type: "string",
		optional: true,
	}
}
/**
 * @description 后台创建账号参数
 */
export const createParams:ActionParamSchema = {
	username: {
		type: "string",
		optional: false,
	},
	password: {
		type: "string",
		optional: false,
	},
	manage: {
		type: "number",
		optional: true,
		default: false
	},
	mobile:{
		type: "string",
		optional: false,
	},
	email: {
		type: "string",
		optional: false,
	},
	type_id: {
		type: "string",
		optional: true,
	},
	ip:{
		type: "string",
		optional: true,
	},
	amount:{
		type: "number",
		optional: true,
		default: 0
	},
	point: {
		type: "number",
		optional: true,
		default: 0
	},
	consum:{
		type: "number",
		optional: true,
		default: 0
	},
	is_distribution: {
		type: "number",
		optional: true
	},
	distribution_remark:{
		type: "string",
		optional: true
	},
	privacy: {
		type: "object",
		optional: true
	},
	preference: {
		type: "object",
		optional: true
	},
	status:{
		type: "number",
		optional: true
	}
}
/**
 * @description 更新账号信息参数
 */
export const updateParams: ActionParamSchema = {
	username: {
		type: "string",
		optional: false,
	},
	password: {
		type: "string",
		optional: false,
	},
	code: {
		type: "string",
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
	keywords:{
		type: "string",
		optional: true,
	},
	sort:{
		type: "string",
		optional: true,
	},
}

/**
 * 初始化参数
 */
export const setupParams: ActionParamSchema ={
	username: {
		type: "string",
		optional: false,
	},
	password: {
		type: "string",
		optional: false,
	},
}
