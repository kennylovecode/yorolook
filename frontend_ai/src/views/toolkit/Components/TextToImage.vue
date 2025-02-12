<script setup lang="ts">
import { onBeforeMount,watch } from 'vue';
import { upload } from '@/api/service';
import Recommend from './Recommend.vue';
import { useLocale } from 'vuetify/lib/framework.mjs';
import ImageInput  from './ImageInput.vue';
import CanvasToBase64 from './ConvasCrop.vue';
import { useSnackbarStore } from '~/src/stores/snackbarStore';

const props = defineProps<{
  tab: string
  url?: string
}>();
const type = ref("generate")
const fileUploadRef = ref()
const magics = ref<string[]>([])
const models = ref<{
  consum: number
  value: string
}[]>([])
const {t} = useLocale()
const ratios = ref<string[]>([])
const styles = ref<string[]>([])
const types = ref<string[]>([])
const recommendDialog = ref<boolean>(false)
const recommendName = ref("")
const openRecommend = (name) => {
  recommendName.value = name
  recommendDialog.value = true
}

interface GenerateImage {
  file: string,
  files: string[],
  prompt: string;
  negative_prompt: string;
  model: string;
  style_type: string;
  aspect_ratio: string;
  magic_prompt_option: string;
  seed: number;
}

const params = reactive<GenerateImage>({
  file: '',
  files: [],
  prompt: '',
  negative_prompt: '',
  model: '',
  style_type: '',
  aspect_ratio: '',
  magic_prompt_option: '',
  seed: 12345
});

const emits = defineEmits(["onGenerate"])
const generate = async () => {
  let title
  if(type.value === "generate") title = "以文生图"
  if(type.value === "remix") title = "以图生图"
  if(type.value === "blend") title = "多图融合"
  emits("onGenerate", models.value.find(x => x.value === params.model),title,`${props.tab}_${type.value}`,params)
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('files[]', file);
  const res = await upload<any>({
    baseURL: "/disk",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    url: "/upload",
    method: "post",
    data: formData
  })
  params.file = `/disk/img?id=${res.data.id}`
}

const uploadImages = async (event) => {
  const {showErrorMessage} = useSnackbarStore()
  if(event.target.files.length > 5){
    showErrorMessage("您最多只能选择5个文件进行融合..")
  }
  if(event.target.file.length<=1){
    showErrorMessage("您至少需要选择两张图片进行融合..")
  }


}
const selectFile = () => {
  if (fileUploadRef) fileUploadRef?.value.click()
}

const recommendSelected = (append: string) => {
  recommendDialog.value = false
  if (params.prompt) params.prompt += ","
  params.prompt += append
}

onBeforeMount(async () => {
  /** 从指定类别的AI文件中获取参数 */
  const aiInstance = await import(`@/api/toolkit/${props.tab}.ts`);
  magics.value = aiInstance.magics || [];
  styles.value = aiInstance.styles || [];
  ratios.value = aiInstance.ratios || [];
  models.value = aiInstance.models || [];
  types.value = aiInstance.types || [];
  if(models.value.length) params.model = models.value[0].value
  if(magics.value.length) params.magic_prompt_option = magics.value[0]
  if(ratios.value.length) params.aspect_ratio = ratios.value[0]
  if(styles.value.length) params.style_type = styles.value[0]
  if (props.url) {
    params.file = props.url
    type.value = "remix"
  }
})

