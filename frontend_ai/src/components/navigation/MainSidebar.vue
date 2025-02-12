<script setup lang="ts">
import configs from "@/configs";
import MainMenu from "@/components/navigation/MainMenu.vue";
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import { Icon } from "@iconify/vue";
import { useAppStore } from "@/stores/appStore";
import { useAuthStore } from "@/stores/authStore";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { exchangeAmountApi } from "@/api/user";

const customizeTheme = useCustomizeThemeStore();
const navigation = ref(configs.navigation);
const { showErrorMessage } = useSnackbarStore();

const { title, logoText } = useAppStore();
const authStore = useAuthStore()
// 在 store 中订阅变化
authStore.$subscribe((mutation, state) => {
  user.value = state.user
});
const user = ref(authStore.user)
const typeRankTitle = computed((() => {
  const currentType = user.value.types?.find(x => x.id === user.value.type_id);
  const currentRank = user.value.ranks?.find(x => x.type_id === user.value.type_id)
  if (currentRank && currentType)
    return `${currentRank.type_rank?.title}${currentType?.title} ${currentRank?.expired_time || ''}`;
  return ''
}))

onMounted(() => {
  scrollToBottom();
});

const scrollToBottom = () => {
  const contentArea = document.querySelector(".v-navigation-drawer__content");
  const activeItem = document.querySelector(
    ".v-list-item--active"
  ) as HTMLElement;

  setTimeout(() => {
    contentArea?.scrollTo({
      top: activeItem?.offsetTop,
    });
  }, 100);
};


const exchangeAmountDialog = ref(false)
const exchangeAmount = ref(1)
const openExchangeAmountDialog = () => {
  if (user.value.amount <= 0) return showErrorMessage("您的Y币余额为0...")
  exchangeAmountDialog.value = true
}
const doExchangeAmount = async () => {
  exchangeAmountApi((exchangeAmount.value * 100)).then((res) => {
    console.log(res.data)
    if (res.data?.amount) user.value.amount = res.data.amount
    if (res.data?.point) user.value.point = res.data.point
    exchangeAmountDialog.value = false
  })
}
const getDecimalVal = (val) => {
  if (!val) return 0
  const vStr = val.toString()
  const valA = vStr.substring(0, vStr.length - 2)
  const valB = vStr.substring(vStr.length - 2, vStr.length)
  return `${valA}.${valB}`
}

</script>

<template>
  <v-navigation-drawer elevation="1"   :rail="false" permanent v-model="customizeTheme.mainSidebar" id="mainMenu">
    <!-- ---------------------------------------------- -->
    <!---Top Area -->
    <!-- ---------------------------------------------- -->
    <template v-if="!customizeTheme.miniSidebar" v-slot:prepend>
      <v-card height="100" class="logo-card">
        <!-- <img
          v-if="customizeTheme.darkTheme"
          width="200"
          src="@/assets/logo_dark.svg"
          alt=""
        />
        <img
          v-else="customizeTheme.darkTheme"
          width="200"
          src="@/assets/logo_light.svg"
          alt=""
        /> -->
        <h1 class="logo-text h-full">
          <span>{{ logoText }}</span>
        </h1>
      </v-card>
    </template>

    <!-- ---------------------------------------------- -->
    <!---Nav List -->
    <!-- ---------------------------------------------- -->
    <div class="main-menu">
      <main-menu :menu="navigation.menu"></main-menu>
    </div>
    <!-- ---------------------------------------------- -->
    <!---Bottom Area -->
    <!-- ---------------------------------------------- -->
    <template v-if="!customizeTheme.miniSidebar" v-slot:append>
      <v-card class="pa-3" variant="text">
        <v-card class="d-flex flex-column pa-2 gradient-card text-white">
          <v-card-title>
            <v-avatar color="white" size="40">
              <v-img :src="user.profile?.avatar">
                <template v-slot:error>
                  <div class="flex align-center justify-center" style="width: 40px; height: 40px; font-size: 20px;">
                    {{ user.profile?.realname[0] }}
                  </div>
                </template>
              </v-img>
            </v-avatar>
            <span class="mx-4" style="font-size: 20px;">{{ user.profile?.realname }}</span>
          </v-card-title>
          <v-card-subtitle> </v-card-subtitle>
          <v-card-text>
            <div class="my-1"><b>等级:</b> {{ typeRankTitle }}</div>
            <div class="my-1" :key="user.amount"><b>余额:</b> {{ getDecimalVal(user.amount) }} Y币 <v-btn class="ml-3"
                size="x-small" color="warning" @click="openExchangeAmountDialog">充值</v-btn></div>
            <div class="my-1" :key="user.point"><b>积分:</b> {{ getDecimalVal(user.point) }} 点 <v-btn class="ml-3"
                size="x-small" color="primary" @click="openExchangeAmountDialog">兑换</v-btn></div>
            <div class="my-1"></div>
          </v-card-text>
        </v-card>
      </v-card>
    </template>
  </v-navigation-drawer>
  <v-dialog v-model="exchangeAmountDialog">
    <v-card width="400" max-width="90%" max-height="300" class="mx-auto">
      <h6 class="text-h6 font-weight-bold pa-5 d-flex align-center">
        <span class="flex-fill">兑换积分</span>
      </h6>
      <v-card-text>
        <v-slider v-model="exchangeAmount" :max="100" :min="1" :step="1" thumb-label="always"></v-slider>
        <div class="text-caption mb-6">滑动选择Y币数额兑换积分，兑换比例 1Y币：10000积分</div>
        <div class="text-caption mb-2 flex justify-end">
          <v-btn @click="exchangeAmountDialog = false">取消</v-btn>
          <v-btn class="ml-2" color="primary" @click="doExchangeAmount">兑换{{ exchangeAmount * 10000 }}积分</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.gradient-card {
  // background: linear-gradient(
  //   to bottom,
  //   rgba(var(--v-theme-primary), 1),
  //   rgba(var(--v-theme-primary), 0.9)
  // );
  background: linear-gradient(270deg,
      rgba(var(--v-theme-primary), 0.7) 0,
      rgb(var(--v-theme-primary)) 100%);
  box-shadow: 0 2px 6px rgba(var(--v-theme-primary), 0.3);
}

.logo-card {
  .logo-text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 600;
    color: rgba(var(--v-theme-primary));
  }
}
</style>
