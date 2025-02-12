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
      name="catalog"
      editor-name="catalogEditor"
      title="分类"
      @on-initialize="handleInitialize"
    >
      <el-tabs>
        <el-tab-pane label="基础信息">
          <el-form ref="form" :model="formModel" :rules="rules" label-width="100px" label-position="left">
            <el-form-item label="父级">
              <el-cascader
                :key="cascaderValue.length"
                v-model="cascaderValue"
                ref="cascaderRef"
                @change="onCascaderChange"
                :props="props"
                clearable
                filterable
              />
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入频道名称（仅支持英文）" />
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="formModel.title" placeholder="请输入频道标题" />
            </el-form-item>
            <el-form-item label="图标" prop="cover">
              <img v-if="formModel.cover" :src="formModel.cover" width="100px" height="100px" />
              <div style="width: 100%; margin-top: 1rem; display: flex">
                <el-upload :show-file-list="false" :auto-upload="false" :on-change="onChange">
                  <div style="display: flex; align-items: center">
                    <span>点击上传</span>
                    <el-icon>
                      <Upload />
                    </el-icon>
                  </div>
                </el-upload>
                <el-button style="margin-left: 2rem" type="primary" link size="default" @click="useUrlImage"
                  >使用网络图片</el-button
                >
              </div>
            </el-form-item>
            <el-form-item label="排序" prop="display_order">
              <el-input-number v-model="formModel.display_order" :min="1" :max="1000" />
            </el-form-item>
            <el-form-item label="属性">
              <el-select v-model="formModel.attributes" multiple placeholder="" clearable filterable>
                <el-option v-for="item in attributes" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
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
import { Catalog } from "@/api/catalog/types"
import { ElMessageBox, FormRules } from "element-plus"
import type { CascaderProps } from "element-plus"
import { getNodes } from "@/api/catalog"
import { Upload } from "@element-plus/icons-vue"
import { request } from "@/utils/service"
import { getAll as getAttributes } from "@/api/attribute"
import { Attribute } from "@/api/attribute/types"
import { IResponse } from "@/api/types"
const formModel = reactive<Catalog>({
  id: 0,
  name: "",
  title: "",
  cover: "",
  parent_id: null,
  sketch: "",
  keywords: "",
  path_id: "",
  path_title: "",
  deep: 0,
  attributes: [],
  display_order: 0
})

const editLayoutRef = ref<any>({})
const cascaderRef = ref<any>({})
const cascaderValue = ref<any[]>([])
const parent_id = ref<number | null>(null)
const attributes = ref<Attribute[]>([])

const rules = reactive<FormRules<Catalog>>({
  name: [
    { required: true, message: "请输入分类的名称", trigger: "blur" },
    { min: 2, max: 32, message: "分类名称2-32个小写英文字符", trigger: "blur" },
    {
      pattern: /^[a-z]+$/,
      message: "分类名称只能包含小写英文字母",
      trigger: "blur"
    }
  ],
  title: [
    { required: true, message: "请输入分类的标题", trigger: "blur" },
    { min: 1, max: 16, message: "标题的长度在1-8个字符之间", trigger: "blur" }
  ]
})

const handleInitialize = async (model: any) => {
  Object.keys(model).forEach((key) => {
    if (key in formModel && typeof model[key] !== "undefined") {
      if (typeof (formModel as any)[key] === "boolean") {
        model[key] = model[key] > 0
      }
    }
  })
  Object.assign(formModel, model)
  cascaderValue.value = formModel.path_id.split(",").map((x) => parseInt(x))
}

const props: CascaderProps = {
  lazy: true,
  checkStrictly: true,
  value: "id",
  label: "title",
  async lazyLoad(node, resolve) {
    parent_id.value = (node.data?.id as number) || null
    const deep = (node.data?.deep as number) + 1
    const { data } = await getNodes(parent_id.value, deep)
    // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
    resolve((data as any).childrens)
  }
}

const onCascaderChange = () => {
  formModel.parent_id = cascaderValue.value[cascaderValue.value.length - 1]
  formModel.path_id = cascaderRef.value
    .getCheckedNodes()
    .map((item: any) => {
      return (item.data.path_id ? item.data.path_id + "," : "") + item.data.id
    })
    .join(",")
  formModel.path_title = cascaderRef.value
    .getCheckedNodes()
    .map((item: any) => {
      return (item.data.path_title ? item.data.path_title + "," : "") + item.data.title
    })
    .join(",")
  formModel.deep = cascaderValue.value.length
}

const onChange = (file: any) => {
  const isImage = file.raw.type.indexOf("image") !== -1
  const isLt = file.raw.size / 1024 < 100
  if (!isImage) {
    ElMessage.error("请上传图片格式文件!")
  }
  if (!isLt) {
    ElMessage.error("图标文件大小不能超过 100KB!")
  }
  if (isImage && isLt) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file.raw)
    fileReader.onload = () => {
      formModel.cover = fileReader.result as string
    }
    fileReader.onerror = (error) => {
      console.log(error)
    }
  }
}

const useUrlImage = () => {
  ElMessageBox.prompt("请输入一个有效访问的图片地址", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputPattern: /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/,
    inputErrorMessage: "错误的图片地址"
  }).then(async ({ value }) => {
    request<IResponse<string>>({
      url: "file/htb",
      method: "post",
      data: {
        link: value
      }
    }).then((res: { data: string }) => {
      formModel.cover = res.data
    })
  })
}

onMounted(async () => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })

  getAttributes()
    .then(({ data }: { data: Attribute[] }) => {
      attributes.value = data
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>
ss
