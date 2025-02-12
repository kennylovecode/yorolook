// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"account_umbrella_struct",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		/**
		 * 根账户ID
		 */
		root_account_uuid: {
			type: db.UUID,
			allowNull: false
		},
		/**
		 * 邀请人账户ID
		 */
		inviter_account_uuid: {
			type: db.UUID,
			allowNull: false
		},
		/**
		 * 当前账户ID
		 */
		account_uuid: {
			type: db.UUID,
			allowNull: false
		},
		/**
		 * 邀请类型
		 */
		inviter_type: {
			type: db.INTEGER,
			allowNull: false
		}
	},
	options
}
