<style lang="scss" scoped>
.tips {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 30vh;
  max-height: 100vh;

  p {
    width: 100%;
    text-align: center;
    margin: 1rem;

    &:first-child {
      font-size: 1.2rem;
      font-weight: bold;
      letter-spacing: 2px;
    }
  }
}

.finish{
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .container{
    font-size: 14pt;
    width: auto;
    font-weight: bold;
    letter-spacing: 2px;
  }
}

.setup {
  width: 100%;
  max-width: 800px;
  position: relative;
  margin: 0 auto;

  .header {
    position: sticky;
    width: 100%;
    z-index: 100;
  }

  .container {
    margin: 0 auto;
    max-height: 100vh;
    padding: 38px 1rem;

    .control {
      display: flex;
      justify-content: flex-end;
      padding: 1rem 0
    }

    .profile {
      margin-top: 16px;
    }
  }
}

</style>

<template>
  <div v-if="accountInfo.profile?.id" class="finish">
    <div class="container">
      <span v-if="second>=1">您已完成了初始化，将自动为您跳转到首页({{ second }})</span>
      <span v-else>正在跳转</span>
      ...</div>
  </div>
  <div v-else class="setup">
    <div class="header">
      <el-steps :active="active" simple>
        <el-step :icon="Position" title="欢迎" description="欢迎您使用YOROLOOK软装设计供应链平台" />
        <el-step :icon="Document" title="协议" description="请完成网站协议及版权声明的阅读" />
        <el-step :icon="Edit" title="档案" description="请完成信息填写并提交保存" />
      </el-steps>
    </div>
    <Transition name="el-fade-in-linear">
      <div class="container" :key="(route.query.step as string) || 'start'">
        <div v-if="active === 0" class="tips">
          <p>YOROLOOK 一站式软装会员制平台</p>
          <p>为了网站能够更好的为您提供服务</p>
          <p>邀请您完成会员信息档案的建立</p>
          <p>
            <el-button type="primary" size="default" @click="startProtocol">立即完成</el-button>
          </p>
        </div>
        <protocol v-if="active === 1" @finish="finishProtocol" />
        <!-- element plus form model:userProfile rules,
        avatar,nickname,realname,idcard,gender,age,birthday -->
        <profile v-if="active === 2" ref="profileRef" @on-success="finishProfile"/>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { Document, Edit, Position } from "@element-plus/icons-vue"
import protocol from "./protocol.vue"
import profile from "./user/components/common/profile-editor.vue"
import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { useRoute } from "vue-router"
import { clear } from "console"

const route = useRoute()
const { accountInfo } = useUserStoreHook()
const active = ref(0)
const second = ref(3)
const profileRef = ref<any>(null)

const steps = ["start", "agreement", "profile", "end"]

const startProtocol = async ()=>{
  router.push("/setup?step=agreement")
  active.value++
}
const finishProtocol = async (signature: string) => {
  router.push("/setup?step=profile")
  active.value++
  window.scrollTo(0, 0); // 滚动到顶部
}

const finishProfile = async () => {
  router.push({ name: "home" })
}

/** mounted to get user profile from user store or api */
onMounted(() => {
  watch(route, (to, from) => {
    const activeName = (route.query.step as string)
    if (activeName) active.value = steps.indexOf(activeName)
    else active.value = 0
  });

  if(accountInfo.profile?.id){
    const jumpObj = setInterval(() => {
      if(second.value<1){
        clearInterval(jumpObj)
        router.push({
          name: 'home'
        })
      }else{
        second.value--;
      }
    }, 1000);
  }
})
</script>
