<style lang="scss" scoped>
.avatar-uploader {
  display: flex;
  width: 100%;
  height: 120px;
  justify-content: center;
  position: relative;
  :deep(.el-avatar) {
    font-size: calc(var(--el-avatar-size) / 2);
  }

  .overlay {
    width: 120px;
    height: 120px;
    position: absolute;
    background: rgba($color: #000, $alpha: 0.5);
    text-align: center;
    line-height: 120px;
    border-radius: 50%;
    color: #fff;
    transition: all 0.35s;
    z-index: 100;
  }

  .el-avatar + .overlay {
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  }
}

.control {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
}
</style>
<template>
  <div class="profile">
    <el-form ref="formRef" :model="userProfile" :rules="rules" label-width="80px" label-position="top">
      <el-form-item prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="/disk/upload"
          :headers="uploadHeaders"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-avatar v-if="userProfile.avatar" :src="`/disk/view?id=${userProfile.avatar}`" :size="120" />
          <el-avatar v-if="!userProfile.avatar && userProfile.nickname" :size="120">{{
            userProfile.nickname[0]
          }}</el-avatar>
          <div class="overlay">更换头像</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="userProfile.gender" size="large">
          <el-radio-button label="男" value="1" />
          <el-radio-button label="女" value="0" />
          <el-radio-button label="保密" value="255" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userProfile.nickname" placeholder="请输入昵称..." />
      </el-form-item>
      <el-form-item label="姓名" prop="realname">
        <el-input v-model="userProfile.realname" placeholder="请输入真实姓名..." />
      </el-form-item>
      <el-form-item label="身份证ID" prop="idcard">
        <el-input v-model="userProfile.idcard" placeholder="请输入您的身份证ID..." />
      </el-form-item>
      <el-form-item label="我的职业" prop="occupation">
        <el-select
          v-model="userProfile.occupation"
          value-key="text"
          placeholder="选择您的职业身份"
          clearable
          filterable
        >
          <el-option v-for="item in userOccupations.options" :key="item.key" :label="item.text" :value="item.text" />
        </el-select>
      </el-form-item>
      <el-form-item label="我的网站" prop="website">
        <el-input v-model="userProfile.website" placeholder="请输入您的网站地址..." />
      </el-form-item>
      <el-form-item label="个人描述" prop="description">
        <el-input
          v-model="userProfile.description"
          placeholder="请输入您的详细介绍..."
          maxlength="200"
          show-word-limit
          type="textarea"
          :rows="3"
        />
      </el-form-item>
      <el-form-item>
        <div class="control">
          <el-button type="primary" size="default" @click="submitForm()">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import { ElMessage, FormInstance, FormRules } from "element-plus"
import { saveAccountProfileApi } from "@/api/user"
import { useUserStore } from "@/store/modules/user"
import type { AccountProfile } from "@/api/user/types"
import { getByKey } from "@/api/dictionary"

const { accountInfo, tokenInfo, setProfile } = useUserStore()

/** user profile form ref<UserProfile> */
const userProfile = reactive<AccountProfile>({
  banners: "",
  avatar: "",
  nickname: "",
  realname: "",
  idcard: "",
  gender: "保密",
  age: 0,
  birthday: "",
  website: "",
  wechat: "",
  description: "",
  occupation: ""
})
/** form component ref */
const formRef = ref<FormInstance>()
/** form component rules */
const rules: any = {
  nickname: [
    {
      required: true,
      message: "请输入昵称",
      trigger: "blur"
    }
  ],
  realname: [
    {
      required: true,
      message: "请输入真实姓名",
      trigger: "blur"
    }
  ],
  idcard: [
    {
      required: true,
      message: "请输入身份证号",
      trigger: "blur"
    },
    /** china idcard check */
    {
      validator: (rule: FormRules, value: string, callback: Function) => {
        if (!value) {
          callback(new Error("请输入身份证号"))
        }
        if (
          !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
        ) {
          callback(new Error("身份证号格式不正确"))
        }
        return true
      }
    }
  ]
}
const userOccupations = ref<any>({})

const handleAvatarSuccess = (data: any) => {
  userProfile.avatar = data.id
}
const beforeAvatarUpload = () => {}
const uploadHeaders = {
  Authorization: "Bearer " + tokenInfo.accessToken
}

const emits = defineEmits(["onSuccess", "onError"])
/** valid rule and submit form function */
const submitForm = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate(async (valid, fields) => {
      if (valid) {
        saveAccountProfileApi(userProfile)
          .then((res) => {
            ElMessage.success("账户资料已成功保存~")
            const { data } = res
            setProfile(data)
            resolve(res)
            emits("onSuccess", res)
          })
          .catch((err) => {
            ElMessage.error("保存失败，请重试...")
            reject(err)
            emits("onError", err)
          })
      } else {
        console.log("error submit!", fields)
      }
    })
  })
}

onMounted(async () => {
  for (const key in userProfile) {
    ;(userProfile as any)[key] = accountInfo.profile[key]
  }

  const { data } = await getByKey("user_occupation")
  userOccupations.value = data
})

defineExpose({ submitForm })
</script>
