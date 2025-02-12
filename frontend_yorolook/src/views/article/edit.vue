<style lang="scss" scoped>
.app-container {
  width: var(--max-width);
  margin: 0 auto;

  :deep(.el-form) {
    position: relative;
    width: 100%;

    .el-form-item {
      width: 100%;
      margin-bottom: 10px;

      &.is-error {
        margin-bottom: 30px;
      }

      p {
        all: initial;
        width: 100%;
        padding: 8px 0;
        font-size: 0.82rem;
      }

      .cover-list {
        width: 100%;
        display: flex;

        img {
          width: 20%;
          max-width: 150px;
          margin-right: 10px;
        }
      }
    }

    .el-form-item__error {
      line-height: 24px;
    }
  }
}
</style>

<template>
  <div class="app-container">
    <edit-layout
      :id="`${props.id || ''}`"
      ref="editLayoutRef"
      name="article"
      :title="channelModel.title"
      :before-submit="handleBeforeSubmit"
      :dialog="props.dialog"
      @on-initialize="handleInitialize"
    >
      <template #default>
        <el-tabs v-if="formModel.id" v-model="activeTab" @tab-change="tabChange">
          <el-tab-pane name="base" label="基础信息">
            <el-form
              ref="ruleFormRef"
              label-position="top"
              :model="formModel"
              label-width="auto"
              :rules="rules"
              :scroll-to-error="true"
            >
              <el-row :gutter="16">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item prop="catalogs" label="产品分类">
                    <catalog-cascader
                      :key="selectedCatalogs.length"
                      @change="handleSelectedCatalogs"
                      v-if="channelModel.catalogs?.length"
                      :catalogs="channelModel.catalogs"
                      :data="formModel.catalogs"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item prop="title" label="产品标题">
                    <el-input v-model="formModel.title" placeholder="请输入产品标题" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item prop="sub_title" label="产品副标题">
                    <el-input v-model="formModel.sub_title" placeholder="请输入产品副标题" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item props="images">
                <p>
                  请上传4张主图（无尺寸要求）<el-button
                    v-if="formModel.images.split(',').length > 1"
                    size="small"
                    type="success"
                    text
                    @click="dragsort[0] = !dragsort[0]"
                  >
                    {{ dragsort[0] ? "切换图片上传" : "切换拖拽排序" }}
                  </el-button>
                </p>
                <Dragsort v-if="dragsort[0]" v-model="formModel.images" />
                <multiple-upload
                  v-if="!dragsort[0]"
                  :key="formModel.images.length"
                  :files="formModel.images"
                  view-size="100px"
                  :limit="4"
                  ref="uploadRefImages"
                  @on-remove="
                    (v: any[]) => {
                      formModel.images = v.join(',')
                    }
                  "
                >
                  <template #footer
                    ><media-selector :count="4" type="file" accept="image/*" @confirm="confirmMediaSelected"
                  /></template>
                </multiple-upload>
              </el-form-item>
              <el-form-item props="keywords" label="关键词标签">
                <keyword-selector :images="formModel.images" v-model="formModel.keywords" />
              </el-form-item>
              <el-row :gutter="16">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                  <el-form-item prop="sub_title" label="品牌">
                    <brand-selector v-model="formModel.brand_uuid" :default="formModel.brand" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                  <el-form-item props="quick_code" label="产品编号">
                    <el-input v-model="formModel.quick_code" placeholder="产品编号" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="16">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4"
                  ><el-form-item props="lowest_price" label="最低价格">
                    <el-input-number v-model="displayLowestPrice" :min="0" :max="10000000">
                      <template #prefix>
                        <span>￥</span>
                      </template>
                    </el-input-number>
                  </el-form-item></el-col
                >
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
                  <el-form-item props="highest_price" label="最高价格">
                    <el-input-number v-model="displayHighestPrice" :min="0" :max="10000000">
                      <template #prefix>
                        <span>￥</span>
                      </template>
                    </el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="2" :xl="2"
                  ><el-form-item props="owner_recommend" label="作者推荐">
                    <el-switch v-model="formModel.owner_recommend" :active-value="1" :inactive-value="0" />
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="2" :xl="2">
                  <el-form-item props="sys_recommend" label="系统推荐">
                    <el-switch v-model="formModel.sys_recommend" :active-value="1" :inactive-value="0" />
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
                  <el-form-item props="status" label="状态">
                    <el-select v-model="formModel.status" clearable filterable>
                      <el-option label="全平台可见" :value="0">全平台可见</el-option>
                      <el-option label="品牌主页可见" :value="1">品牌主页可见</el-option>
                      <el-option label="仅自己可见" :value="2">仅自己可见</el-option>
                      <el-option label="未发布" :value="255">未发布</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
                  <el-form-item props="publish_date" label="发布类型">
                    <div style="width: 100%" class="flex">
                      <el-select style="max-width: 50%" v-model="publishType" clearable filterable>
                        <el-option label="即时发布" :value="0">即时发布</el-option>
                        <el-option label="定时发布" :value="1">定时发布</el-option>
                      </el-select>
                      <el-date-picker
                        style="margin-left: 8px"
                        v-if="publishType === 1"
                        v-model="formModel.publish_date"
                        type="datetime"
                        placeholder="选择定时发布的时间"
                      />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item props="sketch" label="产品简介">
                <el-input type="textarea" v-model="formModel.sketch" placeholder="请输入简短的产品介绍" />
              </el-form-item>
              <el-form-item props="videos">
                <multiple-upload view-size="100px" :limit="1" title="视频" ref="uploadRefVideos">
                  <template #footer
                    ><media-selector
                      :count="4"
                      type="file"
                      accept="video/*"
                      @confirm="
                        (selectedList: any[]) => {
                          formModel.videos = selectedList.map((item: any) => item.id).toString()
                        }
                      "
                  /></template>
                </multiple-upload>
              </el-form-item>
              <el-form-item props="full_content" label="详情">
                <p>
                  请上传详情图，最多可传100张（无尺寸要求）<el-button
                    v-if="formModel.full_content.split(',').length > 1"
                    size="small"
                    type="success"
                    text
                    @click="dragsort[1] = !dragsort[1]"
                  >
                    {{ dragsort[0] ? "切换图片上传" : "切换拖拽排序" }}
                  </el-button>
                </p>
                <multiple-upload view-size="100px" :limit="100" ref="uploadRefContent">
                  <template #footer
                    ><media-selector
                      :count="100"
                      type="file"
                      accept="image/*"
                      @confirm="
                        (selectedList: any[]) => {
                          formModel.full_content = selectedList.map((item: any) => item.id).toString()
                        }
                      " /></template
                ></multiple-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="extra" label="扩展属性">
            <attribute-render
              ref="attributeRef"
              :article_uuid="formModel.id"
              :key="attributeIds.length + formModel.id"
              :attributeIds="attributeIds"
            />
          </el-tab-pane>
          <el-tab-pane v-if="channelModel.is_shop" name="sku" label="SKU规格">
            <sku-table
              :key="formModel.images.length + formModel.id"
              :images="formModel.images"
              :article_uuid="formModel.id"
              :channel="formModel.channel"
            />
          </el-tab-pane>
          <el-tab-pane label="图片标注">
            <div style="width: 60%">
              <image-gallery
                :edit="true"
                :key="'cover' + formModel.images.length"
                :images="formModel.images.split(',')"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="附件管理">
            <attach-table
              :channel="channelModel.name"
              :key="formModel.images.length + formModel.id"
              :article_uuid="formModel.id"
            />
          </el-tab-pane>
        </el-tabs>
      </template>
    </edit-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, nextTick, computed } from "vue"
