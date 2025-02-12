<style lang="scss" scoped>
.sku-item {
  border: none;
  border-radius: 8px;
  padding: 8px 4px;
  a {
    display: block;
  }
  .img-box {
    width: 100%;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-image {
      width: 100%;
      font-size: 12px;
    }
  }
  .info-title {
    margin-top: 0.5rem;
  }
  .tag-list {
    margin: 0.5rem 0 1rem;
    .el-tag + .el-tag {
      margin-left: 4px;
    }
    height: 20px;
    overflow: hidden;
  }
  .price-wrap {
    align-items: flex-end;
    justify-content: flex-end;
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    position: relative;
    .unit,
    .value {
      font-weight: 600;
      color: var(--el-text-color-primary);
    }

    .value {
      font-size: 14pt;
      margin-left: 3px;
    }
    .counter {
      position: absolute;
      right: 10px;
      bottom: 0;
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
<template>
  <el-card shadow="always" class="sku-item" :body-style="{ padding: '6px' }">
    <router-link :to="{ path: `/${articleModel.channel}/detail/${articleModel.id}` }">
      <div class="img-box">
        <el-image v-if="coverUrl" @load="$redrawVueMasonry()" :src="coverUrl" fit="contain" :lazy="true">
          <template #error> 图片加载错误 </template>
        </el-image>
        <el-image v-else aspect-ratio="1">
          <template #error>
            <div
              style="
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                aspect-ratio: 1/1;
                color: var(--el-text-color-secondary);
              "
            >
              暂无图片
            </div>
          </template>
        </el-image>
      </div>
      <el-text :line-clamp="1" class="info-title">{{ articleModel.title }}</el-text>
      <div class="info-wrap">
        <div class="info-wrap-title">
          <div class="icon" />
        </div>
      </div>
      <div v-if="articleModel.keywords.length > 0" class="tag-list">
        <el-tag
          :key="index"
          v-for="(tag, index) in articleModel.keywords?.split(',').filter((x) => x)"
          type="info"
          size="small"
          >{{ tag }}</el-tag
        >
      </div>
      <div v-if="articleModel.lowest_price > 0 && articleModel.highest_price > 0" class="price-wrap">
        <div class="unit">¥</div>
        <div class="value" v-show="articleModel.lowest_price !== articleModel.highest_price">
          {{ articleModel.lowest_price / 100 }} ~ {{ articleModel.highest_price / 100 }}
        </div>
        <div class="value" v-show="articleModel.lowest_price === articleModel.highest_price">
          {{ articleModel.lowest_price / 100 }}
        </div>
        <div class="counter" />
      </div>
    </router-link>
    <el-button class="mt-4" size="small" type="primary" plain v-if="route.query.pick" @click="operate('onPick')">
      选择
    </el-button>
    <operate-group v-else :can-fav="canFav" :can-edit="canEdit" :operate="operate">
      <template v-if="props.isShop" #left>
        <operate-shop
          :channel="articleModel.channel"
          :article_uuid="articleModel.id"
          group
          @sku-select="handleSkuSelect"
        />
      </template>
    </operate-group>
  </el-card>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, computed } from "vue"
import type { IArticle } from "@/api/article/types"
import operateGroup from "@/components/custom/operate-group.vue"
import operateShop from "@/components/custom/shop/operate.vue"
import { useUserStore } from "@/store/modules/user"
import { useRoute } from "vue-router"

const { accountInfo, roles } = useUserStore()
const route = useRoute()
const props = defineProps<{
  item: any
  index: number
  isShop?: boolean
}>()

const canEdit = computed(() => {
  return roles.includes("manage") || accountInfo?.id === props.item?.owner_uuid
})
const canFav = computed(() => {
  return props.item.status === 0
})
const emits = defineEmits(["onEnterDir", "onPreview", "onFav", "onEdit", "onRemove", "onPick"])
const app = getCurrentInstance()
const $redrawVueMasonry = app?.appContext.config.globalProperties.$redrawVueMasonry

const articleModel = reactive<IArticle>({ ...props.item })
const operate = (action: "onEnterDir" | "onPreview" | "onFav" | "onEdit" | "onRemove" | "onPick") => {
  emits(`${action}`, props.item, props.index)
}
const coverUrl = computed(() => {
  if (articleModel.cover.length > 10) {
    return `/disk/view?id=${articleModel.cover}`
  }
  const imgs = articleModel.images.split(",").filter((x) => x)
  if (imgs?.length > 0) {
    return `/disk/view?id=${imgs[0]}`
  }
  return ""
})

const handleSkuSelect = (skuUuid: string) => {
  // Logic to handle SKU selection, e.g., open a modal for user selection
  console.log("Selected SKU UUID:", skuUuid)
}
</script>
