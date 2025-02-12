import type { Context } from "moleculer";
import { createLeetParams,listParams } from "../models/dtos/accountUmbrellaStruct";
import createService from "./base";

const service = createService("accountUmbrellaStruct");

service.actions = {
	...service.actions,
	/** 创建韭菜链 */
	createLeet: {
		rest: "POST /create_leet",
		params: createLeetParams,
		async handler(ctx: Context<any,any>){
			// eslint-disable-next-line @typescript-eslint/naming-convention
			const { account_uuid, invite_uuid } = ctx.params;

			const dbSet = await this.adapter.find({ query: { account_uuid } });
			if(dbSet.length>0)
			{
				return dbSet[0];
			}

			/** 邀请者的父级 */
			const inviterDbSet = await this.adapter.find({ query: { account_uuid: invite_uuid} });
			const inviterParent = inviterDbSet.length>0 ? inviterDbSet[0] : null;
			const insertModel:any = {
				account_uuid,
				invite_account_uuid: invite_uuid,
			}
			if(inviterParent)
			{
				insertModel.root_account_uuid = inviterParent.root_account_uuid;
			}else{
				insertModel.root_account_uuid = invite_uuid;
			}
			const res = await this.adapter.insert(insertModel);
			return res;
		}
	},
	/** 我的韭菜 */
	myLeet: {
		rest: "POST /my_leet",
		auth: true,
		params: listParams,
		async handler(ctx: Context<typeof listParams,any>){
			const { idx, size, keywords, sort } = ctx.params;
			const dbSet = await this.adapter.find({
				query: {
					root_account_uuid: ctx.meta.user.id,
				},
				limit: size,
				offset: ((idx-1) * size),
				sort,
			});
			return dbSet;
		}
	},
}

export default service;