import { IArticle } from "@/api/article/types"
import { FormRules, TabPaneName } from "element-plus"
import { getByName as getChannelModel } from "@/api/channel"
import catalogCascader from "@/components/custom/catalog-cascader.vue"
import brandSelector from "@/components/custom/brand-selector.vue"
import attributeRender from "@/components/custom/article/attribute-render.vue"
import { getByPath } from "@/api/catalog"
import { useRoute } from "vue-router"
import keywordSelector from "@/components/custom/keyword-selector.vue"
import skuTable from "@/components/custom/shop/sku-table.vue"
import attachTable from "@/components/custom/attach/table.vue"
import imageGallery from "@/components/custom/image-gallery.vue"
import Dragsort from "@/components/custom/dragsort.vue"

const props = defineProps<{
  id?: number
  dialog?: boolean
}>()

const activeTab = ref<string>("base")
const publishType = ref(0)
const channelModel = ref<any>({})
const attributeIds = reactive<string[]>([])
const selectedCatalogs = ref<string[]>([])

const formModel = reactive<IArticle>({
  id: "",
  channel: "",
  brand_uuid: "",
  catalogs: "",
  title: "",
  sub_title: "",
  sketch: "",
  keywords: "",
  quick_code: "",
  cover: "",
  images: "",
  videos: "",
  full_content: "",
  lowest_price: 0,
  highest_price: 0,
  like: 0,
  collect_count: 0,
  owner_recommend: 0,
  sys_recommend: 0,
  display_order: 0,
  publish_date: new Date(),
  status: 0,
  attributes: []
})

