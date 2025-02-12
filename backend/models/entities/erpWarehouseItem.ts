// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 仓库表 */
export const model: DbModel = {
	name: "erp_warehouse_item",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		warehouse_uuid: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		project_uuid: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		item_uuid: {
			type: db.JSON,
			allowNull: false,
			defaultValue: []
		},
		amount: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		remark: {
			type: db.TEXT("medium"),
			allowNull: true
		},
		last_enter_date: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		},
		last_outer_date: {
			type: db.STRING,
			allowNull: false,
			defaultValue: 0
		}
	},
	options
};
