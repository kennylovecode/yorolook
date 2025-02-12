<style lang="scss" scoped>
.rgba-block {
  width: 2vw;
  height: 2vw;
  display: inline-block;
  border: solid 1px #f4f4f4;
}
.el-button--primary.is-link {
  text-decoration: underline;
}
</style>
<template>
  <edit-layout
    ref="editLayoutRef"
    name="attribute"
    title="属性"
    @after-submit="handleAfterSubmit"
    @on-initialize="handleInitialize"
  >
    <template #default>
      <el-tabs v-model="currentTabName">
        <el-tab-pane name="info" label="基础信息">
          <el-form ref="baseFormRef" :model="formModel" :rules="rules" label-width="100px" label-position="left">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="formModel.title" placeholder="请输入标题" />
            </el-form-item>
            <el-form-item label="简述" prop="sketch">
              <el-input v-model="formModel.sketch" placeholder="请输入简述" />
            </el-form-item>
            <el-form-item label="关键词" prop="keywords">
              <el-input v-model="formModel.keywords" placeholder="请输入关键词" />
            </el-form-item>
            <el-form-item label="全局通用" prop="common">
              <el-switch :active-value="1" :inactive-value="0" v-model="formModel.common" />
            </el-form-item>
            <el-form-item label="排序" prop="display_order">
              <el-input-number v-model="formModel.display_order" :min="1" :max="10000" />
            </el-form-item>
          </el-form>
          <el-form
            ref="controlFormRef"
            :model="controlModel"
            :rules="controlRules"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="控件类型" prop="control_type">
              <el-select v-model="controlModel.control_type" clearable placeholder="选择控件类型" style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否必填" prop="required">
              <el-switch :active-value="1" :inactive-value="0" v-model="controlModel.required" />
            </el-form-item>
            <el-form-item label="文本提示" prop="text_prompt">
              <el-input v-model="controlModel.text_prompt" placeholder="请输入标题" />
            </el-form-item>
            <el-form-item
              v-show="controlModel.control_type === 'text' || controlModel.control_type === 'textarea'"
              label="文本最低长度"
              prop="min"
            >
              <el-input-number v-model="controlModel.min" :min="0" :max="1000" />
            </el-form-item>
            <el-form-item
              v-show="controlModel.control_type === 'text' || controlModel.control_type === 'textarea'"
              label="文本最高长度"
              prop="max"
            >
              <el-input-number v-model="controlModel.max" :min="0" :max="1000" />
            </el-form-item>
            <el-form-item v-show="controlModel.control_type === 'file-upload'" label="文件支持类型" prop="exts">
              <el-checkbox-group v-model="fileExtArray">
                <el-checkbox label="文本文件" :value="`TXT`" />
                <el-checkbox label="压缩文件" value="RAR,ZIP,GZIP,7Z" />
                <el-checkbox label="办公文档" value="PPT,PPTX,DOCX,DOC,XLS,XLSX" />
                <el-checkbox label="视频文件" value="MP4,AVI,RMVB,WMV,FLV,MKV,MOV,MPG,MPEG,MPEG,MPG,MPV" />
                <el-checkbox label="图片文件" value="JPG,JPEG,BMP,GIF,PNG,TIFF,PSD,AI,EPS,CDR,SVG,ICO" />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-show="controlModel.control_type === 'file-upload'" label="文件大小限制" prop="size">
              <el-input v-model="controlModel.size" placeholder="请填写文件大小" />
            </el-form-item>
            <el-form-item
              v-show="controlModel.control_type === 'text' || controlModel.control_type === 'textarea'"
              label="默认值"
              prop="default_value"
            >
              <el-input v-model="controlModel.default_value" placeholder="请输入控件未填写时默认赋予的值" />
            </el-form-item>
          </el-form>
          <el-form v-if="controlModel.control_type.indexOf('checkbox') >= 0">
            <el-form-item label="可选值管理">
              <el-table v-if="formModel.options?.length" :key="formModel.options?.length" :data="formModel.options">
                <el-table-column prop="name" label="名称" width="120" />
                <el-table-column prop="rgba" label="色块" width="120">
                  <template #default="scope">
                    <img v-if="scope.row.image" :src="scope.row.image" alt="" width="36" height="36" />
                    <span v-else class="rgba-block" :style="{ backgroundColor: scope.row.rgba }" />
                  </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="display_order" label="显示排序" width="120" />
                <el-table-column prop="rgba" label="色块" width="120">
                  <template #default="scope">
                    <el-button link type="primary" size="default" @click="handleAddOptionClick(false, scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="primary" size="default" @click="handleDelete(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 1rem">
                <el-button link type="primary" size="default" @click="handleAddOptionClick(false)">添加一项</el-button>
                <el-button link type="primary" size="default" @click="handleAddOptionClick(true)">批量导入</el-button>
              </div>
            </el-form-item>
            <el-dialog title="可选值编辑" v-model="optionEditorVisible" width="30%" @close="">
              <option-editor :key="optionModel.id" :cb="afterOptionSubmit" :dialog="true" :data="optionModel" />
            </el-dialog>
            <el-dialog title="批量编辑" v-model="batchAddVisible" width="30%">
              <option-batch-add :attribute_uuid="formModel.id" @on-success="afterOptionBatchAdd" />
            </el-dialog>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </template>
  </edit-layout>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue"
import { Attribute, AttributeControl, AttributeOption } from "@/api/attribute/types"
import { ElMessageBox, FormRules } from "element-plus"
import editLayout from "@/components/manage/editLayout.vue"
import optionEditor from "./option-edit.vue"
import { createOrUpdate } from "@/api/attribute_control"
import optionBatchAdd from "./option-batch-add.vue"
import { deleteById as deleteOptionById } from "@/api/brand/attribute_option"

const fileExtArray = ref<string[]>([])
const controlModel = reactive<AttributeControl>({
  id: "",
  attribute_uuid: "",
  text_prompt: "",
  required: 0,
  control_type: "",
  min: 0,
  max: 0,
  exts: "",
  size: 0,
  default_value: ""
})
const optionModel = reactive<AttributeOption>({
  id: "",
  attribute_uuid: "",
  name: "",
  title: "",
  display_order: 0,
  rgba: "",
  image: ""
})
const formModel = reactive<Attribute>({
  id: "",
  name: "",
  title: "",
  sketch: "",
  keywords: "",
  display_order: 0,
  common: 0,
  control: {} as AttributeControl,
  options: [] as AttributeOption[]
})
const currentTabName = ref<string>("info")

const editLayoutRef = ref<any>({})
const optionEditorVisible = ref<boolean>(false)
const batchAddVisible = ref<boolean>(false)

const options = [
  {
    value: "text",
    label: "单行文本"
  },
  {
    value: "textarea",
    label: "多行文本"
  },
  {
    value: "single-checkbox",
    label: "多项单选"
  },
  {
    value: "multiple-checkbox",
    label: "多项多选"
  },
  {
    value: "file-upload",
    label: "文件上传"
  }
]

const rules = reactive<FormRules<Attribute>>({
  name: [
    { required: true, message: "请输入属性的编码名称", trigger: "blur" },
    { min: 3, max: 32, message: "名称的长度在3-32个字符之间", trigger: "blur" }
  ],
  title: [
    { required: true, message: "请输入属性的标题", trigger: "blur" },
    { min: 1, max: 16, message: "标题的长度在1-16个字符之间", trigger: "blur" }
  ]
})

const controlRules = reactive<FormRules<AttributeControl>>({
  control_type: [{ required: true, message: "请选择控件类型", trigger: "blur" }]
})

const handleInitialize = (data: Attribute) => {
  Object.assign(formModel, data)
  if (data.control) {
    Object.assign(controlModel, data.control)
  }
  controlModel.attribute_uuid = formModel.id
  optionModel.attribute_uuid = formModel.id
}
const handleAfterSubmit = async (data: any) => {
  Object.assign(formModel, data)
  controlModel.attribute_uuid = formModel.id
  optionModel.attribute_uuid = formModel.id
  if (controlModel.attribute_uuid) {
    const res = await createOrUpdate(controlModel)
    Object.assign(controlModel, res?.data)
  }
}

const afterOptionSubmit = (data: any) => {
  if (optionModel.id) {
    const findIndex = formModel.options?.findIndex((item: any) => item.id === optionModel.id)
    if (findIndex !== -1 && formModel.options) {
      formModel.options[Number(findIndex)] = data
    }
  } else {
    formModel.options?.push(data)
  }
  Object.assign(optionModel, {
    id: "",
    attribute_uuid: formModel.id,
    name: "",
    title: "",
    display_order: 0,
    rgba: "",
    image: ""
  })
  optionEditorVisible.value = false
}
const afterOptionBatchAdd = (options: any[]) => {
  formModel.options = formModel.options?.concat(options) || options
  optionBatchAdd.value = false
}

const handleAddOptionClick = (batch: boolean = false, row: any = {}) => {
  if (optionModel.attribute_uuid) {
    if (batch) {
      batchAddVisible.value = true
    } else {
      if (row) Object.assign(optionModel, row)
      optionEditorVisible.value = true
    }
    return
  }
  ElMessageBox.alert("添加可选值需要先保存属性信息", "提示", {
    confirmButtonText: "提交并继续",
    cancelButtonText: "取消",
    showCancelButton: true,
    type: "success"
  })
    .then(async () => {
      await editLayoutRef.value!.submit()
    })
    .catch(() => {
      ElMessage.info("您取消了操作..")
    })
}
const handleDelete = (id: string) => {
  formModel.options = formModel.options?.filter((item: any) => item.id !== id)
  deleteOptionById(id).then(({ code }) => {
    if (code) ElMessage.success("删除成功!")
  })
}

onMounted(() => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) {
      editLayoutRef.value!.setForm(newValue)
    }
  })

  watch(controlModel, (newValue) => {
    formModel.control = newValue
  })
})
</script>
