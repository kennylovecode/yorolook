export default [
  {
    path: "/pages/form",
    component: () => import("@/views/pages/Form.vue"),
  },
  {
    path: "/wireFrames/threeColumn",
    component: () => import("@/views/wireFrames/ThreeColumn.vue"),
  },
  {
    path: "/wireFrames/pageAnchorJump",
    component: () => import("@/views/wireFrames/PageAnchorJump.vue"),
  },
];
