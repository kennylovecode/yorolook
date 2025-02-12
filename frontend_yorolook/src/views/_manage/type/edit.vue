<style lang="scss" scoped>
.channel-container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
}
:deep(.el-form) {
  .el-form-item__error {
    padding: 8px 0;
    position: unset;
    top: unset;
    left: unset;
  }
}
</style>
<template>
  <div class="channel-container">
    <edit-layout
      ref="editLayoutRef"
      name="type"
      editor-name="typeEditor"
      title="身份"
      @on-initialize="handleInitialize"
    >
      <el-tabs>
        <el-tab-pane label="基础信息">
          <el-form ref="form" :model="formModel" :rules="rules" label-width="100px" label-position="left">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入频道名称（仅支持英文）" />
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="formModel.title" placeholder="请输入频道标题" />
            </el-form-item>
            <el-form-item label="身份描述" prop="description">
              <el-input v-model="formModel.description" placeholder="请输入身份描述" />
            </el-form-item>
            <el-form-item label="排序" prop="display_order">
              <el-input-number v-model="formModel.display_order" :min="1" :max="1000" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </edit-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue"
import editLayout from "@/components/manage/editLayout.vue"
import { Type } from "@/api/type/types"
import { FormRules } from "element-plus"

const formModel = reactive<Type>({
  id: 0,
  name: "",
  title: "",
  description: "",
  display_order: 0,
})

const editLayoutRef = ref<any>({})
const rules = reactive<FormRules<Type>>({
  name: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 2, max: 32, message: "名称2-32个小写英文字符", trigger: "blur" },
    {
      pattern: /^[a-z]+$/,
      message: "名称只能包含小写英文字母",
      trigger: "blur"
    }
  ],
  title: [
    { required: true, message: "请输入标题", trigger: "blur" },
    { min: 2, max: 16, message: "标题的长度在2-16个字符之间", trigger: "blur" }
  ]
})

const handleInitialize = async (model: any) => {
  Object.assign(formModel,model)
}

onMounted(async () => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })
})
</script>
