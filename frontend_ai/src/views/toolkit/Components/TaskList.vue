<template>
  <v-container fluid class="pa-0">
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" class="task-dialog">
      <v-card>
        <v-toolbar color="primary" density="compact">
          <v-toolbar-title class="text-truncate" style="max-width: calc(100% - 48px);">{{ showTask?.title
            }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog" style="position: absolute; right: 0; top: 1px;">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container class="pa-4 pa-sm-6 overflow-hidden">
          <v-row>
            <v-col cols="12" md="7" class="pb-0 pb-md-4">
              <v-carousel v-model="currentSlide" :show-arrows="showImages?.length > 1" height="auto"
                hide-delimiter-background delimiter-icon="mdi-circle" class="rounded-lg mb-4">
                <v-carousel-item v-for="(image, index) in showImages" :key="index" :src="`${image}`"
                  cover></v-carousel-item>
              </v-carousel>
              <v-card-actions class="px-0 py-4 d-flex flex-wrap gap-2">
              <v-btn color="warning" variant="flat" prepend-icon="mdi-download"
                @click="downloadImage(showImages[currentSlide])">
                下载无水印原图
              </v-btn>
              <v-btn variant="outlined" prepend-icon="mdi-heart">
                0
              </v-btn>
              <v-btn variant="outlined" prepend-icon="mdi-share-variant">
                分享
              </v-btn>
            </v-card-actions>
            </v-col>

            <v-col cols="12" md="5">
              <p class="text-body-2 text-grey-darken-1 mb-6">
                {{ showTask?.created_at }}
              </p>
              <v-list>
                <v-list-item>
                    <div>
                      <v-list-item-title class="d-flex align-center">
                        <v-icon icon="mdi-text-box-outline" class="mr-2"></v-icon>
                        创作提词</v-list-item-title>
                      <v-expand-transition>
                        <div class="mt-2 pa-2 rounded bg-grey-lighten-3">
                          <div class="text-body-2">{{ showTask?.params?.prompt }}</div>
                        </div>
                      </v-expand-transition>
                    </div>
                </v-list-item>
                <v-list-item>
                    <div>
                      <v-list-item-title class="d-flex align-center">
                        <v-icon icon="mdi-cube-outline" class="mr-2"></v-icon>
                        模型</v-list-item-title>
                      <v-expand-transition>
                        <div class="mt-2 pa-2 rounded bg-grey-lighten-3">
                          <div class="text-body-2">{{ showTask?.params?.model }}</div>
                        </div>
                      </v-expand-transition>
                    </div>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-card class="task-list-container">
      <v-infinite-scroll class="task-list" ref="scrollContainerRef" color="secondary" side="start"
        height="calc(100vh - 124px)" @load="load" :empty-text="$t('$vuetify.infiniteScroll.empty')"
        :load-more-text="$t('$vuetify.infiniteScroll.loading')">
        <div class="task-list-inner">
          <div v-for="row in myTasks" :key="row.id" class="generate-container">
            <v-card-text>
              <v-label>id: {{ row.id }}</v-label>
              <v-label class="font-weight-medium my-3 d-flex flex-wrap">
                <div class="mr-3" color="primary">{{ row.title }}</div>
                <v-chip size="small" v-if="row.status === 0" color="primary">
                  状态：排队等待中
                </v-chip>
                <v-chip size="small" v-else-if="row.status === 1 || fetching === row.id" color="secondary">
                  状态：执行中 {{ row.result?.progress?.replace("%", "") || row.result?.percentCompleted || 0 }}%
                </v-chip>
                <v-chip size="small" v-else-if="row.status === 254" color="error">
                  状态：已失败
                </v-chip>
                <v-chip size="small" v-else-if="row.status === 255 && fetching != row.id" color="success">
                  状态：已完成
                </v-chip>
              </v-label>
              <div v-if="row.status > 0" class="mx-l">
                <AnimationAi v-if="(fetching === row.id || row.status <= 1) && !row.result?.imageUrl" :size="300" />
                <v-img v-if="(fetching === row.id || row.status <= 1) && row.result?.imageUrl" width="100%"
                  :src="row.result.imageUrl">
                  <template v-slot:placeholder>
                    <AnimationAi :size="300" />
                  </template>
                </v-img>
                <div class="position-relative flex flex-wrap"
                  v-if="fetching != row.id && row.status === 255 && (row.result?.images || row.result?.url || row.result?.imageUrl || row.result?.cdnImage)">
                  <div v-if="row.result?.images?.length > 0" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
                    v-for="(imgSrc, index) in row.result.images" :key="index">
                    <v-img max-width="500px"
                      @click.prevent="openPreviewDialog(row, (imgSrc?.url || imgSrc?.previewPath || imgSrc))"
                      :src="imgSrc?.url || imgSrc?.previewPath || imgSrc" aspect-ratio="1" cover>
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                      </template>
                      <template v-if="imgSrc.title" v-slot:default>
                        <v-chip size="x-small" class="rounded-0 text-color-white" color="error" variant="tonal">
                          {{ imgSrc.title }}
                        </v-chip>
                      </template>
                    </v-img>
                  </div>
                  <div v-else class="w-full">
                    <v-img @click.prevent="openPreviewDialog(row)"
                      :src="row.result?.url || row.result?.imageUrl || row.result?.cdnImage" aspect-ratio="1" cover>
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                  </div>
                </div>
                <div
                  v-if="fetching != row.id && row.status === 255 && row.method.indexOf('MJ_') === 0 && !row.result.progress">
                  <v-btn @click="fetch(row)" prepend-icon="mdi-refresh">获取图片超时，点击刷新...</v-btn>
                </div>
              </div>
              <div v-if="row.status < 0">
                <v-btn color="error" variant="flat">该任务已完成取消并退费...</v-btn>
              </div>
            </v-card-text>

            <!-- 任务操作按钮 -->
            <v-card-actions v-if="row.status === 254 || (row.status === 255 && !row.result)" class="flex-wrap">
              <v-btn color="error" @click="retry(row.id, true)" variant="flat">重新提交此任务</v-btn>
              <v-btn color="success" @click="retry(row.id, false)" variant="flat">新建同参数任务</v-btn>
              <v-btn color="warning" @click="cancel(row.id)" variant="flat">取消任务并退费</v-btn>
            </v-card-actions>

            <!-- MJ操作按钮 -->
            <v-card-actions v-if="row.result?.buttons || row.result?.components" class="flex-wrap">
              <template v-if="row.result.components">
                <v-btn v-for="btn in row.result.components" :key="btn"
                  @click="action(row, btn, $t('toolkit.MJ.' + btn))" size="small" color="primary" variant="flat"
                  class="mb-2 mr-2">
                  {{ $t("toolkit.MJ." + btn) }} -50Y{{ $t("system.coin") }}
                </v-btn>
              </template>
              <template v-if="row.result.buttons">
                <v-btn v-for="btn in row.result.buttons" :key="btn.customId"
                  @click="action(row, btn.customId, $t(`toolkit.MJ.${btn.label.replace('.', '') || btn.emoji}`))"
                  size="small" color="primary" variant="flat" class="mb-2 mr-2">
                  {{ btn.emoji + $t("toolkit.MJ." + (btn.label.replace(".", "") || btn.emoji)) }} -50Y{{
                    $t("system.coin") }}
                </v-btn>
              </template>
            </v-card-actions>

            <div v-if="row.status === 255 && row.result?.images && row.result.images.length > 0" class="mb-4 pa-4">
              <v-btn color="success" @click="openPublishDialog(row)" variant="flat" size="large" class="w-full"
                max-width="500px">
                <PublishIcon class="mr-2" />
                发布作品
              </v-btn>
            </div>
          </div>
        </div>
      </v-infinite-scroll>
    </v-card>

    <v-dialog v-model="publishDialog" max-width="600px">
      <TaskPublishForm :taskId="selectedTaskId" @published="onTaskPublished" />
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useAuthStore } from "@/stores/authStore"
import { useLocale } from "vuetify/lib/framework.mjs"
import { useSnackbarStore } from "@/stores/snackbarStore"
import { IListRequest } from "@/api/types/base"
import taskAPI from "@/api/task"
import AIProxyAPI from "@/api/aiproxy"
import AnimationAi from "@/components/animations/AnimationBot1.vue"
import TaskPublishForm from "./TaskPublishForm.vue"
import { ITask } from '@/api/types/task'
import axios from 'axios'

