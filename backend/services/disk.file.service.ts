import fs from "fs";
import path from "path";
import { Mistral } from "@mistralai/mistralai";
import axios from "axios";
import CryptoJS from "crypto-js";
import jimp from "jimp";
import _ from "lodash";
import mime from "mime-types";
import { sync as mkdir } from "mkdirp";
import type { Context } from "moleculer";
import { Errors } from "moleculer";
import { Op } from "sequelize";
import sharp from "sharp";
import { listParams, updateParams } from "../models/dtos/diskFile";
import createService from "./base";

const service = createService("file", "diskFile");
const startPath = process.cwd();

service.settings = {
	...service.settings,
	PUBLIC_DIR: `${startPath}/public/images/`, // 公开发布目录
	TMP_DIR: `${startPath}/public/.cache/`, // 临时文件目录
	ACCEPT_TYPES: ["image", "video", "audio", "text", "application"], // 允许上传的文件类型
	DENIED_CHAR: [
		"<",
		">",
		":",
		'"',
		"/",
		"\\",
		"|",
		"?",
		"*",
		"_",
		"$",
		"%",
		"@",
		"!",
		"%",
		"^",
		"&",
	],
	D_HTTP: "http://ad.yorolook.com/",
	RAND_CHARS: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
	SHOW_FIELDS: ["id", "title"],
	IMAGE_WIDTH: [300, 600, 900, 1200, 1600], // x-small small medium large x-large
	IMAGE_WIDTH_NAME: ["x-small", "small", "medium", "large", "x-large"],
};

