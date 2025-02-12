<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import AIProxyAPI from '@/api/aiproxy'
import { IAIConfig, ISubmitBody, IMJSubmitParams } from '@/api/types/aiproxy'
import ImageInput from './ImageInput.vue';
import Recommend from './Recommend.vue';
import ConvasCrop from './ConvasCrop.vue';
import { useLocale } from 'vuetify/lib/framework.mjs';


const {t} = useLocale()
const submitBody = ref<ISubmitBody>({
  method: "",
  title: "",
  type: "",
  params: {},
})
const submitParams = ref<IMJSubmitParams>({
  model: "",
  prompt: "",
  hookUrl: "",
  jobId: "",
  action: "",
  base64: "",
  imgBase64Array: [],
  dimensions: "",
  mask: "",
  url: "",
})
const config = ref<IAIConfig<string>>()
const needCost = ref<number>(0)
const blendFileCount = ref<number>(5)
const recommendDialog = ref<boolean>(false)
const recommendName = ref("")

const getCost = (model: string, method: string, action?: string) => {
  let costFee = -1
  if (action && config.value?.cost[model][action]) {
    costFee = config.value?.cost[model][action]
    return costFee / 100
  }
  if (method && config.value?.cost[model][method]) {
    costFee = config.value?.cost[model][method]
    return costFee / 100
  }
  return costFee / 100
}

watch(submitBody.value, (val, oldVal) => {
  if (submitParams.value.model)
    needCost.value = getCost(submitParams.value.model, val.method)
})

watch(submitParams.value, (val, oldVal) => {
  if (val.model)
    needCost.value = getCost(val.model, submitBody.value.method)
})
const openRecommend = (name) => {
  recommendName.value = name
  recommendDialog.value = true
}
const recommendSelected = (append: string) => {
  recommendDialog.value = false
  if (submitParams.value.prompt) submitParams.value.prompt += ","
  submitParams.value.prompt += append
}
const onCroped = (points: any[], maskBase64: string)=>{
  submitParams.value.mask = maskBase64
}

onBeforeMount(async () => {
  const { data } = await AIProxyAPI.config("MJ");
  if (data) {
    config.value = data
    submitBody.value.method = config.value?.methods[0] ||""
    submitParams.value.model = config.value?.models[0]
    submitBody.value.type = config.value?.types[0] || ""
  }
})

const emits = defineEmits(["onPosted"])
const doPost = async () => {
  const typeText = t(`toolkit.MJ.${submitBody.value.type}`)
  const modelText = t(`toolkit.MJ.${submitParams.value.model||""}`)
  const methodText = t(`toolkit.MJ.${submitBody.value.method}`)
  submitBody.value.title = `${typeText}::${modelText}::${methodText}`
  submitBody.value.params = submitParams.value;
  const {data} = await AIProxyAPI.MJ_submit(submitBody.value);
  emits("onPosted",data)
};

const inpaintTask = ref<ITask<any,any>>()
const clearInpaint = ()=>{
  inpaintTask.value = undefined
  submitBody.value.method = config.value?.methods[0]||""
  submitParams.value.action = ""
}
defineExpose({
  setInpaintTask(task: ITask<any,any>,action: string){
    inpaintTask.value = task
    submitBody.value.method = "inpaint"
    submitBody.value.type = task.type
    submitParams.value.model = task.params.model
    submitParams.value.action = action
    submitParams.value.jobId = task.result.id || task.result.jobId
  }
})
</script>

