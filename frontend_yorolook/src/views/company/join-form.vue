<style lang="scss" scoped>
.request-form {
  margin: 7rem auto;
  border-radius: 24px;
  padding: 0 24px;
  width: 779px;
  min-height: 434px;
  display: flex;
  flex-wrap: wrap;
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow);

  .title {
    color: var(--el-color-text-primary);
    font-size: 16px;
    font-weight: 600;
    text-wrap: nowrap;
  }

  .left-box {
    padding: 24px 24px 20px 0;
    height: 100%;
    width: 209px;
    display: flex;
    flex-direction: column;
    padding-top: 70px;

    > div {
      text-align: left;
    }
    .service {
      text-align: center;
    }
    .qrcode {
      margin: 20px auto 0;
      width: 160px;
      height: 160px;

      img {
        width: 100%;
      }
    }

    .info {
      margin-top: 12px;
    }

    .status {
      margin-top: 4rem;

      font-size: 12px;
      > div {
        height: 26px;
        line-height: 26px;
      }

      .progress {
        span {
          display: block;
          font-weight: bold;
          &.normal {
            color: var(--el-text-color-secondary);
          }

          &.reject {
            color: var(--el-color-danger);
          }

          &.pass {
            color: var(--el-color-primary);
          }
        }
      }
    }

    .reject-reason {
      margin-top: 20px;
      background-color: #f5f5f5;
      border-radius: 5px;
      padding: 16px;
      color: var(--el-color-danger);
      font-size: 12px;
      .label {
        padding-bottom: 8px;
        border-bottom: solid 1px var(--el-text-color-secondary);
      }
      .text {
        margin-top: 8px;
      }
    }
  }

  .right-box {
    width: calc(100% - 209px);
    padding: 24px 0 24px 24px;
    text-align: center;
    border-left: 1px solid var(--el-text-color-disabled);
    padding-top: 70px;

    :deep(.el-form) {
      margin-top: 32px;

      .el-form-item {
        margin-bottom: 30px;

        .el-form-item__error {
          width: 100%;
          padding: 8px 0;
          text-align: left;
        }
      }
    }

    .upload-box {
      padding: 10px;
      width: 410px;
      height: 200px;
      background: #f5f5f5;
      display: flex;
      img {
        width: 200px;
        margin-right: 10px;
      }
    }
  }
}

