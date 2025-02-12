import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
	indexes: [
		{
			name: "idx_name",
			fields: ["name"]
		},
		{
			title: "idx_title",
			fields: ["title"]
		},
	]
}

/** 标签表 */
export const model: DbModel = {
	name: "tag",
	define: {
		id: {
			type: db.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: {
			type: db.STRING(255),
			allowNull: false,
		},
		title: {
			type: db.STRING(255),
			allowNull: false,
		},
		parent_id: {
			type: db.BIGINT,
			allowNull: true,
			defaultValue: 0
		},
		use: {
			type: db.BIGINT,
			allowNull: false,
			defaultValue: 0
		},
	},
	options
};
