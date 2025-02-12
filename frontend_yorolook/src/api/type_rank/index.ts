import { request } from "@/utils/service"
import type { TypeRank as Model, RequestQuery } from "./types"
import { IListResponse, IListRequest, IResponse } from "../types"

export const getList = (data: IListRequest & RequestQuery) => {
  return request<IListResponse<Model>>({
    url: "/type_rank/list",
    method: "post",
    data
  })
}

export const getTypeRanks = (data: RequestQuery) => {
  return request<IListResponse<Model>>({
    url: "/type_rank/all",
    method: "post",
    data
  })
}


export function getById(id: string) {
  return request<IResponse<Model>>({
    url: `type_rank/${id}`,
    method: "get"
  })
}
export const create = (data: Model) => {
  return request<IResponse<Model>>({
    url: "type_rank/create",
    method: "post",
    data
  })
}
export const update = (data: Model) => {
  return request<IResponse<Model>>({
    url: "type_rank/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<Model>>({
    url: "type_rank/delete",
    method: "delete",
    data: {
      id
    }
  })
}
