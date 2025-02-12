<template>
  <router-link to="/shopping/cart">
    <el-badge :value="props.count" :max="props.max" :hidden="props.hide === 0">
    <el-tooltip effect="dark" content="购物车" placement="bottom">
      <el-icon>
        <ShoppingCart></ShoppingCart>
      </el-icon>
    </el-tooltip>
  </el-badge>
  </router-link>
</template>

<script lang="ts" setup>
const props = defineProps<{
  count?: number
  max?: number
  hide?: number
}>()
</script>
