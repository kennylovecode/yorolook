<script lang="ts" setup>
import { onMounted, ref, computed, withDefaults, watch } from "vue"
import type { UploadInstance, UploadProps, UploadUserFile, UploadRawFile, UploadFile, UploadFiles } from "element-plus"
import { UploadFilled, Document, Picture } from "@element-plus/icons-vue"
import { genFileId, ElMessage } from "element-plus"
import { useUserStore } from "@/store/modules/user"
import { File as DiskFile } from "@/api/directory/types"

interface PropsModel {
  accept?: string
  title?: string
  ratio?: string
  size?: number[]
  small?: boolean
  fileInfo?: DiskFile
  auto?: boolean
  success?: ((error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | undefined
  error?: ((error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | undefined
}

const props = withDefaults(defineProps<PropsModel>(), {
  accept: "image/*",
  ratio: ""
})

const previewRatio = ref("1/1")
if (props.ratio) previewRatio.value = props.ratio
const { tokenInfo } = useUserStore()
const uploadRef = ref<UploadInstance>()
const fileList = ref<any[]>([])
const previewDialogVisible = ref(false)

// 监听 fileInfo 变化，更新 fileList
watch(
  () => props.fileInfo,
  (newFileInfo) => {
    if (newFileInfo) {
      fileList.value = [
        {
          name: newFileInfo.title,
          url: `/disk/view?id=${newFileInfo.id}`,
          uid: newFileInfo.id,
          size: newFileInfo.original_size,
          type: newFileInfo.original_mime_type,
          c: { ...newFileInfo }
        }
      ]
    } else {
      fileList.value = []
    }
  },
  { immediate: true }
)

const isImage = computed(() => {
  /** 这里使用的是 mime-type 去分析文件类型 */
  const _f = fileList.value[0]
  if (_f.type?.indexOf("image") === 0 || _f.raw?.type?.indexOf("image") === 0) {
    return true
  }
  return false
})

const previewUrl = computed(() => {
  if (props.fileInfo) {
    return `/disk/view?id=${props.fileInfo.id}`
  }
  if (fileList.value.length === 0) return ""
  const file = fileList.value[0]
  return file.url || URL.createObjectURL(file.raw as Blob)
})

const currentFileName = computed(() => {
  if (props.fileInfo) return props.fileInfo.title
  if (fileList.value.length > 0) return fileList.value[0]?.title
  return ""
})

const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':
      return Document
    case 'doc':
    case 'docx':
      return Document
    case 'xls':
    case 'xlsx':
      return Document
    case 'ppt':
    case 'pptx':
      return Document
    default:
      return Document
  }
}

const emit = defineEmits<{
  (e: 'update:fileInfo', value: any | undefined): void
  (e: 'remove'): void
}>()

const exceed: UploadProps["onExceed"] = (files: any[]) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const beforeUpload: UploadProps["beforeUpload"] = (res: any) => {
  if (!props.size || props.size.length < 2) return true

  return new Promise((resolve) => {
    if (!isImage.value) {
      resolve(true)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        if (props.size && props.size?.length >= 1 && (img.width < props.size[0] || img.height < props.size[1])) {
          ElMessage.error(`您选择上传的${props?.title}文件不符合尺寸要求，请重新选择。`)
          resolve(false)
        } else {
          resolve(true)
        }
      }
      img.src = (event.target?.result || "") as string
    }
    reader.readAsDataURL(res)
  })
}

const success = ref<((response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | undefined>()
const error = ref<((error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | undefined>()

const submitUpload = async () => {
  return new Promise((resolve, reject) => {
    if (fileList.value.length === 0) resolve(null)

    const _f = fileList.value[0]

    if (!_f.raw) {
      // 如果没有需要上传的文件，直接 resolve
      resolve(_f)
      return
    }

    const successCallback = (res: any) => {
      resolve(res)
    }
    const errorCallback = () => {
      reject()
    }

    success.value = successCallback
    error.value = errorCallback

    uploadRef.value!.submit()
  })
}

const handlePreview = () => {
  if (isImage.value) {
    previewDialogVisible.value = true
  }
}

const handleRemove = () => {
  fileList.value = []
  emit('update:fileInfo', undefined)
  emit('remove')
}

const setFileInfo = (newFileInfo: any) => {
  fileList.value = [
    {
      name: newFileInfo.title,
      url: `/disk/view?id=${newFileInfo.id}`,
      uid: newFileInfo.id,
      size: newFileInfo.size,
      type: newFileInfo.original_mime_type,
      c: { ...newFileInfo }
    }
  ]
  emit('update:fileInfo', newFileInfo)
}

onMounted(() => {
  if (props.success) success.value = props.success
  if (props.error) error.value = props.error
})

defineExpose({
  submitUpload,
  handleRemove,
  setFileInfo
})
</script>

<template>
  <div class="single-uploader" :class="{ small: props.small }">
    <el-text line-clamp="2" v-if="props.title">{{ props.title }}</el-text>

    <!-- 上传区域 -->
    <el-upload ref="uploadRef" drag action="/disk/upload" v-model:file-list="fileList"
      :headers="{ Authorization: 'Bearer ' + tokenInfo.accessToken }" :limit="1" :auto-upload="props.auto"
      :on-exceed="exceed"
      :on-success="success"
      :on-error="error"
      :before-upload="beforeUpload"
      :class="{ 'is-error': error }"
      :accept="`${props.accept || ''}`"
      v-show="!props.fileInfo && fileList.length === 0"
    >
      <div class="upload-area">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">点击或拖拽文件到此处上传</div>
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </el-upload>

    <!-- 预览区域 -->
    <div v-if="props.fileInfo || fileList.length > 0" class="preview-area">
      <!-- 图片预览 -->
      <div v-if="isImage" class="image-preview" @click="handlePreview">
        <img :src="previewUrl" :alt="currentFileName" class="preview-image" />
        <div class="preview-overlay">
          <el-icon>
            <Picture />
          </el-icon>
          <span>预览</span>
        </div>
      </div>

      <!-- 非图片文件预览 -->
      <div v-else class="file-preview">
        <el-icon class="file-icon">
          <component :is="getFileIcon(currentFileName)" />
        </el-icon>
        <span class="file-name">{{ currentFileName }}</span>
      </div>

      <!-- 操作按钮 -->
      <div class="preview-actions">
        <el-button type="danger" link @click="handleRemove">
          删除
        </el-button>
        <el-button v-if="isImage" type="primary" link @click="handlePreview">
          预览
        </el-button>
      </div>
    </div>

    <!-- 图片预览弹窗 -->
    <el-dialog v-model="previewDialogVisible" title="图片预览" width="800px" destroy-on-close align-center>
      <img :src="previewUrl" style="width: 100%;" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.single-uploader {
  width: 100%;
  position: relative;

  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .el-icon--upload {
      font-size: 28px;
      color: var(--el-text-color-secondary);
      margin-bottom: 8px;
    }

    .el-upload__text {
      color: var(--el-text-color-regular);
      font-size: 14px;
    }
  }

  .preview-area {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    padding: 8px;
    position: relative;

    .image-preview {
      position: relative;
      cursor: pointer;
      overflow: hidden;
      border-radius: 4px;

      &:hover .preview-overlay {
        opacity: 1;
      }

      .preview-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
      }

      .preview-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
        color: white;

        .el-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }
      }
    }

    .file-preview {
      display: flex;
      align-items: center;
      padding: 16px;
      background: var(--el-fill-color-light);
      border-radius: 4px;

      .file-icon {
        font-size: 24px;
        color: var(--el-text-color-secondary);
        margin-right: 12px;
      }

      .file-name {
        font-size: 14px;
        color: var(--el-text-color-regular);
        word-break: break-all;
      }
    }

    .preview-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 8px;
    }
  }

  .footer {
    position: absolute;
    z-index: 9;
    bottom: 8px;
    right: 0;
    width: 100%;
    max-height: 26px;
    padding: 0 2%;
    display: flex;
    justify-content: flex-end;
  }
}

.small {
  .preview-area {
    .image-preview .preview-image {
      height: 120px;
    }
  }
}
</style>
