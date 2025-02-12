// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 属性表 */
export const model: DbModel = {
	name: "attribute",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		name:{
			type: db.STRING(255),
			allowNull: true
		},
		title:{
			type: db.STRING(255),
			allowNull: false,
		},
		sketch:{
			type: db.STRING(500),
			allowNull: true,
		},
		keywords: {
			type: db.STRING(500),
			allowNull: true,
		},
		common:{
			type: db.TINYINT,
			allowNull: true,
		},
		display_order:{
			type: db.INTEGER,
			allowNull: true,
			defaultValue: 0
		}
	},
	options
};
