/** 统一处理 Cookie */

import CacheKey from "./cache-key"
import Cookies from "js-cookie"

export const getToken = () => {
  try{
    const cache = Cookies.get(CacheKey.TOKEN)?.toString()
    return cache ? JSON.parse(cache) : {}
  }catch{
    return {}
  }
}
export const setToken = (state: object) => {
  Cookies.set(CacheKey.TOKEN, JSON.stringify(state))
}
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN)
}
