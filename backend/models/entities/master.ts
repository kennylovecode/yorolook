// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 品牌表 */
export const model: DbModel = {
	name: "master",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		logo: {
			type: db.STRING(255),
			allowNull: true,
			default: ""
		},
		/** 品牌名称 */
		title:{
			type: db.STRING(64),
			allowNull: false,
		},
		/** 品牌别名 */
		sub_title:{
			type: db.STRING(64),
			allowNull: true,
		},
		/** 轮播图 */
		banners:{
			type: db.STRING(1000),
			allowNull: true,
		},
		/** 封面图 */
		covers:{
			type: db.STRING(1000),
			allowNull: true,
		},
		catalogs:{
			type: db.STRING(2000),
			allowNull: true,
		},
		/** 所在国家 */
		country:{
			type: db.STRING(64),
			allowNull: true,
		},
		/** 所在城市 */
		city:{
			type: db.STRING(64),
			allowNull: true,
		},
		/** 品牌官网 */
		website:{
			type: db.STRING(255),
			allowNull: true,
		},
		/** 品牌类别 */
		type:{
			type: db.STRING(255),
			allowNull: true,
		},
		/** 首字母 */
		initial:{
			type: db.STRING(64),
			allowNull: false,
		},
		/** 品牌详细介绍 */
		description:{
			type: db.TEXT,
			allowNull: true,
		},
		/** 品牌联系人信息 */
		contacts:{
			type: db.JSON,
			allowNull: true
		},
		attributes:{
			type: db.JSON,
			allowNull: true
		},
		/** 发布者推荐 */
		owner_recommend:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		/** 系统推荐 */
		sys_recommend:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		/** 创建人uuid */
		owner_uuid:{
			type: db.STRING(64),
			allowNull: true,
		},
		/** 其他信息 */
		other_message:{
			type: db.JSON,
   			allowNull: true,
		},
		/** 状态 */
		status:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		display_order:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	options
};
