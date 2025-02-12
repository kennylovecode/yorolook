<template>
  <div>
    <el-alert
      title="格式规范"
      type="info"
      description="多个选项信息使用换行分割，行内信息使用英文逗号分割。顺序依次为:
      名称|标题|色块代码|图片地址"
      show-icon
      :closable="false"
    />
    <el-input v-model="text" placeholder="输入需要导入的选项文本" show-word-limit type="textarea" :rows="12" />
    <el-button type="primary" size="default" @click="optionFormText">导入</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { AttributeOption } from "@/api/attribute/types"
import { addBatch } from "@/api/brand/attribute_option"

const props = defineProps<{
  attribute_uuid: string
}>()

const text = ref("")
const options = ref<AttributeOption[]>([])

const emits = defineEmits(["onSuccess"])
const optionFormText = () => {
  options.value = []
  if (text.value) {
    const optionLines = text.value.split("\n")
    optionLines.map((line, index) => {
      const option = line.split(",")
      const optionModel: AttributeOption = {
        name: option[0],
        title: option[1],
        rgba: option[2] || "",
        image: option[3] || "",
        attribute_uuid: props.attribute_uuid,
        display_order: index + 1
      }
      options.value.push(optionModel)
    })

    if (options.value.length > 0) {
      addBatch(options.value).then((result) => {
        emits("onSuccess", result.data)
      })
    }
  }
}
</script>
