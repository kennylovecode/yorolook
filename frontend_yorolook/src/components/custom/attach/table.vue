<template>
  <div class="attachment-manager">
    <el-button type="primary" @click="openAttachmentForm(-1)">新增附件</el-button>
    <el-table :key="attachments.length + '_' + currentIndex" :data="attachments" style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column label="封面图片" width="120">
        <template #default="scope">
          <el-image style="width: 50px; height: 50px" :src="`/disk/view?id=${scope.row.cover}&w=100`" />
        </template>
      </el-table-column>
      <el-table-column prop="file.original_filename" label="源文件" />
      <el-table-column prop="file.original_size" label="大小" />
      <el-table-column prop="file.original_mime_type" label="类型" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="openAttachmentForm(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteAttachment(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :z-index="999"
      width="300px"
      v-model="dialogVisible"
      :title="formMode === 'add' ? '新增附件' : '编辑附件'"
    >
      <attachEdit :article_uuid="props.article_uuid" :dialog="true" :attachment="currentAttachment" :cb="finishEdit" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { ElMessage } from "element-plus"
import attachEdit from "./edit.vue"
import { Delete, Edit, Document, Picture, Folder, VideoCamera } from "@element-plus/icons-vue"
import { IAttachResult } from "@/api/article_attach/types"
import { list, deleteById } from "@/api/article_attach/index"

interface Attachment {
  id?: string
  title: string
  icon: string
  coverImage: string
  fileType: string
  order: number
}

const props = defineProps<{
  article_uuid: string
}>()

const attachments = ref<IAttachResult[]>([])
const dialogVisible = ref(false)
const formMode = ref<"add" | "edit">("add")
const currentAttachment = ref<IAttachResult | null>(null)
const currentIndex = ref<number>(-1)

onMounted(() => {
  fetchAttachments()
})

const fetchAttachments = async () => {
  const { data } = await list(props.article_uuid)
  attachments.value = data
}

const openAttachmentForm = (idx: number, attachment?: IAttachResult) => {
  currentIndex.value = idx
  if (attachment) {
    formMode.value = "edit"
    currentAttachment.value = { ...attachment }
  } else {
    formMode.value = "add"
    currentAttachment.value = null
  }
  dialogVisible.value = true
}

const finishEdit = (attachment: IAttachResult) => {
  if (formMode.value === "add") {
    // 在数组最前面加入这个元素
    attachments.value.unshift(attachment)
  } else {
    attachments.value[currentIndex.value] = { ...attachment }
  }
  dialogVisible.value = false
  currentIndex.value = -1
}

const deleteAttachment = async (idx: number, attachment: IAttachResult) => {
  // 这里应该是删除API的逻辑
  await deleteById(attachment.id as number)
  ElMessage.success("附件删除成功")
  attachments.value.splice(idx, 1)
}
</script>

<style scoped>
.attachment-manager {
  padding: 20px;
}
</style>
