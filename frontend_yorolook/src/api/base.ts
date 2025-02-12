export interface Contact {
  email: string
  name: string
  phone: string
  qq: string
  wechat: string
  remark: string
}
export interface Bank{
  title:string
  bank_name: string
  bank_branch: string
  account_name: string
  account_number: string
  remark: string
}
export interface KV{
  name: string
  label: string
  value: string
}

export interface Organize {
  id: string
  title: string
  account_uuid: string
  country: string
  province: string
  city: string
  address: string
  postcode: string
  contacts: Contact[]
  banks: Bank[]
  domain: string
  logo: string
  banners: string[]
  certificate: string
  face_tax_point: number
  real_tax_point: number
  discount: number
  discount_remark: string
  other_message: KV[]
  display_order: number
}
