<style lang="scss" scoped>
.keyword-selector {
  display: flex;
  position: relative;
  width: 100%;
  :deep(.el-select) {
    width: 100%;
  }
}
</style>
<template>
  <div class="keyword-selector">
    <el-select
      :max-collapse-tags="6"
      v-model="keywordsArray"
      multiple
      filterable
      allow-create
      default-first-option
      :reserve-keyword="false"
      placeholder="请输入关键词标签，输入后回车添加"
      @change="keywordsArrayChange"
    />
    <el-button type="primary" @click="imageKeywords">同步图片标签</el-button>
  </div>
</template>

<script lang="ts" setup>
import { getTags } from "@/api/directory"
import { onMounted } from "vue"
import { ref } from "vue"

const props = defineProps<{
  modelValue?: string
  images: string
}>()

const keywordsArray = ref<any[]>([])

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()
const keywordsArrayChange = () => {
  emits("update:modelValue", keywordsArray.value.join(","))
}

const imageKeywords = async () => {
  if (!props.images) {
    ElMessage.error("您并未选择任何图片...")
    return
  }
  const { data } = await getTags(props.images)
  data.forEach((item: any) => {
    const tmpArr = item.split(",")
    for (const tag of tmpArr) {
      if (!keywordsArray.value.includes(tag)) {
        keywordsArray.value.push(tag)
      }
    }
  })
}

onMounted(() => {
  if (props.modelValue) keywordsArray.value = props.modelValue?.split(",")
})
</script>
