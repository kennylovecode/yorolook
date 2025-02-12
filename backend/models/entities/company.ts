// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"company",
	define:{
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		account_uuid:{
			type: db.UUID,
			allowNull: false,
		},
		domain: {
			/** 私有域 */
			type: db.STRING(255),
			allowNull: true,
		},
		logo:{
			type: db.STRING(255),
			allowNull: false,
		},
		banners:{
			type: db.STRING(255),
			allowNull: true,
		},
		certificate:{
			type: db.STRING(255),
			allowNull: true,
		},
		title: {
			type: db.STRING(255),
			allowNull: false,
		},
		country:{
			type: db.STRING(255),
			allowNull: false,
		},
		province:{
			type: db.STRING(255),
			allowNull: false,
		},
		city:{
			type: db.STRING(255),
			allowNull: false,
		},
		address:{
			type: db.STRING(255),
			allowNull: false,
		},
		contacts:{
			type: db.JSON,
			allowNull: false,
		},
		other_message:{
			type: db.JSON,
			allowNull: true,
		},
		display_order: {
			type: db.INTEGER,
			allowNull: false,
		},
	},
	options
}
