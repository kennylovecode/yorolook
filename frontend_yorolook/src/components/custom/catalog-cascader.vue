<template>
  <el-cascader
    :key="selectedCatalogs?.length"
    placeholder="选择分类"
    v-model="selectedCatalogs"
    style="width: 100%"
    :options="catalogSelectorOption"
    :props="cascaderProps"
    :show-all-levels="true"
    @change="change"
    filterable
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { CascaderProps } from "element-plus"
import { getAll as getCatalogs } from "@/api/catalog"
import { Catalog } from "@/api/catalog/types"

const props = defineProps<{
  data: string
  catalogs: any[]
}>()

const cascaderProps: CascaderProps = {
  value: "id",
  label: "title",
  children: "children",
  multiple: true,
  checkStrictly: true
}

const catalogSelectorOption = ref<any>()
const selectedCatalogs = ref<any[][]>([])

const emits = defineEmits(["change"])

function filterWithChildren(options: any[], listValue: any[], key: string, value: string) {
  let newOptions = options
  const result = []
  for (const v of listValue) {
    const root = newOptions.find((x) => x[key] === v)
    result.push(root[value])
    if (root.children) newOptions = root.children
    else newOptions = []
  }
  return result
}

const change = () => {
  if (selectedCatalogs.value.length > 3) {
    selectedCatalogs.value = selectedCatalogs.value.slice(1, 4)
    ElMessage.warning("最多选择3个分类")
  }
  const res = selectedCatalogs.value.map((x) => {
    return filterWithChildren(catalogSelectorOption.value, x, "id", "title")
  })
  emits("change", selectedCatalogs.value, res)
}

function buildCatalogTree(data: any) {
  const root = []

  // 遍历数据,构建树形结构
  function buildTree(items: any, parentId: any) {
    return items.reduce((acc: any, item: any) => {
      if (item.parent_id === parentId) {
        const children = buildTree(items, item.id)
        acc.push({ ...item, children })
      }
      return acc
    }, [])
  }

  // 将根节点添加到root数组
  for (const item of data) {
    if (!item.parent_id) {
      root.push(item)
    }
  }

  // 递归构建树形结构
  for (const item of root) {
    item.children = buildTree(data, item.id)
  }

  return root
}

onMounted(() => {
  getCatalogs()
    .then(({ data }: { data: Catalog[] }) => {
      const catalogIds: any[] = []
      for (const arr of props.catalogs) {
        for (const id of arr) {
          if (!catalogIds.includes(id)) {
            catalogIds.push(id)
          }
        }
      }
      const bindData = data.filter((item) => catalogIds.includes(item.id))
      catalogSelectorOption.value = buildCatalogTree(bindData)
    })
    .then(() => {
      if (props.data.length <= 0) return
      selectedCatalogs.value = props.data?.split(",").map((x) => {
        return filterWithChildren(catalogSelectorOption.value, x.split("/"), "title", "id")
      })
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>
