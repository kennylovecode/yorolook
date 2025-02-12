<script setup lang="ts">
import { computed } from 'vue'
import { CartItemResponse } from '@/api/shop/type';
import { InfoFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  checkItems?: CartItemResponse[]
}>()

const summary = computed(() => {
  return {
    itemCount: props.checkItems?.length || 0,
    subtotal: props.checkItems?.reduce((acc, item) => acc + (item.sale_price / 100) * item.quantity, 0) || 0,
    discount: 0,
    couponDiscount: 0
  }
})
const total = computed(() => {
  return summary.value.subtotal - summary.value.discount - summary.value.couponDiscount
})

const formatPrice = (price: number) => {
  return `¥${price.toFixed(2)}`
}
</script>

<template>
  <div class="cart-checkout">
    <el-card shadow="never">
      <div class="summary-section">
        <div class="summary-row">
          <span>商品小计</span>
          <span class="amount">{{ formatPrice(summary.subtotal) }}</span>
        </div>
        <div class="summary-row">
          <span>促销优惠</span>
          <span class="amount discount">-{{ formatPrice(summary.discount) }}</span>
        </div>
        <div class="summary-row">
          <span>优惠总计（包含优惠券）</span>
          <span class="amount discount">-{{ formatPrice(summary.couponDiscount) }}</span>
        </div>
        <div class="divider"></div>
        <div class="summary-row total">
          <span>购物袋合计</span>
          <span class="total-amount">{{ formatPrice(total) }}</span>
        </div>
        <div class="shipping-info">
          <el-icon><InfoFilled /></el-icon>
          <span>不含配送费</span>
        </div>
      </div>
      <el-button type="primary" class="checkout-button" size="large">
        立即结算 ({{ summary.itemCount }})
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.cart-checkout {
  width: 300px;
}

.summary-section {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.amount {
  font-weight: 500;
  color: #111;
}

.discount {
  color: #e00751;
}

.divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 16px 0;
}

.total {
  font-size: 16px;
  font-weight: 500;
  color: #111;
}

.total-amount {
  font-size: 24px;
  font-weight: bold;
}

.shipping-info {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 12px;
  margin-top: 8px;
}

</style>
