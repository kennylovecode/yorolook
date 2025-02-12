/* eslint-disable no-await-in-loop */
import type { Context } from "moleculer";
import { Op } from "sequelize";
import { createParams, listParams } from "../models/dtos/order";
import createService from "./base";

const service = createService("order");

service.actions = {
	...service.actions,
	create: {
		rest: "PUT /create",
		auth: true,
		params: createParams,
		async handler(ctx: Context<any, any>) {
			const { cart_ids, shipping_address, remark } = ctx.params;

			// 获取购物车项
			const cartItems = await this.broker.call("cart._list", {
				query: {
					id: { [Op.in]: cart_ids },
					account_uuid: ctx.meta.user.id
				}
			});

			if (cartItems.length === 0) {
				throw new Error("购物车项不存在");
			}

			// 计算订单总金额
			let totalAmount = 0;
			const orderItems = [];

			for (const cart of cartItems) {
				const sku = await this.broker.call("article_sku._get", { id: cart.article_sku_uuid });
				if (!sku) {
					throw new Error("商品规格不存在");
				}

				const itemAmount = sku.sale_price * cart.quantity;
				totalAmount += itemAmount;

				orderItems.push({
					article_uuid: cart.article_uuid,
					article_sku_uuid: cart.article_sku_uuid,
					quantity: cart.quantity,
					price: sku.sale_price,
					total_amount: itemAmount
				});
			}

			// 生成订单号
			const orderNo = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;

			// 创建订单
			const order = await this.adapter.insert({
				account_uuid: ctx.meta.user.id,
				order_no: orderNo,
				total_amount: totalAmount,
				status: 0,
				shipping_address,
				remark
			});

			// 创建订单项
			for (const item of orderItems) {
				await this.broker.call("order_item.create", {
					...item,
					order_uuid: order.id
				});
			}

			// 删除购物车项
			await this.broker.call("cart._remove", {
				query: {
					id: { [Op.in]: cart_ids }
				}
			});

			return order;
		}
	},

	list: {
		rest: "GET /list",
		auth: true,
		params: listParams,
		async handler(ctx: Context<any, any>) {
			const { status, idx = 1, size = 10 } = ctx.params;
			const query: any = {
				account_uuid: ctx.meta.user.id
			};

			if (status !== undefined) {
				query.status = status;
			}

			const orders = await this.adapter.find({
				query,
				limit: size,
				offset: (idx - 1) * size,
				sort: ["-created_at"]
			});

			// 获取订单项详情
			const enrichedOrders = await Promise.all(
				orders.map(async (order) => {
					const items = await this.broker.call("order_item._list", {
						query: { order_uuid: order.id }
					});

					const enrichedItems = await Promise.all(
						items.map(async (item) => {
							const article = await this.broker.call("article._get", { id: item.article_uuid });
							const sku = await this.broker.call("article_sku._get", { id: item.article_sku_uuid });
							return {
								...item,
								article,
								sku
							};
						})
					);

					return {
						...order,
						items: enrichedItems
					};
				})
			);

			return {
				list: enrichedOrders,
				total: await this.adapter.count({ query })
			};
		}
	},

	cancel: {
		rest: "PUT /cancel/:id",
		auth: true,
		params: {
			id: "string"
		},
		async handler(ctx: Context<any, any>) {
			const order = await this.adapter.findById(ctx.params.id);
			if (!order || order.account_uuid !== ctx.meta.user.id) {
				throw new Error("订单不存在");
			}

			if (order.status !== 0) {
				throw new Error("订单状态不允许取消");
			}

			return this.adapter.updateById(order.id, {
				$set: { status: 2 }
			});
		}
	},

	detail: {
		rest: "GET /:id",
		auth: true,
		params: {
			id: "string"
		},
		async handler(ctx: Context<any, any>) {
			const order = await this.adapter.findById(ctx.params.id);
			if (!order || order.account_uuid !== ctx.meta.user.id) {
				throw new Error("订单不存在");
			}

			const items = await this.broker.call("order_item._list", {
				query: { order_uuid: order.id }
			});

			const enrichedItems = await Promise.all(
				items.map(async (item) => {
					const article = await this.broker.call("article._get", { id: item.article_uuid });
					const sku = await this.broker.call("article_sku._get", { id: item.article_sku_uuid });
					return {
						...item,
						article,
						sku
					};
				})
			);

			return {
				...order,
				items: enrichedItems
			};
		}
	}
};

export default service;
