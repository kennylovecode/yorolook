import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { setRouteChange } from "@/hooks/useRouteListener"
import { useTitle } from "@/hooks/useTitle"
import { fixBlankPage } from "@/utils/fix-blank-page"
import NProgress from "nprogress"
import { getAll as getAllChannel } from "@/api/channel"
import { useAppStoreHook } from "@/store/modules/app"
import { generateChannelRoutes, generateManageRoutes } from "@/router"

const { setTitle } = useTitle()
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from: any, next) => {
  fixBlankPage()
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()
  const appStore = useAppStoreHook()
  if (appStore.channels.length <= 0) {
    const { data } = await getAllChannel()
    console.log("channel initial...")
    appStore.setChannels(data)
    // 渲染频道路由
    generateChannelRoutes(appStore.channels)
  }

  // 禁止通行的条件
  const NO_PASS = !userStore.isLogin() && to.meta?.auth
  // 已登录访问登录、注册等页面的条件
  const LOGIN_REDIRECT = userStore.isLogin() && ["/login"].includes(to.path)
  // 拥有角色，或对象路由无需角色限制。
  const HAS_ROLES = userStore.roles.length > 0

  // 验证用户是否已获得权限角色
  if (!HAS_ROLES) {
    // 当用户没有角色的时候，赋予一个默认访客角色
    userStore.pushRole("guest")
  }
  if (userStore.isLogin()) {
    if (!userStore.accountInfo.id) await userStore.getInfo()
    if (userStore.accountInfo?.manage) generateManageRoutes()
  }
  if (permissionStore.routes.length <= 0) {
    permissionStore.setRoutes(userStore.roles)
    permissionStore.dynamicRoutes.forEach((route) => router.addRoute(route))
    // 路由修改后需要覆盖
    next({ ...to, replace: true })
    return
  }
  if (LOGIN_REDIRECT) {
    NProgress.done()
    next({ path: "/" })
    return
  }
  if (NO_PASS) {
    NProgress.done()
    next(`/login/${encodeURIComponent(to.fullPath)}`)
    return
  }
  next()
  return
})

router.afterEach((to) => {
  setRouteChange(to)
  setTitle(to.meta.title)
  NProgress.done()
})
