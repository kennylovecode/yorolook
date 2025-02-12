<template>
  <search :key="route.fullPath" />
</template>

<script lang="ts" setup>
import search from "@/components/custom/directory/search.vue"
import { useRoute } from "vue-router"
const route = useRoute()
</script>
