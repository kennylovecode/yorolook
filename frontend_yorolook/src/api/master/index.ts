import type { IListResponse, IResponse } from "../types"
import { request } from "@/utils/service"
import { IMaster, ListRequest } from "./types"
import { BaseStruct, Directory } from "../directory/types"

export function getList(data: ListRequest) {
  return request<IListResponse<IMaster>>({
    url: "master/list",
    method: "post",
    data
  })
}

export function getById(id: string) {
  return request<IResponse<IMaster>>({
    url: `master/${id}`,
    method: "get"
  })
}
export const create = (data: IMaster) => {
  return request<IResponse<IMaster>>({
    url: "master/create",
    method: "PUT",
    data
  })
}
export const update = (data: IMaster) => {
  return request<IResponse<IMaster>>({
    url: "master/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<IMaster>>({
    url: "master/delete",
    method: "delete",
    data: {
      id
    }
  })
}

export const createDir = (id: string, createForm: BaseStruct & Directory) => {
  return request<IResponse<BaseStruct & Directory>>({
    url: `master/create-dir/${id}`,
    method: "PUT",
    data: {
      ...createForm
    }
  })
}

export const getDirs = (id: string, query: any) => {
  return request<IListResponse<BaseStruct & Directory>>({
    url: `master/get-dir/${id}`,
    method: "POST",
    data: {
      ...query
    }
  })
}

export function getCatalogs(id: string) {
  return request<any>({
    url: `master_catalog/list`,
    method: "post",
    data: {
      IMaster_uuid: id
    }
  })
}

export function search(keywords: string) {
  return request<any>({
    url: `master/search`,
    method: "post",
    data: {
      keywords
    }
  })
}

export function importData() {
  return request<any>({
    url: `master/import`,
    method: "get"
  })
}

export function importDir(data: { idx: number; size: number; id?: number; prefixUrl?: string }) {
  return request<any>({
    url: `master/import-dir`,
    method: "post",
    data
  })
}
