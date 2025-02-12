import type { Context } from "moleculer";
import createService from "./base";

const service = createService("util");
service.methods = {
	...service.methods,
	sendSMS(){
		if(process.env.SMS_ID)
		{
			/** 这里实现手机短信发送的过程 */
			return `短信已发送，请注意查收!`;
		}
	}
}

service.actions = {
  ...service.actions,
  smsVerify:{
	rest:"POST /sms",
	params: {
		key:{
			type:"string",
			optional: false
		},
		to: {
			type:"string",
			optional: false
		},
		code: {
			type:"string",
			optional: true
		}
	},
	async handler(ctx: Context<any,any>){
		const { to, key, code } = ctx.params;
		const fullkey = `sms-${key}$-${to}`;
		const dbSet = await this.adapter.find({
			query: {
				key: fullkey
			},
			sort: ["-created_at"]
		})
		let model
		if(dbSet.length>0) model = dbSet[0].dataValues
		if(code)
		{
			/** 检验、消费 */
			if(!model || model.value.used) throw new Error("验证码错误...");
		    if(model.value.expire_at < Date.now() || model.value.used) throw new Error("验证码已过期...");
			if(model.value.code===code){
				model.value.used = true;
				model.value.used_at = Date.now()
				this.adapter.updateById(model.id, {
					$set:{
						value: model.value
					}
				})
				return true;
			}
			throw new Error("验证码错误...");
		} else {
			/** 生成、发送 */
			if(model && Date.now() - model.value.send_at < 1000 * 60 && !model.value.used)
			{
				throw new Error("请勿在60秒内重复发送短信！");
			}
			const randomCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
			const res = await this.adapter.insert({
				key: fullkey,
				value: { 
					code: randomCode.toString(), 
					send_at: Date.now().toString() , 
					expire_at: (Date.now() + 1000 * 60 * 5).toString() ,
					used: false,
					used_at: null
				},
				remark: `${new Date()} 发送短信验证码`
			});
			console.log(`${fullkey} verify code:`,randomCode)
			return true;
		}
	}
  },
  emailVerify:{
	rest:"POST /email",
	async handler(){

	}
  },
}

export default service;
