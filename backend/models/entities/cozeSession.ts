// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"coze_session",
	define:{
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
		conversation_id: {
			type: db.STRING(255),
			allowNull: true,
		},
        title: {
            type: db.STRING(255),
			allowNull: true,
        }
	},
	options
}
