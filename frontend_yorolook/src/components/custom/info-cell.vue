<style lang="scss" scoped>
.info-cell{
  display: flex;
  flex-direction: row;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-top: 24px;
  .label{
    display: flex;
    span{
      width: 14px;
      display: inline-block;
    }
    .text{
      width: 56px;
      text-align: justify;
      display: inline-block;
      height: 16px;
      &::after{
        content: "";
        display: inline-block;
        width: 100%;
      }
    }
  }
  .content{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

<template>
  <div class="info-cell">
    <div class="label">
      <span class="text">{{ props.label }}</span>
      <span>：</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script lang="ts" setup>

const props = defineProps<{
  label: string
}>()
</script>
