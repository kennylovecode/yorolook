export interface Attribute {
  id: string
  name: string
  title: string
  sketch: string
  keywords: string
  common: number
  display_order: number
  control?: AttributeControl
  options?: AttributeOption[]
}

export interface AttributeControl {
  id: string
  attribute_uuid: string
  text_prompt: string
  required: number
  control_type: string
  min: number
  max: number
  exts: string
  size: number
  default_value: string
}

export interface AttributeOption {
  id?: string
  attribute_uuid: string
  name: string
  title: string
  rgba: string
  image: string
  display_order: number
}
