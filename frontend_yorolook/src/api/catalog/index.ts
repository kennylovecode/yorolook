import type { Catalog, RequestQuery } from "./types"
import { request } from "@/utils/service"
import { IResponse, IListRequest, IListResponse } from "../types"

export const getById = (key: number) => {
  return request<IResponse<Catalog>>({
    url: `/catalog/${key}`,
    method: "get"
  })
}

export const getList = (data: IListRequest & RequestQuery) => {
  return request<IListResponse<Catalog>>({
    url: "/catalog/list",
    method: "post",
    data
  })
}

export const create = (data: Catalog) => {
  return request<IResponse<Catalog>>({
    url: "/catalog/create",
    method: "post",
    data
  })
}

export const update = (data: Catalog) => {
  return request<IResponse<Catalog>>({
    url: "/catalog/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<Catalog>>({
    url: "/catalog/delete",
    method: "delete",
    data: {
      id
    }
  })
}

export const getNodes = (parent_id: number | null, deep: number) => {
  return request<IListResponse<Catalog>>({
    url: "/catalog/nodes",
    method: "post",
    data: {
      parent_id,
      deep
    }
  })
}

export const getAll = () => {
  return request<IListResponse<Catalog>>({
    url: "/catalog/all",
    method: "get"
  })
}

export const getByIds = (idList: string[]) => {
  return request<IListResponse<Catalog>>({
    url: "/catalog/getByIds",
    method: "post",
    data: {
      ids: idList
    }
  })
}

export const getByPath = (pathTitle: string) => {
  return request<IListResponse<Catalog>>({
    url: "/catalog/get_by_path",
    method: "post",
    data: {
      path_title: pathTitle
    }
  })
}
