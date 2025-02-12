<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 8px;
  .type {
    .el-tag {
      margin-right: 6px;
    }
  }

  .operate {
    display: flex;

    a {
      margin-left: 0.5rem;
      font-size: 1rem;
    }
  }
}
</style>
<template>
  <div class="bottom">
    <div>
      <slot name="left" />
    </div>
    <div class="operate">
      <a v-if="props.canFav" href="javascript:;" @click.stop="props.operate('onFav')">
        <el-icon> <StarIcon /> </el-icon
      ></a>
      <a v-if="props.canEdit" href="javascript:;" @click.stop="props.operate('onEdit')">
        <el-icon> <EditIcon /> </el-icon
      ></a>
      <a v-if="props.canEdit" href="javascript:;" @click.stop="props.operate('onRemove')">
        <el-icon> <DeleteIcon /> </el-icon
      ></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit as EditIcon, Delete as DeleteIcon, Star as StarIcon } from "@element-plus/icons-vue"

const props = defineProps<{
  operate: (method: "onPreview" | "onFav" | "onEdit" | "onRemove") => void
  canFav?: boolean
  canEdit?: boolean
}>()
</script>
