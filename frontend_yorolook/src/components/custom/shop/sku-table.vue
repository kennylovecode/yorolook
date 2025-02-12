<style lang="scss" scoped>
.thumbnails {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: flex-start;
  padding: 0;
  li {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border: var(--el-border);
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    cursor: pointer;
    &:hover,
    &.active {
      border-color: var(--el-color-success);
      border-width: 2px;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
<template>
  <div class="sku-table">
    <el-table :data="skuList" style="width: 100%" max-height="250">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="sub_title" label="副标题" />
      <el-table-column prop="quick_code" label="编号" />
      <el-table-column prop="cover" label="封面">
        <template #default="{ row }">
          <img
            v-if="row.cover"
            width="50"
            :src="`/disk/view?id=${row.cover}&w=300`"
            alt="封面"
            onerror="this.remove()"
          />
        </template>
      </el-table-column>
      <el-table-column prop="cost_price" label="成本价" />
      <el-table-column prop="sale_price" label="销售价" />
      <el-table-column prop="market_price" label="市场价" />
      <el-table-column prop="display_order" label="排序" />
      <el-table-column prop="id" fixed="right" label="操作" width="150px">
        <template #default="{ row }">
          <el-button type="primary" link @click="onAddItem(row)">编辑</el-button>
          <el-button type="danger" link @click="onAddItem">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem(null)">添加一个SKU</el-button>
  </div>
  <el-dialog title="SKU编辑" v-model="editDialogVisible">
    <edit-layout
      :cb="onAfterSubmit"
      :dialog="true"
      :id="currentEdit.id"
      ref="editLayoutRef"
      name="article_sku"
      title="产品"
    >
      <el-form :model="currentEdit" :rules="formRules">
        <el-form-item label="标题">
          <el-input size="small" v-model="currentEdit.title" placeholder="输入SKU的主要标题，简短概要" />
        </el-form-item>
        <el-form-item label="副标题">
          <el-input
            size="small"
            v-model="currentEdit.sub_title"
            placeholder="输入SKU的长标题，可包含颜色、尺寸等详细描述"
          />
        </el-form-item>
        <el-form-item label="编号">
          <el-input size="small" v-model="currentEdit.quick_code" placeholder="输入SKU的货品编号，唯一识别可不填写" />
        </el-form-item>
        <el-form-item label="封面">
          <ul v-if="props.images" class="thumbnails">
            <li
              :class="{ active: currentEdit.cover === item }"
              v-for="(item, index) in props.images.split(',')"
              :key="currentEdit.cover + index"
              @click="currentEdit.cover = item"
            >
              <img :src="`/disk/view?id=${item}&w=300`" alt="设置为封面" />
            </li>
          </ul>
          <div v-else>您需要在基础信息处先选择主图...</div>
        </el-form-item>
        <el-form-item label="成本价">
          <el-input-number
            size="small"
            :min="0"
            :max="100000"
            v-model="currentEdit.cost_price"
            placeholder="进货成本价"
          />
        </el-form-item>
        <el-form-item label="销售价">
          <el-input-number
            :min="currentEdit.cost_price"
            size="small"
            v-model="currentEdit.sale_price"
            placeholder="预计销售价"
          />
        </el-form-item>
        <el-form-item label="市场价">
          <el-input-number
            :min="currentEdit.cost_price"
            size="small"
            v-model="currentEdit.market_price"
            placeholder="市场参考价"
          />
        </el-form-item>
        <el-form-item label="设置">
          <el-checkbox size="small" v-model="currentEdit.is_discount">参与打折</el-checkbox>
          <el-checkbox size="small" v-model="currentEdit.is_activity">参与活动</el-checkbox>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number size="small" v-model="currentEdit.display_order" />
        </el-form-item>
      </el-form>
    </edit-layout>
  </el-dialog>
</template>

<script lang="ts" setup>
import { list } from "@/api/article_sku"
import { onMounted, ref, watch, reactive } from "vue"

interface IArticleSku {
  id: string
  channel: string
  article_uuid: string
  title: string
  sub_title: string
  quick_code: string
  cover: string
  cost_price: number
  sale_price: number
  market_price: number
  is_discount: boolean
  is_activity: boolean
  display_order: number
}

const props = defineProps<{
  channel: string
  article_uuid: string
  images: string
}>()

const editDialogVisible = ref(false)
const currentEdit = reactive<IArticleSku>({
  id: "",
  channel: props.channel,
  article_uuid: props.article_uuid,
  title: "",
  sub_title: "",
  quick_code: "",
  cover: "",
  cost_price: 0,
  sale_price: 0,
  market_price: 0,
  is_discount: true,
  is_activity: true,
  display_order: 0
})
const editLayoutRef = ref<any>(null)

const formRules = {
  title: [
    { required: true, message: "请输入内容的标题", trigger: "blur" },
    { min: 2, max: 16, message: "长度在2-32个字符之间", trigger: "blur" }
  ],
  sub_title: [
    { required: true, message: "请输入内容的副标题", trigger: "blur" },
    { min: 2, max: 16, message: "长度在2-32个字符之间", trigger: "blur" }
  ]
}
const skuList = ref<IArticleSku[]>([])

const onAddItem = (row: any) => {
  editDialogVisible.value = true
  if (row) {
    Object.assign(currentEdit, row)
  }
}

const onAfterSubmit = (item: any) => {
  console.log(item)
  if (!currentEdit.id) {
    skuList.value.push(item)
  } else {
    const findIndex = skuList.value.findIndex((x) => x.id === item.id)
    skuList.value[findIndex] = item
  }
  editDialogVisible.value = false
}

const initial = async () => {
  const { data } = await list(props.channel, props.article_uuid)
  if (data?.length > 0) {
    skuList.value = data
  }
}

onMounted(async () => {
  watch(currentEdit, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })
  await initial()
})
</script>
