import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { useUserStoreHook } from "@/store/modules/user"
import { ElMessage } from "element-plus"
import { get, merge } from "lodash-es"
import { getToken, setToken } from "./cache/cookies"
import { exchange as exchangeApi } from "@/api/login"
import { useRoute } from "vue-router"

/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout() {
  useUserStoreHook().logout()
  //location.reload()
  location.href = `/login?redirect=${location.href}`
}

async function exchange() {
  const { data } = await exchangeApi()
  setToken(data)
  location.reload()
}
/** 创建请求实例 */
function createService() {
  const tokenInfo = getToken()
  // 创建一个 axios 实例命名为 service
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 api 返回的数据
      const apiData = response.data
      // 二进制数据则直接返回
      const responseType = response.request?.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData
      // 这个 code 是和后端约定的业务 code
      const code = apiData.code
      // 如果没有 code, 代表这不是项目后端开发的 api
      if (code === undefined) {
        ElMessage.error("非本系统的接口")
        return Promise.reject(new Error("非本系统的接口"))
      }

      switch (code) {
        case 1:
          return apiData
        case 0:
          ElMessage.error(apiData.message || "Error")
          return Promise.reject(apiData)
        default:
          ElMessage.error(apiData.message || "Error")
          return Promise.reject(new Error("Error"))
      }
    },
    (error) => {
      // status 是 HTTP 状态码
      const status = get(error, "response.status")
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          // Token 过期时
          return tokenInfo.refreshToken ? exchange() : logout()
        case 402:
          // EXCHANGE 失败
          return logout()
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createRequest(service: AxiosInstance, exchange: boolean = false, base: boolean = true) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const tokenInfo = getToken()
    const useToken = exchange ? tokenInfo.refreshToken : tokenInfo.accessToken
    const defaultConfig = {
      headers: {
        // 携带 Token
        Authorization: useToken ? `Bearer ${useToken}` : undefined,
        "Content-Type": "application/json"
      },
      timeout: 600 * 1000,
      baseURL: base ? import.meta.env.VITE_BASE_API : "",
      data: {}
    }
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

/** 用于网络请求的实例 */
const service = createService()
/** 用于网络请求的方法 */
export const request = createRequest(service)
export const requestExchange = createRequest(service, true)
export const requestNoBase = createRequest(service, false, false)
