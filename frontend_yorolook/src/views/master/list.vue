<style lang="scss" scoped>
.bg-banner {
  background: url(/public/master_banner.jpg) no-repeat;
  width: 100%;
  height: 300px;
  background-position: center;
}

.app-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding-bottom: 30px;

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

  .catalog-selector+.catalog-selector {
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
    display: flex;
    padding: 0 1rem;
    align-items: center;

    .img {
      width: 48px;
      background: #fff;
      position: relative;
      z-index: 2;
    }

    .text {
      width: 100%;
      font-size: 20px;
      text-align: center;
      line-height: 60px;
      height: 60px;
      color: #fff;
      overflow: hidden;
      position: relative;
      z-index: 2;
    }

    .mask {
      background-color: rgba(0, 0, 0, 0.15);
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
    }
  }

  .cover {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px;

    img {
      width: 50%;
      aspect-ratio: 1/1;
      background: var(--el-fill-color-light);
      padding: 5px;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 8px;

    .type {
      display: flex;
      justify-content: flex-start;

      .el-tag {
        margin-left: 0px;
        margin-right: 2px;
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
  <div>
    <div class="bg-banner" />
    <div class="app-container">
      <catalog-selector v-if="channelModel && channelModel?.catalogs?.length > 0" :key="'hello_' + catalogIDPath"
        :data-filter="filterCatalog" display-key="title" value-key="id" :show-icon="false" :show-child="false"
        :ratio="4 / 3" :id="catalogIDPath" @on-change="onCatalogChange" />
      <multiple-selector v-if="masterType?.options.length > 0"
        :key="masterType?.options.length + searchQuery.type!.length" :data="masterType?.options" text="类型"
        :show-child="false" display-key="text" value-key="text" v-model="searchQuery.type" @on-change="selectType" />
      <multiple-selector :data="initials" text="首字母" :show-child="false" :simple="true" v-model="searchQuery.initial"
        @on-change="load(true)" />
      <filter-area :key="searchQuery.attributes" :defaults="searchQuery.attributes" name="name" label="title"
        value="title" @on-confirm="onFilterConfirm">
        <template #right>
          <el-button size="small" v-permission="['manage']" type="primary" @click="create">新建发布</el-button>
        </template>
      </filter-area>
      <yl-masonry-list
        :key="searchQueryKey"
        :cols="5"
        :load="load"
        :infinite="true"
        :step="searchQuery.size"
        :adapter="{ xs: 3, sm: 4, md: 4, lg: 5, xl: 6 }"
      >
        <template #item="{ item }">
          <el-card @click.stop="handleClick(item)" :body-style="{ padding: '0px' }" shadow="never">
            <div class="body">
              <div class="bg-title"
                :style="{ backgroundImage: item.banners ? `url(/disk/view?id=${item.banners}&w=300)` : '' }">
                <img width="48" fit="contain" :src="`/disk/view?id=${item.logo}&w=300`" onerror="this.remove()" />
                <div class="text">{{ item.title + ` ${item.sub_title}` }}</div>
                <div class="mask" />
              </div>
              <template v-if="!item.covers">
                <div class="none-gallery">暂无相册</div>
              </template>
              <template v-else>
                <div class="cover">
                  <img v-for="coverId in item.covers.split(',')" fit="cover" :key="coverId"
                    :src="`/disk/view?id=${coverId}&w=300`" loading="lazy" onerror="this.remove()" />
                </div>
              </template>
            </div>
            <div class="bottom">
              <div class="type">
                <el-tag size="small" v-for="(tag, index) in item.type?.split(',')" :key="index" type="info"
                  effect="plain">{{ tag
                  }}</el-tag>
              </div>
              <div class="operate">
                <el-link :icon="Star" @click.stop="handleStar(item)" />
                <el-link v-permission="['manage', `owner_${item.owner_uuid}`]" :icon="Edit"
                  @click.stop="handleEdit(item)" />
                <el-link @click.stop="handleDelete(item)" v-permission="['manage', `owner_${item.owner_uuid}`]"
                  :icon="Delete" />
              </div>
            </div>
          </el-card>
        </template>
      </yl-masonry-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Delete, Star } from "@element-plus/icons-vue"
import { getList } from "@/api/master/index"
import { IMaster, ListRequest } from "@/api/master/types"
import { ref, onMounted, onBeforeMount, computed, reactive, shallowReactive, onActivated } from "vue"
import { useRoute, useRouter } from "vue-router"
import filterArea from "@/components/filter/filter-area.vue"
import { Channel } from "@/api/channel/types"
import catalogSelector from "@/components/filter/catalog-selector.vue"
import multipleSelector from "@/components/filter/multiple-selector.vue"
import { getByName as getChannelModel } from "@/api/channel"
import ylMasonryList from "@/components/custom/masonry-list.vue"
import { Dictionary } from "@/api/dictionary/types"
import { getByKey as getDictByKey } from "@/api/dictionary"
import { deleteById } from "@/api/master/index"

const props = defineProps<{
  owner?: string
}>()

const route = useRoute()
const router = useRouter()
const col = ref(5)
const colOption = ref<any[]>([])

const resultData = ref<IMaster[]>([])
const resultTotal = ref(-1)

const loading = ref(false)
const searchQuery = reactive<
  ListRequest & {
    my: boolean
  }
>({
  idx: 0,
  size: 30,
  catalog: "",
  keywords: "",
  type: "",
  attributes: {},
  initial: "",
  country: "",
  area: "",
  my: false,
  status: -1,
  sort: "display_order"
})

const searchQueryKey = computed(() => {
  return (
    (searchQuery.keywords?.length + searchQuery.attributes.length + searchQuery.catalog || "") +
    searchQuery.type +
    searchQuery.area +
    searchQuery.country +
    searchQuery.initial
  )
})

const channelModel = ref<Channel>()
const initials = computed(() => {
  const a = []
  for (let i = 65; i < 91; i++) {
    a.push(String.fromCharCode(i))
  }
  return a
})
const masterType = shallowReactive<Dictionary>({
  key: "",
  text: "",
  options: []
})

function handleClick(item: any) {
  localStorage.setItem("BrandDetail", JSON.stringify(item))
  router.push({
    name: "masterDetail",
    params: {
      id: item?.id
    }
  })
}

function handleEdit(item: any) {
  if (!item) return
  router.push({
    name: "masterEdit",
    params: {
      id: item?.id
    }
  })
}

async function handleDelete(item: any) {
  const res = await deleteById(item.id)
  if (res) {
    ElMessage.success("删除成功...")
  }
}

function handleStar(item: any) {
  console.log("star item ", item)
}

const catalogIDPath = ref("")
const onCatalogChange = (title: string, id: string) => {
  searchQuery.catalog = title
  catalogIDPath.value = id
  searchQuery.idx = 0
  router.push({
    path: route.path,
    query: {
      ...route.query,
      cid: catalogIDPath.value,
      c: searchQuery.catalog
    }
  })
}

const selectType = (types: any[]) => {
  console.log(types)
  if (types.length > 0) {
    searchQuery.type = types.join(",")
  } else searchQuery.type = ""
  searchQuery.idx = 0
  router.push({
    path: route.path,
    query: {
      ...route.query,
      t: searchQuery.type
    }
  })
}

const onFilterConfirm = (name: string, values: any[]) => {
  searchQuery.attributes = {
    ...searchQuery.attributes,
    [name]: values.map((x) => x.title).join(",")
  }
  load(true)
}

const load = async (reload: boolean = false) => {
  loading.value = true
  if (reload) {
    searchQuery.idx = 0
    resultTotal.value = -1
    resultData.value.splice(0, resultData.value.length)
  } else {
    searchQuery.idx += 1
  }
  const { data, total } = await getList(searchQuery)
  Array.prototype.push.apply(resultData, data)
  resultTotal.value = total
  loading.value = false
  return data
}

function resetFilter() {
  searchQuery.idx = 0
  searchQuery.size = 30
  searchQuery.catalog = ""
  searchQuery.keywords = ""
  searchQuery.type = ""
  searchQuery.attributes = {}
  searchQuery.initial = ""
  searchQuery.country = ""
  searchQuery.area = ""
  searchQuery.owner = ""
  searchQuery.status = -1
  searchQuery.sort = "display_order"
}

onBeforeMount(() => {
  const options = []
  const itemMinWidth = 200
  const maxCol = document.documentElement.clientWidth / itemMinWidth
  if (col.value > maxCol) col.value = maxCol
  if (maxCol <= 1) return []
  for (let i = 1; i <= maxCol; i++) {
    options.push({
      label: `${i}列`,
      value: i
    })
  }
  colOption.value = options
})

onMounted(async () => {
  resetFilter()
  if (props.owner) searchQuery.owner
  catalogIDPath.value = (route.query.cid as string) || ""
  searchQuery.type = (route.query.t as string) || ""
  searchQuery.catalog = (route.query.c as string) || ""
  /** 获取频道信息 */
  getChannelModel("master", "").then((res) => {
    channelModel.value = res.data
  })

  getDictByKey("master_type").then(({ data }) => {
    Object.assign(masterType, data)
  })
})

const filterCatalog = (data: any[], deep: number) => {
  const deepIds: any[] = []
  channelModel.value?.catalogs.map((x) => {
    if (deepIds.indexOf(x[deep]) < 0) {
      deepIds.push(x[deep])
    }
  })
  const result = data.filter((x) => deepIds?.includes(x.id))
  return result
}

const create = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "创建草稿中...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  })
  router.push({
    name: `masterEdit`
  })
}

onActivated(() => {
  console.log("组件激活")
})
</script>
