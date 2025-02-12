<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { AppMain, NavigationBar, TagsView, Logo } from "./components"
import { usePreferenceStore } from "@/store/modules/preference"
import { useAppStore } from "@/store/modules/app"
import { useRoute } from "vue-router"

const { preference } = storeToRefs(usePreferenceStore())
const { headerOpened } = storeToRefs(useAppStore())

const route = useRoute()
</script>

<template>
  <div class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div v-if="!(route.query.pick as string)" class="fixed-header layout-header" :class="{ closed: !headerOpened }">
      <div class="content">
        <Logo v-if="preference.showLogo" :collapse="false" class="logo" />
        <NavigationBar v-if="(route.query.pick as string) != '1'" class="navigation-bar" />
      </div>
      <TagsView v-show="preference.showTagsView" />
    </div>
    <!-- 主容器 -->
    <div :class="{ hasTagsView: preference.showTagsView && route.query?.pick !== '1' }" class="main-container">
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  -webkit-box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .logo {
    width: var(--v3-sidebar-width);
  }
  .content {
    display: flex;
    .navigation-bar {
      flex: 1;
      background: transparent;
    }
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .tags-view-container {
    max-width: var(--max-width);
    margin: 6px auto;
    box-shadow: unset;
    :deep(.scroll-container) {
      .arrow.left {
        box-shadow: unset;
      }
      .arrow.right {
        box-shadow: unset;
      }
    }
  }
}

.layout-header {
  background-color: var(--v3-header-bg-color);

  &.closed {
    height: 0 !important;
    overflow: hidden;
    padding: 0;
    transition: all 0.3s;
  }
}

.main-container {
  min-height: 100%;
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--v3-navigationbar-height);
  margin: 0 auto;
}

.hasTagsView {
  .app-main {
    padding-top: var(--v3-header-height);
  }
}

.fixed-header.closed + .main-container {
  .app-main {
    padding-top: 0;
  }
}
</style>
