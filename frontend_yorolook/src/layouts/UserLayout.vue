<script lang="ts" setup>
import { useRoute } from "vue-router";
import { AppMain,NavigationBar, Logo } from "./components"
import { useAppStore } from "@/store/modules/app";
import { storeToRefs } from "pinia";
import { usePreferenceStore } from "@/store/modules/preference";

const route = useRoute()
const { preference } = storeToRefs(usePreferenceStore())
const { headerOpened } = storeToRefs(useAppStore())

</script>

<template>
  <div class="app-wrapper">
    <div v-if="route.query?.pick !== '1'" class="fixed-header layout-header" :class="{ closed: !headerOpened }">
      <div class="content">
        <Logo v-if="preference.showLogo" :collapse="false" class="logo" />
        <NavigationBar v-if="(route.query.pick as string) != '1'" class="navigation-bar" />
      </div>
      <TagsView v-show="preference.showTagsView" />
    </div>
    <div class="main-container">
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
  width: 100%;

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

</style>
