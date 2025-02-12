import { IListRequest, IListResponse, IResponse } from "../types"
import type { AttributeControl } from "../attribute/types"
import { request } from "@/utils/service"
import {
  IArticle,
  IArticleListQuery,
  IBatchAttributeValue,
  ICreateArticle,
  IPostAttributeValue,
  IUpdateArticle
} from "./types"

export const getById = (key: string) => {
  return request<IResponse<AttributeControl>>({
    url: `/article/${key}`,
    method: "get"
  })
}

export const getList = (data: IArticleListQuery) => {
  return request<IListResponse<AttributeControl>>({
    url: "/article/list",
    method: "post",
    data
  })
}
export const create = (data: ICreateArticle) => {
  return request<IResponse<IArticle>>({
    url: "/article/create",
    method: "post",
    data
  })
}
export const update = (data: IUpdateArticle) => {
  return request<IResponse<IArticle>>({
    url: "/article/update",
    method: "put",
    data
  })
}
export const deleteById = (data: { id: string}) => {
  return request<IResponse<IArticle>>({
    url: "/article/delete",
    method: "DELETE",
    data
  })
}

export const doAttributeValue = (data: IPostAttributeValue, action: "create" | "remove" | "list") => {
  return request<IResponse<any>>({
    url: `/article_attribute_value/${action}`,
    method: "post",
    data
  })
}

export const doAttributeValueBatch = (data: IBatchAttributeValue) => {
  return request<IResponse<any>>({
    url: `/article_attribute_value/create_batch`,
    method: "post",
    data
  })
}
