<style scoped lang="scss">
.price-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 8px;
}
</style>
<template>
  <el-popover ref="popoverRef" placement="bottom-start" title="价格区间" :width="260" trigger="click">
    <template #reference>
      <el-button v-if="!priceLimit.min && !priceLimit.max" type="primary" plain size="small">价格区间 </el-button>
      <el-button v-if="priceLimit.min && priceLimit.max" type="primary" plain size="small"
        >价格在 <span>{{ `${priceLimit.min} - ${priceLimit.max}` }}</span> 之间</el-button
      >
      <el-button v-if="priceLimit.min && !priceLimit.max" type="primary" plain size="small"
        >价格高于 <span>{{ priceLimit.min }}</span>
      </el-button>
      <el-button v-if="!priceLimit.min && priceLimit.max" type="primary" plain size="small"
        >价格低于 <span>{{ priceLimit.max }}</span>
      </el-button>
    </template>
    <div class="chooses-box">
      <div class="price-box">
        <el-input size="small" v-model.number="tmp.min" placeholder="最低价" />
        <span>—</span>
        <el-input size="small" v-model.number="tmp.max" placeholder="最高价" />
      </div>
      <div class="confirm-box">
        <el-button type="info" plain size="small" @click="handleClear">清除</el-button>
        <el-button type="primary" plain size="small" @click="handleConfirm">确定</el-button>
      </div>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"

const tmp = reactive<{
  min: number
  max: number
}>({
  min: 0,
  max: 0
})
const priceLimit = reactive<{
  min: number
  max: number
}>({
  min: 0,
  max: 0
})
const popoverRef = ref()
const emits = defineEmits(["onConfirm"])

const handleConfirm = () => {
  priceLimit.min = tmp.min
  priceLimit.max = tmp.max
  emits("onConfirm", priceLimit)
  popoverRef.value?.hide()
}
const handleClear = () => {
  tmp.min = 0
  tmp.max = 0
  priceLimit.min = 0
  priceLimit.max = 0
  emits("onConfirm", priceLimit)
  popoverRef.value?.hide()
}
</script>
