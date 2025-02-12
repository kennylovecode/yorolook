<template>
  <div class="body">
    <div class="single-box">
      <div class="preview" v-if="props.item.original_mime_type && props.item.original_mime_type.indexOf('image') === 0">
        <el-image fit="contain" @load="imageLoad" :lazy="true" :src="`/disk/view?id=${props.item.id}&w=300`" />
      </div>
      <div class="files" v-else>
        <div v-if="props.item.original_mime_type" class="icon">
          <i class="yorolook icon-document" />
        </div>
        <div v-else class="icon">
          <i class="yorolook icon-files" />
        </div>
      </div>
    </div>
    <div class="name">
      <span>{{ props.item.title }}</span>
    </div>
    <div class="keywords">
      {{ props.item.keywords }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue"

const props = defineProps<{
  item: any
  index: number
}>()

const app = getCurrentInstance()
const $redrawVueMasonry = app?.appContext.config.globalProperties.$redrawVueMasonry

const imageLoad = () => {
  $redrawVueMasonry()
}
</script>
