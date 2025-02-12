// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/**
 * 权限表
 */
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name: "permission",
	define:{
		id:{
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		name:{
			/** 权限名 */
			type: db.STRING,
			allowNull: false
		},
		service:{
			/** 服务名称，用于指定服务的访问验证 */
			type: db.STRING,
			allowNull: false
		},
		method: {
			/** 方法名称，用于指定方法校验 */
			type: db.STRING,
			allowNull: false
		},
		method_title:{
			/** 方法标题，用于简述方法业务作用 */
			type: db.STRING,
			allowNull: false
		},
		/**
		 * 详细介绍
		*/
		description:{
			/** 介绍 */
			type: db.STRING,
			allowNull: false,
			unique: true
		},
		display_order: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	options
}
