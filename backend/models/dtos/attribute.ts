import type { ActionParamSchema } from "moleculer"


export const createParams:ActionParamSchema = {
	name: {
		type: "string",
		optional: false,
	},
	title:{
		type: "string",
		optional: false,
	},
	sketch:{
		type: "string",
		optional: true,
	},
	keywords:{
		type: "string",
		optional: true,
	},
	common: {
		type: "number",
		optional: true,
		default: 0
	},
	display_order:{
		type: "number",
		optional: true,
		default: 0
	}
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
		type: "uuid"
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
