<template>
  <el-form :model="passwordForm" ref="form" label-width="80px" :inline="false">
    <el-form-item label="新密码" prop="password">
      <el-input v-model="passwordForm.password" show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm_password">
      <el-input v-model="passwordForm.confirm_password" show-password />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model="passwordForm.code" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const passwordForm = reactive<any>({
  password: "",
  confirm_password: "",
  code: ""
})

const onSubmit = () => {
  console.log("submit!")
}
</script>