const { showErrorMessage, showSuccessMessage } = useSnackbarStore()
const { finishTask, consum, consumCheck } = useAuthStore()
const { task } = storeToRefs(useAuthStore())
const { t } = useLocale()

const myTasks = ref<ITask<any, any>[]>([])
const total = ref(-1)
const scrollContainerRef = ref()
const listQuery = reactive<IListRequest & { method: string; status: number }>({
  idx: 1,
  size: 10,
  method: "",
  status: -1,
})

const fetching = ref("")
const showTask = ref<ITask<any, any>>()
const dialog = ref(false)
const publishDialog = ref(false)
const selectedTaskId = ref('')
const currentSlide = ref(0)

const showImages = computed(() => {
  if (showTask.value?.result?.images?.length > 0) {
    return showTask.value?.result?.images.map((x) => {
      return x?.url || x?.previewPath || x
    })
  }
  return [showTask.value?.result?.imageUrl || showTask.value?.result?.cdnImage]
})

const openPublishDialog = (task: ITask<any, any>) => {
  selectedTaskId.value = task.id
  publishDialog.value = true
}

const onTaskPublished = () => {
  publishDialog.value = false
  showSuccessMessage('任务已成功发布')
}

// ... [其他现有的代码保持不变]



/** 监听新任务派发 */
let updateTasksTimeoutId
watch(task, (val, oldVal) => {
  if (!val) return
  updateTasksTimeoutId = setTimeout(() => {
    const taskIndex = myTasks.value.findIndex(item => item.id === val.id)
    if (taskIndex >= 0) myTasks.value[taskIndex] = val

    if (val.status === 255 && (val.type.indexOf('FLUX') === 0 || val.type.indexOf('MJ') === 0 || val.type.indexOf('WORKFLOW') === 0)) {
      fetch(val);
    }
    finishTask();
  }, 1000)
})

