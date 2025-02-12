<style lang="scss" scoped>
.user-panel {
  padding: 24px 24px 16px;
  min-width: 394px;
  .title {
    display: flex;
    .avatar {
      margin-right: 8px;
      a {
        display: flex;
        font-size: 0;
        &:hover {
          opacity: 0.85;
        }
      }
      .el-avatar{
        font-size: 24px;
      }
    }
    .content {
      flex: 1 1;
      color: var(--el-text-color-primary);
      a {
        font-size: 0.9rem;
        font-weight: bold;
        padding: 0;
        margin: 0;
        height: 26px;
        display: flex;
        align-items: center;
      }
      .rank{
        display: flex;
        border: solid 1px var(--el-text-color-primary);
        align-items: center;
        margin-right: .5rem;
        padding: 0 .5rem;
        border-radius: 3px;
        &.super{
          border: solid 1px var(--el-text-color-danger);
          color: var(--el-text-color-danger);
        }
      }
    }
  }

  .content {
    .counter {
      width: 100%;
      padding: 8px 0;
      margin-top: 1rem;
      ul {
        list-style: none;
        display: flex;
        width: 100%;
        padding: 0;
        margin: 0;
        li {
          width: 100%;
          a {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
            > span {
              display: block;
              width: 100%;
              text-align: center;
              &:last-child {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .vip {
      background: linear-gradient(to bottom, rgba(253, 184, 246, 0.1), rgb(251, 251, 251));
    }
    .company {
      background: linear-gradient(to bottom, rgba(190, 255, 188, 0.1), rgb(251, 251, 251));
    }
    .supplier {
      background: linear-gradient(to bottom, rgba(133, 190, 246, 0.1), rgb(251, 251, 251));
    }
    .member-area {
      padding: 0 30px;
      max-width: 100%;
      height: 100px;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      img {
        margin-right: 8px;
      }
      .info {
        display: flex;
        flex-wrap: wrap;
        height: 48px;
        width: 100%;
        color: var(--el-text-color-primary);
        > div {
          width: 100%;
          height: 24px;
          &.title {
            font-size: 0.9rem;
            font-weight: bold;
          }
          &.tips {
            color: var(--el-text-color-secondary);
          }
        }
      }
    }
  }

  .footer {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
<template>
  <div class="user-panel" :key="accountInfo?.type_id">
    <div class="title">
      <div class="avatar">
        <router-link to="/user/profile">
          <el-avatar
            v-if="accountInfo?.profile.avatar"
            :size="48"
            icon="el-icon-user-solid"
            shape="circle"
            :src="`/disk/view?id=${accountInfo.profile?.avatar}`"
            fit="fill"
          >
            user
          </el-avatar>
          <el-avatar v-if="!accountInfo?.profile.avatar && accountInfo?.profile.nickname" :size="48">{{ accountInfo?.profile.nickname[0]
            }}</el-avatar>
        </router-link>
      </div>
      <div class="content">
        <router-link :to="`/user/${accountInfo?.id}/publish`">
          <div class="rank" :class="{ super: currentRank?.type_rank.weight>0}">
            <span>{{ currentRank?.type_rank.title }}</span>
            <span>{{ currentType.title }}</span>
          </div>
          <span>{{ accountInfo?.profile.nickname }}</span>
          <el-icon><ArrowRight /></el-icon>
        </router-link>
        <div>
          <span>{{ accountInfo?.profile.occupation }}</span>
          <span style="margin: 0 8px">|</span>
          <span>用户ID：{{ accountInfo?.username }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="counter">
        <ul>
          <li>
            <router-link :to="`/user/${accountInfo?.id}/publish`"><span>0+</span><span>发布</span></router-link>
          </li>
          <li>
            <router-link :to="`/user/${accountInfo?.id}/favorite`"><span>0+</span><span>收藏</span></router-link>
          </li>
          <li>
            <router-link :to="`/user/${accountInfo?.id}/gallery`"><span>0+</span><span>图册</span></router-link>
          </li>
          <li>
            <router-link :to="`/user/${accountInfo?.id}/history`"><span>0+</span><span>历史</span></router-link>
          </li>
        </ul>
      </div>
      <div class="vip member-area">
        <img src="/default0.png" alt="" width="48px" height="48px" />
        <div class="info">
          <div class="title">个人会员</div>
          <div class="tips">开通会员，享受更多权益</div>
        </div>
        <template v-if="hasType('default')" >
          <el-button v-if="currentType.name!=='default'" type="danger" size="default" @click="switchType('default')">切换身份</el-button>
          <el-button v-else type="primary" size="default"  :disabled="true" plain>当前身份</el-button>
        </template>
        <el-button v-else type="primary" size="default" @click="router.push('/join?t=vip')" plain>升级会员</el-button>
      </div>
      <div class="company member-area">
        <img src="/company.png" alt="" width="48px" height="48px" />
        <div class="info">
          <div class="title">企业会员</div>
          <div class="tips">开通企业会员，享受更多权益</div>
        </div>
        <template v-if="hasType('company')" >
          <el-button v-if="currentType.name!=='company'" type="danger" size="default" @click="switchType('company')">切换身份</el-button>
          <el-button v-else type="primary" size="default" plain :disabled="true">当前身份</el-button>
        </template>
        <el-button v-else type="primary" size="default" @click="router.push('/join?t=vip')" plain>立即开通</el-button>
      </div>
      <div class="supplier member-area">
        <img src="/supplier.png" alt="" width="48px" height="48px" />
        <div class="info">
          <div class="title">供应商加盟</div>
          <div class="tips">平台供货端，共享平台流量加持</div>
        </div>
        <template v-if="hasType('supplier')" >
          <el-button v-if="currentType.name!=='supplier'" type="danger" size="default" @click="switchType('supplier')">切换身份</el-button>
          <el-button v-else type="primary" size="default" :disabled="true" plain>当前身份</el-button>
        </template>
        <el-button v-else type="primary" size="default" @click="router.push('/join?t=supplier')" plain>立即开通</el-button>
      </div>
    </div>
    <div class="footer">
      <div><router-link to="/user/settings">账户设置</router-link></div>
      <div><el-button link @click="logout()">退出登录</el-button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user"
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router"

const { accountInfo,currentRank,currentType } = storeToRefs(useUserStore())
const { switchType, logout } = useUserStore()
const router = useRouter()

const hasType = (name: string)=>{
  return accountInfo.value.types.findIndex((x:any) => x.name===name) >= 0
}
</script>