const displayLowestPrice = computed({
  get: () => (formModel.lowest_price || 0) / 100,
  set: (value: number) => {
    formModel.lowest_price = Math.round(value * 100)
  }
})

const displayHighestPrice = computed({
  get: () => (formModel.highest_price || 0) / 100,
  set: (value: number) => {
    formModel.highest_price = Math.round(value * 100)
  }
})

const rules = reactive<FormRules<IArticle>>({
  catalogs: [
    {
      required: true,
      message: "请选择分类",
      trigger: "blur"
    }
  ],
  title: [
    { required: true, message: "请输入内容的标题", trigger: "blur" },
    { min: 2, max: 16, message: "长度在2-32个字符之间", trigger: "blur" }
  ]
})

const route = useRoute()
//* component ref */
const ruleFormRef = ref<any>({})
const editLayoutRef = ref<any>({})
const uploadRefImages = ref<any>()
const uploadRefVideos = ref<any>()
const uploadRefContent = ref<any>()
const attributeRef = ref<any>()
const dragsort = ref<boolean[]>([false, false])
const handleInitialize = async (model: IArticle) => {
  Object.assign(formModel, model)
  selectedCatalogs.value = formModel.catalogs.split(",")
}

const confirmMediaSelected = (selectedList: any[]) => {
  const od = formModel.images ? formModel.images.split(",") : []
  formModel.images = od
    .concat(selectedList.map((item: any) => item.id || item))
    .reverse()
    .slice(0, 4)
    .reverse()
    .join(",")
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
  const loading = ElLoading.service({
    lock: true,
    text: "资源上传处理中,请稍等....",
    background: "rgba(255, 255, 255, 0.5)"
  })
  /** 表单校验通过,上传资源 */
  const images = await uploadRefImages.value?.submitUpload().catch(() => {
    error = true
  })
  loading.close()
  confirmMediaSelected(images)
  attributeRef.value?.submit()
  //**上传失败不继续后续表单提交逻辑 */
  return !error
}

const handleSelectedCatalogs = (ids: any[], items: any[]) => {
  formModel.catalogs = items.map((x) => x.join("/")).join(",")
}

const tabChange = (i: TabPaneName) => {
  nextTick(() => {
    if (i === "extra") {
      if (!channelModel.value.id) {
        activeTab.value = "base"
        ElMessage.error("为了获取扩展属性，您需要先选择发布的频道...")
        return
      }
      if (formModel.catalogs.length <= 0) {
        activeTab.value = "base"
        ElMessage.error("为了获取扩展属性，您需要为产品先选择至少一个分类...")
        return
      }
      getByPath(formModel.catalogs).then((res) => {
        res.data.map((item: any) => {
          if (item.attributes && item.attributes.length > 0) attributeIds.push(...item.attributes)
        })
      })
    }
  })
}

onMounted(async () => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })

  /** 获取频道信息 */
  getChannelModel(route.meta.name as string, "").then((res) => {
    channelModel.value = res.data
    attributeIds.push(...channelModel.value.attributes)
    formModel.channel = route.meta.name as string
    console.log(route.meta)
  })
})
</script>
