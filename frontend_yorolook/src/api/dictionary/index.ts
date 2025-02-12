import { IListRequest, IListResponse, IResponse } from "../types"
import type { Dictionary } from "./types"
import { request } from "@/utils/service"

export const getByKey = (key: string) => {
  return request<IResponse<Dictionary>>({
    url: `/dictionary/?key=${key}`,
    method: "get"
  })
}

export const getById = (id: string) => {
  return request<IResponse<Dictionary>>({
    url: `/dictionary/${id}`,
    method: "get"
  })
}

export const getList = (data: IListRequest) => {
  return request<IListResponse<Dictionary>>({
    url: "/dictionary/list",
    method: "post",
    data
  })
}

export const create = (data: Dictionary) => {
  return request<IResponse<Dictionary>>({
    url: "/dictionary/create",
    method: "post",
    data
  })
}

export const update = (data: Dictionary) => {
  return request<IResponse<Dictionary>>({
    url: "/dictionary/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<Dictionary>>({
    url: "/dictionary/delete",
    method: "delete",
    data: {
      id
    }
  })
}
