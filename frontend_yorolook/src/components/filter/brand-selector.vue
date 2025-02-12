<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from "vue"
import { ElInput, ElTag, ElDialog, ElButton, ElPagination } from "element-plus"
import { getList } from "@/api/brand"
import { Brand, ListRequest } from "@/api/brand/types"
import { debounce } from "lodash-es"

interface Props {
  categoryId?: number
}

const emit = defineEmits(["select"])

const dialogVisible = ref(false)
const brands = ref<Brand[]>([])
const searchQuery = reactive<
  ListRequest & {
    my: boolean
  }
>({
  idx: 1,
  size: 20,
  catalog: "",
  keywords: "",
  type: "",
  attributes: {},
  initial: "",
  country: "",
  area: "",
  my: false,
  status: -1,
  sort: "display_order"
})
const selectedLetter = ref("")
const selectedBrands = ref<Brand[]>([])
const tempSelectedBrands = ref<Brand[]>([])
const letters = ref([
  "",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
])

// Pagination
const total = ref(0)

const selectedBrandsText = computed(() => {
  if (selectedBrands.value.length === 0) return "选择品牌"
  return `已筛选 ${selectedBrands.value.length} 个品牌`
})

const filterBrands = async () => {
  try {
    const res = await getList(searchQuery)
    brands.value = res.data
    total.value = res.total
  } catch (error) {
    console.error("Error fetching brands:", error)
  }
}

// 创建一个防抖的搜索函数
const debouncedSearch = debounce(() => {
  searchQuery.idx = 1
  filterBrands()
}, 300) // 300ms 的延迟

const handleSearch = (value: string) => {
  searchQuery.keywords = value
  debouncedSearch()
}

const selectLetter = (letter: string) => {
  searchQuery.initial = letter
  searchQuery.idx = 1
  filterBrands()
}

const toggleBrand = (brand: Brand) => {
  const index = tempSelectedBrands.value.findIndex((b) => b.id === brand.id)
  if (index === -1) {
    tempSelectedBrands.value.push(brand)
  } else {
    tempSelectedBrands.value.splice(index, 1)
  }
}

const isBrandSelected = (brand: Brand) => {
  return tempSelectedBrands.value.some((b) => b.id === brand.id)
}

const openDialog = () => {
  dialogVisible.value = true
  tempSelectedBrands.value = [...selectedBrands.value]
}

const resetFilter = () => {
  selectedLetter.value = ""
  searchQuery.idx = 1
  searchQuery.keywords = ""
  searchQuery.initial = ""
  filterBrands()
}

const clearSelection = () => {
  tempSelectedBrands.value = []
}

const handleConfirm = () => {
  selectedBrands.value = [...tempSelectedBrands.value]
  emit("select", selectedBrands.value)
  dialogVisible.value = false
}

const handleCancel = () => {
  dialogVisible.value = false
  resetFilter()
}

const handlePageChange = (page: number) => {
  searchQuery.idx = page
  filterBrands()
}

onMounted(() => {
  filterBrands()
})
</script>

<template>
  <div class="brand-filter">
    <!-- Trigger Button -->
    <el-button size="small" @click="openDialog" type="primary" plain>
      {{ selectedBrandsText }}
    </el-button>

    <!-- Dialog -->
    <el-dialog v-model="dialogVisible" title="选择品牌" width="60%" :before-close="handleCancel">
      <!-- Search Input -->
      <div class="search-box">
        <el-input
          size="small"
          :model-value="searchQuery.keywords"
          @input="handleSearch"
          placeholder="搜索品牌"
          clearable
          :prefix-icon="'Search'"
        />
      </div>

      <!-- Letter Filter -->
      <div class="letter-filter">
        <el-tag
          size="small"
          v-for="letter in letters"
          :key="letter"
          :type="searchQuery.initial === letter ? 'primary' : 'info'"
          class="letter-tag"
          @click="selectLetter(letter)"
          :effect="searchQuery.initial === letter ? 'dark' : 'light'"
        >
          {{ letter || "全部" }}
        </el-tag>
      </div>

      <!-- Selected Count and Clear Button -->
      <div class="selection-header">
        <div class="selected-count" v-if="tempSelectedBrands.length > 0">
          <span>已选择</span>
          <el-tag
            @close="toggleBrand(brand)"
            size="small"
            v-for="brand in tempSelectedBrands"
            :key="brand.id"
            closable
            >{{ brand.title }}</el-tag
          >
        </div>
        <el-button size="small" type="text" @click="clearSelection" v-if="tempSelectedBrands.length > 0">
          清除选择
        </el-button>
      </div>

      <template v-if="brands.length > 0">
        <!-- Brand List -->
        <div class="brand-list">
          <div v-for="brand in brands" class="item" :key="brand.id">
            <img v-if="brand.banners && !isBrandSelected(brand)" :src="`/disk/view?id=${brand.banners}`" alt="" />
            <el-tag
              size="small"
              class="brand-tag"
              :effect="isBrandSelected(brand) ? 'dark' : 'plain'"
              @click="toggleBrand(brand)"
            >
              {{ brand.title }}
            </el-tag>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-container">
          <el-pagination
            v-if="total > searchQuery?.size"
            size="small"
            v-model:current-page="searchQuery.idx"
            :page-size="searchQuery.size"
            :total="total"
            :pager-count="7"
            layout="prev, pager, next"
            @current-change="handlePageChange"
          />
        </div>
      </template>
      <template v-else>
        <el-empty size="small" description="暂无数据" />
      </template>
      <!-- Dialog Footer -->
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="handleCancel">取消</el-button>
          <el-button size="small" type="primary" @click="handleConfirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 16px;
}

.letter-filter {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.letter-tag {
  cursor: pointer;
  min-width: 20px;
  text-align: center;
  &.el-tag + .el-tag {
    margin-left: 2px;
  }
}

.selection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.selected-count {
  color: #606266;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  .el-tag {
    margin: 0;
  }
}

.brand-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  min-height: 200px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 16px;
  padding: 2px;
  .item {
    position: relative;
    height: 32px;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .brand-tag {
      position: absolute;
      cursor: pointer;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 100%;
      :deep(.el-tag__content) {
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    img + .el-tag {
      color: #fff;
      background: rgba($color: #000000, $alpha: 0.2);
    }
  }
}

.brand-tag:hover {
  opacity: 0.8;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
