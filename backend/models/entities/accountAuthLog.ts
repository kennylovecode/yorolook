// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"account_auth_log",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		account_uuid: {
			type: db.UUID,
			allowNull: false
		},
        platform: {
            type: db.STRING,
            allowNull: false
        },
        response: {
            type: db.JSON,
            allowNull: false,
        },
	},
	options
}
