import { request } from "@/utils/service"
import { IListResponse, IResponse } from "../types"

export const getById = (key: string) => {
  return request<IResponse<any>>({
    url: `/article_sku/${key}`,
    method: "get"
  })
}

export const create = (data: any) => {
  return request<IResponse<any>>({
    url: `/article_sku/create`,
    method: "put",
    data
  })
}

export const update = (data: any) => {
  return request<IResponse<any>>({
    url: `/article_sku/update`,
    method: "put",
    data
  })
}

export const list = (channel: string, article_uuid: string) => {
  return request<IListResponse<any>>({
    url: `/article_sku/list`,
    method: "POST",
    data: {
      channel,
      article_uuid
    }
  })
}
