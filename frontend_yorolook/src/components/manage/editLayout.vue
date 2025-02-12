<style lang="scss" scoped>
.edit-form-layout {
  .control {
    display: flex;
    justify-content: flex-end;
    z-index: 99;
    background: rgba(255, 255, 255, 0.9);
    width: 100%;
    padding: 10px 20px;

    &.footer {
      all: initial;
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
    }
  }
}
</style>

<template>
  <div class="edit-form-layout">
    <slot />

    <el-affix target=".edit-form-layout" :offset="0" position="bottom">
      <div class="control" :class="{ footer: props!.dialog }">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="false" type="primary" @click="onCache" plain>暂存</el-button>
      </div>
    </el-affix>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import CacheKey from "@/constants/cache-key"
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/message-box/style/css"
import { ElLoading, ElMessage, ElMessageBox } from "element-plus"
import { useTagsViewStore } from "@/store/modules/tags-view"
import { IResponse } from "@/api/types"
interface PropsModel {
  name: string
  title: string
  dialog?: boolean
  id?: string
  cb?: Function
  beforeSubmit?: Function
  createHook?: Function
  updateHook?: Function
}
const props = defineProps<PropsModel>()
const __storageKey = `${CacheKey.CACHED_FORMS}-${props?.name}`

const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()
const formData = reactive<any>({})

const emits = defineEmits(["onInitialize", "afterSubmit"])

const onCache = () => {
  localStorage.setItem(
    __storageKey,
    JSON.stringify({
      time: new Date().getTime(),
      data: formData
    })
  )
}

const onSubmit = async () => {
  debugger
  let beforeSubmitSuccess = true
  if (typeof props?.beforeSubmit === "function") beforeSubmitSuccess = await props.beforeSubmit()
  if (!beforeSubmitSuccess) {
    return
  }
  if (!props.name) return
  console.log(props.name)
  let { create, update } = await import(`../../api/${props.name}/index.ts`)
  if (props.createHook) create = props.createHook
  if (props.updateHook) update = props.updateHook
  let res: IResponse<any>
  if (formData.id) res = await update(formData)
  else res = await create(formData)
  if (res.code > 0) {
    emits("afterSubmit", res.data)
    if (props.dialog && props.cb) {
      ElMessage.success("保存成功...")
      props.cb(res.data)
    } else {
      ElMessageBox.alert(res.message, "提示", {
        confirmButtonText: "继续编辑",
        cancelButtonText: "返回",
        showCancelButton: true,
        type: "success"
      })
        .then(() => {
          Object.assign(formData, res.data)
        })
        .catch(() => {
          if (!props?.dialog) router.back()
        })
    }
  }
}

const removeCache = () => {
  localStorage.removeItem(__storageKey)
}

const useCache = async () => {
  // if (!localStorage.getItem(__storageKey)) return false
  // const { time, data } = JSON.parse(localStorage.getItem(__storageKey) || "")
  // if (!data) return false
  // const confirm = await ElMessageBox.confirm(
  //   `您在${new Date(time).toLocaleString()}时暂存了编辑内容，请问是否使用？`,
  //   "info",
  //   {
  //     confirmButtonText: "使用内容",
  //     cancelButtonText: "取消",
  //     type: "info"
  //   }
  // ).catch(() => {
  //   removeCache()
  //   return false
  // })
  // if ((confirm as string) !== "confirm") {
  //   removeCache()
  //   return false
  // }
  return true
}

const setForm = (v: any) => {
  //formData.value = v
  Object.assign(formData, v)
}

onMounted(async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "稍事休息~喝口水吧....",
    background: "rgba(255, 255, 255, 0.5)"
  })
  const id = props!.id || (props.dialog ? "" : route.params.id)
  if (!props.name) return
  if (id) {
    const { getById } = await import(`../../api/${props.name}/index.ts`)
    const { data } = await getById(id)
    if (data) {
      Object.assign(formData, data)
    }
  } else {
    useCache()
  }
  tagsViewStore.editTagTitle(
    route,
    formData.id ? `${formData.title + " - " || ""}编辑${props.title}` : `新增${props.title}`
  )
  emits("onInitialize", formData)
  loading.close()
})

defineExpose({
  setForm,
  submit: onSubmit
})
</script>
