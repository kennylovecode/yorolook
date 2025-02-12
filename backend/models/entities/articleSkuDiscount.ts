// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 账户表 */
export const model: DbModel = {
	name: "acrtilce_sku_discount",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		channel: {
			type: db.STRING(255),
			allowNull: false
		},
		article_uuid: {
			type: db.STRING(255),
			allowNull: false
		},
		artilce_sku_uuid: {
			type: db.STRING(255),
			allowNull: false
		},
		rank_uuid: {
			type: db.STRING(255),
			allowNull: false,
		},
	},
	options
};
