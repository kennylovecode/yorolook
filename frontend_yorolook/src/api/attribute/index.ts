import { IListRequest, IListResponse, IResponse } from "../types"
import type { Attribute } from "./types"
import { request } from "@/utils/service"

export const getCommonList = () => {
  return request<IResponse<any>>({
    url: "/attribute/commons",
    method: "get"
  })
}

export const getById = (key: string) => {
  return request<IResponse<Attribute>>({
    url: `/attribute/${key}`,
    method: "get"
  })
}

export const getAll = () => {
  return request<IListResponse<Attribute>>({
    url: "/attribute/all",
    method: "get"
  })
}

export const getList = (data: IListRequest) => {
  return request<IListResponse<Attribute>>({
    url: "/attribute/list",
    method: "post",
    data
  })
}

export const create = (data: Attribute) => {
  return request<IResponse<Attribute>>({
    url: "/attribute/create",
    method: "post",
    data
  })
}

export const update = (data: Attribute) => {
  return request<IResponse<Attribute>>({
    url: "/attribute/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<Attribute>>({
    url: "/attribute/delete",
    method: "delete",
    data: {
      id
    }
  })
}


export const getByIds = (ids: string[]) =>{
  return request<IResponse<any>>({
    url: "/attribute/get_by_ids",
    method: "POST",
    data:{
      ids
    }
  })
}
