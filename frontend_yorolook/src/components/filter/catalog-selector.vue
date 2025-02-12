<style lang="scss" scoped>
.catalog-selector {
  font-size: 12px;
  padding: 16px 0;

  .el-row {
    width: 100%;
  }
  .el-breadcrumb {
    font-size: 14px;
  }

  .stack-items {
    display: flex;
    margin-bottom: 8px;

    .item {
      display: flex;
      align-items: center;
      margin: 0 3px;
      &:hover {
        color: var(--el-text-color-primary);
        cursor: pointer;
        text-decoration: underline;
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
      color: var(--el-text-color-primary);
      min-width: 26px;
      box-shadow: var(--el-box-shadow);
      margin-right: 8px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      padding: 4px;
      justify-content: center;
      &:hover {
        font-weight: 600;
      }

      &.active {
        border: solid 1px var(--el-color-primary);
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
      <div class="item" @click="selectStackItem(-1)">全部</div>
      <div class="item" v-for="(item, index) in stackItems" :key="index" @click="selectStackItem(index)">
        <el-icon>
          <ArrowRight />
        </el-icon>
        <span>{{ (item as any)[__displayKey] }}</span>
      </div>
    </div>
    <div class="list" :class="{ icon: props.showIcon }">
      <el-row :key="`cat_${route.query.cid}`">
        <el-col v-if="!props!.showChild" :xl="1" :lg="2" :md="3" :sm="3" :xs="3">
          <div class="item" :class="{ active: isSelected({ id: 0 }) }" @click="selectItem(null)">
            <span>全部</span>
          </div>
        </el-col>
        <el-col :key="idx" v-for="(item, idx) in current.childrens" :xl="1" :lg="2" :md="3" :sm="3" :xs="3">
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
import { useRoute } from "vue-router"

interface PropsModel {
  id?: string
  data?: any
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
const current = ref<any>({})
const __valueKey = ref<string>("id")
const __displayKey = ref<string>("title")
const __iconKey = ref<string>("cover")
const __simpleMode = ref<boolean>(false)
const emits = defineEmits(["onChange", "onAfterLoad", "update:modelValue"])
const stackItems = ref<any[]>([])
const route = useRoute()
/** 是否已选择该项 */
const isSelected = (item: any) => {
  return parseInt((route.query.cid as string) || "0") === item?.id
}

const selectStackItem = (idx: number) => {
  if (idx < 0) {
    emits("onChange", "", "")
    return
  }
  stackItems.value = stackItems.value.splice(0, idx + 1)
  const id = stackItems.value.map((x) => x.id).join(",")
  const title = stackItems.value.map((x) => x.title).join("/")
  console.log(id, title)
  emits("onChange", title, id)
}

const selectItem = async (item: any) => {
  if (!item) {
    emits("onChange", "", "")
    return
  }
  if (!props.showChild) {
    emits("onChange", item.title, item.id)
    return
  }
  current.value = item
  const pathTitle = `${current.value.path_title ? current.value.path_title + "," : ""}${current.value.title}`.split(",")
  const pathId = `${current.value.path_id ? current.value.path_id + "," : ""}${current.value.id}`.split(",")
  emits("onChange", pathTitle.join("/"), pathId.join(","))
}
const buildStackitems = async () => {
  stackItems.value = []
  if (current.value.id) {
    const pathTitle = `${current.value.path_title ? current.value.path_title + "," : ""}${current.value.title}`.split(
      ","
    )
    const pathId = `${current.value.path_id ? current.value.path_id + "," : ""}${current.value.id}`.split(",")
    if (pathTitle.length > 0 && pathTitle.length === pathId.length) {
      for (const idx in pathTitle) {
        stackItems.value.push({
          id: pathId[idx],
          title: pathTitle[idx]
        })
      }
    }
  }
}

const load = async () => {
  if (!props.showChild) {
    const { data } = await getNodes(null, 0)
    current.value = data
    if (props.dataFilter) {
      current.value.childrens = props.dataFilter(current.value.childrens, 0)
    }
    return
  } else {
    const pathArr = props.id ? props.id?.split(",") : []
    if (pathArr.length > 0) {
      const { data } = await getNodes(parseInt(pathArr[pathArr.length - 1]), pathArr.length)
      current.value = data
    } else {
      const { data } = await getNodes(null, 0)
      current.value = data
    }

    if (props.dataFilter) {
      current.value.childrens = props.dataFilter(current.value.childrens, pathArr.length)
    }

    buildStackitems()
    emits("onAfterLoad", current.value?.attributes as any, pathArr.length)
  }
}

const initial = async () => {
  await load()
}

//onUpdated(initial)
onMounted(initial)
</script>
