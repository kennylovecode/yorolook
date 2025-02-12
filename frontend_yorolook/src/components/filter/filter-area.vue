<template>
  <div class="filter-box">
    <slot name="prev" />
    <multiple-check
      @on-confirm="onConfirm"
      @on-clear="onConfirm"
      v-for="(item, index) in commonAttributes"
      :key="index"
      v-if="!props.custom && item?.control?.control_type === 'multiple-checkbox'"
      :name="item[props.name as keyof Attribute] as string"
      :list="item.options!"
      :title="item[props.label as keyof Attribute] as string"
      :defaults="getDefaults(item[props.name as keyof Attribute] as string)"
    />
    <slot name="append" />
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, withDefaults } from "vue"
import multipleCheck from "./multiple-check.vue"
import { Attribute, AttributeControl, AttributeOption } from "@/api/attribute/types"
import { getCommonList } from "@/api/attribute"

interface PropsModel {
  name?: string
  label?: string
  value?: string
  custom?: boolean
  attrs?: any
  defaults?: any
}
const props = withDefaults(defineProps<PropsModel>(), {
  name: "",
  label: "",
  value: "",
  custom: false,
  defaults: {}
})

const commonAttributes = ref<any[]>([])

const emits = defineEmits(["onConfirm", "onChange"])
const onConfirm = (name: string, value: any[]) => {
  emits("onConfirm", name, value)
}

const getDefaults = (name: string) => {
  const attribute = commonAttributes.value.find((x) => x.name === name)
  if (props.defaults && attribute) {
    const options = props.defaults[name]?.split(",")
    if (options?.length > 0) {
      return attribute.options?.filter((x: any) => options.indexOf(x.title) > -1)
    }
  }
}

const build = (data: any) => {
  if (data.attributes) {
    commonAttributes.value = commonAttributes.value.concat(
      data.attributes.map((attribute: Attribute) => {
        attribute.options = data.options.filter((option: AttributeOption) => option.attribute_uuid === attribute.id)
        attribute.control = data.controls.find((control: AttributeControl) => control.attribute_uuid === attribute.id)
        return attribute
      })
    )
  }
}

onMounted(async () => {
  const { data } = await getCommonList()
  build(data)
  if (props.attrs) {
    build(props.attrs)
  }
})
</script>

<style lang="scss" scoped>
.filter-box {
  background: var(--el-bg-color);
  padding: 8px;
  max-width: 100%;
  margin-top: calc(var(--margin-y-base) * 2);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  gap: 8px;
  .tag {
    margin: 0 var(--margin-x-base);
    border: var(--el-border);
    border-color: var(--el-color-primary-light-5);
  }
  .right {
    position: absolute;
    right: var(--margin-x-base);
    display: flex;
    justify-content: flex-end;
  }
}

@media screen and (max-width: 750px) {
  .filter-box {
    margin-top: 0;

    .right {
      position: initial;
      margin-left: var(--margin-x-base);
    }

    > span {
      display: none;
    }

    .sort-item {
      display: none;
    }
  }
}
</style>
