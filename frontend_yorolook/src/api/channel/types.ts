export interface Channel {
  id: number
  name: string
  title: string
  banners: string[]
  pagesize: number
  linesize: number
  limit: boolean
  limit_level: number
  type_rank_limits: string[]
  is_attach: boolean
  is_comment: boolean
  is_mark: boolean
  is_share: boolean
  is_theme: boolean
  is_shop: boolean
  catalogs: any[]
  attributes: any[]
  display_order: number
}
