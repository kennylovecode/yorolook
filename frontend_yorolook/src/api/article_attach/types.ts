import { File } from "../directory/types"

export interface IAttach {
  id?: number
  article_uuid: string
  title: string
  cover?: string
  file_val: string
  display_order: number
  updated_at: string
  created_at: string
}

export interface IAttachResult extends IAttach {
  file?: File | null
}
