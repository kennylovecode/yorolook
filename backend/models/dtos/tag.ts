import type { ActionParamSchema } from "moleculer"

export const createParams: ActionParamSchema = {
    name: {
        type: "string",
        optional: false,
    },
    title: {
        type: "string",
        optional: false,
    },
	parent_id: {
        type: "number",
        optional: true,
    },
    use: {
        type: "number",
        optional: true,
        default: 0,
    },
    // ... additional fields can be added here ...
}

export const updateParams: ActionParamSchema = {
    id: {
        type: "number",
        optional: false,
    },
    ...createParams
}

export const getParams: ActionParamSchema = {
    id: {
        type: "uuidnumber",
        optional: false,
    }
}

export const deleteParams: ActionParamSchema = {
    id: {
        type: "number",
        optional: false,
    },
}

export const listParams: ActionParamSchema = {
    idx: {
        type: "number",
        optional: true,
        default: 1,
    },
    size: {
        type: "number",
        optional: true,
        default: 40,
    },
    keywords: {
        type: "string",
        optional: true,
    },
    sort: {
        type: "string",
        optional: true,
    },
}
