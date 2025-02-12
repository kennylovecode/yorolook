import { request } from "@/utils/service"
import { IResponse } from "../types"
import { IAttach } from "./types"

export const getById = (key: string) => {
  return request<IResponse<any>>({
    url: `/article_attach/${key}`,
    method: "get"
  })
}

export const create = (data: IAttach) => {
  return request<IResponse<any>>({
    url: `/article_attach/create`,
    method: "put",
    data
  })
}

export const update = (data: IAttach) => {
  return request<IResponse<any>>({
    url: `/article_attach/update`,
    method: "put",
    data
  })
}

export const list = (article_uuid: string) => {
  return request<IResponse<any>>({
    url: `/article_attach/list`,
    method: "POST",
    data: {
      article_uuid
    }
  })
}

export const deleteById = (id: number) => {
  return request<IResponse<any>>({
    url: `/article_attach/delete`,
    method: "delete",
    data: {
      id: `${id}`
    }
  })
}

export const preDownApi = (file_val: string) => {
  return request<IResponse<any>>({
    url: `/article_attach/pre_down/${file_val}`,
    method: "get"
  })
}
