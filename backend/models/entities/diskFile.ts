// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
};

export const model: DbModel = {
	name: "disk_file",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		/// 标题
		title: {
			type: db.STRING(255),
			allowNull: false,
		},
		/// 原始文件名称
		original_filename: {
			type: db.STRING(1000),
			allowNull: true,
		},
		/// 原始文件路径
		original_filepath: {
			type: db.STRING(1000),
			allowNull: true,
		},
		/// 原始文件mime类型
		original_mime_type: {
			type: db.STRING(255),
			allowNull: false,
		},
		/// 原始文件大小，单位byte
		original_size: {
			type: db.INTEGER,
			allowNull: false,
		},
		/// 文件唯一编码验证,将文件byte通过md5加密后生成
		original_md5: {
			type: db.STRING(32),
			allowNull: false,
		},
		/// 所在虚拟目录 UUID 路径
		directory_uuid_paths: {
			type: db.TEXT("medium"),
			allowNull: true,
		},
		/// 发布者的UUID
		owner_uuid: {
			type: db.UUID,
			allowNull: false,
		},
		/// 积分支付限制，0: 不限制  1:需支付积分以永久使用或下载源文件
		payment_limit: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		payment_type: {
			type: db.STRING(64),
			allowNull: false,
			defaultValue: 0,
		},
		keywords: {
			type: db.STRING(2000),
			allowNull: true,
		},
		conditents: {
			type: db.JSON,
			allowNull: true,
		},
		display_order: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		status: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	},
	options,
};
