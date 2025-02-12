<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useAuthStore } from "@/stores/authStore";
import { useI18n } from "vue-i18n";
import { loginApi, wxwork_authApi } from "@/api/account";
import { setToken } from "@/cache/cookies";
import { useRoute, useRouter } from "vue-router";
import * as ww from '@wecom/jssdk'

const authStore = useAuthStore();
const isLoading = ref(false);
const isSignInDisabled = ref(false);
const { t } = useI18n()
const route = useRoute();
const router = useRouter();

const refLoginForm = ref();
const phone = ref("");
const password = ref("");
const isFormValid = ref(true);
const redirectUri = ref("")

// show password field
const showPassword = ref(false);

const handleLogin = async () => {
  const { valid } = await refLoginForm.value.validate();
  if (valid) {
    const { data } = await loginApi({
      username: phone.value,
      password: password.value,
    });
    setToken(data);
    isLoading.value = true;
    isSignInDisabled.value = true;
    authStore.loginWithEmailAndPassword(phone.value, password.value);
    router.push(redirectUri.value)
  } else {
    console.log("no");
  }
};

const loginWithWechat = ref(false)
const signInWithWechat = () => {
  //authStore.loginWithGoogle();
  loginWithWechat.value = true
};

// Error Check
const phoneRules = ref([
  (v: string) => !!v || t('login.validate.phone_required'),
  (v: string) => /^1[3-9]\d{9}$/.test(v) || t('login.validate.phone_error'),
]);

const passwordRules = ref([
  (v: string) => !!v || t('login.validate.password_required'),
  (v: string) =>
    (v && v.length > 6) || t('login.validate.password_length'),
]);

// error provider
const errorProvider = ref(false);
const errorProviderMessages = ref("");

const error = ref(false);
const errorMessages = ref("");
const resetErrors = () => {
  error.value = false;
  errorMessages.value = "";
};

const wxworkAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww32aac9fe03d00a07&redirect_uri=http://ai.yorolook.com/auth/signin&response_type=code&scope=snsapi_privateinfo&state=&agentid=1000021#wechat_redirect`
const checkWxAuth = async ()=>{
  if(navigator.userAgent.indexOf("MicroMessenger")>=0){
    // 获取授权CODE 
    const code = route.query.code as string
    const state = route.query.state as string
    if(code) {
      // 通过API获取用户信息
      const {data} = await wxwork_authApi({ code,state })
      setToken(data);
        isLoading.value = true;
        isSignInDisabled.value = true;
        authStore.loginWithEmailAndPassword(phone.value, password.value);
        router.push(redirectUri.value)
    }else{
      location.href = wxworkAuthUrl
    }
  }
}

onBeforeMount(async () => {
  redirectUri.value = (route.query.redirect as string) || "/"

  await checkWxAuth()
})
</script>
<template>
  <v-card color="white" class="pa-3 ma-3" elevation="3">
    <v-card-title class="my-4 text-h4">
      <span class="flex-fill"> {{ $t('system.welcome') }} </span>
    </v-card-title>
    <v-card-subtitle>{{ $t('login.tips') }}</v-card-subtitle>
    <!-- sign in form -->
    <div id="ww_login">

      <v-card-text v-if="!loginWithWechat">
      <v-form ref="refLoginForm" class="text-left" v-model="isFormValid" lazy-validation>
        <v-text-field ref="refEmail" v-model="phone" required :error="error" :label="$t('login.phone')"
          density="default" variant="underlined" color="primary" bg-color="#fff" :rules="phoneRules" name="phone"
          outlined validateOn="blur" :placeholder="$t('login.placeholder.phone')" @keyup.enter="handleLogin"
          @change="resetErrors"></v-text-field>
        <v-text-field ref="refPassword" v-model="password" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'" :error="error" :error-messages="errorMessages"
          :label="$t('login.password')" :placeholder="$t('login.placeholder.password')" density="default"
          variant="underlined" color="primary" bg-color="#fff" :rules="passwordRules" name="password" outlined
          validateOn="blur" @change="resetErrors" @keyup.enter="handleLogin"
          @click:append-inner="showPassword = !showPassword"></v-text-field>
        <v-btn :loading="isLoading" :disabled="isSignInDisabled" block size="x-large" color="primary"
          @click="handleLogin" class="mt-2">{{ $t("login.button") }}</v-btn>

        <div class="text-grey text-center text-caption font-weight-bold text-uppercase my-5">
          {{ $t("login.orsign") }}
        </div>

        <!-- external providers list -->
        <v-btn class="mb-2 text-capitalize" color="white" elevation="1" block size="x-large" @click="signInWithWechat"
          :disabled="isSignInDisabled">
          <Icon icon="mdi-wechat" class="mr-3 my-2" />
          {{ $t('login.wechat') }}
        </v-btn>
        <div v-if="errorProvider" class="error--text my-2">
          {{ errorProviderMessages }}
        </div>

        <div class="mt-5 text-center">
          <router-link class="text-primary" to="/auth/forgot-password">
            {{ $t("login.forgot") }}
          </router-link>
        </div>
      </v-form></v-card-text>
    </div>
  </v-card>
  <div class="text-center mt-6">
    {{ $t("login.noaccount") }}
    <router-link to="/auth/signup" class="text-primary font-weight-bold">
      {{ $t("login.create") }}
    </router-link>
  </div>
</template>
