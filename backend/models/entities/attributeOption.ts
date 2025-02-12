// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 属性可选项表 */
export const model: DbModel = {
	name: "attribute_option",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		attribute_uuid:{
			type: db.UUID,
			allowNull: false,
		},
		name:{
			type: db.STRING(64),
			allowNull: false,
			validate:{
				len: {
					args: [3,32],
					msg: "属性值名称长度必须在3-32个字符之间..."
				},
			}
		},
		title:{
			type: db.STRING(64),
			allowNull: false,
			validate:{
				len: {
					args: [1,16],
					msg:"标题长度必须在1-16个字符之间..."
				},
			}
		},
		rgba:{
			type: db.STRING(64),
			allowNull: true,
		},
		image:{
			type: db.TEXT("medium"),
			allowNull: true,
		},
		display_order:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 99
		}
	},
	options
};
