import { type App } from "vue"
import { permission } from "./permission"
import { affix } from "./affix"

/** 挂载自定义指令 */
export function loadDirectives(app: App) {
  app.directive("permission", permission)
  app.directive("affix", affix)
}
