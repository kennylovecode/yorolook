import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
export const model: DbModel = {
	name:"util",
	define:{
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		key:{
			type: db.STRING(32),
			allowNull: false,
		},
		value: {
			type: db.JSON,
			allowNull: false,
		},
		remark: {
			type: db.STRING(1000),
			allowNull: true,
			defaultValue: ""
		}
	},
	options
};
