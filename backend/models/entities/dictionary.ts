// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 字典表 */
export const model: DbModel = {
	name: "dictionary",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		key: {
			type: db.STRING,
			allowNull: false,
			unique: true,
		},
		text:{
			type: db.STRING,
			allowNull: false,
		},
		options:{
			type: db.JSON,
			allowNull: false,
			defaultValue: {}
		}
	},
	options
};
