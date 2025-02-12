<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import "element-plus/es/components/message/style/css"
import { type FormInstance, type FormRules, ElMessage, FormValidateCallback } from "element-plus"
import { User, Lock, Key, HomeFilled } from "@element-plus/icons-vue"
import { type LoginRequestData } from "@/api/login/types/login"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import SMSActiveBtn from "@/components/custom/sms-active-btn.vue"
import QRCodeVue3 from "qrcode-vue3"
import protocol from "../protocol.vue"
import { useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)

/** 协议 */
const protocolShow = ref(false)

/** 验证码图片 URL
const codeUrl = ref("")*/
/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: import.meta.env.DEFAULT_USER || "",
  password: import.meta.env.DEFAULT_USER_password || "",
  code: "",
  agree: false,
  remember: false
})
const loginType = ref<number>(1)

const redirectUrl = ref<string>("")

/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (loginType.value === 1 && !value) callback(new Error("请输入您的账户密码"))
        else callback()
      },
      trigger: "blur"
    },
    { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
  ],
  code: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (loginType.value === 0 && !value) callback(new Error("请输入验证码"))
        else callback()
      },
      trigger: "blur"
    }
  ],
  agree: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          ElMessage.error("请勾选同意用户协议以及隐私政策！")
          callback(new Error("请勾选同意用户协议以及隐私政策！"))
        } else callback()
      },
      trigger: "blur"
    }
  ]
}
/** 登录逻辑 */
const handleLogin = () => {
  const validateCallback: FormValidateCallback = async (valid: boolean, fields?: any): Promise<void> => {
    if (valid) {
      // 处理成功逻辑
      if (loginType.value === 0) {
        const phoneRegex = /^0?(1[0-9][0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/
        if (!phoneRegex.test(loginFormData.username)) {
          ElMessage.error("您输入的手机号码有误,请重新输入...")
          return // 确保返回 void
        }
      }
      loading.value = true
      try {
        const loginSuccess = await useUserStore().login(loginFormData)
        if (loginSuccess) {
          if (redirectUrl.value) {
            location.href = redirectUrl.value
          } else {
            location.reload()
          }
        }
      } finally {
        loading.value = false
      }
    } else {
      console.error(fields)
    }
    console.error("表单校验不通过", fields)
  }
  loginFormRef.value?.validate(validateCallback)
}

onMounted(() => {
  redirectUrl.value = route.query.redirect as string
  watch(loginType, (newValue) => {
    loginFormData.username = ""
    if (newValue === 0) loginFormData.password = ""
    if (newValue === 1) loginFormData.code = ""
  })
})
</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <div class="login-card">
      <div class="left-box">
        <div class="navigation">
          <div class="title">为何成为YOROLOOK会员?</div>
          <div class="slogan">
            <li>1、YORO供应链优选产品SKU10000+助力采购</li>
            <li>2、品牌馆富含上千国内外知名品牌资源库</li>
            <li>3、素材库海量案例、场景、方案资源帮助您更快完成设计</li>
            <li>4、以图搜图帮助您快速、智能的筛选出心中所想</li>
            <li>5、AI问答机器人回答您心中一切想法、疑问</li>
            <li>6、AIGC智能绘画给予你无限想象可能</li>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="header-bar">
          <el-button size="large" @click="router.push({ name: 'home' })" link :icon="HomeFilled">返回首页</el-button>
        </div>
        <div class="switch">
          <div @click="loginType = 0" class="item" :class="{ active: loginType === 0 }">短信登录</div>
          <div @click="loginType = 1" class="item" :class="{ active: loginType === 1 }"><span>密码登录</span></div>
          <div @click="loginType = 2" class="item" :class="{ active: loginType === 2 }">扫码登录</div>
        </div>
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item class="underline-c" v-if="loginType < 2" prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item class="underline-c" v-if="loginType === 1" prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <el-form-item class="underline-c" v-if="loginType === 0" prop="code">
            <el-input v-model.trim="loginFormData.code" tabindex="3" :prefix-icon="Key" placeholder="输入验证码">
              <template #append>
                <SMSActiveBtn :key="loginFormData.username" :phone="loginFormData.username" type="login" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="qrcode" v-if="loginType === 2">
            <QRCodeVue3 :width="220" :height="220" value="https://scholtz.sk" />
          </el-form-item>
          <el-form-item class="agree" prop="agree">
            <el-checkbox v-model="loginFormData.agree" />
            <div class="text">
              同意<el-link type="primary" @click="protocolShow = true">《用户协议》</el-link>和<el-link
                type="primary"
                @click="protocolShow = true"
                >《隐私政策》</el-link
              >
            </div>
          </el-form-item>
          <el-checkbox v-model="loginFormData.remember">自动登录</el-checkbox>
          <el-button v-if="loginType < 2" :loading="loading" type="primary" size="large" @click.prevent="handleLogin"
            >登 录</el-button
          >
        </el-form>
        <div v-if="loginType === 0" class="bottom-wrapper">
          <div class="o-auth" />
          <div class="choose">未注册的手机号登录，将自动帮您<span>注册账号</span></div>
        </div>
        <div v-if="loginType === 1" class="bottom-wrapper">
          <div class="o-auth" />
          <div class="choose">首次登录没有账号密码，建议您使用<span @click="loginType = 0">短信登录</span></div>
        </div>
      </div>
    </div>

    <el-dialog v-model="protocolShow" class="protocol-dialog"> <protocol /></el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 60px);
  .home {
    position: fixed;
    top: 5%;
    left: 5%;
  }
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  :deep(.el-overlay-dialog) {
    display: flex;
    align-items: center;
    justify-content: center;
    .protocol-dialog {
      margin: 0;
    }
  }
  .login-card {
    box-shadow: var(--el-box-shadow);
    overflow: hidden;
    display: flex;
    background: var(--el-bg-color);
    .left-box {
      width: 540px;
      height: 540px;
      background: url("/sign-background.jpg");
      background-size: cover;
      position: relative;
      image-rendering: -webkit-optimize-contrast;
      box-shadow: var(--el-box-shadow);
      overflow: hidden;
      display: flex;

      .navigation {
        color: #fff;
        padding: 30px 60px;
        max-width: 100%;
        display: unset;

        .title {
          width: 100%;
          font-size: 14pt;
          text-shadow: 1px 1px 32px var(--el-text-color-primary);
          letter-spacing: 1px;
          line-height: 80px;
          text-align: center;
        }

        .slogan {
          list-style: none;

          li {
            line-height: 52px;
            font-size: var(--el-font-size-base);
          }
        }
      }
    }

    .content {
      position: relative;

      > .header-bar {
        background: var(--el-menu-border-color);
        display: flex;
        padding: 8px 16px;
        font-size: var(--el-font-size-base);
      }
      .switch {
        display: flex;
        justify-content: center;
        margin-top: 50px;
        .item {
          padding: 16px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          color: var(--el-text-color-regular);
          &:hover {
            color: var(--el-text-color-primary);
            font-weight: bold;
          }
          &.active::after {
            content: "";
            height: 2px;
            padding: 0 16px;
            background: var(--el-color-primary);
            position: absolute;
            bottom: 0px;
            left: 32px;
          }
        }
      }
      > form {
        padding: 10px 50px 50px 50px;
        width: 400px;
        .el-button {
          width: 100%;
          margin-top: 10px;
        }
      }

      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        background: none;
        box-shadow: none;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }

      :deep(.el-form-item) {
        margin: 0;
        &.is-error {
          .el-input__wrapper {
            box-shadow: none;
          }

          .el-form-item__content {
            padding: 4px 0;
            border-bottom: solid var(--el-color-danger) 1px;
          }
        }
        .el-input__wrapper {
          box-shadow: none;
          background-color: transparent;
        }
        .el-form-item__content {
          padding: 4px 0;
        }
        .el-form-item__error {
          display: none;
        }
        &.underline-c {
          padding: 6px 0 8px 0;
          margin-bottom: 16px;
          .el-form-item__content {
            border-bottom: solid var(--el-text-color-primary) 1px;
          }

          .el-form-item__error {
            display: initial;
            padding: 16px 0;
          }
        }
        &.agree {
          display: flex;
          .el-form-item__content {
            border: none;
          }
          .text {
            margin-left: 8px;
            font-size: var(--el-font-size-base);
            color: var(--el-text-color-regular);
          }
        }

        &.qrcode {
          .el-form-item__content {
            display: flex;
            justify-content: center;
            width: 100%;
          }
        }
      }

      .bottom-wrapper {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;

        .choose {
          height: 36px;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            color: var(--el-color-primary);
            padding: 0 2px;
            text-decoration: underline;
            cursor: pointer;
          }
        }

        .bind-descript {
          width: 80%;
          margin: 0 auto;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .login-container {
    .login-card {
      .left-box {
        display: none;
      }
    }
  }
}
</style>
