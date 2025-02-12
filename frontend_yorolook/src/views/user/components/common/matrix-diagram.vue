<style lang="scss" scoped>
.matrix-diagram {
  width: 416px;
  height: 240px;
  position: relative;
  flex-shrink: 0;
  .draw-matrix {
    width: 416px;
    height: 240px;
    border-radius: 24px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
    > div {
      transform: rotate(15deg);
      width: 100%;
      display: flex;
      position: absolute;
      top: -150px;
      right: 104px;
      .react-matrix {
        display: flex;
        flex-direction: column;
        width: 200px;
        margin-right: 8px;
        flex-shrink: 0;
        .content {
          margin-bottom: 8px;
          flex-shrink: 0;
          height: 160px;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(0deg, #f2f2f2, #f2f2f2), #a1948c;
        }
      }
    }
  }
}
</style>

<template>
  <div class="matrix-diagram">
    <div class="draw-matrix">
      <div>
        <div class="react-matrix">
          <div v-for="i in 3" :key="i" class="content">
            <img :src="`/homepage-covers/${i}.jpg`" alt="">
          </div>
        </div>
        <div class="react-matrix">
          <div v-for="i in 3" :key="i" class="content">
            <img :src="`/homepage-covers/${i+3}.jpg`" alt=""></div>
        </div>
        <div class="react-matrix">
          <div v-for="i in 3" :key="i" class="content">
            <img :src="`/homepage-covers/${i+6}.jpg`" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"

interface propsModel {
  imgs?: string[]
}

const props = withDefaults(defineProps<propsModel>(), {
  imgs: () => [""]
})

onMounted(() => {})
</script>
