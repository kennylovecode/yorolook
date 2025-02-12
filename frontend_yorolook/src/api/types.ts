export interface IListRequest {
  /** 当前页 */
  idx: number
  /** 每页数量 */
  size: number
  keywords?: string
  sort?: string
}

export interface IResponse<T> {
  code: number
  message: string
  data: T
}

export interface IListResponse<T> {
  code: number
  message: number
  data: T[]
  total: number
}
