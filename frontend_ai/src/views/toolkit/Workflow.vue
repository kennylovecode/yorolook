<script setup lang="ts">
import { useSnackbarStore } from '~/src/stores/snackbarStore';
import WF_RH_Control from './Components/Workflow/WF_RH_Control.vue';
import { getMyHistory, getOpenSamples, getWorkflowList } from '@/api/workflow';
import { ISample, IWorkflow } from '@/api/types/workflow';
import ImagePreview from "@/components/ImagePreviewNew.vue";

const snackbarStore = useSnackbarStore()
const workflows = ref<IWorkflow[]>([
    {
        id: '1864160221366255618',
        name: '一键更换材质',
        desc: '一键更换材质',
        systemWorkflow: false,
        owner: undefined,
        preview: undefined,
        statisticsInfo: {
            "likeCount": 0,
            "downloadCount": 0,
            "useCount": 12,
            "pv": "0"
        },
        nodeCount: 0,
        liked: 0,
        covers: [{
            "id": "1864154944700891138",
            "objName": null,
            "url": "/change1234.png",
            "thumbnailUri": "/change1234.png",
            "imageWidth": "1596",
            "imageHeight": "652"
        }],
        tags: [],
        publishTime: '',
        timestamp: '',
        labels: ''
    }
])
const openSamples = ref<ISample[]>([])
const currentSample = ref<ISample | null>(null)
const currentTitle = ref<string>("")
const history = ref<any[]>([])
const historyDrawer = ref(false)
const runDialog = ref(false)

const openWorkflow = (item: IWorkflow) => {
    const realSample = openSamples.value.find(x => x.workflowName.indexOf(item.id) > -1)
    if (realSample) {
        currentTitle.value = item.name
        currentSample.value = realSample
        runDialog.value = true
    }
    else snackbarStore.showInfoMessage("暂未开放，敬请期待~")
}

const closeRunDialog = () => {
    currentTitle.value = ''
    currentSample.value = null
    runDialog.value = false
}
const runFinish = async () => {
    runDialog.value = false
    const res3 = await getMyHistory()
    if (res3.data?.data) {
        const { records, total, hasNext, hasPrevious } = res3.data.data
        history.value = records
    }
}

const previewRef = ref()
const showPreview = (imgs: string[], index: number) => {
    previewRef.value?.open(imgs, index)
}

