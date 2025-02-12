// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/**
 * 账户类型
 */
export const model: DbModel = {
	name: "type",
	define:{
		id: {
			type: db.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: db.STRING,
			allowNull: false,
			unique: true
		},
		title:{
			type: db.STRING,
			allowNull: false,
			unique: true
		},
		description: {
			type: db.STRING,
			allowNull: false
		},
		display_order: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	options
}
