<template>
  <edit-layout :dialog="props?.dialog" :cb="props.cb" ref="editLayoutRef" name="attribute_option" title="属性可选值">
    <template #default>
      <el-form ref="form" :model="formModel" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formModel.name" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formModel.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="色块" prop="rgba">
          <template #default>
            <el-color-picker v-model="formModel.rgba" />
          </template>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <img v-if="formModel.image" :src="formModel.image" width="50" height="50">
          <el-upload :show-file-list="false" :auto-upload="false" :on-change="onChange">
            <div style="display: flex; align-items: center;">
              <span>点击上传</span>
              <el-icon>
                <Upload />
              </el-icon>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="display_order">
          <el-input-number v-model="formModel.display_order" />
        </el-form-item>
      </el-form>
    </template>
  </edit-layout>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue"
import { AttributeOption } from "@/api/attribute/types"
import { FormRules } from "element-plus"
import editLayout from "@/components/manage/editLayout.vue"

interface PropsModel {
  data?: any
  dialog?: boolean
  cb?: Function
}
const props = defineProps<PropsModel>()

const formModel = reactive<AttributeOption>({
  id: "",
  attribute_uuid: "",
  title: "",
  name: "",
  rgba: "",
  image: "",
  display_order: 0
})

const editLayoutRef = ref<any>({})
const rules = reactive<FormRules<AttributeOption>>({
  name: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 3, max: 32, message: "名称的长度在3-32个字符之间", trigger: "blur" }
  ],
  title: [
    { required: true, message: "请输入标题", trigger: "blur" },
    { min: 1, max: 16, message: "标题的长度在1-16个字符之间", trigger: "blur" }
  ]
})

const onChange = (file: any) => {
  const isImage = file.raw.type.indexOf('image') !== -1
  const isLt = file.raw.size / 1024 < 100
  if (!isImage) {
    ElMessage.error('请上传图片格式文件!');
  }
  if (!isLt) {
    ElMessage.error('图标文件大小不能超过 100KB!');
  }
  if (isImage && isLt) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file.raw);
    fileReader.onload = () => {
      formModel.image = fileReader.result as string
    };
    fileReader.onerror = (error) => {
      console.log(error)
    };
  }
}

onMounted(() => {
  if (props.data) Object.assign(formModel, props!.data)
  editLayoutRef.value!.setForm(props.data)
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })
})
</script>
