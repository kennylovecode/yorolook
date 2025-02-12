<template>
  <edit-layout ref="editLayoutRef" name="article_attach" title="附件" :before-submit="handleBeforeSubmit"
    :dialog="props.dialog" :cb="props.cb">
    <template #default>
      <el-form ref="ruleFormRef" label-position="top" :model="formModel" label-width="auto" :rules="rules"
        :scroll-to-error="true">
        <el-form-item>
          <single-upload v-if="!formModel.file_val" title="选择或上传附件" ref="fileInputRef" style="width: 100%" ratio="4/1"
            small
            accept="image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            <template #footer
              ><media-selector
                :count="1"
                type="file"
                accept="image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                @confirm="confirmMediaSelected"
            /></template>
          </single-upload>
          <el-form-item v-else>
            <el-tag
              closable
              @close="
                () => {
                  formModel.file = null
                  formModel.file_val = ''
                }
              "
              ><el-text :line-clamp="1"
                >{{ formModel.file?.title }}（{{ formModel.file?.original_size }}byte）</el-text
              ></el-tag
            >
          </el-form-item>
        </el-form-item>

        <el-form-item props="title" label="标题" label-position="top">
          <el-input v-model="formModel.title" placeholder="输入附件的显示标题" />
        </el-form-item>
        <el-form-item>
          <single-upload title="封面图片" ref="coverInputRef" style="width: 100%" ratio="4/1" small>
            <template #footer>
              <media-selector :count="1" type="file" accept="image/*" @confirm="confirmCoverMediaSelected" />
            </template>
          </single-upload>
        </el-form-item>
        <el-form-item class="mt-2" label="排序" label-position="top">
          <el-input-number v-model="formModel.display_order" :min="1" :max="100" />
        </el-form-item>
      </el-form>
    </template>
  </edit-layout>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, nextTick } from "vue"
import { ElMessage, type FormRules } from "element-plus"
import { Plus, Document, Picture, Folder, VideoCamera } from '@element-plus/icons-vue'
import singleUpload from "../single-upload.vue"
import { IAttachResult } from "@/api/article_attach/types"

const props = defineProps<{
  article_uuid: string
  cb: (attachment: IAttachResult) => void
  dialog: boolean
  attachment: IAttachResult | null
}>()

const formModel = ref<IAttachResult>({
  article_uuid: props.article_uuid,
  title: "",
  file_val: "",
  display_order: 0,
  updated_at: "",
  created_at: ""
})

const fileTypeIcons = {
  压缩文件: "Folder",
  "3D文件": "Document",
  文本文件: "Document",
  图片文件: "Picture",
  视频文件: "VideoCamera"
}

const allowedFileTypes = [
  { type: "application/zip", label: "压缩文件" },
  { type: "application/x-3d", label: "3D文件" },
  { type: "text/plain", label: "文本文件" },
  { type: "image/*", label: "图片文件" },
  { type: "video/*", label: "视频文件" }
]

const editLayoutRef = ref<any>(null)
const ruleFormRef = ref<any>({})
const fileInputRef = ref()
const coverInputRef = ref()
const rules = reactive<FormRules<IAttachResult>>({
  title: [
    { required: true, message: "请输入内容的标题", trigger: "blur" },
    { min: 2, max: 16, message: "长度在2-32个字符之间", trigger: "blur" }
  ]
})
const handleBeforeSubmit = async () => {
  let error: boolean = false
  const valid = await new Promise((resolve) => {
    ruleFormRef.value.validate((valid: boolean) => {
      resolve(valid)
    })
  })
  if (!valid) {
    ElMessage.error("您未完整或填写正确的表单信息,请在修正后继续提交...")
    return valid
  }
  const loading = ElLoading.service({
    lock: true,
    text: "资源上传处理中,请稍等....",
    background: "rgba(255, 255, 255, 0.5)"
  })
  /** 表单校验通过,上传资源 */
  const file = await fileInputRef.value?.submitUpload().catch(() => {
    error = true
  })
  if (file) {
    formModel.value.title = file.title
    formModel.value.file_val = file.id
    formModel.value.file = file
    if (file.original_mime_type.indexOf("image") === 0) {
      formModel.value.cover = file.id
    }
  }
  /** 表单校验通过,上传资源 */
  const cover = await coverInputRef.value?.submitUpload().catch(() => {
    error = true
  })
  if (cover) {
    formModel.value.cover = cover?.id
  }
  loading.close()
  return !error
}

const confirmMediaSelected = (selectedList: any[]) => {
  const _f = selectedList[0]
  if (_f) {
    formModel.value.title = _f.title
    formModel.value.file_val = _f.id
    formModel.value.file = _f
    if (_f.original_mime_type.indexOf("image") === 0) {
      formModel.value.cover = _f.id
    }
    fileInputRef.value?.setFileInfo(_f)
  }
}

const confirmCoverMediaSelected = (selectedList: any[]) => {
  formModel.value.cover = selectedList[0].id
  coverInputRef.value?.setFileInfo(selectedList[0])
}

onMounted(() => {
  watch(formModel.value, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })

  nextTick(() => {
    if (props.attachment) {
      Object.assign(formModel.value, props.attachment)
      if (editLayoutRef.value) editLayoutRef.value!.setForm(props.attachment)
    }
  })
})
</script>

<style lang="scss" scoped>
.el-tag {
  width: 100%;
  .el-tag_content{
    width: 100%;
  }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

:deep(.el-form-item) {
  margin-bottom: 8px;
}
</style>
