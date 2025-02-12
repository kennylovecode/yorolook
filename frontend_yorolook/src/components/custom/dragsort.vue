<script setup lang="ts">
import { ref, computed } from "vue"
import { ElMessage } from "element-plus"
import { Delete } from "@element-plus/icons-vue"

interface Props {
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ""
})

const emit = defineEmits(["update:modelValue"])

const draggedItem = ref<number | null>(null)
const dragOverItem = ref<number | null>(null)

const imageList = computed({
  get: () => props.modelValue.split(","),
  set: (value) => {
    emit("update:modelValue", value.join(","))
  }
})

const handleDragStart = (index: number, e: DragEvent) => {
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = "move"
    draggedItem.value = index
  }
}

const handleDragOver = (index: number, e: DragEvent) => {
  e.preventDefault()
  dragOverItem.value = index
}

const handleDrop = (index: number, e: DragEvent) => {
  e.preventDefault()

  if (draggedItem.value === null || draggedItem.value === index) return

  const newList = [...imageList.value]
  const [movedItem] = newList.splice(draggedItem.value, 1)
  newList.splice(index, 0, movedItem)

  imageList.value = newList
  draggedItem.value = null
  dragOverItem.value = null

  ElMessage.success("排序已更新")
}

const handleDragEnd = () => {
  draggedItem.value = null
  dragOverItem.value = null
}

const isDragging = (index: number) => draggedItem.value === index
const isDropTarget = (index: number) => dragOverItem.value === index
</script>

<template>
  <div class="draggable-image-list">
    <div class="image-grid">
      <div
        v-for="(image, index) in imageList"
        :key="index"
        class="image-item"
        :class="{
          'is-dragging': isDragging(index),
          'is-drop-target': isDropTarget(index)
        }"
        draggable="true"
        @dragstart="handleDragStart(index, $event)"
        @dragover="handleDragOver(index, $event)"
        @drop="handleDrop(index, $event)"
        @dragend="handleDragEnd"
      >
        <el-image :src="`/disk/view?id=${image}&w=300`" fit="cover" class="image">
          <template #error>
            <div class="image-error">
              <el-icon><Delete /></el-icon>
              <span>加载失败</span>
            </div>
          </template>
        </el-image>
        <div class="image-overlay">
          <el-icon class="drag-handle"><i-ep-d-arrow-left /></el-icon>
          <span class="order-number">{{ index + 1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.draggable-image-list {
  width: 100%;
  padding: 16px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 16px;
}

.image-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: move;
  background-color: #f5f7fa;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.image-item.is-dragging {
  opacity: 0.5;
  transform: scale(0.95);
}

.image-item.is-drop-target {
  border-color: var(--el-color-primary);
}

.image {
  width: 100%;
  height: 100%;
}

.image-error {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.image-item:hover .image-overlay {
  opacity: 1;
}

.drag-handle {
  font-size: 24px;
  color: #fff;
}

.order-number {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}
</style>
