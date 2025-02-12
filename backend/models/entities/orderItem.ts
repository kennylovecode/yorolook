import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

export const model: DbModel = {
	name: "order_item",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		order_uuid: {
			type: db.STRING(255),
			allowNull: false,
			comment: "订单ID"
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
			comment: "数量"
		},
		price: {
			type: db.INTEGER,
			allowNull: false,
			comment: "单价(分)"
		},
		total_amount: {
			type: db.INTEGER,
			allowNull: false,
			comment: "总金额(分)"
		}
	},
	options
}