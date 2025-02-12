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
      <el-breadcrumb-item @click="selectCatalog(null)">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(row, index) in paths" :key="index" @click="selectCatalog(row)">{{
        row.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <manage-list ref="manageListRef" name="catalog" editor-name="catalogEdit" :query="searchQuery">
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
        <el-table-column prop="path_title" label="目录" width="150" />
        <el-table-column prop="display_order" label="显示排序" width="120" />
      </template>
      <template #row-actions="{ row }">
        <el-button link type="primary" size="default" @click="selectCatalog(row)">子类管理</el-button>
      </template>
    </manage-list>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, reactive, ref } from "vue"
import manageList from "@/components/manage/list.vue"
import { Catalog, RequestQuery } from "@/api/catalog/types"
import { ArrowRight } from "@element-plus/icons-vue"
import { useRouter, useRoute } from "vue-router"
import { getById } from "@/api/catalog"

const searchQuery = reactive<RequestQuery>({
  path_id: "",
  sort: "display_order"
})

const manageListRef = ref<any>({})
const paths = ref<any[]>([])
const router = useRouter()
const route = useRoute()
const parent = ref<Catalog>()

const selectCatalog = async (row: any) => {
  paths.value = []
  parent.value = {} as Catalog
  const newQuery = { ...route.query } // 创建一个新的查询对象

  if (row) {
    const path_id = `${row?.path_id ? row?.path_id + "," : ""}${row?.id || ""}`
    newQuery.path_id = path_id
  } else {
    newQuery.path_id = ""
  }
  await router.push({ path: route.path, query: newQuery })
  await load()
}
const load = async () => {
  searchQuery.path_id = route.query.path_id as string
  const parent_id = searchQuery.path_id?.split(",").pop()
  if (parent_id) {
    const res = await getById(parseInt(parent_id))
    parent.value = res.data
    const titles = parent.value.path_title.split(",").filter((x) => x != "")
    const ids = parent.value.path_id?.split(",").filter((x) => x != "")
    for (const i in ids) {
      paths.value.push({
        id: ids[i],
        title: titles[i],
        // 构建 path_id
        path_id: ids.slice(0, parseInt(i)).join(","),
        deep: parent.value.deep - 1
      })
    }
    paths.value.push(parent.value)
  } else searchQuery.path_id = ""
  manageListRef.value.setSearchQuery(searchQuery, true)
}
</script>
