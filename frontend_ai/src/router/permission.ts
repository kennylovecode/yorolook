import router from "@/router"
import { useAuthStore } from "@/stores/authStore"
import { getToken, removeToken } from "../cache/cookies";
import { TokenInfo } from "../api/types/login";
import { getAccountInfoApi } from "../api/user";

router.beforeEach(async (to, _from: any, next) => {
  const authStore = useAuthStore()
  const token = getToken() as TokenInfo;
  if(token.accessToken)
  {
    const { data } = await getAccountInfoApi()
    if(data){
      authStore.setUser(data);
    }else{
      /** 获取不到账户信息，清除TOKEN */
      removeToken();
    }
  }
  if(to.meta?.requiresAuth && !authStore.isLoggedIn()){
    next({
      path:`/auth/signin?redirect=${encodeURIComponent(to.fullPath)}`
    })
    return
  }
  if(authStore.isLoggedIn()) authStore.startWs();
  next()
  return
})

router.afterEach((to) => {
})
