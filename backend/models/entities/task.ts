// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"task",
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
		/** 任务名称 */
		title:{
			type: db.STRING(255),
			allowNull: false,
		},
		/** 任务类型 例如 MJTT  MJ302   FLUXTT  FLUX302*/
		type: {
			type: db.STRING(255),
			allowNull: false,
		},
		/** 执行方法 imageine action_upsample */
		method:{
			type: db.STRING(255),
			allowNull: true,
		},
		/** 参数 */
		params: {
			type: db.JSON,
			allowNull: true,
		},
		/** 优先级 */
		priority:{
			type: db.INTEGER,
			allowNull: false,
		},
		/** 任务状态 */
		status:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		/** 执行结果 */
		result:{
			type: db.JSON,
			allowNull: true,
		},
		/** 耗时ms */
		duration:{
			type: db.INTEGER,
			allowNull: true,
		},
		/** 错误信息 */
		errors:{
			type: db.JSON,
			allowNull: true,
		},
	},
	options
}
