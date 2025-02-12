// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from "jsonwebtoken";
import _ from "lodash";
import type { Context,  ServiceSchema } from "moleculer";
import { Errors } from "moleculer";
import type { IncomingRequest, Route } from "moleculer-web";

interface Meta {
	userAgent?: string | null | undefined;
	user?: object | null | undefined;
}

const authGuardMixin: Partial<ServiceSchema> = {
	methods:{
		/**
		 * 鉴权,RETURN的用户信息会进入ctx.meta.user中
		 */
		async authenticate(ctx: Context,route: Route,req: IncomingRequest){
			try {
				let { authorization } = req.headers;

				if(!authorization){
					return null;
				}
				if (authorization.startsWith("Bearer")) {
					/// 有可能是ACCESS TOKEN, 也有可能是 REFRESH TOKEN
					const token = authorization.slice(7);
					const tokenInfo:any = await new this.Promise((resolve, reject) => {
						jwt.verify(token, (process.env.JWT_SECRET as string),
							(err: unknown, decoded: any) => {
								if (err)
								{
									/** 这里不能REJECT,因为做了全局ERROR处理，
									 * 这里REJECT就不处理后续业务了
									 * 所以这里返回一个NULL到ctx.meta.user里面 */
									resolve(null);
								}
								resolve(decoded);
							}
						);
					});
					if(tokenInfo) {
						/** 获取账户的私有服务 */
						const user = await this.broker.call("account._get", {
							id: tokenInfo.id,
						});
						return user;
					}
				}
				return null;
			} catch (error) {
				return null;
			}
		},
		/**
		 * 授权
		 */
		async authorize(ctx: Context<null, any>, route: Route, req: IncomingRequest) {
			// Get the authenticated user.
			const { user } = ctx.meta;
			const { auth, restricted, allows, name, params } = req.$action;
			//** 参数守护，严格按照action设置的params进行过滤 */
			if(params) req.$params = _.pick(req.$params,Object.keys(params));
			if (auth) {
				if(!user) {
					if(name==="account.exchange")
					{
						throw new Errors.MoleculerError('请重新登录账户...', 402, 'EXCHANGE_FAILD');
					}
					throw new Errors.MoleculerError('登录状态失效...', 401, 'TOKEN_INVALID');
				}
				const exist = await this.broker.call("account.exist",{ id: user.id});
				if(!exist) {
					console.log("账户已失效")
					throw new Errors.MoleculerError('账户已失效...', 402, 'EXCHANGE_FAILD');
				}
				/** 如果政策限制 */
				if(restricted)
				{
					if(user.manage) {
						return;
					}
					/** 没有允许的身份且非管理员，则拒绝访问 */
					if(allows.length<1)
					{
						throw new Errors.MoleculerError('拒绝访问', 403, 'ACCESS_DENIED');
					}
					/** 检查身份是否满足放行需求，不满足则拒绝访问 */
					if(!allows.includes(user.type?.name))
					{
						throw new Errors.MoleculerError('拒绝访问', 403, 'ACCESS_DENIED');
					}
				}
			}
		},
	}
};

export default authGuardMixin;
