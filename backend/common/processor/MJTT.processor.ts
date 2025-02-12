import axios from "axios";
import { Plugins } from "node-resque";

const host = 'https://api.ttapi.io/midjourney/v1'
const headers = {
	Accept: "application/json",
	ContentType: "application/json",
	"TT-API-KEY": "8cc006ac-cddd-a1ee-8889-07f4debb0b3b",
}

const response = {
	"seed": null, 
	"jobId": "9d2060f3-aab6-4a5e-a2e5-52a61fd4aad9", 
	"quota": "4", 
	"width": 2048, 
	"action": "imagine", 
	"height": 2048, 
	"images": ["https://cdnb.ttapi.io/20241029/33f5ce2a-4fca-48fa-96f1-f8f5aef97a48tl.png",
		"https://cdnb.ttapi.io/20241029/33f5ce2a-4fca-48fa-96f1-f8f5aef97a48tr.png",
		"https://cdnb.ttapi.io/20241029/33f5ce2a-4fca-48fa-96f1-f8f5aef97a48bl.png",
		"https://cdnb.ttapi.io/20241029/33f5ce2a-4fca-48fa-96f1-f8f5aef97a48br.png"],
	"prompt": "a pretty logo with text 'YORO.AI', originality",
	"status": 255,
	"hookUrl": null,
	"cdnImage": "https://mjcdn.ttapi.io/attachments/1300358840231002122/1300720950358183978/white235242_a_pretty_logo_with_text_YORO.AI_originality_d539037d-3bb6-476e-aa6b-84a7a2f69248.png?ex=6721de48&is=67208cc8&hm=6dabdd4b4226e873d7318a33f458e2099c1231a96e1b244e8aac5e963ae5c44c&",
	"progress": "100",
	"components":
		["upsample1", "upsample2", "upsample3", "upsample4", "reroll", "variation1", "variation2", "variation3", "variation4"],
	"discordImage": "https://cdn.discordapp.com/attachments/1300358840231002122/1300720950358183978/white235242_a_pretty_logo_with_text_YORO.AI_originality_d539037d-3bb6-476e-aa6b-84a7a2f69248.png?ex=6721de48&is=67208cc8&hm=6dabdd4b4226e873d7318a33f458e2099c1231a96e1b244e8aac5e963ae5c44c&"
}

/** 格式化输出 */
const formatData = (data)=>{
	return {
		id: data.jobId,
		imageUrl: data.cdnImage,
		...data
	}
}

export default {
    MJTT_imagine: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
		  JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			const url = `${host}/imagine`
			if(!job.params || !job.params.prompt || !job.params.model) return {}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const postJson = {
				"model": job.params.model,
				"hookUrl": "",
				"prompt": job.params.prompt,
				"timeout": "1200",
				"getUImages": true
			}
			const { data } = await gptInstance.post(url, postJson, {
				headers
			}).catch((err)=>{
				throw err.response?.data
			})
			return data.data
		},
	},
	MJTT_action: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
		  JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			const url = `${host}/action`
			if(!job.params || !job.params.jobId || !job.params.action) return {}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const postJson = {
				"jobId": job.params.jobId,
				"action": job.params.action,
				"getUImages": true
			}
			const { data } = await gptInstance.post(url, postJson, {
				headers
			});
			return data.data
		},
	},
	MJTT_blend: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
		  JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			const url = `${host}/blend`
			if(!job.params || !job.params.imgBase64Array || !job.params.model || job.params.imgBase64Array?.length<2){
				return null
			}
			const postJson = {
				"imgBase64Array": job.params.imgBase64Array,
				"dimensions": "SQUARE",
				"model": job.params.model,
				"timeout": "1200",
			}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const { data } = await gptInstance.post(url, postJson, {
				headers
			}).catch((err)=>{
				return err.response.data
			});
			return data.data
		},
  	},
	MJTT_inpaint: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
		  JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			const url = `${host}/inpaint`
			if(!job.params || !job.params.prompt || !job.params.mask || !job.params.jobId) return {}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const postJson = {
				"jobId": job.params.jobId,
				"mask": job.params.mask,
				"prompt": job.params.prompt,
				"hookUrl": "",
				"timeout": 1200,
			}
			const { data } = await gptInstance.post(url, postJson, {
				headers
			}).catch((err)=>{
				throw err.response?.data
			})
			return data.data
		},
	},
	MJTT_describe: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
		  JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			const url = `${host}/describe`
			if(!job.params || (!job.params.base64 && !job.params.url) || !job.params.model) return {}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const postJson = {
				"base64": job.params.base64||"",
				"url": job.params.url||"",
				"hookUrl": "",
				"timeout": 1200,
			}
			const { data } = await gptInstance.post(url, postJson, {
				headers
			}).catch((err)=>{
				throw err.response?.data
			})
			return data.data
		},
	},
	MJTT_fetch: async (id) => {
		const url = `${host}/fetch`
		const gptInstance = axios.create({
			timeout: 100000,
		});
		const { data } = await gptInstance.post(url, {
			jobId: id,
		}, {
			headers
		});
		if(data.status==='FAILED'){
			return data
		}
		return formatData(data)
	}
}