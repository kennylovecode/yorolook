<style lang="scss" scoped>
.app-container {
  max-width: var(--max-width);
  margin: 0 auto;

  :deep(.vue-waterfall) {
    font-size: 0;

    &.is-transition {
      img {
        opacity: 1;
      }
    }
  }

  img {
    max-width: 100%;
  }

  .catalog-selector + .catalog-selector {
    padding-top: 0;
  }

  .none-gallery {
    width: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-placeholder);
    vertical-align: middle;
  }

  .bg-title {
    position: relative;
    height: 60px;
    background-position: center;

    .text {
      font-size: 20px;
      text-align: center;
      line-height: 60px;
      height: 60px;
      background-color: rgba(0, 0, 0, 0.35);
      color: #fff;
      overflow: hidden;
    }
  }

  .cover {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px;

    .el-image {
      width: 50%;
      aspect-ratio: 1/1;
      background: var(--el-fill-color-light);
      padding: 5px;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    .type {
      .el-tag {
        margin-right: 6px;
      }
    }

    .operate {
      display: flex;

      a {
        margin-left: 0.5rem;
        font-size: 1rem;
      }
    }
  }
}
</style>

<template>
  <div class="app-container">
    <yl-masonry-list :cols="5" :load="load" :infinite="true" :step="searchQuery.size">
      <template #item="{ item }">
        <el-card @click.stop="handleClick(item)" :body-style="{ padding: '0px' }" shadow="never">
          <div class="body">
            <div
              class="bg-title"
              :style="{ backgroundImage: item.banners ? `url(/disk/view?id=${item.banners}&w=700)` : '' }"
            >
              <div class="text">{{ item.title + ` ${item.sub_title}` }}</div>
            </div>
            <template v-if="!item.covers">
              <div class="none-gallery">暂无相册</div>
            </template>
            <template v-else>
              <div class="cover">
                <el-image
                  v-for="coverId in item.covers.split(',')"
                  fit="cover"
                  :key="`/disk/view?id=${coverId}`"
                  :src="`/disk/view?id=${coverId}`"
                  loading="lazy"
                />
              </div>
            </template>
          </div>
          <div class="bottom">
            <div class="type">
              <el-tag :key="index" v-for="(tag, index) in item.type?.split(',')" type="info" effect="plain">{{
                tag
              }}</el-tag>
            </div>
          </div>
        </el-card>
      </template>
    </yl-masonry-list>
  </div>
</template>

<script lang="ts" setup>
import { getList } from "@/api/brand"
import { Brand, ListRequest } from "@/api/brand/types"
import ylMasonryList from "@/components/custom/masonry-list.vue"
import { computed, reactive, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const searchQuery = reactive<ListRequest>({
  idx: 1,
  size: 30,
  catalog: "",
  keywords: "",
  type: "",
  attributes: {},
  initial: "",
  country: "",
  area: "",
  owner: "",
  status: -1,
  sort: "display_order"
})
const loading = ref(false)
const finished = computed(() => {
  return resultTotal.value >= 0 && resultData.length >= resultTotal.value
})
const resultData = reactive<Brand[]>([])
const resultTotal = ref(-1)

const props = defineProps<{
  owner?: string
}>()

function handleClick(item: any) {
  localStorage.setItem("BrandDetail", JSON.stringify(item))
  router.push({
    name: "brandDetail",
    params: {
      id: item?.id
    }
  })
}

function handleEdit(item: any) {
  if (!item) return
  router.push({
    name: "brandEdit",
    params: {
      id: item?.id
    }
  })
}

function handleDelete(item: any) {
  console.log("delete item ", item)
}
function handleStar(item: any) {
  console.log("star item ", item)
}

let requestId: any
function load() {
  return new Promise((resolve, reject) => {
    if (finished.value) {
      resolve([])
      return
    }
    if (requestId) clearTimeout(requestId)
    loading.value = true
    requestId = setTimeout(async () => {
      const { data, total } = await getList(searchQuery)
      loading.value = false
      Array.prototype.push.apply(resultData, data)
      resultTotal.value = total
      resolve(data)
    }, 1000)
  })
}
</script>
