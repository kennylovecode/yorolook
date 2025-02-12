import type { ActionParamSchema } from "moleculer"

export const createParams: ActionParamSchema = {
    from_account_uuid:{
		type: "string",
		optional: true,
	},
	from_name: {
        type: "string",
		optional: true,
	},
    to_account_uuid: {
		type: "string",
		optional: true,
	},
    model: {
		type: "string",
		optional: true,
	},
	model_reply: {
		type: "object",
		optional: true,
	},
    messages: {
		type: "array",
		optional: true,
	},
    content: {
		type: "string",
		optional: false,
	},
	fee: {
		type: "number",
		optional: false,
		default: 0
	},
	fee_type: {
		type: "string",
		optional: false,
		default: "point"
	}
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
}
