<template>
  <div :key="props.phone" class="sms-query" :class="{ enable: time < 0 }">
    <el-button link type="primary" size="default" @click="onQuery">{{ generateText }}</el-button>
  </div>
</template>
<style lang="scss" scoped>
.sms-query {
  padding: 0 20px;

  &.enable {
    :deep(.el-button) {
      span {
        color: var(--el-color-primary);
        text-decoration: underline;
      }
    }
  }
}
</style>
<script setup lang="ts">
import { computed, ref, watch, withDefaults } from "vue"
import { utilPost } from "@/api/common"
import { ElMessage } from "element-plus"

const props = withDefaults(
  defineProps<{
    phone: string
    type: "login" | "register" | "reset"
  }>(),
  {
    phone: "",
    type: "login"
  }
)

const time = ref(-1)
const generateText = computed(() => {
  if (time.value < 1) return "获取验证码"
  return `重新获取（${time.value}s）`
})

//const svg = `<svg class="circular" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="10" fill="none"></circle></svg>`

const onQuery = async () => {
  if (time.value > 0) return
  const phoneRegex = /^0?(1[0-9][0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/
  if (!phoneRegex.test(props.phone)) return ElMessage.error("您输入的手机号码有误,请重新输入...")
  const { data, code } = await utilPost("sms", props.type, props.phone)
  if (code && data) {
    if (time.value <= 0) time.value = 60
    ElMessage.success(`短信已发送至[${props.phone}]，请注意查收...`)
    return
  }
}

watch(time, () => {
  setTimeout(() => {
    time.value--
  }, 1000)
})
</script>
