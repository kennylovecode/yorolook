<style lang="scss" scoped>
</style>
<template>
  <div class="app-container">
    <edit-layout
      ref="editLayoutRef"
      name="user"
      title="用户"
      @on-initialize="handleInitialize"
    >
      <el-tabs>
        <el-tab-pane label="基础信息">
          <el-form ref="form" :model="formModel" :rules="rules">
            <el-form-item label="身份" prop="mobile">
              <yl-type-cascader :child="true" />
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="formModel.username" placeholder="请输入用户名"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="formModel.password" placeholder="请输入密码"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="formModel.email" placeholder="请输入电子邮箱"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="formModel.mobile" placeholder="请输入手机号"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item label="微信" prop="wechat">
                  <el-input v-model="formModel.wechat" placeholder="请输入微信账户" clearable ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item label="余额" prop="amount">
                  <el-input-number v-model="formModel.amount" :controls="false" placeholder="请输入账户余额" :precision="2" />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item label="消费" prop="consum">
                  <el-input-number v-model="formModel.consum" :controls="false" placeholder="请输入账户消费额" :precision="2" />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item label="积分" prop="point">
                  <el-input-number v-model="formModel.point" :controls="false" placeholder="请输入账户积分" :precision="2" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="分销账户" prop="is_distribution">
              <el-switch
                v-model="formModel.is_distribution"
                inline-prompt
                active-text="是"
                inactive-text="否"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="分销备注" prop="distribution_remark">
              <el-input
                v-model="formModel.distribution_remark"
                type="textarea"
                placeholder="请输入该账户的分销形式及其他备注"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="formModel.status" size="large">
                <el-radio-button label="正常" :value="0" />
                <el-radio-button label="禁用" :value="1" />
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-button plain type="primary" size="default" @click="">个人信息</el-button>
          <el-button plain type="primary" size="default" @click="">供应商信息</el-button>
          <el-button plain type="primary" size="default" @click="">企业信息</el-button>
          <el-button plain type="primary" size="default" @click="">用户设置</el-button>
          <el-button plain type="primary" size="default" @click="">隐私设置</el-button>
        </el-tab-pane>
      </el-tabs>
    </edit-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue"
import editLayout from "@/components/manage/editLayout.vue"
import { FormRules } from "element-plus"
import { CreateAccount } from "@/api/user/types"
import { getTypes } from "@/api/type"
import ylTypeCascader from "@/components/custom/type-cascader.vue"

const formModel = reactive<CreateAccount>({
  manage: 0,
  username: "",
  password: "",
  mobile: "",
  email: "",
  wechat:"",
  type_id: 0,
  rename: 0,
  ip:"127.0.0.1",
  amount: 0,
  point: 0,
  consum: 0,
  is_distribution: 0,
  distribution_remark: "",
  status:0,
  preference: {
    layoutMode: "top",
    showSettings: true,
    showTagsView: true,
    fixedHeader: true,
    showFooter: true,
    showLogo: true,
    showNotify: true,
    showThemeSwitch: true,
    showScreenfull: true,
    showSearchMenu: true,
    cacheTagsView: false,
    showWatermark: false,
    showGreyMode: false,
    showColorWeakness: false,
    pageCount: 0
  },
  privacy: {
    openPage: true,
    openFollow: true,
    openPlatform: false,
    openProfile: false,
    showMobile: false,
    showEmail: false,
    showAddress: false,
    showBirthday: false,
    showCountry: false,
    showDescription: false,
    showWebsite: false,
    showFavorite: true,
    showFollowing: true,
    showFollower: true,
    showGallery: true,
    showBrand: false,
    showPublish: false
  }
})

const editLayoutRef = ref<any>({})
const cascaderRef = ref<any>({})
const cascaderValue = ref<any[]>([])
const rules = reactive<FormRules<CreateAccount>>({

})
const options = ['Delicacy', 'Desserts&Drinks', 'Fresh foods', 'Supermarket']

const handleInitialize = async (model: any) => {
  Object.assign(formModel,model)
}

onMounted(async () => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })
})
</script>