const load = async ({ done }) => {
  if (myTasks.value.length >= total.value && total.value >= 0) {
    done('empty')
    return
  }
  taskAPI.myTasksApi(listQuery).then((result) => {
    myTasks.value = myTasks.value?.concat(result.data)
    total.value = result.total
    listQuery.idx++
    const lastTask = myTasks.value[0]
    fetch(lastTask)
    done('ok')
  }).catch((err) => {
  });
}

const add = (task: ITask<any, any>) => {
  myTasks.value.unshift(task);
  // 自动滚动到最新内容
  nextTick(() => {
    if (scrollContainerRef.value) {
      scrollContainerRef.value.$el.scrollTop = scrollContainerRef.value.$el.scrollHeight;
    }
  });
}
const cancel = async (id: string) => {
  const { data } = await taskAPI.cancel({ id })
  const findIndex = myTasks.value.findIndex(x => x.id === id)
  myTasks.value[findIndex] = data
}
const retry = async (id: string, replace: boolean) => {
  if (replace) {
    const findIndex = myTasks.value.findIndex(x => x.id === id)
    myTasks.value.splice(findIndex, 1)
  }
  const { data } = await taskAPI.retry({ id, replace })
  add(data);
}

const fetch = async (task: ITask<any, any>) => {
  if (task.type.indexOf('MJ') === 0) {
    if (task.result?.cdnImage || task.result?.progress?.indexOf('100') === 0) return
    const jobId = task.result.urls?.get || task.result.jobId || task.result.result || task.result.id
    if (jobId) {
      fetching.value = task.id
      const timeObj = setTimeout(async () => {
        const { data } = await AIProxyAPI.fetch({ taskId: task.id, type: task.type, jobId })
        const taskIndex = myTasks.value.findIndex(item => item.id === task.id)
        if (taskIndex >= 0) {
          myTasks.value[taskIndex].status = data.status
          myTasks.value[taskIndex].result = data.result
        }
        if (data.result && data.result.progress?.indexOf('100') === 0) {
          if (taskIndex >= 0) myTasks.value[taskIndex] = data
          clearTimeout(timeObj)
          fetching.value = ""
          return
        }
        if (data.status === 254) {
          clearTimeout(timeObj)
          fetching.value = ""
          return
        }
        await fetch(task)
      }, 5000);
    }
  }

  if (task.type.indexOf("WORKFLOW") === 0) {
    if (task.result?.images?.length > 0 || task.result?.percentCompleted?.indexOf('100') === 0) return
    const jobId = task.result.id
    fetching.value = task.id
    const timeObj = setTimeout(async () => {
      const { data } = await AIProxyAPI.WF_fetch({ taskId: task.id, type: task.type, jobId: `${jobId}` })
      const taskIndex = myTasks.value.findIndex(item => item.id === task.id)
      if (taskIndex >= 0) {
        myTasks.value[taskIndex].status = data.status
        myTasks.value[taskIndex].result = data.result
      }
      if (data.result && data.result?.percentCompleted && data.result?.percentCompleted?.toString().indexOf('100') === 0) {
        if (taskIndex >= 0) myTasks.value[taskIndex] = data
        clearTimeout(timeObj)
        fetching.value = ""
        return
      }
      if (data.status === 254) {
        clearTimeout(timeObj)
        fetching.value = ""
        return
      }
      await fetch(task)
    }, 5000);
  }
}
const emits = defineEmits(["onPaint"])
const action = async (task: any, action: string, title?: string) => {
  const llA = action.toLowerCase()
  if (llA.indexOf("inpaint") >= 0) {
    emits("onPaint", task, action, title)
    return
  }
  const actionParmas = {
    jobId: task.result?.jobId,
    model: task.params?.model,
    taskId: task.result.id,
    action,
  }
  const { data } = await AIProxyAPI.MJ_submit({
    method: "action",
    params: actionParmas,
    title: `${task.title}::${title}`,
    type: task.type
  })
  const findIndex = myTasks.value.findIndex(x => x.id === data.id)
  myTasks.value.splice(findIndex, 1)
  myTasks.value.unshift(data);
  // 自动滚动到最新内容
  nextTick(() => {
    if (scrollContainerRef.value) {
      scrollContainerRef.value.$el.scrollTop = scrollContainerRef.value.$el.scrollHeight;
    }
  });
}

const openPreviewDialog = (task: ITask<any, any>, img?: string) => {
  showTask.value = task
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  showTask.value = undefined
}

const downloadImage = async (imageUrl: string) => {
  try {
    const link = document.createElement('a')
    link.href = imageUrl
    link.target = '_blank'
    link.download = 'downloaded_image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Failed to download image:', error)
  }
}


defineExpose({
  add,
  cancel
})
</script>

<style scoped lang="scss">
.task-list-inner {
  display: flex;
  flex-direction: column-reverse;
}

.task-list-card {
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.task-card {
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
}

.image-title {
  position: absolute;
  bottom: 4px;
  left: 4px;
}

@media (max-width: 600px) {
  .task-list-card {
    height: calc(100vh - 56px);
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>