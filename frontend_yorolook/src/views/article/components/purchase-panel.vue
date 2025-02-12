<style lang="scss" scoped>
.affix-container {
  height: 100%;
}

.purchase-panel {
  width: 100%;
  height: calc(100vh - var(--v3-header-height));

  .content-wrap {
    height: 100%;

    .info-cell {
      margin-top: 1.5vw;
    }

    .item-title {
      h1 {
        padding: 0;
        margin: 0;
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        color: var(--el-text-color-primary);
        letter-spacing: 0;
        margin-top: 0.5rem;
      }
    }

    .item-sub-title {
      font-size: 14px;
      line-height: 18px;
      color: var(--el-text-color-secondary);
      margin-top: 10px;

      span:nth-child(n + 2) {
        &::before {
          display: inline-block;
          content: "";
          width: 1px;
          height: 8px;
          background: var(--el-text-color-secondary);
          margin: 1px 7px;
        }
      }
    }

    .price-box {
      margin: 2vw 0;

      .price {
        .banner {
          display: none;
        }

        .wrap {
          display: flex;
          align-items: flex-end;

          span {
            display: inline-block;
            margin-right: 2px;
            vertical-align: baseline;
          }

          .amount {
            font-size: 28px;
            line-height: 28px;
            font-weight: bold;
          }

          .extra-price {
            display: flex;
            align-items: center;
            margin-left: 1rem;
            background-color: var(--el-color-primary);
            border-radius: 12px;
            padding: 3px 1rem;
            font-size: 15px;
            color: var(--el-bg-color);

            .amount {
              font-size: 18px;
            }
          }
        }

        &.activity {
          background-color: var(--el-color-primary);
          padding: 0.5rem;
          color: var(--el-bg-color);
          border-radius: 8px;

          .banner {
            display: flex;
            justify-content: space-between;
            line-height: 46px;

            .title {
              font-size: 20px;
              font-weight: bold;
              letter-spacing: 2px;
            }
          }

          .wrap {
            color: var(--el-color-primary);
            background-color: var(--el-bg-color);
            border-radius: 5px;
            padding: 1rem;
          }
        }
      }
    }

    .rect-list {
      height: calc(100% - 108px);
      overflow-y: scroll;
      .item {
        display: flex;
        width: 100%;
        border-bottom: solid 1px #f5f5f5;
        padding: 16px;
        &:hover {
          cursor: pointer;
          background-color: var(--el-bg-color-page);
          transition: all 0.7s;
        }

        .cover {
          width: 84px;

          img {
            max-width: 100%;
            max-height: 100%;
          }
        }

        .info {
          width: calc(100% - 100px);
          padding: 8px;
          font-size: 12px;
          line-height: 16px;

          .tit {
            line-height: 30px;
            color: var(--el-text-color-secondary);

            span {
              font-size: 18pt;
              font-weight: 500;
              color: var(--el-color-primary);
            }
          }

          .price {
            >div {
              display: flex;
              width: 100%;
              gap: 8px;
            }
          }
        }
      }
    }
  }

  .control-wrap {
    :deep(.el-button + .el-button) {
      margin: 0;
      margin-top: 8px;
    }
  }
}

.affix {
  height: calc(100vh - 68px);
  width: 40%;
  max-width: calc(var(--max-width) * 0.38);
  position: fixed;
  top: 66px;
  right: -100px;
  z-index: 1005;
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow);
  padding: 16px;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: thin;
  /* Firefox */
  scrollbar-color: #888 transparent;
  /* Firefox */

  padding-bottom: 80px;

  .info-cell {
    margin-top: 0.8rem;
  }

  .price-box {
    margin: 16px 0;
  }

  .control-wrap {
    position: fixed;
    bottom: 20px;
    margin: 0;
    margin-left: 70px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    /* 滚动条轨道颜色 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    /* 滚动条滑块颜色 */
    border-radius: 4px;
    /* 滚动条滑块圆角 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #666;
    /* 鼠标悬停时滑块颜色 */
  }
}

