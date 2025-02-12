<style lang="scss" scoped>
.directory-list {
  width: 100%;
  max-width: var(--max-width);
  position: relative;
  margin: 0 auto;

  .header {
    .title {
      font-size: large;
      margin: 1rem 0;
    }

    .search-type {
      margin: 0.5rem 0;
    }
  }

  .item {
    .body {
      padding-bottom: 8px;

      .creation {
        width: 100%;
        padding-top: 100%;
        position: relative;

        .panel {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: dashed 1px #666;
          color: #666;

          span {
            margin-left: 8px;
          }
        }
      }
    }
  }

  .cover {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px;

    .el-image {
      width: 50%;
      aspect-ratio: 1/1;
      padding: 3px;

      .replace-block {
        background: var(--el-fill-color-light);
        font-size: 10px;
      }
    }
  }

  .files {
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      padding: 1vw 0;

      i {
        font-size: 100pt;
      }
    }
  }

  .name {
    text-align: center;
    padding: 2px 8px;
    font-size: 14px;
    line-height: 26px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .keywords {
    padding: 0 8px;
    font-size: 12px;
  }

  .search-input {
    width: 240px;
    margin-left: 16px;
  }
}
</style>

<template>
  <div class="directory-list">
    <filter-area :custom="true">
      <template #prev>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :key="index" v-for="(item, index) in currentDirectory.stacks" @click="onEnterDir(item)">{{
            item.title
          }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="currentDirectory.id" @click="onEnterDir(currentDirectory)"
            >{{ currentDirectory.title }}
            <span v-if="currentDirectory.dir_total > 0 || currentDirectory.file_total > 0">
              （<template v-if="currentDirectory.dir_total > 0">{{ currentDirectory.dir_total }}个文件夹</template>
              <em v-if="currentDirectory.dir_total > 0 && currentDirectory.file_total > 0">，</em>
              <template v-if="currentDirectory.file_total > 0">{{ currentDirectory.file_total }}个文件</template>）
            </span>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!--Check All-->
        <el-checkbox
          :disabled="currentDirectory.files?.length <= 0"
          style="margin-left: 8px"
          @click="checkAll"
          :indeterminate="isIndeterminate"
          >全选</el-checkbox
        >
      </template>
      <template #right>
        <el-button
          v-if="checkedList.length > 0"
          v-permission="['manage', `owner_${currentDirectory.owner_uuid}`]"
          icon="Plus"
          type="danger"
          size="small"
          @click="deleteChecked"
          >删除选中</el-button
        >
        <el-button
          v-if="checkedList.length > 0"
          v-permission="['manage', `owner_${currentDirectory.owner_uuid}`]"
          icon="Plus"
          type="primary"
          size="small"
          plain
          @click="showMoveDialog"
          >移动到目录</el-button
        >
        <el-button
          v-permission="['manage', `owner_${currentDirectory.owner_uuid}`]"
          icon="Plus"
          type="primary"
          size="small"
          plain
          @click="operateRef?.openCreate(currentDirectory.id, searchQuery.channel, createSuccess)"
        />
        <el-button
          v-permission="['manage', `owner_${currentDirectory.owner_uuid}`]"
          icon="Upload"
          type="primary"
          size="small"
          plain
          @click="operateRef?.openUpload(currentDirectory.id, uploadSuccess)"
          ><span class="hidden-sm-and-down">上传</span><span class="hidden-lg-and-down">文件</span></el-button
        >
        <el-dropdown trigger="click" size="small" style="margin-left: 1rem" @command="sortCommand">
          <el-button type="primary" size="small" plain>
            <el-icon>
              <SortUp v-if="sortSelected.sortType === ''" />
              <SortDown v-else />
            </el-icon>
            <span>{{ sortSelected.sortOption.label }}</span
            ><span class="hidden-lg-and-down">排序</span>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu class="sort-dropdown">
              <el-dropdown-item v-for="(action, index) in sortOptions" :key="index" :command="action.value"
                ><span :class="{ active: sortSelected.sortOption.value === action.value }">{{
                  action.label
                }}</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 创建一个search icon 并在聚焦后显示搜索框-->
        <el-input
          class="search-input"
          size="small"
          v-model="searchText"
          placeholder="搜索"
          prefix-icon="Search"
          clearable
          @keydown="handleKeydown($event)"
        />
      </template>
    </filter-area>
    <!-- Directory Page -->
    <yl-masonry-list
      :key="route.query + (searchQuery.id || '') + searchQuery.sort"
      ref="listRef"
      :load="load"
      :cols="6"
      :gap="8"
      :step="20"
      :adapter="{ xs: 3, sm: 4, md: 4, lg: 5, xl: 6 }"
    >
      <template #item="{ item, index }">
        <!-- Direcroty Card -->
        <item-card
          @on-preview="onPreview(item)"
          @on-enter-dir="onEnterDir(item)"
          @on-remove="onRemove"
          :item="item"
          :index="index"
        />
        <el-checkbox
          style="position: absolute; bottom: 12px; left: 10px; z-index: 1"
          :key="checkedList.length"
          v-if="item['original_mime_type']"
          @click="checkItem(item)"
          :checked="checkedList.findIndex((x) => x.id === item.id) > -1"
        />
      </template>
    </yl-masonry-list>
  </div>
  <operate-dialog ref="operateRef" :key="currentDirectory.id" />
  <r-preview v-if="previewFileUrl" :key="previewFileUrl" :src="previewFileUrl" />
