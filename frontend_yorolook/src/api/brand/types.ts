import { Catalog } from "../catalog/types"
import { IResponse, IListRequest, IListResponse } from "../types"

export interface Contact {
  email: string
  name: string
  phone: string
  qq: string
  wechat: string
  remark: string
}

export interface Brand {
  id: string
  title: string
  sub_title: string
  type: string
  covers: string
  banners: string
  catalogs?: string
  country: string
  city: string
  initial: string
  website: string
  description: string
  display_order: number
  contacts: Contact[]
  other_message: any[]
  attributes?: any
}

export interface ListRequest extends IListRequest {
  catalog?: string
  type?: string
  country?: string
  area?: string
  initial?: string
  owner?: string
  status?: number
  attributes?: any
}
