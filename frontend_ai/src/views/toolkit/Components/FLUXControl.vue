<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import AIProxyAPI from '@/api/aiproxy'
import { IAIConfig, ISubmitBody,IModel } from '@/api/types/aiproxy'
import ImageInput from './ImageInput.vue';
import Recommend from './Recommend.vue';
import ConvasCrop from './ConvasCrop.vue';
import { useLocale } from 'vuetify/lib/framework.mjs';

const { t } = useLocale()
const needCost = ref(0)
const config = ref<IAIConfig<IModel>>()
const generateSize = ref({
  width: 1024,
  height: 1024
})
const submitBody = ref<ISubmitBody>({
  "type": "",
  "method": "generate",
  "params": {
  },
  "title": "",
})
const defaultRatios = ["1:1","4:3", "9:16","16:9","21:9"]
const submitParams = ref({
  "model": "",
  "prompt": "",
  "image_size": {},
  "aspect_ratio": "1:1",
  "num_outputs": 1,
  "output_quality": 80,
  "prompt_upsampling": false,
})

const emits = defineEmits(["onPosted"])
const doPost = async () => {
  const typeText = t(`toolkit.FLUX.${submitBody.value.type}`)
  const modelText = config.value?.models.find(x=> x.name===submitParams.value.model)?.title || "未知"
  submitBody.value.title = `FLUX::${typeText}::${modelText}::以文生图`
  submitBody.value.params = submitParams.value;
  const {data} = await AIProxyAPI.FLUX_submit(submitBody.value);
  emits("onPosted",data)
}

const recommendDialog = ref<boolean>(false)
const recommendName = ref("")
const openRecommend = (name) => {
  recommendName.value = name
  recommendDialog.value = true
}
const recommendSelected = (append: string) => {
  recommendDialog.value = false
  if (submitParams.value.prompt) submitParams.value.prompt += ","
  submitParams.value.prompt += append
}
onBeforeMount(async () => {
  const { data } = await AIProxyAPI.config("FLUX");
  if (data) {
    config.value = data
    submitParams.value.model = config.value?.models[0]?.name
    submitBody.value.type = config.value?.types[0] || ""
  }
})

watch(submitParams.value, (val, oldVal) => {
  if (val.model)
    needCost.value = (config.value?.models.find(x=> x.name===val.model)?.cost||0)/100
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
    <v-select v-if="config?.types.length" v-model="submitBody.type" :items="config?.types"
      :label="$t('toolkit.FLUX.type')">
      <template v-slot:chip> {{ $t(`toolkit.FLUX.${submitBody.type}`)
        }}</template>
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" :title="$t(`toolkit.FLUX.${item.value}`)"
          :subtitle="$t(`toolkit.FLUX.${item.value}Desc`)"></v-list-item>
      </template>
    </v-select>
    <v-select v-if="config?.models.length" v-model="submitParams.model" :items="config?.models"
      :label="$t('toolkit.FLUX.model')" item-value="name" item-title="title">
      <template v-slot:chip> {{ submitParams.model }}</template>
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" :title="`${item.value} - ${item.raw.cost / 100}Y币`" :subtitle="item.title"></v-list-item>
      </template>
    </v-select>
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
    <v-btn style="margin-top: 1rem;" size="x-large" color="primary" block @click="doPost()">
      {{ needCost }} Y{{ $t("system.coin") }}/{{
      $t('toolkit.generate')
      }} </v-btn>
  </v-card-text>
</template>
