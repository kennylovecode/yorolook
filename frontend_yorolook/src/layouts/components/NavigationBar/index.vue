<script lang="ts" setup>
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { useUserStore } from "@/store/modules/user"
import { UserFilled } from "@element-plus/icons-vue"
import Hamburger from "../Hamburger/index.vue"
import Breadcrumb from "../Breadcrumb/index.vue"
import Sidebar from "../Sidebar/index.vue"
import Notify from "@/components/Notify/index.vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"
import SearchMenu from "@/components/SearchMenu/index.vue"
import { DeviceEnum } from "@/constants/app-key"
import userPanel from "@/views/user/components/common/menu-pane.vue"
import { usePreferenceStore } from "@/store/modules/preference"
import { useRouter } from "vue-router"
import cartIcon from "@/components/custom/shop/cart-icon.vue"
import { Settings, RightPanel } from "@/layouts/components"

const appStore = useAppStore()

const router = useRouter()
const { isLogin } = useUserStore()
const { preference } = usePreferenceStore()
const { sidebar, device } = storeToRefs(appStore)

const isTop = computed(() => preference.layoutMode === "top")
const isMobile = computed(() => device.value === DeviceEnum.Mobile)
const isLeftTop = computed(() => preference.layoutMode === "left-top")
/** 切换侧边栏 */
const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}
</script>

<template>
  <div class="navigation-bar">
    <Hamburger v-if="!isTop || isMobile" :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
    <Breadcrumb v-if="!isTop || isMobile" class="breadcrumb" />
    <Sidebar v-if="(isTop || isLeftTop) && !isMobile" class="sidebar" />
    <div class="right-menu" v-if="isLogin()">
      <div class="icon-list">
        <RightPanel v-if="preference.showSettings">
          <Settings />
        </RightPanel>
        <SearchMenu v-if="preference.showSearchMenu" class="icon-menu" />
        <cart-icon></cart-icon>
        <ThemeSwitch v-if="preference.showThemeSwitch" class="icon-menu" />
        <Notify v-if="preference.showNotify" class="icon-menu" />
      </div>
      <el-dropdown class="dropdown-menu" placement="bottom-end">
        <div class="avatar">
          <el-avatar :icon="UserFilled" :size="24" />
        </div>
        <template #dropdown>
          <user-panel />
        </template>
      </el-dropdown>
    </div>
    <div v-else class="right-menu">
      <el-button type="info" plain @click="router.push('/login')">
        <template #default>
          <span>登录</span>
          <span style="margin: 0 5px">/</span>
          <span>注册</span>
        </template>
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: var(--v3-header-bg-color);
  display: flex;
  justify-content: space-between;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    flex: 1;
    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .sidebar {
    flex: 1;
    // 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应
    min-width: 0px;
    :deep(.el-menu) {
      background-color: transparent;
    }
    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-menu-active-color) !important;
        }
      }
    }
  }
  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .icon-list {
      display: flex;
      font-size: 20px;
      gap:8px;
      margin-right: 16px;
      align-items: center;
      .icon-menu{
        display: flex;
        align-items: center;
      }
      :deep(.el-icon){
        font-size: 20px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
