<style lang="scss" scoped>
.profile-area {
  .title {
    display: flex;
    align-items: center;

    .avatar {
      margin-right: 16px;
      width: 80px;
      height: 80px;

      .el-avatar {
        font-size: 40px;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 70px;

      h1 {
        padding: 0;
        margin: 0;
        font-size: 28px;
        font-weight: 800;
        word-break: break-all;
        margin: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.6rem;
      }

      > div {
        height: 20px;
        line-height: 20px;
        font-size: 0.8rem;
        font-weight: 600;

        .num {
          text-decoration: underline;
          padding: 0 5px;
        }
      }
    }
  }

  .line {
    &.identy {
      margin-top: 16px;
      color: var(--el-text-color);

      > div {
        display: flex;
        align-items: center;
      }
    }

    font-size: 0.8rem;
    color: var(--el-text-color-secondary);
    padding: 8px 0;

    &.control {
      margin-top: 16px;
    }
  }
}
</style>

<template>
  <div class="profile-area">
    <div class="title">
      <div class="avatar">
        <el-avatar
          v-if="displayInfo?.profile.avatar"
          :src="`/disk/view?id=${displayInfo?.profile.avatar}`"
          :size="80"
          icon="el-icon-user-solid"
          shape="circle"
          fit="fill"
        />
        <el-avatar v-if="!displayInfo?.profile.avatar && displayInfo?.profile.nickname" :size="80">{{
          displayInfo?.profile.nickname[0]
        }}</el-avatar>
      </div>
      <div class="content">
        <h1>{{ displayInfo?.profile.nickname }}</h1>
        <div>
          <span>{{ props.isOwner ? "我" : "TA" }}关注了</span>
          <span class="num">{{ formatNum(displayInfo?.following_count) }}</span>
          <span>人</span>
          ·
          <span>{{ props.isOwner ? "我" : "TA" }}有</span>
          <span class="num">{{ formatNum(displayInfo?.follower_count) }}</span>
          <span>位粉丝</span>
          ·
          <span>{{ props.isOwner ? "我" : "TA" }}有</span>
          <span class="num">{{ formatNum(displayInfo?.access_count) }}</span>
          <span>位访客</span>
        </div>
      </div>
    </div>
    <div class="line identy">
      <div>
        <img src="/default0.png" alt="" width="20px" height="20px" style="margin-right: 3px" />
        <span>个人职业：{{ displayInfo?.profile.occupation || "未填写职业信息" }}</span>
      </div>
    </div>
    <div class="line">
      手机号：<span>{{ displayInfo?.mobile }}</span> 微信：<span>{{ displayInfo?.wechat }}</span> Email:
      <span>{{ displayInfo?.email }}</span>
    </div>
    <div class="line">个人网站：{{ displayInfo?.profile.website }}</div>
    <div class="line overview">
      <div>{{ displayInfo?.profile.description || "这位用户很内向~没有留下任何介绍~" }}</div>
    </div>
    <div v-if="props.isOwner" class="line disk">
      <el-progress style="margin: 8px 0" :text-inside="true" :stroke-width="26" :percentage="70">
        <template #default="{ percentage }">
          <span class="percentage-value">已使用 70G</span>
          <span style="margin: 0 1rem"> / </span>
          <span class="percentage-label">总空间 100G</span>
        </template>
      </el-progress>
    </div>
    <div class="line control" v-if="props.isOwner">
      <el-button type="primary" size="default" plain @click="router.push({ name: 'UserSettings' })">账户设置</el-button>
      <el-button type="primary" size="default">分享</el-button>
    </div>
    <div class="line control" v-else>
      <el-button type="primary" size="default" plain>私信</el-button>
      <el-button type="primary" size="default" plain>分享</el-button>
      <el-button v-if="props.privacy.openFollow" type="primary" size="default">关注TA</el-button>
      <el-button type="primary" size="default" plain>侵权&举报</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Account, AccountPrivacy } from "@/api/user/types"
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const props = defineProps<{
  isOwner: boolean
  privacy: AccountPrivacy
  info?: Account
}>()
const router = useRouter()
const displayInfo = ref<Account>()

const formatNum = (num?: number) => {
  if (!num) return "0"
  if (num < 1000) return num.toString()
  if (num >= 1000 && num < 10000) return (num / 1000).toFixed(2) + "k+"
  return (num / 10000).toFixed(2) + "w+"
}

onMounted(async () => {
  if (props.info) {
    displayInfo.value = props.info
  }
})
</script>
