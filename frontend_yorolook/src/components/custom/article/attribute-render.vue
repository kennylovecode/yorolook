<style lang="scss" scoped>
.attribute-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .line {
    width: 100%;
    display: flex;
    align-items: center;

    .label {
      display: flex;

      span {
        width: 14px;
        display: inline-block;
      }

      .text {
        width: 56px;
        text-align: justify;
        display: inline-block;
        height: 16px;

        &::after {
          content: "";
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
}
</style>

<template>
  <div :key="setectedList.length" class="attribute-list">
    <template v-for="attr in attributesList">
      <multiple-check
        :key="attr.id"
        v-if="attr.control?.control_type === 'multiple-checkbox'"
        @on-confirm="onConfirm"
        :name="attr.id"
        :title="attr.title"
        :list="attr.options!"
        :defaults="_defaults(attr.id)?.values || []"
      />
      <div :key="attr.id" v-if="attr.control?.control_type === 'text'" :gutter="20" class="line">
        <div class="label">
          <span class="text">{{ attr.title }}</span>
          <span>：</span>
        </div>
        <el-input
          v-model="textInputValues![attr.id]"
          :placeholder="attr.control?.text_prompt"
          size="default"
          clearable
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { getByIds, getCommonList } from "@/api/attribute"
import { Attribute, AttributeControl, AttributeOption } from "@/api/attribute/types"
import { onMounted, ref } from "vue"
import multipleCheck from "../../filter/multiple-check.vue"
import { doAttributeValue, doAttributeValueBatch } from "@/api/article"

const props = defineProps<{
  article_uuid: string
  attributeIds: string[]
}>()

const attributesList = ref<Attribute[]>([])
const setectedList = ref<
  {
    id: string
    values: any[]
  }[]
>([])

const textInputValues = ref<{
  [key: string]: string
}>()

const onConfirm = async (id: string, values: any[]) => {
  const originalAttr = setectedList.value.find((x) => x.id === id)
  const index = setectedList.value.findIndex((x) => x.id === id)
  if (!originalAttr) {
    setectedList.value.push({
      id,
      values
    })
    await doAttributeValue(
      {
        article_uuid: props.article_uuid,
        attribute_uuid: id,
        value_list: JSON.stringify(
          values.map((x) => {
            return { id: x.id, value: x.title }
          })
        )
      },
      "create"
    )
    return
  }
  /** 删除多余的属性值 */
  const removeDiff = originalAttr?.values.filter((x) => !values.find((y) => y.id === x.id))
  if (removeDiff.length > 0) {
    await doAttributeValue(
      {
        article_uuid: props.article_uuid,
        attribute_uuid: id,
        value_list: JSON.stringify(
          removeDiff.map((x) => {
            return { id: x.id, value: x.title }
          })
        )
      },
      "remove"
    )
  }

  /** 新增的属性值 */
  const addDiff = values.filter((x) => !originalAttr?.values.find((y) => y.id === x.id))
  if (addDiff.length > 0) {
    await doAttributeValue(
      {
        article_uuid: props.article_uuid,
        attribute_uuid: id,
        value_list: JSON.stringify(
          addDiff.map((x) => {
            return { id: x.id, value: x.title }
          })
        )
      },
      "create"
    )
  }
  /** 保留的属性值 */
  setectedList.value[index] = {
    id,
    values: originalAttr?.values.filter((x) => !removeDiff.find((y) => y.id === x.id)).concat(addDiff)
  }
}

const _defaults = (id: string) => {
  return setectedList.value?.find((x) => x.id === id)
}

const initial = async () => {
  const { data } = await doAttributeValue(
    {
      article_uuid: props.article_uuid
    },
    "list"
  )
  if (data?.length > 0) {
    data.forEach((element: any) => {
      const findRootIndex = setectedList.value.findIndex((x) => x.id === element.attribute_uuid)
      if (findRootIndex < 0) {
        setectedList.value.push({
          id: element.attribute_uuid,
          values: [
            {
              id: element.value_uuid,
              title: element.value
            }
          ]
        })
        if (!element.value_uuid) {
          textInputValues.value = {
            ...textInputValues.value,
            [element.attribute_uuid]: element.value
          }
        }
      } else {
        setectedList.value[findRootIndex].values.push({
          id: element.value_uuid,
          title: element.value
        })
      }
    })
  }
}

onMounted(async () => {
  const { data } = await getCommonList()
  if (props.attributeIds.length > 0) {
    const res = await getByIds(props.attributeIds)
    data.attributes.push(...res.data.attributes)
    data.controls.push(...res.data.controls)
    data.options.push(...res.data.options)
  }
  const { attributes, controls, options } = data
  attributesList.value = attributes
    .map((item: Attribute) => {
      item.control = controls.find((x: AttributeControl) => x.attribute_uuid === item.id)
      item.options = options.filter((x: AttributeOption) => x.attribute_uuid === item.id)

      if (item.control?.control_type === "text" || item.control?.control_type === "textarea") {
        textInputValues.value = {
          ...textInputValues.value,
          [item.id]: ""
        }
      }
      return item
    })
    .sort((a: Attribute, b: Attribute) => a.control!.control_type.localeCompare(b.control!.control_type))

  await initial()
})

/** 由父组件调用何时保存input里面的内容 */
const submit = async () => {
  const list = []
  for (const key in textInputValues.value) {
    list.push({
      attribute_uuid: key,
      value: textInputValues.value[key]
    })
  }
  if(list.length>0){
    await doAttributeValueBatch({
      article_uuid: props.article_uuid,
      attribute_value_list: JSON.stringify(list)
    })
  }
}
defineExpose({
  submit
})
</script>
