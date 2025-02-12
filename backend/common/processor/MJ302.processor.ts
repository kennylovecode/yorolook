import axios from "axios";
import { Plugins } from "node-resque";

const host = 'https://api.302.ai/mj'
const headers = {
	Accept: "application/json",
	ContentType: "application/json",
	"mj-api-secret": "sk-s4kgXIWp9KGBBS5uy1giyWGiTNTdsJoM5Mz22hiqilaeDVKP",
}

/** 格式化输出 */
const formatData = (data) => {
	return {
		...data,
		iamges: [data.imageUrl]
	}
}

export default {
	MJ302_imagine: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
			JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			const url = `${host}/submit/imagine`
			if (!job.params || !job.params.prompt || !job.params.model) return {}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const postJson = {
				"prompt": job.params.prompt,
				"notifyHook": "",
				"state": ""
			}
			const { data } = await gptInstance.post(url, postJson, {
				headers
			}).catch((err) => {
				throw err.response?.data
			})
			return data
		},
	},
	MJ302_action: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
			JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			const url = `${host}/submit/action`
			if (!job.params || !job.params.taskId || !job.params.action) return {}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const { data } = await gptInstance.post(url, {
				taskId: job.params.taskId,
				customId: job.params.action,
			}, {
				headers
			});
			return data
		},
	},
	MJ302_blend: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
			JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			const url = `${host}/submit/blend`
			if (!job.params || !job.params.imgBase64Array || !job.params.model || job.params.imgBase64Array?.length < 2) {
				return {}
			}
			const postJson = {
				"base64Array": job.params.imgBase64Array,
				"dimensions": "SQUARE",
				"notifyHook": "",
				"state": "",
			}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const { data } = await gptInstance.post(url, postJson, {
				headers
			}).catch((err) => {
				return err.response.data
			});
			return data
		},
	},
	MJ302_inpaint: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
			JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			const url = `${host}/submit/modal`
			if (!job.params || !job.params.prompt || !job.params.mask || !job.params.jobId) return {}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const postJson = {
				"maskBase64": job.params.mask,
				"prompt": job.params.prompt,
				"taskId": job.params.jobId,
			}
			console.log(postJson)
			const { data } = await gptInstance.post(url, postJson, {
				headers
			}).catch((err) => {
				throw err.response?.data
			})
			return data
		},
	},
	MJ302_describe: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
			JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			return
		},
	},
	MJ302_fetch: async (id) => {
		const url = `${host}/task/${id}/fetch`
		const gptInstance = axios.create({
			timeout: 100000,
		});
		const { data } = await gptInstance.get(url, {
			headers
		});
		return {
			data
		}
	}
}

