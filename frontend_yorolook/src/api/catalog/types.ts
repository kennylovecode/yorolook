export interface Catalog {
  id: number
  name: string
  title: string
  cover: string
  parent_id: number | null
  sketch: string
  keywords: string
  path_id: string
  path_title: string
  deep: number
  attributes: string[]
  display_order: number
}

export interface RequestQuery {
  path_id: string
  sort: string | ""
}
