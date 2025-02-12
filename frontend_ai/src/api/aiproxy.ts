import { request } from "./service";
import { IAIConfig, IFetchParam, ISubmitBody, IPostChat } from "./types/aiproxy"
import { IResponse } from "./types/base";

export default {
  "WF_submit": (data: ISubmitBody) => {
    return request<any>({
      url: "/aigc/wf/submit",
      method: "post",
      data
    });
  },
  "MJ_submit": (data: ISubmitBody) => {
    return request<any>({
      url: "/aigc/mj/submit",
      method: "post",
      data
    });
  },
  "FLUX_submit": (data: ISubmitBody) => {
    return request<any>({
      url: "/aigc/flux/submit",
      method: "post",
      data
    });
  },
  chat: (data: IPostChat)=>{
    return request<any>({
      url: "/aigc/chat",
      method: "post",
      data
    });
  },
  rechat: (id: string)=>{
    return request<any>({
      url: "/aigc/rechat",
      method: "post",
      data:{
        id
      }
    });
  },
  fetch: (data: IFetchParam) => {
    return request<any>({
      url: "/aigc/fetch",
      method: "post",
      data
    });
  },
  WF_fetch: (data: IFetchParam) => {
    return request<any>({
      url: "/aigc/wf/fetch",
      method: "post",
      data
    });
  },
  config: (type: string)=>{
    return request<IResponse<IAIConfig<any>>>({
      url: "/aigc/config",
      method: "post",
      data: {
        type
      }
    });
  },
}