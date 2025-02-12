import type { ActionParamSchema } from "moleculer"


export const createParams:ActionParamSchema = {
	attribute_uuid:{
		type: "uuid",
		optional: false,
	},
	name: {
		type: "string",
		optional: false,
	},
	title: {
		type: "string",
		optional: false,
	},
	rgba:{
		type: "string",
		optional: true,
	},
	image:{
		type: "string",
		optional: true,
	},
	display_order:{
		type: "number",
		optional: true,
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
