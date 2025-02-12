/* eslint-disable no-unreachable-loop */
/* eslint-disable no-await-in-loop */
import fs from "fs";
import axios from "axios";
import { type Context, Errors } from "moleculer";
import { Op } from "sequelize";
import { createParams, listParams, updateParams } from "../models/dtos/brand";
import createService from "./base";

const service = createService("master");
delete service.actions?.create;
delete service.actions?.update;
delete service.actions?.list;
service.methods = {
	...service.methods
};

service.actions = {
	...service.actions,
	create: {
		rest: "PUT /create",
		auth: true,
		params: createParams,
		restricted: true,
		allows: ["supplier"],
		async handler(ctx: Context<any, any>) {
			const insertModel: { [key: string]: any } = {};
			for (const key in ctx.params) {
				if (Object.prototype.hasOwnProperty.call(createParams, key)) {
					insertModel[key] = ctx.params[key];
				}
			}
			insertModel["owner_uuid"] = ctx.meta.user.id;
			const res = await this.adapter.insert(insertModel);
			return res;
		},
	},
	update: {
		rest: "PUT /update",
		auth: true,
		params: updateParams,
		restricted: true,
		allows: ["supplier"],
		async handler(ctx: Context<any, any>) {
			const dbSet = await this.adapter.find({
				query: {
					id: ctx.params.id,
				},
			});
			if (dbSet?.length <= 0) {
				throw new Error("无法检索品牌...");
			}
			const brandModel = dbSet[0].dataValues;
			if (brandModel.owner_uuid !== ctx.meta.user.id && !ctx.meta.user.manage) {
				throw new Error("无权修改品牌...");
			}
			const updateSets: { [key: string]: any } = {};
			for (const key in ctx.params) {
				if (Object.prototype.hasOwnProperty.call(brandModel, key)) {
					if (brandModel[key] !== ctx.params[key]) {
						updateSets[key] = ctx.params[key];
					}
				}
			}
			if (!brandModel.owner_uuid && ctx.meta.user.manage) {
				updateSets.owner_uuid = ctx.meta.user.id;
			}
			const res = await this.adapter.updateById(brandModel.id, {
				$set: updateSets,
			});
			return res;
		},
	},
	list: {
		rest: "POST /list",
		params: listParams,
		async handler(ctx: Context<any, any>) {
			const {
				idx,
				size,
				catalog,
				keywords,
				type,
				initial,
				country,
				city,
				status,
				owner,
				attributes,
				sort,
			} = ctx.params;
			const query: any = {};
			const queryConditionList: any[] = [];
			const limit = size || 10;
			const offset = ((idx || 1) - 1) * limit;
			const baseSort = ["display_order"];
			if (keywords) {
				if (keywords.length > 0) {
					queryConditionList.push({
						[Op.or]: {
							title: {
								[Op.in]: keywords,
							},
							sub_title: {
								[Op.in]: keywords,
							},
							catalogs: {
								[Op.in]: keywords,
							},
							description: {
								[Op.in]: keywords,
							},
						},
					});
				}
			}
			if (catalog) {
				queryConditionList.push({
					catalogs: {
						[Op.substring]: catalog,
					},
				});
			}
			if (type) {
				const typeArr = type
					.split(",")
					.map((t) => t.trim())
					.filter((t) => t);
				queryConditionList.push({
					type: {
						[Op.and]: typeArr,
					},
				});
			}
			if (initial) {
				queryConditionList.push({
					initial: {
						[Op.like]: `%${initial}%`,
					},
				});
			}
			if (country) {
				queryConditionList.push({
					country,
				});
			}
			if (city) {
				queryConditionList.push({
					city: {
						[Op.substring]: city,
					},
				});
			}
			if (status >= 0) {
				queryConditionList.push({
					status,
				});
			}
			if (owner) {
				queryConditionList.push({
					owner_uuid: owner,
				});
			}
			if (attributes) {
				const opAndList = [];
				for (const key in attributes) {
					const attrValuesCondition = attributes[key]
						.split(",")
						.map((x: string) => x.trim());
					opAndList.push({
						[key]: {
							[Op.or]: attrValuesCondition.map((item: string) => ({
								[Op.substring]: item,
							})),
						},
					});
				}
				if (opAndList.length > 0)
					queryConditionList.push({
						attributes: {
							[Op.and]: opAndList,
						},
					});
			}
			const res = await this.adapter.find({
				query: queryConditionList.length > 0 ? { [Op.and]: queryConditionList } : {},
				limit,
				offset,
				baseSort,
			});
			const total = await this.adapter.count({ query });
			return {
				list: res,
				total,
			};
		},
	},
	/**
	 * 创建品牌的文件目录
	 * 验证品牌和用户权限后调用目录服务
	 */
	createDir: {
		rest: "PUT /create-dir/:id",
		auth: true,
		params: {
			parent_uuid: {
				type: "string",
				optional: true,
				default: "",
			},
			title: {
				type: "string",
			},
			keywords: {
				type: "string",
				optional: true,
			},
			covers: {
				type: "string",
				optional: true,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { parent_uuid, id } = ctx.params;
			const dbSet = await this.adapter.find({
				query: {
					id
				},
			});
			if (dbSet?.length <= 0) {
				throw new Error("无法检索品牌...");
			}
			const brandModel = dbSet[0].dataValues;
			if (brandModel.owner_uuid !== ctx.meta.user.id && !ctx.meta.user.manage) {
				throw new Error("无权操作...");
			}
			const res = await this.broker.call(
				"dir.makeDir",
				{
					...ctx.params,
					channel_relation: `brand_${  id}`,
				},
				{
					meta: {
						...ctx.meta,
						owner: brandModel.owner_uuid,
					},
				},
			);
			return res;
		},
	},
	getDirs: {
		rest: "POST /get-dir/:id",
		async handler(ctx) {
			const { id, from_uuid } = ctx.params;
			const dbSet = await this.adapter.find({
				query: {
					id,
				},
			});
			if (dbSet?.length <= 0) {
				throw new Error("无法检索品牌...");
			}
			const brandModel = dbSet[0].dataValues;
			const data = await this.broker.call(
				"dir.list",
				{
					...ctx.params,
				},
				{
					meta: {
						...ctx.meta,
						owner: brandModel.owner_uuid,
					},
				},
			);
			return data;
		},
	},
	import: {
		rest: "POST /import",
		params: {
			prefixUrl: {
				type: "string",
				optional: true,
				default: "",
			},
		},
		async handler(ctx: Context<any, any>) {
			const { prefixUrl } = ctx.params
			const { RECORDS } = await import("../data/dt_channel_article_master.json");
			const { RECORDS: sourceDB } = await import("../data/dt_channel_article_master2.json");
			const result = [];
			for (const item of RECORDS) {
				const item2 = sourceDB.find(x => x.id === item.model.id)
				let logoId = "";
				let bannerId = "";
				if (item.model.img_url && item.model.img_url.indexOf("upload") >= 0) {
					// eslint-disable-next-line no-await-in-loop
					const res = await this.broker.call("file.uploadPubUrl", {
						url: `${prefixUrl}${item.model.img_url}`,
					});
					logoId = res.id;
				}
				if (item.model.fields.banner_url && item.model.fields.banner_url.indexOf("upload") >= 0) {
					// eslint-disable-next-line no-await-in-loop
					const res = await this.broker.call("file.uploadPubUrl", {
						url: `${prefixUrl}${item.model.fields.banner_url}`,
					});
					bannerId = res.id;
				}

				const coverList = []
				if (item.model.imgs.length>0) {
					for (const img of item.model.imgs) {
						if (img.img_url && img.img_url.indexOf("upload") >= 0) {
							// eslint-disable-next-line no-await-in-loop
							const res = await this.broker.call("file.uploadPubUrl", {
								url: `${prefixUrl}${img.img_url}`,
							});
							coverList.push(res.id)
						}
					}
				}

				const dbItem = {
					attributes: {
						level: item.model.fields.level || "",
						style: item.model.fields.style || "",
					},
					logo: logoId || "",
					title: item.model.title || "",
					sub_title: item.model.sub_title || "",
					banners: bannerId || "",
					covers: coverList.join(","),
					catalogs: "",
					country: item.model.fields.live_country || "",
					website: item.model.fields.website || "",
					initial: item.model.fields.char_sort || "",
					description: item2.content || "",
					display_order: item.model.id,
					owner_uuid: "4417f0ff-9c7d-4ea7-8144-6d2b8eae91cf",
					status: 255,
				};
				// eslint-disable-next-line no-await-in-loop
				const model = await this.adapter.insert(dbItem);
				result.push(model);
			}
			return result;
		},
	},
	search: {
		rest: "POST /search",
		params: {
			keywords: {
				type: "string",
				optional: true,
			}
		},
		async handler(ctx: Context<any, any>) {
			const { keywords } = ctx.params;

			// 确保 keywords 存在，并转换为数组，同时去除空字符串
			const keywordArray = keywords ? keywords.split(",").map(k => k.trim()).filter(k => k) : [];

			const query = {
			[Op.or]: []
			};

			// 只有在 keywordArray 非空时，才添加查询条件
			if (keywordArray.length > 0) {
				for (const keyW of keywordArray) {
					query[Op.or].push(
					{ id: { [Op.like]: `%${keyW}%` } },
					{ title: { [Op.like]: `%${keyW}%` } },
					{ sub_title: { [Op.like]: `%${keyW}%` } },
					{ catalogs: { [Op.like]: `%${keyW}%` } }
					);
				}
			}
			const dbSet = await this.adapter.find({
				query : query[Op.or].length > 0 ? query : {},
				offset: 0,
				litmit: 100,
			})
			const total = await this.adapter.count({
				query
			})
			return {
				total,
				list: dbSet,
			}
		},
	}
};
export default service;
