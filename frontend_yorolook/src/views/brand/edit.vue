<style lang="scss" scoped>
.app-container {
  max-width: var(--max-width);
  margin: 0 auto;
}
</style>

<template>
  <single-upload
    ref="bannerUploadRef"
    ratio="5/1"
    :key="formModel.banners"
    :size="[1400, 280]"
    :src="formModel.banners ? `/disk/view?id=${formModel.banners}&w=1400` : ''"
  >
    <template #footer
      ><media-selector
        :count="1"
        type="file"
        accept="image/*"
        @confirm="
          (selectedList: any[]) => {
            formModel.banners = selectedList.pop().id
          }
        "
    /></template>
  </single-upload>
  <div class="app-container">
    <edit-layout
      :id="props.dialog ? `${props.id}` : (route.query.id as string)"
      ref="editLayoutRef"
      name="brand"
      title="品牌"
      :before-submit="handleBeforeSubmit"
      :dialog="props.dialog"
      @on-initialize="handleInitialize"
      @after-submit="hanldeAfterSubmit"
    >
      <template #default>
        <el-tabs>
          <el-tab-pane label="基础信息">
            <el-form
              ref="ruleFormRef"
              label-position="top"
              :model="formModel"
              label-width="auto"
              :rules="rules"
              :scroll-to-error="true"
            >
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="4">
                  <el-form-item prop="title" label="品牌名称">
                    <el-input v-model="formModel.title" placeholder="输入品牌名称" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="4">
                  <el-form-item prop="sub_title" label="其他别名">
                    <el-input v-model="formModel.sub_title" placeholder="输入品牌别名" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="4">
                  <el-form-item prop="country" label="所在国家">
                    <el-input v-model="formModel.country" placeholder="所在国家" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="4">
                  <el-form-item prop="area" label="所在区域">
                    <el-input v-model="formModel.city" placeholder="所在区域" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="4">
                  <el-form-item prop="website" label="品牌网址">
                    <el-input v-model="formModel.website" placeholder="输入品牌网址" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item prop="catalogs" label-width="100%" label="经营类别">
                <catalog-cascader
                  :key="selectedCatalogs.length"
                  @change="handleSelectedCatalogs"
                  v-if="channelModel.catalogs?.length"
                  :catalogs="channelModel.catalogs"
                  :data="formModel.catalogs || ''"
                />
              </el-form-item>
              <el-form-item prop="description" label="品牌简短介绍">
                <el-input
                  v-model="formModel.description"
                  maxlength="1000"
                  :rows="6"
                  placeholder="描述品牌"
                  show-word-limit
                  type="textarea"
                />
              </el-form-item>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="4">
                  <el-form-item prop="type" label-width="100%">
                    <el-select
                      @change="selectType"
                      v-model="selectedType"
                      :key="brandType.key + formModel.type"
                      multiple
                      filterable
                      :placeholder="brandType.text"
                      :multiple-limit="3"
                    >
                      <el-option
                        v-for="item in brandType?.options"
                        :key="item.key"
                        :label="item.text"
                        :value="item.text"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="4">
                  <el-form-item prop="initial" label-width="100%">
                    <el-select
                      @change="selectInitial"
                      :key="formModel.initial"
                      v-model="selectedInitial"
                      multiple
                      filterable
                      placeholder="选择首字母"
                      :multiple-limit="3"
                    >
                      <el-option
                        v-for="item in 26"
                        :key="String.fromCharCode(64 + item)"
                        :label="String.fromCharCode(64 + item)"
                        :value="String.fromCharCode(64 + item)"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <multiple-upload
                  :key="JSON.stringify(formModel.covers)"
                  :files="formModel.covers"
                  view-size="100px"
                  :limit="4"
                  title="产品图片"
                  ref="coverUploadRef"
                  @on-remove="
                    (v: any[]) => {
                      formModel.covers = v.join(',')
                    }
                  "
                >
                  <template #footer
                    ><media-selector :count="4" type="file" accept="image/*" @confirm="confirmMediaSelected"
                  /></template>
                </multiple-upload>
              </el-form-item>
              <el-form-item>
                <p>选择基础筛选项</p>
                <filter-area
                  name="name"
                  label="title"
                  value="title"
                  :defaults="formModel.attributes as any[]"
                  @on-confirm="onFilterConfirm"
                  @on-change="onFilterConfirm"
                />
              </el-form-item>
              <el-form-item>
                <contact-table
                  :key="formModel.contacts?.length"
                  :data="formModel.contacts || []"
                  @on-change="onContactChanged"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </template>
    </edit-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, shallowReactive } from "vue"
import { Brand, Contact } from "@/api/brand/types"
import { ElMessage, FormRules } from "element-plus"
import editLayout from "@/components/manage/editLayout.vue"
import singleUpload from "@/components/custom/single-upload.vue"
import multipleUpload from "@/components/custom/multiple-upload.vue"
import contactTable from "./components/contactTable.vue"
import filterArea from "@/components/filter/filter-area.vue"
import { Dictionary } from "@/api/dictionary/types"
import { getByKey as getDictByKey } from "@/api/dictionary"
import { getByIds } from "@/api/catalog"
import { getByName as getChannelModel } from "@/api/channel"
import mediaSelector from "@/components/custom/media-selector.vue"
import { useRoute } from "vue-router"

const props = defineProps<{
  id?: number
  dialog?: boolean
}>()

const route = useRoute()

