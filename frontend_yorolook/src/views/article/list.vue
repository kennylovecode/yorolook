<style lang="scss" scoped>
.bg-banner {
  background: url(/public/product-banner.jpg) no-repeat;
  width: 100%;
  height: 300px;
  background-position: center;
}

.app-container {
  width: var(--max-width);
  margin: 0 auto;
  padding-bottom: 20px;
}
</style>
<template>
  <div class="bg-banner" />
  <div class="app-container">
    <catalog-selector v-if="channelModel?.id" :key="'hello_' + catalogIDPath" :data-filter="filterCatalog"
      display-key="title" value-key="id" ref="catalogRef" :show-icon="true" :show-child="true" :ratio="4 / 3"
      :id="catalogIDPath" v-model="searchQuery.catalog" @on-change="onCatalogChange" @on-after-load="onAfterLoad" />
    <filter-area :defaults="searchQuery.attributes as any[]" name="id" label="title" value="title" :attrs="attrs"
      :key="channelModel?.id + catalogIDPath + attrs?.attributes?.length" @on-confirm="onFilterConfirm">
      <template #append>
        <price-limit @onConfirm="priceLimitConfirm" />
        <brand-selector @select="brandConfirm" />
      </template>
      <template #right>
        <div :class="`w-50`">
          <el-input-tag
            :max="4"
            tag-type="primary"
            tag-effect="dark"
            size="small"
            v-model="keywordArray"
            placeholder="输入内容搜索"
            style="box-shadow: none; border-bottom: solid 1px #dcdfe6; padding: 0"
          >
            <template #suffix>
              <el-button size="small" icon="Search" text @click="load(true)" :disabled="!keywordArray.length" />
            </template>
          </el-input-tag>
        </div>
        <el-button size="small" v-permission="['manage']" type="primary" @click="createArticle">新建发布</el-button>
      </template>
    </filter-area>
    <yl-masonry-list :key="searchQuery.catalog + (searchQuery.keywords || '') + searchQuery.size + searchQuery.sort + reloadKey"
      ref="listRef" :load="load" :cols="6" :gap="8" :step="20" :adapter="{ xs: 3, sm: 4, md: 4, lg: 5, xl: 6 }"
      empty-reason="没有更多了...">
      <template #item="{ item, index }">
        <item-card :is-shop="channelModel?.is_shop" :item="item" :index="index" @on-remove="onRemove(item.id, index)" @on-edit="onEdit(item.id)"
          @on-pick="onPick(item)" />
      </template>
    </yl-masonry-list>
  </div>
</template>

<script lang="ts" setup>
import { Channel } from "@/api/channel/types"
import { onMounted, ref, reactive, watch } from "vue"
import { getByName as getChannelModel } from "@/api/channel"
import ylMasonryList from "@/components/custom/masonry-list.vue"
import itemCard from "@/components/custom/article/item-card.vue"
import { IArticleListQuery } from "@/api/article/types"
import { useRoute, useRouter } from "vue-router"
import { getList, deleteById, create } from "@/api/article"
import { onActivated } from "vue"
import BrandSelector from "@/components/filter/brand-selector.vue"
import priceLimit from "@/components/filter/price-limit.vue"

const channelModel = ref<Channel>()
const route = useRoute()
const router = useRouter()
const catalogIDPath = ref<string>("")
const resultTotal = ref<number>(-1)
const resultData = ref<any[]>([])
const catalogAttrs = ref<any[]>([])
const attrs = ref<any>()
const listRef = ref()
const keywordArray = ref<string[]>([])
const reloadKey = ref<number>(0)

