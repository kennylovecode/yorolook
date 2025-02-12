// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 用户共享任务结果 */
export const model: DbModel =  {
	name: "task_publish",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		account_uuid: {
			type: db.UUID,
			allowNull: false,
		},
		task_id: {
			type: db.UUID,
			allowNull: false,
		},
		directory_uuid: {
			type: db.UUID,
			allowNull: false,
		},
		cover: {
			type: db.STRING(1000),
			allowNull: false,
		},
		/// 发布到本地的图片ID
		images: {
			type: db.JSON,
			allowNull: false,
		},
		status: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	options
};