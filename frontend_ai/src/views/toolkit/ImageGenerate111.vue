<script setup lang="ts">
import { watch } from "vue";
import TextToImage from "./Components/TextToImage.vue";
import AnimationAi from "@/components/animations/AnimationBot1.vue";
import { IListRequest } from "@/api/types/base";
import { useAuthStore } from "@/stores/authStore";
import { processor } from "@/api/toolkit";
import { useLocale } from "vuetify/lib/framework.mjs";
import taskAPI from "@/api/task";
import { useSnackbarStore } from "~/src/stores/snackbarStore";

const { showErrorMessage, showSuccessMessage } = useSnackbarStore()
const { finishTask, consum, consumCheck } = useAuthStore()
const { task } = storeToRefs(useAuthStore())
const { t } =useLocale()

/** 任务列表 */
const myTasks = ref<ITask<any, any>[]>([])
const total = ref(-1)
const listQuery = reactive<IListRequest & {
  method: string
  status: number
}>({
  idx: 1,
  size: 10,
  method: "",
  status: -1,
});
const load = async ({ done })=>{
  if(myTasks.value.length>=total.value && total.value>=0) {
    done('empty')
    return
  } 
  taskAPI.myTasksApi(listQuery).then((result) => {
    myTasks.value = myTasks.value?.concat(result.data)
    total.value = result.total
    listQuery.idx++
    const lastTask = myTasks.value[0]
    console.log(lastTask)
    if(lastTask.status===255 && lastTask.method.indexOf('MJ_')===0 && !lastTask.result.progress && lastTask.result.jobId){
      MJfetch(lastTask.id, lastTask.result?.jobId, lastTask.params.model)
    }
    done('ok')
  }).catch((err) => {
  });
}
const generate = async (model:any,title: string, method: string,  params: any)=>{
  if(!consumCheck(model.consum_type, model.consum)){
    showErrorMessage(`${t('system.coin') + t('error.NoConsumCheck')}`);
    return
  }
  const { data } = await processor.generate(title,method,params)
  finished(data)
  consum(model.consum_type, model.consum);
}

/** 监听新任务派发 */
let updateTasksTimeoutId
watch(task,(val,oldVal)=>{
  if(!val) return
  updateTasksTimeoutId = setTimeout(()=>{
    const taskIndex = myTasks.value.findIndex(item => item.id === val.id)
    if(taskIndex >= 0) myTasks.value[taskIndex] = val

    if(val.status === 255 && val.method.indexOf('MJ_')===0){
      MJfetch(val.id,val.result?.jobId,val.method);
    }
    finishTask();
  }, 1000)
})

const MJfetch = async (id: string, mjid: string, method: string) => {
  const intervalTime = method === "relax"? 30000 : 5000
  fetching.value = id
  const timeObj = setTimeout(async () => {
    const { data } = await processor?.MJfetch(id,mjid)
    const taskIndex = myTasks.value.findIndex(item => item.id === id)
    if(data.result && data.result.progress === '100') {
      if(taskIndex >= 0) myTasks.value[taskIndex] = data
      clearTimeout(timeObj)
      fetching.value = ""
    }
    if(data.status===254){
      if(taskIndex >= 0) {
        myTasks.value[taskIndex].status = data.status
        myTasks.value[taskIndex].result = data.result
      }
      clearTimeout(timeObj)
      fetching.value = ""
    }
    else await MJfetch(id,mjid,method)
  }, intervalTime);
}
const MJaction = async (action: string, jobId: string) => {
  if(!consumCheck('amount', -50)) {
    showErrorMessage(`${t('system.coin') + t('error.NoConsumCheck')}`);
    return
  }
  const type = "MJ_action"
  const { data } = await processor.generate(t('toolkit.MJ'+action), type, {
    "jobId": jobId,
    "action": action,
    "timeout": 1200,
    "hookUrl": "",
    "getUImages": true
  })
  const findIndex = myTasks.value.findIndex(x=> x.id===data.id)
  myTasks.value.splice(findIndex, 1)
  myTasks.value.unshift(data);
  consum('amount', -50);
  // 自动滚动到最新内容
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.$el.scrollTop = scrollContainer.value.$el.scrollHeight;
    }
  });
}

const previewDialog = ref(false)
const previewRow = ref<any>({})
const scrollContainer = ref()
const fetching = ref("")
const finished = (data) => {
  myTasks.value.unshift(data);
  // 自动滚动到最新内容
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.$el.scrollTop = scrollContainer.value.$el.scrollHeight;
    }
  });
}

const openPreviewDialog = (row)=>{
  previewRow.value = row
  previewDialog.value = true
}

const tab = ref("MJ")
const tabs = ["MJ", "FLUX"]
const url = ref("")
watch(tab,(val,oldVal)=>{
  if(val!= oldVal) listQuery.method = val+"_generate"
})

const retry = async (id: string, replace: boolean)=>{
  if(replace){
    const findIndex = myTasks.value.findIndex(x=> x.id===id)
    myTasks.value.splice(findIndex, 1)
  }
  const { data } = await taskAPI.retry({id, replace})
  finished(data);
}
const cancel = async (id: string)=>{
  const { data } = await processor.cancel(id)
  const findIndex = myTasks.value.findIndex(x=> x.id===id)
  myTasks.value[findIndex] = data
}