service.methods = {
	...service.methods,
	acceptType(mimeType: string) {
		for (const type of this.settings.ACCEPT_TYPES) {
			if (mimeType.indexOf(type) > -1) {
				return true;
			}
		}
		return false;
	},
	/** 取临近尺寸 */
	getNearestWidth(file_path: string, width: number) {
		const files = fs.readdirSync(file_path);
		const fileWidths = files.map((x) => parseInt(x.split(".")[0], 10)).filter(Boolean);
		return fileWidths.reduce((prev, curr) =>
			Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev,
		);
	},
	charValidation(name: string) {
		return this.settings.DENIED_CHAR.some((char) => name.includes(char));
	},
	async checkImage(filepath: string) {
		return new Promise((resolve, reject) => {
			jimp.read(filepath)
				.then((image) => {
					if (image.getWidth() != null) {
						resolve(filepath);
					} else {
						sharp(filepath)
							.toFile(`${filepath}.png`)
							.then(() => resolve(`${filepath}.png`))
							.catch(() => resolve(""));
					}
				})
				.catch(() => {
					sharp(filepath)
						.toFile(`${filepath}.png`)
						.then(() => resolve(`${filepath}.png`))
						.catch(() => resolve(""));
				});
		});
	},
	/**
	 * 发布图片到公共目录下,以便访问
	 * @param fileId 文件ID
	 * @param buffer 图片数据
	 * @returns
	 */
	async generatePublicImage(_id: string, _buffer: Buffer): Promise<void> {
		try {
			const image = await jimp.read(_buffer);
			const promises: Promise<void>[] = []; // 存储所有异步任务的 Promise

			for (const width of this.settings.IMAGE_WIDTH) {
				const file_path = path.join(this.settings.PUBLIC_DIR, _id.toString());
				mkdir(file_path);

				const originalWidth = image.getWidth();
				if (originalWidth === null) {
					return;
				}

				if (originalWidth <= width) {
					if (originalWidth <= this.settings.IMAGE_WIDTH[0]) {
						promises.push(
							new Promise<void>((resolve, reject) => {
								image.write(path.join(file_path, `${width}.webp`), (err) => {
									if (err) return reject(err);
									resolve();
								});
							}),
						);
					}
					break;
				}

				const file_fullname = path.join(file_path, `${width}.webp`);
				const clonedImage = image.clone();
				const ratio = width / originalWidth;

				promises.push(
					new Promise<void>((resolve, reject) => {
						clonedImage
							.resize(width, image.getHeight() * ratio)
							.quality(70)
							.write(file_fullname, (err) => {
								if (err) return reject(err);
								resolve();
							});
					}),
				);
			}

			await Promise.all(promises); // 等待所有任务完成
		} catch (errorJIMP) {
			try {
				const promises: Promise<void>[] = [];

				for (const width of this.settings.IMAGE_WIDTH) {
					const file_path = path.join(this.settings.PUBLIC_DIR, _id.toString());
					mkdir(file_path);
					const image = sharp(_buffer);
					const originalWidth = (await image.metadata()).width;

					if (originalWidth === null) {
						return;
					}

					if (originalWidth <= width) {
						if (originalWidth <= this.settings.IMAGE_WIDTH[0]) {
							promises.push(
								image
									.resize(width)
									.webp({ quality: 70 })
									.toFile(path.join(file_path, `${width}.webp`))
									.then(() => {}), // 忽略返回值
							);
						}
						break;
					}

					const file_fullname = path.join(file_path, `${width}.webp`);
					promises.push(
						image
							.resize(width)
							.webp({ quality: 70 })
							.toFile(file_fullname)
							.then(() => {}), // 忽略返回值
					);
				}

				await Promise.all(promises); // 等待所有任务完成
			} catch (error) {
				console.error("saveImgToWidth", "sharp error", error);
			}
		}
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
	async basePredict(base64: string) {
		try {
			const postParams = {
				data: [
					base64,
					"a7a5fcbb0ea245aea7b381393017e0a6",
					"wd14-vit-v2",
					0.1,
					"",
					"",
					false,
					false,
					true,
					"0_0, (o)_(o), +_+, +_-, ._., <o>_<o>, <|>_<|>, =_=, >_<, 3_3, 6_9, >_o, @_@, ^_^, o_o, u_u, x_x, |_|, ||_||",
					false,
				],
				event_data: null,
				fn_index: 2,
				session_hash: "fmme2uchoeg",
			};
			const url = "https://plugin.liblib.art/sd-webui-tagger/run/predict";
			const res = await axios.post(url, postParams);
			const { data } = res.data;
			return {
				status: data[0],
				keywords: data[1],
				conditents: data[3].confidences.filter((x) => x.confidence >= 0.1),
			};
		} catch {
			return null;
		}
	},
	async translate(s1: string, t1: string, q: string) {
		try {
			// const translateUrl = `https://fy.httpcn.com/bdaify/?s1=${s1}&t1=${t1}&q=${q}`;
			const translateUrl = `https://www.worldlingo.com/Sg0NoecXVVBsQeWBZ7hb_1rhKD4jEN2ElsZbrxpDzkcM-/texttranslate?wl_srcenc=utf-8&wl_tp=&wl_srclang=${s1}&wl_trglang=${t1}&wl_text=${q}`;
			const translateRes = await axios.post(
				translateUrl,
				{},
				{
					timeout: 100000,
				},
			);
			/** 使用流式读取 */
			//return translateRes.data.result.trans_result[0].dst;
			return translateRes.data;
		} catch {
			return q;
		}
	},
	mergeBuffers(chunks) {
		try {
			// 计算总长度
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
			// 创建一个新 Buffer 来存储合并后的数据
			const fileBuffer = Buffer.alloc(totalLength);

			// 逐块拷贝数据到新 Buffer
			let offset = 0;
			for (const chunk of chunks) {
				chunk.copy(fileBuffer, offset);
				offset += chunk.length;
			}
			return fileBuffer;
		} catch {
			return Buffer.from(chunks);
		}
	},
	getSafeFilename(url: string) {
		try {
			if (url.startsWith("http://") || url.startsWith("https://")) {
				// 解析远程 URL
				const parsedUrl = new URL(url);
				let filename = path.basename(parsedUrl.pathname); // 提取路径部分的文件名

				// 处理 URL 参数，防止 "?id=xxx" 影响文件名
				const id = parsedUrl.searchParams.get("id");
				if (id) {
					filename = id + path.extname(filename) || ".webp"; // 确保有扩展名
				}

				return filename || "default.webp"; // 确保不会返回空
			}
			// 解析本地路径
			return path.basename(url) || "default.webp";
		} catch (err) {
			console.error("Error parsing URL:", err);
			return "default.webp"; // 解析失败时返回默认值
		}
	},
	async AIPredict(urlOrBase64: string) {
		const apiKey = "Tof5LjdObQlVCxO6XWsjlNvMajmjbctt";

		const client = new Mistral({ apiKey });

		const chatResponse = await client.chat.complete({
			model: "pixtral-12b",
			messages: [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: "描述图片关键词标签，标签用“*”号隔开",
						},
						{
							type: "image_url",
							imageUrl: urlOrBase64,
						},
					],
				},
			],
		});
		if (chatResponse.choices[0].message.content.toString().indexOf("*") < 0) {
			return "";
		}
		return chatResponse.choices[0].message.content
			.toString()
			.replace(/\n/g, "")
			.replaceAll(" ", "")
			.split("*")
			.filter((x) => x)
			.join(",");
	},
};

