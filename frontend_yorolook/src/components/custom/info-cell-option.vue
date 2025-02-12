<style lang="scss" scoped>
.option-item {
  margin: 0 10px 10px 0;
  border: solid 1px var(--el-text-color-secondary);
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  &.active,&:hover{
    border-color: var(--el-color-primary);
    color: var(--el-color-primary)
  }
}
</style>
<template>
  <div class="option-item">
    <img v-if="props.icon" :src="props.icon" :alt="props.label">
    <span>{{ props.label }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string
  label: string
  icon?: string
}>()
</script>
