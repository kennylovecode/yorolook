<style lang="scss" scoped>
.app-container {
  margin: 30px 0;
  padding: 20px;
  background: var(--el-fill-color-blank);
}
</style>

<template>
  <div class="app-container">
    <manage-list ref="manageListRef" name="supplier" editor-name="supplierEdit" title="供应商">
      <template #table-columns>
        <el-table-column prop="name" label="名称" width="100" />
      </template>
    </manage-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import manageList from "@/components/manage/list.vue"
const manageListRef = ref<any>({})
</script>
