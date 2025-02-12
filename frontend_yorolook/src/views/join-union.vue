<style lang="scss" scoped>
.join-wrapper {
  // background: linear-gradient(to bottom, rgba(253, 184, 246, 0.1), rgb(251, 251, 251));
  > div {
    padding: 30px 0;
    margin: 0 auto;
    max-width: var(--max-width);
    &.vip {
      .title {
        p {
          margin: 2rem 0;
          width: 100%;
          text-align: center;
          font-size: 1.6rem;
          font-weight: bold;
          &:first-child {
            font-size: 1.5rem;
            color: var(--el-color-danger);
          }
        }
      }

      .bg-box {
        position: relative;
        .header {
          border-radius: 16px;
          position: absolute;
          height: 200px;
          width: 100%;
          background: linear-gradient(92deg, #574747 3.22%, #161111 99.01%), hsla(26, 76%, 68%, 0.36);
          box-shadow:
            0 0 1px 0 rgba(28, 31, 35, 0.16),
            0 6px 32px 4px rgba(28, 31, 35, 0.08);
          .title {
            color: #ffe1c9;
            font-size: 24px;
            font-weight: 500;
            margin-right: 8px;
            position: absolute;
            top: 36px;
            left: 30px;
            display: flex;
            align-items: center;
            .tips {
              color: hsla(26, 75%, 85%, 0.6);
              font-size: 16px;
              padding-left: 30px;
              margin-left: 30px;
              border-left: solid 1px hsla(26, 75%, 85%, 0.6);
            }
          }
        }
        .list {
          background: transparent;
          width: 96%;
          margin: 0 auto;
          padding-top: 100px;
        }

        &.reason {
          margin-top: 60px;
          .list:last-child {
            padding: 30px 0;
          }
        }
      }
    }

    &.supplier {
      padding-top: 76px;
      .title {
        p {
          margin: 0;
          font-size: 3rem;
          color: var(--el-color-warning);
          font-weight: 600;
          span {
            color: var(--el-text-color-primary);
            font-weight: 300;
          }
        }
        .fair {
          display: flex;
          width: 100%;
          margin-top: 24px;
          margin-bottom: 48px;
          font-size: 14px;
          color: var(--el-color-primary);
          > div {
            height: 24px;
            line-height: 24px;
            display: flex;
            margin-right: 24px;
            .el-icon {
              width: 20px;
              height: 24px;
              color: var(--el-text-color-primary);
            }
          }
        }
      }

      .bg-box {
        position: relative;
        .header {
          border-radius: 16px;
          position: absolute;
          height: 200px;
          width: 100%;
          background: linear-gradient(92deg, #574747 3.22%, #161111 99.01%), hsla(26, 76%, 68%, 0.36);
          box-shadow:
            0 0 1px 0 rgba(28, 31, 35, 0.16),
            0 6px 32px 4px rgba(28, 31, 35, 0.08);
          .title {
            color: #ffe1c9;
            font-size: 24px;
            font-weight: 500;
            margin-right: 8px;
            position: absolute;
            top: 36px;
            left: 30px;
            display: flex;
            align-items: center;
            .tips {
              color: hsla(26, 75%, 85%, 0.6);
              font-size: 16px;
              padding-left: 30px;
              margin-left: 30px;
              border-left: solid 1px hsla(26, 75%, 85%, 0.6);
            }
          }
        }
        .list {
          background: transparent;
          width: 96%;
          margin: 0 auto;
          padding-top: 100px;
        }
      }
    }
    .list {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      .item {
        position: relative;
        flex-shrink: 1;
        flex-grow: 1;
        flex-basis: 0;
        background-color: var(--el-bg-color);
        border-radius: 12px;
        padding: 30px 24px;
        overflow: hidden;
        box-shadow: var(--el-box-shadow);
        margin-left: 24px;

        &.span12 {
          width: 50%;
        }

        &:first-child {
          margin-left: 0;
        }

        .active-tag {
          position: absolute;
          top: 0;
          right: 0;
          padding: 8px;
          background-color: var(--el-color-danger);
          color: var(--el-color-white);
          font-size: 14px;
        }
        .type {
          font-weight: bold;
          font-size: 1.2rem;
          line-height: 2.6rem;
          display: flex;
          .icon {
            margin-right: 10px;
          }
        }
        .wrap {
          color: var(--el-text-color-secondary);
          font-size: 0.6rem;
          line-height: 20px;
        }
        .upgrade-condition {
          display: flex;
          flex-wrap: wrap;
          padding: 16px 0;
          .price {
            width: 100%;
            display: flex;
            line-height: 1.55;
            font-size: 14px;
            font-weight: bold;
            .text {
              margin-right: 5px;
            }
          }
        }

        .benefit {
          padding: 0;
          margin: 20px 0 0;
          list-style: none;
          font-size: 12px;
          li {
            display: flex;
            color: var(--el-text-color-secondary);
            line-height: 2;
            justify-content: flex-start;
            > span {
              width: 40px;
              display: block;
              color: var(--el-color-primary);
            }
            > div {
              width: calc(100% - 41px);
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="join-wrapper" :key="currentRequest">
    <div :key="currentRequest" v-if="currentRequest === 'vip'" class="vip">
      <div class="title">
        <p><span>YOROLOOK</span> 让灵感创作一站式快速落地</p>
        <p>加入YOROLOOK平台会员，共享设计数字化云资产</p>
      </div>
      <div class="bg-box">
        <div class="header">
          <div class="title">
            平台VIP会员权益介绍
            <div class="tips" />
          </div>
        </div>
        <div class="list">
          <div class="item">
            <div class="type">普通用户</div>
            <div class="wrap">
              <div class="text">平台登记注册的用户</div>
            </div>
            <div class="upgrade-condition">
              <div class="price">
                <div class="text">免费注册使用~</div>
              </div>
            </div>
            <ul class="benefit">
              <li>主体：个人</li>
              <li>范围：有限查看</li>
              <li>折扣：无</li>
              <li>素材：部分免费</li>
              <li>客服：不支持</li>
            </ul>
          </div>
          <div class="item">
            <div class="active-tag">
              <span class="sc" />
              限时活动
            </div>
            <div class="type">个人普通用户VIP</div>
            <div class="wrap">
              <div class="text">适合个人优惠采购，空间搭配学习~</div>
            </div>
            <div class="upgrade-condition">
              <div class="price">
                <div class="text">98元直购VIP，附赠2分产品~</div>
              </div>
              <div class="price point">
                <div class="text"><a href="#">使用10积分兑换~</a></div>
              </div>
              <div class="price point">
                <div class="text"><a href="#">购买2分产品，赠送个人VIP~</a></div>
              </div>
            </div>
            <el-button type="danger" size="default">立即升级</el-button>
            <ul class="benefit">
              <li>
                <span>主体：</span>
                <div>个人普通用户</div>
              </li>
              <li>
                <span>范围：</span>
                <div>采购优惠</div>
              </li>
              <li>
                <span>折扣：</span>
                <div>7折（部分特价商品除外）</div>
              </li>
              <li>
                <span>素材：</span>
                <div>所有素材区内容可无限制查看</div>
              </li>
              <li>
                <span>分享：</span>
                <div>首单分享即刻返现30%</div>
              </li>
              <li>
                <span>拉新：</span>
                <div>分享拉新用户注册即可获得2积分</div>
              </li>
              <li>
                <span>直推：</span>
                <div>分享达成交易，奖励交易额10%</div>
              </li>
            </ul>
          </div>
          <div class="item">
            <div class="active-tag">
              <span class="sc" />
              限时活动
            </div>
            <div class="type">个人专业用户VIP</div>
            <div class="wrap">
              <div class="text">适合软装行业专业个人用户，加速采购与设计落地~</div>
            </div>
            <div class="upgrade-condition">
              <div class="price">
                <div class="text">258元直购VIP，附赠5分产品~</div>
              </div>
              <div class="price point">
                <div class="text"><a href="#">使用50积分兑换~</a></div>
              </div>
              <div class="price point">
                <div class="text"><a href="#">购买5分以上产品，赠专业VIP~</a></div>
              </div>
            </div>
            <el-button type="danger" size="default">立即升级</el-button>
            <ul class="benefit">
              <li>
                <span>主体：</span>
                <div>专业用户（需审核）</div>
              </li>
              <li>
                <span>范围：</span>
                <div>采购优惠、专业用户中心</div>
              </li>
              <li>
                <span>折扣：</span>
                <div>6折（部分特价商品除外）</div>
              </li>
              <li>
                <span>素材：</span>
                <div>所有素材区内容可无限制查看</div>
              </li>
              <li>
                <span>分享：</span>
                <div>首单分享即刻返现40%</div>
              </li>
              <li>
                <span>拉新：</span>
                <div>分享拉新用户注册即可获得3积分</div>
              </li>
              <li>
                <span>直推：</span>
                <div>分享达成交易，奖励交易额20%</div>
              </li>
              <li>
                <span>伞下：</span>
                <div>伞下成员购买产品金额的10%奖励</div>
              </li>
              <li>
                <span>存储：</span>
                <div>20GB</div>
              </li>
              <li>
                <span>图册：</span>
                <div>作品图册限制20个</div>
              </li>
              <li>
                <span>下载：</span>
                <div>所有资源免费 10次/天</div>
              </li>
            </ul>
          </div>
          <div class="item">
            <div class="active-tag">
              <span class="sc" />
              限时活动
            </div>
            <div class="type">企业全站VIP</div>
            <div class="wrap">
              <div class="text">适合中小企业、设计工作室、设计团队~</div>
            </div>
            <div class="upgrade-condition">
              <div class="price">
                <div class="text">98元直购VIP，附赠2分产品~</div>
              </div>
              <div class="price point">
                <div class="text"><a href="#">使用10积分兑换~</a></div>
              </div>
              <div class="price point">
                <div class="text"><a href="#">购买2分产品，赠送个人VIP~</a></div>
              </div>
            </div>
            <el-button type="danger" size="default">立即升级</el-button>
            <ul class="benefit">
              <li>
                <span>主体：</span>
                <div>企业用户（需审核）</div>
              </li>
              <li>
                <span>范围：</span>
                <div>采购优惠、专业用户中心、全站直通</div>
              </li>
              <li>
                <span>折扣：</span>
                <div>5折（部分特价商品除外）</div>
              </li>
              <li>
                <span>素材：</span>
                <div>所有素材区内容可无限制查看</div>
              </li>
              <li>
                <span>分享：</span>
                <div>首单分享即刻返现50%</div>
              </li>
              <li>
                <span>拉新：</span>
                <div>分享拉新用户注册即可获得5积分</div>
              </li>
              <li>
                <span>直推：</span>
                <div>分享达成交易，奖励交易额40%</div>
              </li>
              <li>
                <span>伞下：</span>
                <div>伞下成员购买产品金额的25%奖励</div>
              </li>
              <li>
                <span>存储：</span>
                <div>200GB</div>
              </li>
              <li>
                <span>图册：</span>
                <div>企业共享图册无限制</div>
              </li>
              <li>
                <span>赠送：</span>
                <div>10位专业用户VIP绑定特权</div>
              </li>
              <li>
                <span>下载：</span>
                <div>所有资源免费 60次/天</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-box reason">
        <div class="header">
          <div class="title">
            推荐选择使用YOROLOOK平台的理由
            <div class="tips" />
          </div>
        </div>
        <div class="list">
          <div class="item">
            <div class="type">
              <div class="icon">icon</div>
              <div class="title">真低价</div>
            </div>
            <ul class="benefit">
              <li>
                <div class="dot">拒绝各种复杂的套餐，做真正能帮助设计师的软装素材库，优品供应链库</div>
              </li>
              <li>
                <div class="dot">平台所有可下载图片，3D模型，PPT方案，CAD图纸，产品资料及其它文件均有授权</div>
              </li>
              <li>
                <div class="dot">所有产品均为供应商上架直供，无其它额外费用，由平台方进行运营服务</div>
              </li>
              <li>
                <div class="dot">所有产品价格透明可查，真正做到全网最低价~</div>
              </li>
            </ul>
          </div>
          <div class="item">
            <div class="type">
              <div class="icon">icon</div>
              <div class="text">更懂设计师</div>
            </div>
            <ul class="benefit">
              <li><div class="dot">每天数千万次灵感搜索，让YOROLOOK素材更清楚设计师想要什么</div></li>
              <li>
                <div class="dot">10万+空间场景，来自上千个实战项目的设计沉淀，满足全场景应用</div>
              </li>
              <li>
                <div class="dot">提供PPT、CAD、3D模型、高清图、免抠产品图等各种文件，让设计产出更快更省力</div>
              </li>
              <li>
                <div class="dot">在线的AI工具，让设计师的灵感充分扩展，线性发散的全场景自动化生成灵感</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="list">
          <div class="item">
            <div class="type">
              <div class="icon">icon</div>
              <div class="title">更方便</div>
            </div>
            <ul class="benefit">
              <li>
                <div class="dot">全站内容开放以图搜图功能，更快定位素材产品~</div>
              </li>
            </ul>
          </div>
          <div class="item">
            <div class="type">
              <div class="icon">icon</div>
              <div class="text">更丰富</div>
            </div>
            <ul class="benefit">
              <li>
                <div class="dot">平台提供个人独立主页、独立设计图册、个人素材发布，让设计师拥有自己设计IP的能力~</div>
              </li>
            </ul>
          </div>
          <div class="item">
            <div class="type">
              <div class="icon">icon</div>
              <div class="text">更高效</div>
            </div>
            <ul class="benefit">
              <li>
                <div class="dot">素材区场景中的单品应用全部数字化，可一键链接下单</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <joinForm :key="currentRequest" v-if="currentRequest === 'supplier'"/>
    <companyForm :key="currentRequest" v-if="currentRequest === 'company'"/>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router"
import joinForm from "./supplier/join-form.vue"
import companyForm from "./company/join-form.vue";
import { Select } from "@element-plus/icons-vue"
import { useUserStore } from "@/store/modules/user";
import { computed, onMounted, ref, watch } from "vue";
import { AccountTypeRequest } from "@/api/user/types";

const route = useRoute()

const { accountInfo } = useUserStore()
const currentRequest = ref<string>('')

const type = computed(()=>{
  return route.query.t as string
})

onMounted(()=>{
  currentRequest.value = route.query.t as string
})


watch(type,()=>{
  currentRequest.value = type.value
})
</script>
