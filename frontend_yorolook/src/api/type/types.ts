export interface Type {
  id: number
  name: string
  title: string
  description: string
  display_order: number
  created_at?: string
  updated_at?: string
  children?: TypeRank[]
}

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
