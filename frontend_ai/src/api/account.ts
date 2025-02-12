import { IListResponse, IResponse } from "./types/base"
import { request, requestExchange } from "./service"
import { Login, TokenInfo } from "./types/login"

export function exchange() {
  return requestExchange<IResponse<TokenInfo>>({
    url: "account/exchange",
    method: "post"
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login) {
  return request<IResponse<TokenInfo>>({
    url: "account/login",
    method: "post",
    data
  })
}


/** 登录并返回 Token */
export function wxwork_authApi(data: {
  code: string
  state: string
}) {
  return request<IResponse<TokenInfo>>({
    url: "account/wxwork_auth",
    method: "post",
    data
  })
}


export function saveSession(data: {
  title: string,
  conversation_id: string
}){
  return request<IResponse<TokenInfo>>({
    url: "coze_session/my/save",
    method: "post",
    data
  })
}

export function listSession(data: {
  idx: number
  size: number
}){
  return request<IListResponse<any>>({
    url: "coze_session/my/list",
    method: "post",
    data
  })
}