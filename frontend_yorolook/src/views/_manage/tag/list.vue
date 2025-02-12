<style lang="scss" scoped>
.app-container {
  max-width: var(--max-width);
  margin: 0 auto;
  min-height: calc(100vh - 60px);
  width: 100%;
}
</style>

<template>
  <div class="app-container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item @click="selectGroup(null)">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="parent">{{ parent.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <manage-list ref="manageListRef" name="tag" editor-name="tagEdit" :query="searchQuery">
      <template #table-columns>
        <el-table-column prop="id" label="编号" width="300" />
        <el-table-column prop="name" label="名称" width="120" />
        <el-table-column prop="title" label="标题" width="150">
          <template #default="scope">
            <div style="display: flex; text-align: center; align-items: center">
              <img :src="scope.row.cover" alt="" width="32" />
              <span style="margin-left: 1rem">{{ scope.row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="use" label="热度" width="150" />
      </template>
      <template #row-actions="{ row }">
        <el-button v-if="!searchQuery.parent_id" link type="primary" size="default" @click="selectGroup(row)"
          >标签管理</el-button
        >
      </template>
    </manage-list>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import manageList from "@/components/manage/list.vue"
import { Tag, RequestQuery } from "@/api/tag/types"
import { ArrowRight } from "@element-plus/icons-vue"
import { useRouter, useRoute } from "vue-router"
import { getById } from "@/api/tag"

const searchQuery = reactive<RequestQuery>({
  parent_id: null,
  sort: "created_at"
})

const manageListRef = ref<any>({})
const router = useRouter()
const route = useRoute()
const parent = ref<Tag | null>(null)
const selectGroup = async (row: any) => {
  searchQuery.parent_id = row ? row.id : null
  const newQuery = { ...route.query } // 创建一个新的查询对象
  if (row) {
    const parent_id = `${row?.path_id ? row?.path_id + "," : ""}${row?.id || ""}`
    newQuery.parent_id = parent_id
    parent.value = row
  } else {
    newQuery.parent_id = ""
    parent.value = null
  }
  await router.push({ path: route.path, query: newQuery })
  await load()
}
const load = async () => {
  if (!parent.value && searchQuery.parent_id) {
    const res = await getById(searchQuery.parent_id)
    parent.value = res.data
  }
  manageListRef.value.setSearchQuery(searchQuery, true)
}

onMounted(async () => {
  searchQuery.parent_id = parseInt(route.query.parent_id as string) || null
  await load()
})
</script>
