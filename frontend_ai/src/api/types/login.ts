export interface Login {
  /** 账户名 */
  username: string
  /** 密码 */
  password: string
  /** 短信验证码 */
  code?: string
  remember?: boolean
  agree?: boolean
}

export interface TokenInfo {
  accessToken: string
  refreshToken?: string
}
