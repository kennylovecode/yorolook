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
    <manage-list name="channel" editor-name="manageChannelEdit" title="频道" :query="searchQuery">
      <template #table-columns>
        <el-table-column prop="id" label="编号" width="300" />
        <el-table-column prop="name" label="名称" width="120" />
        <el-table-column prop="title" label="标题" width="150" />
        <el-table-column prop="limit_level" label="登录限制" width="120">
          <template #default="{ row }">
            <div>
              {{ row.limit_level }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="身份限制" width="120">
          <template #default="{ row }">
            <div>已设置{{ row.type_rank_limits.length }}类</div>
          </template>
        </el-table-column>
        <el-table-column prop="is_attach" label="附件" width="120">
          <template #default="{ row }">
            <div>{{ row.is_attach ? "开启" : "关闭" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="is_comment" label="评论" width="120">
          <template #default="{ row }">
            <div>{{ row.is_comment ? "开启" : "关闭" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="is_mark" label="标注" width="120">
          <template #default="{ row }">
            <div>{{ row.is_mark ? "开启" : "关闭" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="is_share" label="分享" width="120">
          <template #default="{ row }">
            <div>{{ row.is_share ? "开启" : "关闭" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="is_shop" label="商城" width="120">
          <template #default="{ row }">
            <div>{{ row.is_shop ? "开启" : "关闭" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="is_theme" label="主题" width="120">
          <template #default="{ row }">
            <div>{{ row.is_theme ? "开启" : "关闭" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="pagesize" label="每页数量" width="120" />
        <el-table-column prop="linesize" label="每行数量" width="120" />
        <el-table-column prop="display_order" label="显示排序" width="120" />
      </template>
    </manage-list>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import manageList from "@/components/manage/list.vue"

const searchQuery = reactive<any>({
  idx: 1,
  size: 10,
  keywords: ""
})
</script>
