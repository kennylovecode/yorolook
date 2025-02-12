<style lang="scss" scoped>
.image-gallery {
  background: var(--el-color-primary-light-9);
  display: flex;
  width: 100%;
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  padding: 16px;
  .list-container {
    height: 100%;
    width: 20%;
    overflow: hidden;
    .thumbnails {
      width: calc(100% - 32px);
      display: flex;
      padding: 0;
      list-style: none;
      flex-direction: column;
      gap: 16px;
      transition: transform 0.3s ease;
      li {
        padding: 0;
        margin: 0;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        width: 100%;
        padding-top: 100%;
        border-radius: 8px;
        &.active {
          &::before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            border: 1.5px solid var(--el-color-primary);
            z-index: 2;
            border-radius: 8px;
          }
        }

        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .main-preview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
<template>
  <div class="image-gallery">
    <div class="list-container">
      <ul class="thumbnails">
        <li
          v-for="(item, index) in props.images"
          :key="index"
          :class="{ active: item === currentPreviewURL }"
          @click="setPreviewUrl(item, index)"
        >
          <img :src="`/disk/view?id=${item}&w=300`" alt="" />
        </li>
      </ul>
    </div>
    <div :key="currentPreviewURL" class="main-preview">
      <!--img :src="`/disk/view?id=${currentPreviewURL}&w=1400`" alt="" /-->
      <image-annotator
        @on-loaded="handleLabsLoaded"
        :key="currentPreviewURL"
        :mode="edit ? 'edit' : 'view'"
        :image-url="currentPreviewURL"
        :width="1400"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue"
import imageAnnotator from "./image-annotator.vue"

const currentPreviewURL = ref<string>("")
const props = defineProps<{
  id?: string
  edit?: boolean
  images: string[]
}>()

onMounted(() => {
  if (props.id) {
    currentPreviewURL.value = props.id
  } else {
    currentPreviewURL.value = props.images[0]
  }
})

const translateY = ref<number>(0)
const setPreviewUrl = (id: string, idx: number) => {
  currentPreviewURL.value = id
  if (idx >= 3 && props.images.length > 5) {
    translateY.value = (idx - 3) * -100
  }
}

const emits = defineEmits(["onLabsLoaded"])
const handleLabsLoaded = (rects: any[]) => {
  emits("onLabsLoaded", rects)
}

defineExpose({
  setPreviewUrl
})
</script>
