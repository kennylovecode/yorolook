/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-await-in-loop */
import fs from "fs";
import axios from "axios";
import { type Context, Errors } from "moleculer";
import { Op } from "sequelize";
import { createParams, listParams, updateParams } from "../models/dtos/brand";
import createService from "./base";

const service = createService("brand");

delete service.actions?.create;
delete service.actions?.update;
delete service.actions?.list;
function getType(idx: number) {
	const types = ["", "艺术家", "原创", "设计师", "成品", "定制", "整合服务", "HTTP", "儿童"];
	return types[idx];
}
function getDesc(key: string) {
	switch (key) {
		case "contact_address":
			return "联系地址";
		case "main_product":
			return "主营产品";
		case "staff_no":
			return "员工人数";
		case "co_type":
			return "公司类型";
		case "pic_info_provide":
			return "资料提供方式";
		case "product_package_type":
			return "产品包装方式";
		case "contact_info":
			return "联系人信息";
		case "incharge_info":
			return "负责人信息";
		case "discount":
			return "折扣信息";
		case "discount_remark":
			return "折扣备注";
		case "shop_url":
			return "线上商城地址";
		case "face_tax_point":
			return "财务票面税点";
		case "tax_point":
			return "实际收取税点";
		case "payment_method":
			return "付款节点介绍";
		case "lead_time":
			return "交付周期";
		case "express_type":
			return "货运方式";
		case "bank_number":
			return "银行账号";
		case "co_bank_number":
			return "公司银行账号";
		case "after_service":
			return "售后服务";
		case "production_advantage":
			return "产品优势";
		default:
			return "";
	}
}
function buildAttributes(key: string) {
	let uuid = "";
	if (key.indexOf("deliver") >= 0) {
		uuid = "96040ed3-27be-4ee9-9b46-9d3779dfe581";
	}
	if (key.indexOf("space") >= 0) {
		uuid = "b6c97c9c-f0ec-4604-b778-8ed3177fbe1e";
	}

	if (key.indexOf("material") >= 0) {
		uuid = "e06019c8-c898-4814-b173-acdc6b486939";
	}
	if (key.indexOf("table_material") >= 0) {
		uuid = "09463c41-cb6c-47dd-b8a3-e79b330774d5";
	}

	if (key === "carpet_shape") {
		uuid = "35a33ecb-ec01-4319-9aff-f1d9c036f5d5";
	}

	if (key.indexOf("carpet_material") >= 0) {
		uuid = "283806dc-92a9-4fb4-b3fe-bd83a36c5ed9";
	}

	if (key === "paint_skill") {
		uuid = "8bd931c5-d142-4f52-ac62-4b4a96af35e9";
	}
	if (key.indexOf("pattern") >= 0) {
		uuid = "85c5e7d3-66ce-405a-9aab-d982e5cc1f18";
	}
	if (key === "artwork_special") {
		uuid = "12f39372-5751-4e31-ae04-13271beab4aa";
	}
	if (key === "fabricz_metarial") {
		uuid = "283806dc-92a9-4fb4-b3fe-bd83a36c5ed9";
	}
	if (key === "fabricz_technology") {
		uuid = "9457b6de-e995-4c6e-b59c-5181a0a0dae8";
	}
	if (key === "bed_materia") {
		uuid = "5a843ac2-1bdd-4104-8209-95e9df5378a1";
	}
	if (key === "number_of_seats") {
		uuid = "536d8895-94ad-4b5a-9d61-43d3c02f94f0";
	}
	return uuid;
}

