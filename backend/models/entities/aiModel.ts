// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 频道表 */
export const model: DbModel = {
	name: "ai_model",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		/** 分类 like ideogram/stability.ai/flux/midjourney */
		catalog: {
			type: db.STRING,
			allowNull: false
		},
		/** 类型 like 
		 * T2T: text to text
		 * T2I: text to image
		 * T2V: text to video
		 * I2I: image to image
		 * I2V: image to video
		 * T2A: text to audio
		 * I2A: image to audio
		 */
		type: {
			type: db.STRING,
			allowNull: false
		},
		/** 模型名称 */
		name: {
			type: db.STRING,
			allowNull: false
		},
		/** 标题 */
		title: {
			type: db.STRING,
			allowNull: false
		},
		/** 价格 */
		cost: {
			type: db.INTEGER,
			allowNull: false
		},
		/** 价格按TOKEN收费 */
		cost_token:{
			type: db.INTEGER,
			allowNull: false,
		},
	},
	options
};
