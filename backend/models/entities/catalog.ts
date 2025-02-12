// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 目录表 */
export const model: DbModel = {
	name: "catalog",
	define: {
		id: {
			type: db.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name:{
			type: db.STRING(255),
			allowNull: true
		},
		title:{
			type: db.STRING(255),
			allowNull: false,
		},
		cover:{
			type: db.TEXT("medium"),
			allowNull: true
		},
		parent_id:{
			type: db.BIGINT,
			allowNull: true
		},
		sketch:{
			type: db.STRING(500),
			allowNull: true,
		},
		keywords: {
			type: db.STRING(500),
			allowNull: true,
		},
		path_id: {
			type: db.STRING(500),
			allowNull: true,
		},
		path_title: {
			type: db.STRING(500),
			allowNull: true,
		},
		deep: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		attributes: {
			type: db.JSON,
			allowNull: true,
			defaultValue: [],
		},
		display_order:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 99
		},
	},
	options
};
