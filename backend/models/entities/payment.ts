import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

export const model: DbModel = {
	name: "payment",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		order_uuid: {
			type: db.STRING(255),
			allowNull: false,
			comment: "订单ID"
		},
		payment_no: {
			type: db.STRING(50),
			allowNull: false,
			comment: "支付单号"
		},
		amount: {
			type: db.INTEGER,
			allowNull: false,
			comment: "支付金额(分)"
		},
		payment_method: {
			type: db.STRING(20),
			allowNull: false,
			comment: "支付方式: alipay-支付宝 wxpay-微信支付"
		},
		status: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
			comment: "支付状态: 0-待支付 1-支付成功 2-支付失败"
		},
		transaction_id: {
			type: db.STRING(100),
			allowNull: true,
			comment: "第三方支付流水号"
		},
		payment_time: {
			type: db.DATE,
			allowNull: true,
			comment: "支付时间"
		}
	},
	options
}