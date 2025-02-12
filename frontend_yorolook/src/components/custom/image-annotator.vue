<script setup lang="ts">
import { IImageLab } from "@/api/image_labs/type";
import { useAppStore } from "@/store/modules/app"
import { computed } from "vue"
import { ref, onMounted, watch } from "vue"
import { create, getList, update, deleteById } from "@/api/image_labs/index"
import { getById } from "@/api/article"
import { list as getSkuList } from "@/api/article_sku/index"

const props = defineProps<{
  imageUrl: string
  width?: number
  mode?: "edit" | "view"
}>()

const containerRef = ref<HTMLDivElement>()
const imageRef = ref<HTMLImageElement>()
const isDrawing = ref(false)
const startPos = ref({ x: 0, y: 0 })
const currentRect = ref<IImageLab | null>(null)
const hoveredRect = ref<{ rect: IImageLab; x: number; y: number } | null>(null)

const articleDialogVisible = ref<boolean>(false)
const articleChannel = ref<string>("")
const articleModel = ref<any>({})
const iframeUrl = computed(() => {
  return `/${articleChannel.value}/list?pick=1`
})
const rects = ref<IImageLab[]>([])

const { channels } = useAppStore()

// 右键菜单相关
const contextMenu = ref({
  show: false,
  x: 0,
  y: 0,
  targetIndex: -1
})

const editingRect = ref<any>()
const finishedImageLoaded = ref<boolean>(false)

// 获取图片实际显示尺寸
const getImageDimensions = () => {
  const img = imageRef.value
  if (!img) return { width: 0, height: 0 }
  return {
    width: img.offsetWidth,
    height: img.offsetHeight
  }
}

// 将像素坐标转换为百分比
const pixelToPercent = (pixel: number, total: number): number => {
  return (pixel / total) * 100
}

const getMousePosition = (e: MouseEvent) => {
  const container = containerRef.value
  if (!container) return { x: 0, y: 0 }

  const rect = container.getBoundingClientRect()
  const { width, height } = getImageDimensions()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  return {
    x,
    y,
    xPercent: pixelToPercent(x, width),
    yPercent: pixelToPercent(y, height)
  }
}

const startDrawing = (e: MouseEvent) => {
  if (props.mode === "view" || e.button !== 0) return
  e.preventDefault()
  const pos = getMousePosition(e)
  isDrawing.value = true
  startPos.value = { x: pos.x, y: pos.y }
  currentRect.value = {
    id: Date.now(),
    title: "",
    target_article_uuid: "",
    target_article_sku_uuid: "",
    target_brand_uuid: "",
    target_amount: 0,
    start_x: pos.xPercent || 0,
    start_y: pos.yPercent || 0,
    end_x: pos.xPercent || 0,
    end_y: pos.yPercent || 0,
    jump_link: ""
  }
}

const updateDrawing = (e: MouseEvent) => {
  if (!isDrawing.value || !currentRect.value) return

  const pos = getMousePosition(e)
  const { width, height } = getImageDimensions()

  currentRect.value = {
    ...currentRect.value,
    end_x: pos.xPercent || 0,
    end_y: pos.yPercent || 0
  }
}

const stopDrawing = () => {
  if (isDrawing.value && currentRect.value) {
    const { width, height } = getImageDimensions()
    const minWidthPixels = (5 / width) * 100 // 最小5像素转百分比
    const minHeightPixels = (5 / height) * 100

    const rectWidth = Math.abs(currentRect.value.end_x - currentRect.value.start_x)
    const rectHeight = Math.abs(currentRect.value.end_y - currentRect.value.start_y)
    currentRect.value.source_image = props.imageUrl

    if (rectWidth > minWidthPixels && rectHeight > minHeightPixels) {
      /// create
      create(currentRect.value).then((res: any) => {
        rects.value.push(res.data)
      })
    }
    isDrawing.value = false
    currentRect.value = null
  }
}

const showContextMenu = (e: MouseEvent, index: number) => {
  if (props.mode === "view") return
  e.preventDefault()
  contextMenu.value = {
    show: true,
    x: e.clientX,
    y: e.clientY,
    targetIndex: index
  }
}

const hideContextMenu = () => {
  contextMenu.value.show = false
  contextMenu.value.targetIndex = -1
}

const deleteRect = (index: number) => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在删除...",
    background: "rgba(0, 0, 0, 0.7)"
  })
  // delete
  deleteById(rects.value[index].id)
    .then(() => {
      ElMessage.success("删除成功...")
      rects.value.splice(index, 1)
      loading.close()
    })
    .catch(() => {
      loading.close()
    })
  hideContextMenu()
}

