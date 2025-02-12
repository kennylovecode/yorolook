const models = [
    {
        name: "Doubao-pro-32k",
        title: "豆包",
        cost: 10,
        cost_type: "point",
        types: ["text"]
    },
    {
        name: "gemini-1.5-flash-001",
        title: "谷歌Gemini",
        cost: 10,
        cost_type: "point",
        types: ["text","image_url"]
    },
    {
        name: "gpt-3.5-turbo-0125",
        title: "最新版GPT3.5",
        cost: 70,
        cost_type: "point",
        types: ["chat"]
    },
    {
        name: "chatgpt-4o-latest",
        title: "最新版GPT4o",
        cost: 0.1,
        cost_type: "amount",
        types: ["chat","image_url"]
    },
    {
        name: "gpt-4-turbo",
        title: "最强版GPT4",
        cost: 0.15,
        cost_type: "amount",
        types: ["chat","image_url"]
    },
    {
        name: "gpt-4-plus",
        title: "最强GPT4-PLUS",
        cost: 4,
        cost_type: "amount",
        types: ["chat","image_url"]
    },
]

export const config = {
    models
}