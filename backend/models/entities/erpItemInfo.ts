// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 仓库表 */
export const model: DbModel = {
	name: "erp_item_info",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		category: {
			type: db.STRING,
			allowNull: false,
		},
		title: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		images: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		size: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		description: {
			type: db.TEXT("medium"),
			allowNull: false,
			defaultValue: []
		},
		owner_uuid: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		creator_uuid: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		status: {
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
	},
	options
};
