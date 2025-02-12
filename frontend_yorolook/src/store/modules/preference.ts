import { ref } from "vue"
import { defineStore } from "pinia"
import { AccountPreference } from "@/api/user/types"

export const usePreferenceStore = defineStore("preference", () => {
  const defaultPreference: AccountPreference = {
    layoutMode: "top",
    showSettings: true,
    showTagsView: true,
    fixedHeader: true,
    showFooter: true,
    showLogo: true,
    showNotify: true,
    showThemeSwitch: true,
    showScreenfull: true,
    showSearchMenu: true,
    cacheTagsView: true,
    showWatermark: false,
    showGreyMode: false,
    showColorWeakness: false,
    pageCount: 0
  }

  const preference = ref<AccountPreference>({ ...defaultPreference })

  const setPreference = (data: AccountPreference) => {
    preference.value = data
  }

  const resetPreference = () => {
    preference.value = { ...defaultPreference }
  }

  return {
    preference,
    setPreference,
    resetPreference
  }
})
