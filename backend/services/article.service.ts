import axios from "axios";
import type { Context } from "moleculer";
import { Op, where } from "sequelize";
import { createParams, listParams, updateParams } from "../models/dtos/article";
import createService from "./base";

const service = createService("article");

function getHTMLSummary(html: string, maxLength: number): string {
	if (!html) {return "";}
	// 使用正则表达式去除 HTML 标签
	const strippedHTML = html.replace(/<[^>]+>/g, "");

	// 获取去除 HTML 标签后的文本内容
	const textContent = strippedHTML.trim();

	// 截取前 maxLength 个字符作为摘要
	const summary = textContent.slice(0, maxLength);

	return summary;
}

interface IUpdateArticle{
	channel: string;
	brand_uuid: string;
	catalogs: string;
	title: string;
	sub_title: string;
	sketch: string;
	keywords: string;
	quick_code: string;
	cover: string;
	images: string;
	videos: string;
	full_content: string;
	lowest_price: number;
	highest_price: number;
	like: number;
	collect_count: number;
	owner_uuid: string;
	owner_recommend: number;
	sys_recommend: number;
	display_order: number;
	status: number;
}

service.methods = {
	...service.methods
}

delete service.actions.get
service.actions = {
	...service.actions,
	create: {
		rest: "PUT /create",
		params: createParams,
		async handler(ctx: Context<any, any>) {
			const { channel } = ctx.params
			const createModel = {
				channel,
				catalogs: "",
				title: `草稿_${  new Date().getTime()}`,
				sub_title: "",
				sketch: "",
				keywords: "",
				quick_code: "",
				cover: "",
				images: "",
				videos: "",
				full_content: "",
				lowest_price: 0,
				highest_price: 0,
				like: 0,
				collect_count: 0,
				owner_uuid: "",
				owner_recommend: 0,
				sys_recommend: 0,
				display_order: 0,
				status: 255
			}
			const model = await this.adapter.insert(createModel);

			/** create directory root */

			return model?.dataValues;
		},
	},
	update: {
		rest: "PUT /update",
		auth: true,
		params: updateParams,
		async handler(ctx: Context<any, any>) {
			const model =  await this.adapter.updateById(ctx.params.id, {
				$set: ctx.params
			});
			return model;
		},
	},
	import: {
		rest: "POST /import",
		params: {
			channel: {
				type: "string",
				optional: false,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { channel } = ctx.params;
			const url = `http://ad.yorolook.com/tools/WXMPHandler.ashx?action=article&secret=2a6538ddf9dc4fd5e8dbb238be7f20cc&channel=${
				channel}`;
			const { data } = await axios.get(url);
			for (const item of data.list) {
				try {
					// eslint-disable-next-line no-await-in-loop
					const dbSet = await this.adapter.find({
						query: {
							display_order: `${item.id}`,
						},
					});
					if (dbSet.length > 0) {
						const model = dbSet[0];
						if (model.extends && model.extends.length > 0) {
							// eslint-disable-next-line no-continue
							continue;
						}
						// eslint-disable-next-line no-await-in-loop
						await this.adapter.updateById(model.id, {
							$set: {
								sub_title: `${item.sub_title}`,
								extends: [
									{
										key: "category",
										value: item.category_id,
									},
									{
										key: "style",
										value: item.style,
									},
									{
										key: "colors",
										value: item.colors,
									},
									{
										key: "level",
										value: item.level,
									},
									{
										key: "size",
										value: item.size,
									},
									{
										key: "master",
										value: item.master_id,
									},
								],
							},
						});
						// eslint-disable-next-line no-continue
						continue;
					}
					const insertModel = {
						title: item.title,
						sub_title: `${item.sub_title}`,
						sketch:
							item.design_concept ||
							item.zhaiyao ||
							getHTMLSummary(item.content, 255),
						keywords: item.tags
							? item.tags.replaceAll(" ", "")?.replaceAll("|", ",")
							: "",
						quick_code: `${channel}_${item.id}`,
						cover: item.img_url||"",
						full_content: item.content||"",
						extends: [
							{
								key: "category",
								value: item.category_id,
							},
							{
								key: "style",
								value: item.style,
							},
							{
								key: "colors",
								value: item.colors,
							},
							{
								key: "level",
								value: item.level,
							},
							{
								key: "size",
								value: item.size,
							},
							{
								key: "master",
								value: item.master_id,
							},
						],
					};
					// eslint-disable-next-line no-await-in-loop
					await this.adapter.insert(insertModel);
				} catch (ex) {
					return ex;
				}
			}
			return data.list.length;
		},
	},
	fixed: {
		rest: "GET /fixed",
		params: {
			channel: {
				type: "string",
				optional: false,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { channel } = ctx.params;
			const url =
				"http://ad.yorolook.com/tools/WXMPHandler.ashx?action=category&secret=2a6538ddf9dc4fd5e8dbb238be7f20cc&channel=" +
				channel;
			const { data } = await axios.get(url);
			const channelModel = await this.broker.call("channel.getByName", { name: channel });
			if (channelModel) {
				await this.adapter.updateMany(
					{
						[Op.and]: {
							status: 0,
							channel_uuid: {
								[Op.in]: [null, ""],
							},
						},
					},
					{
						channel_uuid: channelModel.id,
					},
				);
			}
			const idsCatalog = [];
			channelModel.catalogs.map((x) => {
				x.map((y) => {
					if (idsCatalog.indexOf(y) < 0) {
						return idsCatalog.push(y);
					}
				});
			});
			const catalogs = await this.broker.call("catalog.getByIds", {
				ids: idsCatalog,
			});
			const list = await this.adapter.find({
				query: {
					status: 0,
				},
			});
			for (const item of list) {
				if (!item.catalogs && item.extends) {
					const categoryMsg = item.extends.find((x) => x.key === "category");
					const originalCategory = data.list.find((x: any) => x.id == categoryMsg.value);
					const currentCatalogs = catalogs.find(
						(x) => x.title === originalCategory.title,
					);
					if (currentCatalogs) {
						const catalogsString =
							currentCatalogs.path_title + "," + currentCatalogs.title;
						await this.adapter.updateById(item.id, {
							$set: {
								status: 1,
								catalogs: catalogsString,
							},
						});
					} else {
						await this.adapter.updateById(item.id, {
							$set: {
								status: 1,
								catalogs: originalCategory.title,
							},
						});
					}
				}
			}
			return catalogs;
		},
	},
	fixedAlbums: {
		rest: "GET /fixedAlbums",
		auth: true,
		params: {
			channel: {
				type: "string",
				optional: false,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { channel } = ctx.params;
			// 取出频道文章
			const dbSet = await this.adapter.find({
				query: {
					channel_uuid: channel,
				},
			});

			let channelDir = await this.broker.call(
				"dir.makeSysDir",
				{
					title: channel,
					parent_uuid: "",
				},
				{
					meta: ctx.meta,
				},
			);

			// 定义获取相册的方法
			const getAlbums = async (item) => {
				const dataParams = item.quick_code.split("_");
				//const url = `http://ad.yorolook.com/tools/WXMPHandler.ashx?action=articleAlbums&secret=2a6538ddf9dc4fd5e8dbb238be7f20cc&channel=${dataParams[0]}&pid=${dataParams[1]}`;
				const channelId = () => {
					if (dataParams[0] == "product") return 16;
					if (dataParams[0] == "case") return 23;
					if (dataParams[0] == "scene") return 34;
					if (dataParams[0] == "scheme") return 35;
				};
				const albums = require("../albums.json");
				const res = albums.filter(
					(x) => x.ArticleId == dataParams[1] && x.ChannelId === channelId(),
				);
				let images = item.images || [];
				let newContent = item.full_content;

				/** 建立文章的存储目录 */
				const articleDir = await this.broker.call(
					"dir.makeSysDir",
					{
						title: item.id,
						parent_uuid: channelDir.id,
					},
					{
						meta: ctx.meta,
					},
				);

				let srcLinks = [];
				if (res?.length > 1 && !newContent) {
					res.data.list.map((album) => {
						srcLinks.push(album.OriginalPath);
					});
				} else {
					/** 如果相册只有一张图，那么它的图片可能在full_content */
					if (newContent) {
						// 正则表达式匹配 <img> 标签的 src 属性
						const regex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
						let match;
						while ((match = regex.exec(newContent)) !== null) {
							// 确保 match[1] 有效
							if (match[1]) {
								srcLinks.push(match[1]);
							} else {
								console.warn(`No valid src found in match: ${match}`);
							}
						}
					}
				}
				if (srcLinks.length <= 0)
					return {
						images: [],
						newContent,
					};
				const imageResults = await this.broker.call(
					"file._localUpload",
					{ links: srcLinks, dir: articleDir.id },
					{ meta: ctx.meta },
				);
				if (imageResults.length <= 0)
					return {
						images: [],
						newContent,
					};
				imageResults.map((res) => {
					if (res && res.link && res.uuid)
						newContent = newContent.replace(res.link, res.uuid);
				});
				images = images.concat(imageResults.filter((x) => x).map((x) => x.uuid));
				return {
					images,
					newContent,
				};
			};
			const passHandler = async () => {
				const filteredDbSet = dbSet.filter(
					(item) => !item.images || item.images.length === 0,
				);
				for (var item of filteredDbSet) {
					try {
						const { images, newContent } = await getAlbums(item);
						if (images.length > 0) {
							await this.adapter.updateById(item.id, {
								$set: {
									images: images,
									cover: images[0],
									full_content: newContent,
								},
							});
						}
					} catch {
						continue;
					}
				}
			};
			passHandler();
			return "success";
		},
	},
	list: {
		rest: "POST /list",
		auth: true,
		params: listParams,
		async handler(ctx: Context<any, any>) {
			const { idx, size, sort, keywords, channel, catalog, attributes, lowest_price , highest_price, brands,  my } = ctx.params;
			const queryOpAnd = []
			if(attributes.length>0){
				const artilceIds = await this.broker.call("article_attribute_value.articleMatch", {
					attributes
				},{
					meta: ctx.meta
				})
				if(artilceIds.length<=0){
					return {
						list: [],
						total: 0
					}
				}
				/** 这里数据量大的话可能会出现问题，先这样写，后面再寻找方案 */
				queryOpAnd.push({
					id: {
						[Op.in]: artilceIds
					}
				})
			}

			if(channel){
				queryOpAnd.push({
					channel
				})
			}
			if(catalog){
				queryOpAnd.push({
					catalogs: {
						[Op.like]: `%${catalog}%`
					}
				})
			}
			if(keywords){
				const keywordArray = keywords.split(",")
				keywordArray.map(x => {
					queryOpAnd.push({
						title: {
							[Op.like]: `%${x}%`
						}
					})
					return ""
				})
			}

			if (lowest_price) {
				queryOpAnd.push({ highest_price: { [Op.gte]: lowest_price } });
			}
			if (highest_price) {
				queryOpAnd.push({ lowest_price: { [Op.lte]: highest_price } });
			}

			if(brands.length>0) {
				queryOpAnd.push({ brand_uuid: {
					[Op.in]: brands
				}})
			}

			const limit = size || 10;
			const offset = ((idx || 1) - 1) * limit;
			const dbSet = await this.adapter.find({
				query: {
					[Op.and]: queryOpAnd
				},
				offset,
				limit,
				sort,
			});
			const total = await this.adapter.count({
				query: {
					[Op.and]: queryOpAnd
				},
			});

			return {
				list: dbSet||[],
				total
			}
		},
	},
	getById:{
		rest: "GET /:id",
		params: {
			id: {
				type: "string",
				optional: false,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { id } = ctx.params;
			const model = await this.adapter.findById(id);
			const brandModel = model.brand_uuid ? await this.broker.call("brand._get",{ id: model.brand_uuid }, {
				meta: ctx.meta
			}) : {}
			const skuModels = await this.broker.call("article_sku.list",{
				channel: model.channel,
				article_uuid: id
			}, {
				meta: ctx.meta
			})

			let attributes = {}
			const attribute_values = await this.broker.call("article_attribute_value.list",{
				article_uuid: id
			}, {
				meta: ctx.meta
			})

			if(attribute_values.length>0){
				const ids = [...new Set(attribute_values.map(item => item.attribute_uuid))]
				const attrs = await this.broker.call("attribute.getByIds",{
					ids
				}, {
					meta: ctx.meta
				})

				attributes = attrs.attributes.map((x)=>({
						id: x.id,
						name: x.name,
						title: x.title,
						values: attribute_values.filter(item => item.attribute_uuid === x.id)
					}))
			}

			/* get attachs */
			const attachsDbSet = await this.broker.call("article_attach._listByQuery",{
				query: {
					article_uuid: id
				}
			})

			const attachFiles = await this.broker.call("file._listByQuery",{
				query:{
					id: {
						[Op.in]: attachsDbSet.map(item => item.file_val)
					}
				}
			})

			const attachs = attachsDbSet.map((item)=>({
				...item.dataValues,
				file: { ...attachFiles.find(x => x.id === item.file_val).dataValues }
			}))

			return {
				...model.dataValues,
				attachs,
				attributes,
				skus: skuModels,
				brand: brandModel
			};
		},
	}
};

export default service;
