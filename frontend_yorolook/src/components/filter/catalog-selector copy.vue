<style lang="scss" scoped>
.catalog-selector {
  font-size: 12px;
  padding: 16px 0;

  .el-breadcrumb {
    font-size: 14px;
  }

  .stack-items {
    display: flex;
    margin-bottom: 8px;

    .item {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-around;

      &:hover {
        color: var(--el-text-color-primary);
        cursor: pointer;
        text-decoration: underline;
      }

      .el-icon {
        width: 100%;
      }
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
    text-align: center;
    position: relative;

    .item {
      cursor: pointer;
      background: var(--el-bg-color);
      border-radius: 5%;
      color: var(--el-text-color-primary);
      min-width: 26px;
      font-size: 14px;
      box-shadow: var(--el-box-shadow);
      margin-right: 8px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      padding: 3px 8px;

      &:hover {
        font-weight: 600;
      }

      &.active {
        border: solid 1px var(--el-color-primary);
        border-radius: 5px;
      }

      .icon {
        img {
          object-fit: scale-down;
        }
      }
    }

    &.icon {
      .item {
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #fff;
        color: #333;

        .el-image {
          background-color: #fff;
          margin-top: 8px;
          border-radius: 0.2vw;
          width: 100%;
          height: 100%;
          aspect-ratio: v-bind(ratio);

          :deep(.el-image__error) {
            background: unset;
          }
        }

        span {
          display: block;
          width: 100%;
          padding: 5px 0;
        }
      }
    }
  }
}

// @media screen and (max-width: 750px) {
//   .catalog-selector {
//     margin: unset;
//     padding: 5px 0;
//     background: #fff;

//     .list {
//       margin: 0;

//       .item {
//         padding: 2px 5px;
//         margin-bottom: 3px;
//       }

//       &.icon {
//         .item {
//           flex-direction: row;
//           flex-wrap: nowrap;
//           height: 6vw;
//           text-align: left;
//           align-items: center;

//           .el-image {
//             width: unset;
//             margin-top: 0;
//           }

//           span {
//             margin-left: 3px;
//           }
//         }
//       }
//     }
//   }
// }
</style>

<template>
  <div class="catalog-selector">
    <div v-if="props!.showChild" class="stack-items">
      <div class="item start">当前位置：</div>
      <div class="item" @click="selectItem(null)">全部</div>
      <div class="item" v-for="(item, index) in stackItems" :key="index" @click="selectStackItem(item, index)">
        <el-icon>
          <ArrowRight />
        </el-icon>
        <span>{{ (item as any)[__displayKey] }}</span>
      </div>
    </div>
    <div class="list" :class="{ icon: props.showIcon }">
      <!--div v-if="!props!.showChild" class="item" :class="{ active: isSelected(null) }" @click="selectItem(null)">
        <span>全部</span>
      </div>
      <div
        v-for="(item, idx) in list"
        class="item"
        :class="{ active: isSelected(item) }"
        :key="idx"
        @click="selectItem(item)"
      >
        <span v-if="__simpleMode">{{ item }}</span>
        <template v-else>
          <el-image fit="cover" v-if="props.showIcon" :src="`${item[__iconKey]}`" />
          <span>{{ item[__displayKey] }}</span>
        </template>
      </div-->
      <el-row>
        <el-col>
          <div v-if="!props!.showChild" class="item" :class="{ active: isSelected(null) }" @click="selectItem(null)">
            <span>全部</span>
          </div></el-col
        >
        <el-col :key="idx" v-for="(item, idx) in list" :xl="1" :lg="2" :md="3" :sm="4" :xs="4">
          <div class="item" :class="{ active: isSelected(item) }" @click="selectItem(item)">
            <span v-if="__simpleMode">{{ item }}</span>
            <template v-else>
              <el-image fit="cover" v-if="props.showIcon" :src="`${item[__iconKey]}`" />
              <span>{{ item[__displayKey] }}</span>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { getNodes } from "@/api/catalog/index"
import { ArrowRight } from "@element-plus/icons-vue"
import { onUpdated } from "vue"

interface PropsModel {
  data?: any
  defaults?: string
  valueKey?: string
  displayKey?: string
  showIcon?: boolean
  showChild?: boolean
  multiple?: boolean
  fulldata?: boolean
  ratio?: Number
  dataFilter?: Function
}
const props = defineProps<PropsModel>()

const ratio = ref<Number>(1)
const fulldata = ref<any[]>([])
const list = ref<any[]>([])
/** 已选栈道 */
const stackItems = ref<any[]>([])
const __valueKey = ref<string>("id")
const __displayKey = ref<string>("title")
const __iconKey = ref<string>("cover")
const __simpleMode = ref<boolean>(false)
const emits = defineEmits(["onChange"])

/** 是否已选择该项 */
const isSelected = (item: any) => {
  if (!item) return stackItems.value.length <= 0
  if (stackItems.value.length <= 0) return false

  // 简单模式
  if (__simpleMode.value) return stackItems.value.findIndex((x) => x === item) >= 0
  else {
    // 完整模式
    return stackItems.value.findIndex((x: any) => x[__valueKey.value] === item[__valueKey.value]) >= 0
  }
}

const selectStackItem = async (item: any, index: number) => {
  stackItems.value = stackItems.value.slice(0, index)
  selectItem(item)
}

const selectItem = async (item: any) => {
  const getChangeValue = () => {
    if (stackItems.value.length <= 0) return []
    if (props.multiple) {
      return stackItems.value.map((x: any) => {
        return __simpleMode.value ? x : x[__valueKey.value]
      })
    } else {
      const last = stackItems.value[stackItems.value.length - 1] as any
      if (!last) return []
      return [__simpleMode.value ? last : last[__valueKey.value]]
    }
  }
  // if (!item) {
  //   stackItems.value = []
  //   if (props.showChild) {
  //     load()
  //   }
  //   emits("onChange", getChangeValue(), stackItems.value)
  //   return
  // }
  // if (!props.showChild && isSelected(item)) {
  //   if (__simpleMode.value) stackItems.value = stackItems.value.filter((x: any) => x !== item)
  //   else stackItems.value = stackItems.value.filter((x: any) => x[__valueKey.value] !== item[__valueKey.value])
  //   emits("onChange", getChangeValue(), stackItems.value)
  //   return
  // }
  // if (!props.showChild && !props.multiple) {
  //   stackItems.value = []
  // }
  stackItems.value.push(item)
  // if (props.showChild) {
  //   load(item[__valueKey.value])
  // }
  debugger
  emits("onChange", getChangeValue(), stackItems.value)
}

const load = async (parent_id: number = 0) => {
  if (props.fulldata) {
    list.value = fulldata.value.filter((x) => x.parent_id === parent_id)
  } else {
    if (props.showChild) {
      debugger
      const res = await getNodes(parent_id, stackItems.value.length)
      if (props.dataFilter) {
        list.value = props.dataFilter(res?.data, stackItems.value.length)
        return
      }
      list.value = res?.data
    }
  }
}

const setDefaultStack = async () => {
  const defaultList = props.defaults?.split(",") as any[]
  if (!defaultList) return
  if (stackItems.value.length > 0) return
  if (__simpleMode.value) {
    stackItems.value = list.value.filter((x) => props.defaults!.indexOf(x[__valueKey.value]) >= 0)
  } else {
    for (const key of defaultList) {
      const item = list.value.find((x) => x[__valueKey.value] === parseInt(key))
      if (item) {
        stackItems.value.push(item)
        await load(item[__valueKey.value])
      }
    }
  }
}

const initial = async () => {
  if (props.ratio) {
    ratio.value = props.ratio
  }
  if (props.data) {
    /// 假设调用组件传递了数据，有限使用该数据
    //list.value = props.data
    fulldata.value = props.data
    if (!props.fulldata) list.value = props.data
    const valueType = typeof props.data[0]
    if (valueType !== "object") {
      __simpleMode.value = true
    }

    if (props.displayKey) __displayKey.value = props.displayKey
    if (props.valueKey) __valueKey.value = props.valueKey
  }
  await load()
  await setDefaultStack()
}

onUpdated(initial)
onMounted(initial)

const clearSelected = () => {
  stackItems.value.splice(0, stackItems.value.length)
  if (props.showChild) {
    load()
  }
  emits("onChange", [], [])
}

defineExpose({
  clearSelected
})
</script>
