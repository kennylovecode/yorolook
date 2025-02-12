export interface TypeRank {
  id: number
  type_id: number
  title: string
  weight: number
  growth_value: number
  remark: string
  icon: string
  discount: number
  display_order: number
  created_at: string
  updated_at: string
}

export interface RequestQuery {
  type_id?: number
}
