import { request, requestExchange } from "@/utils/service"
import type * as Login from "./types/login"

export function exchange() {
  return requestExchange<Login.LoginResponseData>({
    url: "account/exchange",
    method: "post"
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "account/login",
    method: "post",
    data
  })
}
