<style lang="scss" scoped>
.settings {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

  min-height: calc(100vh - 60px);
  .title {
    margin-bottom: 3rem;
    font-weight: bold;
  }
  :deep(.el-tabs) {
    position: fixed;
    border-radius: 16px;
    padding: 30px;
    .el-tabs__active-bar {
      left: 0;
      box-shadow: var(--el-box-shadow);
    }
    .el-tabs__item {
      margin: 20px 0;
      height: 20px;
    }

    .el-tabs__header.is-left {
      box-shadow: var(--el-box-shadow);
      border-radius: 16px;
      border: none;
      overflow: hidden;
      padding: 30px;
      .el-tabs__nav-wrap {
        &::after {
          display: none;
        }
      }
    }
    .el-tabs__content {
      box-shadow: var(--el-box-shadow);
      border-radius: 16px;
      padding: 32px;
      width: 0;
      display: none;
    }
  }
  .async-component-pane {
    padding: 30px;
    box-shadow: var(--el-box-shadow);
    width: calc(100% - 220px);
    border-radius: 16px;
    margin: 30px auto 0 200px;
  }
}
</style>

<template>
  <div class="settings">
    <el-tabs v-model="activeTab" tab-position="left" @tab-change="tabChange">
      <el-tab-pane v-for="item in panes" :key="item.key" :label="item.label" :name="item.key">
        <div class="title" v-if="item.showLabel">
          {{ item.label }}
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="async-component-pane">
      <AsyncComp />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TabPaneName } from "element-plus"
import { defineAsyncComponent, onUpdated, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useTagsViewStore } from "@/store/modules/tags-view"

const route = useRoute()
const router = useRouter()
const activeTab = ref("profile-editor")
const tagsViewStore = useTagsViewStore()

let AsyncComp = defineAsyncComponent(() => import(`./components/common/${activeTab.value}.vue`))

const panes = [
  {
    key: "profile-editor",
    label: "账户资料",
    showLabel: true
  },
  {
    key: "supplier-editor",
    label: "商家资料",
    showLabel: false
  },
  {
    key: "company-editor",
    label: "公司资料",
    showLabel: false
  },
  {
    key: "account",
    label: "设置账户",
    showLabel: true
  },
  {
    key: "password",
    label: "修改密码",
    showLabel: true
  },
  {
    key: "privacy",
    label: "隐私设置",
    showLabel: true
  },
  {
    key: "preference",
    label: "偏好设置",
    showLabel: false
  }
]

const tabChange = (key: TabPaneName) => {
  AsyncComp = defineAsyncComponent(() => import(`./components/common/${key}.vue`))
  router.push(`/user/settings?page=${key}`)
  const pane = panes.find((item) => item.key === activeTab.value)
  tagsViewStore.editTagTitle(route, `${pane?.label}`)
}

onUpdated(() => {
  AsyncComp = defineAsyncComponent(() => import(`./components/common/${activeTab.value}.vue`))
  const pane = panes.find((item) => item.key === activeTab.value)
  tagsViewStore.editTagTitle(route, `${pane?.label}`)
})

onMounted(() => {
  activeTab.value = (route.query.page as string) || "profile-editor"
  AsyncComp = defineAsyncComponent(() => import(`./components/common/${activeTab.value}.vue`))
  const pane = panes.find((item) => item.key === activeTab.value)
  tagsViewStore.editTagTitle(route, `${pane?.label}`)
})
</script>
