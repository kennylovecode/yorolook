// eslint-disable-next-line import/no-extraneous-dependencies
import db from "sequelize";
import type { DbModel } from "../types";

export const options = {
	createdAt: "created_at",
	updatedAt: "updated_at",
}

export const model: DbModel =  {
	name: "disk_directory",
	define: {
		id: {
			type: db.UUID,
			defaultValue: db.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		/// 系统规划名称
		system_name:{
			type: db.STRING,
			allowNull: true,
			defaultValue: ""
		},
		/// 标题
		title: {
			type: db.STRING(255),
			allowNull: false,
		},
		/** 标签 */
		keywords:{
			type: db.STRING(2000),
			allowNull: true,
		},
		/** 简单的频道关系关联
		 * 如为空则为用户个人作品集
		 * 如存在则遵循 channel_relation_uuid
		 * 例品牌频道则为  brand_1234567 则代表为
		 * 品牌1234567这个ID的关联
		 * 查询时遵循此规则
		 */
		channel_relation: {
			type: db.STRING(1000),
			allowNull: true,
		},
		/// 父目录id,如果是根目录则为null
		parent_uuid: {
			type: db.UUID,
			allowNull: true,
		},
		/// 层级关系树，ROOT_UUID,Child_uuid,GrandChild_uuid 以此类推
		layer_tree:{
			type: db.STRING,
			allowNull: true,
		},
		/// 深度,默认为 1
		deep:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 1
		},
		/// 封面
		covers:{
			type: db.STRING,
			allowNull: true,
		},
		/// 物理路径
		physical_path:{
			type: db.STRING,
			allowNull: false,
		},
		/// 创建者
		owner_uuid:{
			type: db.UUID,
			allowNull: true,
		},
		/// 登录校验  0: 不校验  1:需校验
		login_limit:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		/// 身份限制，只有身份与此相同才可查看，如果为空则不限制
		type_id_limit:{
			type: db.STRING(1000),
			allowNull: true
		},
		/// 积分支付限制，0: 不限制  1:需支付的积分以永久查看
		payment_limit:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		payment_type:{
			type: db.STRING(64),
			allowNull: false,
			defaultValue: 0
		},
		/// 创作者推荐
		owner_recommend:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		/* 是否发布 0:完全公开 1:仅个人主页公开 2:仅自己可见 */
		status:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		/// 发布审核
		publish_approve: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		/// 系统推荐
		sys_recommend:{
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		mimes:{
			type: db.STRING(1000),
			allowNull: false,
			defaultValue: ""
		},
		/// 排序
		display_order: {
			type: db.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	options
};
