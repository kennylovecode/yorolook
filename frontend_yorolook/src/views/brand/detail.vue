<script setup lang="ts">
import { getById } from "@/api/brand"
import { useTagsViewStore } from "@/store/modules/tags-view"
import { ref, onMounted, reactive, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { LocationInformation, Edit, Star, Delete } from "@element-plus/icons-vue"
import ylBrandEditor from "./edit.vue"
import directoryList from "@/components/custom/directory/list.vue"
import { IArticleListQuery } from "@/api/article/types"
import ylMasonryList from "@/components/custom/masonry-list.vue"
import { getList, deleteById } from "@/api/article"
import type { Brand } from "@/api/brand/types"

// 使用接口定义状态类型
interface State {
  editorDrawerVisible: boolean
  activeName: "dir" | "product"
  entryDirectory: string
}

const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()

// 使用ref管理状态
const state = reactive<State>({
  editorDrawerVisible: false,
  activeName: "dir",
  entryDirectory: ""
})

// 品牌数据
const brandData = ref<Brand | null>(null)

// 计算属性
const clientWidth = computed(() => document.documentElement.clientWidth)
const bannerStyle = computed(() => ({
  backgroundImage: brandData.value?.banners ? `url(/disk/view?id=${brandData.value.banners}&w=${clientWidth.value})` : ""
}))

// 产品查询参数
const productQuery = reactive<IArticleListQuery>({
  idx: 0,
  size: 30,
  keywords: "",
  kv_name: "",
  sort: "display_order",
  channel: "product",
  catalog: "",
  attributes: [],
  lowest_price: 0,
  highest_price: 0,
  brands: []
})

// 加载产品列表
const loadProducts = async (reload = false) => {
  if (reload) {
    productQuery.idx = 0
  } else {
    productQuery.idx += 1
  }
  const { data } = await getList(productQuery)
  return data
}

// 处理标签页切换
const handleTabChange = async () => {
  await router.push(`/brand/detail/${brandData.value?.id}?${state.activeName}`)
}

// 处理目录进入
const handleDirectoryEnter = async (dir: string) => {
  await router.push(`/brand/detail/${brandData.value?.id}?dir=${dir}`)
  state.entryDirectory = dir
}

// 处理删除
const handleDelete = async (item: any) => {
  try {
    await ElMessageBox.confirm("确定要删除该项吗？", "提示", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    })

    await deleteById(item.id)
    ElMessage.success("删除成功")
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败")
    }
  }
}

// 初始化数据
const initializeData = async () => {
  try {
    const { data } = await getById(route.params.id as string)
    brandData.value = data

    // 处理编辑状态
    if (route.query.edit) {
      state.editorDrawerVisible = true
    }

    // 处理目录状态
    if (route.query.dir) {
      state.entryDirectory = route.query.dir as string
    }

    // 处理活动标签页
    state.activeName = Object.prototype.hasOwnProperty.call(route.query, "product") ? "product" : "dir"

    // 设置产品查询参数
    productQuery.brands = [data.id]

    // 更新标签标题
    tagsViewStore.editTagTitle(route, `${data.title} - ${data.country} - 品牌详情`)
  } catch (error) {
    ElMessage.error("加载品牌数据失败")
  }
}

onMounted(initializeData)
</script>