service.methods = {
	...service.methods,
	async doImport(item: any, ctx: any, prefixUrl = "") {
		let { status } = item;
		const { RECORDS: dirSet } = await import("../data/dt_Directory.json");
		const { RECORDS: skuSet } = await import("../data/dt_article_goods.json");
		const { RECORDS: catSet } = await import("../data/dt_article_category.json");
		const { RECORDS: avSet } = await import("../data/dt_article_field_value.json");
		const { RECORDS: attachSet } = await import("../data/dt_article_attach.json");

		const files = [];
		/** 处理目录 */
		if (status === 255) {
			const dirs = dirSet
				.filter((x) => x.RelationExpression.indexOf(`brand_${item.display_order}`) >= 0)
				.sort((a, b) => a.Id - b.Id);
			const params = {
				BrandId: item.display_order,
				dirIds: dirs.map((x) => x.Id),
			};
			const imageFiles = await this.broker.call("old_albums.brandList", {
				...params,
			});

			/** 获取品牌的根目录 */
			const root = await this.broker.call(
				"dir.channelRoot",
				{
					channel_relation: `brand_${item.id}`,
					channel_title: item.title,
				},
				{
					meta: ctx.meta,
				},
			);
			const dirResult = [];

			const attachs = attachSet.filter((x) => x.brand_id === item.display_order);

			for (const x of dirs) {
				const layerArr = x.LayerId.split(",").filter((y) => y);
				const parentUUID =
					dirResult.find((z) => z.oldId === parseInt(layerArr[layerArr.length - 1], 10))
						?.id || root.id;
				const model = await this.broker.call(
					"dir.makeDir",
					{
						title: x.Name,
						parent_uuid: parentUUID,
						channel_relation: `brand_${item.id}`,
					},
					{
						meta: ctx.meta,
					},
				);
				dirResult.push({
					oldId: x.Id,
					...model,
				});
			}

			for (const file of imageFiles) {
				const parentUUID =
					dirResult.find((z) => z.oldId === file.DirectoryId)?.id || root.id;
				const dbFile = await this.broker.call(
					"dir.uploadUrl",
					{
						url: `${prefixUrl}${file.OriginalPath}`,
						uuid: parentUUID,
					},
					{
						meta: ctx.meta,
					},
				);
				if (dbFile) {
					files.push(dbFile);
				}
			}

			status = 254;
			await this.adapter.updateById(item.id, {
				$set: {
					status,
				},
			});
		}

		if (status === 254) {
			const products = await this.broker.call("old_product.brandList", {
				BrandId: item.display_order,
			});
			const pIds = products.map((x) => x.Id);
			const albums = await this.broker.call("old_albums.brandList", {
				ArticleIds: pIds,
			});
			/** 处理产品 */
			for (const p of products) {
				let catalogTitle = catSet.find((x) => x.id === p.category_id).title;
				if (catalogTitle === "旧的商品") {
					// eslint-disable-next-line no-continue
					continue;
				}
				const createModel = await this.broker.call(
					"article.create",
					{
						channel: "product",
					},
					{
						meta: ctx.meta,
					},
				);
				const articleAlbums = albums.filter((x) => x.ArticleId === p.id);
				const newCovers = [];
				for (const album of articleAlbums) {
					const file = await this.broker.call("file.uploadPubUrl", {
						url: `${prefixUrl}${album.OriginalPath}`
					});
					if (file) {
						newCovers.push(file);
						files.push(file);
					}
				}
				let keywords = newCovers.flatMap((x) =>
					Array.isArray(x.keywords)
						? x.keywords.filter((keyword) => keyword != null)
						: [],
				);
				keywords = keywords.filter((word, index, self) => self.indexOf(word) === index);
				const dbCatalog = await this.broker.call("catalog.getByTitle", {
					title: catalogTitle.replaceAll("/", "&"),
				});
				if (!dbCatalog) {
					catalogTitle = `__${catalogTitle}`;
				} else {
					catalogTitle = dbCatalog.path_title.replaceAll(",", "/");
				}
				createModel.keywords = keywords.join(",");
				if (newCovers.length > 0) {
					createModel.cover = newCovers[0].id;
					createModel.images = newCovers.map((x) => x.id).join(",");
				}
				createModel.catalogs = catalogTitle;
				createModel.brand_uuid = item.id;
				createModel.title = p.title;
				createModel.sub_title = p.goods_params;
				createModel.quick_code = p.goods_no;
				createModel.lowest_price = parseInt(p.sell_price, 10) * 250;
				createModel.highest_price = parseInt(p.sell_price, 10) * 250;
				createModel.display_order = p.id;
				/** 处理sku */
				const skus = skuSet.filter((x) => x.article_id === p.id);
				createModel.skus = [];
				if (skus.length <= 0) {
					const sku = {
						article_uuid: createModel.id,
						channel: "product",
						title: p.goods_params,
						sub_title: p.goods_params,
						cost_price: parseInt(p.sell_price, 10) * 100,
						sale_price: parseInt(p.sell_price, 10) * 200,
						market_prcie: parseInt(p.market_price, 10) * 250,
						quick_code: p.goods_no,
					};
					createModel.skus.push(sku);
				} else {
					for (const tmp of skus) {
						const sku = {
							article_uuid: createModel.id,
							channel: "product",
							title: p.spec_text,
							sub_title: p.spec_text,
							cost_price: tmp.sell_price,
							sale_price: tmp.sell_price * 2,
							market_prcie: tmp.market_price,
							quick_code: tmp.goods_no,
						};
						createModel.skus.push(sku);
					}
				}

				/** 处理属性 */
				if (p.colors) {
					await this.broker.call(
						"article_attribute_value._create",
						{
							attribute_uuid: "cb7f6937-8854-46a6-9914-7a5cb9495079",
							article_uuid: createModel.id,
							value_list: p.colors,
						},
						{
							meta: ctx.meta,
						},
					);
				}
				if (p.level) {
					await this.broker.call(
						"article_attribute_value._create",
						{
							attribute_uuid: "43817aa5-f24a-4b60-bfc5-da0c40a691d8",
							article_uuid: createModel.id,
							value_list: p.level,
						},
						{
							meta: ctx.meta,
						},
					);
				}
				if (p.style) {
					await this.broker.call(
						"article_attribute_value._create",
						{
							attribute_uuid: "e44e8cc0-31c9-4b27-8c18-5066f4c1e462",
							article_uuid: createModel.id,
							value_list: p.style,
						},
						{
							meta: ctx.meta,
						},
					);
				}
				if (p.makein) {
					await this.broker.call(
						"article_attribute_value._create",
						{
							attribute_uuid: "8969ac23-f0c9-4101-9b32-1b1fded296dc",
							article_uuid: createModel.id,
							value_list: p.makein,
						},
						{
							meta: ctx.meta,
						},
					);
				}
				if (p.product_diy) {
					await this.broker.call(
						"article_attribute_value._create",
						{
							attribute_uuid: "f233f409-4672-4b0e-ab02-9f3ac50f2272",
							article_uuid: createModel.id,
							value_list: p.product_diy,
						},
						{
							meta: ctx.meta,
						},
					);
				}
				const av = avSet.filter((x) => x.article_id === p.id);
				for (const avItem of av) {
					const uuid = buildAttributes(
						avItem.field_name.replaceAll("metarial", "material"),
					);
					await this.broker.call(
						"article_attribute_value._create",
						{
							article_uuid: createModel.id,
							attribute_uuid: uuid,
							value_list: avItem.field_value,
						},
						{
							meta: ctx.meta,
						},
					);
				}

				for (const sku of createModel.skus) {
					try {
						await this.broker.call("article_sku.create", sku, {
							meta: ctx.meta,
						});
					} catch {
						console.log(sku);
					}
				}
				await this.broker.call("article.update", {
					...createModel,
				});
			}
			status = 253;
			await this.adapter.updateById(item.id, {
				$set: {
					status,
				},
			});
		}
		if (files.length > 0) {
			let covers = files.map((x) => x.id);
			if (covers.length > 4) {
				covers = covers.slice(0, 4);
			}
			status = 252;
			await this.adapter.updateById(item.id, {
				$set: {
					covers: covers.join(","),
					status,
				},
			});
		}
	},
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
								[Op.like]: `%${keywords.trim()}%`,
							},
							sub_title: {
								[Op.like]: `%${keywords.trim()}%`,
							},
							catalogs: {
								[Op.like]: `%${keywords.trim()}%`,
							},
							description: {
								[Op.like]: `%${keywords.trim()}%`,
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
				// eslint-disable-next-line guard-for-in
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
					{queryConditionList.push({
						attributes: {
							[Op.and]: opAndList,
						},
					});}
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
		rest: "PUT /create-dir/:brand_uuid",
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
			const { parent_uuid, brand_uuid } = ctx.params;
			const dbSet = await this.adapter.find({
				query: {
					id: brand_uuid,
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
					channel_relation: "brand_" + brand_uuid,
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
				default: ""
			},
		},
		async handler(ctx: Context<any, any>) {
			const { prefixUrl } = ctx.params;
			const url = `http://ad.yorolook.com/tools/WXMPHandler.ashx?action=brands&secret=2a6538ddf9dc4fd5e8dbb238be7f20cc&c=1000`;
			const { data } = await axios.get(url);
			const result = [];
			for (const item of data.list) {
				let logoId = "";
				let bannerId = "";
				if (item.Logo && item.Logo.indexOf("/upload") === 0) {
					// eslint-disable-next-line no-await-in-loop
					const res = await this.broker.call("file.uploadPubUrl", {
						url: `${prefixUrl}${item.Logo}`,
					});
					logoId = res.id;
				}
				if (item.Banner && item.Banner.indexOf("/upload") === 0) {
					// eslint-disable-next-line no-await-in-loop
					const res = await this.broker.call("file.uploadPubUrl", {
						url: `${prefixUrl}${item.Banner}`,
					});
					bannerId = res.id;
				}
				const dbItem = {
					attributes: {
						level: item.LevelArray || "",
						style: item.StyleArray || "",
					},
					logo: logoId || "",
					title: item.Title || "",
					sub_title: item.SimplifyTitle || "",
					banners: bannerId || "",
					covers: "",
					catalogs: item.CategoryNames || "",
					country: item.Country || "",
					city: item.City || "",
					website: item.Website || "",
					type: getType(item.Type),
					initial: item.LetterGroup || "",
					description: item.Content || "",
					contacts: item.ContactMobile
						? [
								{
									name: item.ContactName,
									phone: item.ContactMobile,
								},
						  ]
						: [],
					other_message: item.BaseInfo,
					display_order: item.Id,
					owner_uuid: "4417f0ff-9c7d-4ea7-8144-6d2b8eae91cf",
					status: 255,
				};
				if (item.BaseInfo && item.BaseInfo !== "null") {
					const newInfo = [];
					const baseInfo: any = JSON.parse(item.BaseInfo) as Record<string, any>;
					// 使用 Object.entries 来遍历 baseInfo 的键值对
					for (const [key, value] of Object.entries(baseInfo)) {
						const newKey = key
							.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
							.slice(1);

						const desc = getDesc(newKey);
						if (desc) {
							newInfo.push({
								key: newKey,
								desc,
								value,
							});
						}
					}
					dbItem.other_message = newInfo;
				}
				// eslint-disable-next-line no-await-in-loop
				const model = await this.adapter.insert(dbItem);
				result.push(model);
			}
			return result;
		},
	},
	importDirectory: {
		rest: "POST /import-dir",
		auth: true,
		params: {
			idx: {
				type: "number",
				optional: false,
			},
			id: {
				type: "number",
				optional: true,
			},
			prefixUrl: {
				type: "string",
				optional: true,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { idx, size, id, prefixUrl } = ctx.params;
			try {
				if (!ctx.meta.user?.manage) {
					return "";
				}
				const query = id
					? {
							display_order: id,
					  }
					: {};
				const dbSet = await this.adapter.find({
					query,
					offset: idx - 1,
					limit: size,
					sort: ["display_order"],
				});
				if (dbSet.length > 0) {
					this.doImport(dbSet[0], ctx, prefixUrl);
					return dbSet[0]?.id;
				}
				return "";
			} catch (error) {
				fs.writeFileSync(
					`./logs/error_brand${new Date().getTime()}.log`,
					JSON.stringify(error),
					"utf8",
				);
				return new Errors.MoleculerClientError(error.message, 500);
			}
		},
	},
	importAttach: {
		rest: "POST /import-attach",
		params: {
			idx: { type: "number", min: 1 }, // 第几页，从 1 开始
			size: { type: "number", optional: true, default: 10 }, // 每页数量，默认 10
			prefixUrl: { type: "string", optional: true },
		},
		async handler(ctx: Context<any, any>) {
			const { idx, size, prefixUrl } = ctx.params;

			// 加载附件数据
			const { RECORDS: attachSet } = await import("../data/dt_article_attach.json");

			// 过滤 brand_id > 0 的数据
			const brandAttachs = attachSet.filter((x) => x.brand_id > 0);

			// 按 brand_id 分组
			const groupedByBrand = brandAttachs.reduce<Record<number, any[]>>((acc, item) => {
				if (!acc[item.brand_id]) {
					acc[item.brand_id] = [];
				}
				acc[item.brand_id].push(item);
				return acc;
			}, {});

			// 获取所有品牌 ID
			const brandIds = Object.keys(groupedByBrand).map(Number);
			const totalBrands = brandIds.length;

			// 分页计算
			const startIdx = (idx - 1) * size;
			const endIdx = startIdx + size;
			const pagedBrandIds = brandIds.slice(startIdx, endIdx);

			console.log(`Processing brands ${pagedBrandIds} (page ${idx}, size ${size})`);

			const result: Record<number, any[]> = {};

			// 处理分页后的品牌
			for (const brandId of pagedBrandIds) {
				// 获取数据库中的品牌信息
				const dbSet = await this.adapter.find({
					query: { display_order: brandId },
				});
				if (dbSet.length <=0 ) {
					console.warn(`Brand with display_order ${brandId} not found in DB.`);
					continue;
				}

				const dbItem = dbSet[0];
				// 获取品牌的根目录
				const root = await this.broker.call(
					"dir.channelRoot",
					{
						channel_relation: `brand_${dbItem.id}`,
						channel_title: dbItem.title,
					},
					{ meta: ctx.meta }
				);

				if (!root?.id) {
					console.warn(`Failed to get root directory for brand ${dbItem.id}`);
					continue;
				}

				const parentUUID = root.id;

				// 处理品牌下的所有附件
				for (const attach of groupedByBrand[brandId]) {
					try {
						await this.broker.call(
							"dir.uploadUrl",
							{
								url: `${prefixUrl || ""}${attach.file_path}`,
								uuid: parentUUID,
							},
							{ meta: ctx.meta }
						);
						console.log(`Uploaded: ${attach.file_path} -> ${parentUUID}`);
					} catch (error) {
						console.error(`Error uploading ${attach.file_path}:`, error);
					}
				}

				// 记录处理的品牌附件
				result[brandId] = groupedByBrand[brandId];
			}

			return {
				totalBrands, // 总品牌数
				processedBrands: pagedBrandIds.length, // s本次处理的品牌数
				currentPage: idx,
				totalPages: Math.ceil(totalBrands / size),
				data: result,
			};
		},
	},
	search: {
		rest: "POST /search",
		params: {
			keywords: {
				type: "string",
				optional: true,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { keywords } = ctx.params;

			// 确保 keywords 存在，并转换为数组，同时去除空字符串
			const keywordArray = keywords
				? keywords
						.split(",")
						.map((k) => k.trim())
						.filter((k) => k)
				: [];

			const query = {
				[Op.or]: [],
			};

			// 只有在 keywordArray 非空时，才添加查询条件
			if (keywordArray.length > 0) {
				for (const keyW of keywordArray) {
					query[Op.or].push(
						{ id: { [Op.like]: `%${keyW}%` } },
						{ title: { [Op.like]: `%${keyW}%` } },
						{ sub_title: { [Op.like]: `%${keyW}%` } },
						{ catalogs: { [Op.like]: `%${keyW}%` } },
					);
				}
			}
			const dbSet = await this.adapter.find({
				query: query[Op.or].length > 0 ? query : {},
				offset: 0,
				litmit: 100,
			});
			const total = await this.adapter.count({
				query,
			});
			return {
				total,
				list: dbSet,
			};
		},
	},
};
export default service;
