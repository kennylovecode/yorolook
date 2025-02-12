import { IListRequest, IListResponse, IResponse } from "../types"
import type { BaseStruct, Directory, IListQuery, IUpdateFile } from "./types"
import { request } from "@/utils/service"

export const getRoot = () => {
  return request<IResponse<Directory[]>>({
    url: `/dir/root`,
    method: "get"
  })
}
export const getByKey = (key: string) => {
  return request<IResponse<Directory>>({
    url: `/dir/?key=${key}`,
    method: "get"
  })
}

export const getById = (id: string) => {
  return request<IResponse<Directory>>({
    url: `/dir/${id}`,
    method: "get"
  })
}

export const create = (data: Directory) => {
  delete data.id
  return request<IResponse<Directory>>({
    url: "/dir/make",
    method: "post",
    data
  })
}

export const update = (data: Directory) => {
  return request<IResponse<Directory>>({
    url: "/dir/set",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<Directory>>({
    url: "/dir/rem",
    method: "DELETE",
    data: {
      id
    }
  })
}

export const getFiles = (id: string, data: IListRequest) => {
  return request<IListResponse<BaseStruct & File>>({
    url: `/dir/files/${id}`,
    method: "POST",
    data
  })
}

export const updateFile = (file: IUpdateFile) => {
  return request<IResponse<BaseStruct & File>>({
    url: `/file/update`,
    method: "PUT",
    data: {
      ...file
    }
  })
}

export const deleteFileById = (id: string) => {
  return request<IResponse<BaseStruct & File>>({
    url: `/file/remove`,
    method: "DELETE",
    data: {
      id
    }
  })
}

export const getList = (data: IListQuery) => {
  return request<IResponse<any>>({
    url: `/dir/list`,
    method: "POST",
    data
  })
}

export const getSearch = (data: any) => {
  return request<IResponse<any>>({
    url: `/dir/search`,
    method: "POST",
    data
  })
}

export const getTags = (ids: string) => {
  return request<IResponse<any>>({
    url: `/file/tags`,
    method: "POST",
    data: {
      ids
    }
  })
}
