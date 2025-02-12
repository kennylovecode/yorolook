import { type Directive } from "vue"
import { useUserStoreHook } from "@/store/modules/user"

/** 权限指令，和权限判断函数 checkPermission 功能类似 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value: permissionRoles } = binding
    const { accountInfo, roles } = useUserStoreHook()
    /** 将拥有者权限自动加入, 外部限制组件时同时添加 owner_id 即可 */
    const customRoles = roles.concat([`owner_${accountInfo.id}`])
    if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
      const hasPermission = customRoles.some((role) => permissionRoles.includes(role))
      // hasPermission || (el.style.display = "none") // 隐藏
      hasPermission || el.parentNode?.removeChild(el) // 销毁
    } else {
      // throw new Error(`need roles! Like v-permission="['admin','editor']"`)
      /** 使用了 v-permission 但没有配置的情况，需要检测登录 */
      console.log(useUserStoreHook().isLogin())
      !useUserStoreHook().isLogin() && el.parentNode?.removeChild(el)
    }
  }
}

