import { IListRequest } from "../types"

export interface IArticle {
  id: string
  catalogs: string
  channel: string
  brand_uuid: string
  title: string
  sub_title: string
  sketch: string
  keywords: string
  quick_code: string
  cover: string
  images: string
  videos: string
  full_content: string
  lowest_price: number
  highest_price: number
  like: number
  collect_count: number
  owner_recommend: number
  sys_recommend: number
  display_order: number
  publish_date: Date
  status: number
  attributes?: any[]
  skus?: {
    list: any[]
    total: number
  }
  brand?: any
  attachs?: any[]
}

export interface IArticleListQuery extends IListRequest {
  kv_name?: string
  channel: string
  catalog: string
  attributes?: {
    attribute_uuid: string
    value_list: string
  }[]
  lowest_price: number
  highest_price: number
  brands?: string[]
}

export interface ICreateArticle {
  channel: string
}

export interface IUpdateArticle {
  id: string
  channel: string
  brand_uuid: string
  catalogs: string
  title: string
  sub_title: string
  sketch: string
  keywords: string
  quick_code: string
  cover: string
  images: string
  videos: string
  full_content: string
  lowest_price: number
  highest_price: number
  like: number
  collect_count: number
  owner_uuid: string
  owner_recommend: number
  sys_recommend: number
  display_order: number
  status: number
}

export interface IPostAttributeValue {
  article_uuid: string
  attribute_uuid?: string
  value_list?: string
}

export interface IBatchAttributeValue {
  article_uuid: string
  attribute_value_list: string
}