<template>
  <v-dialog v-model="recommendDialog" width="90%" max-width="800px" height="90%" max-height="800px">
    <v-card>
      <v-card-text class="pa-12">
        <Recommend :name="recommendName" @selected="recommendSelected" />
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-card-text v-if="config">
    <template v-if="submitBody.method!=='inpaint'">
      <v-select v-if="config?.types.length" v-model="submitBody.type" :items="config?.types"
        :label="$t('toolkit.MJ.type')">
        <template v-slot:chip> {{ $t(`toolkit.MJ.${submitBody.type}`)
          }}</template>
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="$t(`toolkit.MJ.${item.value}`)"
            :subtitle="$t(`toolkit.MJ.${item.value}Desc`)"></v-list-item>
        </template>
      </v-select>
      <v-select v-if="config?.methods.length" v-model="submitBody.method" :items="config?.methods"
        :label="$t('toolkit.MJ.method')">
        <template v-slot:chip> {{ $t(`toolkit.MJ.${submitBody.method}`)
          }}</template>
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="$t(`toolkit.MJ.${item.value}`)"
            :subtitle="$t(`toolkit.MJ.${item.value}Desc`)"></v-list-item>
        </template>
      </v-select>
      <v-select v-if="config?.models.length" v-model="submitParams.model" :items="config?.models"
        :label="$t('toolkit.MJ.model')">
        <template v-slot:chip> {{ $t(`toolkit.MJ.${submitParams.model}`)
          }}</template>
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="$t(`toolkit.MJ.${item.value}`)"
            :subtitle="$t(`toolkit.MJ.${item.value}Desc`)"></v-list-item>
        </template>
      </v-select>
    </template>
    <template v-else>
      <v-btn class="mb-2" color="primary" prepend-icon="mdi mdi-arrow-left" @click="clearInpaint">返回</v-btn>
    </template>
    <div v-show="submitBody.method === 'describe'">
      <v-label>
        上传一张图片
      </v-label>
      <div class="flex flex-wrap">
        <div style="width: 100%; aspect-ratio: 1/1;">
          <ImageInput width="100%" height="100%" :enter="false" type="base64"
            @on-selected="(url) => { submitParams.base64 = url }"></ImageInput>
        </div>
      </div>
    </div>
    <div v-show="submitBody.method === 'inpaint'">
      <template v-if="inpaintTask">
        <v-img :src="inpaintTask?.result?.url || inpaintTask?.result?.imageUrl ||
          inpaintTask?.result?.cdnImage"></v-img>
        <ConvasCrop @on-croped="onCroped" v-if="submitBody.method === 'inpaint'" :multiple="true"
          :key="submitParams.base64"
          :img="inpaintTask?.result?.url || inpaintTask?.result?.imageUrl || inpaintTask?.result?.cdnImage || ''"
          :mask="true" />
      </template>
      <v-card-text v-else>
        局部重绘需要选择任务列表中的任务进行执行，请在右侧任务列表中点击【🖌️局部重绘】按钮。
      </v-card-text>
    </div>
    <div v-show="submitBody.method === 'blend'">
      <v-label>
        上传2-5张图片进行融合生成一张新图
      </v-label>
      <div class="flex flex-wrap">
        <div class="mr-1 mb-2" v-for="i in blendFileCount" style="width: 60px; height: 60px;">
          <ImageInput :enter="false" type="base64" @on-selected="(url) => { submitParams.imgBase64Array[i - 1] = url }">
          </ImageInput>
        </div>
      </div>
    </div>
    <template v-if="submitBody.method === 'imagine' || submitBody.method === 'inpaint'">
      <v-label class="font-weight-medium my-3">
        {{ $t('toolkit.prompt') }}
      </v-label>
      <v-textarea v-model="submitParams.prompt" color="primary" variant="outlined" density="compact" type="text"
        :rules="[v => !!v || $t('toolkit.prompt_req')]" :placeholder="$t('toolkit.prompt_tips')" hide-details />
      <div class="my-2">
        <v-btn class="m-1" size="small" color="primary" @click="openRecommend('style')">{{ $t('toolkit.redstyle')
          }}</v-btn>
        <v-btn class="m-1" size="small" color="primary" @click="openRecommend('camera')">{{ $t('toolkit.redcamera')
          }}</v-btn>
        <v-btn class="m-1" size="small" color="primary" @click="openRecommend('light')">{{ $t('toolkit.redlight')
          }}</v-btn>
        <v-btn class="m-1" size="small" color="primary" @click="openRecommend('angle')">{{ $t('toolkit.redangle')
          }}</v-btn>
        <v-btn class="m-1" size="small" color="primary" @click="openRecommend('element')">{{ $t('toolkit.redelement')
          }}</v-btn>
        <v-btn class="m-1" size="small" color="primary" @click="openRecommend('words')">{{ $t('toolkit.redwords')
          }}</v-btn>
      </div>
    </template>
    <v-btn style="margin-top: 1rem;" size="x-large" color="primary" block @click="doPost()">
      {{ needCost }} Y{{ $t("system.coin") }}/{{
      $t('toolkit.generate')
      }} </v-btn>
  </v-card-text>
</template>
