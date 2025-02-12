<script setup lang="ts">
import UILayout from "@/layouts/UILayout.vue";
import LandingLayout from "@/layouts/LandingLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import NoneLayout from "./layouts/NoneLayout.vue";
import CustomizationMenu from "@/components/CustomizationMenu.vue";
import BackToTop from "@/components/common/BackToTop.vue";
import Snackbar from "@/components/common/Snackbar.vue";
import { useAppStore } from "@/stores/appStore";
import { useLocale, useTheme } from "vuetify";
import { useCustomizeThemeStore } from "./stores/customizeTheme";
const appStore = useAppStore();
const theme = useTheme();

const route = useRoute();
const customizeThemeStore = useCustomizeThemeStore()

const isRouterLoaded = computed(() => {
  if (route.name !== null) return true;
  return false;
});

const layouts = {
  default: DefaultLayout,
  ui: UILayout,
  landing: LandingLayout,
  auth: AuthLayout,
  none: NoneLayout,
};

const currentLayout = computed(() => {
  const layoutName = route.meta.layout as string;
  const layout = layouts[layoutName] || DefaultLayout
  return layout;
});

onMounted(() => {
  theme.global.name.value = appStore.theme;
  customizeThemeStore.setLocalCode("cn")
});
</script>

<template>
  <v-app>
    <component :is="currentLayout" v-if="isRouterLoaded">
      <router-view> </router-view>
    </component>
    <CustomizationMenu />
    <BackToTop />
    <Snackbar />
  </v-app>
</template>

<style scoped></style>