const startEditing = (index: number) => {
  editingRect.value = {
    ...rects.value[index]
  }

  if (editingRect.value.target_article_uuid) {
    const loading = ElLoading.service({
      lock: true,
      text: "正在获取绑定数据...",
      background: "rgba(0, 0, 0, 0.7)"
    })
    getById(editingRect.value.target_article_uuid)
      .then((res) => {
        articleModel.value = res.data
        articleChannel.value = articleModel.value.channel
      })
      .then(() => {
        loading.close()
      })
  }
  hideContextMenu()
}

const submitEdit = () => {
  if (!editingRect.value) return

  const loading = ElLoading.service({
    lock: true,
    text: "正在保存...",
    background: "rgba(0, 0, 0, 0.7)"
  })

  update(editingRect.value)
    .then(() => {
      const editIndex = rects.value.findIndex((r) => r.id === editingRect.value.id)
      if (editIndex > -1) {
        rects.value[editIndex] = editingRect.value
      }
      loading.close()
      editingRect.value = null
      ElMessage.success("保存成功")
    })
    .catch((err) => {
      ElMessage.error("保存失败，请重试..." + err)
      loading.close()
      editingRect.value = null
    })
}

const handleMouseEnter = (rect: IImageLab, e: MouseEvent) => {
  if (props.mode === "view" && rect.title) {
    const pos = getMousePosition(e)
    hoveredRect.value = { rect, x: pos.x, y: pos.y }
  }
}

const handleMouseLeave = () => {
  hoveredRect.value = null
}

const handleClickOutside = (e: MouseEvent) => {
  if (contextMenu.value.show) {
    hideContextMenu()
  }
}

const emits = defineEmits(["onLoaded"])

onMounted(() => {
  getList(props.imageUrl).then(({ data }: any) => {
    rects.value = data
    emits("onLoaded", rects.value)
  })
  document.addEventListener("click", handleClickOutside)
  window.addEventListener("message", async (event) => {
    if (event.data?.source?.indexOf("devtools") > -1) return
    const article = JSON.parse(event.data) || {}

    console.log(article)
    if (article) {
      articleDialogVisible.value = false
      const { data } = await getSkuList(article.channel, article.id)
      article.skus = data
      editingRect.value.target_article_uuid = article.id
      editingRect.value.target_article_sku_uuid = article.skus?.list.length ? article.skus?.list[0].id : ""
      editingRect.value.target_brand_uuid = article.brand_uuid || ""
      articleModel.value = article
    }
  })
})
</script>

