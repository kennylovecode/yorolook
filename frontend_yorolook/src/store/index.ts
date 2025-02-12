import { createPinia, PiniaPluginContext } from 'pinia';

// 自定义插件：将状态保存到 localStorage
const persistPlugin = (context: PiniaPluginContext) => {
  const { store } = context;
  console.log(store)
  const key = `yl-${store.$id}`;

  // 初始化时从 localStorage 恢复状态
  const savedState = localStorage.getItem(key);
  if (savedState) {
    store.$patch(JSON.parse(savedState));
  }

  // 订阅状态变化，并存储到 localStorage
  store.$subscribe((_: any, state: any) => {
    localStorage.setItem(key, JSON.stringify(state));
  });
};
const store = createPinia()
// store.use(persistPlugin)

export default store
