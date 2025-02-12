<style lang="scss" scoped>
.el-checkbox {
  min-width: 82px;
  margin-right: 1rem;
}
.chooses-box {
  position: relative;
  padding-bottom: 30px;
  :deep(.el-checkbox-group) {
    max-height: 60vh;
    overflow: hidden;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;

    &::-webkit-scrollbar-track {
      background-color: transparent; /* 滚动条轨道颜色 */
    }
    &::-webkit-scrollbar-thumb {
      background-color: #888; /* 滚动条滑块颜色 */
      border-radius: 4px; /* 滚动条滑块圆角 */
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #666; /* 鼠标悬停时滑块颜色 */
    }
  }
  .confirm-box {
    position: absolute;
    bottom: 0;
  }
}

@media screen and (max-width: 750px) {
  .filter-item {
    margin: 4px 2px;
  }
}
</style>
<template>
  <div class="filter-item">
    <el-popover
      :key="props.defaults?.length"
      ref="popoverRef"
      placement="bottom-start"
      :title="props.title || ''"
      :width="260"
      trigger="click"
    >
      <template #reference>
        <el-button type="primary" plain size="small"
          >{{ alreadyCheckedList.length > 0 ? `${props.title}(${alreadyCheckedList.length})` : `${props.title}` }}
        </el-button>
      </template>
      <div class="chooses-box">
        <el-checkbox-group :key="alreadyCheckedList.length" v-model="alreadyCheckedList" @change="handleChecked">
          <el-checkbox v-for="item in attributeValueList" :key="item.id" :value="item">
            <span
              v-if="item.image"
              style="border: var(--el-border); width: 16px; height: 16px; display: inline-block"
              :style="{ backgroundImage: `url(${item.image})` }"
            />
            <span
              v-if="item.rgba"
              style="border: var(--el-border); width: 16px; height: 16px; display: inline-block"
              :style="{ backgroundColor: item.rgba }"
            />
            {{ item.title }}
          </el-checkbox>
        </el-checkbox-group>
        <div class="confirm-box">
          <el-button type="info" plain size="small" @click="handleClear">清除</el-button>
          <el-button type="primary" plain size="small" @click="handleConfirm">确定</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { AttributeOption } from "@/api/attribute/types"

interface PropsModel {
  name: string
  title: string
  list: AttributeOption[]
  defaults?: any[]
}

const props = defineProps<PropsModel>()

const attributeValueList = ref<AttributeOption[]>([])

const popoverRef = ref()
const alreadyCheckedList = ref<any[]>([])
const emits = defineEmits(["onConfirm", "onClear", "onChange"])

const handleClear = () => {
  alreadyCheckedList.value = []
  popoverRef.value?.hide()
  emits("onClear", props.name, alreadyCheckedList.value)
}

const handleConfirm = () => {
  popoverRef.value?.hide()
  emits("onConfirm", props.name, alreadyCheckedList.value)
}

const handleChecked = () => {
  emits("onChange", props.name, alreadyCheckedList.value)
}

onMounted(() => {
  if (props.list) attributeValueList.value = props.list
  if (props.defaults) {
    alreadyCheckedList.value = props.list.filter((x) => props.defaults?.map((y) => y.id).includes(x.id))
  }
})

defineExpose({
  handleClear
})
</script>
