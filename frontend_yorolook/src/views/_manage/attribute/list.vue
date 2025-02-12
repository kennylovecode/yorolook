<style lang="scss" scoped>
.app-container {
  margin: 30px 0;
  padding: 20px;
  background: var(--el-fill-color-blank);
}
</style>

<template>
  <div class="app-container">
    <manage-list ref="manageListRef" name="attribute" editor-name="attributeEdit" title="属性">
      <template #table-columns>
        <el-table-column prop="name" label="属性名称" width="200" />
        <el-table-column prop="title" label="属性标题" width="200" />
        <el-table-column prop="is_common" label="全局属性" width="120">
          <template #default="scope">
            <el-switch disabled readonly :active-value="1" :inactive-value="0" v-model="scope.row.common" />
          </template>
        </el-table-column>
        <el-table-column prop="display_order" label="显示排序" width="200" />
        <el-table-column prop="description" label="属性描述" width="700" />
      </template>
    </manage-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue"
import { Attribute, AttributeControl, AttributeOption } from "@/api/attribute/types"
import { getList } from "@/api/attribute"
import manageList from "@/components/manage/list.vue"
const manageListRef = ref<any>({})
const searchQuery = reactive<any>({
  sort: "display_order"
})
onMounted(async () => {
  manageListRef.value.setSearchQuery(searchQuery,true)
})
</script>