@media only screen and (max-width: 768px) {
  .purchase-panel {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>
<template>
  <el-row class="affix-container" :key="'detail' + props.article?.id" :gutter="16">
    <el-col :xl="14" :lg="14" :md="12" :sm="12" :xs="24">
      <el-affix target=".affix-container" :offset="30">
        <image-gallery @on-labs-loaded="handleLabsLoaded" :key="'cover' + article.images.length"
          :images="article.images.split(',')" />
      </el-affix>
    </el-col>
    <el-col :xl="10" :lg="10" :md="12" :sm="12" :xs="24">
      <div class="purchase-panel">
        <div class="content-wrap">
          <el-text v-if="article.keywords" line-clamp="1" class="tag-area">
            <el-tag type="primary" :key="index" v-for="(tag, index) in article.keywords.split(',')">{{ tag }}</el-tag>
          </el-text>
          <div v-if="article.id" class="item-title">
            <h1 :title="article.title">
              {{ article.title }}
            </h1>
            <div class="item-sub-title">
              <span>{{ article.sub_title }}</span>
            </div>
          </div>
          <div v-else class="item-title">
            <h1 :title="article.title">
              {{ article.title }}
            </h1>
            <div v-if="article.sub_title" class="item-sub-title">
              <span>{{ article.sub_title }}</span>
            </div>
          </div>
          <attach-show :attachs="article.attachs || []" />
          <div v-if="article.lowest_price" class="price-box">
            <div class="price">
              <div class="banner">
                <div class="title">活动限定</div>
                <div class="timer">
                  <span>距结束</span>
                  <span />
                </div>
              </div>
              <div class="wrap">
                <div class="original-price">
                  <span class="text">新品抢购</span>
                  <span class="symbol">¥</span>
                  <span class="amount">{{ article.lowest_price }}</span>
                  <span>起</span>
                </div>
                <div class="extra-price">
                  <div class="text">折后优惠价</div>
                  <span class="symbol">¥</span>
                  <span class="amount">{{ article.lowest_price }}</span>
                </div>
              </div>
            </div>
          </div>
          <info-cell v-for="(item, index) in props.article.attributes" :key="index" :label="item.title">
            <template #default>
              <div class="info">{{ item.values.map((x: any) => x.value).join("，") }}</div>
            </template>
          </info-cell>
          <div class="rect-list">
            <div v-for="(rect, index) in rects.filter((x) => x.sku.id)" :key="'x_' + index" class="item">
              <div
                @click.stop="
                  router.push({
                    name: `${rect.sku.channel}Detail`,
                    params: {
                      id: rect.sku.article_uuid
                    },
                    query: {
                      sku: rect.sku.id
                    }
                  })
                "
                class="cover"
              >
                <img :src="`/disk/view?id=${rect.sku.cover || rect.article.cover}`" />
              </div>
              <div
                @click.stop="
                  router.push({
                    name: `${rect.sku.channel}Detail`,
                    params: {
                      id: rect.sku.article_uuid
                    },
                    query: {
                      sku: rect.sku.id
                    }
                  })
                "
                class="info"
              >
                <div class="tit">
                  <span>{{ rect.sku?.title || rect.article.title }}</span> X{{ rect.target_amount || 1 }}
                </div>
                <div class="price">
                  <div>
                    <div class="vip">
                      <span><em>¥ </em>{{ rect.sku.sale_price }}</span
                      ><span> 到手价</span>
                    </div>
                    <div class="market">
                      <span><em>¥ </em>{{ rect.sku.market_price }}</span
                      ><span> 市场价</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="control-wrap">
                <operate-group :operate="operate">
                  <template #left>
                    <operate-shop
                      :channel="rect.sku.channel"
                      :article_uuid="rect.sku.article_uuid"
                      :sku_id="rect.sku.id"
                    />
                  </template>
                </operate-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import infoCell from "@/components/custom/info-cell.vue"
import { IArticle } from "@/api/article/types"
import { onMounted } from "vue"
import { IArticleSku } from "@/api/article_sku/types"
import { useRoute, useRouter } from "vue-router"
import imageGallery from "@/components/custom/image-gallery.vue"
import operateGroup from "@/components/custom/operate-group.vue"
import operateShop from "@/components/custom/shop/operate.vue"
import attachShow from "@/components/custom/attach/show.vue"

const props = defineProps<{
  article: IArticle
}>()

// 定义一个响应式对象来存储规格选项的选择情况
const currentSku = ref<IArticleSku>({
  id: "",
  channel: "",
  article_uuid: "",
  title: "",
  sub_title: "",
  cover: "",
  qucik_code: "",
  cost_price: 0,
  market_price: 0,
  sale_price: 0,
  is_discount: 0,
  is_activity: 0
})

const route = useRoute()
const router = useRouter()
const rects = ref<any[]>([])
// 处理规格选项的选择
const handleOptionSelect = (item: any) => {
  currentSku.value = item
  const newQuery = {
    ...route.query,
    sku: item.id
  }
  router.push({
    path: route.path,
    query: newQuery
  })
}
const initial = () => {
  const skuId = route.query.sku as string
  if (props.article.skus?.total && props.article.skus?.total > 0) {
    if (skuId) {
      currentSku.value = props.article.skus?.list.find((item: any) => item.id === skuId)
    }
  }
}

const handleLabsLoaded = (_rects: any[]) => {
  rects.value = _rects
}

const operate = (action: string) => {
  console.log("operate", action)
}

//onUpdated(initial)
onMounted(initial)
</script>
