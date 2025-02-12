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
    <edit-layout ref="editLayoutRef" name="channel" title="频道" @on-initialize="handleInitialize">
      <el-tabs>
        <el-tab-pane label="基础信息">
          <el-form ref="form" :model="formModel" :rules="rules" label-width="100px" label-position="left">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入频道名称（仅支持英文）" />
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="formModel.title" placeholder="请输入频道标题" />
            </el-form-item>
            <el-form-item label="功能">
              <el-switch
                v-model="formModel.is_attach"
                class="ml-2"
                inline-prompt
                active-text="附件（开）"
                inactive-text="附件（关）"
              />
              <el-switch
                v-model="formModel.is_comment"
                class="ml-2"
                inline-prompt
                active-text="评论（开）"
                inactive-text="评论（关）"
              />
              <el-switch
                v-model="formModel.is_mark"
                class="ml-2"
                inline-prompt
                active-text="标注（开）"
                inactive-text="标注（关）"
              />
              <el-switch
                v-model="formModel.is_share"
                class="ml-2"
                inline-prompt
                active-text="分享（开）"
                inactive-text="分享（关）"
              />
              <el-switch
                v-model="formModel.is_theme"
                class="ml-2"
                inline-prompt
                active-text="主题（开）"
                inactive-text="主题（关）"
              />
              <el-switch
                v-model="formModel.is_shop"
                class="ml-2"
                inline-prompt
                active-text="商城（开）"
                inactive-text="商城（关）"
              />
            </el-form-item>
            <el-form-item label="权限">
              <el-alert
                style="margin-bottom: 6px"
                title="登录限制"
                type="info"
                description="在用户登录账户之前该频道的可见状态"
                show-icon
              />
              <el-select v-model="formModel.limit_level" style="width: 240px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value as string"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="身份" prop="is_albums">
              <el-alert
                title="身份限制"
                type="info"
                description="默认不选择则所有用户可访问，如选择后仅选择的身份用户可访问，如登录限制为 “无限制” ，该设置不生效"
                show-icon
                style="margin-bottom: 6px"
              />
              <el-cascader
                v-model="formModel.type_rank_limits"
                placeholder="选择或搜索会员身份"
                :options="typeOptions"
                :props="{ multiple: true }"
                filterable
                :show-all-levels="false"
              />
            </el-form-item>
            <el-form-item label="每行数量" prop="linesize">
              <el-input-number v-model="formModel.linesize" :min="1" :max="8" />
            </el-form-item>
            <el-form-item label="每页数量" prop="pagesize">
              <el-input-number v-model="formModel.pagesize" :min="10" :max="100" />
            </el-form-item>
            <el-form-item label="排序" prop="display_order">
              <el-input-number v-model="formModel.display_order" :min="1" :max="1000" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="分类管理">
          <el-cascader
            v-model="formModel.catalogs"
            placeholder="选择分类关联"
            :options="catalogs"
            :props="{ multiple: true, value: `id`, label: `title` }"
            filterable
            @change="onCatalogsChange"
          />
        </el-tab-pane>
        <el-tab-pane label="属性管理">
          <el-select v-model="formModel.attributes" multiple placeholder="" clearable filterable>
            <el-option v-for="item in attributes" :key="item.id" :label="item.title" :value="item.id" />
          </el-select>
        </el-tab-pane>
      </el-tabs>
    </edit-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue"
import { Channel } from "@/api/channel/types"
import { CascaderOption, FormRules } from "element-plus"
import editLayout from "@/components/manage/editLayout.vue"
import { getTypes } from "@/api/type"
import { getTypeRanks } from "@/api/type_rank"
import type { Type, TypeRank } from "@/api/type/types"
import type { Catalog } from "@/api/catalog/types"
import { getAll as getCatalogs } from "@/api/catalog"
import { getAll as getAttributes } from "@/api/attribute"
import { Attribute } from "@/api/attribute/types"

const formModel = reactive<Channel>({
  id: 0,
  name: "",
  title: "",
  banners: [],
  pagesize: 40,
  linesize: 5,
  limit: false,
  limit_level: 0,
  type_rank_limits: [],
  is_attach: true,
  is_comment: true,
  is_mark: true,
  is_share: true,
  is_theme: true,
  is_shop: true,
  catalogs: [],
  attributes: [],
  display_order: 0
})

const channelCatalogs = reactive<Catalog[]>([])
const channelAttributes = reactive<Catalog[]>([])
const editLayoutRef = ref<any>({})

const rules = reactive<FormRules<Channel>>({
  name: [
    { required: true, message: "请输入频道的名称", trigger: "blur" },
    { min: 2, max: 16, message: "频道名称2-16个小写英文字符", trigger: "blur" },
    {
      pattern: /^[a-z]+$/,
      message: "频道名称只能包含小写英文字母",
      trigger: "blur"
    }
  ],
  title: [
    { required: true, message: "请输入频道的标题", trigger: "blur" },
    { min: 2, max: 16, message: "名称的长度在2-16个字符之间", trigger: "blur" }
  ]
})

const typeOptions = reactive<CascaderOption[]>([])
const options = reactive<CascaderOption[]>([
  {
    value: 0,
    label: "无限制"
  },
  {
    value: 1,
    label: "仅首页"
  },
  {
    value: 255,
    label: "全部不可见"
  }
])

const catalogs = ref<Catalog[]>([])
const attributes = ref<Attribute[]>([])
const handleInitialize = async (model: any) => {
  Object.keys(model).forEach((key) => {
    if (key in formModel && typeof model[key] !== "undefined") {
      if (typeof (formModel as any)[key] === "boolean") {
        model[key] = model[key] > 0
      }
    }
  })
  formModel.attributes = model.attributes?.attributes?.map((item: any) => item.id)
  delete model.attributes
  Object.assign(formModel, model)
}

const onCatalogsChange = () => {
  console.log(channelCatalogs)
}
const onAttributeChange = () => {
  console.log(channelAttributes)
}

function buildCatalogTree(data: any) {
  const root = []

  // 遍历数据,构建树形结构
  function buildTree(items: any, parentId: any) {
    return items.reduce((acc: any, item: any) => {
      if (item.parent_id === parentId) {
        const children = buildTree(items, item.id)
        acc.push({ ...item, children })
      }
      return acc
    }, [])
  }

  // 将根节点添加到root数组
  for (const item of data) {
    if (!item.parent_id) {
      root.push(item)
    }
  }

  // 递归构建树形结构
  for (const item of root) {
    item.children = buildTree(data, item.id)
  }

  return root
}

onMounted(async () => {
  watch(formModel, (newValue) => {
    if (editLayoutRef.value) editLayoutRef.value!.setForm(newValue)
  })

  const types: Type[] = (await getTypes()).data
  const ranks: TypeRank[] = (await getTypeRanks({})).data
  for (const type of types) {
    const typeRanks: TypeRank[] = ranks
      .filter((rank: TypeRank) => rank.type_id === type.id)
      .sort((a, b) => a.weight - b.weight)
    type.children = typeRanks
    typeOptions.push({
      label: `${type.name}（${type.title}）`,
      value: type.id,
      children: typeRanks.map((rank: TypeRank) => {
        return {
          label: `${rank.weight + 1}、${rank.title}`,
          value: rank.id
        }
      })
    })
  }

  getCatalogs()
    .then(({ data }: { data: Catalog[] }) => {
      catalogs.value = buildCatalogTree(data)
    })
    .catch((err) => {
      console.log(err)
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
