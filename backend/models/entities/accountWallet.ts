// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name:"account_wallet",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		account_uuid: {
			type: db.UUID,
			allowNull: false
		},
        title: {
            type: db.STRING,
            allowNull: false
        },
        // 类型如 余额:amount 积分:point
        type: {
            type: db.STRING,
            allowNull: false,
            defaultValue: 'amount'
        },
        // 相关值 如 充值100 消费-100
        value: {
            type: db.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        // before
        before: {
            type: db.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        // after
        after: {
            type: db.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        // 备注
        remark: {
            type: db.TEXT,
            allowNull: true
        }
	},
	options
}