<template>
  <div
    ref="containerRef"
    class="image-annotator"
    :class="{ 'view-mode': mode === 'view' }"
    @mousedown="startDrawing"
    @mousemove="updateDrawing" @mouseup="stopDrawing" @mouseleave="stopDrawing">
    <img
      @load="
        () => {
          finishedImageLoaded = true
      }
      "
      ref="imageRef"
      :src="`/disk/view?id=${props.imageUrl}&w=${width || 300}`"
      class="annotation-image"
      draggable="false"
      @dragstart.prevent
    />

    <div v-if="finishedImageLoaded" class="annotation-layer">
      <!-- 已存在的矩形 -->
      <div
        v-for="(rect, index) in rects"
        :key="rect.id"
        class="annotation-rect"
        :class="{
          'has-title': rect.title,
          'view-mode': mode === 'view'
        }"
        :style="{
          left: `${rect.start_x}%`,
          top: `${rect.start_y}%`,
          width: `${rect.end_x - rect.start_x}%`,
          height: `${rect.end_y - rect.start_y}%`
        }"
        @contextmenu="showContextMenu($event, index)"
      >
        <span v-if="rect.title && mode !== 'view'" class="title-label">
          {{ rect.title }}
        </span>
        <!-- 展示模式下的波纹点 -->
        <template v-if="mode === 'view'">
          <div class="ripple-point" @mouseenter="(e) => handleMouseEnter(rect, e)" @mouseleave="handleMouseLeave">
            <div class="dot" />
            <div class="ripple" />
            <div class="ripple ripple-2" />
            <div class="ripple ripple-3" />
          </div>
        </template>
      </div>

      <!-- 当前绘制的矩形 -->
      <div
        v-if="currentRect && mode !== 'view'"
        class="annotation-rect drawing"
        :style="{
          left: `${currentRect.start_x}%`,
          top: `${currentRect.start_y}%`,
          width: `${currentRect.end_x - currentRect.start_x}%`,
          height: `${currentRect.end_y - currentRect.start_y}%`
        }"
      />
    </div>

    <!-- 悬浮卡片 -->
    <div
      v-if="hoveredRect"
      class="hover-card"
      :style="{
        left: `${hoveredRect.x}px`,
        top: `${hoveredRect.y - 60}px`
      }"
    >
      <div class="hover-card-content">
        {{ hoveredRect.rect.title }}
      </div>
      <div class="hover-card-arrow" />
    </div>

    <!-- 右键菜单 -->
    <div
      v-if="contextMenu.show && mode !== 'view'"
      class="context-menu"
      :style="{
        left: `${contextMenu.x}px`,
        top: `${contextMenu.y}px`
      }"
    >
      <div class="menu-item" @click="startEditing(contextMenu.targetIndex)">编辑</div>
      <div class="menu-item delete" @click="deleteRect(contextMenu.targetIndex)">删除</div>
    </div>

    <!-- 编辑对话框 -->
    <div v-if="editingRect && mode !== 'view'" class="edit-dialog">
      <div class="dialog-content">
        <h3>编辑标题</h3>
        <el-input class="mb-2" v-model="editingRect.title" type="text" placeholder="请输入标题" />
        <div class="flex mb-2">
          <el-select v-model="articleChannel">
            <el-option v-for="item in channels" :key="item.id" :label="item.title" :value="item.name" />
          </el-select>
          <el-button :disabled="!articleChannel" type="primary" plain @click="() => (articleDialogVisible = true)">
            {{ articleModel?.id ? "已绑定（重选）" : "选择绑定数据" }}
          </el-button>
        </div>
        <el-select
          :key="articleModel.id"
          v-if="articleModel.skus?.list.length"
          v-model="editingRect.target_article_sku_uuid"
          :disabled="!articleChannel"
          placeholder="请选择SKU"
          class="w-full mb-2"
        >
          <el-option v-for="item in articleModel.skus.list" :key="item.id" :label="item.title" :value="item.id">
            <div class="flex items-center">
              <img :src="`/disk/view?id=${item.cover}`" :alt="item.title" class="w-8 h-8 mr-2" />
              <div class="h-8 flex items-center">
                <div class="mr-2">{{ item.title }}</div>
                <div class="text-sm text-gray-500">￥{{ item.sale_price || "未设置" }}</div>
              </div>
            </div>
          </el-option>
        </el-select>
        <div class="dialog-buttons">
          <el-button @click="editingRect = null">取消</el-button>
          <el-button type="primary" @click="submitEdit">确定</el-button>
        </div>
      </div>
    </div>
  </div>

  <el-dialog fullscreen v-model="articleDialogVisible">
    <iframe :src="iframeUrl" />
  </el-dialog>
</template>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: calc(100vh - 80px);
}

.image-annotator {
  position: relative;
  display: inline-block;
  user-select: none;
  max-width: 100%;
  max-height: 100%;

  img {
    max-width: 100%;
    max-height: 100%;

    object-fit: contain;
  }
}

.annotation-image {
  display: block;
  max-width: 100%;
  height: auto;
  pointer-events: none;
}

.annotation-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
}

.annotation-rect {
  position: absolute;
  border: 2px solid var(--el-color-primary);
  background-color: rgba(4, 48, 103, 0.2);
  cursor: context-menu;
  pointer-events: all;
  z-index: 1;
}

.annotation-rect .title-label {
  font-size: 12px;
  color: #fff;
}

.annotation-rect.view-mode {
  border: none;
  background-color: transparent;
  cursor: default;
}

.annotation-rect.has-binding {
  border-color: #3080ff;
  background-color: rgba(48, 128, 255, 0.2);
}

.annotation-rect.has-binding.view-mode {
  border: none;
  background-color: transparent;
}

.binding-label {
  position: absolute;
  top: -20px;
  left: 0;
  background: #3080ff;
  color: white;
  padding: 0 4px;
  font-size: 12px;
  border-radius: 2px;
}

.annotation-rect.drawing {
  border-style: dashed;
  pointer-events: none;
}

/* 波纹点样式 */
.ripple-point {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.dot {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  position: absolute;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

.ripple {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-radius: 50%;
  animation: ripple 2s infinite;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

.ripple-2 {
  animation-delay: 0.5s;
}

.ripple-3 {
  animation-delay: 1s;
}

@keyframes ripple {
  0% {
    width: 16px;
    height: 16px;
    opacity: 1;
  }

  100% {
    width: 50px;
    height: 50px;
    opacity: 0;
  }
}

/* 悬浮卡片样式 */
.hover-card {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  transform: translateX(-50%);
  transition: opacity 0.2s;
}

.hover-card-content {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  max-width: 200px;
  word-break: break-word;
  text-align: center;
}

.hover-card-arrow {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.context-menu {
  position: fixed;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.delete {
  color: #ff4d4f;
}

.menu-item.delete:hover {
  background-color: #fff1f0;
}

.edit-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.dialog-content h3 {
  margin: 0 0 16px;
}
</style>
