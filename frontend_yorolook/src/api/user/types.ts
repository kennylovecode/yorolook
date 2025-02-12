export interface Account {
  id: string
  manage: number
  username: string
  mobile: string
  email: string
  wechat: string
  rename: number
  reg_time: string
  ip: string
  amount: number
  point: number
  consum: number
  is_distribution: number
  distribution_remark: string
  status: number
  preference: AccountPreference
  privacy: AccountPrivacy
  other: object
  created_at: string
  updated_at: string
  type: AccountType
  profile: AccountProfile
  following_count: number | 0
  follower_count: number | 0
  access_count: number | 0
}

export interface AccountType {
  id: string
  name: string
  title: string
  description: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface AccountProfile {
  id?: string
  account_uuid?: string
  banners?: string
  avatar: string
  nickname: string
  realname: string
  idcard: string
  gender: string
  age: number
  birthday: string
  website?: string
  occupation?: string
  wechat?: string
  description?: string
  created_at?: string
  updated_at?: string
}

export interface AccountPrivacy {
  openPage: boolean
  openFollow: boolean
  openPlatform: boolean
  openProfile: boolean
  showMobile: boolean
  showEmail: boolean
  showAddress: boolean
  showBirthday: boolean
  showCountry: boolean
  showDescription: boolean
  showWebsite: boolean
  showFavorite: boolean
  showFollowing: boolean
  showFollower: boolean
  showGallery: boolean
  showBrand: boolean
  showPublish: boolean
}

export interface AccountPreference {
  /** 是否显示 Settings Panel */
  showSettings: boolean
  /** 布局模式 */
  layoutMode: "top" | "left" | "left-top"
  /** 是否显示标签栏 */
  showTagsView: boolean
  /** 是否显示 Logo */
  showLogo: boolean
  /** 是否固定 Header */
  fixedHeader: boolean
  /** 是否显示页脚 Footer */
  showFooter: boolean
  /** 是否显示消息通知 */
  showNotify: boolean
  /** 是否显示切换主题按钮 */
  showThemeSwitch: boolean
  /** 是否显示全屏按钮 */
  showScreenfull: boolean
  /** 是否显示搜索按钮 */
  showSearchMenu: boolean
  /** 是否缓存标签栏 */
  cacheTagsView: boolean
  /** 开启系统水印 */
  showWatermark: boolean
  /** 是否显示灰色模式 */
  showGreyMode: boolean
  /** 是否显示色弱模式 */
  showColorWeakness: boolean
  pageCount: number
}

export interface CreateAccount {
  manage: number
  username: string
  password: string
  mobile: string
  email: string
  wechat: string
  type_id: number
  rename: number
  ip: string
  amount: number
  point: number
  consum: number
  is_distribution: number
  distribution_remark: string
  status: number
  preference: AccountPreference
  privacy: AccountPrivacy
}

export interface AccountTypeRequest {
  id: string
  account_uuid: string
  to_type_id: number
  contact_name: string
  contact_mobile: string
  contact_wechat: string
  company_name: string
  company_address: string
  position: string
  remark: string
  status: 0 | 1 | 255
  reason: string
  images: string[]
  created_at?: Date
  updated_at?: Date
}

export interface IListTypeRequestQuery {
  idx: number
  size: number
  sort: string
  keywords: string
  to_type_id: number
  status: number
}

export interface IApproveRequest {
  id: string
  status: 0 | 1 | 255
  reason: string
}
