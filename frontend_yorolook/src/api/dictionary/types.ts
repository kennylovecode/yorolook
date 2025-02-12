import { IResponse, IListRequest, IListResponse } from "../types"

export interface KV {
  key: string
  text: string
}

export interface Dictionary extends KV {
  key: string
  text: string
  options: KV[]
}
