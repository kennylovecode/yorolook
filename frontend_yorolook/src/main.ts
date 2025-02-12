// core
import { createApp } from "vue"
import mitt from "mitt"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import "@/router/permission"
// load
import { loadSvg } from "@/icons"
import { loadPlugins } from "@/plugins"
import { loadDirectives } from "@/directives"
import { VueMasonryPlugin } from "vue-masonry"
// css
import "uno.css"
import "normalize.css"
import "@/styles/index.scss"
import "nprogress/nprogress.css"
// 这里的大样式文件，按需导入
import "element-plus/dist/index.css"
// import "element-plus/theme-chalk/dark/css-vars.css"
// import "vxe-table/lib/style.css"
// import "vxe-table-plugin-element/dist/style.css"

/** 这里需要全局导入 */
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/message-box/style/css"
import "element-plus/es/components/loading/style/css"
import "element-plus/theme-chalk/display.css"

const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter

app.use(VueMasonryPlugin)
/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(store).use(router)
router.isReady().then(() => {
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag === "r-preview" // 将 r-preview 排除在组件解析之外
  }
  app.mount("#app")
})
