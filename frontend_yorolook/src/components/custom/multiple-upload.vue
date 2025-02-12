<style lang="scss" scoped>
.multiple-uploader {
  width: 100%;
  :deep(.el-upload-list) {
    display: flex;
  }
  :deep(.el-upload--picture-card) {
    position: relative;
    --el-upload-picture-card-size: v-bind(viewSize);
  }
  :deep(.el-upload-list--picture-card) {
    --el-upload-list-picture-card-size: v-bind(viewSize);
  }
  :deep(.el-upload-list__item + .el-upload) {
    position: relative;
  }
  .is-error {
    border-color: #f56c6c;
  }
  position: relative;
  .footer {
    position: absolute;
    z-index: 9;
    bottom: 4px;
    left: 0;
    width: 100%;
    max-height: 26px;
    padding: 0 2%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<template>
  <p v-if="props.title">
    请上传{{ props.limit }}张{{ props.title
    }}{{ `(${props.size?.length == 2 ? "尺寸要求" + props.size : "无尺寸要求"})` }}
  </p>
  <div class="multiple-uploader">
    <el-upload
      ref="uploadRef"
      :before-upload="beforeUpload"
      :headers="{ Authorization: 'Bearer ' + tokenInfo.accessToken }"
      v-model:file-list="fileList"
      :limit="props?.limit || 10"
      multiple
      action="/disk/upload"
      :auto-upload="false"
      :on-success="success"
      :on-error="error"
      :before-submit="beforeUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      list-type="picture-card"
      :class="{ 'is-error': error }"
    >
      <el-icon>
        <Plus />
      </el-icon>
      <div class="footer"><slot name="footer" /></div>
    </el-upload>
  </div>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { UploadInstance, UploadProps, UploadUserFile, ElMessage, UploadFile, UploadFiles } from "element-plus"
import { useUserStore } from "@/store/modules/user"
import { onMounted } from "vue"
interface PropsModel {
  title?: string
  size?: number[]
  limit?: number
  viewSize?: string | "60px"
  files?: string
}

const props = defineProps<PropsModel>()

const idList = ref<string[]>([])
const fileList = ref<UploadUserFile[]>([])
const uploadRef = ref<UploadInstance>()
const handleCount = ref(0)
const errorList = [] as any[]
const { tokenInfo } = useUserStore()

const dialogImageUrl = ref("")
const dialogVisible = ref(false)

const emits = defineEmits(["onRemove"])
const handleRemove: UploadProps["onRemove"] = (item: any) => {
  const findIndex = fileList.value.findIndex((x: any) => x.id === item.id)
  if (findIndex > -1) {
    fileList.value.splice(findIndex, 1)
  }
  emits(
    "onRemove",
    fileList.value.map((x: any) => x.id).filter((x) => x)
  )
}

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = `${uploadFile.url}&w=1920`
  dialogVisible.value = true
}

const beforeUpload: UploadProps["beforeUpload"] = (res: any) => {
  if (!props.size || props.size?.length < 2) return true
  const reader = new FileReader()
  reader.onload = (event) => {
    const img = new Image()
    img.onload = () => {
      if (!props.size || props.size?.length < 2) return true
      if (img.width < props.size[0] || img.height < props.size[1]) {
        //uploadRef.value!.abort(res)
        uploadRef.value!.handleRemove(res)
        ElMessage.error(`您选择上传的${props?.title}文件不符合尺寸要求，请重新选择。`)
      }
      return true
    }
    img.src = (event.target!.result || "") as string
  }
  reader.readAsDataURL(res)
}

const success = ref<((response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | undefined>()
const error = ref<((error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | undefined>()

const submitUpload = async () => {
  return await new Promise((resolve, reject) => {
    const needUploads = fileList.value.filter((item) => item.status !== "success");

    if (needUploads.length === 0) {
      // 如果没有需要上传的文件，直接 resolve
      resolve(idList.value);
      return;
    }

    handleCount.value = 0; // 重置计数
    const totalFiles = needUploads.length; // 需要上传的文件总数
    const errorList: any[] = []; // 错误文件列表

    const successCallback = (res: any) => {
      handleCount.value += 1; // 处理计数 +1

      if (res?.id) {
        idList.value.push(res.id); // 添加成功的文件 ID
      }

      // 检查是否所有文件都已处理
      if (handleCount.value === totalFiles) {
        if (errorList.length > 0) {
          reject(errorList); // 如果有错误，返回错误列表
        } else {
          resolve(idList.value); // 如果无错误，返回成功 ID 列表
        }
      }
    };

    const errorCallback = (err: any) => {
      handleCount.value += 1; // 处理计数 +1
      errorList.push(err); // 添加错误到错误列表

      // 检查是否所有文件都已处理
      if (handleCount.value === totalFiles) {
        reject(errorList); // 返回错误列表
      }
    };

    // 设置回调函数
    success.value = successCallback;
    error.value = errorCallback;

    // 提交文件上传
    uploadRef.value!.submit();
  });
};

onMounted(() => {
  if (props.files) {
    fileList.value = props.files.split(",").map((item) => {
      return {
        id: item,
        name: item,
        url: `/disk/view?id=${item}`
      }
    })
  }
})

defineExpose({
  submitUpload
})
</script>
