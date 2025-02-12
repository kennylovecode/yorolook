<!-- eslint-disable prettier/prettier -->
<style lang="scss" scoped>
.catalog-selector {
  font-size: 12px;
  padding: 16px 0;

  .el-row {
    width: 100%;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
    text-align: center;
    position: relative;
    &.simple{
      .el-col{
        padding-right: 8px;
      }
    }

    .item {
      cursor: pointer;
      background: var(--el-bg-color);
      box-shadow: var(--el-box-shadow);
      padding: 4px;
      position: relative;
      &:hover {
        font-weight: 600;
      }

      &.active {
        border: solid 1px var(--el-color-primary);

        &::after {
          content: "X";
          width: 16px;
          height: 16px;
          position: absolute;
          right: 0;
        }
      }

      &.all,&.simple {
        &.active {
          &::after {
            display: none;
          }
        }
      }
      &.simple{
        padding:4px 6px;
        margin-right: 8px;
      }
    }
  }
}
</style>

<template>
  <div class="catalog-selector">
    <div v-if="!simple" class="list">
      <el-row :gutter="8">
        <el-col :xl="1" :lg="2" :md="2" :sm="3" :xs="3">
          <div class="item all" :class="{ active: currentSelected.length <= 0 }" @click="clear()">
            <span>{{ props.text || "全部" }}</span>
          </div>
        </el-col>
        <el-col :key="idx" v-for="(item, idx) in props.data" :xl="1" :lg="2" :md="2" :sm="3" :xs="3">
          <div
            class="item"
            :class="{ active: currentSelected.includes(simple ? item : item[valueKey]) }"
            @click="selectItem(item)"
          >
            <span>{{ simple ? item : item[valueKey] }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-else class="list simple">
      <el-col :xl="1" :lg="2" :md="2" :sm="3" :xs="3">
        <div class="item all" :class="{ active: currentSelected.length <= 0 }" @click="clear()">
          <span>{{ props.text || "全部" }}</span>
        </div>
      </el-col>
      <div
        :key="idx"
        v-for="(item, idx) in props.data"
        class="item simple"
        :class="{ active: currentSelected.includes(item) }"
        @click="selectSimpleItem(item)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"

interface PropsModel {
  text?: string
  data?: any
  modelValue?: string
  valueKey?: string
  displayKey?: string
  ratio?: Number
  simple?: boolean
}
const props = defineProps<PropsModel>()
const valueKey = ref<string>(props.valueKey || "value")

const currentSelected = ref<any[]>(props.modelValue ? props.modelValue.split(",") : [])

const emits = defineEmits(["onChange", "update:modelValue"])
const selectItem = (item: any) => {
  if (currentSelected.value.includes(item[valueKey.value])) {
    currentSelected.value.splice(currentSelected.value.indexOf(item[valueKey.value]), 1)
  } else {
    currentSelected.value.push(item[valueKey.value])
  }

  emits("update:modelValue", currentSelected.value.join(","))
  emits("onChange", currentSelected.value)
}

const selectSimpleItem = (item: any) => {
  if (currentSelected.value.includes(item)) {
    currentSelected.value.splice(currentSelected.value.indexOf(item), 1)
  } else {
    currentSelected.value.push(item)
  }

  emits("update:modelValue", currentSelected.value.join(","))
  emits("onChange", currentSelected.value)
}

const clear = () => {
  currentSelected.value = []
  emits("update:modelValue", "")
  emits("onChange", [])
}
</script>
