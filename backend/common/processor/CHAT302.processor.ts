import axios from "axios";
import { Plugins } from "node-resque";
const host = 'https://api.302.ai/v1/chat/completions'
const headers = {
	Accept: "application/json",
	ContentType: "application/json",
	"Authorization": "sk-s4kgXIWp9KGBBS5uy1giyWGiTNTdsJoM5Mz22hiqilaeDVKP",
}
export default {
    CHAT302: async (postJson)=>{
		const gptInstance = axios.create({
			timeout: 100000,
		});
		const { data } = await gptInstance.post(host, postJson , {
			headers
		}).catch((err)=>{
			throw err.response?.data
		})
		return data
	},
	CHATFY: async (content,toLang="英文")=>{
		/* 这里默认使用豆包翻译 */
		const gptInstance = axios.create({
			timeout: 100000,
		});
		const { data } = await gptInstance.post(host, {
			model: "Doubao-pro-32k",
			messages:[
				{
					role: "user",
					content: `帮我翻译成${toLang} "${content}" 并只给我返回译文不要其他信息，如果原文中有特殊符号，请忽略。`
				}
			]
		} , {
			headers
		}).catch((err)=>{
			throw err.response?.data
		})
		return data
	}
}
