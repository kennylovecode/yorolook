export interface Tag {
  id?: number
  name: string
  title: string
  parent_id?: number | null
  use: number
}

export interface RequestQuery {
  parent_id?: number | null
  sort: string
}
