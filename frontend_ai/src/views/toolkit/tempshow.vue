<template>
    <v-card v-if="running" class="pa-3 relative flex align-center flex-wrap" height="calc(100vh - 46px)">
        <AnimaitonCss03 size="300"></AnimaitonCss03>
        <p class="absolute w-full top-0 z-12 text-center pa-5">正在执行当中，预估时间为{{ submitParams.runtime }}秒， 已运行 {{
            runtimeToFnished }} 秒</p>
    </v-card>
    <v-container v-else class="container">
        <v-card class="box pa-3 relative" height="180px">
            <v-card-text class="absolute top-0 left-0">
                <p class="text-h4">一键更换材质</p>
                <p class="mt-4 mb-2 text-subtitle">助力产品二创加速</p>
                <p class="my-1">第一步：上传一张主体产品或场景图片</p>
                <p class="my-1">第二步：上传材质贴图</p>
                <p class="my-1">第三步：把这些工作交给AI，您只需等待结果</p>
            </v-card-text>
        </v-card>
        <v-card v-if="results.length>0" class="mt-2 flex flex-wrap">
            <div class="m-3 relative" v-for="r, index in results" style="width: 120px; height: 120px; overflow: hidden;">
                <img @click="showPreview(results.map(x=>x.fileUrl),index)" :src="r.fileUrl" fit="cover">
                </img>
            </div>
        </v-card>
        <div class="flex flex-wrap mt-2 justify-between">
            <ImageInput @on-selected="(url) => submitParams.nodeInfoList[0].fieldValue = url" max-width="375px" class="w-full mb-1"
                type="url" title="主体原图" enter card></ImageInput>
            <ImageInput :data="materiaImages" @on-selected="(url) => submitParams.nodeInfoList[1].fieldValue = url" max-width="375px" class="w-full mb-1"
                type="url" title="材质贴图" enter card></ImageInput>
        </div>
        <v-card class="mt-2">
            <v-card-text>
                <v-text-field v-model="submitParams.nodeInfoList[2].fieldValue" label="请输入主体名称（多个主体情况下指定换材质的主体）可不输入"
                    variant="outlined" class="my-4">
                    <template v-slot:append-inner>
                        <v-btn @click="run" color="primary" class="ml-4">换材质</v-btn>
                    </template>
                </v-text-field>
            </v-card-text>
        </v-card>
    </v-container>
    <ImagePreview ref="previewRef" />
</template>

<script lang="ts" setup>
import { getMyHistory, getTaskList, getWorkflowResult, runWorkflow } from '@/api/workflow';
import ImageInput from './Components/ImageInput.vue';
import AnimaitonCss03 from '@/components/animations/AnimaitonCss03.vue';
import ImagePreview from "@/components/ImagePreviewNew.vue";

const running = ref(false)
const runtimeToFnished = ref(1)
const checkTask = ref("")
const isFinished = ref(false)
const results = ref<any>([])
const lastTask = ref()

const submitParams = ref<any>({
    "workflowId": "1864160221366255618",
    "nodeInfoList": [
        {
            "name": "原图",
            "nodeId": "201",
            "fieldName": "image",
            "fieldValue": "http://yorolook.com/upload/202207/28/202207281136314404.jpg"
        },
        {
            "name": "材质贴图",
            "nodeId": "202",
            "fieldName": "image",
            "fieldValue": "http://yorolook.com/upload/202307/07/202307071413386980.png"
        },
        {
            "name": "主体描述（多主体下需要表明需要被更换的主体）",
            "nodeId": "297",
            "fieldName": "text",
            "fieldValue": ""
        }
    ],
    "runtime": 240
})

const materiaImages = ["/materia_img/无缝灰色纯色布纹壁纸ID101469958.jpg","/materia_img/102454165.jpg ","/materia_img/104154887.jpg","/materia_img/105137188.jpg ","/materia_img/105730404.png ","/materia_img/107173802.jpg ","/materia_img/108682129布纹.jpg ","/materia_img/110838589木饰面.jpg ","/materia_img/111365222.jpeg","/materia_img/114905279.jpg ","/materia_img/115365768棉麻布料b.jpg ","/materia_img/116282827奶油白细纹墙布壁纸无缝贴图.jpg ","/materia_img/117391908木材木纹.jpg ","/materia_img/AL1216-1600X2300.jpg ","/materia_img/CT_地毯240227.png ","/materia_img/jhk-1698916619840.jpg ","/materia_img/jhk-1725530763467.jpg ","/materia_img/白色大理石瓷砖ID104154622.jpg ","/materia_img/瓷砖ID115819598.jpg ","/materia_img/大理石231221.png ","/materia_img/大理石ID107955727.jpg ","/materia_img/地毯231215.jpg ","/materia_img/黑色大理石ID110969783.jpg ","/materia_img/画02.png ","/materia_img/画03.png ","/materia_img/灰地砖0612a_四块.jpg ","/materia_img/灰地砖0612b_四块.jpg ","/materia_img/咖啡色皮革ID109134719.jpg ","/materia_img/木饰面_231205H.jpg ","/materia_img/木饰面_231205L.jpg ","/materia_img/木饰面_240510_天元.jpg ","/materia_img/木饰面_黑色胡桃木纹ID102715450.jpg ","/materia_img/木饰面_花样年0612.jpg ","/materia_img/木饰面_花样年0612b.jpg ","/materia_img/企业微信截图_17333007304405.png ","/materia_img/绒布毛毯ID105530018.jpg","/materia_img/石材230515111431759.jpg"]

const run = async () => {
    running.value = true
    const res = await runWorkflow(submitParams.value)
    const intevalId = setInterval(async () => {
        const res2 = await getWorkflowResult(res.data.data?.taskId)
        if (res2.data.data?.length > 0) {
            clearInterval(intevalId)
            if (res2.data.data?.length > 0) {
                finished(res2.data.data)
            }
        }
    }, 5000);
    runtimeToFnished.value = 1
    setInterval(() => {
        runtimeToFnished.value += 1
    }, 1000);
}

const clear = () => {
    checkTask.value = ""
    running.value = false
    isFinished.value = false
    results.value = []
    location.href = "/ai/tempshow"
}

const finished = (data) => {
    running.value = false
    isFinished.value = true
    results.value = data
}

const previewRef = ref()
const showPreview = (imgs: string[], index: number) => {
    previewRef.value?.open(imgs, index)
}

onMounted(async () => {

    const { data } = await getTaskList()

    if (data.data.records?.length > 0) {
        lastTask.value = data.data.records[0]
        checkTask.value = lastTask.value.taskId
        runtimeToFnished.value = parseInt(lastTask.value.taskExecutedTime)|1
        if(lastTask.value.taskStatus==="RUNNING") {
            running.value = true
        }

        const intevalId = setInterval(async () => {
            const res2 = await getWorkflowResult(lastTask.value.taskId)
            if (res2.data.data?.length > 0) {
                clearInterval(intevalId)
                if (res2.data.data?.length > 0) {
                    finished(res2.data.data)
                }
            }
        }, 3000);
    }
})
</script>

<style scoped lang="scss">
.container {
    max-width: 800px;
}

.box {
    background: rgba($color: #fff, $alpha: 0.5);
    color: #fff;
}
</style>