import { Op } from "sequelize";
import { listParams } from "../models/dtos/account";
import { createParams } from "../models/dtos/cozeSession";
import createService from "./base";

const service = createService("cozeSession");

service.actions = {
    ...service.actions,
    mySave: {
        rest: "POST /my/save",
        auth: true,
        params: createParams,
        async handler(ctx) {
            const { conversation_id, title } = ctx.params;
            const dbSet = await this.adapter.find({
                query: {
                    [Op.and]: {
                        account_uuid: ctx.meta.user.id,
                        conversation_id
                    }
                }
            })
            if(dbSet.length>0) return dbSet[0]
            const query = {
                account_uuid: ctx.meta.user.id,
                conversation_id,
                title
            }
            const session = await this.adapter.insert(query);
            return session;
        }
    },
    my: {
        rest: "POST /my/list",
        auth:true,
        params: listParams,
        async handler(ctx) {
            const {idx,size} = ctx.params;
            const query = {
                account_uuid:  ctx.meta.user.id,
            }
            const dbSet = await this.adapter.find({
                query,
                limit: size,
                offset: ((idx-1) * size),
                sort: ["-created_at"]
            });
            return dbSet;
        }
    }
}

export default service;
