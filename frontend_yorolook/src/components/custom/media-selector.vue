<template>
  <el-button size="small" @click.stop="openDialog">从媒体库选择</el-button>
  <el-dialog v-model="dialogVisible" :before-close="handleClose" :z-index="1003" append-to-body fullscreen lock-scroll>
    <div class="media-selector">
      <div class="web-iframe">
        <iframe :key="mediaLibraryUrl" :src="mediaLibraryUrl" frameborder="0"
          style="width: 100%; min-height: calc(100vh - 48px)" />
      </div>
      <div class="pick-iframe" :class="{ 'drag-over': isDragging }" @dragover.prevent="onDragOver"
        @dragleave="onDragLeave" @drop.prevent="onDrop">
        <div class="list">
          <div v-if="selectedList.length > 0" class="render-wrapper">
            <div class="render-item" v-for="(item, index) in selectedList" :key="index">
              <div class="icon">
                <img width="48px" height="48px" v-if="item.original_mime_type.indexOf('image') >= 0"
                  :src="`/disk/view?id=${item.id}&w=48`" alt="" />
              </div>
              <div class="render-item-title">
                <el-text line-clamp="1">{{ item.title }}</el-text>
                <el-text line-clamp="2">{{ item.keywords }}</el-text>
              </div>
            </div>
          </div>
          <!-- 写一个接收拖拽接收信息的组件 -->
          <div class="drag-drop-area">拖拽文件或数据到此区域</div>
        </div>
        <div class="dialog-footer">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button size="small" type="primary" @click="confirmSelection">确认</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue"
import { ElMessage } from "element-plus"

const props = defineProps<{
  count: number | 1
  type: "dir" | "file"
  accept: string
}>()

// 定义 selectedList 响应式数据
const selectedList = ref<any[]>([])
const isDragging = ref(false)

const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

function isMimeTypeAccepted(mimeType: any, acceptTypes: any[]) {
  if (!mimeType) return false
  if (acceptTypes.includes("*/*")) {
    return true
  }
  for (const acceptType of acceptTypes) {
    const [type, subtype] = acceptType.split("/")
    if (subtype === "*") {
      if (mimeType.startsWith(`${type}/`)) {
        return true
      }
    } else if (mimeType === acceptType) {
      return true
    }
  }
  return false
}

const onDrop = (event: DragEvent | Event) => {
  isDragging.value = false
  const dragEvent = event as DragEvent
  const jsonData = dragEvent.dataTransfer?.getData("application/json") || "{}"
  const data = JSON.parse(jsonData)
  if (!data.original_mime_type && props.type != "dir") {
    ElMessage.error(`选择的类型不匹配，需要选择文件...`)
    return
  }

  const acceptTypes = props.accept.split(",").map((type) => type.trim())
  const isAccepted =
    props.accept === "" || props.accept === "*/*" || isMimeTypeAccepted(data.original_mime_type, acceptTypes)

  if ((props.type === "dir" && data.deep >= 1) || (props.type !== "dir" && isAccepted)) {
    if (props.count && selectedList.value.length >= props.count) {
      ElMessage.info(`当前只允许选择${props.count}个素材,超出部分将会覆盖之前的选择...`)
      selectedList.value.splice(0, 1)
    }
    selectedList.value.push(data)
  } else {
    if (props.type === "dir") {
      ElMessage.error(`选择的类型不匹配，需要选择文件夹...`)
    } else {
      ElMessage.error(`选择的类型不匹配，支持的文件类型为: ${props.accept}...`)
    }
  }
}

// 控制对话框的显示和隐藏
const dialogVisible = ref(false)
// 当前激活的标签页
const mediaLibraryUrl = ref("/media?pick=1")

// 打开对话框的方法
const openDialog = () => {
  dialogVisible.value = true
}

// 关闭对话框的方法
const handleClose = () => {
  dialogVisible.value = false
}

// 确认选择的方法
const confirmSelection = () => {
  if (selectedList.value.length > 0) {
    emit("confirm", selectedList.value)
  }
  handleClose()
}

// 定义 emit 事件
const emit = defineEmits(["confirm"])
</script>

<style lang="scss" scoped>
/* 添加一些样式以美化弹窗 */
.media-selector {
  position: relative;
  height: calc(100vh - 48px);
  display: flex;

  .web-iframe {
    width: 80%;
  }

  .pick-iframe {
    border: var(--el-border);
    width: 20%;
    padding: 20px;
    position: relative;
    color: var(--el-text-color-secondary);

    .drag-drop-area {
      position: absolute;
      top: 0;
      left: 0;
      height: calc(100vh - 48px);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: left;
      font-size: 12px;
      padding: 12px;
      line-height: 16px;
    }

    .render-wrapper+.drag-drop-area {
      display: none;
    }

    .drag-over {
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
    }

    .list {
      width: 100%;

      .render-wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .render-item {
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          border-bottom: dashed 1px var(--el-text-color-secondary);
          padding-bottom: 8px;
          margin-top: 8px;

          .render-item-title {
            width: calc(100% - 50px);
            display: flex;
            flex-wrap: wrap;

            .el-text {
              &:first-child {
                font-weight: bold;
              }

              font-size: 12px;
              margin: 3px;
              overflow: hidden;
            }
          }
        }
      }
    }
  }

  .dialog-footer {
    position: fixed;
    margin: 0 auto;
    bottom: 25px;
  }
}
</style>
