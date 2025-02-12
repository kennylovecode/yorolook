// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name: "account_type_request",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		account_uuid:{
			type: db.UUID,
			allowNull: false,
		},
		to_type_id: {
			type: db.BIGINT,
			allowNull: false,
		},
		contact_name: {
			type: db.STRING(255),
			allowNull: false,
		},
		contact_mobile:{
			type: db.STRING(255),
			allowNull: false,
		},
		contact_wechat:{
			type: db.STRING(255),
			allowNull: false,
		},
		company_name:{
			type: db.STRING(255),
			allowNull: false,
		},
		company_address:{
			type: db.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		images: {
			type: db.JSON,
			allowNull: true,
			defaultValue: [],
		},
		position: {
			type: db.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		remark: {
			type: db.STRING(255),
			allowNull: false,
		},
		status: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		reason: {
			type: db.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		auditor_uuid: {
			type: db.UUID,
			allowNull: true,
		},
		auditor_name: {
			type: db.UUID,
			allowNull: true,
		},
	},
	options
}
