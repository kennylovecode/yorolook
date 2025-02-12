// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
/**
 * 根据身份默认分配的权限
 */
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"type_permission",
	define:{
		id: {
			type: db.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		/**
		 * 身份id
		 */
		type_id:{
			type: db.BIGINT,
			allowNull: false
		},
		/**
		 * 权限ID
		 */
		permission_uuid:{
			type: db.INTEGER,
			allowNull: false
		},
		/*
		 * 排序
		 */
		display_order: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	options
};