</template>

<script setup lang="ts">
import itemCard from "./item-card.vue"
import { ArrowRight, SortDown, SortUp } from "@element-plus/icons-vue"
import ylMasonryList from "@/components/custom/masonry-list.vue"
import { reactive, ref, withDefaults, onMounted, onUpdated, getCurrentInstance } from "vue"
import { BaseStruct, DirDetail, Directory, IListQuery } from "@/api/directory/types"
import filterArea from "@/components/filter/filter-area.vue"
import "ranui/preview"
import { getList } from "@/api/directory/index"
import { useRoute, useRouter } from "vue-router"
import operateDialog from "./operate-dialog.vue"
import { useUserStore } from "@/store/modules/user"
import { requestNoBase } from "@/utils/service"

const { accountInfo, roles } = useUserStore()
const app = getCurrentInstance()
const $redrawVueMasonry = app?.appContext.config.globalProperties.$redrawVueMasonry

const props = withDefaults(
  defineProps<{
    channel?: string
  }>(),
  {
    channel: ""
  }
)

const dirFinish = ref(false)
const searchQuery = reactive<IListQuery>({
  idx: 1,
  size: 30,
  sort: "display_order",
  channel: props.channel,
  id: "",
  status: 0
})

const router = useRouter()
const route = useRoute()
const listRef = ref()
const operateRef = ref()

const fileIndex = ref(1)
const checkedList = ref<any[]>([])
const isIndeterminate = ref(false)
const previewFileUrl = ref()

const searchText = ref<string>("")

const checkItem = (item: any) => {
  const index = checkedList.value.findIndex((x) => x.id === item.id)
  if (index > -1) {
    checkedList.value.splice(index, 1)
  } else {
    checkedList.value.push({
      id: item.id,
      type: item.original_mime_type ? "file" : "dir",
      index
    })
  }
  isIndeterminate.value = checkedList.value.length > 0
}
const checkAll = () => {
  if (checkedList.value.length === currentDirectory.value.files.length) {
    checkedList.value = []
  } else {
    checkedList.value = currentDirectory.value.files.map((x, index) => {
      return {
        id: x.id,
        type: x.original_mime_type ? "file" : "dir",
        index: index + currentDirectory.value.dirs.length
      }
    })
  }
  isIndeterminate.value = checkedList.value.length > 0 && checkedList.value.length < currentDirectory.value.files.length
}

const deleteChecked = async () => {
  operateRef.value?.openRemove(checkedList.value, removeSuccess)
}
const showMoveDialog = () => {}

const sortSelected = reactive<{
  sortOption: {
    label: string
    value: string
  }
  sortType: "" | "-"
}>({
  sortOption: {
    label: "按自定义",
    value: "display_order"
  },
  sortType: ""
})

const sortOptions = [
  {
    label: "按自定义",
    value: "display_order"
  },
  {
    label: "按更新时间",
    value: "updated_at"
  },
  {
    label: "按名称",
    value: "title"
  }
]

