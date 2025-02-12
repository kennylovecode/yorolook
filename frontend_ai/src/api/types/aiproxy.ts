export interface IAIConfig<T> {
    name: string
    methods: string[]
    types: string[]
    cost_type: string,
    models: T[],
    cost: any,
    actions: string[],
    getCost: Function
}
export interface IModel{
    name: string
    title: string
    cost: number
    cost_type: string
    types: string[]
}

export interface IMessage {
    content: string
    role: "user" | "assistant" | "system"
}
export interface IPostChat {
    model: string
    messages: IMessage[]
}
export interface IHistoryChat{
    content?: string
    created_at?: string
    from_account_uuid?: string
    from_name?: string
    id?: string
    messages?: IMessage[]
    model?: string
    status?: number
    to_account_uuid?: string
    updated_at?: string
}

export interface IMJSubmitParams {
    model?: string
    prompt?: string
    hookUrl?: string
    jobId?: string
    action?: string
    base64?: string
    imgBase64Array?: string[]
    dimensions?: string
    mask?: string
    url?: string
}
export interface ISubmitBody {
    title: string
    type: string
    method: string
    params: any
}
export interface IFetchParam {
    type: string
    taskId: string
    jobId: string
}