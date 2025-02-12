import { toNumber } from "lodash-es"

export interface BaseStruct {
  id?: string
  title: string
  display_order?: number
  owner_uuid?: string
  status?: number
}

export interface File extends BaseStruct {
  original_filename?: string
  original_filepath?: string
  original_mime_type?: string
  original_size?: number
  original_md5?: string
  point_payment_limit?: number
  directory_uuid?: string
}

export interface Directory extends BaseStruct {
  keywords?: string
  parent_uuid?: string
  layer_tree?: string
  deep?: number
  channel_relation?: string
  dir_count?: number
  file_count?: number
  covers?: string
  login_limit?: number
  type_id_limit?: string[]
  point_payment_limit?: number
  owner_recommend?: number
}

export interface DirDetail {
  files: File[]
  file_total: number
  dirs: Directory[]
  dir_total: number
  stacks?: any[]
}

export interface DirectoryInfo {
  target: Directory | File
}

export interface IUpdateFile {
  id: string
  title: string
  keywords?: string
  point_payment_limit: number
  display_order: number
  status: Number
}

export interface IListQuery {
  /** 当前页 */
  idx: number
  /** 每页数量 */
  size: number
  sort?: string
  channel?: string
  id?: string
  status?: number
}
