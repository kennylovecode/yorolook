/* eslint-disable import/no-extraneous-dependencies */
import type { Context } from "moleculer";
import DbService from "moleculer-db";
import SqlAdapter from "moleculer-db-adapter-sequelize";
import { Sequelize } from "sequelize";
import type { DbModel,DbServiceSchema,DbServiceThis } from "../models/types";

export default function createDbServiceMixin(modelParam: DbModel) : object{
	if(!modelParam)
	{
		return {};
	}
	const sequelize:Sequelize = new Sequelize(
		process.env.DB_NAME || "yoroservicedb",
		process.env.DB_USER || "root",
		process.env.DB_PASSWORD || "kp2009accp",
		{
		host: process.env.DB_HOST || "127.0.0.1",
		dialect: "mysql",
		dialectOptions: {
			dateStrings: true, // 将日期和时间转换为字符串
			typeCast: true, // 将字符串转换为日期和时间对象
			connectTimeout: 60000
		},
		timezone: "+08:00",
		pool: {
            max: 100, // 最大连接数
            min: 0, // 最小连接数
            acquire: 30000, // 获取连接的最大时间
            idle: 10000 // 连接空闲的最大时间
        }
	});
	const tablePrefixName = "yl_";
	const model: DbModel = { ...modelParam };
	if(model.name.indexOf(tablePrefixName)!==0)
	{
		model.name = `${tablePrefixName}${model.name}`;
	}
	const cacheCleanEventName = `cache.clean.${model.name}`;
	const schema: DbServiceSchema = {
		mixins: [DbService],
		adapter: new SqlAdapter(sequelize),
		events: {
			/**
			 * Subscribe to the cache clean event. If it's triggered
			 * clean the cache entries for this service.
			 */
			async [cacheCleanEventName](this: DbServiceThis) {
				if (this.broker.cacher) {
					await this.broker.cacher.clean(`${this.fullName}.*`);
				}
			},
		},
		methods: {
			/**
			 * Send a cache clearing event when an entity changed.
			 */
			async entityChanged(type: string, json: unknown, ctx: Context): Promise<void> {
				await ctx.broadcast(cacheCleanEventName);
			},
		},
		actions:{
			// Disable remove action
			create: false,
			remove: false,
			list: false,
			get: false,
			update:false,
		},
		model
	};
	return schema;
}
