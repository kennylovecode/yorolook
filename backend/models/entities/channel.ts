// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 频道表 */
export const model: DbModel = {
	name: "channel",
	define: {
		id: {
			type: db.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		/** 名称 */
		name: {
			type: db.STRING(255),
			allowNull: true,
			validate:{
				is: {
					args: ["^[a-z]+$",'i'],
					msg:"必须为小写英文字母..."
				},
				len: {
					args: [2,16],
					msg: "长度必须在2-16个字符之间..."
				},
			}
		},
		/** 标题 */
		title:{
			type: db.STRING(64),
			allowNull: false,
		},
		banners:{
			type: db.JSON,
			allowNull: true,
		},
		/** 频道页面数量 */
		pagesize: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 40,
		},
		/** 每一行数量 */
		linesize:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 5,
		},
		/** 是否限制级频道 */
		limit:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		/** 限制级别 0:无限制  1: 仅首页  255:全部不可见 */
		limit_level:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		/** 账户类型可见 */
		type_rank_limits:{
			type: db.JSON,
			allowNull: true,
			defaultValue: [],
		},
		is_attach:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		is_comment:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		is_mark:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		is_share:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		is_theme:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		is_shop:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		catalogs:{
			type: db.JSON,
			allowNull: true,
			defaultValue: [],
		},
		attributes: {
			type: db.JSON,
			allowNull: true,
			defaultValue: [],
		},
		display_order:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
		}
	},
	options
};
