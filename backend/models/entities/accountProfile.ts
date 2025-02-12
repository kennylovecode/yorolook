// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"account_profile",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		account_uuid:{
			type: db.UUID,
			allowNull: false,
		},
		banners:{
			type: db.STRING,
			allowNull: true,
		},
		avatar:{
			type: db.STRING(255),
			allowNull: true,
		},
		nickname: {
			type: db.STRING(255),
			allowNull: false,
		},
		realname:{
			type: db.STRING(255),
			allowNull: true,
		},
		idcard:{
			type: db.STRING(32),
			allowNull: true,
		},
		gender:{
			type: db.STRING(6),
			allowNull: false,
			defaultValue: "保密"
		},
		age:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		birthday:{
			type: db.STRING(255),
			allowNull: true,
		},
		website:{
			type: db.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		occupation:{
			type: db.STRING(255),
			allowNull: true,
		},
		location:{
			type: db.STRING(255),
			allowNull: true,
		},
		description:{
			type: db.TEXT,
			allowNull: true,
			defaultValue: "这位用户比较内向~一句话也没有留下~"
		}
	},
	options
}
