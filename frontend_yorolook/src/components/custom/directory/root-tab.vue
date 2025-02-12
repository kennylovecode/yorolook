<style lang="scss" scoped>
.nav {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: calc(var(--margin-y-base) * 3);
  a {
    margin-right: calc(var(--margin-y-base) * 5);
    color: var(--el-text-color-secondary);
    &.active {
      color: var(--el-primary);
    }
  }
}
</style>
<template>
  <div class="nav">
    <RouterLink
      v-for="(item, index) in roots"
      :class="{ active: activeName === item.system_name }"
      :to="`/media/${item.system_name}${route.query.pick ? '?pick=1' :''}`"
      :key="index"
      >{{ item.title }}</RouterLink
    >
  </div>
</template>

<script lang="ts" setup>
import { getRoot } from "@/api/directory"
import { useTagsViewStore } from "@/store/modules/tags-view"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const roots = ref<any[]>([])
const activeName = ref<string>("")
const { editTagTitle } = useTagsViewStore()

onMounted(async () => {
  const type = route.params.type as string
  const rootId = (route.query.paths as string)?.split(",")[0]
  const { data } = await getRoot()
  roots.value = data

  const item = roots.value.find((item: any) => item.id === rootId)
  activeName.value = item?.system_name || type || "system"
  if (!activeName.value) {
    activeName.value = roots.value[0].system_name
  }

  const title = roots.value.find((item) => item.system_name === activeName.value)?.title
  editTagTitle(route, ` ${route.meta.title} - ${title}`)
})
</script>
