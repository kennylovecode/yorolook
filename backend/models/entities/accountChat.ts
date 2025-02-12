// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

/** 频道表 */
export const model: DbModel = {
	name: "account_chat",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
        from_account_uuid: {
			type: db.UUID,
			allowNull: false
		},
        from_name: {
            type: db.STRING(255),
            allowNull: false
        },
        to_account_uuid: {
			type: db.UUID,
			allowNull: true
		},
        model: {
            type: db.STRING,
            allowNull: true
        },
		model_reply:{
			type: db.JSON,
			allowNull: true
		},
        messages:{
            type: db.JSON,
            allowNull: true
        },
        content: {
			type: db.TEXT,
			allowNull: false
		},
		status: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
	},
	options
};
