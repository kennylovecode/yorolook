import type { ActionParamSchema } from "moleculer"

export const createParams: ActionParamSchema = {
    task_id: {
        type: "string",
        optional: false,
    },
    title: {
        type: "string",
        optional: false,
    },
	cover: {
		type: "string",
		optional: true,
	},
    cost: {
        type: "number",
        optional: true,
        default: 0
    },
    cost_type: {
        type: "string",
        optional: true,
        default: "point"
    }
}

export const updateParams: ActionParamSchema = {
	id: {
		type: "string",
		optional: false,
	},
	...createParams
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
	status:{
		type: "number",
		optional: true,
		defaultValue: -1
	},
}
