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
    <edit-layout ref="editLayoutRef" name="tag" editor-name="tagEditor" title="分类" @on-initialize="handleInitialize">
      <el-tabs>
        <el-tab-pane label="基础信息">
          <el-form ref="form" :model="formModel" :rules="rules" label-width="100px" label-position="left">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入频道名称（仅支持英文）" />
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="formModel.title" placeholder="请输入频道标题" />
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
import { Tag } from "@/api/tag/types"
import { FormRules } from "element-plus"
import { getList } from "@/api/tag"

const formModel = reactive<Tag>({
  id: 0,
  name: "",
  title: "",
  parent_id: null,
  use: 0
})

const editLayoutRef = ref<any>({})
const parent_id = ref<number | null>(null)

const rules = reactive<FormRules<Tag>>({
  name: [
    { required: true, message: "请输入标签的名称", trigger: "blur" },
    { min: 2, max: 32, message: "分类名称2-32个小写英文字符", trigger: "blur" },
    {
      pattern: /^[a-z]+$/,
      message: "标签名称只能包含小写英文字母",
      trigger: "blur"
    }
  ],
  title: [
    { required: true, message: "请输入标签的标题", trigger: "blur" },
    { min: 1, max: 16, message: "标题的长度在1-8个字符之间", trigger: "blur" }
  ]
})

const handleInitialize = async (model: any) => {
  Object.keys(model).forEach((key) => {
    if (key in formModel && typeof model[key] !== "undefined") {
      if (typeof (formModel as any)[key] === "boolean") {
        model[key] = model[key] > 0
      }
    }
  })
  Object.assign(formModel, model)
}

onMounted(async () => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })
})
</script>
