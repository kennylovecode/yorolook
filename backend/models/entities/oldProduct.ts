import db from "sequelize";
import type { DbModel } from "../types";

/** 频道文章产品表 */
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name: "yl_old_product",
	define: {
		id: {
			type: db.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		site_id: {
			type: db.INTEGER,
			allowNull: false,
		},
		channel_id: {
			type: db.INTEGER,
			allowNull: false,
		},
		category_id: {
			type: db.INTEGER,
			allowNull: false,
		},
		brand_id: {
			type: db.INTEGER,
			allowNull: false,
		},
		call_index: {
			type: db.STRING(50),
			allowNull: true,
		},
		title: {
			type: db.STRING(100),
			allowNull: true,
		},
		link_url: {
			type: db.STRING(255),
			allowNull: true,
		},
		img_url: {
			type: db.STRING(255),
			allowNull: true,
		},
		seo_title: {
			type: db.STRING(255),
			allowNull: true,
		},
		seo_keywords: {
			type: db.STRING(255),
			allowNull: true,
		},
		seo_description: {
			type: db.STRING(255),
			allowNull: true,
		},
		tags: {
			type: db.TEXT,
			allowNull: true,
		},
		zhaiyao: {
			type: db.STRING(255),
			allowNull: true,
		},
		content: {
			type: db.TEXT,
			allowNull: true,
		},
		sort_id: {
			type: db.INTEGER,
			allowNull: false,
		},
		click: {
			type: db.INTEGER,
			allowNull: false,
		},
		status: {
			type: db.INTEGER,
			allowNull: false,
		},
		is_msg: {
			type: db.INTEGER,
			allowNull: false,
		},
		is_top: {
			type: db.INTEGER,
			allowNull: false,
		},
		is_red: {
			type: db.INTEGER,
			allowNull: false,
		},
		is_hot: {
			type: db.INTEGER,
			allowNull: false,
		},
		is_slide: {
			type: db.INTEGER,
			allowNull: true,
		},
		is_sys: {
			type: db.INTEGER,
			allowNull: false,
		},
		user_name: {
			type: db.STRING(100),
			allowNull: true,
		},
		like_count: {
			type: db.INTEGER,
			allowNull: false,
		},
		add_time: {
			type: db.DATE,
			allowNull: false,
		},
		update_time: {
			type: db.DATE,
			allowNull: true,
		},
		brand_list: {
			type: db.STRING(255),
			allowNull: true,
		},
		goods_no: {
			type: db.STRING(100),
			allowNull: true,
		},
		stock_quantity: {
			type: db.INTEGER,
			allowNull: true,
		},
		market_price: {
			type: db.DECIMAL(9, 2),
			allowNull: true,
		},
		sell_price: {
			type: db.DECIMAL(9, 2),
			allowNull: true,
		},
		style: {
			type: db.STRING(255),
			allowNull: true,
		},
		sub_title: {
			type: db.STRING(255),
			allowNull: true,
		},
		is_imported: {
			type: db.STRING(255),
			allowNull: true,
		},
		price_level: {
			type: db.STRING(255),
			allowNull: true,
		},
		priceup_persent: {
			type: db.DECIMAL(9, 2),
			allowNull: true,
		},
		goods_params: {
			type: db.TEXT,
			allowNull: true,
		},
		discount_type: {
			type: db.STRING(255),
			allowNull: true,
		},
		discount_value: {
			type: db.STRING(50),
			allowNull: true,
		},
		sell_line: {
			type: db.STRING(255),
			allowNull: true,
		},
		point: {
			type: db.INTEGER,
			allowNull: true,
		},
		colors: {
			type: db.STRING(50),
			allowNull: true,
		},
		sub_category_id: {
			type: db.INTEGER,
			allowNull: true,
		},
		goods_number_relation: {
			type: db.TEXT,
			allowNull: true,
		},
		makein: {
			type: db.STRING(255),
			allowNull: true,
		},
		product_diy: {
			type: db.STRING(255),
			allowNull: true,
		},
		reference_price: {
			type: db.STRING(255),
			allowNull: true,
		},
		deliver_days: {
			type: db.STRING(255),
			allowNull: true,
		},
		level: {
			type: db.STRING(50),
			allowNull: true,
		},
		model3d_url: {
			type: db.TEXT,
			allowNull: true,
		},
	},
	options: undefined
};
