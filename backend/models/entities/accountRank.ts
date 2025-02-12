// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"account_rank",
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
		type_id: {
			type: db.BIGINT,
			allowNull: false,
		},
		type_rank_id: {
			type: db.BIGINT,
			allowNull: false,
		},
		expired_time:{
			type: db.DATE,
			allowNull: true,
		}
	},
	options
}
