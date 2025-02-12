<template>
  <div class="operate-dialog">
    <el-drawer v-model="$o.upload" title="上传文件" direction="rtl">
      <el-tabs v-model="uploadType">
        <el-tab-pane label="本地上传" name="local">
          <div class="cover">
            <el-upload
              v-model:file-list="uploadFileList"
              :headers="{ Authorization: 'Bearer ' + tokenInfo.accessToken }"
              :on-success="$o.uploadSuccess"
              multiple
              action="/disk/upload"
              list-type="picture"
              :data="{ uuid: $o.directoryId }"
            >
              <el-button type="primary">选择文件</el-button>
            </el-upload>
          </div>
        </el-tab-pane>
        <el-tab-pane label="网络链接" name="link">
          <el-input type="textarea" :max-rows="10" :rows="10" v-model="uploadUrl" placeholder="请输入网络链接" />
          <el-button type="primary" style="margin-top: 8px">开始上传</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
    <el-dialog v-model="$o.create" title="创建新文件夹" width="375px">
      <el-form>
        <el-form-item label="文件夹名称">
          <el-input v-model="$o.createTitle" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="$o.create = false">取消</el-button>
          <el-button type="primary" @click="createDirectory"> 创建 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="$o.remove" title="删除目录" width="30%">
      <el-text line-clamp="2"
        >您发起了删除操作，当前选择的文件或文件夹将被删除进入回收站，您可以将其从回收站恢复，或从回收站中永久删除。</el-text
      >
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="$o.remove = false">取消</el-button>
          <el-button type="danger" @click="removeConfirm">删除</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="$o.edit" width="50%">
      <edit-form
        :key="'dir_' + currentEditItem.id"
        v-if="currentEditItem['deep'] >= 0"
        :item="currentEditItem"
        :name="$o.channel"
        :id="currentEditItem.id"
        ref="editFormRef"
        :dialog="true"
        :cb="$o.editSuccess"
      />
      <file-edit
        :key="'file_' + currentEditItem.id"
        v-else
        ref="editFormRef"
        :dialog="true"
        :cb="$o.editSuccess"
        :item="currentEditItem"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { create } from "@/api/directory"
import { useUserStore } from "@/store/modules/user"
import { ElMessageBox, UploadUserFile } from "element-plus"
import "ranui/preview"
import { ref, reactive } from "vue"
import { deleteById as deleteDirById, deleteFileById } from "@/api/directory/index"
import editForm from "./edit.vue"

const { tokenInfo } = useUserStore()
const $o = reactive<{
  channel: string
  directoryId: string
  create: boolean
  createTitle: string
  createSuccess: (data: any) => void
  remove: boolean
  removeItems: any[]
  removeSuccess: (data: any) => void
  edit: boolean
  editSuccess: (data: any) => void
  upload: boolean
  uploadSuccess: (response: any) => void
}>({
  create: false,
  createTitle: "",
  createSuccess: () => {},
  remove: false,
  removeItems: [],
  removeSuccess: () => {},
  edit: false,
  editSuccess: () => {},
  upload: false,
  uploadSuccess: () => {},
  directoryId: "",
  channel: ""
})
const uploadUrl = ref<string>("")
const uploadType = ref<string>("local")
const currentEditItem = ref<any>()

const openCreate = async (id: string, channel: string, createSuccess: (data: any) => void) => {
  $o.directoryId = id
  $o.create = true
  $o.channel = channel
  $o.createSuccess = (data: any) => {
    $o.create = false
    createSuccess(data)
  }
}
const openEdit = async (data: any) => {
  $o.edit = true
  currentEditItem.value = data
}
const openRemove = async (removeItems: any[], removeSuccess: (data: any) => void) => {
  $o.remove = true
  $o.removeItems = removeItems
  $o.removeSuccess = removeSuccess
}
const removeConfirm = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在删除...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  })
  if ($o.removeItems.length) {
    $o.removeItems.forEach(async (item: any) => {
      const delMethod = item.type === "dir" ? deleteDirById : deleteFileById
      await delMethod(item.id)
      $o.removeSuccess(item)
    })
    $o.removeItems = []
    $o.remove = false
    ElMessage({
      type: "success",
      message: `操作: 删除成功 ...`
    })
  }
  loading.close()
}
const createDirectory = async () => {
  const createForm = {
    title: $o.createTitle,
    parent_uuid: $o.directoryId,
    channel_relation: $o.channel
  }
  const { data } = await create(createForm)
  $o.createTitle = ""
  $o.create = false
  $o.createSuccess(data)
}

/**upload */
const uploadFileList = ref<UploadUserFile[]>([])
const openUpload = (id: string, uploadSuccess: (response: any) => void) => {
  if (!id) {
    ElMessageBox.alert("不允许在根目录直接上传文件，请选择一个文件夹进行上传。", "系统拒绝", {
      confirmButtonText: "关闭"
    })
  }
  $o.upload = true
  $o.directoryId = id
  $o.uploadSuccess = uploadSuccess
}

defineExpose({
  openEdit,
  openRemove,
  openUpload,
  openCreate
})
</script>
