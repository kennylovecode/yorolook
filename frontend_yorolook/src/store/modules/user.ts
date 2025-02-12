import { reactive, ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useTagsViewStore } from "./tags-view"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { resetRouter } from "@/router"
import { loginApi } from "@/api/login"
import { getAccountInfoApi } from "@/api/user"
import { type LoginRequestData } from "@/api/login/types/login"
import { AccountPreference, AccountPrivacy, AccountProfile } from "@/api/user/types"
import { usePreferenceStore } from "./preference"
import { switchType as switchTypeApi } from "@/api/user";
import { CartItem } from "@/api/shop/type"

export const useUserStore = defineStore("user", () => {
  const accountInfo = ref<any>({})
  const cacheToken = getToken()
  const tokenInfo = ref(cacheToken || "")
  const roles = reactive<string[]>([])
  const tagsViewStore = useTagsViewStore()
  const { setPreference } = usePreferenceStore()
  const currentType = ref<any>()
  const currentRank = ref<any>()

  const isLogin = () => {
    return tokenInfo.value?.accessToken != null
  }

  /** 登录 */
  const login = async (queryData: LoginRequestData) => {
    const { code, data } = await loginApi(queryData)
    if (code > 0 && data) {
      tokenInfo.value = data
      setToken(tokenInfo.value)
      getInfo()
      return true
    }
    return false
  }

  /** 设置角色数组 */
  const pushRole = (value: string) => {
    roles.push(value)
  }

  /** 获取用户详情 */
  const getInfo = async () => {
    const { code, data } = await getAccountInfoApi()
    accountInfo.value = data
    if (code) {
      if ((!data.profile || !data.profile?.idcard) && location.href.indexOf("/setup") === -1) {
        location.href = "/setup"
      }
      if (data.preference) {
        setPreference(data.preference)
      }
      currentType.value = accountInfo.value.types.find((x:any) => x.id===accountInfo.value.type_id)
      currentRank.value = accountInfo.value.ranks.find((x:any) => x.type_id===accountInfo.value.type_id)

      if(currentType && currentRank){
        pushRole(`${currentType.value.name}_${currentRank.value.weight}`)
      }
      if (!roles.includes("manage") && accountInfo.value.manage) {
        pushRole("manage")
      }
    }
  }

  const setProfile = async (data: AccountProfile) => {
    accountInfo.value.profile = data
  }

  const setPrivacy = async (data: AccountPrivacy) => {
    accountInfo.value.privacy = data
  }

  /** 切换角色 */
  // const changeRoles = async (role: string) => {
  //   const newToken = "token-" + role
  //   await getInfo()
  //   permissionStore.setRoutes(roles.value)
  //   resetRouter()
  //   permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
  //     router.addRoute(item)
  //   })
  //   _resetTagsView()
  // }

  /** 登出 */
  const logout = () => {
    removeToken()
    roles.splice(0, roles.length - 1)
    resetRouter()
    _resetTagsView()
  }

  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    // if (!settingsStore.cacheTagsView) {
    //   tagsViewStore.delAllVisitedViews()
    //   tagsViewStore.delAllCachedViews()
    // }
  }

  const switchType = (name: string)=>{
    const type = accountInfo.value.types.find((x:any) => x.name===name)
    if(!type) ElMessage.error("您并无该身份...")
    switchTypeApi(type.id).then((result) => {
      if(result.data){
        accountInfo.value.type_id = type.id
        currentType.value = type
        currentRank.value = accountInfo.value.ranks.find((x:any) => x.type_id===accountInfo.value.type_id)
      }
    })
  }

  return {
    roles,
    accountInfo,
    currentRank,
    currentType,
    tokenInfo,
    switchType,
    isLogin,
    pushRole,
    login,
    getInfo,
    logout,
    setProfile,
    setPrivacy,
    setPreference
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
