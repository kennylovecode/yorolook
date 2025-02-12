<template>
  <div>
    <edit-layout
      ref="editLayoutRef"
      name="directory"
      title="品牌"
      :dialog="props.dialog"
      :cb="props.cb"
      @after-submit="handleAfterSubmit"
      :create-hook="create"
      :update-hook="update"
    >
      <el-form :model="editForm" ref="form" :rules="editFormRules">
        <el-form-item label="名称" props="title">
          <el-input v-model="editForm.title" placeholder="请输入文件名" clearable />
        </el-form-item>
        <el-form-item label="标签" prop="keywords">
          <el-select
            :max-collapse-tags="6"
            v-model="keywordsArray"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="输入文件夹的关键词"
            @change="keywordsArrayChange"
          />
        </el-form-item>
        <el-form-item label="排序" props="display_order">
          <el-input-number v-model="editForm.display_order" :step="1" :controls="false" />
        </el-form-item>
        <el-form-item label="隐私" props="status">
          <el-select v-model="editForm.status" clearable filterable>
            <el-option label="全平台可见" :value="0">全平台可见</el-option>
            <el-option label="品牌主页可见" :value="1">品牌主页可见</el-option>
            <el-option label="仅自己可见" :value="2">仅自己可见</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费" props="point_payment_limit">
          <el-input-number v-model="editForm.point_payment_limit" :controls="false" :step="1" />
        </el-form-item>
      </el-form>
    </edit-layout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch, ref, computed } from "vue"
import { FormRules } from "element-plus"
import editLayout from "@/components/manage/editLayout.vue"
import { BaseStruct, File, IUpdateFile } from "@/api/directory/types"
import { updateFile } from "@/api/directory"

const props = defineProps<{
  dialog?: boolean
  cb?: Function
  item?: BaseStruct & File
}>()

const editLayoutRef = ref()
const editForm = reactive<IUpdateFile>({
  id: "",
  title: "",
  point_payment_limit: 0,
  display_order: 0,
  status: 0,
  keywords: ""
})
const keywordsArray = ref<string[]>([])
const keywordsArrayChange = () => {
  editForm.keywords = keywordsArray.value?.join(",")
}

const editFormRules = reactive<FormRules<IUpdateFile>>({
  title: [
    { required: true, message: "请输入目录名称", trigger: "blur" },
    { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
  ]
})

const handleAfterSubmit = () => {}

const create = async (data: any) => {
  console.log("replace method....")
}
const update = async (data: any) => {
  return await updateFile(data)
}

onMounted(() => {
  watch(editForm, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })

  if (props.item) Object.assign(editForm, props.item)

  keywordsArray.value = editForm.keywords?.split(",") || []
})
</script>
