<script lang="ts" setup>
import { computed, watchEffect } from "vue"
import { useAppStore } from "@/store/modules/app"
import useResize from "./hooks/useResize"
import { useWatermark } from "@/hooks/useWatermark"
import LeftMode from "./LeftMode.vue"
import TopMode from "./TopMode.vue"
import LeftTopMode from "./LeftTopMode.vue"
import { DeviceEnum } from "@/constants/app-key"
import { getCssVariableValue, setCssVariableValue } from "@/utils"
import { storeToRefs } from "pinia"
import { usePreferenceStore } from "@/store/modules/preference"

/** Layout 布局响应式 */
useResize()
const { setWatermark, clearWatermark } = useWatermark()

const appStore = useAppStore()
const { preference } = storeToRefs(usePreferenceStore())

const classes = computed(() => {
  return {
    showGreyMode: preference.value.showGreyMode,
    showColorWeakness: preference.value.showColorWeakness
  }
})

//#region 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVariableName = "--v3-tagsview-height"
const v3TagsviewHeight = getCssVariableValue(cssVariableName)
watchEffect(() => {
  preference.value.showTagsView
    ? setCssVariableValue(cssVariableName, v3TagsviewHeight)
    : setCssVariableValue(cssVariableName, "0px")
})
//#endregion

/** 开启或关闭系统水印 */
watchEffect(() => {
  preference.value.showWatermark ? setWatermark(import.meta.env.VITE_APP_TITLE) : clearWatermark()
})
</script>

<template>
  <div :class="classes">
    <!-- 左侧模式 -->
    <LeftMode v-if="appStore.device === DeviceEnum.Mobile || preference.layoutMode === 'left'" />
    <!-- 顶部模式 -->
    <TopMode v-else-if="preference.layoutMode === 'top'" />
    <!-- 混合模式 -->
    <LeftTopMode v-else-if="preference.layoutMode === 'left-top'" />
    <!-- 右侧设置面板 -->
  </div>
</template>

<style lang="scss" scoped>
.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}
</style>
