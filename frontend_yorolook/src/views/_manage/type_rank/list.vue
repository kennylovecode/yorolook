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
    <div class="filter-area">
      <el-select @change="reload" v-model="searchQuery.type_id" placeholder="选择身份进行筛选" style="width: 240px">
        <el-option label="全部" value="" />
        <el-option v-for="item in types" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
    </div>
    <manage-list ref="listRef" name="type_rank" editor-name="typeRankEdit" title="等级" :query="searchQuery">
      <template #table-columns>
        <el-table-column prop="id" label="编号" width="300" />
        <el-table-column prop="title" label="标题" width="150" />
        <el-table-column prop="weight" label="权重" width="150" />
        <el-table-column prop="growth_value" label="升级值" width="150" />
        <el-table-column prop="display_order" label="显示排序" />
      </template>
    </manage-list>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import manageList from "@/components/manage/list.vue"
import { useRoute } from "vue-router"
import { RequestQuery } from "@/api/type_rank/types"
import { getTypes } from "@/api/type"
import type { Type } from "@/api/type/types"

const route = useRoute()
const types = ref<Type[]>([])
const listRef = ref<any>()
const searchQuery = reactive<RequestQuery>({
  type_id: route.params.type_id as unknown as number
})

const reload = () => {
  listRef.value.setSearchQuery(searchQuery, true)
}

onMounted(() => {
  getTypes().then((res) => {
    types.value = res.data
  })
})
</script>
