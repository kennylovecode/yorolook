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

.line {
  display: flex;
  font-size: 14px;
  height: 36px;
  align-items: center;

  .value {
    padding: 0 30px 0 3px;
    min-width: 100px;
  }

  :deep(.el-button) {
    &.is-link {
      span {
        text-decoration: underline;
      }
    }
  }

  &.auto {
    height: auto;
    align-items: flex-start;
  }

  .banner-preview-list {
    width: 100%;

    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      flex-wrap: wrap;

      li {
        width: 320px;
        margin: 0 8px;

        .el-image {
          width: 100%;
          aspect-ratio: 16/4;
          display: flex;
          justify-content: center;
          align-items: center;
          border: dashed 1px var(--el-text-color-placeholder);
          border-radius: 8px;
        }

        .control {
          padding: 8px 0;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
<template>
  <div class="profile">
    <el-form ref="formRef" :model="supplierProfile" :rules="rules" label-width="80px" label-position="top">
      <el-form-item prop="logo">
        <el-upload
          class="avatar-uploader"
          action="/disk/upload"
          :headers="uploadHeaders"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="supplierProfile.logo" :src="`/disk/view?id=${supplierProfile.logo}`" :size="120" />
          <img v-if="!supplierProfile.logo && supplierProfile.title" :size="120" />
          <div class="overlay">设置LOGO</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商家名称" prop="title">
        <el-input v-model="supplierProfile.title" placeholder="请输入您的商户名" size="default" clearable />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="所在国家" prop="country">
            <el-input v-model="supplierProfile.country" placeholder="请输入所在国家" size="default" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="所在省份" prop="province">
            <el-input v-model="supplierProfile.province" placeholder="请输入所在省份" size="default" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="所在城市" prop="city">
            <el-input v-model="supplierProfile.city" placeholder="请输入所在城市" size="default" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="您的商户注册所在详细地址" prop="address">
        <el-input
          v-model="supplierProfile.address"
          placeholder="请输入您的商户注册所在详细地址（包含省/市/区/街道/楼号/门牌号）"
          clearable
        />
      </el-form-item>
      <el-form-item label="邮编" prop="postcode" />
      <el-form-item label="外部网站" prop="domain" />
      <el-form-item label="联系人管理" prop="contacts" />
      <el-form-item label="银行账户管理" prop="banks" />
      <el-form-item label="商家证件" prop="certificate" />
      <el-form-item label="实收税点" prop="certificate" />
      <el-form-item label="票面税点" prop="certificate" />
      <el-form-item label="默认折扣" prop="discount" />
      <el-form-item label="折扣备注" prop="discount_remark" />
    </el-form>
    <el-divider direction="horizontal" content-position="left" />
    <h3>设置商家主页背景</h3>
    <div class="line auto">
      <div class="banner-preview-list">
        <ul>
          <li v-for="(item, index) in bannersList" :key="index">
            <el-image :src="`/disk/view?id=${item}`" fit="fill">
              <template #error>
                <div style="color: var(--el-text-color-placeholder)">未设置背景图片</div>
              </template>
            </el-image>
            <div class="control">
              <el-button link type="primary" size="small" @click="doUpload(index)">上传</el-button>
              <el-button link type="info" size="small" @click="doClear(index)">清除</el-button>
            </div>
          </li>
          <single-upload
            :success="uploadSuccess"
            title="背景图"
            auto
            style="display: none"
            :size="[1920, 1440]"
            ratio="4/3"
            ref="uploadRef"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useUserStore } from "@/store/modules/user"
import { setBanners } from "@/api/user"

const { accountInfo, tokenInfo } = useUserStore()
const bannersList = reactive<string[]>(["", "", "", "", "", ""])
/** supplier profile */
const supplierProfile = reactive<any>({
  id: "",
  title: "",
  account_uuid: "",
  country: "",
  province: "",
  city: "",
  address: "",
  postcode: "",
  contacts: [],
  banks: [],
  domain: "",
  logo: "",
  banners: [],
  certificate: "",
  face_tax_point: 0,
  real_tax_point: 0,
  discount: 0,
  discount_remark: "",
  other_message: [],
  display_order: 0
})
const uploadRef = ref<any>({})

const rules = reactive({
  title: [{ required: true, message: "请输入供应商名称", trigger: "blur" }],
  account_uuid: [{ required: true, message: "请选择关联账号", trigger: "blur" }],
  country: [{ required: true, message: "请选择所在国家", trigger: "blur" }],
  province: [{ required: true, message: "请选择所在省份", trigger: "blur" }],
  city: [{ required: true, message: "请选择所在城市", trigger: "blur" }],
  contacts: [{ required: true, message: "您需要至少填写一位联系人...", trigger: "blur" }],
  banks: [{ required: true, message: "您需要至少填写一个银行账户信息...", trigger: "blur" }],
  real_tax_point: [{ required: true, message: "您需要填写收票税点信息...", trigger: "blur" }]
})

const handleAvatarSuccess = (data: any) => {
  supplierProfile.logo = data.id
}
const beforeAvatarUpload = () => {}
const uploadHeaders = {
  Authorization: "Bearer " + tokenInfo.accessToken
}

let currentIndex = 0
const uploadSuccess = async (res: any) => {
  bannersList[currentIndex] = res.id
  accountInfo.value.profile.banners = bannersList.join(",")
  await setBanners({
    banners: accountInfo.value.profile.banners
  })
}

const doUpload = (index: number) => {
  currentIndex = index
  uploadRef.value!.$el.querySelector('input[type="file"]').click()
}
const doClear = async (index: number) => {
  bannersList[index] = ""
  accountInfo.value.profile.banners = bannersList.join(",")
  await setBanners({
    banners: accountInfo.value.profile.banners
  })
}
</script>
