import { request } from "@/utils/service"
import { Tag } from "./types"
import { IListResponse, IListRequest, IResponse } from "../types"

export function gettags() {
  return request<IListResponse<Tag>>({
    url: "tag/all",
    method: "post"
  })
}

export const getList = (data: IListRequest) => {
  return request<IListResponse<Tag>>({
    url: "/tag/list",
    method: "post",
    data
  })
}

export function getById(id: number) {
  return request<IResponse<Tag>>({
    url: `tag/${id}`,
    method: "get"
  })
}
export const create = (data: Tag) => {
  return request<IResponse<Tag>>({
    url: "tag/create",
    method: "post",
    data
  })
}
export const update = (data: Tag) => {
  return request<IResponse<Tag>>({
    url: "tag/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<Tag>>({
    url: "tag/delete",
    method: "delete",
    data: {
      id
    }
  })
}
