import type { Context } from "moleculer";
import { createParams, notifyParams } from "../models/dtos/payment";
import createService from "./base";

const service = createService("payment");

service.actions = {
	...service.actions,
	create: {
		rest: "PUT /create",
		auth: true,
		params: createParams,
		async handler(ctx: Context<any, any>) {
			const { order_uuid, payment_method } = ctx.params;

			// 获取订单信息
			const order = await this.broker.call("order._get", { id: order_uuid });
			if (!order || order.account_uuid !== ctx.meta.user.id) {
				throw new Error("订单不存在");
			}

			if (order.status !== 0) {
				throw new Error("订单状态不允许支付");
			}

			// 生成支付单号
			const paymentNo = `PAY${Date.now()}${Math.floor(Math.random() * 1000)}`;

			// 创建支付记录
			const payment = await this.adapter.insert({
				order_uuid,
				payment_no: paymentNo,
				amount: order.total_amount,
				payment_method,
				status: 0
			});

			// 这里应该调用实际的支付网关获取支付参数
			// 为了演示，我们直接返回支付信息
			return {
				...payment,
				pay_params: {
					payment_no: paymentNo,
					amount: order.total_amount,
					// 其他支付参数...
				}
			};
		}
	},

	notify: {
		rest: "POST /notify",
		params: notifyParams,
		async handler(ctx: Context<any, any>) {
			const { payment_no, transaction_id, status } = ctx.params;

			// 查找支付记录
			const payment = await this.adapter.findOne({
				query: { payment_no }
			});

			if (!payment) {
				throw new Error("支付记录不存在");
			}

			if (payment.status !== 0) {
				return { message: "支付状态已更新" };
			}

			// 更新支付记录
			await this.adapter.updateById(payment.id, {
				$set: {
					status,
					transaction_id,
					payment_time: new Date()
				}
			});

			// 如果支付成功，更新订单状态
			if (status === 1) {
				await this.broker.call("order.update", {
					id: payment.order_uuid,
					status: 1,
					payment_method: payment.payment_method,
					payment_time: new Date()
				});
			}

			return { message: "支付状态更新成功" };
		}
	},

	query: {
		rest: "GET /query/:payment_no",
		auth: true,
		params: {
			payment_no: "string"
		},
		async handler(ctx: Context<any, any>) {
			const payment = await this.adapter.findOne({
				query: { payment_no: ctx.params.payment_no }
			});

			if (!payment) {
				throw new Error("支付记录不存在");
			}

			const order = await this.broker.call("order._get", { id: payment.order_uuid });
			if (order.account_uuid !== ctx.meta.user.id) {
				throw new Error("无权查询此支付记录");
			}

			return payment;
		}
	}
};

export default service;
