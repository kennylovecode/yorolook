<style lang="scss" scoped>
.app-container {
  margin: 30px 0;
  padding: 20px;
  background: var(--el-fill-color-blank);
}
</style>

<template>
  <div class="app-container">
    <manage-list editor-name="dictionaryEdit" name="dictionary" title="系统字典">
      <template #table-columns>
        <el-table-column prop="id" label="名称" width="300" />
        <el-table-column prop="text" label="标题" width="120" />
        <el-table-column prop="options" label="可选项">
          <template #default="{ row }">
            <el-collapse accordion>
              <el-collapse-item title=" 点击展开查看" name="1">
                <el-table :data="row.options" style="width: 400px">
                  <el-table-column prop="key" label="选项值" width="200" />
                  <el-table-column prop="text" label="选项文本" width="200" />
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </template>
        </el-table-column>
      </template>
    </manage-list>
  </div>
</template>

<script lang="ts" setup>
import manageList from "@/components/manage/list.vue"
</script>
