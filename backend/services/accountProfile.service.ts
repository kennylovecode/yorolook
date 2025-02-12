import type { Context } from "moleculer";
import { createParams, listParams } from "../models/dtos/accountProfile";
import createService from "./base";

const service = createService("accountProfile");

service.actions = {
	...service.actions,
	/** 创建、更新账户档案 */
	mySave:{
		rest: "PUT /my/save",
		auth: true,
		params: createParams,
		async handler(ctx: Context<typeof createParams,any>){
			const dbSet = await this.adapter.find({
				query: {
					account_uuid: ctx.meta.user.id
				}
			})

			if(dbSet.length>0)
			{
				const myProfile = dbSet[0];
				const res = await this.adapter.updateById(myProfile.id, {
					$set: ctx.params
				});
				return res;
			}
			const res = await this.adapter.insert({
				account_uuid: ctx.meta.user.id,
				...ctx.params,
			});
			return res;
		}
	},
	setBanners:{
		rest: "PUT /set-banners",
		auth: true,
		params: {
			banners: "string"
		},
		async handler(ctx: Context<any, any>){
			const res = await this.adapter.updateMany(
				{
					account_uuid: ctx.meta.user?.id,
				},
				{
					banners: ctx.params.banners,
				},
			);
			return res;
		}
	},
	/**
	 * 查看我的档案
	 */
	my: {
		rest: "GET /my",
		auth: true,
		async handler(ctx: Context<any,any>){
			const dbSet = await this.adapter.find({ query: { account_uuid: ctx.meta.user?.id } });
			return dbSet[0]||{}
		}
	},
	/**
	 * 查看别人档案
	 * 这里需要做被查看者的隐私检测
	 */
	show: {
		rest: "GET /show/:id",
		async handler(ctx: Context<any,any>){
			const dbSet = await this.adapter.find({ query: { account_uuid: ctx.params.id } });
			return dbSet[0]||{}
		}
	},
	/** 列出所有档案 */
	list:{
		rest:"POST /list",
		params: listParams,
		auth: true,
		restricted: true,
		allows: [],
		async handler(ctx: Context<typeof listParams, any>){
			const { idx, size, keywords, sort } = ctx.params;
			const res = await this.adapter.find({
				limit: size,
				offset: (idx - 1) * size,
				sort
			})
			return res;
		}
	},
}

export default service;