service.actions = {
	...service.actions,
	/** 只允许从目录服务调用，因为需要判断目录的权限 */
	upload: {
		auth: true,
		params: {
			chunks: "array",
			filename: "string",
			cache_path: "string",
			original_filepath: "string",
			layer_tree: {
				type: "string",
				optional: true,
			},
			predict: {
				type: "boolean",
				optional: true,
				default: false,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { chunks, filename, layer_tree, cache_path, original_filepath, predict } =
				ctx.params;
			const mime_type = mime.lookup(filename) || "";

			// 检查 MIME 类型是否允许
			if (!this.acceptType(mime_type)) {
				throw new Errors.MoleculerClientError("文件类型不允许上传！");
			}

			const savePath = path.join(startPath, original_filepath);
			let fileBuffer = null;

			try {
				if (chunks && chunks.length > 0) {
					// chunks 存在时，合并为 Buffer
					fileBuffer = this.mergeBuffers(chunks);
					// 直接保存文件
					fs.writeFileSync(savePath, fileBuffer);
				} else if (cache_path && fs.existsSync(cache_path)) {
					// chunks 不存在，使用 cache_path 读取文件
					fileBuffer = fs.readFileSync(cache_path);

					// 复制文件到最终保存路径
					fs.copyFileSync(cache_path, savePath);
				} else {
					// 两者都不存在，返回 null
					return null;
				}

				// 确保文件有效
				if (!fileBuffer || fileBuffer.length === 0) {
					throw new Errors.MoleculerClientError("文件内容为空或无效！");
				}

				// 计算 MD5
				const base64Data = fileBuffer.toString("base64");
				const md5Hash = CryptoJS.MD5(base64Data).toString().toUpperCase();

				let keywords = "";
				if (predict && mime_type.startsWith("image")) {
					keywords = await this.AIPredict(`data:${mime_type};base64,${base64Data}`);
				}

				// 插入数据库
				const model = await this.adapter.insert({
					title: filename,
					original_filename: filename,
					original_filepath,
					original_mime_type: mime_type,
					original_size: fileBuffer.byteLength,
					original_md5: md5Hash,
					directory_uuid_paths: layer_tree,
					owner_uuid: ctx.meta.user?.id,
					keywords, // AI 关键词
				});

				// 如果是图片，生成公开访问版本
				if (mime_type.startsWith("image")) {
					await this.generatePublicImage(model.id, fileBuffer);
				}

				return model.dataValues;
			} catch (error) {
				this.logger.error("文件处理失败：", error);
				throw new Errors.MoleculerClientError("文件上传失败，请稍后再试！");
			}
		},
	},
	list: {
		rest: "POST /list",
		auth: true,
		params: listParams && {
			status: {
				type: "number",
				optional: true,
				default: 0,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { paths, idx, size, sort, status } = ctx.params;

			const queryOpAnd: any = [
				{
					status,
				},
			];

			if (status < 255)
				queryOpAnd.push({
					directory_uuid_paths: paths,
				});
			const dbSet = await this.adapter.find({
				query: {
					[Op.and]: queryOpAnd,
				},
				limit: size,
				offset: (idx - 1) * size,
				sort: [sort || "-created_at"],
			});

			return {
				list: dbSet,
				total: dbSet.length,
			};
		},
	},
	search: {
		auth: true,
		params: {
			keywords: { type: "string" },
			type: {
				type: "string",
				optional: true,
			},
		},
		async handler(ctx: Context<any, any>) {
			const { type, keywords } = ctx.params;
			const queryOpAnd: any = [];
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

			if (type) {
				queryOpAnd.push({
					original_mime_type: {
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

			return {
				list: dbSet,
				total,
			};
		},
	},
	download: {
		rest: "GET /download",
		auth: true,
		async handler(ctx: Context<any, any>) {
			const { id } = ctx.params;
			const model = await this.adapter.findById(id);
			if (!model) {
				return new Errors.MoleculerClientError("File not found");
			}
			ctx.meta.$responseType = model.original_mime_type;
			return fs.createReadStream(model.original_filepath);
		},
	},
	remove: {
		rest: "DELETE /remove",
		params: {
			id: { type: "string" },
		},
		auth: true,
		async handler(ctx: Context<any, any>) {
			const { id, logic } = ctx.params;
			const model = await this.adapter.findById(id);
			if (!model) {
				return new Errors.MoleculerClientError("File not found");
			}
			if (ctx.meta.user?.id !== model.owner_uuid && !ctx.meta.user.manage) {
				return new Errors.MoleculerClientError("没有权限操作...");
			}
			if (logic) {
				await this.adapter.updateById(id, { $set: { status: 255 } });
				return true;
			}
			if (!ctx.meta.user.manage) {
				return new Errors.MoleculerClientError("没有权限操作...");
			}
			/** 检测当前文件的mimetype，并查询当前目录下是否还有该类型的文件，如果没有就需要更新父目录的mimetype */
			await this.adapter.removeById(id);
			const parent_uuid = model.directory_uuid_paths
				.split(",")
				.map((x) => x)
				.reverse()[0];
			const mimeCount = await this.adapter.count({
				query: {
					directory_uuid_paths: model.directory_uuid_paths,
					original_mime_type: model.original_mime_type,
				},
			});
			if (mimeCount <= 0) {
				await this.broker.call("dir.removeMimeType", {
					id: parent_uuid,
					mime_type: model.original_mime_type,
				});
			}
			fs.unlinkSync(model.original_filepath);
			// if(model.original_mime_type.indexOf('image')>=0)
			// 	{fs.unlinkSync(`${this.settings.PUBLIC_DIR}/${model.id}`)}
			return true;
		},
	},
	update: {
		auth: true,
		params: updateParams,
		async handler(ctx: Context<any, any>) {
			const { id, title, payment_limit, display_order, status } = ctx.params;
			const model = await this.adapter.findById(id);
			if (!model) {
				return new Errors.MoleculerClientError("找不到文件信息...");
			}
			if (model.owner_uuid !== ctx.meta.user.id && !ctx.meta.user.manage) {
				return new Errors.MoleculerClientError("没有权限修改...");
			}
			const $set: any = {};
			if (model.title !== title) $set.title = title;
			if (model.payment_limit !== payment_limit) $set.payment_limit = payment_limit;
			if (model.display_order !== display_order) $set.display_order = display_order;
			if (model.status !== status) $set.status = status;
			const res = await this.adapter.updateById(id, { $set });
			return res;
		},
	},
	previewImage: {
		rest: "GET /view",
		async handler(ctx: Context<any, any>) {
			try {
				const { id } = ctx.params;
				let _w = ctx.params.w as number;

				const indexOfName = this.settings.IMAGE_WIDTH_NAME.indexOf(_w);
				if (!_w) {
					_w = this.settings.IMAGE_WIDTH[0] as number;
				}
				if (indexOfName > -1) {
					_w = this.settings.IMAGE_WIDTH[indexOfName];
				}
				const indexOfWidth = this.settings.IMAGE_WIDTH.indexOf(_w);
				/** 如果宽度不是标准值，取邻近的标准 */
				_w =
					indexOfWidth > -1
						? _w
						: this.getNearestWidth(path.join(this.settings.PUBLIC_DIR, id), _w);
				ctx.meta.$responseType = "image/webp";
				ctx.meta.$responseHeaders = {
					"Access-Control-Allow-Origin": "*",
					"Cache-Control": "public, max-age=31536000",
				};
				return fs.readFileSync(path.join(this.settings.PUBLIC_DIR, id, `${_w}.webp`));
			} catch (err) {
				ctx.meta.$responseType = "text/html";
				return new Errors.MoleculerClientError("load image error...");
			}
		},
	},
	previewFile: {
		rest: "GET /fileview",
		async handler(ctx: Context<any, any>) {
			const { id } = ctx.params;
			const model = await this.adapter.findById(id);
			if (model) {
				if (!ctx.meta.user.manage) {
					if (model.status === 255) {
						return "该文件已被删除，无法查看。";
					}
					if (model.status > 0) {
						return "作者将该文件设置为不对外公开，无法预览。";
					}
					if (model.payment_limit > 0) {
						return "该文件需要您付费后才可查看。";
					}
				}
				ctx.meta.$responseType = model.original_mime_type;
				return fs.createReadStream(model.original_filepath);
			}
			return "File not found";
		},
	},
	removePaths: {
		params: {
			path_uuid: { type: "string" },
		},
		auth: true,
		async handler(ctx: Context<any, any>) {
			const { path_uuid } = ctx.params;
			const { user } = ctx.meta;
			const queryOpAnd: any[] = [
				{
					directory_uuid_paths: {
						[Op.like]: `${path_uuid}%`,
					},
				},
			];
			if (!user.manage) {
				queryOpAnd.push({ owner_uuid: ctx.meta.user.id });
			}
			await this.adapter.removeMany({
				[Op.and]: queryOpAnd,
			});
			return true;
		},
	},
	getTags: {
		rest: "POST /tags",
		auth: true,
		params: {
			ids: {
				type: "string",
				optional: false,
			},
		},
		async handler(ctx: Context<any, any>) {
			const dbSet = await this.adapter.find({
				query: {
					id: {
						[Op.in]: ctx.params.ids.split(","),
					},
				},
			});
			return dbSet.map((x) => x.dataValues.keywords);
		},
	},
	/** 无需记录到表 */
	uploadPub: {
		rest: "POST /upload_pub",
		async handler(ctx: Context<any, any>) {
			try {
				const { filename, predict } = ctx.meta;
				const mime_type = mime.lookup(filename) || "";
				const ext = path.extname(filename);

				const chunks = [];

				const new_filename = `${Date.now()}_${this.generateRandomString(8)}`;
				const cache_path = path.join(this.settings.TMP_DIR, `${new_filename}.tmp`);

				await new Promise((resolve, reject) => {
					const fileStream = fs.createWriteStream(cache_path);
					fileStream.on("close", () => {
						resolve(cache_path);
					});
					// f.on("error", () => { Remove the errored file. });
					ctx.params.on("data", (chunk) => {
						chunks.push(chunk);
					});
					ctx.params.on("error", (err: Error) => {
						reject(err);
						fileStream.destroy(err);
						// Destroy the local file
					});
					ctx.params.pipe(fileStream);
				});

				/** 将chunks写入cache_path */
				const fileBuffer = this.mergeBuffers(chunks);
				const base64Data = fileBuffer.toString("base64");
				const md5Hash = CryptoJS.MD5(base64Data).toString().toUpperCase();
				const model = {
					id: `${new Date().getTime()}_${md5Hash}`,
					keywords: [],
				};
				mkdir(path.join(this.settings.PUBLIC_DIR, `${model.id}`));
				fs.copyFileSync(
					cache_path,
					path.join(this.settings.PUBLIC_DIR, `${model.id}`, `${filename}`),
				);

				/** 图片打标 */
				if (predict) {
					model.keywords = await this.AIPredict(`data:${mime_type};base64,${base64Data}`);
				}
				if (mime_type.indexOf("image") === 0) {
					await this.generatePublicImage(model.id, fileBuffer);
				}
				return model;
			} catch {
				return {
					id: "",
				};
			}
		},
	},
	/** 无需记录到表 */
	uploadPubUrl: {
		rest: "POST /upload_pub_url",
		params: {
			url: {
				type: "string",
				optional: false,
			},
			predict: {
				type: "boolean",
				optional: true,
				default: false,
			},
		},
		async handler(ctx: Context<any, any>) {
			try {
				const { url, predict } = ctx.params;
				const abs_path = path.join("D:/www", url); // 确保路径拼接正确
				let fileBuffer = null;

				// **1. 先检查本地文件**
				if (fs.existsSync(abs_path)) {
					fileBuffer = fs.readFileSync(abs_path);
				}
				// **2. 如果本地文件不存在，尝试从网络下载**
				else if (url.startsWith("http")) {
					const res = await axios.get(url, { responseType: "arraybuffer" });
					fileBuffer = res.data;
				}
				// **3. 两者都不存在，返回空对象**
				else {
					return {};
				}

				// **4. 计算文件信息**
				const mime_type = mime.lookup(url) || "";
				const md5Hash = CryptoJS.MD5(fileBuffer).toString().toUpperCase(); // 直接对 Buffer 计算 MD5

				// **5. 生成唯一 ID 并创建存储目录**
				const model = {
					id: `${Date.now()}_${md5Hash}`,
					keywords: [],
				};
				const saveDir = path.join(this.settings.PUBLIC_DIR, model.id);
				fs.mkdirSync(saveDir, { recursive: true }); // 确保目录存在

				// **6. 保存文件**
				const savePath = path.join(saveDir, this.getSafeFilename(url));
				fs.writeFileSync(savePath, fileBuffer);

				// **7. 图片打标**
				if (predict && mime_type.startsWith("image")) {
					const base64Data = fileBuffer.toString("base64"); // 仅在需要时转换
					model.keywords = await this.AIPredict(`data:${mime_type};base64,${base64Data}`);
				}

				// **8. 生成公开图片**
				if (mime_type.startsWith("image")) {
					await this.generatePublicImage(model.id, fileBuffer);
				}

				return model;
			} catch (error) {
				this.logger.error("文件处理失败：", error);
				throw new Errors.MoleculerClientError("文件下载或存储失败");
			}
		},
	},
};

export default service;
