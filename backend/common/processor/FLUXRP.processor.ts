import axios from "axios";
import { Plugins } from "node-resque";
import { config } from "../config/FLUX.config";

const host ="https://api.replicate.com/v1/models/black-forest-labs/{model}/predictions"
const headers = {
    "Authorization": "Bearer r8_d9Xxtos2LEYvMv5H1bQaQAO7hQhJZwF1j9ON0",
    "Content-Type": "application/json"
}

/** 格式化输出 */
const formatData = (data)=>{
	const { id, status, input,output, error, logs, urls, metrics} = data
	let lastPercentLine = logs.split('\n').filter(line => line.includes('%'))[logs.split('\n').filter(line => line.includes('%')).length - 1];
	let percentage = parseInt(lastPercentLine.split('%')[0]);
	return {
		id,
		status,
		input,
		images: output,
		error,
		logs,
		urls,
		metrics,
		progress: percentage
	}
}

export default {
    FLUXRP_generate: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
		  JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			if(!job.params || !job.params.prompt || !job.params.model) return {}
			const gptInstance = axios.create({
				timeout: 100000,
			});
            const model = config.models.find(x => x.name===job.params.model)
            if(!model) throw new Error(`model ${job.params.model} not found`)

			let num_inference_steps = 28
			if(job.params.model==='flux-schnell') job.params.num_inference_steps=4

			const input = {
				"prompt": job.params.prompt,
				"image_size": {
                    ...job.params.image_size
                },
				"guidance": job.params.guidance || 3.5,
                "num_inference_steps": job.params.num_inference_steps || num_inference_steps
			}
            const url = host.replace("{model}",job.params.model)
			const { data } = await gptInstance.post(url, { input }, {
				headers
			}).catch((err)=>{
				throw err.response?.data
			})
			return data
		},
	},
	FLUXRP_fetch: async (url) => {
		const { data } = await axios.get(url,{
			headers
		})
		return formatData(data)
	}
}