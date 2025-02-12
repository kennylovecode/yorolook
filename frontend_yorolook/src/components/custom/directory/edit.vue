<style lang="scss" scoped>
.cover {
  display: flex;
  width: 100%;
  margin-top: 1rem;
  flex-wrap: wrap;
  padding: 5px;

  .el-image {
    width: 25%;
    aspect-ratio: 1/1;
    padding: 3px;

    .replace-block {
      background: var(--el-fill-color-light);
      font-size: 10px;
    }
  }
}
</style>
<template>
  <div>
    <edit-layout
      ref="editLayoutRef"
      name="directory"
      title="品牌"
      :before-submit="handleBeforeSubmit"
      :dialog="props.dialog"
      :cb="props.cb"
      @after-submit="handleAfterSubmit"
    >
      <el-form :model="editForm" ref="form" :rules="editFormRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-select
            :max-collapse-tags="6"
            v-model="keywordsArray"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="输入文件夹的关键词"
            @change="keywordsArrayChange"
          />
        </el-form-item>
        <el-form-item>
          <multiple-upload view-size="60px" :limit="4" :size="[300, 300]" title="封面图片" ref="coverUploadRef" />
        </el-form-item>
        <el-form-item label="基础设置">
          <el-checkbox
            :true-value="1"
            :false-value="0"
            :label="editForm.owner_recommend"
            v-model="editForm.owner_recommend"
          >
            推荐
          </el-checkbox>
        </el-form-item>
        <el-form-item label="登录限制">
          <el-checkbox :true-value="1" :false-value="0" :label="editForm.login_limit" v-model="editForm.login_limit">
            需登录查看
          </el-checkbox>
        </el-form-item>
        <el-form-item label="身份限制">
          <div>
            <type-cascader :default="editForm.type_id_limit" :child="false" />
            <span style="margin-left: 0.3rem">可查看</span>
          </div>
        </el-form-item>
        <el-form-item label="付费查看">
          <el-input v-model="editForm.point_payment_limit" style="width: 160px" placeholder="请输入付费值">
            <template #append>积分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="隐私设置">
          <el-select v-model="editForm.status" clearable filterable @change="">
            <el-option label="全平台可见" :value="0">全平台可见</el-option>
            <el-option label="品牌主页可见" :value="1">品牌主页可见</el-option>
            <el-option label="仅自己可见" :value="2">仅自己可见</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </edit-layout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch, ref } from "vue"
import { FormRules } from "element-plus"
import editLayout from "@/components/manage/editLayout.vue"
import multipleUpload from "@/components/custom/multiple-upload.vue"
import { BaseStruct, Directory } from "@/api/directory/types"
import typeCascader from "@/components/custom/type-cascader.vue"

const props = defineProps<{
  dialog?: boolean
  cb?: Function
  name: string
  id?: string
  item?: BaseStruct & Directory
}>()

const editLayoutRef = ref()
const coverUploadRef = ref()
const keywordsArray = ref<string[]>([])

const editForm = reactive<any>({
  id: "",
  title: "",
  keywords: "",
  covers: "",
  login_limit: 0,
  type_id_limit: [],
  payment_limit: 0,
  owner_recommend: 0,
  layer_tree: ""
})

const editFormRules = reactive<FormRules<Directory>>({
  title: [
    { required: true, message: "请输入目录名称", trigger: "blur" },
    { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
  ]
})

const handleAfterSubmit = () => {}

const handleBeforeSubmit = async () => {
  let error: boolean = false
  const coverIds = await coverUploadRef.value!.submitUpload().catch(() => {
    error = true
  })
  let covers = editForm!.covers ? editForm!.covers.split(",") : []
  covers = covers.concat(coverIds)
  if (covers.length > 4) covers = covers.splice(covers.length - 4, 4)
  if (coverIds && coverIds.length) editForm.covers = covers.join(",")

  //**上传失败不继续后续表单提交逻辑 */
  return !error
}

const keywordsArrayChange = () => {
  editForm.keywords = keywordsArray.value.join(",")
}

onMounted(() => {
  watch(editForm, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })

  if (props.item) Object.assign(editForm, props.item)

  keywordsArray.value = editForm.keywords ? editForm.keywords.split(",") : []
})
</script>
