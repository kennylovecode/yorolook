<style lang="scss" scoped>
.channel-container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
}
:deep(.el-form) {
  .el-form-item__error {
    padding: 8px 0;
    position: unset;
    top: unset;
    left: unset;
  }
}
</style>
<template>
  <div class="channel-container">
    <edit-layout
      ref="editLayoutRef"
      name="type_rank"
      editor-name="typeRankEditor"
      title="身份等级"
      @on-initialize="handleInitialize"
    >
      <el-tabs>
        <el-tab-pane label="基础信息">
          <el-form ref="form" :model="formModel" :rules="rules" label-width="100px" label-position="left">
            <el-form-item label="父级">
              <yl-type-cascader :key="formModel.id" :default="[`${formModel.type_id}`]" />
            </el-form-item>
            <el-form-item label="等级名称" prop="title">
              <el-input v-model="formModel.title" placeholder="请输入等级名称" />
            </el-form-item>
            <el-form-item label="享受折扣" prop="title">
              <el-input-number v-model="formModel.discount" :min="50" :max="100">
                <template #suffix>
                  <span>%</span>
                </template>
              </el-input-number>
            </el-form-item>
            <el-form-item label="权重" prop="weight">
              <el-input-number v-model="formModel.weight" :min="1" :max="1000" />
            </el-form-item>
            <el-form-item label="成长值" prop="growth_value">
              <el-input-number v-model="formModel.growth_value" :min="1" />
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <el-input v-model="formModel.icon" placeholder="请输入图标地址" />
            </el-form-item>
            <el-form-item label="排序" prop="display_order">
              <el-input-number v-model="formModel.display_order" :min="1" :max="1000" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formModel.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </edit-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue"
import editLayout from "@/components/manage/editLayout.vue"
import { FormRules } from "element-plus"
import { TypeRank } from "@/api/type/types";
import ylTypeCascader from "@/components/custom/type-cascader.vue"

const formModel = reactive<TypeRank>({
  id: 0,
  type_id: 0,
  title: "",
  discount: 100,
  weight: 0,
  growth_value: 0,
  remark: "",
  icon: "",
  display_order: 0,
  created_at: "",
  updated_at: ""
})

const editLayoutRef = ref<any>({})

const rules = reactive<FormRules<TypeRank>>({
  title: [
    { required: true, message: "请输入分类的标题", trigger: "blur" },
    { min: 2, max: 16, message: "标题的长度在2-16个字符之间", trigger: "blur" }
  ]
})

const handleInitialize = async (model: any) => {
  Object.assign(formModel,model)
}

onMounted(async () => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })
})
</script>
