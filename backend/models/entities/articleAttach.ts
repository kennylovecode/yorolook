// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 附件表 */
export const model: DbModel = {
	name: "attach",
	define: {
		id: {
			type: db.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		article_uuid:{
			type: db.STRING(255),
			allowNull: false,
		},
		title: {
			type: db.STRING(255),
			allowNull: false,
		},
		cover: {
			type: db.STRING,
			allowNull: true
		},
		file_val:{
			type: db.STRING(255),
			allowNull: false
		},
		display_order: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 99
		},
	},
	options
};
