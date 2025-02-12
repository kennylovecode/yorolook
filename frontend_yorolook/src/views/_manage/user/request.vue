<style lang="scss" scoped>
.app-container {
  margin: 30px 0;
  padding: 20px;
  background: var(--el-fill-color-blank);
}
</style>

<template>
  <div class="app-container">
    <div class="filter-area">
      <el-select v-model="searchQuery.to_type_id" :empty-values="[null, undefined]" @change="reload" placeholder="选择审核的分组" style="width: 240px">
        <el-option label="全部" value=""/>
        <el-option v-for="item in types" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="searchQuery.status" @change="reload" placeholder="选择审核的状态" style="width: 240px">
        <el-option label="全部" :value="-1" />
        <el-option label="审核中" :value="0" />
        <el-option label="已拒绝" :value="1" />
        <el-option label="已通过" :value="255" />
      </el-select>
    </div>
    <el-table :data stripe>
      <el-table-column prop="to_type_id" label="申请信息" >
        <template #default="{row}">
          <div>
            升级到【{{ types.find(item => item.id === row.to_type_id)?.title }}】
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="company_name" label="公司名称" />
      <el-table-column prop="company_address" label="公司信息" />
      <el-table-column prop="contact_name" label="联系人" />
      <el-table-column prop="contact_mobile" label="联系电话" />
      <el-table-column prop="updated_at" label="最后提交时间" />
      <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status===0" type="info">待处理</el-tag>
            <el-tag v-if="scope.row.status>0&&scope.row.status<255" type="danger">已拒绝</el-tag>
            <el-tag v-if="scope.row.status===255" type="success">已通过</el-tag>
          </template>
        </el-table-column>
      <el-table-column prop="status" label="操作">
        <template #default="scope">
         <el-button v-if="scope.row.status===0" type="primary" size="small" @click="openApproveDialog(scope.row)">审核处理</el-button>
         <span v-else>
           无需操作
         </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="审核信息"
      v-model="approveDialogVisible"
      width="30%"
      @close="">
        <el-form ref="form" :model="approveModel" label-width="100px">
          <el-form-item v-if="approveReadonly" label="状态" prop="status">
            {{ approveModel.status === 1 ? '已拒绝审核通过' : '已审核通过' }}
          </el-form-item>
          <el-form-item v-else label="操作" prop="status">
            <el-select v-model="approveModel.status" placeholder="请选择审核结果">
              <el-option label="未处理" :value="0" />
              <el-option label="审核通过" :value="255" />
              <el-option label="审核拒绝" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="原因" prop="reason">
            <el-input :readonly="approveReadonly" type="textarea" :row="6" v-model="approveModel.reason" placeholder="请输入审核备注或拒绝原因..." clearable @change=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="approveModel.status===0" type="primary" size="default" @click="approveRequest">完成</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getTypes } from "@/api/type";
import { Type } from "@/api/type/types";
import { approveAccountTypeRequest, listAccountTypeRequest } from "@/api/user";
import { AccountTypeRequest, IApproveRequest, IListTypeRequestQuery } from "@/api/user/types";
import { onMounted, reactive, ref } from "vue"

const data = ref<AccountTypeRequest[]>([])
const types = ref<Type[]>([])
const approveDialogVisible = ref<boolean>(false)

const searchQuery = reactive<IListTypeRequestQuery>({
  idx: 1,
  keywords: "",
  size: 30,
  sort: "updated_at",
  status: -1,
  to_type_id: 0
})

const approveReadonly = ref<boolean>(false)
const approveModel = reactive<IApproveRequest>({
  id: "",
  reason: "",
  status: 0
})

const openApproveDialog = (item: AccountTypeRequest)=>{
  approveReadonly.value = item.status > 0
  approveDialogVisible.value = true
  approveModel.id = item.id
  approveModel.status = item.status
  approveModel.reason = item.reason
}

const approveRequest = ()=>{
  if(approveReadonly.value || approveModel.status===0) return
  approveAccountTypeRequest(approveModel).then((result) => {
    approveDialogVisible.value = false
    ElMessage.success("处理审核成功...")
  })
}

const reload = ()=>{
  data.value = []
  load()
}

const load = ()=>{
  listAccountTypeRequest(searchQuery).then((result) => {
    data.value = result.data
  }).catch((err) => {

  });
}

onMounted(()=>{
  getTypes().then((res) => {
    types.value = res.data
  })
  load()
})
</script>
