import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

export const model: DbModel = {
	name: "order",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		account_uuid: {
			type: db.STRING(255),
			allowNull: false,
			comment: "用户ID"
		},
		order_no: {
			type: db.STRING(50),
			allowNull: false,
			comment: "订单编号"
		},
		total_amount: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
			comment: "订单总金额(分)"
		},
		status: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
			comment: "订单状态: 0-待支付 1-已支付 2-已取消 3-已退款"
		},
		payment_method: {
			type: db.STRING(20),
			allowNull: true,
			comment: "支付方式: alipay-支付宝 wxpay-微信支付"
		},
		payment_time: {
			type: db.DATE,
			allowNull: true,
			comment: "支付时间"
		},
		shipping_address: {
			type: db.JSON,
			allowNull: true,
			comment: "收货地址信息"
		},
		remark: {
			type: db.STRING(500),
			allowNull: true,
			comment: "订单备注"
		}
	},
	options
}