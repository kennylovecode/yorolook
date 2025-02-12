<script lang="ts" setup>
import { watchEffect, ref } from "vue"
import LayoutModeSelect from "./layout-mode-selector.vue"
import { Refresh } from "@element-plus/icons-vue"
import { setPreferenceApi } from "@/api/user"
import { usePreferenceStore } from "@/store/modules/preference"
import { ElMessageBox, ElMessage } from "element-plus"
import { AccountPreference } from "@/api/user/types"

/** 使用 storeToRefs 将提取的属性保持其响应性 */
const { preference, setPreference, resetPreference } = usePreferenceStore()

/** 定义 switch 设置项 */
const switchPreferenceLabels = {
  显示标签栏: "showTagsView",
  "显示 Logo": "showLogo",
  "固定 Header": "fixedHeader",
  "显示页脚 Footer": "showFooter",
  显示消息通知: "showNotify",
  显示切换主题按钮: "showThemeSwitch",
  显示全屏按钮: "showScreenfull",
  显示搜索按钮: "showSearchMenu",
  是否缓存标签栏: "cacheTagsView",
  开启系统水印: "showWatermark",
  显示灰色模式: "showGreyMode",
  显示色弱模式: "showColorWeakness"
}

const requestTimeObj = ref<any>(0)
const submitForm = () => {
  if (requestTimeObj.value > 0) {
    clearTimeout(requestTimeObj.value)
  }
  requestTimeObj.value = setTimeout(async () => {
    const { code, data } = await setPreferenceApi(preference)
    if (code) {
      setPreference(data)
    }
  }, 1000)
}
const changeMode = (mode: "left" | "top" | "left-top") => {
  preference.layoutMode = mode
  submitForm()
}

const resetHandler = () => {
  ElMessageBox.confirm("该操作将还原系统默认偏好设置，请问是否继续操作？", "warning", {
    confirmButtonText: "继续",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      resetPreference()
      submitForm()
      ElMessage.success("已还原系统默认偏好设置")
    })
    .catch(() => {
      ElMessage.success("您取消了操作...")
    })
}

/** 非左侧模式时，Header 都是 fixed 布局 */
watchEffect(() => {
  preference.layoutMode !== "left" && (preference.fixedHeader = true)
})
</script>

<template>
  <div class="setting-container">
    <h4>布局配置</h4>
    <LayoutModeSelect @on-click="changeMode" />
    <el-divider />
    <h4>功能配置</h4>
    <div class="setting-item" v-for="(settingValue, settingName, index) in switchPreferenceLabels" :key="index">
      <span class="setting-name">{{ settingName }}</span>
      <el-switch
        @change="submitForm"
        v-model="preference[settingValue as keyof AccountPreference]"
        :disabled="preference.layoutMode !== 'left' && settingName === '固定 Header'"
      />
    </div>
    <el-button type="primary" :icon="Refresh" @click="resetHandler">重 置</el-button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.setting-container {
  padding: 20px;
  .setting-item {
    font-size: 14px;
    color: var(--el-text-color-regular);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-name {
      @extend %ellipsis;
    }
  }
  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
