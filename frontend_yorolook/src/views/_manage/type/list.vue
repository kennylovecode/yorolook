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
    <manage-list name="type" editor-name="typeEdit" title="身份">
      <template #table-columns>
        <el-table-column prop="id" label="编号" width="300" />
        <el-table-column prop="name" label="名称" width="120" />
        <el-table-column prop="title" label="标题" width="150" />
        <el-table-column prop="display_order" label="显示排序" width="120" />
      </template>
      <template #row-actions="{ row }">
        <el-button link type="primary" size="default" @click="typeRankManage(row)">等级管理</el-button>
      </template>
    </manage-list>
  </div>
</template>

<script lang="ts" setup>
import manageList from "@/components/manage/list.vue"
import { useRouter } from "vue-router"

const router = useRouter()

const typeRankManage = (row: any) => {
  router.push({
    name: "typeRankList",
    params: {
      type_id: row.id
    }
  })
}
</script>
