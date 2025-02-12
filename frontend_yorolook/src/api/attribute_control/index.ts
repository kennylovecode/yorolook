import { IListRequest, IListResponse, IResponse } from "../types"
import type { AttributeControl } from "../attribute/types"
import { request } from "@/utils/service"

export const getById = (key: string) => {
  return request<IResponse<AttributeControl>>({
    url: `/attribute_control/${key}`,
    method: "get"
  })
}

export const getList = (data: IListRequest) => {
  return request<IListResponse<AttributeControl>>({
    url: "/attribute_control/list",
    method: "post",
    data
  })
}

export const create = (data: AttributeControl) => {
  return request<IResponse<AttributeControl>>({
    url: "/attribute_control/create",
    method: "post",
    data
  })
}
export const createOrUpdate = (data: AttributeControl) => {
  return request<IResponse<AttributeControl>>({
    url: "/attribute_control/create_or_update",
    method: "post",
    data
  })
}
export const update = (data: AttributeControl) => {
  return request<IResponse<AttributeControl>>({
    url: "/attribute_control/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<AttributeControl>>({
    url: "/attribute_control/delete",
    method: "delete",
    data: {
      id
    }
  })
}
