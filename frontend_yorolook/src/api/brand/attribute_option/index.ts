import { IListRequest, IListResponse, IResponse } from "../../types"
import type { AttributeOption } from "../../attribute/types"
import { request } from "@/utils/service"

export const getById = (key: string) => {
  return request<IResponse<AttributeOption>>({
    url: `/attribute_option/${key}`,
    method: "get"
  })
}

export const getList = (data: IListRequest) => {
  return request<IListResponse<AttributeOption>>({
    url: "/attribute_option/list",
    method: "post",
    data
  })
}

export const create = (data: AttributeOption) => {
  return request<IResponse<AttributeOption>>({
    url: "/attribute_option/create",
    method: "post",
    data
  })
}

export const update = (data: AttributeOption) => {
  return request<IResponse<AttributeOption>>({
    url: "/attribute_option/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<AttributeOption>>({
    url: "/attribute_option/delete",
    method: "delete",
    data: {
      id
    }
  })
}

export const addBatch = (options: object[])=>{
  return request<IResponse<any>>({
    url: "/attribute_option/add-batch",
    method: "POST",
    data: {
      options
    }
  })
}
