const cost = {
    "fast":{
        "imagine": 8000,
        "action": 5000,
        "seed": 2000,
        "describe": 2000,
        "blend": 5000,
        "upscale2": 20000,
        "upscale4": 40000,
        "inpaint": 5000
    },
    "turbo":{
        "imagine": 10000,
        "action":7000,
        "seed": 3000,
        "describe": 3000,
        "blend": 5000,
        "upscale2": 20000,
        "upscale4": 40000,
        "inpaint": 7000
    }
}
const actions = [
    "upsample1",
    "upsample2",
    "upsample3",
    "upsample4",
    "variation1",
    "variation2",
    "variation3",
    "variation4",
    "high_variation",
    "low_variation",
    "upscale2",
    "upscale4",
    "zoom_out_2",
    "zoom_out_1_5",
    "pan_left",
    "upscale_creative",
    "upscale_subtle",
    "reroll",
    "redo_upscale2",
    "redo_upscale4",
    "make_square",
    "redo_upscale_subtle"
]
export const config = {
    name: "midjourney",
    methods: ["imagine","blend","describe","inpaint"],
    //types: ["MJTT","MJ302"],
    types: ["MJ302"],
    cost_type: "amount",
    models: ["fast", "turbo"],
    dimensions: ["PORTRAIT","SQUARE","LANDSCAPE"],
    cost,
    actions,
    getCost: (model: string, method: string, action?: string)=> {
        let costFee = 0
        if(action){
            costFee = cost[model][action] || cost [model][method] || -1
            return costFee
        }
        return cost[model][method] || -1
    }
}