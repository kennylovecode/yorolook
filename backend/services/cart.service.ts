import type { Context } from "moleculer";
import { Op, where } from "sequelize";
import { createParams, listParams, updateParams } from "../models/dtos/cart";
import createService from "./base";

const service = createService("cart");

service.actions = {
	...service.actions,
	create: {
		rest: "PUT /create",
		auth: true,
		params: createParams,
		async handler(ctx: Context<any, any>) {
			const { article_uuid, article_sku_uuid, quantity } = ctx.params;

			// 检查商品是否存在
			const article = await this.broker.call("article._get", { id: article_uuid });
			if (!article) {
				throw new Error("商品不存在");
			}

			// 检查SKU是否存在
			const { list } = await this.broker.call("article_sku.list", { article_uuid });

			if (!list) {
				throw new Error("商品规格不存在");
			}

			const skuModel = list.find(sku => sku.id === article_sku_uuid);

			// 检查是否已在购物车
			const existCart = await this.adapter.model.findOne({
				where: {
					account_uuid: ctx.meta.user.id,
					article_uuid,
					article_sku_uuid: skuModel.id
				}
			});

			if (existCart) {
				// Ensure both quantities are numbers
				const existingQuantity = Number(existCart.quantity);
				const additionalQuantity = Number(quantity || 1);

				// Update quantity
				const item = await this.adapter.updateById(existCart.id, {
					$set: {
						quantity: existingQuantity + additionalQuantity
					}
				});
				return item.dataValues
			}
			// 创建新购物车项
			const item =await this.adapter.insert({
				account_uuid: ctx.meta.user.id,
				article_uuid,
				article_sku_uuid: skuModel.id,
				quantity: quantity || 1
			});
			return item.dataValues
		}
	},
	update: {
		rest: "PUT /update",
		auth: true,
		params: updateParams,
		async handler(ctx: Context<any, any>) {
			const cart = await this.adapter.findById(ctx.params.id);
			if (!cart || cart.account_uuid !== ctx.meta.user.id) {
				throw new Error("购物车项不存在");
			}

			return this.adapter.updateById(ctx.params.id, {
				$set: ctx.params
			});
		}
	},
	list: {
		rest: "POST /list",
		auth: true,
		params: listParams,
		async handler(ctx: Context<any, any>) {
			const { idx, size} = ctx.params

			const items = await this.adapter.find({ query:
				{
					account_uuid: ctx.meta.user.id,
				},
				...(size ? { limit: size } : {}),
				...(idx ? { offset: (idx - 1) * size } : {})
			 });

			// 获取商品和SKU详情
			const skuIds = items.map((item) => item.article_sku_uuid);
			const articleIds = items.map((item) => item.article_uuid);
			const [articles, skus] = await Promise.all([
				this.broker.call("article._listByQuery", { query: { id: { [Op.in]: articleIds } } }),
				this.broker.call("article_sku._listByQuery", { query: { id: { [Op.in]: skuIds } } })
			]);
			const enrichedItems = items.map((item) => {
				const article = articles.find((a) => a.id === item.article_uuid);
				const sku = skus.find((s) => s.id === item.article_sku_uuid);
				return {
					title: article.title,
					is_fake: !sku,
					...(sku ? {
						sub_title: sku.title,
						sale_price: sku.sale_price,
						market_price: sku.market_price,
						image: sku.cover|| article.cover || article.images[0],
					} : {}),
					...item.dataValues
				};
			});
			return {
				list: enrichedItems,
				total: await this.adapter.count({ account_uuid: ctx.meta.user.id })
			};
		}
	},
	delete: {
		rest: "DELETE /:id",
		auth: true,
		params: {
			id: "string"
		},
		async handler(ctx: Context<any, any>) {
			const cart = await this.adapter.findById(ctx.params.id);
			if (!cart || cart.account_uuid !== ctx.meta.user.id) {
				throw new Error("购物车项不存在");
			}

			return this.adapter.removeById(ctx.params.id);
		}
	}
}

export default service;