const blendFileCount = ref<number>(5)
watch(blendFileCount,(val,oldVal)=>{
  if(val<2) blendFileCount.value = 2
  if(val>5) blendFileCount.value = 5
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
    <v-card-text>
      <v-radio-group v-model="type" inline :hide-details="true" class="my-2">
        <v-radio v-show="types.indexOf('tti')>=0" :label="$t('toolkit.tti')" value="generate"></v-radio>
        <v-radio v-show="types.indexOf('iti')>=0" :label="$t('toolkit.iti')" value="remix"></v-radio>
        <v-radio v-show="types.indexOf('ibi')>=0" :label="$t('toolkit.ibi')" value="blend"></v-radio>
        <v-radio v-show="types.indexOf('itt')>=0" :label="$t('toolkit.itt')" value="describe"></v-radio>
      </v-radio-group>
      <div class="flex flex-wrap" v-show="type === 'remix'||type === 'describe'">
        <v-img @click.prevent="selectFile" :src="`${params.file}`" width="100" height="100"
          class="my-4 border-sm text-center flex align-center justify-center" :class="params.file ? 'text-white' : ''">
          <template v-slot:default>
            {{ $t('toolkit.upload') }}
          </template>
        </v-img>
        <v-textarea v-model="params.file" :label="$t('toolkit.imageurl')" :active="true" rows="2"
          :placeholder="$t('toolkit.imageurlplaceholder')">
        </v-textarea>
        <v-file-input v-show="false" ref="fileUploadRef" accept="image/*" @change="uploadImage">
        </v-file-input>
      </div>
      <div v-show="type === 'blend'">
        <v-label>
          上传2-5张图片进行融合生成一张新图
        </v-label>
        <div class="flex flex-wrap">
          <ImageInput v-for="i in blendFileCount" :enter="false" type="base64" @on-selected="(url)=> { params.files[i-1]=url }"></ImageInput>
        </div>
      </div>
      <!-- ---------------------------------------------- -->
      <!-- model  -->
      <!-- ---------------------------------------------- -->
      <v-select v-model="params.model" :items="models" :label="$t(`toolkit.model${tab}`)">
        <template v-slot:chip> {{ $t(`toolkit.model${tab}${params.model.replace(/_/g, '')}`) }}</template>
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props"
            :title="$t(`toolkit.model${tab}${item.value.replace(/_/g, '')}`) + `${props.title?.consum}Y${$t('system.coin')}`"
            :subtitle="$t(`toolkit.model${tab}${item.value.replace(/_/g, '')}Desc`)"></v-list-item>
        </template>
      </v-select>
      <!-- ---------------------------------------------- -->
      <!-- Magic prompt  -->
      <!-- ---------------------------------------------- -->
      <v-select v-if="magics.length" v-model="params.magic_prompt_option" :items="magics"
        :label="$t('toolkit.magic_prompt_option')">
        <template v-slot:chip> {{ $t(`toolkit.magic${params.magic_prompt_option.replace(/_/g, '')}`)
          }}</template>
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="$t(`toolkit.magic${item.value.replace(/_/g, '')}`)"
            :subtitle="$t(`toolkit.magic${item.value.replace(/_/g, '')}Desc`)"></v-list-item>
        </template>
      </v-select>
      <!-- ---------------------------------------------- -->
      <!-- Ratio  -->
      <!-- ---------------------------------------------- -->
      <v-select v-if="ratios.length" v-model="params.aspect_ratio" :items="ratios" :label="$t('toolkit.aspect_ratio')">
        <template v-slot:chip> {{ $t(`toolkit.ratio${params.aspect_ratio.replace(/_/g, '')}`) }}</template>
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="$t(`toolkit.ratio${item.value.replace(/_/g, '')}`)"
            :subtitle="$t(`toolkit.ratio${item.value.replace(/_/g, '')}Desc`)"></v-list-item>
        </template>
      </v-select>
      <!-- ---------------------------------------------- -->
      <!-- Style  -->
      <!-- ---------------------------------------------- -->
      <v-select v-if="styles.length" v-model="params.style_type" :items="styles" :label="$t('toolkit.style_type')">
        <template v-slot:chip> {{ $t(`toolkit.style${params.style_type.replace(/_/g, '')}`) }}</template>
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="$t(`toolkit.style${item.value.replace(/_/g, '')}`)"
            :subtitle="$t(`toolkit.style${item.value.replace(/_/g, '')}Desc`)"></v-list-item>
        </template>
      </v-select>
      <!-- ---------------------------------------------- -->
      <!-- Prompt  -->
      <!-- ---------------------------------------------- -->
      <v-label class="font-weight-medium my-3">
        {{ $t('toolkit.prompt') }}
      </v-label>
      <v-textarea v-model="params.prompt" color="primary" variant="outlined" density="compact" type="text"
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
      <!-- ---------------------------------------------- -->
      <!-- Negative Prompt  -->
      <!-- ---------------------------------------------- -->
      <v-label class="font-weight-medium my-3">{{ $t('toolkit.negative_prompt') }}</v-label>
      <v-textarea v-model="params.negative_prompt" color="primary" variant="outlined" density="compact" type="text"
        :placeholder="$t('toolkit.negative_prompt_tips')" hide-details />
      <v-btn style="margin-top: 1rem;" size="x-large" color="primary" block @click="generate()">
        {{ Math.abs(models.find(x => x.value === params.model)?.consum || 0) }}Y{{ $t("system.coin") }}/{{
          $t('toolkit.generate')
        }} </v-btn>
    </v-card-text>
</template>
