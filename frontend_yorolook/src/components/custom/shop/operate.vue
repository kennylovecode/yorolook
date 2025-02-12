<template>
  <div v-if="group">
    <el-button-group>
      <el-button :size="props.size || 'small'" type="primary" @click="add" plain>
        <el-icon>
          <ShoppingCart />
        </el-icon>
        <span>{{ full ? "加入购物车" : "加入" }}</span>
      </el-button>
      <el-button :size="props.size || 'small'" type="primary" @click="buy">
        <el-icon>
          <ShoppingBag />
        </el-icon>
        <span>{{ full ? "立即购买" : "购买" }}</span>
      </el-button>
    </el-button-group>
  </div>
  <div v-else class="operate-buttons">
    <el-button :size="props.size || 'small'" type="primary" @click="add" plain>
      <el-icon>
        <ShoppingCart />
      </el-icon>
      <span>{{ full ? "加入购物车" : "加入" }}</span>
    </el-button>
    <el-button :size="props.size || 'small'" type="primary" @click="buy">
      <el-icon>
        <ShoppingBag />
      </el-icon>
      <span>{{ full ? "立即购买" : "购买" }}</span>
    </el-button>
  </div>
  <el-dialog v-model="skuDialogVisible" title="请选择其中一款商品">
    <el-select :key="skuList.length" v-model="skuId" placeholder="请选择SKU" class="w-full mb-2">
      <el-option v-for="item in skuList" :key="item.id" :label="item.title" :value="item.id">
        <div class="flex items-center">
          <img :src="`/disk/view?id=${item.cover}`" :alt="item.title" class="w-8 h-8 mr-2" />
          <div class="h-8 flex items-center">
            <div class="mr-2">{{ item.title }}</div>
            <div class="text-sm text-gray-500">￥{{ item.sale_price || "未设置" }}</div>
          </div>
        </div>
      </el-option>
    </el-select>
    <div class="dialog-buttons">
      <el-button @click="skuDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="action()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ShoppingBag } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { addToCart } from "@/api/shop/cart" // 引入 CartAPI
import { defineProps, ref } from "vue"
import { list as getSkuList } from "@/api/article_sku"

const props = defineProps<{
  channel: string
  article_uuid: string
  sku_id?: string
  quantity?: number
  full?: boolean
  group?: boolean
  size?: string
}>()

const router = useRouter()
const skuId = ref<string>(props.sku_id || "")
const skuDialogVisible = ref<boolean>(false)
const skuList = ref<any[]>([])
const action = ref<any>()

const add = async () => {
  const passSku = await checkSku()
  if (passSku) {
    try {
      await addToCart({
        article_uuid: props.article_uuid,
        article_sku_uuid: skuId.value,
        quantity: props.quantity || 1
      })
      ElMessage.success("商品已添加到购物车")
      skuDialogVisible.value = false
      skuId.value = ""
      skuList.value = []
    } catch (error) {
      ElMessage.error("添加到购物车失败")
    }
  } else {
    action.value = add
  }
}

const buy = async () => {
  const passSku = await checkSku()
  if (passSku) {
    try {
      await addToCart({
        article_uuid: props.article_uuid,
        article_sku_uuid: skuId.value,
        quantity: props.quantity || 1
      })
      skuDialogVisible.value = false
      skuId.value = ""
      skuList.value = []
      ElMessage.success("商品已加入购物车，准备结算")
      router.push("/checkout")
    } catch (error) {
      ElMessage.error("立即购买失败")
    }
  } else {
    action.value = buy
  }
}

const checkSku = async () => {
  if (!skuId.value) {
    const { data } = await getSkuList(props.channel, props.article_uuid)
    if (data?.length == 1) {
      skuId.value = data[0].id
      return true
    }
    if (data?.length > 1) {
      skuDialogVisible.value = true
      skuList.value = data
      return false
    }
    ElMessage.error("该商品无规格，不支持在线购买...")
    return false
  }
  return true
}
</script>
