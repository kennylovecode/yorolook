import type { IListRequest, IListResponse, IResponse } from "../types"
import { request } from "@/utils/service"

export function getList(data: IListRequest) {
  return request<IListResponse<any>>({
    url: "supplier/list",
    method: "post",
    data
  })
}

export function getById(id: string) {
  return request<IResponse<any>>({
    url: `supplier/${id}`,
    method: "get"
  })
}

export const create = (data: any) => {
  return request<IResponse<any>>({
    url: "supplier/create",
    method: "post",
    data
  })
}
export const update = (data: any) => {
  return request<IResponse<any>>({
    url: "supplier/update",
    method: "put",
    data
  })
}
export const deleteById = (id: string) => {
  return request<IResponse<any>>({
    url: "supplier/delete",
    method: "delete",
    data: {
      id
    }
  })
}
