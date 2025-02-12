import axios from "axios";
import { Plugins } from "node-resque";
import { config } from "../config/WORKFLOW.config";
import { mode } from "crypto-js";

const host ="https://www.liblib.art"
const headers = {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Cookie":"webid=1729825519767zusxtmhi; AGL_USER_ID=a2b2bd52-e6b1-42dc-a053-1bdbe7390379; Hm_lvt_2f4541bcbee365f31b21f65f00e8ae8b=1729825520; HMACCOUNT=39FB1C52EEB35105; _ga=GA1.1.521155893.1729825520; _bl_uid=d6mds23CozF5wpg8gaR2b704Ok7d; usertoken=cf5a0ca267784ca797e3d8e76355cb95; acw_tc=0a099d2e17298422300706281ea2b65a47d8fb8c7517b9d9342f79fbb5f6c3; _ga_24MVZ5C982=GS1.1.1729836458.3.1.1729842306.38.0.0; Hm_lpvt_2f4541bcbee365f31b21f65f00e8ae8b=1729842307",
    "token": "4a73854f2d10471d88037c886f436f6d",
    "webid": "1729825519767zusxtmhi"
}

export default {
    WORKFLOW_generate: {
		plugins: [Plugins.JobLock],
		pluginOptions: {
		  JobLock: { reEnqueue: true },
		},
		perform: async (job) => {
            const url = `${host}/gateway/sd-api/generate/image?timestamp=${new Date().getTime()}`
            const model = config.models?.find(x => x.name===job.params.model)
            const json = model.build_params(job.params.image1,job.params.image2)
            const { data } = await axios.post(url, json, {
				headers
			})
            if(data.code===0)
                return { id: data.data }
		},
	},
	WORKFLOW_fetch: async (id: string) => {
        const url = `${host}/gateway/sd-api/generate/progress/msg/v1/${id}?timestamp=${new Date().getTime()}`;
        const { data } = await axios.post(url, {
            flag: 0
        }, {
            headers
        })
        return data.data;
	}
}