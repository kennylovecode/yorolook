/** 统一处理 Cookie */

import CacheKey from "@/constants/cache-key"
import Cookies from "js-cookie"

export const getToken = () => {
  const cache = Cookies.get(CacheKey.TOKEN)?.toString()
  return cache ? JSON.parse(cache) : {}
}
export const setToken = (state: object) => {
  Cookies.set(CacheKey.TOKEN, JSON.stringify(state))
}
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN)
}
