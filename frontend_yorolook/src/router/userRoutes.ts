/** Can rewrite as you need */
const Layouts = () => import("@/layouts/UserLayout.vue")

export const userRoutes = [
  {
    path: "/user",
    component: Layouts,
    redirect: "/user/:id/:page?",
    children: [
      {
        path: "/user/:id/:page?",
        component: () => import("@/views/user/index.vue"),
        name: "UserCenter",
        meta: {
          title: "个人主页",
          hidden: true
        }
      },
      {
        path: "/user/settings",
        component: () => import("@/views/user/settings.vue"),
        name: "UserSettings",
        meta: {
          auth: true,
          title: "账户设置",
          hidden: true
        }
      },
      {
        path: "/shopping/cart",
        component: () => import("@/views/shopping/cart.vue"),
        name: "ShoppingCart",
        meta: {
          auth: true,
          title: "购物车",
          hidden: true
        }
      }
    ]
  }
]
