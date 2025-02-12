<style lang="scss" scoped>
.manage-table-list {
  padding: 0;
  min-height: calc(70vh);

  .table-header {
    padding: 20px 0;
  }

  .table-footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 1rem 0;
  }

  :deep(.el-button) {
    font-size: 12px;
  }
}
</style>

<template>
  <div class="manage-table-list">
    <div class="table-header" v-if="props?.title">{{ props?.title }}列表</div>
    <el-table :data="tableData" style="width: 100%">
      <slot name="table-columns" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <slot name="row-actions" :row="scope.row" />
          <el-button link type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer">
      <div class="control">
        <el-button type="danger" @click="handleEdit(-1, '')">新增</el-button>
      </div>
      <el-pagination
        v-model:current-page="searchQuery.idx"
        v-model:page-size="searchQuery.size"
        :pager-count="7"
        :page-sizes="[10, 20, 30, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal"
        @current-change="load()"
        @size-change="sizeChange"
      />
    </div>
    <el-dialog
      v-if="props!.dialogEditor && dialogData"
      v-model="dialogEditorVisible"
      :title="`编辑${props.title}`"
      width="36%"
    >
      <slot name="editor" :data="dialogData" :cb="editCallBack" :key="dialogData.id" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue"
import { useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from "element-plus"
import { usePreferenceStore } from "@/store/modules/preference"
import { setPreferenceApi } from "@/api/user"
import { IListResponse, IResponse } from "@/api/types"

interface PropsModel {
  name: string
  title?: string
  query?: any
  editorName: string
  dialogEditor?: boolean
}
const props = defineProps<PropsModel>()
const tableData = ref<any[]>()
const tableTotal = ref(0)
const router = useRouter()
const dialogEditorVisible = ref(false)
const dialogData = ref<any>({})
const dialogIndex = ref<number>(-1)
const { preference, setPreference } = usePreferenceStore()

const searchQuery = reactive<any>({
  idx: 1,
  size: 10
})

let P___DeleteById: any = async (id: string) => {
  //console.log(id)
}
let P___GetList: any = async (data: any) => {
  //console.log(data)
}

const handleEdit = (index: number, row: any) => {
  if (!props?.dialogEditor)
    router.push({
      name: `${props.editorName}`,
      params: {
        id: row.id
      }
    })
  else {
    if (index) dialogIndex.value = index
    if (row) dialogData.value = row
    if (props.query) dialogData.value = Object.assign(dialogData.value, props!.query)
    dialogEditorVisible.value = true
  }
}

const handleDelete = (index: number, id: string) => {
  ElMessageBox.confirm("数据删除后不可恢复，请问确定要删除该记录吗？", "提示", {
    type: "warning",
    confirmButtonText: "确定",
    cancelButtonText: "取消"
  })
    .then(async () => {
      const { code, message } = await P___DeleteById(id)
      if (code > 0) {
        tableData.value?.splice(index, 1)
        ElMessage.success(message)
      } else ElMessage.error(message)
    })
    .catch(() => {
      ElMessage.info("用户取消了操作...")
    })
}

const isLoading = ref(false)
const load = (reload: boolean = false) => {
  if (reload) searchQuery.idx = 1
  if (isLoading.value) return // Prevent re-entry if already loading
  isLoading.value = true

  P___GetList(searchQuery)
    .then((res: IListResponse<unknown>) => {
      const { code, data, total } = res
      if (code > 0) {
        tableData.value = data
        tableTotal.value = total
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
    .finally(() => {
      isLoading.value = false // Reset the flag after loading
    })
}

const sizeChange = (val: number) => {
  preference.pageCount = val
  setPreference(preference)
  setPreferenceApi(preference)
  load(true)
}

const editCallBack = (data: any) => {
  if (dialogIndex.value >= 0) tableData.value![dialogIndex.value] = data
  dialogEditorVisible.value = false
}

onMounted(async () => {
  setSearchQuery(props?.query)
  const { getList, deleteById } = await import(`../../api/${props.name}/index.ts`)
  P___GetList = getList
  P___DeleteById = deleteById
  if (preference.pageCount) searchQuery.size = preference.pageCount
  await load()
})
const setSearchQuery = (data: any, reload: boolean = false) => {
  for (const key in data) searchQuery[key] = data[key]
  load(reload)
}
defineExpose({ setSearchQuery })
</script>
