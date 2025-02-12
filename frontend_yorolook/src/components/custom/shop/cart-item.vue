<script setup lang="ts">
import { ref } from 'vue'
import { Delete, ArrowRight, Star } from '@element-plus/icons-vue'
import { CartItemResponse } from '@/api/shop/type';

const props = defineProps<CartItemResponse>()

const quantity = ref(props.quantity)

const formatPrice = (price: number) => {
  return `¥${(price/100).toFixed(2)}`
}
</script>

<template>
  <div class="cart-item">
    <el-card shadow="never" :body-style="{ padding: '16px' }">
      <div v-if="props.is_fake" class="fake-item">
        <div class="fake cart-item-content">
          <div class="checkbox-section">
            <el-checkbox  size="large" :key="props.id" :value="props.id" :disabled="props.is_fake" />
          </div>
          <!-- Image -->
          <div class="image-section">
            <el-image :src="`/disk/view?id=${props.image}`" fit="contain" :alt="props.title" />
          </div>
          <div class="info-section">
            <div class="product-header"> <el-text class="product-name" :line-clamp="1">{{ props.title }}</el-text></div>
            <div class="description-wrapper">
            <el-text :line-clamp="1">该商品已下架</el-text>
          </div>
          </div>
          <el-button-group>
              <el-button :icon="Delete" circle type="info" text class="action-button" />
              <el-button :icon="Star" circle type="info" text class="action-button" />
            </el-button-group>
        </div>
      </div>
      <div v-else class="cart-item-content">
        <!-- Checkbox -->
        <div class="checkbox-section">
          <el-checkbox  size="large" :key="props.id" :value="props.id" />
        </div>

        <!-- Image -->
        <div class="image-section">
          <el-image :src="`/disk/view?id=${props.image}`" fit="contain" :alt="props.title" />
        </div>

        <!-- Product Info -->
        <div class="info-section">
          <div class="product-header">
            <!-- Product Name -->
            <el-text class="product-name" :line-clamp="1">{{ props.title }}</el-text>
          </div>

          <!-- Description -->
          <div class="description-wrapper">
            <el-text class="description" :line-clamp="1">{{ props.sub_title }}</el-text>
            <el-icon class="arrow-icon"><ArrowRight /></el-icon>
          </div>

          <!-- Quantity Input -->
          <div class="quantity-section">
            <el-input-number
              v-model="quantity"
              :min="1"
              :max="99"
              size="small"
              controls-position="right"
              class="quantity-input"
            />
          </div>

          <!-- Matching Products -->
          <div class="matching-products">
            <span class="hidden-md-and-down matching-label">搭配商品</span>
            <div class="matching-link">
              <el-text class="link-text" :line-clamp="1">选购热门搭配商品</el-text>
              <el-icon class="arrow-icon"><ArrowRight /></el-icon>
            </div>
          </div>
        </div>

        <!-- Price and Actions -->
        <div class="hidden-md-and-down price-actions-section">
          <div class="price">
            <span>{{ formatPrice(props.sale_price) }}</span>
            <span style="text-decoration: line-through; ">{{ formatPrice(props.market_price) }}</span>
          </div>
          <div class="actions">
            <el-button-group>
              <el-button :icon="Delete" circle type="info" text class="action-button" />
              <el-button :icon="Star" circle type="info" text class="action-button" />
            </el-button-group>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.cart-item {
  :deep(.el-card) {
    border: none;
    border-bottom: solid 1px var(--el-border-color);
  }
  margin-bottom: 16px;
}

.cart-item-content {
  display: flex;
  align-items: flex-start;
  gap: 0.5vw;
}

.checkbox-section {
  padding-top: 40px;
}

.image-section {
  width: 120px;
  height: 120px;
  background-color: var(--el-background-color);
  border-radius: 4px;
  overflow: hidden;
  max-width: 20%;
}

.info-section {
  flex: 1;
  min-width: 0;
}

.product-header {
  margin-bottom: 12px;
}

.tags-section {
  margin-bottom: 8px;
}

.hot-tag {
  padding: 2px 8px;
  font-size: 12px;
  border: none;
  background-color: var(--el-color-danger);
}

.product-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-color-primary);
  height: 30px;
  line-height: 30px;
}

.description-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
  cursor: pointer;
  line-height: 20px;
}

.description {
  color: var(--el-text-color-regular);
  font-size: 14px;
}

.arrow-icon {
  color: var(--el-text-color-regular);
  font-size: 16px;
}

.quantity-section {
  margin: 16px 0;
}

.quantity-input {
  width: 120px;
}

.matching-products {
  display: flex;
  align-items: center;
  width: 100%;
  line-height: 20px;
}

.matching-label {
  color: #666;
  font-size: 14px;
}

.matching-link {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.link-text {
  color: #0058A3;
  font-size: 14px;
}

.notes-section {
  margin: 16px 0;
  line-height: 20px;
}

.note-item {
  display: flex;
  gap: 12px;
  margin-bottom: 4px;
  font-size: 14px;
}

.note-label {
  color: #666;
}

.note-content {
  color: #666;
}

.price-actions-section {
  text-align: right;
  min-width: 120px;
}

.price {
  font-size: 20px;
  font-weight: 500;
  color: #111;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  line-height: 24px;
  >span{
    display: block;
    width: 100%;
    &:last-child{
      font-size: 12px;
      color: var(--el-text-color-secondary)
    }
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.action-button {
  font-size: 20px;
}

:deep(.el-input-number) {
  --el-input-number-width: 120px;
}

:deep(.el-input-number .el-input__inner) {
  text-align: center;
}

:deep(.el-checkbox__inner) {
  width: 20px;
  height: 20px;
}
</style>
