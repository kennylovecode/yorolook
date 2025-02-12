// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/**
 * 图片标注表
 */
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name: "image_labs",
	define:{
		id:{
			type: db.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: db.STRING,
			allowNull: false,
			defaultValue: "未命名"
		},
		source_image: {
			type: db.STRING,
			allowNull: false
		},
		target_article_uuid: {
			type: db.STRING,
			allowNull: false
		},
		target_article_sku_uuid: {
			type: db.STRING,
			allowNull: false
		},
		target_amount: {
			type: db.INTEGER,
			allowNull: false
		},
		target_brand_uuid: {
			type: db.STRING,
			allowNull: false
		},
		start_x: {
			type: db.DOUBLE,
			allowNull: false
		},
		start_y: {
			type: db.DOUBLE,
			allowNull: false
		},
		end_x: {
			type: db.DOUBLE,
			allowNull: false
		},
		end_y: {
			type: db.DOUBLE,
			allowNull: false
		},
		jump_url: {
			type: db.STRING,
			allowNull: true,
			defaultValue: ""
		}
	},
	options
}
