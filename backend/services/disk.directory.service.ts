/* eslint-disable import/no-extraneous-dependencies */
import fs from "fs";
import path from "path";
import axios from "axios";
import _ from "lodash";
import mime from "mime-types";
import { sync as mkdir } from "mkdirp";
import { Errors } from "moleculer";
import type { Context } from "moleculer";
import { Op, where } from "sequelize";
import { listParams, updateParams } from "../models/dtos/diskDirectory";
import createService from "./base";
const service = createService("dir", "diskDirectory");

delete service.actions?.list;
service.settings = {
	...service.settings,
	ACCEPT_TYPES: ["image", "video", "audio", "text", "application"], // 允许上传的文件类型
	DENIED_CHAR: ["<", ">", ":", '"', "/", "\\", "|", "?", "*", "_", "."], // 禁止字符
	DISK_DIR: `.virtual_disk/`, // 虚拟磁盘根目录
	PUBLIC_DIR: `./public`, // 公开发布目录
	RAND_CHARS: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
	/** 公开解析列 */
	SHOW_FIELDS: ["id", "title"],
	D_HTTP: "http://ad.yorolook.com/",
};

service.methods = {
	...service.methods,
	autoFixedDeleteTitle(title: string) {
		if (title.startsWith("DEL")) {
			const titleArr = title.split(".");
			return titleArr[1];
		}
		return `DEL.${title}.${this.generateRandomString(10)}`;
	},
	invalidChar(name: string) {
		for (const i of this.settings.DENIED_CHAR) {
			if (name.indexOf(i) >= 0) {
				return true;
			}
		}
		return false;
	},
	async make(
		title: string,
		owner_uuid: string,
		parent?: any,
		channel_relation?: string,
		system_name?: string,
	) {
		try {
			if (!owner_uuid) {
				return new Errors.MoleculerClientError("No permission to create directory ...");
			}

			let physical_path = `${this.settings.DISK_DIR}`;
			if (system_name) {
				physical_path = `${this.settings.DISK_DIR}/${system_name}_${owner_uuid}`;
			}
			if (channel_relation) {
				physical_path = `${this.settings.DISK_DIR}/${system_name}`;
			}
			if (parent) {
				physical_path = `${parent?.physical_path}/${title}`;
			}

			/// 构建基础信息模型
			const model = {
				system_name,
				title,
				parent_uuid: parent?.id || "",
				layer_tree: parent?.id ? `${parent?.layer_tree}${parent?.id},` : "",
				deep: parent?.deep >= 0 ? (parent?.deep as number) + 1 : 0,
				physical_path,
				channel_relation: parent?.channel_relation
					? parent.channel_relation
					: channel_relation || "",
				owner_uuid,
				status: system_name === "own" ? 2 : 0,
			};

			/// 创建目录
			mkdir(model.physical_path);

			/// 检测是否存在该目录数据
			const modelQuery = _.pick(model, [
				"title",
				"deep",
				"owner_uuid",
				"channel_relation",
				"parent_uuid",
			]);
			const dbSet = await this.adapter.find({
				query: {
					...modelQuery,
				},
			});
			if (dbSet.length > 0) {
				const dbModel = dbSet[0].dataValues;
				if (!dbModel.physical_path) {
					dbModel.physical_path = model.physical_path;
					await this.adapter.updateById(dbModel.id, {
						physical_path: model.physical_path,
					});
				}
				/// 当数据存在物理目录不存在时需要修复并创建目录
				if (!fs.existsSync(dbModel.physical_path)) {
					mkdir(dbModel.physical_path);
				}
				return new Errors.MoleculerClientError("当前目录已存在该名称的文件夹...");
			}
			const res = await this.adapter.insert(model);
			return res.dataValues;
		} catch (error) {
			return new Errors.MoleculerClientError("创建文件夹错误...");
		}
	},
	permissionCheck(model: any, user: any): string {
		const needLogin =
			model.login_limit > 0 ||
			model.payment_limit > 0 ||
			model.status > 0 ||
			model.type_id_limit;
		if (needLogin && !user) {
			return "需登录后查看..";
		}
		if (model.status === 255 && !user?.manage) {
			/** 已逻辑删除的目录，非管理员不可查看 */
			return "非管理员无法查看回收站文件..";
		}
		if (model.status > 1 && user?.id !== model.owner_uuid && !user?.manage) {
			/** 文件夹待权限设置的 */
			return "非创建者无法查看..";
		}
		if (model.type_id_limit && model.type_id_limit !== user?.type_id && !user?.manage) {
			/** 非指定身份的 */
			return "非指定身份无法查看..";
		}

		/** 检查是否需要付费 */
		if (model.payment_limit > 0 && !user?.manage) {
			/** 如果已经付费则通过往下，否则不返回里面的数据 */
			if (user?.id !== model.owner_uuid && !user?.manage) {
				return "您未支付该目录的费用..";
			}
		}
		return "";
	},
	generateRandomString(length: number) {
		return Array(length)
			.fill(null)
			.map(
				() =>
					this.settings.RAND_CHARS[
						Math.floor(Math.random() * this.settings.RAND_CHARS.length)
					],
			)
			.join("");
	},
};

