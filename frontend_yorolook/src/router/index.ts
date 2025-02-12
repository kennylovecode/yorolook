import { type RouteRecordRaw, createRouter } from "vue-router"
import { history } from "./helper"
import { userRoutes } from "./userRoutes"
import { manageRoutes } from "./manageRoutes"
import { markRaw, defineAsyncComponent } from "vue"

const Layouts = () => import("@/layouts/index.vue")

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layouts,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: {
          title: "首页",
          affix: true,
          elIcon: "HomeFilled",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => {
      return import("@/views/error-page/404.vue")
    },
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login/:url?",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/setup/:step?",
    component: () => import("@/views/setup.vue"),
    name: "setup",
    meta: {
      title: "用户资料",
      hidden: true
    }
  },
  {
    path: "/aigc",
    component: () => import("@/views/aigc/index.vue"),
    name: "aigc",
    meta: {
      title: "智能工具",
      hidden: true
    }
  },
  {
    path: "/join",
    component: Layouts,
    redirect: "/join",
    children: [
      {
        path: "/join",
        component: () => import("@/views/join-union.vue"),
        name: "join",
        meta: {
          title: "加入我们",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/file-viewer",
    component: Layouts,
    redirect: "/file-viewer/:id",
    children: [
      {
        path: "/file-viewer/:id",
        component: () => import("@/views/file-viewer.vue"),
        name: "fileViewer",
        meta: {
          title: "文件预览",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/media",
    component: Layouts,
    redirect: "/media/system",
    children: [
      {
        path: "/media/:type?",
        component: () => import("@/views/media/index.vue"),
        name: "media",
        meta: {
          title: "素材管理",
          affix: false,
          elIcon: "MediaFilled"
        }
      }
    ]
  },
  {
    path: "/media-search",
    component: () => import("@/views/media/search.vue"),
    name: "mediaSearch",
    meta: {
      title: "素材搜索",
      hidden: true,
      affix: false,
      elIcon: "MediaFilled"
    }
  },
  {
    path: "/archive",
    component: () => import("@/views/archive/index.vue"),
    name: "archive"
  },
  ...userRoutes
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export let asyncRoutes: RouteRecordRaw[] = []
const channelComponents = import.meta.glob("/src/views/*/*.vue")
export const generateChannelRoutes = (channelData: any[]) => {
  const channelRoutes: RouteRecordRaw[] = []

  if (channelRoutes.length <= 0) {
    for (const channel of channelData) {
      const componentPath = `/src/views/${channel.name}/list.vue`
      const componentEditPath = `/src/views/${channel.name}/edit.vue`
      const componentDetailPath = `/src/views/${channel.name}/detail.vue`

      const tmpRoute: RouteRecordRaw = {
        path: "/" + channel.name,
        component: () => import("/src/layouts/index.vue"),
        redirect: `/${channel.name}/list`,
        children: [
          {
            path: `/${channel.name}/list`,
            component: channelComponents[componentPath]
              ? channelComponents[componentPath]
              : () => import("/src/views/article/list.vue"),
            name: `${channel.name}List`,
            meta: {
              auth: channel.limit_level > 1,
              title: `${channel.title}`,
              name: channel.name,
              keepAlive: true,
              hidden: false
            }
          },
          {
            path: `/${channel.name}/detail/:id?`,
            component: channelComponents[componentDetailPath]
              ? channelComponents[componentDetailPath]
              : () => import("/src/views/article/detail.vue"),
            name: `${channel.name}Detail`,
            meta: {
              auth: channel.limit_level > 1,
              title: `${channel.title}详情`,
              name: channel.name,
              hidden: true
            }
          },
          {
            path: `/${channel.name}/edit/:id?`,
            component: channelComponents[componentEditPath]
              ? channelComponents[componentEditPath]
              : () => import("/src/views/article/edit.vue"),
            name: `${channel.name}Edit`,
            meta: {
              roles: ["manage"],
              auth: channel.limit_level > 1,
              title: `${channel.title}编辑`,
              name: channel.name,
              hidden: true
            }
          }
        ]
      }
      channelRoutes.push(tmpRoute)
    }
  }

  asyncRoutes = asyncRoutes.concat(channelRoutes)
}
export const generateManageRoutes = () => {
  asyncRoutes = asyncRoutes.concat(manageRoutes)
}

const router = createRouter({
  history,
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }

  window.location.reload()
}

export default router
