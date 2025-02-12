<script setup lang="ts">
import { ref, computed } from "vue"
import { Document, More, Download, Link, VideoPlay } from "@element-plus/icons-vue"
import type { IAttachResult } from "@/api/article_attach/types"
import { preDownApi } from "@/api/article_attach/index"
import "ranui/preview"
import { requestNoBase } from "@/utils/service"
import { useUserStore } from "@/store/modules/user"
import axios from "axios"

const props = defineProps<{
  attachs: IAttachResult[]
}>()

const dialogVisible = ref(false)

const displayAttachs = computed(() => {
  return props.attachs.slice(0, 2)
})

const hasMore = computed(() => {
  return props.attachs.length > 2
})

const remainingCount = computed(() => {
  return props.attachs.length - 2
})

const emit = defineEmits<{
  (e: "select", attach: IAttachResult): void
}>()

const handleSelect = (attach: IAttachResult) => {
  emit("select", attach)
  dialogVisible.value = false
}

const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase()
  switch (ext) {
    case "pdf":
      return Document
    case "doc":
    case "docx":
      return Document
    case "xls":
    case "xlsx":
      return Document
    case "ppt":
    case "pptx":
      return Document
    default:
      return Link
  }
}

const previewFileUrl = ref<string>("")

const formatFileSize = (size: number) => {
  if (!size) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB"]
  let index = 0
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }
  return `${size.toFixed(2)} ${units[index]}`
}

/** 预下载附件，取得附件信息 */
const preDown = async (file_val: string) => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在准备下载资源...",
    background: "rgba(255, 255, 255, 0.7)"
  })
  const { data: item } = await preDownApi(file_val)
  const url = `http://localhost:3000/util/download_file?id=${file_val}`
  /** 从url 下载文件 */
  try {
    const { tokenInfo } = useUserStore()
    const response = await axios.get(url, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${tokenInfo.accessToken}`
      }
    })

    if (response.statusText !== "OK") throw new Error("下载失败")

    const bloburl = window.URL.createObjectURL(new Blob([response.data]))
    const a = document.createElement("a")
    a.href = bloburl
    a.download = item.title
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(bloburl)
  } catch (error) {
    console.error("下载失败:", error)
  }
  loading.close()
}

const preView = async (file_val: string) => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在准备预览资源...",
    background: "rgba(255, 255, 255, 0.7)"
  })
  const { data: item } = await preDownApi(file_val)
  const method1Options = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf"
  ]
  if (item.original_mime_type?.indexOf("image/") === 0) {
    ElMessageBox.alert(`<img src="/disk/view?id=${file_val}"></img>`, {
      dangerouslyUseHTMLString: true
    })
  } else if (method1Options.indexOf(item.original_mime_type as string) > -1) {
    const response = await requestNoBase<any>({
      url: `/disk/fileview?id=${file_val}`,
      responseType: "blob"
    })
    previewFileUrl.value = URL.createObjectURL(response)
  } else {
    ElMessage.error("暂不支持预览")
  }
  loading.close()
}
</script>

<template>
  <div class="attach-list">
    <!-- 显示前两个附件 -->
    <div class="attach-buttons">
      <div v-for="attach in displayAttachs" :key="attach.id" class="attach-button">
        <el-icon class="attach-icon">
          <component :is="getFileIcon(attach.title)" />
        </el-icon>
        <el-text :line-clamp="1" class="attach-name">{{ attach.title }}</el-text>
        <el-button @click="preView(attach.file_val)" :icon="VideoPlay" size="small" type="primary" plain link />
        <el-button @click="preDown(attach.file_val)" :icon="Download" size="small" type="primary" plain link />
      </div>

      <!-- 更多按钮 -->
      <el-button v-if="hasMore" size="small" type="info" plain class="more-button" @click="dialogVisible = true">
        <el-icon><More /></el-icon>
        <span>更多附件</span>
        <el-badge :value="remainingCount" class="more-badge" />
      </el-button>
    </div>

    <!-- 附件列表弹窗 -->
    <el-dialog :z-index="1003" v-model="dialogVisible" title="附件列表" width="800px" destroy-on-close>
      <el-table :data="props.attachs" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="title" label="文件名称" min-width="200">
          <template #default="{ row }">
            <div class="file-info">
              <el-icon class="file-icon">
                <component :is="getFileIcon(row.title)" />
              </el-icon>
              <span>{{ row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="file.original_size" label="文件大小" width="120" align="center">
          <template #default="{ row }">
            {{ formatFileSize(row.file?.original_size || 0) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button @click="preView(row.file_val)" :icon="VideoPlay" size="small" type="primary" plain>
              预览
            </el-button>
            <el-button @click="preDown(row.file_val)" :icon="Download" size="small" type="primary" plain>
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
  <r-preview v-if="previewFileUrl" :key="previewFileUrl" :src="previewFileUrl" />
</template>

<style lang="scss" scoped>
.attach-list {
  width: 100%;
}

.attach-buttons {
  display: flex;
  gap: 8px;
  max-width: 100%;

  .attach-button {
    display: flex;
    align-items: center;
    width: 33.3%;
    gap: 4px;
    border: var(--el-border);
    padding: 8px;
    border-radius: var(--el-border-radius-base);
    transition: all 0.3s;

    :deep(.el-button + .el-button) {
      margin: 0;
    }

    &:hover {
      cursor: pointer;
      background-color: var(--el-color-primary-light-9);
      border-color: var(--el-color-primary);
    }

    .el-button:hover {
      color: var(--el-color-primary);
    }
  }
}

.attach-icon {
  font-size: 16px;
  flex-shrink: 0;
  color: var(--el-text-color-regular);
}

.attach-name {
  flex: 1;
  margin: 0 8px;
}

.more-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
}

.more-badge {
  margin-left: 4px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 8px;

  .file-icon {
    font-size: 16px;
    color: var(--el-text-color-regular);
  }
}

:deep(.el-badge__content) {
  transform: translateY(-50%) translateX(100%);
}

:deep(.el-table) {
  --el-table-border-color: var(--el-border-color-lighter);

  .el-button + .el-button {
    margin-left: 8px;
  }
}
</style>
