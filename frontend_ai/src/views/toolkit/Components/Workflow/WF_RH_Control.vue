<script setup lang="ts">
import ImageInput from '../ImageInput.vue';
import paramsFinder from '@/data/workflow.json'
import { ISample } from '@/api/types/workflow';
import AnimaitonCss01 from '@/components/animations/AnimaitonCss02.vue';
import { getWorkflowResult, runWorkflow } from '@/api/workflow'
import { useSnackbarStore } from '~/src/stores/snackbarStore';

const props = defineProps<{
    item: ISample | null
    title: string
}>()
const snackbarStore = useSnackbarStore()
const submitParams = ref<any>({})
const running = ref(false)

const emits = defineEmits(["close", "running", "finished"])
const close = () => {
    if(running.value) return snackbarStore.showWarningMessage("任务进行中~")
    emits("close")
}

const run = async () => {
    running.value = true
    emits("running")
    const res = await runWorkflow(submitParams.value)
    const intevalId = setInterval(async () => {
        const res2 = await getWorkflowResult(res.data.data?.taskId)
        if (res2.data.data?.length>0) {
            clearInterval(intevalId)
            running.value = false
            emits("finished", res)
        }
    }, 2000);
}

onBeforeMount(() => {
    submitParams.value = paramsFinder.find(item => item.workflowId === props.item?.id)
})

</script>
<template>
    <v-container v-if="!running" class="pa-0" fluid>
        <div class="flex justify-between items-center">
            <v-btn @click="close" size="small">返回主页</v-btn>
            <p class="font-weight-medium text-subtitle">{{ props.title }}</p>
        </div>
        <v-card-text v-if="submitParams">
            <template v-for="node, index in submitParams.nodeInfoList">
                <div v-if="node.fieldName === 'image'">
                    <v-label class="font-weight-medium text-subtitle-2">
                        {{ node.name }}
                    </v-label>
                    <image-input :enter="true" type="url" :url="node.fieldValue"
                        @on-selected="(url) => node.fieldValue = url"></image-input>
                </div>
                <div v-if="node.fieldName === 'text'||node.fieldName === 'string'">
                    <v-label class="font-weight-medium text-subtitle-2">
                        {{ node.name }}
                    </v-label>
                    <v-textarea min-rows="3" v-model="node.fieldValue" color="primary" density="compact" type="text" placeholder="John Deo" hide-details />
                </div>
            </template>
            <v-btn style="margin-top: 1rem;" size="x-large" color="primary" block @click="run()">
                200 Y{{ $t("system.coin") }} / 运行工作流
            </v-btn>
        </v-card-text>
    </v-container>
    <v-container v-else class="pa-0" fluid>
        <animaiton-css01></animaiton-css01>
    </v-container>
</template>