const sortCommand = (cmd: string) => {
  if (sortSelected.sortOption.value === cmd) {
    sortSelected.sortType = sortSelected.sortType ? "" : "-"
  } else {
    const option = sortOptions.find((o) => o.value === cmd)
    if (!option) return
    sortSelected.sortOption.label = option.label
    sortSelected.sortOption.value = option.value
    sortSelected.sortType = ""
  }
  searchQuery.idx = 1
  fileIndex.value = 1
  searchQuery.sort = `${sortSelected.sortType}${sortSelected.sortOption.value}`
}
/** 当前所在的目录 */
const currentDirectory = ref<BaseStruct & Directory & DirDetail>({
  id: "",
  title: "",
  files: [],
  file_total: 0,
  dirs: [],
  dir_total: 0,
  stacks: []
})

const load = async () => {
  const { data } = await getList(searchQuery)
  searchQuery.idx++
  if (data) {
    currentDirectory.value = data
  }
  dirFinish.value = data.dir_total + data.file_total < searchQuery.size * searchQuery.idx
  return [...data.dirs, ...data.files]
}

/** item operate */
const onRemove = (item: any, index: number) => {
  operateRef.value?.openRemove(
    [
      {
        id: item.id,
        type: item.original_mime_type ? "file" : "dir",
        index
      }
    ],
    removeSuccess
  )
}
const onEnterDir = async (item: any) => {
  if (item?.status === 255) return
  if (!item) {
    const newQuery: any = { ...route.query }
    await router.push({ path: route.path, query: newQuery })
    location.reload()
    return
  }
  /** client permission check */
  const isOwner = item?.owner_uuid === accountInfo.id
  const isManage = roles.indexOf("manage") >= 0
  if (!isOwner && !isManage && item?.point_payment_limit && item?.point_payment_limit > 0) {
    ElMessageBox.alert(`查看该目录需要支付${item?.point_payment_limit}阳光值，请问是否继续?`, "提示", {})
    return
  }
  //searchQuery.id = props.item?.id
  const newQuery: any = { ...route.query }
  newQuery.paths = item?.layer_tree ? `${item?.layer_tree}${item?.id}` : item?.id
  await router.push({ path: route.path, query: newQuery })
}
const onPreview = async (item: any) => {
  /** client permission check */
  const isOwner = item?.owner_uuid === accountInfo.id
  const isManage = roles.indexOf("manage") >= 0
  if (!isOwner && !isManage && item?.point_payment_limit && item?.point_payment_limit > 0) {
    ElMessageBox.alert(`查看该目录需要支付${item?.point_payment_limit}阳光值，请问是否继续?`, "提示", {})
    return
  }
  const method1Options = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf"
  ]
  if (item.original_mime_type?.indexOf("image/") === 0) listRef.value?.previewOpen(item.id)
  else if (method1Options.indexOf(item.original_mime_type as string) > -1) {
    // 从服务器读取流
    const response = await requestNoBase<any>({
      url: `/disk/fileview?id=${item.id}`,
      responseType: "blob"
    })
    previewFileUrl.value = URL.createObjectURL(response)
  }
}

/** operate dialog callback */
const uploadSuccess = (data: any) => {
  listRef.value?.addItem(data)
  $redrawVueMasonry()
}
const createSuccess = (data: any) => {
  listRef.value?.addItem(data)
  $redrawVueMasonry()
}
const removeSuccess = (item: any) => {
  listRef.value.removeItem(item.index)
  $redrawVueMasonry()
}

const init = () => {
  const paths = route.query.paths as string
  const type = (route.params.type as string) || "system"
  if (type) {
    searchQuery.id = type
  }
  if (paths) {
    searchQuery.id = paths.split(",").pop()
    searchQuery.idx = 1
  }
}
const performSearch = async () => {
  router.push({ path: "/media-search", query: { k: searchText.value, p: (route.query.p as string) || "" } })
}
const handleKeydown = (event: KeyboardEvent | Event) => {
  const keyEvent = event as KeyboardEvent
  if (keyEvent.key === "Enter") {
    performSearch()
  }
}
onUpdated(init)
onMounted(init)
</script>
