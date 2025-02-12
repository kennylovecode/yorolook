// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 文章表 */
export const model: DbModel = {
	name: "article_sku",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		/** 频道 */
		channel: {
			type: db.STRING,
			allowNull: true,
		},
		/** 频道 */
		article_uuid: {
			type: db.STRING,
			allowNull: true,
		},
		/** 标题 */
		title: {
			type: db.STRING(1000),
			allowNull: false,
		},
		/** 子标题 */
		sub_title: {
			type: db.STRING(1000),
			allowNull: true,
		},
		/** 快速访问代码 */
		quick_code: {
			type: db.STRING(255),
			allowNull: true,
		},
		/** cover */
		cover: {
			type: db.STRING(255),
			allowNull: true,
		},
		cost_price: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		sale_price: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		market_price:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		is_discount:{
			type: db.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		is_activity:{
			type: db.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		display_order:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
	},
	options
};
