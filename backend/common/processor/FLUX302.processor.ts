import axios from "axios";
import { Plugins } from "node-resque";
import { config } from "../config/FLUX.config";

const host = "https://api.302.ai/302/submit/{model}"
const headers = {
	"Authorization": "Bearer sk-s4kgXIWp9KGBBS5uy1giyWGiTNTdsJoM5Mz22hiqilaeDVKP",
	"Content-Type": "application/json"
}

/** 格式化输出 */
const formatData = (data)=>{
	const { seed,images , prompt, has_nsfw_concepts, timings} = data
	const formatImages = images.map(x=> x.url)
	return {
		seed,
		images: formatImages,
		prompt,
		nsfw: has_nsfw_concepts,
		time: timings?.inference
	}
}

export default {
	FLUX302_generate: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
			JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
			if (!job.params || !job.params.prompt || !job.params.model) return {}
			const gptInstance = axios.create({
				timeout: 100000,
			});
			const model = config.models.find(x => x.name === job.params.model)
			if (!model) throw new Error(`model ${job.params.model} not found`)

			const postJson = {
				"prompt": job.params.prompt,
				"image_size": {
					width: 1024,
					height: 1024
				},
				...model.default_params
			}
			const url = host.replace("{model}", job.params.model)
			const { data } = await gptInstance.post(url, postJson, {
				headers
			}).catch((err) => {
				throw err.response?.data
			})
			return formatData(data)
		},
	},
	FLUX302_fetch: async (id) => {
		/// 302 的FLUX不用FETCH  ,生成直接需要等待返回结果，所以直接从结果中去format
	}
}