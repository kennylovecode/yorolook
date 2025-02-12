import { request } from "@/utils/service"
import { IResponse } from "./types"

export function getChannels() {
  return request({
    url: `channel/list`,
    method: "get"
  })
}

/**
 * 辅助工具服务
 */
export function utilPost(type: string, key: string, to: string, code?: string) {
  return request<IResponse<string>>({
    url: `/util/${type}`,
    method: "POST",
    params: {
      key,
      to,
      code
    }
  })
}
