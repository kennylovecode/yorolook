
<template>
  <el-cascader placeholder="全部" :options="cascaderOptions" v-model="cascaderValue" ref="cascaderRef" :props="cascaderProps" clearable />
</template>

<script lang="ts" setup>
import { getTypes } from '@/api/type';
import { CascaderProps } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { getTypeRanks } from '@/api/type_rank';

const props = withDefaults(defineProps<{
  default?: any
  child?: boolean
}>(), {
  child: false
})

const cascaderValue = reactive<any[]>([])
const cascaderOptions = reactive<any[]>([])

const cascaderProps: CascaderProps = {
  lazy: props.child,
  checkStrictly: true,
  value: "id",
  label: "title",
  lazyLoad(node, resolve) {
    const parent_id = (node.data?.id as number) || ""
    if(parent_id){
      getTypeRanks({ type_id: parent_id  }).then(({data}) => {
        resolve(data as any[])
        return
      })
    }
  }
}
onMounted(async ()=>{
  const {data} = await getTypes()
  Object.assign(cascaderOptions,data)
  if(props.default){
    Object.assign(cascaderValue,props.default)
  }
})

</script>