</script>

<template>
  <v-row class="h-full">
    <v-col cols="6" md="4">
      <div class="h-full position-relative top-0">
        <v-card class="position-absolute top-0 overflow-y-scroll" width="100%" height="100%">
          <v-toolbar color="primary">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>{{ $t('toolkit.control_panel') }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-tabs v-model="tab" bg-color="primary">
            <v-tab v-for="item in tabs" :value="item">{{ item }}</v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item v-for="item in tabs" :value="item">
              <TextToImage :key="url" :tab :url @onGenerate="generate" />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </div>
    </v-col>
    <v-col cols="12" md="8">
      <v-card class="h-full pa-5">
        <v-infinite-scroll class="flex-column-reverse" ref="scrollContainer" color="secondary" side="end"
          height="calc(100vh - 164px)" @load="load" :empty-text="$t('$vuetify.infiniteScroll.empty')"
          :load-more-text="$t('$vuetify.infiniteScroll.loading')">
          <div v-for="row in myTasks" class="generate-container">
            <v-card-text>
              <v-label class="font-weight-medium my-3">
                <div color="primary">{{ row.title }}</div>
                <div class="mx-3 text-disabled">id: {{ row.id }}</div>
                <v-chip size="small" v-if="row.status === 0" color="primary">
                  状态：排队等待中
                </v-chip>
                <v-chip size="small" v-else-if="row.status === 1 || fetching===row.id" color="secondary">
                  状态：执行中
                </v-chip>
                <v-chip size="small" v-else-if="row.status === 254" color="red">
                  状态：已失败
                </v-chip>
                <v-chip size="small" v-else-if="row.status === 255 && fetching!=row.id" color="green">
                  状态：已完成
                </v-chip>
              </v-label>
              <div class="mx-l">
                <AnimationAi v-if="fetching==row.id || row.status<=1" :size="300" />
                <div class="position-relative"
                  v-if="fetching!=row.id && row.status === 255 && (row.result?.url || row.result?.imageUrl|| row.result?.cdnImage)">
                  <v-img width="100%" @click.prevent="openPreviewDialog(row)"
                    :src="row.result?.url || row.result?.imageUrl|| row.result?.cdnImage">
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </div>
                <div
                  v-if="fetching!=row.id && row.status===255 && row.method.indexOf('MJ_')===0 && !row.result.progress">
                  <v-btn @click="MJfetch(row.id,row.result.jobId,row.params.model)" prepend-icon="mdi-refresh">
                    获取图片超时，点击刷新...</v-btn>
                </div>
              </div>
            </v-card-text>
            <template v-if="row.status === 255 && (row.result?.url || row.result?.imageUrl|| row.result?.cdnImage)">
              <v-card-actions class="d-flex flex-wrap" v-if="row.result?.components?.length > 0">
                <v-btn size="small" @click="MJaction(btn, row.result.jobId)" v-for="btn in row.result.components"
                  class="text-none mb-4" color="primary" variant="flat">{{ $t("toolkit.MJ" + btn) }} -50Y{{ $t("system.coin") }}</v-btn>
              </v-card-actions>
              <v-card-actions v-else>
                <v-btn prepend-icon="mdi-image-refresh" color="primary">{{
                  $t(`toolkit.iti`) }}</v-btn>
                <v-btn prepend-icon="mdi-image-edit" color="primary">{{ $t(`toolkit.edit`) }}</v-btn>
                <v-btn prepend-icon="mdi-image-text" color="primary">{{ $t(`toolkit.itt`) }}</v-btn>
                <v-btn prepend-icon="mdi-image-text" color="primary">{{ $t(`toolkit.itv`) }}</v-btn>
              </v-card-actions></template>
              <template v-if="row.status===254">
                <v-card-actions>
                  <v-btn color="red" @click="retry(row.id,true)" variant="flat">重新提交此任务</v-btn>
                  <v-btn color="green" @click="retry(row.id,false)" variant="flat">新建同参数任务</v-btn>
                  <v-btn color="#000" @click="cancel(row.id)" variant="flat">取消任务并退费</v-btn>
                </v-card-actions>
              </template>
          </div>
        </v-infinite-scroll>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="previewDialog" height="100%" close-on-back>
    <v-card class="mx-auto" width="100%" height="100%">
      <v-img class="align-end" :key="`${previewRow?.id}_previewer`" max-height="100%" max-width="100%"
        :src="previewRow?.result?.url||previewRow?.result?.imageUrl||previewRow?.result?.cdnImage">
        <v-card-text class="bg-white">
          {{ previewRow?.result?.prompt }}
        </v-card-text>
      </v-img>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.generate-container{
  width: 80%;
}
.loading {
  display: flex;
  align-items: center;
  background: #f4f4f4;
  flex-wrap: wrap;
  text-align: center;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.op{
  opacity: .1;
  border:solid 1px #fff;
}
</style>
