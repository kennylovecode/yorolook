<style lang="scss" scoped>
.app-container {
  width: 100%;
  padding: 0 1rem;
  max-width: var(--max-width);
  margin: 0 auto;
  position: relative;
  .el-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .publish-header {
    background-color: var(--el-fill-color);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    .el-col {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      > div {
        margin-right: 8px;
      }

      &:last-child {
        justify-content: flex-end;
      }
    }

    .logo {
      .el-avatar {
        background: var(--el-color-primary);
      }
    }
  }
}
</style>
<template>
  <div class="app-container">
    <el-row class="publish-header">
      <el-col :xl="16" :lg="16" :md="16" :sm="16" :xs="24">
        <div class="logo">
          <el-avatar :size="48" shape="circle" src="articleModel.brand?.logo" fit="fill" @error="() => true">
            M
          </el-avatar>
        </div>
        <div class="title">
          <span>Master Name En</span>
          <span>{{ articleModel.brand?.level }}</span>
        </div>
        <div class="keywords">
          <el-tag type="info" size="small" effect="dark" plain>城市-法国巴黎</el-tag>
          <el-tag type="info" size="small" effect="dark" plain>专业-产品设计,艺术设计</el-tag>
          <el-tag type="info" size="small" effect="dark" plain> 国际大咖 </el-tag>
        </div>
      </el-col>
      <el-col :xl="8" :lg="8" :md="8" :sm="8" :xs="24">
        <el-button type="primary" size="default" @click="openBrandHome" plain>大咖主页</el-button>
        <el-button type="primary" size="default" v-if="articleModel.brand?.website" plain>官网</el-button>
        <el-button type="primary" size="default">关注</el-button>
      </el-col>
    </el-row>
    <purchase-panel :key="'detail' + articleModel.id" :article="articleModel" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import purchasePanel from "./components/purchase-panel.vue"
import { useRoute } from "vue-router"
import { IArticle } from "@/api/article/types"
import { getById } from "@/api/article"
import { useTagsViewStore } from "@/store/modules/tags-view"

const route = useRoute()
const activeTab = ref<string>("#attribute-area")
const articleModel = ref<IArticle>({
  id: "",
  catalogs: "",
  channel: "",
  brand_uuid: "",
  title: "",
  sub_title: "",
  sketch: "",
  keywords: "",
  quick_code: "",
  cover: "",
  images: "",
  videos: "",
  full_content: "",
  lowest_price: 0,
  highest_price: 0,
  like: 0,
  collect_count: 0,
  owner_recommend: 0,
  sys_recommend: 0,
  display_order: 0,
  publish_date: new Date(),
  status: 0
})

const openBrandHome = () => {
  //window.open(`/brand/detail/${articleModel.value.brand.id}`)
}
const tagsViewStore = useTagsViewStore()
onMounted(async () => {
  activeTab.value = route.hash
  const { data } = await getById(route.params.id as string)
  Object.assign(articleModel.value, data)

  tagsViewStore.editTagTitle(route, `${articleModel.value.title} - ${route.meta.title}`)
})
</script>
