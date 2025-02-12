import type { ActionParamSchema } from "moleculer"


export const createParams:ActionParamSchema = {
	attribute_uuid:{
		type: "uuid",
		optional: false,
	},
	text_prompt: {
		type: "string",
		optional: false,
	},
	required:{
		type: "number",
		optional: true,
		default: 0
	},
	control_type:{
		type: "string",
		optional: false,
		enum: ["text","textarea","single-checkbox","multiple-checkbox","file-upload"]
	},
	min: {
		type: "number",
		optional: true,
		default: 0
	},
	max: {
		type: "number",
		optional: true,
		default: 0
	},
	exts:{
		type: "string",
		optional: true,
	},
	size: {
		type: "number",
		optional: true,
		default: 0
	},
	default_value: {
		type: "string",
		optional: true,
	},
}

export const updateParams: ActionParamSchema = {
	id:{
		type: "uuid",
		optional: false,
	},
	...createParams
}

export const getParams: ActionParamSchema = {
	id: {
		type: "string"
	}
}

export const deleteParams: ActionParamSchema = {
	id: {
		type: "uuid",
		optional: false,
	},
}

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
