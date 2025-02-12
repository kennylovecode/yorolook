// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"type_rank",
	define:{
		id: {
			type: db.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		/** 身份类型 */
		type_id:{
			type: db.BIGINT,
			allowNull: false,
		},
		/** 等级名称 */
		title: {
			type: db.STRING(32),
			allowNull: false,
		},
		/** 权重 */
		weight:{
			/** 0 is default ... */
			type: db.SMALLINT,
			allowNull: false,
			defaultValue: 0,
		},
		/** 成长值,代表了是否能够自动升级 */
		growth_value: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		/** 备注 */
		remark: {
			type: db.STRING(255),
			allowNull: true,
		},
		/** 图标 */
		icon: {
			type: db.STRING(255),
			allowNull: true,
		},
		discount: {
			type: db.SMALLINT,
			allowNull: false,
			defaultValue: 100
		},
		/** 排序 */
		display_order: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	options
};