const searchQuery = reactive<IArticleListQuery & { my: boolean }>({
  idx: 0,
  size: 30,
  keywords: "",
  kv_name: "",
  sort: "display_order",
  channel: "",
  catalog: "",
  attributes: [],
  lowest_price: 0,
  highest_price: 0,
  brands: [],
  my: false
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

const load = async (reload: boolean = false) => {
  if (keywordArray.value.length > 0) {
    searchQuery.keywords = keywordArray.value.join(",")
  }
  if (reload) {
    searchQuery.idx = 0
    resultTotal.value = -1
    resultData.value.splice(0, resultData.value.length)
    reloadKey.value = reloadKey.value + 1
  } else {
    searchQuery.idx += 1
  }
  const { data, total } = await getList(searchQuery)
  Array.prototype.push.apply(resultData, data)
  resultTotal.value = total
  return data
}

const onRemove = async (id: string, index: number) => {
  await deleteById({ id })
  ElMessage.success("删除成功...")
  listRef.value?.removeItem(index)
}

const onEdit = async (id: string) => {
  router.push({
    name: `${channelModel.value?.name}Edit`,
    params: {
      id
    }
  })
}

const onCatalogChange = (title: string, id: string) => {
  searchQuery.catalog = title
  searchQuery.idx = 0
  catalogIDPath.value = id

  router.push({
    query: {
      ...route.query,
      cid: catalogIDPath.value,
      c: title
    }
  })
}
const onAfterLoad = (_attrs?: any, deep: number = 0) => {
  if (catalogAttrs.value.length <= deep) {
    catalogAttrs.value.push(_attrs)
  }
  if (catalogAttrs.value.length > deep) {
    catalogAttrs.value.splice(deep, catalogAttrs.value.length - deep, _attrs)
  }

  // 初始化组合结果对象
  const combinedAttributes = {
    attributes: {} as any
  }

  // 如果 channelModel.value?.attributes 存在，将其合并到 combinedAttributes 中
  if (channelModel.value?.attributes) {
    combinedAttributes.attributes = { ...channelModel.value.attributes }
  }

  // 遍历 catalogAttrs.value，每个层级的属性依次合并
  catalogAttrs.value.forEach((layer) => {
    if (layer?.attributes) {
      {
        combinedAttributes.attributes.attributes = [
          ...new Set([...combinedAttributes.attributes.attributes, ...layer.attributes])
        ]
        combinedAttributes.attributes.controls = [
          ...new Set([...combinedAttributes.attributes.controls, ...layer.controls])
        ]
        combinedAttributes.attributes.options = [
          ...new Set([...combinedAttributes.attributes.options, ...layer.options])
        ]
      }
    }
  })

  // 将最终的组合结果存储到 attrs.value
  attrs.value = combinedAttributes.attributes
}

const priceLimitConfirm = (limit: { min: number; max: number }) => {
  searchQuery.lowest_price = limit.min * 100
  searchQuery.highest_price = limit.max * 100
  load(true)
}

const brandConfirm = (brands: any[]) => {
  searchQuery.brands = brands.map((x) => x.id)
  load(true)
}

const onFilterConfirm = async (id: string, value: any[]) => {
  // Handle the filter confirmation logic here

  const findIndex = searchQuery.attributes!.findIndex((x) => x.attribute_uuid === id)
  if (findIndex > -1) {
    if (value.length === 0) {
      searchQuery.attributes!.splice(findIndex, 1)
    } else {
      searchQuery.attributes![findIndex] = {
        attribute_uuid: id,
        value_list: value.map((x) => x.id).join(",")
      }
    }
  } else {
    if (value.length > 0) {
      searchQuery.attributes?.push({
        attribute_uuid: id,
        value_list: value.map((x) => x.id).join(",")
      })
    }
  }

  await load(true)
}

const onPick = (item: any) => {
  window.parent.postMessage(JSON.stringify(item))
}

const createArticle = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "创建草稿中...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  })
  create({ channel: channelModel.value?.name || "" }).then(({ data }: any) => {
    router.push({
      name: `${channelModel.value?.name}Edit`,
      params: {
        id: data.id
      }
    })
  })
}

onActivated(() => {
  searchQuery.idx = 0
})

onMounted(async () => {
  searchQuery.channel = route.meta.name as string
  catalogIDPath.value = (route.query.cid as string) || ""
  searchQuery.catalog = (route.query.c as string) || ""
  /** 获取频道信息 */
  getChannelModel(searchQuery.channel, "").then((res) => {
    channelModel.value = res.data
  })
})
let _timeOb: any
watch(keywordArray, (newVal) => {
  if (_timeOb) {
    clearTimeout(_timeOb)
  }
  _timeOb = setTimeout(() => {
    load(true)
  }, 2000)
})
</script>
