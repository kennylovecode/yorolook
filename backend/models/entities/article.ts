// eslint-disable-next-line import/no-extraneous-dependencies
import db, { Sequelize } from "sequelize";
import type { DbModel } from "../types";
import { model as ArticleAttributeValueModel } from "./articleAttributeValue";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 文章表 */
export const model: DbModel = {
	name: "article",
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
		brand_uuid: {
			type: db.STRING,
			allowNull: true,
		},
		/** 分类数据 */
		catalogs:{
			type: db.STRING,
			allowNull: true,
			defaultValue: "",
		},
		/** 标题 */
		title: {
			type: db.STRING(64),
			allowNull: false,
		},
		/** 子标题 */
		sub_title: {
			type: db.STRING(255),
			allowNull: true,
		},
		/** 简要 */
		sketch: {
			type: db.STRING(500),
			allowNull: false,
		},
		/** 关键词，标签 */
		keywords: {
			type: db.STRING(2000),
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
		/** images 集合 */
		images: {
			type: db.STRING(2000),
			allowNull: true,
		},
		/** videos 集合 */
		videos: {
			type: db.STRING(255),
			allowNull: true,
		},
		/** 完整内容，含HTML */
		full_content: {
			type: db.TEXT("long"),
			allowNull: false,
		},
		/** 最低价格 */
		lowest_price: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		/** 最高价格 （那么文章有时会出现图片标记PRODUCT的可能，这个价格根据PRODUCT进行统计） */
		highest_price: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		/** 被点赞次数 */
		like:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		/** 被收藏次数 */
		collect_count:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		owner_uuid: {
			type: db.JSON,
			allowNull: true,
		},
		/** 发布者推荐 */
		owner_recommend:{
			type:db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		/** 系统推荐 */
		sys_recommend:{
			type:db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		display_order:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 99
		},
		publish_date: {
			type: db.DATE,
			allowNull: true,
		},
		status: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		extends:{
			type: db.JSON,
			allowNull: true
		}
	},
	options
};
