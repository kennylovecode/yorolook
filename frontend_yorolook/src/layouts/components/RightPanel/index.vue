<script lang="ts" setup>
import { ref } from "vue"
import { Setting } from "@element-plus/icons-vue"

const show = ref(false)
</script>

<template>
  <el-icon @click="show = !show">
    <Setting />
  </el-icon>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
</style>
