// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 账户表 */
export const model: DbModel = {
	name: "account",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		manage: {
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		username: {
			type: db.STRING(255),
			allowNull: false,
		},
		password: {
			type: db.STRING(255),
			allowNull: false,
		},
		mobile: {
			type: db.STRING(11),
			allowNull: false,
		},
		email: {
			type: db.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		wechat:{
			type: db.STRING(255),
			allowNull: true,
		},
		rename:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		reg_time: {
			type: db.DATE,
			allowNull: false,
			defaultValue: db.NOW
		},
		ip:{
			type: db.STRING(255),
			allowNull: true,
		},
		type_id:{
			type: db.BIGINT,
			allowNull: false,
		},
		amount:{
			/** 账户余额 */
			type: db.BIGINT,
			allowNull: false,
			defaultValue: 0,
		},
		point:{
			/** 积分 */
			type: db.BIGINT,
			allowNull: false,
			defaultValue: 0
		},
		amount_decimal:{
			/** 累计消费 满1的时候去扣除amount */
			type: db.BIGINT,
			allowNull: false,
			defaultValue: 0
		},
		point_decimal:{
			/** 累计消费 满1的时候去扣除point*/
			type: db.BIGINT,
			allowNull: false,
			defaultValue: 0
		},
		/**
		 * 分销账户
		 */
		is_distribution:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		/**
		 * 分销账号备注
		 */
		distribution_remark:{
			type: db.STRING(255),
			allowNull: true,
		},
		status: {
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		preference:{
			type: db.JSON,
			allowNull: true,
		},
		privacy:{
			type: db.JSON,
			allowNull: true,
		},
		other: {
			type: db.JSON,
			allowNull: true,
		}
	},
	options
};
