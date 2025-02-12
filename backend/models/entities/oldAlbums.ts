// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

/**
 * 相册表模型
 */
// eslint-disable-next-line import/prefer-default-export
export const model: DbModel = {
	name: "yl_old_albums",
	define: {
		Id: {
			type: db.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		ChannelId: {
			type: db.INTEGER,
			defaultValue: 0,
		},
		ArticleId: {
			type: db.INTEGER,
			defaultValue: 0,
		},
		GoodsId: {
			type: db.INTEGER,
			allowNull: true,
		},
		ThumbPath: {
			type: db.STRING(255),
			defaultValue: "",
		},
		OriginalPath: {
			type: db.STRING(255),
			defaultValue: "",
		},
		RemotePath: {
			type: db.STRING(255),
			allowNull: true,
		},
		Remark: {
			type: db.STRING(500),
			defaultValue: "",
		},
		AddTime: {
			type: db.DATE,
			defaultValue: db.NOW,
		},
		Sort: {
			type: db.INTEGER,
			defaultValue: 0,
		},
		DirectoryId: {
			type: db.INTEGER,
			defaultValue: 0,
		},
		BrandId: {
			type: db.INTEGER,
			defaultValue: 0,
		},
		IsDel: {
			type: db.BOOLEAN,
			defaultValue: false,
		},
		IsCover: {
			type: db.BOOLEAN,
			defaultValue: false,
		},
		Categories: {
			type: db.STRING(500),
			allowNull: true,
		},
		Title: {
			type: db.STRING(500),
			allowNull: true,
		},
		Tags: {
			type: db.STRING(500),
			allowNull: true,
		},
		Styles: {
			type: db.STRING(500),
			allowNull: true,
		},
		Colors: {
			type: db.STRING(500),
			allowNull: true,
		},
		OriginalImageWidth: {
			type: db.INTEGER,
			allowNull: true,
		},
		OriginalImageHeight: {
			type: db.INTEGER,
			allowNull: true,
		},
		OriginalImageFileSize: {
			type: db.INTEGER,
			allowNull: true,
		},
		OriginalImageFileType: {
			type: db.STRING(255),
			allowNull: true,
		},
		OriginalImageFileName: {
			type: db.STRING(255),
			allowNull: true,
		},
		MD5: {
			type: db.STRING(255),
			allowNull: true,
		},
		ContSign: {
			type: db.STRING(255),
			allowNull: true,
		},
	},
	options: undefined
};
