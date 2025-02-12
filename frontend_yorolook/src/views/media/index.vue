<template>
  <div class="app-container">
    <DirRootTab :key="route.fullPath" />
    <DirectoryList :key="route.fullPath" />
  </div>
</template>

<script lang="ts" setup>
import DirectoryList from "@/components/custom/directory/list.vue"
import DirRootTab from "@/components/custom/directory/root-tab.vue"
import { useRoute } from "vue-router"

const route = useRoute()
</script>
