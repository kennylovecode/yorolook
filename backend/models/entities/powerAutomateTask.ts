// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/**
 * 权限表
 */
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name: "power_automate_task",
	define:{
		id:{
			type: db.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		tasks:{
			type: db.JSON,
			allowNull: false
		},
		status:{
			type: db.STRING,
			allowNull: false
		},
	},
	options
}
