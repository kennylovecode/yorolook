import { IListRequest, IListResponse, IResponse } from "../types"
import type { Channel } from "./types"
import { request } from "@/utils/service"

export const getById = (id: string) => {
  return request<IResponse<Channel>>({
    url: `/channel/${id}`,
    method: "get"
  })
}

export const create = (data: Channel) => {
  return request<IResponse<Channel>>({
    url: "/channel/create",
    method: "post",
    data
  })
}

export const update = (data: Channel) => {
  return request<IListResponse<Channel>>({
    url: "/channel/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<Channel>>({
    url: "/channel/delete",
    method: "delete",
    data: {
      id
    }
  })
}

export const getAll = () => {
  return request<IListResponse<Channel>>({
    url: "/channel/all",
    method: "get"
  })
}
export const getList = (data: IListRequest) => {
  return request<IListResponse<Channel>>({
    url: "/channel/list",
    method: "post",
    data
  })
}
export const getNodes = (parent_uuid: string = "", deep: number = 0)=>{
  return request<IListResponse<Channel>>({
    url: "/channel/all",
    method: "get",
    data: {
      parent_uuid,
      deep
    }
  })
}

export const saveCatalogs = (data: any[])=>{
  return request<IResponse<Channel>>({
    url: "/channel_catalog/batch_save",
    method: "put",
    data
  })
}


export const getByName = (name: string,title: string)=>{
  return request<IResponse<Channel>>({
    url: `/channel/?name=${name}&title=${title}`,
    method: "get",
  })
}