<template>
  <div v-if="brandData" class="app-container">
    <!-- Banner Section -->
    <div class="banner" :style="bannerStyle">
      <div class="overlay">
        <div class="information">
          <div class="info-area">
            <!-- Brand Title -->
            <p class="brand-title">
              <span class="title">{{ brandData.title }} {{ brandData.sub_title }}</span>
              <span class="location">
                <el-icon><LocationInformation /></el-icon>
                {{ brandData.country }} {{ brandData.city }}
              </span>
            </p>

            <!-- Website Link -->
            <p v-if="brandData.website" class="website">
              <el-tooltip effect="dark" content="点击前往品牌官网" placement="top-start">
                <a :href="brandData.website" target="_blank" rel="noopener noreferrer">品牌官网</a>
              </el-tooltip>
            </p>

            <!-- Description -->
            <p v-if="brandData.description"
               class="description"
               v-text="brandData.description.replace(/(<([^>]+)>)/gi, '')" />
          </div>
        </div>

        <!-- Control Buttons -->
        <div class="control">
          <el-link v-permission :icon="Star" title="收藏" />
          <el-link
            v-permission="['manage', `owner_${brandData.owner_uuid}`]"
            :icon="Edit"
            @click="state.editorDrawerVisible = true"
            title="编辑"
          />
          <el-link
            v-permission="['manage', `owner_${brandData.owner_uuid}`]"
            :icon="Delete"
            title="删除"
          />
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="detail">
      <el-tabs
        :key="state.activeName"
        v-model="state.activeName"
        @tab-change="handleTabChange"
      >
        <!-- Directory Tab -->
        <el-tab-pane label="资料库" name="dir">
          <directory-list
            v-if="brandData.id"
            :key="route.fullPath"
            :channel="`brand_${brandData.id}`"
          />
        </el-tab-pane>

        <!-- Products Tab -->
        <el-tab-pane label="产品库" name="product">
          <yl-masonry-list
            :key="productQuery.brands?.length"
            :cols="5"
            :load="loadProducts"
            :infinite="true"
            :step="productQuery.size"
            :adapter="{ xs: 3, sm: 4, md: 4, lg: 5, xl: 6 }"
          >
            <template #item="{ item }">
              <el-card
                shadow="never"
                :body-style="{ padding: '0px' }"
                class="product-card"
              >
                <!-- Product Content -->
                <div class="body">
                  <div class="bg-title" :style="{ backgroundImage: item.banners ? `url(/disk/view?id=${item.banners}&w=300)` : '' }">
                    <img
                      width="48"
                      fit="contain"
                      :src="`/disk/view?id=${item.logo}&w=300`"
                      :alt="item.title"
                      @error="$event.target.style.display='none'"
                    />
                    <div class="text">{{ item.title }} {{ item.sub_title }}</div>
                    <div class="mask" />
                  </div>

                  <!-- Gallery -->
                  <template v-if="!item.covers">
                    <div class="none-gallery">暂无相册</div>
                  </template>
                  <template v-else>
                    <div class="cover">
                      <img
                        v-for="coverId in item.covers.split(',')"
                        :key="coverId"
                        :src="`/disk/view?id=${coverId}&w=300`"
                        :alt="item.title"
                        loading="lazy"
                        @error="$event.target.style.display='none'"
                      />
                    </div>
                  </template>
                </div>

                <!-- Footer -->
                <div class="bottom">
                  <div class="type">
                    <el-tag
                      v-for="(tag, index) in item.type?.split(',')"
                      :key="index"
                      size="small"
                      type="info"
                      effect="plain"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                  <div class="operate">
                    <el-link :icon="Star" title="收藏" />
                    <el-link
                      v-permission="['manage', `owner_${item.owner_uuid}`]"
                      :icon="Edit"
                      title="编辑"
                    />
                    <el-link
                      v-permission="['manage', `owner_${item.owner_uuid}`]"
                      :icon="Delete"
                      @click="handleDelete(item)"
                      title="删除"
                    />
                  </div>
                </div>
              </el-card>
            </template>
          </yl-masonry-list>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- Editor Drawer -->
    <el-drawer
      v-model="state.editorDrawerVisible"
      title="编辑品牌信息"
      size="50%"
      :z-index="1003"
    >
      <yl-brand-editor
        :id="brandData.id"
        :dialog="true"
        @after-submit="(status) => status === 0 && (state.editorDrawerVisible = false)"
      />
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  margin: 0 auto;
  position: relative;
  height: 24vw;
  max-height: 260px;
  background: var(--el-color-primary-light-9);
  background-size: cover;
  background-position: center;
  overflow: hidden;

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;

    .information {
      width: calc(96% - 40px);
      height: calc(100% - 80px);
      margin: 30px 0;
      padding: 20px;
      display: flex;

      .info-area {
        flex: 1;

        .brand-title {
          margin: 0;
          padding: 0;
          height: 36px;
          display: flex;
          align-items: center;
          gap: 12px;

          .title {
            font-size: 1.2rem;
            font-weight: bold;
          }

          .location {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.9rem;
          }
        }

        .website {
          margin: 12px 0;

          a {
            color: #fff;
            text-decoration: none;
            padding: 8px 16px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            transition: all 0.3s ease;

            &:hover {
              background: rgba(255, 255, 255, 0.2);
            }
          }
        }

        .description {
          margin: 12px 0;
          font-size: 0.9rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }

    .control {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      gap: 12px;

      :deep(.el-link) {
        font-size: 1.2rem;
        color: #fff;
        transition: all 0.3s ease;

        &:hover {
          color: var(--el-color-primary);
          transform: scale(1.1);
        }
      }
    }
  }
}

.detail {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

  :deep(.el-tabs__nav-wrap) {
    margin-bottom: 0;

    .el-tabs__nav-scroll {
      width: var(--max-width);
      margin: 0 auto;
    }

    &::after {
      height: 0;
    }
  }
}

.product-card {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

@media screen and (max-width: 750px) {
  .banner {
    height: 75vw;

    .overlay {
      .information {
        padding: 12px;

        .info-area {
          .brand-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .website a {
            padding: 4px 8px;
            font-size: 0.9rem;
          }

          .description {
            -webkit-line-clamp: 3;
          }
        }
      }
    }
  }
}
</style>
