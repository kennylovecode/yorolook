import type { IListResponse, IResponse } from "../types"
import { request } from "@/utils/service"
import { Brand, ListRequest } from "./types"
import { BaseStruct, Directory } from "../directory/types"

export function getList(data: ListRequest) {
  return request<IListResponse<Brand>>({
    url: "brand/list",
    method: "post",
    data
  })
}

export function getById(id: string) {
  return request<IResponse<Brand>>({
    url: `brand/${id}`,
    method: "get"
  })
}
export const create = (data: Brand) => {
  return request<IResponse<Brand>>({
    url: "brand/create",
    method: "PUT",
    data
  })
}
export const update = (data: Brand) => {
  return request<IResponse<Brand>>({
    url: "brand/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<Brand>>({
    url: "brand/delete",
    method: "delete",
    data: {
      id
    }
  })
}

export const createDir = (id: string, createForm: BaseStruct & Directory) => {
  return request<IResponse<BaseStruct & Directory>>({
    url: `brand/create-dir/${id}`,
    method: "PUT",
    data: {
      ...createForm
    }
  })
}

export const getDirs = (id: string, query: any) => {
  return request<IListResponse<BaseStruct & Directory>>({
    url: `brand/get-dir/${id}`,
    method: "POST",
    data: {
      ...query
    }
  })
}

export function getCatalogs(id: string) {
  return request<any>({
    url: `brand_catalog/list`,
    method: "post",
    data: {
      brand_uuid: id
    }
  })
}

export function search(keywords: string) {
  return request<any>({
    url: `brand/search`,
    method: "post",
    data: {
      keywords
    }
  })
}

export function importData() {
  return request<any>({
    url: `brand/import`,
    method: "get"
  })
}

export function importDir(data: { idx: number; size: number; id?: number; prefixUrl?: string }) {
  return request<any>({
    url: `brand/import-dir`,
    method: "post",
    data
  })
}
