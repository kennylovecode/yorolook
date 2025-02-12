<style lang="scss" scoped>
.account-setup {
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
}
</style>
<template>
  <div class="account-setup">
    <div class="line">
      <span class="label">手机号：</span>
      <span class="value">
        {{ accountInfo.mobile }}
      </span>
    </div>
    <div class="line">
      <span class="label">用户名：</span>
      <span class="value">
        {{ accountInfo.username }}
      </span>
      <el-button v-if="accountInfo.rename" link type="primary" size="small">修改</el-button>
    </div>
    <div class="line">
      <span class="label">Email邮箱：</span>
      <span class="value">
        {{ accountInfo.email }}
      </span>
      <el-button link type="primary" size="small">绑定</el-button>
    </div>
    <div class="line">
      <span class="label">微信号：</span>
      <span class="value">
        {{ accountInfo.wechat || "未设置微信号" }}
      </span>
      <el-button link type="primary" size="small">设置</el-button>
    </div>
    <div class="line">
      <span class="label">网站：</span>
      <span class="value">
        {{ location.origin + "/user/" + accountInfo.username }}
      </span>
      <el-button link type="primary" size="small"
        @click="doCopy(`${location.origin}/user/${accountInfo.username}`)">复制</el-button>
    </div>
    <el-divider direction="horizontal" content-position="left" />
    <h3>设置个人账户主页背景</h3>
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
          <single-upload :success="uploadSuccess" title="背景图" auto style="display: none" :size="[1920, 480]"
            ratio="16/4" ref="uploadRef" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue"
import { useUserStoreHook } from "@/store/modules/user"
import singleUpload from "@/components/custom/single-upload.vue"
import { storeToRefs } from "pinia"
import { setBanners } from "@/api/user"

const { accountInfo } = storeToRefs(useUserStoreHook())
const uploadRef = ref<any>({})
const location = window.location
const bannersList = reactive<string[]>(["", "", "", "", "", ""])
let currentIndex = 0

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
const doCopy = (value: string) => {
  navigator.clipboard.writeText(value)
  ElMessage.success("复制成功")
}

const uploadSuccess = async (res: any) => {
  bannersList[currentIndex] = res.id
  accountInfo.value.profile.banners = bannersList.join(",")
  await setBanners({
    banners: accountInfo.value.profile.banners
  })
}
watch(accountInfo.value, (newValue) => {
  console.log(newValue)
})

onMounted(() => {
  const bannerArray = accountInfo.value.profile.banners?.split(",") || []
  for (const idx in bannerArray) {
    bannersList[Number(idx)] = bannerArray[Number(idx)]
  }
})
</script>
