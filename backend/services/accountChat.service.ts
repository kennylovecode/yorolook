import createService from "./base";
import { listParams } from "../models/dtos/accountChat";
import { Op } from "sequelize";
import { Errors } from "moleculer";

const service = createService("accountChat");

service.actions = {
	...service.actions,
	addBatch: {
		rest: "POST /add-batch",
		params: {
			messages: { type: "array", optional: true },
		},
		handler: async function (ctx: any) {
            if(ctx.params.messages.length > 10) return new Error("每次最多缓存10条对话..")
			try {
                await this.adapter.insertMany();
                return true
			}catch(err){
				return false
			}
		}
	},
    my: {
        rest: "POST /my",
        auth: true,
        params: {
            ...listParams,
            model: "string"
        },
        handler: async function (ctx: any) {
            const { idx, size, model } = ctx.params;
            const query = {
                model: model,
                [Op.or]: {
                    from_account_uuid: ctx.meta.user.id,
                    to_account_uuid: ctx.meta.user.id
                }
            }
            const dbSet = await this.adapter.find({
                query,
                sort: ["-updated_at","-created_at"],
                limit: size,
                offset: (idx - 1) * size,
            });
            const total = await this.adapter.count({
                query
            })
            return {
                list: dbSet,
                total
            }
        }
    },
    success: {
        auth: true,
        params: {
            id: "string"
        },
        async handler(ctx: any) {
            const res =  await this.adapter.updateById(ctx.params.id, { $set:{
                status: 1
            } });
            return res
        }
    },
    recreate: {
        auth: true,
        params: {
            id: "string",
        },
        async handler(ctx: any) {
            const model = await this.adapter.findById(ctx.params.id)
            if(model.from_account_uuid != ctx.meta.user.id) return new Errors.MoleculerClientError("NoPermission")
            this.adapter.updateById(model.id, {
                $set: {
                    updated_at: new Date(),
                    status: 0
                }
            });
            model.updated_at = new Date()
            return model
        }
    }
}

export default service;
