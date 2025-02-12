import { stat } from "fs";
import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    globalLoading: false,
    title: import.meta.env.VITE_APP_TITLE,
    logoText: import.meta.env.VITE_APP_LOGO_TEXT,
    theme: 'light',
    mainSidebar: true,
    lang: "cn"
  }),

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["theme"], }],
  },

  getters: {
  },
  actions: {
    toggleSidebar() {
      this.mainSidebar = !this.mainSidebar
    },

    setTheme(theme: string) {
      this.theme = theme
    }
  },
});