onMounted(async () => {

    const res2 = await getOpenSamples()
    if (res2.data?.data) {
        openSamples.value = res2.data.data
    }

    const res = await getWorkflowList(["1795372168234749962"])
    if (res.data?.data) {
        const { records, total, hasNext, hasPrevious } = res.data.data
        workflows.value = workflows.value.concat(records.filter(x => {
            console.log(x.id)
            if (JSON.stringify(openSamples.value).indexOf(x.id) > -1) return x
        }))
    }

    const res3 = await getMyHistory()
    if (res3.data?.data) {
        const { records, total, hasNext, hasPrevious } = res3.data.data
        history.value = records
    }
})
</script>
<template>
    <v-container :key="workflows.length" fluid>
        <v-card class="mb-6 pa-3">
            <div class="workflow flex w-full justify-between"><span>历史任务</span>
                <v-btn variant="text" @click="historyDrawer = true">更多>></v-btn>
            </div>
            <div class="history flex">
                <v-card class="mr-3" v-for="(item, index) in history" :key="index">
                    <v-img :src="item.filePreviewUrl" width="80" height="80" cover class="rounded"
                        @click="showPreview(history.map(x => x.fileUrl), index)"></v-img>
                </v-card>
            </div>
        </v-card>
        <masonry-wall :column-width="300" :items="(workflows as any[])" :ssr-columns="1" :min-columns="1"
            :max-columns="6" :gap="20">
            <template #default="{ item: item }">
                <v-card @click="openWorkflow(item)" elevation="2"
                    class="group block relative overflow-hidden rounded-xl cursor-pointer">
                    <div v-if="item.labels === 'RECOMMEND'" class="absolute z-10 top-0 right-4 recommend"><img
                            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20fill='none'%20version='1.1'%20width='30'%20height='60'%20viewBox='0%200%2030%2060'%3e%3cg%3e%3cg%3e%3cpath%20d='M0,2L0,55.7064C0,57.406,1.98573,58.331,3.28682,57.2375L14.4726,47.8359C15.2486,47.1837,16.3899,47.2152,17.1287,47.9093L26.6307,56.835C27.9075,58.0344,30,57.1291,30,55.3773L30,2C30,0.895431,29.1046,0,28,0L2,0C0.895431,0,0,0.895431,0,2Z'%20fill='%23F03737'%20fill-opacity='1'/%3e%3c/g%3e%3cg%3e%3cpath%20d='M0,55.7299C0,57.4256,1.97771,58.3519,3.28037,57.2664L29.2804,35.5997C29.7364,35.2197,30,34.6568,30,34.0633L30,2C30,0.895431,29.1046,0,28,0L2,0C0.895431,0,0,0.895431,0,2L0,55.7299Z'%20fill='%23F85959'%20fill-opacity='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e">
                        <span class="absolute top-0 left-[7px]">推荐</span>
                    </div>
                    <v-img :src="item.covers[0].thumbnailUri" cover
                        class="relative bg-lighter max-h-[580px] min-h-[200px] transition-transform object-cover duration-500 group-hover:scale-110">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                    <div class="absolute w-full p-4 group-hover:bg-gradient-to-b from-black/0 to-black/50"
                        style="bottom: 0px;">
                        <div class="flex mt-[10px]">
                            <div class="flex items-center flex-1 w-[100px]">
                                <span
                                    class="text-base text-white font-bold text-ellipsis whitespace-nowrap overflow-hidden drop-shadow">
                                    {{ item.name }}
                                </span>
                            </div>
                            <div class="flex flex-shrink-0 w-[40px] ml-4">
                                <div class="flex items-center ml-[6px]"><v-icon size="18px">mdi-eye</v-icon><span
                                        class="ml-[2px] text-tiny text-white whitespace-nowrap">{{
                                            item.statisticsInfo.useCount }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card>
            </template>
        </masonry-wall>
        <v-navigation-drawer location="right" v-model="historyDrawer" :width="320" mobile>
            <v-list-item title="历史任务" class="mb-2">
                <template v-slot:prepend>
                    <v-icon @click="historyDrawer = false">mdi-format-list-bulleted-square</v-icon>
                </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-list density="compact" nav>
                <v-list-item v-for="task in history" :key="task.id" :value="task" class="py-2 flex flex-wrap">
                    <v-list-item-title>{{ task.workflowName }}</v-list-item-title>
                    <v-list-item-subtitle>
                        taskid: {{ task.taskId }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        运行时长: {{ task.taskCostTime }}
                    </v-list-item-subtitle>
                    <template v-slot:prepend>
                        <v-img :src="task.filePreviewUrl" width="280px" cover class="rounded"></v-img>
                    </template>
                    <template v-slot:append>
                        <v-btn prepend-icon="mdi-download" variant="text" color="grey-lighten-1" class="me-2">下载</v-btn>
                        <v-btn prepend-icon="mdi-delete" variant="text" color="grey-lighten-1">删除</v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-dialog v-model="runDialog" location="center" max-width="500">
            <div class="generate-area">
                <div class="control-panel">
                    <v-card height="100%">
                        <v-card-text>
                            <WF_RH_Control :title="currentTitle" :item="currentSample" @close="closeRunDialog()"
                                @finished="runFinish" />
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </v-dialog>
    </v-container>
    <ImagePreview ref="previewRef" />
</template>

<style scoped lang="scss">
.control {
    padding: 5px 25px;
    background: rgba($color: #fff, $alpha: .7);
    width: 100%;
}

.deme_images {
    display: flex;
    justify-content: flex-start;
    height: 200px;
}

.generate-area {
    display: flex;
    flex-wrap: wrap;

    .control-panel {
        max-width: 450px;
        width: 100%;
    }

    .task-panel {
        margin-left: 1rem;
        width: calc(100% - 450px - 1rem);
    }
}

@media screen and (max-width: 750px) {
    .generate-area {
        .control-panel {
            max-width: 100%;
            width: 100%;
        }

        .task-panel {
            margin: 2rem 0;
            width: 100%;
        }
    }
}
</style>
