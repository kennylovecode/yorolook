<script lang="ts" setup>
import { computed } from "vue"
import { usePreferenceStore } from "@/store/modules/preference"

const { preference } = usePreferenceStore()

const isLeft = computed(() => preference.layoutMode === "left")
const isTop = computed(() => preference.layoutMode === "top")
const isLeftTop = computed(() => preference.layoutMode === "left-top")

const emits = defineEmits(["onClick"])
const clickHandler = (mode: "left" | "top" | "left-top") => {
  emits("onClick", mode)
}
</script>

<template>
  <div class="select-layout-mode">
    <el-tooltip content="左侧模式">
      <el-container class="layout-mode left" :class="{ active: isLeft }" @click="clickHandler('left')">
        <el-aside />
        <el-container>
          <el-header />
          <el-main />
        </el-container>
      </el-container>
    </el-tooltip>
    <el-tooltip content="顶部模式">
      <el-container class="layout-mode top" :class="{ active: isTop }" @click="clickHandler('top')">
        <el-header />
        <el-main />
      </el-container>
    </el-tooltip>
    <el-tooltip content="混合模式">
      <el-container class="layout-mode left-top" :class="{ active: isLeftTop }" @click="clickHandler('left-top')">
        <el-header />
        <el-container>
          <el-aside />
          <el-main />
        </el-container>
      </el-container>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.select-layout-mode {
  display: flex;
  justify-content: space-between;
}

.layout-mode {
  width: 60px;
  flex-grow: 0;
  overflow: hidden;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid #00000000;
  &:hover {
    border: 2px solid var(--el-color-primary);
  }
}

.active {
  border: 2px solid var(--el-color-primary);
}

.el-header {
  height: 12px;
}

.el-aside {
  width: 16px;
}

.left {
  .el-header {
    background-color: var(--el-border-color);
  }
  .el-aside {
    background-color: var(--el-color-primary);
  }
  .el-main {
    background-color: var(--el-fill-color);
  }
}

.top {
  .el-header {
    background-color: var(--el-color-primary);
  }
  .el-main {
    background-color: var(--el-fill-color);
  }
}

.left-top {
  .el-header {
    background-color: var(--el-border-color);
  }
  .el-aside {
    background-color: var(--el-color-primary);
  }
  .el-main {
    background-color: var(--el-fill-color);
  }
}
</style>
