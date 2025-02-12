import jwt from "jsonwebtoken";
import _, { get } from "lodash";
import { Errors, type Context } from "moleculer";
import { listParams, loginParams, setupParams } from "../models/dtos/account";
import createService from "./base";
import { Op } from "sequelize";
import axios from "axios";

let wxworkConfig: any = {
	corpid: "ww32aac9fe03d00a07",
	corpsecret: "LEHDato5q-aSxoD8AyOI12KWCOl3IImg_e1MTRezyKQ"
}

const service = createService("account");
function generateJwtToken(payload: any) {
	return jwt.sign(payload, process.env.JWT_SECRET as string);
}
service.methods = {
	...service.methods,
	generateToken(user: any, remember: boolean) {
		const today = new Date();
		let JWT_EXPIRES = parseInt(process.env.JWT_EXPIRES_HOUR as string, 10);
		if (remember) JWT_EXPIRES = parseInt(process.env.JWT_REMEMBER_HOUR as string, 10);
		if (user.manage > 0) JWT_EXPIRES = 9999;

		/** TOKEN 过期时间 */
		const accessTokenExpired = new Date(today).setHours(today.getHours() + JWT_EXPIRES);
		/** REFRESH TOKEN 过期时间 */
		const refreshTokenExpired = new Date(today).setDate(today.getHours() + JWT_EXPIRES * 3);

		const payload = {
			id: user.id,
			username: user.username,
			manage: user.manage > 0,
			exp: Math.floor(new Date(accessTokenExpired).getTime() / 1000),
			type: user.type,
		};

		const result: any = {
			accessToken: generateJwtToken(payload),
		};

		if (remember) {
			result.refreshToken = generateJwtToken({
				...payload,
				ot_exp: Math.floor(new Date(accessTokenExpired).getTime() / 1000),
				exp: Math.floor(new Date(refreshTokenExpired).getTime() / 1000),
				exchange: "E",
			});
		}

		return result;
	},
	async register(mobile: string, email?: string, username?: string, give?: boolean) {
		const defaultType = await this.broker.call("type.default")
		const user = await this.adapter.insert({
			username: username || `${mobile}`,
			password: "123456", /** 默认密码 */
			mobile,
			rename: 1,
			email: email,
			amount: give ? 1000000 : 0,
			point: give ? 100000000 : 0,
			type_id: defaultType.type?.id,
			status: 0
		})
		/** 默认的普通用户是永久的没有过期时间 */
		if (user) this.broker.call("account_rank.create", {
			account_uuid: user.id,
			type_id: defaultType.type?.id,
			type_rank_id: defaultType.rank?.id,
			expired_time: null
		})
		return user;
	},
	async wxwork_init() {
		const { data } = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${wxworkConfig.corpid}
			&corpsecret=${wxworkConfig.corpsecret}`)
		if (data.errcode === 0) {
			Object.assign(wxworkConfig, {
				...data,
				expired_time: new Date(new Date().getTime() + data.expires_in * 1000)
			})
		}
	}
}

service.actions = {
	...service.actions,
	_list: {
		params: {
			query: "object"
		},
		async handler(ctx: Context<any, any>) {
			const { query } = ctx.params;
			const accounts = await this.adapter.find({
				query
			});
			return accounts.map(account => _.omit(account.dataValues, "password", "type_id"));
		}
	},
	_get: {
		params: {
			id: "string"
		},
		async handler(ctx: Context<any, any>) {
			const account = await this.adapter.findById(ctx.params.id);
			if (account) {
				const displayModel = _.omit(account.dataValues, "type_id");
				return displayModel
			}
			throw new Errors.MoleculerError("未找到用户!", 401, "NOT_FOUND");
		}
	},
	get: {
		rest: "GET /:id",
		auth: true,
		params: { id: "string" },
		async handler(ctx: Context<{ id: string }, any>) {
			console.log(this.adapter)
			const user = await this.adapter.findById(ctx.params.id);
			if (!user) {
				throw new Errors.MoleculerError("未找到用户类型!", 401, "NOT_FOUND");
			}
			const displayModel = _.omit(user.dataValues, "type_id");
			return {
				...displayModel,
				type: await this.broker.call("type.get", { id: user.type_id }),
				rank: await this.broker.call("account_rank.getByAccount", { account_uuid: displayModel.id, type_id: user.type_id }),
				profile: await this.broker.call("account_profile.show", { id: displayModel.id })
			};
		}
	},
	createType: {
		/** 升级用户类型 */
		rest: "POST /create_type",
		auth: true,
		params: {
			user_uuid: "string",
			type_id: "string",
		},
		async handler(ctx: Context<any, any>) {
			const { user_uuid, type_id } = ctx.params;
			/** 检查权限，如果不是管理员，则不能操作 */
			if (!ctx.meta.user.manage) {
				throw new Errors.MoleculerError("没有权限!", 403, "NOT PERMISSION");
			}
			const user = await this.adapter.findById(user_uuid);
			if (!user) {
				throw new Errors.MoleculerError("未找到用户!", 401, "NOT_FOUND");
			}
			if (user.type_id === type_id) {
				throw new Errors.MoleculerError("无需升级!", 403, "UNCHANGE");
			}
			/** 找到身份类型 */
			const toType = await this.broker.call("type.get", { id: type_id });
			if (!toType) {
				throw new Errors.MoleculerError("未找到用户类型!", 401, "NOT_FOUND");
			}
			/** 找到默认身份等级 */
			const typeDefaultRank = await this.broker.call("type_rank.default", { type_id: toType.id });
			if (!typeDefaultRank) {
				throw new Errors.MoleculerError("未找到默认用户等级!", 401, "NOT_FOUND");
			}
			/** 检索用户是否已有该身份等级，如果已存在就直接返回，不能覆盖 */
			let accountRank = await this.broker.call("account_rank.getByAccount", { account_uuid: user.id, type_id });
			if (accountRank) return accountRank;

			/** 创建用户身份等级记录，过期时间默认为空 */
			var createAccountRank = {
				account_uuid: user.id,
				type_id,
				type_rank_id: typeDefaultRank.id,
				expired_time: null
			}

			accountRank = await this.broker.call("account_rank.create", createAccountRank);
			/** 如果记录是创建成功的，那么就更新用户类型 */
			if (accountRank) {
				await this.adapter.updateById(user.id, { type_id: toType.id });
				return accountRank
			}
			throw new Errors.MoleculerError("未找到默认用户等级!", 401, "NOT_FOUND");
		}
	},
	show: {
		rest: "GET /show/:id",
		params: {
			id: "string"
		},
		async handler(ctx: Context<any, any>) {
			const dbSet = await this.adapter.find({
				query: {
					[Op.or]: {
						id: ctx.params.id,
						username: ctx.params.id
					}
				}
			});
			const user = dbSet[0];
			if (!user) {
				throw new Errors.MoleculerError("未找到用户类型!", 401, "NOT_FOUND");
			}
			const displayModel = _.omit(user.dataValues, "password", "type_id");
			const profile = await this.broker.call("account_profile.show", { id: user.id })
			const type = await this.broker.call("type.get", { id: user.type_id })
			if (displayModel.privacy != null) {
				if (!displayModel.privacy.openPage) {
					return { privacy: displayModel.privacy }
				}
			}
			return {
				...displayModel,
				type,
				profile,
				following_count: 10888,
				follower_count: 11888,
				access_count: 12888,
				publish: 11888,
				brand: 12888,
				favorite: 13888,
				gallery: 14888,
				history: 15888,
			};
		}
	},
	exist: {
		auth: true,
		params: {
			id: "string"
		},
		async handler(ctx: Context<any, any>) {
			const dbSet = await this.adapter.find({
				query: {
					id: ctx.params.id
				}
			});
			return dbSet.length > 0;
		}
	},
	setUsername: {
		rest: "PUT /set-username",
		auth: true,
		params: {
			username: "string"
		},
		async handler(ctx: Context<any, any>) {
			const dbSet = await this.adapter.find({
				query: {
					id: ctx.meta.user?.id
				}
			});
			if (dbSet.length <= 0) {
				throw new Errors.MoleculerError('登录失效...', 401, 'TOKEN_INVALID');
			}
			const user = dbSet[0];
			if (user.rename) {
				await this.adapter.updateById(user.id, {
					$set: {
						username: ctx.params.username
					}
				});
				return true;
			}
			throw new Error("您无法修改用户名...");
		}
	},
	//* * 隐私设置 */
	setPrivacy: {
		rest: "PUT /set-privacy",
		auth: true,
		params: {
			privacy: "object"
		},
		async handler(ctx: Context<any, any>) {
			const workKeys = ['openPage', 'openFollow', 'openPlatform',
				'showWebsite', 'showEmail', 'showMobile', 'showAddress',
				'showBirthday', 'showCountry', 'showDescription', 'showFavorite',
				'showFollowing', 'showFollower', 'showGallery', 'showBrand', 'showPublish'];
			const { privacy } = ctx.params;
			if (typeof privacy === 'object') {
				// eslint-disable-next-line no-restricted-syntax
				for (const key in privacy) {
					if (!workKeys.includes(key)) {
						delete privacy[key];
					}
				}
			}
			const res = await this.adapter.updateById(ctx.meta.user?.id, {
				$set: {
					privacy
				}
			});
			return privacy;
		}
	},
	/** 首选项设置 */
	setPreference: {
		rest: "PUT /set-preference",
		auth: true,
		params: {
			preference: "object"
		},
		async handler(ctx: Context<any, any>) {
			const workKeys = ['layoutMode', 'showTagsView', 'showLogo', 'fixedHeader',
				'showFooter', 'showNotify', 'showThemeSwitch', 'showScreenfull', 'showSearchMenu',
				'cacheTagsView', 'showWatermark', 'showGreyMode', 'showColorWeakness', 'pageCount']
			const { preference } = ctx.params;
			if (typeof preference === 'object') {
				// eslint-disable-next-line no-restricted-syntax
				for (const key in preference) {
					if (!workKeys.includes(key)) {
						delete preference[key];
					}
				}
			}

			await this.adapter.updateById(ctx.meta.user?.id, {
				$set: {
					preference
				}
			});
			return preference;
		}
	},
	bindEmail: {
		async handler() {

		}
	},
	wechat: {
		async handler() {

		}
	},
	bindMobile: {
		async handler() {

		}
	},
	/** 账户信息统一获取接口 */
	me: {
		rest: "GET /me",
		auth: true,
		async handler(ctx: Context<any, any>) {
			const dbSet = await this.adapter.find({
				query: {
					id: ctx.meta.user?.id
				}
			})
			if (dbSet.length <= 0) throw new Errors.MoleculerServerError('用户不存在...', 401, 'TOKEN_INVALID')
			const user = dbSet[0];
			const displayModel = _.omit(user.dataValues, "password");
			const typeRanks = await this.broker.call("account_rank.me", {}, { meta: ctx.meta })
			const profileModel = await this.broker.call("account_profile.my", {}, { meta: ctx.meta })
			return {
				...displayModel,
				...typeRanks,
				profile: profileModel,
				following_count: 10888,
				follower_count: 11888,
				access_count: 12888,
				publish: 11888,
				brand: 12888,
				favorite: 13888,
				gallery: 14888,
				history: 15888,
			};
		}
	},
	/**
	 * 登录接口
	 * 假设使用验证码登录时没有账户
	 * 会自动创建
	 */
	login: {
		rest: "POST /login",
		params: loginParams,
		async handler(ctx: Context<typeof loginParams, any>) {
			const { username, password, code, remember, invite } = ctx.params;
			/** 登录账户 */
			const dbSet = await this.adapter.find({
				query: {
					[Op.or]: {
						username,
						email: username,
						mobile: username,
					}
				},
				sort: ["-created_at"]
			});

			let user = null
			/** 无验证码的情况下 */
			if (!code && password && dbSet.length > 0) {
				/** 取出密码匹配的用户 */
				user = dbSet.find((x: any) => x.password === password);
				if (!user) throw new Error("用户密码错误...");
			}
			/** 使用验证码的情况下 */
			if (code) {
				/** 校验短信 */
				const smsVerifyRes = await this.broker.call("util.smsVerify", { to: username, code, key: "login" });
				if (!smsVerifyRes) {
					throw new Error("验证码错误...");
				}
				/** 取出第一个用户 */
				if (dbSet.length > 0) user = dbSet[0].dataValues
				if (!user) {
					user = await this.register(username);
					if (user) {
						/** 注册成功后，建立关系伞 */
						const inviterModel = await this.adapter.findById(invite);
						if (inviterModel && inviterModel.is_distribution) {
							await this.broker.call("account_umbrella_struct.createLeet", {
								account_uuid: user.id,
								invite_uuid: invite
							});
						}
					} else throw new Error("注册用户失败...")
				}
			}

			if (user) {
				const typeRes: any = await this.broker.call("type._get", { id: `${user.type_id}` })
				user.type = typeRes;
				const token = this.generateToken(user, remember);
				return token;
			}
			throw new Error("用户不存在..");
		}
	},
	/**
	 * 交换TOKEN登录
	 */
	exchange: {
		rest: "POST /exchange",
		auth: true,
		async handler(ctx: Context<any, any>) {
			const { id, username } = ctx.meta.user;
			const dbSet = await this.adapter.find({
				query: {
					[Op.and]: {
						id,
						username
					}
				}
			});
			if (dbSet.length > 0) {
				const user = dbSet[0];
				const typeRes: any = await this.broker.call("type.get", { id: user.type_id })
				user.type = typeRes;
				const token = this.generateToken(user, true);
				return token;
			}
			return {};
		}
	},
	/**
	 * 自动创建的账号
	 * 初步需要填写用户名和密码
	 */
	setup: {
		rest: "POST /setup",
		auth: true,
		params: setupParams,
		async handler(ctx: Context<any, any>) {
			const dbSet = await this.adapter.find({
				id: ctx.meta.user.id
			});

			if (dbSet.length > 0) {
				const user = dbSet[0];
				if (user.rename) {
					throw new Error("账户已进行初始化设置...");
				}
				else {
					const { username, password } = ctx.params;
					const update = {
						username,
						password
					};
					const res = await this.adapter.updateById(user.id, {
						$set: update
					});
					return res;
				}
			}
			throw new Error("系统异常，请重新登录...");
		}
	},
	/** 列表接口 */
	list: {
		rest: "POST /list",
		auth: true,
		params: listParams,
		restricted: true,
		allows: [],
		async handler(ctx: Context<typeof listParams, any>) {
			const { idx, size, keywords, sort } = ctx.params;

			const res = await this.adapter.find({
				limit: size,
				offset: (idx - 1) * size,
				sort
			})
			return res;
		}
	},
	switchType: {
		rest: "POST /switch",
		auth: true,
		params: {
			type_id: {
				type: "number",
				optional: false,
			}
		},
		async handler(ctx: Context<any, any>) {
			const { type_id } = ctx.params;
			if (ctx.meta.user.type_id === type_id) return true
			const typeRanks = await this.broker.call("account_rank.me", {}, { meta: ctx.meta })
			/** 判断用户是否拥有该身份 */
			if (typeRanks.types.findIndex(x => x.id === type_id) >= 0) {
				const res = await this.adapter.updateById(ctx.meta.user?.id, {
					$set: {
						type_id
					}
				})
				return true
			}
			throw new Errors.MoleculerError("您没有该身份的权限", 500, "FORBIDDEN")
		}
	},
	consum: {
		rest: "POST /consum",
		auth: true,
		allows: [],
		params: {
			type: "string",
			value: "number",
			title: "string",
			remark: {
				type: "string",
				optional: true,
				default: ""
			}
		},
		async handler(ctx: Context<any, any>) {
			/**
			 * 虚拟货币政策
			 * 1刀=7元 700Y币
			 * 1元=100Y币
			 * 1Y币=100点积分
			 */
			const { type, title, remark } = ctx.params;

			const value = parseInt(ctx.params.value);

			if (value === 0) return new Errors.MoleculerClientError("错误的金额...")
			if (type !== "point" && type !== "amount") return new Errors.MoleculerClientError("类型错误...")

			const typeTtile = type === "point" ? "积分" : "余额";

			if (ctx.params.value < 0 && ctx.meta.user[ctx.params.type] < Math.abs(ctx.params.value)) {
				return new Errors.MoleculerClientError(`您的${typeTtile}剩余${ctx.meta.user[ctx.params.type]}不足${Math.abs(ctx.params.value)}，无法继续操作...`)
			}

			const walletRes = await this.broker.call("account_wallet.create", {
				type,
				value,
				title,
				remark
			}, { meta: ctx.meta })
			const consumResult = (ctx.meta.user[ctx.params.type] + ctx.params.value)
			if (walletRes.id) {
				await this.adapter.updateById(ctx.meta.user?.id, {
					$set: {
						[ctx.params.type]: consumResult
					}
				})
				return walletRes;
			}
			return new Errors.MoleculerError("系统异常，请重试...")
		}
	},
	exchangeAmount: {
		rest: "POST /exchange_amount",
		auth: true,
		params: {
			amount: "number",
		},
		async handler(ctx: Context<any, any>) {
			const { amount } = ctx.params
			if (amount / 100 <= 0) return new Errors.MoleculerClientError("错误的金额...");
			if (ctx.meta.user.amount < amount) return new Errors.MoleculerClientError(`余额不足...`);
			const pointAdd = amount * 10000
			this.broker.call("account_wallet.create", {
				type: "amount",
				value: -amount,
				title: "Y币兑换积分",
				remark: ""
			}, { meta: ctx.meta })
			this.broker.call("account_wallet.create", {
				type: "point",
				value: pointAdd,
				title: "Y币兑换积分",
				remark: ""
			}, { meta: ctx.meta })
			const updateUser = this.adapter.updateById(ctx.meta.user.id, {
				$set: {
					amount: ctx.meta.user.amount - amount,
					point: ctx.meta.user.point + pointAdd
				}
			})
			if (updateUser) {
				return {
					amount: ctx.meta.user.amount - amount,
					point: ctx.meta.user.point + pointAdd
				}
			}
			return new Errors.MoleculerClientError("兑换失败,未知错误....")
		}
	},
	wxwork_auth: {
		rest: "POST /wxwork_auth",
		params: {
			code: "string",
			state: {
				type: "string",
				optional: true
			}
		},
		async handler(ctx) {
			const { code, state } = ctx.params;
			console.log(state)
			if (!code) {
				throw new Error("Missing code parameter");
			}

			try {
				if (!wxworkConfig.access_token || !wxworkConfig.expired_time || wxworkConfig.expired_time < new Date()) {
					await this.wxwork_init()
				}
				/// 获取基础信息
				const url = `https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${wxworkConfig.access_token}&code=${code}`
				const { data } = await axios.get(url);
				const { user_ticket, errcode } = data;

				if (errcode === 0) {
					/// 获取详细信息
					const userResponse = await axios.post(`https://qyapi.weixin.qq.com/cgi-bin/auth/getuserdetail?access_token=${wxworkConfig.access_token}`, {
						user_ticket
					})

					const { userid, gender, mobile, email, avatar } = userResponse.data

					const dbSet = await this.adapter.find({
						query: {
							mobile
						}
					})

					if (dbSet.length > 0) {
						let user = dbSet[0]
						const token = this.generateToken(user, true);
						this.broker.call("account_auth_log.create", {
							account_uuid: user.id,
							platform: "wxwork",
							response: userResponse.data
						})
						return token;
					}
					else {
						let user = await this.register(mobile, email, userid, true);
						await this.broker.call("account_profile.mySave", {
							avatar,
							nickname: mobile,
							realname: '企业微信' + new Date().getSeconds(),
							gender: gender ? '男' : "女",
						}, {
							meta: {
								user
							}
						})
						const token = this.generateToken(user, true);
						this.broker.call("account_auth_log.create", {
							account_uuid: user.id,
							platform: "wxwork",
							response: userResponse.data
						})
						return token;
					}
				}
				return data
			} catch (error) {
				throw new Errors.MoleculerError(error);
			}
		}
	}
}
export default service;
