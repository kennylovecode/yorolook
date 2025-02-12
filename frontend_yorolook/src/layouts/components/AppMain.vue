<script lang="ts" setup>
import Footer from "./Footer/index.vue"
import { CompConsumer } from "@/layouts/components/CompConsumer/index.ts"
import { usePreferenceStore } from "@/store/modules/preference"
import { useRoute } from "vue-router"
import { useTagsViewStore } from "@/store/modules/tags-view"

const { preference } = usePreferenceStore()
const tagsViewStore = useTagsViewStore()
const route = useRoute()
</script>

<template>
  <section class="app-main">
    <div class="app-scrollbar" ref="scrollbarRef">
      <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
      <router-view v-slot="{ Component }">
        <template v-if="route.meta.keepAlive">
          <keep-alive>
            <component :is="Component" class="app-container-grow" :key="route.name" />
          </keep-alive>
        </template>
        <template v-else>
          <component :is="Component" class="app-container-grow" :key="route.fullPath" />
        </template>
      </router-view>
      <Footer v-if="preference.showFooter" />
    </div>
    <!-- 返回顶部 -->
    <el-backtop />
    <!-- 返回顶部（固定 Header 情况下） -->
    <el-backtop target=".app-scrollbar" />
  </section>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.app-main {
  width: 100%;
}

.app-scrollbar {
  @extend %scrollbar;

  // flex-grow: 1;
  // overflow: auto;
  // display: flex;
  // flex-direction: column;
  // .app-container-grow {
  //   flex-grow: 1;
  // }
}
</style>
