<style lang="scss" scoped>
.brand-selector {
  width: 100%;
}
</style>

<template>
  <div class="brand-selector">
    <el-select
      @change="change"
      :multiple-limit="1"
      v-model="selectedOption"
      placeholder="请选择品牌"
      multiple
      filterable
      remote
      reserve-keyword
      :remote-method="remoteMethod"
      style="width: 100%"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import { getList, search } from "@/api/brand"
import { ListRequest } from "@/api/brand/types"

const props = defineProps<{
  modelValue: string
}>()

const options = ref<
  {
    value: string
    label: string
  }[]
>([])

const selectedOption = ref<string[]>(props.modelValue?.split(",") || [])

const searchQuery = reactive<
  ListRequest & {
    my: boolean
  }
>({
  idx: 1,
  size: 100,
  catalog: "",
  keywords: "",
  type: "",
  attributes: {},
  initial: "",
  country: "",
  area: "",
  my: true,
  status: -1,
  sort: "display_order"
})

const emits = defineEmits(["change", "update:modelValue"])
const change = () => {
  emits("update:modelValue", selectedOption.value.join(","))
  emits("change", selectedOption.value)
}

const remoteMethod = (keyword: string) => {
  options.value = []
  search(keyword).then((res) => {
    options.value = res.data.map((x: any) => {
      return {
        value: x.id,
        label: x.title
      }
    })
  })
}

onMounted(() => {
  if (props.modelValue) selectedOption.value = props.modelValue?.split(",")
  search(props.modelValue).then((res) => {
    options.value = res.data.map((x: any) => {
      return {
        value: x.id,
        label: x.title
      }
    })
  })
})
</script>
