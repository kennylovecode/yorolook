// users Data Page
export default [
  {
    path: "/ai/agent",
    meta: {
      requiresAuth: true,
      layout: "landing",
    },
    component: () => import("@/views/toolkit/Agent.vue"),
  },
  {
    path: "/ai/chat-bot",
    component: () => import("@/views/toolkit/ChatBot.vue"),
    meta: {
      requiresAuth: true,
      layout: "landing",
      category: "AI",
      title: "Chat Bot",
    },
  },
  {
    path: "/ai/image-generate",
    component: () => import("@/views/toolkit/ImageGenerate.vue"),
    meta: {
      requiresAuth: true,
      layout: "landing",
      category: "AI",
      title: "ImageGenerate",
    },
  },
  {
    path: "/ai/workflow",
    component: () => import("@/views/toolkit/Workflow.vue"),
    meta: {
      requiresAuth: true,
      layout: "landing",
      category: "AI",
      title: "Workflow",
    },
  },
  {
    path: "/ai/utils",
    component: () => import("@/views/toolkit/Utils.vue"),
    meta: {
      requiresAuth: true,
      layout: "landing",
      category: "AI",
      title: "AI工具",
    },
  },
  {
    path: "/ai/tempshow",
    component: () => import("@/views/toolkit/tempshow.vue"),
    meta: {
      requiresAuth: false,
      layout: "none",
      category: "AI",
      title: "一键材质更换",
    },
  },
];
