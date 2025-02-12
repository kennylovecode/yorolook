// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"supplier",
	define:{
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		/** 账户关联 */
		account_uuid:{
			type: db.UUID,
			allowNull: true,
		},
		/** 私有域设置 */
		domain: {
			type: db.STRING(255),
			allowNull: true,
		},
		/** logo base64*/
		logo:{
			type: db.TEXT("medium"),
			allowNull: false,
		},
		/** banners uuid list */
		banners:{
			type: db.JSON,
			allowNull: true,
		},
		/** certificate file uuid */
		certificate:{
			type: db.UUID,
			allowNull: true,
		},
		/** 名称 */
		title: {
			type: db.STRING(255),
			allowNull: false,
		},
		/** 国家 */
		country:{
			type: db.STRING(255),
			allowNull: false,
		},
		/** 省 */
		province:{
			type: db.STRING(255),
			allowNull: false,
		},
		/** 市 */
		city:{
			type: db.STRING(255),
			allowNull: false,
		},
		/** 详细地址 */
		address:{
			type: db.STRING(255),
			allowNull: false,
		},
		/** 联系人 */
		contacts:{
			type: db.JSON,
			allowNull: false,
		},
		/** 结算账户 */
		banks:{
			type: db.JSON,
			allowNull: false,
			defaultValue: [],
		},
		/** 票面税点 */
		face_tax_point:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		/** 实收税点 */
		real_tax_point:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		/** 折扣 */
		discount:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 100,
		},
		/** 折扣备注 */
		discount_remark:{
			type: db.TEXT("medium"),
			allowNull: true,
		},
		/** 其他信息 */
		other_message:{
			type: db.JSON,
			allowNull: true,
		},
		/** 排序 */
		display_order: {
			type: db.INTEGER,
			allowNull: false,
		},
	},
	options
}
