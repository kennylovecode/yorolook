// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 属性表 */
export const model: DbModel = {
	name: "article_attribute_value",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		article_uuid: {
			type: db.STRING,
			allowNull: false,
		},
		attribute_uuid: {
			type: db.STRING,
			allowNull: false,
		},
		value_uuid: {
			type: db.STRING,
			allowNull: false,
		},
		value: {
			type: db.STRING,
			allowNull: false,
		},
	},
	options
};
