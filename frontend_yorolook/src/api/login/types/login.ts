export interface LoginRequestData {
  /** 账户名 */
  username: string
  /** 密码 */
  password: string
  /** 短信验证码 */
  code: string
  remember: boolean
  agree: boolean
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>
