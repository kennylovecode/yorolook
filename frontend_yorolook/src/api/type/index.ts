import { request } from "@/utils/service"
import type { Type as Model, TypeRank } from "./types"
import { IListResponse, IListRequest, IResponse } from "../types"

export function getTypes() {
  return request<IListResponse<Model>>({
    url: "type/all",
    method: "post"
  })
}

export const getList = (data: IListRequest) => {
  return request<IListResponse<Model>>({
    url: "/type/list",
    method: "post",
    data
  })
}


export function getById(id: string) {
  return request<IResponse<Model>>({
    url: `type/${id}`,
    method: "get"
  })
}
export const create = (data: Model) => {
  return request<IResponse<Model>>({
    url: "type/create",
    method: "post",
    data
  })
}
export const update = (data: Model) => {
  return request<IResponse<Model>>({
    url: "type/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<Model>>({
    url: "type/delete",
    method: "delete",
    data: {
      id
    }
  })
}
