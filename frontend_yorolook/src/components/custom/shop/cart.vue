<script setup lang="ts">
import CartItem from './cart-item.vue'
import CartCheckout from './cart-checkout.vue'
import { ref, onMounted } from 'vue'
import { getCartList } from '@/api/shop/cart'
import { CheckboxValueType } from 'element-plus'

const cartItems = ref<any[]>([])
const cartTotal = ref<number>(0)
const isIndeterminate = ref<boolean>(false)
const checkedItems = ref<string[]>([])
const checkAll = ref<boolean>(false)

const checkoutSummary = {
  subtotal: 9796.0,
  discount: 0.0,
  couponDiscount: 0.0,
  total: 9796.0,
  itemCount: 4
}

const handleCheckAllChange = (val: boolean) => {
  debugger
  checkedItems.value = val ? cartItems.value.map(x=> x.id) : []
  isIndeterminate.value = false
}
const handleCheckedChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cartItems.value.map(x=> x.id).length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cartItems.value.length
}

onMounted(async ()=>{
  const { data, total } = await getCartList({
    idx: 1,
    size: 20
  })
  cartItems.value = data
  cartTotal.value = total
})

</script>

<template>
  <div :key="cartItems.length" class="page-container">
    <div class="main-content">
      <div class="cart-content">
        <el-affix target=".cart-content" :offset="10">
          <div class="cart-header">
            <div class="left-section">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                size="large"
                @change="(val: CheckboxValueType) => handleCheckAllChange(val as boolean)"
                >全选</el-checkbox
              >
            </div>
            <div class="right-section">
              <el-button icon="Delete" text>删除</el-button>
              <el-button icon="Star" text>收藏</el-button>
            </div>
          </div>
        </el-affix>
        <div class="cart-items">
          <el-checkbox-group v-model="checkedItems"  @change="handleCheckedChange">
            <CartItem v-for="item in cartItems" :key="item.id" v-bind="item" />
          </el-checkbox-group>
        </div>
      </div>
      <div class="hidden-md-and-down checkout-summary">
        <el-affix target=".checkout-summary" :offset="10">
          <CartCheckout :key="checkedItems.length" :checkItems="cartItems.filter(x=> checkedItems.includes(x.id)&&!x.is_fake)" :summary="checkoutSummary" />
        </el-affix>
      </div>
    </div>
  </div>
</template>

<style>
.page-container {
  min-height: 100vh;
  width: var(--max-width);
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: 24px;
}

.main-content {
  display: flex;
  gap: 24px;
}

.cart-content {
  flex: 1;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #fff;
  margin-bottom: 16px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  max-width: 100%;
}

.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  gap: 16px;
}

:deep(.el-checkbox__inner) {
  width: 20px;
  height: 20px;
}
</style>
