import { Errors, type Context } from "moleculer";
import { Op } from "sequelize";
import { createParams, updateParams } from "../models/dtos/articleAttach";
import createService from "./base";

const service = createService("articleAttach");

service.actions = {
	...service.actions,
	create: {
		rest: "PUT /create",
		auth: true,
		params: createParams,
		async handler(ctx: Context<any, any>) {
			const model = await this.adapter.insert(ctx.params);
			if (model.file_val) {
				const file = await this.broker.call("file._get", {
					id: model.file_val,
				});
				return {
					...model.dataValues,
					file: {
						...file.dataValues,
					},
				};
			}
			return model?.dataValues;
		},
	},
	update: {
		rest: "PUT /update",
		auth: true,
		params: updateParams,
		async handler(ctx: Context<any, any>) {
			const model = await this.adapter.updateById(ctx.params.id, {
				$set: ctx.params,
			});
			if (model.file_val) {
				const file = await this.broker.call("file._get", {
					id: model.file_val,
				});
				return {
					...model.dataValues,
					file: {
						...file.dataValues,
					},
				};
			}
			return model.dataValues;
		},
	},
	list: {
		rest: "GET /list",
		auth: true,
		params: {
			article_uuid: "string",
		},
		async handler(ctx: Context<any, any>) {
			const { article_uuid } = ctx.params;
			const list = await this.adapter.find({
				query: {
					article_uuid,
				},
			});
			if (list.length > 0) {
				const fileIds = list.map((x) => x.file_val);
				const files = await this.broker.call("file._listByQuery", {
					query: {
						id: {
							[Op.in]: fileIds,
						},
					},
				});

				const result = list.map((x) => {
					const file = files.find((y) => y.id === x.file_val);
					return {
						...x.dataValues,
						file: {
							...file?.dataValues,
						},
					};
				});
				return result;
			}
			return [];
		},
	},
	/** 预下载，第一次的权限检查 */
	preDownload: {
		rest: "GET /pre_down/:file_val",
		params: {
			file_val: "string",
		},
		async handler(ctx: Context<any, any>) {
			const { file_val } = ctx.params;
			const file = await this.broker.call("file._get",{
				id: file_val
			});

			if (!file) {
				throw new Errors.MoleculerClientError("文件不存在...");
			}
			if (file.status !== 0) {
				throw new Errors.MoleculerClientError("不公开的文件...");
			}
			return file.dataValues;
		},
	},
};

export default service;
