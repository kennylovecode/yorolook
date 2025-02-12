<style lang="scss" scoped>
.privacy {
  .switch-group {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    border: var(--el-border);
    border-radius: 16px;
    position: relative;
    margin-bottom: 3rem;
    .title {
      position: absolute;
      top: -8px;
      left: 16px;
      padding: 0 20px;
      background: var(--el-bg-color);
      font-weight: bold;
      font-size: 14px;
    }
    .item {
      margin-right: 20px;
    }
  }
}
</style>
<template>
  <div class="privacy">
    <div class="switch-group">
      <div class="title">通用设置</div>
      <div class="item">
        <el-switch
          @change="submitForm"
          inline-prompt
          v-model="privacyForm.openPage"
          active-text="公开主页"
          inactive-text="关闭主页"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.openFollow"
          active-text="允许被关注"
          inactive-text="不允许被关注"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.openPlatform"
          active-text="允许链接到平台"
          inactive-text="不链接到平台"
          @change="submitForm"
        />
      </div>
    </div>
    <div class="switch-group">
      <div class="title">信息设置</div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showWebsite"
          active-text="显示网站"
          inactive-text="不显示网站"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showEmail"
          active-text="显示邮箱地址"
          inactive-text="不显示邮箱地址"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showMobile"
          active-text="显示手机号码"
          inactive-text="不显示手机号码"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showAddress"
          active-text="显示地址"
          inactive-text="不显示地址"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showBirthday"
          active-text="显示生日"
          inactive-text="不显示生日"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showCountry"
          active-text="显示国家"
          inactive-text="不显示国家"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showDescription"
          active-text="显示描述"
          inactive-text="不显示描述"
          @change="submitForm"
        />
      </div>
    </div>
    <div class="switch-group">
      <div class="title">列表设置</div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showFavorite"
          active-text="展示我的收藏"
          inactive-text="不展示我的收藏"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showFollowing"
          active-text="展示我的关注"
          inactive-text="不展示我的关注"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showFollower"
          active-text="展示我的粉丝"
          inactive-text="不展示我的粉丝"
          @change="submitForm"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showGallery"
          active-text="展示我的作品"
          inactive-text="不展示我的作品"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showBrand"
          active-text="展示我的品牌"
          inactive-text="不展示我的品牌"
        />
      </div>
      <div class="item">
        <el-switch
          inline-prompt
          v-model="privacyForm.showPublish"
          active-text="展示我的发布"
          inactive-text="不展示我的发布"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { setPrivacyApi } from "@/api/user"
import { AccountPrivacy } from "@/api/user/types"
import { useUserStore } from "@/store/modules/user"
import { onMounted, ref } from "vue"

const { accountInfo, setPrivacy, setPreference } = useUserStore()
const privacyForm = ref<AccountPrivacy>({
  openPage: true,
  openFollow: true,
  openPlatform: false,
  openProfile: false,
  showMobile: false,
  showEmail: false,
  showAddress: false,
  showBirthday: false,
  showCountry: false,
  showDescription: false,
  showWebsite: false,
  showFavorite: true,
  showFollowing: true,
  showFollower: true,
  showGallery: true,
  showBrand: false,
  showPublish: false
})
const requestTimeObj = ref<any>(0)
const submitForm = () => {
  if (requestTimeObj.value > 0) clearTimeout(requestTimeObj.value)
  requestTimeObj.value = setTimeout(async () => {
    const { code, data } = await setPrivacyApi(privacyForm.value)
    if (code > 0) {
      setPrivacy(data)
    }
  }, 1000)
}

onMounted(() => {
  console.log("privacy.onMounted")
  if (accountInfo.privacy) privacyForm.value = accountInfo.privacy
})
</script>
