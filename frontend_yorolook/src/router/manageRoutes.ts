/** Can rewrite as you need */
const Layouts = () => import("@/layouts/ManageMode.vue")

export const manageRoutes = [
  {
    path: "/manage",
    component: Layouts,
    redirect: "/manage/dashboard",
    meta: {
      roles: ["manage"]
    },
    children: [
      {
        path: "/manage/dashboard",
        component: () => import("@/views/_manage/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          name: "dashboard",
          title: "数据面板",
          icon: "dashboard",
          affix: false,
          hidden: false
        }
      },
      {
        path: "/manage/channel",
        component: () => import("@/views/_manage/channel/list.vue"),
        name: "manageChannelList",
        meta: {
          name: "channel",
          auth: true,
          title: "频道管理",
          affix: false
        }
      },
      {
        path: "/manage/channel/edit/:id?",
        component: () => import("@/views/_manage/channel/edit.vue"),
        name: "manageChannelEdit",
        meta: {
          name: "channel",
          auth: true,
          title: "新增频道",
          affix: false,
          hidden: true
        }
      },
      {
        path: "/manage/dictionary",
        component: () => import("@/views/_manage/dictionary/list.vue"),
        name: "dictionaryList",
        meta: {
          name: "dictionary",
          title: "字典管理",
          affix: false,
          hidden: false
        }
      },
      {
        path: "/manage/dictionary/edit/:id?",
        component: () => import("@/views/_manage/dictionary/edit.vue"),
        name: "dictionaryEdit",
        meta: {
          name: "dictionary",
          title: "新增字典",
          affix: false,
          hidden: true
        }
      },
      {
        path: "/manage/attribute/edit/:id?",
        component: () => import("@/views/_manage/attribute/edit.vue"),
        name: "attributeEdit",
        meta: {
          name: "attribute",
          title: "新增属性",
          affix: false,
          hidden: true
        }
      },
      {
        path: "/manage/attribute",
        component: () => import("@/views/_manage/attribute/list.vue"),
        name: "attributeList",
        meta: {
          name: "attribute",
          title: "属性管理",
          keepAlive: true,
          affix: false
        }
      },
      {
        path: "/manage/tag",
        component: () => import("@/views/_manage/tag/list.vue"),
        name: "tagList",
        meta: {
          name: "tag",
          title: "标签管理",
          keepAlive: true,
          affix: false
        }
      },
      {
        path: "/manage/tag/edit/:id?",
        component: () => import("@/views/_manage/tag/edit.vue"),
        name: "tagEdit",
        meta: {
          name: "tag",
          title: "新增标签",
          affix: false,
          hidden: true
        }
      },
      {
        path: "/manage/catalog/:parent_uuid?",
        component: () => import("@/views/_manage/catalog/list.vue"),
        name: "catalogList",
        meta: {
          name: "catalog",
          title: "分类管理",
          keepAlive: true,
          affix: false
        }
      },
      {
        path: "/manage/catalog/edit/:id?",
        component: () => import("@/views/_manage/catalog/edit.vue"),
        name: "catalogEdit",
        meta: {
          name: "catalog",
          title: "新增属性",
          affix: false,
          hidden: true
        }
      },
      {
        path: "/manage/type",
        component: () => import("@/views/_manage/type/list.vue"),
        name: "typeList",
        meta: {
          name: "type",
          title: "身份管理",
          keepAlive: true,
          affix: false
        }
      },
      {
        path: "/manage/type/edit/:id?",
        component: () => import("@/views/_manage/type/edit.vue"),
        name: "typeEdit",
        meta: {
          name: "type",
          title: "身份编辑",
          affix: false,
          hidden: true
        }
      },
      {
        path: "/manage/type_rank/:type_id?",
        component: () => import("@/views/_manage/type_rank/list.vue"),
        name: "typeRankList",
        meta: {
          name: "type_rank",
          title: "等级管理",
          keepAlive: true,
          affix: false
        }
      },
      {
        path: "/manage/type_rank/edit/:id?",
        component: () => import("@/views/_manage/type_rank/edit.vue"),
        name: "typeRankEdit",
        meta: {
          name: "type_rank",
          title: "等级编辑",
          affix: false,
          hidden: true
        }
      },
      {
        path: "/manage/user/:type_id?",
        component: () => import("@/views/_manage/user/list.vue"),
        name: "userList",
        meta: {
          name: "user_list",
          title: "用户管理",
          keepAlive: true,
          affix: false
        }
      },
      {
        path: "/manage/user/edit/:id?",
        component: () => import("@/views/_manage/user/edit.vue"),
        name: "userEdit",
        meta: {
          name: "user_edit",
          title: "用户编辑",
          affix: false,
          hidden: true
        }
      },
      {
        path: "/manage/user_request",
        component: () => import("@/views/_manage/user/request.vue"),
        name: "userRequestList",
        meta: {
          name: "user_request_list",
          title: "申请审批",
          keepAlive: true,
          affix: false
        }
      }
    ]
  }
]
