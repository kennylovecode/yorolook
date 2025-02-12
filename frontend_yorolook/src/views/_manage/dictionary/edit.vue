<template>
  <edit-layout
    ref="editLayoutRef"
    editor-name="dictionaryEdit"
    name="dictionary"
    title="系统字典"
    @on-initialize="handleInitialize"
  >
    <template #default>
      <el-tabs style="margin-top: 30px">
        <el-tab-pane label="基础信息">
          <el-form ref="form" :model="formModel" :rules="rules" label-width="100px" label-position="left">
            <el-form-item label="字典名称" prop="key">
              <el-input v-model="formModel.key" placeholder="请输入字典名称" />
            </el-form-item>
            <el-form-item label="标题介绍" prop="text">
              <el-input v-model="formModel.text" placeholder="请输入标题介绍" />
            </el-form-item>
            <el-form-item label="可选项">
              <el-table :data="formModel.options" style="width: 600px">
                <el-table-column prop="key" label="选项值" width="200" />
                <el-table-column prop="text" label="选项文本" width="200" />
                <el-table-column label="操作" align="right">
                  <template #default="scope">
                    <el-button link icon="Delete" size="small" @click="handleDelete(scope.$index)" />
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item>
              <el-input v-model="addOptionModel.key" placeholder="选项值" style="width: 200px" />
              <el-input v-model="addOptionModel.text" placeholder="选项文本" style="width: 200px" />
              <el-button type="primary" @click="addOptionSubmit">添加</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </template>
  </edit-layout>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue"
import type { Dictionary, KV } from "@/api/dictionary/types"
import { ElMessage, FormRules } from "element-plus"
import editLayout from "@/components/manage/editLayout.vue"

const formModel = ref<Dictionary>({
  key: "",
  text: "",
  options: []
})

const addOptionModel = reactive<KV>({
  key: "",
  text: ""
})

const editLayoutRef = ref<any>({})

const rules = reactive<FormRules<Dictionary>>({
  key: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 2, max: 32, message: "名称的长度在2-32个字符之间", trigger: "blur" },
    { pattern: /^[a-zA-Z_]+$/, message: "名称只能包含英文字符和下划线", trigger: "blur" }
  ],
  text: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 2, max: 32, message: "名称的长度在2-32个字符之间", trigger: "blur" }
  ]
})

const addOptionSubmit = () => {
  if(!formModel.value.options) formModel.value.options = []
  const exist = formModel.value.options.find((x) => x.key === addOptionModel.key || x.text === addOptionModel.text)
  if (exist) {
    ElMessage.error("选项值或选项文本重复...请检查后重试！")
    return
  }
  formModel.value.options.push({
    ...addOptionModel
  })
}

const handleDelete = (index: number) => {
  formModel.value.options.splice(index, 1)
}

const handleInitialize = (data: Dictionary) => {
  formModel.value = data
}

onMounted(() => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })
})
</script>
