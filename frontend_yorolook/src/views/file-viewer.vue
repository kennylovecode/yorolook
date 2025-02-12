<style lang="scss" scoped>
.app-container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
}
iframe {
  width: 100%;
  height: calc(100vh - 140px);
  outline: none;
  border: none;
}
</style>

<template>
  <div class="app-container">
    <vue-office-docx v-if="fileUrl" :src="fileUrl" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { requestNoBase } from "@/utils/service"
import VueOfficeDocx from "@vue-office/docx"
import "@vue-office/docx/lib/index.css"

const fileUrl = ref("")
const route = useRoute()
const testFileUrl =
  "https://view.officeapps.live.com/op/view.aspx?src=https://officeweb365.com/viewfile/深入浅出HTML5游戏开发.pptx"

onMounted(async () => {
  const { type } = route.query
  const { id } = route.params
  const method1Options = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf"
  ]
  if (method1Options.indexOf(type as string) > -1) {
    // 从服务器读取流
    const response = await requestNoBase<any>({
      url: `/disk/pre?id=${id}`,
      responseType: "blob"
    })
    fileUrl.value = URL.createObjectURL(response)
  } else {
    fileUrl.value = testFileUrl
  }
})
</script>
