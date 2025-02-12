<style lang="scss" scoped>
.el-image-viewer__canvas {
  // background: rgba($color: #000000, $alpha: .7);

  .el-image-viewer__img {
    max-width: 100vw;
    max-height: 100vh;
    object-fit: scale-down;
  }
}
</style>

<template>
  <div ref="viewerRef" v-show="visible" class="el-image-viewer__wrapper" style="z-index: 1999;">
    <div class="el-image-viewer__mask"></div>
    <span class="el-image-viewer__btn el-image-viewer__close" @click="visible=false">
      <el-icon>
        <CloseIcon />
      </el-icon>
    </span>
    <span class="el-image-viewer__btn el-image-viewer__prev" @click="handlePrev">
      <el-icon>
        <ArrowLeft />
      </el-icon>
    </span>
    <span class="el-image-viewer__btn el-image-viewer__next" @click="handleNext">
      <el-icon>
        <ArrowRight />
      </el-icon>
    </span>
    <div class="el-image-viewer__btn el-image-viewer__actions">
      <div class="el-image-viewer__actions__inner">
        <el-tooltip class="item" effect="dark" content="上一张" placement="top-start">
          <el-icon @click="handlePrev">
            <ArrowLeft />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="缩小" placement="top-start">
          <el-icon @click="doZoomOut">
            <ZoomOut />
          </el-icon></el-tooltip>
        <el-tooltip class="item" effect="dark" content="放大" placement="top-start">
          <el-icon @click="doZoomIn">
            <ZoomIn />
          </el-icon></el-tooltip>
        <i class="el-image-viewer__actions__divider"></i>
        <el-tooltip class="item" effect="dark" content="全屏" placement="top-start">
          <i :class="curMode == 0 ? 'el-icon-full-screen' : 'el-icon-c-scale-to-original'" @click="changeSizeMode"></i>
        </el-tooltip>
        <i class="el-image-viewer__actions__divider"></i>
        <el-tooltip class="item" effect="dark" content="向左旋转90度" placement="top-start">
          <el-icon @click="doRotateLeft">
            <RefreshLeft />
          </el-icon></el-tooltip>
        <el-tooltip class="item" effect="dark" content="向右旋转90度" placement="top-start">
          <el-icon @click="doRotateRight">
            <RefreshRight />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="下载原图" placement="top-start">
          <el-icon @click="hanldeDownload">
            <Download />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="快速以搜图" placement="top-start">
          <el-icon @click="handleSearch">
            <Camera />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="下一张" placement="top-start">
          <el-icon @click="handleNext">
            <ArrowRight />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="el-image-viewer__canvas" ref="image-viewer" :style="curStyle">
      <el-image :key="currentImage" :src="currentImage" fit="fill" :lazy="true"></el-image>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { Download, ZoomIn, ZoomOut, Close as CloseIcon, ArrowRight, ArrowLeft, Camera, RefreshLeft, RefreshRight } from '@element-plus/icons-vue';

const props = defineProps<{
  imgUrlList: string[]
}>()

const visible = ref();
const rotate = ref(0);
const curMode = ref(0);
const scale = ref(1);
const index = ref(-1);
const viewerRef = ref()
const currentImage = computed(()=>{
  const width = window.innerWidth
  return `${props.imgUrlList[index.value]}&w=${width}`;
});
const curStyle = computed(() => {
  return `transform: scale(${scale.value}) rotate(${rotate.value}deg); margin-left: 0px; margin-top: 0px;` + (curMode.value == 0 ? '' : `transform-origin: 50% 50%;`);
})
const handleNext = () => {
  if (index.value < props.imgUrlList.length - 1)
    index.value += 1;
  else
    index.value = 0;
}

const handlePrev = () => {
  if (index.value > 0)
    index.value -= 1;
  else
    index.value = props.imgUrlList.length - 1;
}

const changeSizeMode = () => {
  scale.value = 1;
  if (curMode.value == 0) {
    curMode.value = 1;
  } else {
    curMode.value = 0;
  }
}

const handleSearch = () => {

}

const hanldeDownload = () => {

}

const doRotateRight = () => {
  rotate.value += 90;
}

const doRotateLeft = () => {
  rotate.value -= 90;
}

const doZoomOut = () => {
  scale.value -= 0.2;
}

const doZoomIn = () => {
  scale.value += 0.2;
}

defineExpose({
  open:(url: string)=>{
    index.value = props.imgUrlList.findIndex((x) => x === url)
    visible.value = true
  }
})
</script>
