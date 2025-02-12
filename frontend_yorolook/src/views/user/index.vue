<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
}
.user-center {
  position: relative;
  .background {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    aspect-ratio: 4/3;
    :deep(.el-carousel) {
      img {
        width: 100%;
      }
    }
  }
  .content {
    width: 96%;
    background: var(--el-bg-color-overlay);
    max-width: var(--max-width);
    margin: 0 auto;
    margin-top: 14vw;
    padding: 30px;
    border-radius: 36px;
    opacity: 0.95;
    .infomation {
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      flex-wrap: wrap;
    }
    .works-area {
      padding: 30px 16px;
    }
  }
}
</style>

<template>
  <div class="not-found" v-if="notFoundAccount">
    <el-result
      v-if="accessAccountInfo?.privacy && !accessAccountInfo?.privacy.openPage"
      icon="error"
      title="无法访问"
      sub-title="访问的用户不对外公开主页..."
    >
      <template #extra>
        <el-button type="primary">返回平台</el-button>
      </template>
    </el-result>
    <el-result
      v-if="!accessAccountInfo?.privacy && notFoundAccount"
      icon="error"
      title="无法访问"
      sub-title="访问的网址有误..."
    >
      <template #extra>
        <el-button type="primary">返回平台</el-button>
      </template>
    </el-result>
  </div>
  <div v-else class="user-center">
    <div class="background">
      <el-carousel indicator-position="none" height="800px" motion-blur>
        <el-carousel-item v-for="item in bannersList.filter((x) => x !== '')" :key="item">
          <img :src="`/disk/view?id=${item}&w=1920`" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content">
      <div class="infomation">
        <profile-area
          v-if="accessAccountInfo"
          :info="accessAccountInfo"
          :isOwner
          :privacy="accessAccountInfo.privacy"
        />
        <matrix-diagram />
      </div>
      <div class="works-area">
        <el-tabs v-model="activeTab" tab-position="top" @tab-change="tabChange">
          <el-tab-pane v-for="item in panes" :key="item.key" :label="labelPrefix() + item.label" :name="item.key" />
        </el-tabs>
        <component :is="AsyncComp" :owner="accessAccountInfo?.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted, onUpdated, ref, reactive } from "vue"
import matrixDiagram from "./components/common/matrix-diagram.vue"
import profileArea from "./components/common/profile-area.vue"
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { useTagsViewStore } from "@/store/modules/tags-view"
import { Account } from "@/api/user/types"
import { getAccountInfoApi } from "@/api/user"
import { TabPaneName } from "element-plus"
import { useAppStore } from "@/store/modules/app"

const route = useRoute()
const router = useRouter()

/** 访问的账户信息 */
const accessAccountInfo = ref<Account>()
const isOwner = ref<boolean>(false)
const tagsViewStore = useTagsViewStore()
const bannersList = reactive<string[]>(["", "", "", "", "", ""])
const panes = ref<any[]>([
  {
    key: "publish",
    label: "素材",
    sort: 2
  },
  {
    key: "gallery",
    label: "图库",
    sort: 3
  },
  {
    key: "follow",
    label: "关注",
    sort: 4
  },
  {
    key: "fans",
    label: "粉丝",
    sort: 5
  }
])
const activeTab = ref<string>("publish")
const notFoundAccount = ref<boolean>(true)

const labelPrefix = () => {
  return isOwner.value ? "我的" : "TA的"
}

let AsyncComp = defineAsyncComponent(() => import(`./components/list/${activeTab.value}.vue`))

const tabChange = (key: TabPaneName) => {
  AsyncComp = defineAsyncComponent(() => import(`./components/list/${key}.vue`))
  router.push({
    name: "UserCenter",
    params: {
      id: route.params.id,
      page: key
    }
  })
}

const setTitle = () => {
  const label = panes.value.find((item) => item.key === activeTab.value)?.label
  tagsViewStore.editTagTitle(route, `${accessAccountInfo.value?.profile.nickname}的${label}`)
}

onUpdated(() => {
  if (route.params.page) {
    activeTab.value = (route.params.page as string) || "publish"
    AsyncComp = defineAsyncComponent(() => import(`./components/list/${activeTab.value}.vue`))
    setTitle()
  }
})

onMounted(async () => {
  activeTab.value = (route.params.page as string) || "publish"
  AsyncComp = defineAsyncComponent(() => import(`./components/list/${activeTab.value}.vue`))

  const { accountInfo } = useUserStore()

  if (accountInfo?.id === route.params.id) {
    isOwner.value = true
    accessAccountInfo.value = { ...accountInfo }
    notFoundAccount.value = false
  } else {
    const res = await getAccountInfoApi(route.params.id as string)
    accessAccountInfo.value = res.data
    isOwner.value = false
    notFoundAccount.value = !isOwner.value && Object.getOwnPropertyNames(accessAccountInfo.value).indexOf("id") < 0
  }

  if (accessAccountInfo.value?.profile.banners) {
    const bannerArray = accessAccountInfo.value?.profile.banners.split(",")
    for (const index in bannerArray) {
      if (bannersList.hasOwnProperty(index)) bannersList[Number(index)] = bannerArray[Number(index)]
    }
  }

  const appStore = useAppStore()
  const isOpen = isOwner.value || accessAccountInfo.value?.privacy.openPlatform
  appStore.toggleHeader(isOpen)

  const supplierTabs = [
    {
      key: "brand",
      label: "品牌",
      sort: 0
    }
  ]
  const companyTabs = [
    {
      key: "member",
      label: "成员",
      sort: 1
    }
  ]
})
</script>
