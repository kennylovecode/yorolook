const models = [
    {
        name: "flux-schnell",
        title: "普通版",
        cost: 1000,
        cost_type: "amount",
        default_params: {
            guidance_scale: 3.5,
            num_inference_steps: 4,
        }
    },
    {
        name: "flux-dev",
        title: "开发版",
        cost: 5000,
        cost_type: "amount",
        default_params: {
            guidance_scale: 3.5,
            num_inference_steps: 28,
        }
    },
    {
        name: "flux-realism",
        title: "超真实模型",
        cost: 5000,
        cost_type: "amount",
        default_params: {
            guidance_scale: 3.5,
            num_inference_steps: 28,
        }
    },
    {
        name: "flux-pro-v1.1",
        title: "专业版",
        cost: 10000,
        cost_type: "amount",
        default_params: {
            guidance_scale: 3.5,
            num_inference_steps: 28,
        }
    },
]

const types = ["FLUXRP","FLUX302"]

export const config = {
    name: "flux",
    types,
    models,
}