const formModel = reactive<Brand>({
  id: "",
  title: "",
  sub_title: "",
  type: "",
  covers: "",
  banners: "",
  catalogs: "",
  country: "",
  city: "",
  initial: "",
  website: "",
  description: "",
  display_order: 0,
  contacts: [] as Contact[],
  other_message: [] as any[],
  attributes: {}
})

const rules = reactive<FormRules<Brand>>({
  title: [
    { required: true, message: "请输入品牌的名称", trigger: "blur" },
    { min: 2, max: 16, message: "长度在2-16个字符之间", trigger: "blur" }
  ],
  sub_title: [
    { required: true, message: "请输入品牌的别名", trigger: "blur" },
    { min: 2, max: 16, message: "长度在2-16个字符之间", trigger: "blur" }
  ],
  country: [
    { required: true, message: "请输入品牌的名称", trigger: "blur" },
    { min: 2, max: 10, message: "长度在2-10个字符之间", trigger: "blur" }
  ],
  city: [
    { required: true, message: "请输入品牌所在区域", trigger: "blur" },
    { min: 2, max: 10, message: "长度在2-10个字符之间", trigger: "blur" }
  ],
  banners: [{ required: true, message: "请上传品牌BANNER图", trigger: "blur" }],
  catalogs: [{ required: true, message: "请选择品牌经营产品分类", trigger: "blur" }],
  initial: [{ required: true, message: "请选择品牌首字母分类", trigger: "blur" }],
  type: [{ required: true, message: "请选择品牌类型", trigger: "blur" }]
})
const brandType = shallowReactive<Dictionary>({
  key: "",
  text: "",
  options: []
})

const catalogSelectorOption = ref<any>()
const selectedType = ref<string[]>([])
const selectedInitial = ref<string[]>([])
const selectedCatalogs = ref<string[]>([])
const channelModel = ref<any>({})

//* component ref */
const ruleFormRef = ref<any>({})
const editLayoutRef = ref<any>({})
const bannerUploadRef = ref<any>({})
const coverUploadRef = ref<any>({})

const selectType = (items: any[]) => {
  if (items.length > 0) formModel.type = items.join(",")
  else formModel.type = ""
}

const selectInitial = (items: any[]) => {
  if (items.length > 0) formModel.initial = items.join(",")
  else formModel.initial = ""
}

const handleInitialize = async (model: Brand) => {
  Object.assign(formModel, model)
  if (formModel?.catalogs && formModel?.id) {
    selectedCatalogs.value = formModel.catalogs.split(",")
    selectedInitial.value = formModel.initial.split(",")
    selectedType.value = formModel.type.split(",")
  }
}
const onContactChanged = (data: Contact[]) => {
  formModel.contacts = data
}
const onFilterConfirm = (name: string, values: any[]) => {
  formModel.attributes = {
    ...formModel.attributes,
    [name]: values.map((x) => x.title).join(",")
  }
}
const handleSelectedCatalogs = (ids: any[], items: any[]) => {
  formModel.catalogs = items.map((x) => x.join("/")).join(",")
}

const handleBeforeSubmit = async () => {
  let error: boolean = false
  const valid = await new Promise((resolve) => {
    ruleFormRef.value.validate((valid: boolean) => {
      resolve(valid)
    })
  })
  if (!valid) {
    ElMessage.error("您未完整或填写正确的表单信息,请在修正后继续提交...")
    return valid
  }
  /** 表单校验通过,上传资源 */
  const banner = await bannerUploadRef.value!.submitUpload().catch(() => {
    error = true
  })
  if (banner) formModel.banners = banner.id
  if (!error) {
    const coverIds = await coverUploadRef.value!.submitUpload().catch(() => {
      error = true
    })
    let covers = formModel!.covers ? formModel!.covers.split(",") : []
    covers = covers.concat(coverIds)
    if (covers.length > 4) covers = covers.splice(covers.length - 4, 4)
    if (coverIds && coverIds.length) formModel.covers = covers.join(",")
  }
  //**上传失败不继续后续表单提交逻辑 */
  return !error
}

const confirmMediaSelected = (selectedList: any[]) => {
  console.log(selectedList)
  const od = formModel.covers ? formModel.covers.split(",") : []
  formModel.covers = od
    .concat(selectedList.map((item: any) => item.id || item))
    .reverse()
    .slice(0, 4)
    .reverse()
    .join(",")
}

const emits = defineEmits(["afterSubmit"])
const hanldeAfterSubmit = async (status: number) => {
  emits("afterSubmit", status)
}

onMounted(() => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })

  getDictByKey("brand_type").then(({ data }) => {
    Object.assign(brandType, data)
  })
  /** 获取频道信息 */
  getChannelModel("brand", "").then((res) => {
    channelModel.value = res.data
    const catalogIds: string[] = []
    channelModel.value.catalogs.map((item: any[]) => {
      item.map((child: string) => {
        if (catalogIds.indexOf(child) === -1) {
          catalogIds.push(child)
        }
      })
    })
    /** 获取频道关联分类信息 */
    getByIds(catalogIds).then(({ data }) => {
      const tmpData = data.filter((x) => x.deep === 0)
      catalogSelectorOption.value = tmpData.map((catalog: any) => {
        const childs = data.filter((x: any) => x.parent_uuid === catalog.id)
        catalog.children = childs
        return catalog
      })
    })
  })
})
</script>

<style scoped>
.brand-editor {
  width: 100%;
  margin: 30px 0;
}
</style>
