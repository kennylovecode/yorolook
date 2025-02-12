<template>
  <p>品牌联系人管理</p>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column prop="name" label="姓名" width="160">
      <template #default="scope">
        <el-input v-model="scope.row.name" />
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="手机号" width="200">
      <template #default="scope">
        <el-input v-model="scope.row.phone" />
      </template>
    </el-table-column>
    <el-table-column prop="wechat" label="微信号" width="200">
      <template #default="scope">
        <el-input v-model="scope.row.wechat" />
      </template>
    </el-table-column>
    <el-table-column prop="tencent" label="QQ号" width="200">
      <template #default="scope">
        <el-input v-model="scope.row.tencent" />
      </template>
    </el-table-column>
    <el-table-column prop="email" label="电子邮件" width="200">
      <template #default="scope">
        <el-input v-model="scope.row.email" />
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注" width="300">
      <template #default="scope">
        <el-input v-model="scope.row.remark" />
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)"> 删除 </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加联系人</el-button>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount,watch, onMounted } from "vue"
import { Contact } from "@/api/brand/types"

interface PropsModel {
  data: Contact[]
}

const tableData = ref<Contact[]>([])
const emits = defineEmits(["onChange"])
const props = defineProps<PropsModel>()

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
  emits("onChange", tableData.value)
}

onBeforeMount(() => {
  if (props.data) tableData.value = props.data
})

const onAddItem = () => {
  tableData.value.push({
    name: "",
    phone: "",
    wechat: "",
    qq: "",
    email: "",
    remark: ""
  })
}

onMounted(()=>{
  watch(tableData.value,(newValue)=>{
    emits("onChange", newValue)
  })
})
</script>
