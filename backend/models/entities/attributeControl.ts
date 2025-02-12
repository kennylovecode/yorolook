import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 属性表 */
export const model: DbModel = {
	name: "attribute_control",
	define: {
		id: {
			type: db.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: db.UUIDV4,
		},
		attribute_uuid:{
			type: db.UUID,
   			allowNull: false,
		},
		text_prompt:{
			type: db.STRING(255),
			allowNull: true
		},
		required:{
			type: db.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		control_type:{
			type: db.STRING,
      		allowNull: false,
			defaultValue: "text"
		},
		min:{
			type: db.INTEGER,
			allowNull: true,
		},
		max:{
			type: db.INTEGER,
			allowNull: true
		},
		exts:{
			type: db.STRING(1000),
			allowNull: true
		},
		size:{
			type: db.INTEGER,
			allowNull: true
		},
		default_value:{
			type: db.STRING(1000),
			allowNull: true
		}
	},
	options
};
