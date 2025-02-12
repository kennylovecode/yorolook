// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name: "company_member",
	define:{
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		company_uuid: {
			type: db.UUID,
			allowNull: false
		},
		account_uuid: {
			type: db.UUID,
			allowNull: false
		},
		position: {
			type: db.STRING(255),
			allowNull: false
		}
	},
	options
}
