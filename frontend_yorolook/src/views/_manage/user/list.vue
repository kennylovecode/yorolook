<style lang="scss" scoped>
.app-container {
  margin: 30px 0;
  padding: 20px;
  background: var(--el-fill-color-blank);
}
</style>

<template>
  <div class="app-container">
    <manage-list ref="manageListRef" name="user" editor-name="userEdit" title="用户">
      <template #table-columns>
        <el-table-column prop="username" label="用户名" width="100" />
        <el-table-column prop="password" label="密码" width="120" />
        <el-table-column prop="mobile" label="手机号" width="120" />
        <el-table-column prop="email" label="电子邮件" width="120" />
        <el-table-column prop="wechat" label="微信号" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.wechat" type="success">{{ scope.row.wechat }}</el-tag>
            <el-tag v-else type="danger">用户未绑定</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="余额" width="100" />
        <el-table-column prop="point" label="积分" width="100" />
        <el-table-column prop="consum" label="消费" width="100" />
        <el-table-column prop="is_distribution" label="分销员" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.is_distribution" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status===0" type="success">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="distribution_remark" label="身份备注" width="200" />
      </template>
    </manage-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import manageList from "@/components/manage/list.vue"
const manageListRef = ref<any>({})
</script>
