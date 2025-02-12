<style lang="scss" scoped>
.attribute-table {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .attribute-item {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--el-border-color);

    .label {
      width: 34%;
      max-width: 120px;
      background-color: var(--el-color-info-light-9);
      min-height: 50px;
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      text-align: left;
      color: var(--el-color-black);
    }

    .value {
      width: 100%;
      padding: 0 24px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      text-align: left;
    }
  }
}
</style>

<template>
  <div class="attribute-table">
    <div v-for="(item, index) in attributes" :key="index" class="attribute-item">
      <div class="label">{{ item.title }}</div>
      <div class="value">{{ item.value }}</div>
    </div>
    <div v-if="attributes.length % 2 > 0" class="attribute-item">
      <div class="label" />
      <div class="value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"

interface IAttributeField {
  name: string
  title: string
  value: string
}
const props = defineProps<{
  attributes?: IAttributeField[]
  edit?: boolean
}>()

const attributes = ref<IAttributeField[]>([
  {
    name: "brand",
    title: "品牌",
    value: "林峰"
  },
  {
    name: "color",
    title: "颜色",
    value: "白色"
  },
  {
    name: "size",
    title: "尺寸",
    value: "L"
  },
  {
    name: "weight",
    title: "重量",
    value: "1.5kg"
  },
  {
    name: "material",
    title: "材质",
    value: "布"
  }
])

onMounted(() => {
  if (props.attributes) attributes.value = props.attributes
})
</script>
