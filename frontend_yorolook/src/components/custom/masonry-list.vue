<style lang="scss" scoped>
.masonry-list {
  min-height: 300px;
}

.item-container {
  position: relative;

  .item {
    width: v-bind(itemWidth);
    border-radius: 3px;
    cursor: pointer;
    border: none;

    &.no-gap-left {
      margin-left: 0;
    }

    &.no-gap-right {
      margin-right: 0;
    }
  }
}

.pager-container {
  .waterfall-loading {
    width: 100%;
    text-align: center;
    padding: 60px 0;
    font-size: var(--el-font-size-base);
    color: var(--el-text-color-placeholder);
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
<template>
  <div class="masonry-list">
    <div v-masonry :gutter="listProps.gap" transition-duration="0.7s" item-selector=".item" class="list-wrap">
      <div class="item-container">
        <!--draggable
          @change="dragsort"
          v-model="blocks"
          @start="drag = true"
          @end="drag = false"
          item-key="display_order"
        >
          <template #item="{ element, index }">
            <div
              @dragstart="onDragStart($event, element)"
              v-masonry-tile
              class="item"
              :style="{ marginTop: `${listProps.gap * 2}px` }"
            >
              <slot name="item" :item="element" :index />
            </div>
          </template>
        </draggable-->
        <div
          v-for="(element, index) in blocks"
          :key="index"
          @dragstart="onDragStart($event, element)"
          v-masonry-tile
          class="item"
          :style="{ marginTop: `${listProps.gap * 2}px` }"
        >
          <slot name="item" :item="element" :index="index" />
        </div>
      </div>
      <el-empty v-if="blocks.length <= 0 && finished" :description="emptyReason" />
    </div>
    <div class="pager-container">
      <div v-if="listProps.infinite" id="observer-more" class="waterfall-loading">
        <div v-if="loading" v-loading="loading" element-loading-text="稍事休息，马上就好~" />
        <span v-if="blocks.length > 0 && finished">没有更多了...</span>
      </div>
      <slot v-else name="pager" />
    </div>
    <image-viewer :img-url-list="imageUrlList" ref="imageViewerRef" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, onActivated } from "vue"
import imageViewer from "./image-viewer.vue"
import { throttle } from "lodash-es"

const listProps = withDefaults(
  defineProps<{
    infinite?: boolean
    load: Function
    cols?: number
    gap?: number
    step?: number
    adapter?: {
      xl: number
      lg: number
      md: number
      sm: number
      xs: number
    }
    id?: number
  }>(),
  {
    infinite: true,
    finished: false,
    gap: 8,
    cols: 5,
    step: 10
  }
)

const blocks = ref<any[]>([])
const finished = ref(false)
const loading = ref(false)
const drag = ref(false)
const onDragStart = (event: any, item: any) => {
  // 设置拖拽时的内容
  event.dataTransfer.setData("text/plain", item.text)
  event.dataTransfer.setData("text/html", item.html)
  event.dataTransfer.setData("application/json", JSON.stringify(item))
}

const imageViewerRef = ref()
const imageUrlList = computed(() => {
  const tmpList: string[] = []
  for (let i = 0; i < blocks.value.length; i++) {
    const x = blocks.value[i]
    if (x?.original_mime_type && x?.original_mime_type.indexOf("image") === 0) {
      tmpList.push(`/disk/view?id=${x.id}`)
    }
  }
  return tmpList
})

const emptyReason = ref<string>("该目录空空如也~")

const itemWidth = computed(() => {
  const rect = document.body.getBoundingClientRect()
  let _cols = listProps.cols
  if (listProps.adapter) {
    if (rect.width < 768) {
      _cols = listProps.adapter?.xs
    }
    if (rect.width >= 768) {
      _cols = listProps.adapter?.sm
    }
    if (rect.width >= 992) {
      _cols = listProps.adapter?.md
    }
    if (rect.width >= 1200) {
      _cols = listProps.adapter?.lg
    }
    if (rect.width >= 1920) {
      _cols = listProps.adapter?.xl
    }
  }
  console.log(rect.width, _cols)
  return `calc((100% - ${listProps.gap * (_cols - 1)}px) / ${_cols})`
})

const addItem = (item: any) => {
  blocks.value.splice(0, 0, item)
}
const replaceItem = (item: any) => {
  const index = blocks.value.findIndex((x) => x.id === item.id)
  blocks.value.splice(index, 1, item)
}

const removeItem = (index: number) => {
  blocks.value.splice(index, 1)
}
const previewOpen = (id: string) => {
  imageViewerRef.value.open(`/disk/view?id=${id}`)
}

const dragsort = (evt: any) => {
  const { newIndex, oldIndex } = evt.moved
  if (newIndex > oldIndex) {
    const oldItem = blocks.value[newIndex - 1]
  } else {
    const oldItem = blocks.value[newIndex + 1]
  }
}

/** 加入防抖 */
const load = throttle(async () => {
  // 当目标元素与视窗交叉时，加载更多内容
  if (!loading.value) {
    loading.value = true
    const data = await listProps.load().catch((data: any) => {
      emptyReason.value = data.message
      loading.value = false
      finished.value = true
    })
    if (data && data.length > 0) {
      blocks.value = blocks.value.concat(data)
    }
    loading.value = false
    finished.value = data.length < listProps?.step
  }
}, 1500)

onMounted(() => {
  blocks.value = []
  const loadingComponentEle = document.getElementById("observer-more")
  if (loadingComponentEle) {
    // 创建一个IntersectionObserver实例
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            // 当目标元素与视窗交叉时，加载更多内容
            if (!finished.value) load()
          }
        })
      },
      {
        // 设置交叉比例阈值，即当目标元素的任何部分与视窗交叉超过这个比例时，触发回调
        threshold: 0.1
      }
    )
    intersectionObserver.observe(loadingComponentEle)
  }
})

onActivated(() => {
  console.log("组件被激活")
})

defineExpose({
  addItem,
  replaceItem,
  removeItem,
  previewOpen
})
</script>
