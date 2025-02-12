<template>
  <div class="container">
    <h1>Image Annotator Demo</h1>
    <button @click="toggleMode" class="mode-toggle">
      {{ mode === "edit" ? "切换到查看模式" : "切换到编辑模式" }}
    </button>
    <ImageAnnotator v-model:rects="annotations" :image-url="imageUrl" :mode="mode" />
    <div class="annotations-info">
      <h3>Annotations:</h3>
      <pre>{{ JSON.stringify(annotations, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import ImageAnnotator from "@/components/custom/image-annotator.vue"
import { getList } from "@/api/image_labs"

const imageUrl = "http://ad.yorolook.com/upload/202011/03/202011031626438908.png"
const annotations = ref<any>([])
const mode = ref<"edit" | "view">("edit")
const toggleMode = () => {
  mode.value = mode.value === "edit" ? "view" : "edit"
}

onMounted(() => {
  getList("/upload/202011/03/202011031626438908.png").then((res) => {
    annotations.value = res.data
  })
})
</script>

<style>
.container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.mode-toggle {
  margin-bottom: 20px;
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.mode-toggle:hover {
  opacity: 0.9;
}

.annotations-info {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
