import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

export const model: DbModel = {
	name: "cart",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		account_uuid: {
			type: db.STRING(255),
			allowNull: false,
			comment: "用户ID"
		},
		article_uuid: {
			type: db.STRING(255),
			allowNull: false,
			comment: "商品ID"
		},
		article_sku_uuid: {
			type: db.STRING(255),
			allowNull: false,
			comment: "商品SKU ID"
		},
		quantity: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 1,
			comment: "数量"
		},
		selected: {
			type: db.BOOLEAN,
			allowNull: false,
			defaultValue: true,
			comment: "是否选中"
		}
	},
	options
}