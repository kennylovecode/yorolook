<style lang="scss" scoped></style>
<template>
  <div class="app-container">
    <edit-layout ref="editLayoutRef" name="supplier" title="供应商" @on-initialize="handleInitialize">
      <el-tabs>
        <el-tab-pane label="基础信息">
          <el-form ref="form" :model="formModel" :rules="rules" />
        </el-tab-pane>
      </el-tabs>
    </edit-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue"
import editLayout from "@/components/manage/editLayout.vue"
import { FormRules } from "element-plus"

const formModel = reactive<any>({
  id: "",
  title: "",
  account_uuid: "",
  country: "",
  province: "",
  city: "",
  address: "",
  postcode: "",
  contacts: [],
  banks: [],
  domain: "",
  logo: "",
  banners: [],
  certificate: "",
  face_tax_point: 0,
  real_tax_point: 0,
  discount: 0,
  discount_remark: "",
  other_message: [],
  display_order: 0
})

const editLayoutRef = ref<any>({})
const rules = reactive<FormRules<any>>({})

const handleInitialize = async () => {}

onMounted(async () => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })
})
</script>
