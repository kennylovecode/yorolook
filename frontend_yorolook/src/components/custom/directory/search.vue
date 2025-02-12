<style lang="scss" scoped>
.search-container {
  max-width: var(--max-width);
  margin: 0 auto;

  .header {
    .title {
      font-size: large;
      margin: 1rem 0;
      display: flex;
      align-items: center;
      .el-icon {
        margin-right: 1rem;
      }
    }

    .search-type {
      margin: 0.5rem 0;
      > a {
        margin-right: 1rem;
      }
    }
  }
}
</style>
<template>
  <div class="app-container search-container">
    <div class="header">
      <div class="title">
        <RouterLink to="/media">
          <el-icon>
            <ArrowLeft />
          </el-icon>
        </RouterLink>
        媒体搜索中心
      </div>
      <div class="search">
        <el-input @keydown="handleKeydown($event)" v-model="$o.keywords" placeholder="请输入搜索的内容" clearable>
          <template #append>
            <el-button :icon="Search" @click="performSearch" />
          </template>
        </el-input>
      </div>
      <div class="search-type">
        <RouterLink
          v-for="(item, index) in typeList"
          :key="index"
          :to="{ path: '/media-search', query: { t: item.value, k: $o.keywords } }"
          :class="{ active: item.value == $o.type }"
          >{{ item.label }}</RouterLink
        >
      </div>
    </div>
    <yl-masonry-list :key="route.fullPath" ref="listRef" :load="load" :cols="6" :gap="8" :step="20">
      <template #item="{ item, index }">
        <!-- Direcroty Card -->
        <item-card @on-enter-dir="onEnterDir(item)" :item="item" :index="index" />
      </template>
    </yl-masonry-list>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive } from "vue"
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import ylMasonryList from "@/components/custom/masonry-list.vue"
import { getSearch } from "@/api/directory/index"
import { useUserStore } from "@/store/modules/user"
import { ArrowRight, Search } from "@element-plus/icons-vue"
import { getJSDocReturnType } from "typescript"

const { accountInfo, roles } = useUserStore()
const app = getCurrentInstance()
const $redrawVueMasonry = app?.appContext.config.globalProperties.$redrawVueMasonry

const route = useRoute()
const router = useRouter()
const typeList = [
  {
    label: "全部",
    value: ""
  },
  {
    label: "文件夹",
    value: "dir"
  },
  {
    label: "文档",
    value: "document"
  },
  {
    label: "图片",
    value: "image"
  },
  {
    label: "视频",
    value: "video"
  },
  {
    label: "音频",
    value: "audio"
  },
  {
    label: "其他",
    value: "other"
  }
]
const $o = reactive({
  type: "",
  keywords: ""
})

const load = async () => {
  const { data } = await getSearch($o)
  return [...data.dirs, ...data.files]
}
const onEnterDir = async (item: any) => {
  if (item?.status === 255) getJSDocReturnType
  /** client permission check */
  const isOwner = item?.owner_uuid === accountInfo.id
  const isManage = roles.indexOf("manage") >= 0
  if (!isOwner && !isManage && item?.point_payment_limit && item?.point_payment_limit > 0) {
    ElMessageBox.alert(`查看该目录需要支付${item?.point_payment_limit}阳光值，请问是否继续?`, "提示", {})
    return
  }
  const newQuery: any = {}
  newQuery.paths = item?.layer_tree ? `${item?.layer_tree}${item?.id}` : item?.id
  await router.push({ path: "/media", query: newQuery })
}
const performSearch = async () => {
  router.push({ path: "/media-search", query: { t: $o.type, k: $o.keywords } })
}
const handleKeydown = (event: KeyboardEvent | Event) => {
  const keyEvent = event as KeyboardEvent
  if (keyEvent.key === "Enter") {
    performSearch()
  }
}
const init = () => {
  $o.keywords = route.query.k as string
  $o.type = (route.query.t as string) || ""
}

// onUpdated(init)
onMounted(init)
</script>