.supplier {
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
      height: 390px;
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
</style>
<template>
  <div v-if="systemError" class="error">
    <el-empty description="系统身份配置出错，请联系管理员处理..." />
  </div>
  <div v-else class="supplier">
    <div class="title">
      <p><span>YOROLOOK</span> 限时免费成为企业VIP会员</p>
      <div class="fair">
        <div>
          <el-icon><Select /></el-icon>
          <div class="text">共享平台精准私域流量池</div>
        </div>
        <div>
          <el-icon><Select /></el-icon>
          <div class="text">高度自由的平台化管理</div>
        </div>
        <div>
          <el-icon><Select /></el-icon>
          <div class="text">享受平台数字化技术支持</div>
        </div>
      </div>
    </div>
    <div class="bg-box">
      <div class="header">
        <div class="title">
          企业VIP会员权益说明
          <div class="tips" />
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div class="type">企业私有主页</div>
          <div class="wrap">
            <div class="text">数字化企业品牌，独立的企业站点主页~</div>
          </div>
          <ul class="benefit">
            <li>
              <span>Logo：</span>
              <div>可自由修改</div>
            </li>
            <li>
              <span>横幅：</span>
              <div>可自由修改</div>
            </li>
            <li>
              <span>分享：</span>
              <div>分享主页到用户端完全与平台脱离</div>
            </li>
            <li>
              <span>权限：</span>
              <div>自由选择是否在平台中展示</div>
            </li>
          </ul>
        </div>
        <div class="item">
          <div class="type">私有化产品库</div>
          <div class="wrap">
            <div class="text">与平台产品完全隔离，自由选择开放权限~</div>
          </div>
          <ul class="benefit">
            <li>
              <span>发布：</span>
              <div>直接入库到企业产品库</div>
            </li>
            <li>
              <span>权限：</span>
              <div>自由选择是否对外开放</div>
            </li>
            <li>
              <span>折扣：</span>
              <div>自定义平台销售折扣</div>
            </li>
            <li>
              <span>模型：</span>
              <div>产品模型自由上传关联管理</div>
            </li>
          </ul>
        </div>
        <div class="item">
          <div class="type">前期平台支持</div>
          <div class="wrap">
            <div class="text">平台为了快速发展，提供限时支持~</div>
          </div>
          <ul class="benefit">
            <li>
              <span>内容：</span>
              <div>专人负责帮助上传</div>
            </li>
            <li>
              <span>技术：</span>
              <div>专人负责图片的技术处理</div>
            </li>
            <li>
              <span>客服：</span>
              <div>专人负责服务前端客户</div>
            </li>
            <li>
              <span>订单：</span>
              <div>专人负责对接订单处理</div>
            </li>
          </ul>
        </div>
        <div class="item">
          <div class="type">后期平台支持</div>
          <div class="wrap">
            <div class="text">未来我们会做的一些事~</div>
          </div>
          <ul class="benefit">
            <li>
              <span>微信：</span>
              <div>平台将开发小程序版，您将拥有私有化版本</div>
            </li>
            <li>
              <span>技术：</span>
              <div>专人负责图片的技术处理</div>
            </li>
            <li>
              <span>客服：</span>
              <div>专人负责服务前端客户</div>
            </li>
            <li>
              <span>订单：</span>
              <div>专人负责对接订单处理</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :key="requestForm.id" class="request-form">
      <div class="left-box">
        <div class="service">
          <div class="title">添加微信，立即线上沟通</div>
          <div class="qrcode">
            <img :src="`/service.qrcode.png`" alt="二维码" />
          </div>
          <div class="info">扫码添加专属顾问</div>
        </div>
        <div class="status">
          <div class="label">您的当前申请状态为：</div>
          <div v-if="requestForm.id" class="progress">
            <span class="normal" v-if="requestForm.status === 0">审核中</span>
            <span class="reject" v-if="requestForm.status > 0 && requestForm.status < 255">审核失败</span>
            <span class="pass" v-if="requestForm.status === 255">已通过</span>
            <span v-if="requestForm.updated_at">提交于 {{ requestForm.updated_at }}</span>
          </div>
          <div v-else class="progress">未提交申请信息</div>
        </div>
        <div class="reject-reason" v-if="requestForm.status > 0 && requestForm.status < 255">
          <div class="label">失败原因：</div>
          <div class="text">{{ requestForm.reason || "管理员未填写审核失败的原因" }}，您可以提交审核信息重试...</div>
        </div>
      </div>
      <div class="right-box">
        <div>
          <div class="title">填写申请信息，我们将在1～2个工作日联系您并审核</div>
          <el-form
            ref="formRef"
            :model="requestForm"
            label-position="top"
            :rules="rules"
            require-asterisk-position="right"
          >
            <el-form-item label="营业执照上传" prop="images">
              <div class="upload-box">
                <img :src="requestForm.images[0] ? `/disk/view?id=${requestForm.images[0]}&w=400` : ''" />
                <single-upload ratio="1/1" :success="uploadSuccess" :auto="true" :size="[0, 0]" title="" />
              </div>
            </el-form-item>
            <el-form-item label="公司名称" prop="company_name">
              <el-input v-model="requestForm.company_name" placeholder="请完整输入您的注册公司全称" clearable />
            </el-form-item>
            <el-form-item label="公司地址" prop="company_address">
              <el-input v-model="requestForm.company_address" placeholder="请输入您的公司详细地址" clearable />
            </el-form-item>
            <el-form-item label="联系人" prop="contact_name">
              <el-input v-model="requestForm.contact_name" placeholder="请输入联系人的真实姓名" clearable />
            </el-form-item>
            <el-form-item label="联系人电话" prop="contact_mobile">
              <el-input
                v-model="requestForm.contact_mobile"
                placeholder="请务必填写真实有效接通的电话号码，以便沟通..."
                clearable
              />
            </el-form-item>
            <el-form-item label="联系人职位/身份（选填）">
              <el-input v-model="requestForm.position" placeholder="如果方便请告知联系人的职位或身份.." clearable />
            </el-form-item>
            <el-form-item label="申请备注（选填）">
              <el-input
                type="textarea"
                :row="4"
                v-model="requestForm.remark"
                placeholder="如有一些特殊信息可通过此处告知.."
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" type="primary" size="default" @click="submitForm(formRef)">
                {{ requestForm.id ? "修改申请" : "提交申请" }}
              </el-button>
            </el-form-item>
            <div class="line">
              限时免费成为
              <span style="text-decoration: underline; font-weight: bold">YOROLOOK供应链种子用户</span>，享受平台云服务
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAccountType, myRequestAccountType, requestAccountType } from "@/api/user"
import { AccountTypeRequest } from "@/api/user/types"
import { useUserStore } from "@/store/modules/user"
import { ElMessageBox, FormInstance } from "element-plus"
import { onMounted, reactive, ref } from "vue"
import singleUpload from "@/components/custom/single-upload.vue"

const systemError = ref<boolean>(false)
const formRef = ref()
const { accountInfo } = useUserStore()
const requestForm = reactive<AccountTypeRequest>({
  id: "",
  account_uuid: accountInfo.id,
  to_type_id:  3,
  contact_name: "",
  contact_mobile: "",
  contact_wechat: "",
  company_name: "",
  company_address: "",
  position: "",
  remark: "",
  status: 0,
  reason: "",
  images: []
})

const rules = {
  images: [
    {
      required: true,
      message: "请上传贵司的营业执照或其他证件",
      trigger: "blur"
    }
  ],
  company_name: [
    {
      required: true,
      message: "请完整输入您的公司名称",
      trigger: "blur"
    }
  ],
  company_address: [
    {
      required: true,
      message: "请输入您公司旗下的品牌",
      trigger: "blur"
    }
  ],
  contact_name: [
    {
      required: true,
      message: "请输入联系人的真实姓名",
      trigger: "blur"
    }
  ],
  contact_mobile: [
    {
      required: true,
      message: "请务必填写真实有效接通的电话号码，以便沟通...",
      trigger: "blur"
    }
  ]
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (valid) {
      requestAccountType(requestForm)
        .then((result) => {
          ElMessageBox.alert("您的申请信息已成功提交, 等待管理员审核，在此期间您可以修改您的申请信息直至审核通过...", {
            showConfirmButton: true,
            confirmButtonText: "知道了",
            showCancelButton: false
          })
          Object.assign(requestForm, result.data)
        })
        .catch((err) => {
          ElMessage.success(err)
        })
    } else {
      console.log("validate error...")
    }
  })
}

const uploadSuccess = (response: any) => {
  requestForm.images = [response.id]
}

onMounted(() => {
  getAccountType(requestForm.to_type_id)
    .then((res) => {
      systemError.value = res.code <= 0 || !res.data
    })
    .catch(() => {
      systemError.value = true
    })

  myRequestAccountType().then((result) => {
    if (result.data?.length > 0) {
      const model = result.data.find((x) => x.to_type_id === requestForm.to_type_id)
      if (model) {
        Object.assign(requestForm, model)
      }
    }
  })
})
</script>