service.actions = {
	...service.actions,
	/**
	 * 创建文件夹
	 */
	makeDir: {
		rest: "POST /make",
		auth: true,
		params: {
			title: {
				type: "string",
				optional: false,
				defaultValue: "",
			},
			parent_uuid: {
				type: "string",
				optional: true,
				defaultValue: "",
			},
			channel_relation: {
				type: "string",
				optional: true,
				defaultValue: "",
			},
		},
		async handler(ctx: Context<any, any>) {
			const { title, parent_uuid, channel_relation } = ctx.params;

			if (!title?.trim() || this.invalidChar(title)) {
				return new Errors.MoleculerClientError("文件夹名称不可为空或包含特殊字符!");
			}
			/// 获取父级目录信息
			let parent = parent_uuid ? await this.adapter.findById(parent_uuid) : null;
			if (!parent) {
				const dbSet = await this.adapter.find({
					query: {
						system_name: "own",
						owner_uuid: ctx.meta.user?.id,
						deep: 0,
					},
				});

				if (dbSet.length > 0) {
					parent = { ...dbSet[0].dataValues };
				} else {
					parent = await this.make("个人库", ctx.meta.user?.id, null, null, "own");
				}
			}

			if (parent.owner_uuid !== ctx.meta.user?.id && !ctx.meta.user.manage) {
				return new Errors.MoleculerClientError("无权操作...");
			}

			/// 执行
			const res = await this.make(
				title,
				ctx.meta.user.id,
				parent,
				channel_relation,
				channel_relation,
			);
			return res;
		},
	},
	/**
	 * 设置文件夹属性
	 */
	set: {
		rest: "PUT /set",
		auth: true,
		params: updateParams,
		async handler(ctx: Context<any, any>) {
			const { user } = ctx.meta;
			const {
				id,
				title,
				keywords,
				covers,
				login_limit,
				type_id_limit,
				payment_limit,
				publish_approve,
				sys_recommend,
				owner_recommend,
			} = ctx.params;
			const updateModel = {
				title,
				keywords,
				covers,
				login_limit,
				type_id_limit,
				payment_limit,
				owner_recommend,
				publish_approve,
				sys_recommend,
			};

			const model = await this.adapter.findById(id);
			if (model.owner_uuid !== user?.id && !user?.manage) {
				return new Errors.MoleculerClientError("没有权限修改...");
			}
			if (model.title !== title) {
				if (fs.existsSync(model.physical_path.replace(model.title, title))) {
					return new Errors.MoleculerClientError("该目录已存在，请更换名称！");
				}
				/// 更改路径文件夹名称
				fs.renameSync(model.physical_path, model.physical_path.replace(model.title, title));
				model.physical_path = model.physical_path.replace(model.title, title);
			}
			const res = await this.adapter.updateById(model.id, {
				$set: {
					...updateModel,
					physical_path: model.physical_path,
				},
			});
			return res;
		},
	},
	/**
	 * 删除文件夹
	 */
	remove: {
		rest: "DELETE /rem",
		auth: true,
		params: {
			id: "string",
		},
		async handler(ctx: Context<any, any>) {
			const { id } = ctx.params;
			const model = await this.adapter.findById(id);

			if (!model) {
				throw new Error("文件夹不存在！");
			}
			if (model.owner_uuid !== ctx.meta.user?.id && !ctx.meta.user?.manage) {
				throw new Error("没有权限删除！");
			}

			const query = {
				[Op.or]: [
					{
						id,
					},
					{
						layer_tree: {
							[Op.like]: `%${model.layer_tree}${model.id},%`,
						},
					},
				],
			};
			/// 物理删除直接清空数据
			await this.adapter.removeMany(query);

			/// 调用删除目录方法
			if (fs.existsSync(model.physical_path)) {
				fs.rmdirSync(model.physical_path, { recursive: true });
			}

			/// 移除所有目录下的文件
			await this.broker.call(
				"file.removePaths",
				{
					path_uuid: `${model.layer_tree}${model.id}`,
				},
				{
					meta: ctx.meta,
				},
			);
			return true;
		},
	},
	root: {
		rest: "GET /root",
		auth: true,
		async handler(ctx: Context<typeof listParams, any>) {
			const { user } = ctx.meta
			if(user){
				const myOwn = await this.adapter.model.findOne({
					where: {
						owner_uuid: user.id,
						deep: 0,
						system_name: "own",
					},
				});
				if (!myOwn) {
					await this.make("个人库", user.id, null, null, "own");
				}
			}
			const dbSet = await this.adapter.find({
				query: {
					[Op.and]: [
						{
							system_name: {
								[Op.ne]: null,
							},
						},
						{
							channel_relation: {
								[Op.eq]: "",
							},
						},
						{
							[Op.or]: [
								{ owner_uuid: ctx.meta.user.id },
								{ owner_uuid: null },
								{ owner_uuid: "" }, // 添加空字符串的检查
							],
						},
						{
							deep: 0,
						},
						{
							[Op.or]: [{ parent_uuid: null }, { parent_uuid: "" }],
						},
					],
				},
				sort: ["created_at"],
			});

			return dbSet;
		},
	},
	channelRoot: {
		rest: "GET /channel-root",
		auth: true,
		params: {
			channel_relation: {
				type: "string",
				optional: false,
			},
			channel_title: {
				type: "string",
				optional: true,
			},
		},
		async handler(ctx: Context<typeof listParams, any>) {
			const { channel_relation, channel_title } = ctx.params;
			const root = await this.adapter.model.findOne({
				where: {
					system_name: `root_${channel_relation}`,
				},
			});
			if (!root) {
				const createRoot = await this.make(
					`${channel_title}主页`,
					ctx.meta.user?.id,
					null,
					channel_relation,
					`root_${channel_relation}`,
				);
				return createRoot;
			}
			return root;
		},
	},
	/** 获取目录列表 */
	list: {
		rest: "POST /list",
		auth: true,
		params: {
			...listParams,
			id: {
				type: "string",
				optional: false,
			},
			channel: {
				type: "string",
				optional: true,
				default: "",
			},
			status: {
				type: "number",
				optional: true,
				default: 0,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { idx, size, sort, status, id, channel } = ctx.params;
			const { user } = ctx.meta;

			if(user){
				const myOwn = await this.adapter.model.findOne({
					query: {
						owner_uuid: user.id,
						deep: 0,
						system_name: "own",
					},
				});
				if (!myOwn) {
					await this.make("个人库", user.id, null, null, "own");
				}
			}
			const queryOpAnd = [];
			if (channel) {
				queryOpAnd.push({
					channel_relation: channel,
				});
			} else {
				queryOpAnd.push({
					channel_relation: channel,
				});
			}
			/** id 可以是UUID，可以是system_name，基于查询某个目录时的传递 */
			/** 判断id是什么类型  是UUID还是普通string */
			const uuidRegex =
				/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

			let dbSet: any = [];
			let parent_model: any = {};
			if (uuidRegex.test(id)) {
				parent_model = (await this.adapter.findById(id))?.dataValues;
			} else if (channel) {
				const channelArr = channel.split("_");
				const channelModel = await this.broker.call(`${channelArr[0]}._get`, {
					id: channelArr[1],
				});
				if (!channelModel) {
					return new Errors.MoleculerClientError("数据错误...");
				}
				dbSet = await this.adapter.find({
					query: {
						system_name: `root_${channel}`,
						channel_relation: channel,
					},
				});

				if (dbSet.length > 0) {
					parent_model = { ...dbSet[0].dataValues };
				} else {
					parent_model = await this.make(
						`${channelModel.title}主页`,
						channelModel.owner_uuid,
						null,
						channel,
						`root_${channel}`,
					);
				}
			} else {
				dbSet = await this.adapter.find({
					query: {
						system_name: id,
						owner_uuid: id === "own" ? user?.id : "",
					},
				});

				if (dbSet.length > 0) {
					parent_model = { ...dbSet[0].dataValues };
				} else if (id === "own") {
					parent_model = await this.make("个人库", user?.id, null, null, "own");
				} else {
					return new Errors.MoleculerClientError("目录不存在...");
				}
			}

			if (parent_model.id) {
				queryOpAnd.push({
					parent_uuid: parent_model.id,
				});
				const permissionRejectReason = this.permissionCheck(parent_model, ctx.meta.user);
				// 如果权限检测不通过则会直接返回
				if (permissionRejectReason) {
					return new Errors.MoleculerClientError(`${permissionRejectReason}...`);
				}
			}

			const isMy = user?.id === parent_model?.owner_uuid || user.manage;

			//* 构建状态查询条件 0:完全公开 1:仅个人主页公开 2:仅自己可见 */
			const statusCondi = isMy ? status : 0;
			queryOpAnd.push({
				status: {
					[Op.lte]: statusCondi,
				},
			});

			const dirs = await this.adapter.find({
				query: {
					[Op.and]: queryOpAnd,
				},
				limit: size,
				offset: (idx - 1) * size,
				sort: sort || ["-created_at"],
			});
			const total = await this.adapter.count({
				query: {
					[Op.and]: queryOpAnd,
				},
			});

			Object.assign(parent_model, {
				dir_total: total,
				dirs,
			});
			if (total < size || dirs.length <= 0) {
				const files = await this.broker.call(
					"file.list",
					{
						paths: `${parent_model?.layer_tree ? `${parent_model?.layer_tree}` : ""}${
							parent_model?.id || ""
						}`,
						...ctx.params,
					},
					{
						meta: ctx.meta,
					},
				);
				Object.assign(parent_model, {
					file_total: files.total,
					files: files.list,
				});
			}

			const stacks = [];
			if (parent_model.layer_tree) {
				const tmpArr = parent_model.layer_tree.split(",");
				for (const element of tmpArr) {
					if (element) {
						const dir = await this.adapter.findById(element);
						stacks.push({
							id: dir.id,
							title: dir.title,
						});
					}
				}
			}
			Object.assign(parent_model, {
				stacks,
			});
			return parent_model;
		},
	},
	search: {
		rest: "POST /search",
		params: {
			type: {
				type: "string",
				optional: true,
			},
			keywords: {
				type: "string",
				optional: true,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { type, keywords } = ctx.params;
			const queryOpAnd: any = [];
			const onlyDir = type === "dir";
			queryOpAnd.push({
				deep: {
					[Op.gte]: 1,
				},
			});

			queryOpAnd.push({
				[Op.or]: [
					{
						owner_uuid: ctx.meta.user.id,
					},
					{
						status: 0,
					},
				],
			});

			if (type && type !== "dir") {
				queryOpAnd.push({
					mimes: {
						[Op.like]: `%${type}%`,
					},
				});
			}

			const keywordsArr = keywords?.split(",") || [];
			/** 将 keywords 数组加入到查询条件中 */
			if (keywordsArr?.length > 0) {
				const titleQueryOr = [];
				const keywordsQueryOr = [];
				for (const keyword of keywordsArr) {
					titleQueryOr.push({
						title: {
							[Op.like]: `%${keyword}%`,
						},
					});
					keywordsQueryOr.push({
						keywords: {
							[Op.like]: `%${keyword}%`,
						},
					});
				}
				queryOpAnd.push({
					[Op.or]: [{ [Op.and]: titleQueryOr }, { [Op.and]: keywordsQueryOr }],
				});
			}

			const dbSet = await this.adapter.find({
				query: {
					[Op.and]: queryOpAnd,
				},
				sort: ["-created_at"],
			});
			const total = await this.adapter.count({
				query: {
					[Op.and]: queryOpAnd,
				},
			});

			if (!onlyDir) {
				const files = await this.broker.call(
					"file.search",
					{
						...ctx.params,
					},
					{
						meta: ctx.meta,
					},
				);
				return {
					dirs: dbSet,
					dir_total: total,
					file_total: files.total,
					files: files.list,
				};
			}
			return {
				dirs: dbSet,
				dir_total: total,
				file_total: 0,
				files: [],
			};
		},
	},
	upload: {
		rest: "POST /upload",
		auth: true,
		async handler(ctx: Context<any, any>) {
			const { user, $multipart, filename } = ctx.meta;
			const mime_type = mime.lookup(filename) || "";
			let parent_model = await this.adapter.findById($multipart.uuid);
			if (!parent_model) {
				const dbSet = await this.adapter.find({
					query: {
						owner_uuid: user.id,
						deep: 0,
						system_name: "own",
					},
				});
				if (dbSet.length > 0) {
					parent_model = { ...dbSet[0].dataValues };
				} else {
					parent_model = await this.make("个人库", user.id, null, null, "own");
				}
			}
			const permissionRejectReason = this.permissionCheck(parent_model, user);
			// 如果权限检测不通过则会直接返回
			if (permissionRejectReason) {
				return new Errors.MoleculerClientError(permissionRejectReason);
			}
			const chunks = [];

			const new_filename = `${Date.now()}_${this.generateRandomString(8)}`;
			const cache_path = path.join(this.settings.PUBLIC_DIR, ".cache", `${new_filename}.tmp`);
			const original_filepath = path.join(
				parent_model.physical_path,
				`${new_filename}${path.extname(filename)}`,
			);

			const handlerToSave = () =>
				new this.Promise((resolve, reject) => {
					const fileStream = fs.createWriteStream(cache_path);
					fileStream.on("close", () => {
						resolve(cache_path);
					});
					// f.on("error", () => { Remove the errored file. });
					ctx.params.on("data", (chunk) => {
						//** 将chunks 加入chunks */
						chunks.push(chunk);
					});
					ctx.params.on("error", (err: Error) => {
						reject(err);
						fileStream.destroy(err);
						// Destroy the local file
					});
					ctx.params.pipe(fileStream);
				});
			await handlerToSave();

			const mimesArr = parent_model.mimes?.split(",").map((x) => x) || [];
			if (mimesArr.indexOf(mime_type) < 0) {
				mimesArr.push(mime_type);
				this.adapter.updateById(parent_model.id, {
					$set: {
						mimes: mimesArr.join(","),
					},
				});
			}
			const res = await this.broker.call(
				"file.upload",
				{
					chunks,
					filename,
					layer_tree: `${parent_model.layer_tree ? `${parent_model.layer_tree}` : ""}${
						parent_model.id
					}`,
					cache_path,
					original_filepath,
				},
				{
					meta: {
						user,
					},
				},
			);
			return res;
		},
	},
	uploadUrl: {
		rest: "POST /upload_url",
		auth: true,
		params: {
			url: {
				type: "string",
				optional: false,
			},
			uuid: {
				type: "string",
				optional: true,
				default: "",
			},
		},
		async handler(ctx: Context<any, any>) {
			try {
				const { url, uuid } = ctx.params;
				const { user } = ctx.meta;

				let parent_model = await this.adapter.model.findOne({
					where: {
						[Op.or]: {
							id: uuid,
							system_name: uuid,
						},
					},
				});
				if (!parent_model) {
					const dbSet = await this.adapter.find({
						query: {
							owner_uuid: user.id,
							deep: 0,
							system_name: "own",
						},
					});
					if (dbSet.length > 0) {
						parent_model = { ...dbSet[0].dataValues };
					} else {
						parent_model = await this.make("个人库", user.id, null, null, "own");
					}
				}

				const permissionRejectReason = this.permissionCheck(parent_model, user);
				// 如果权限检测不通过则会直接返回
				if (permissionRejectReason) {
					return new Errors.MoleculerClientError(permissionRejectReason);
				}
				/** 检查路径链接,覆盖指定路径为本地路径 */
				const new_filename = `${Date.now()}_${this.generateRandomString(8)}`;
				const abs_path = `D:/www${url}`;
				let cache_path = path.join(
					this.settings.PUBLIC_DIR,
					".cache",
					`${new_filename}.tmp`,
				);
				const original_filepath = path.join(
					parent_model.physical_path,
					`${new_filename}${path.extname(url)}`,
				);
				/** 如果还是HTTP路径，下载下来使用流上传 */
				let chunks: Buffer;
				if (fs.existsSync(abs_path)) {
					/** 加入本地有文件，则从本地文件中复制一份到缓存路径 */
					// chunks = fs.readFileSync(abs_path);
					cache_path = abs_path;
				} else if (url.indexOf("http") === 0) {
					const res = await axios({
						method: "get",
						url,
						responseType: "arraybuffer",
					});
					chunks = res.data;
					/** 将chunks写入cache_path */
					fs.writeFileSync(cache_path, chunks);
				} else {
					return {};
				}

				/** 将BUFFER转为数组 */
				const res = await this.broker.call(
					"file.upload",
					{
						chunks: chunks ? Array.from(chunks) : [],
						filename: path.basename(url),
						layer_tree: `${
							parent_model.layer_tree ? `${parent_model.layer_tree}` : ""
						}${parent_model.id}`,
						cache_path,
						original_filepath,
					},
					{
						meta: {
							user,
						},
					},
				);
				return res;
			} catch(err) {
				console.log(err)
				return {};
			}
		},
	},
	removeMimeType: {
		params: {
			id: {
				type: "uuid",
			},
			mime_type: {
				type: "string",
			},
		},
		async handler(ctx: Context<any, any>) {
			const { id, mime_type } = ctx.params;
			const model = await this.adapter.findById(id);
			if (!model) {
				return new Errors.MoleculerClientError("Directory not found");
			}
			const mimeArr = model.mimes?.split(",").filter((x) => x && x !== mime_type);
			await this.adapter.updateById(id, {
				$set: {
					mimes: mimeArr.join(","),
				},
			});
			return true;
		},
	},
};

export default service;
