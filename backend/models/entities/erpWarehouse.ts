// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 仓库表 */
export const model: DbModel = {
	name: "erp_warehouse",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		title: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		location: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		contacts: {
			type: db.JSON,
			allowNull: false,
			defaultValue: []
		},
		type: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
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
		}
	},
	options
};
