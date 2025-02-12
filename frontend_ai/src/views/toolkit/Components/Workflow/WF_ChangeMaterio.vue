<script setup lang="ts">
import AIProxyAPI from '@/api/aiproxy'
import ImageInput from '../ImageInput.vue';

const submitBody = ref({
    title: "工作流生成::一键材质更换",
    method: "generate",
    type: "WORKFLOW",
    params: {}
})
const submitParams = ref({
    model: "change-materia",
    image1: "",
    image2: ""
})
const emits = defineEmits(["onSubmit"])
const submit = async () => {
    console.log(submitParams.value)
    submitBody.value.params = submitParams.value
    const res = await AIProxyAPI.WF_submit(submitBody.value)
    emits("onSubmit", res.data)
}
onBeforeMount(()=>{
})

</script>
<template>
    <v-card-text>
        <v-label class="font-weight-medium my-3">
            原图
        </v-label>
        <image-input :enter="true" type="url" width="100%" @on-selected="(url) => submitParams.image1=url"></image-input>
        <v-label class="font-weight-medium my-3">
            材质图
        </v-label>
        <image-input :enter="true" type="url" width="100%" @on-selected="(url) => submitParams.image2=url"></image-input>
        <v-btn style="margin-top: 1rem;" size="x-large" color="primary" block @click="submit()">
            200 Y{{ $t("system.coin") }} / 运行工作流
        </v-btn>
    </v-card-text>
</template>