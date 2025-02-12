<script lang="ts" setup>
import {
    promptRecommendStyles,
    promptRecommendAngles,
    promptRecommendCameras,
    promptRecommendElements,
    promptRecommendLights,
    promptRecommendWords,
} from '@/api/toolkit'
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()

const props = defineProps<{
    name: string
}>()

const recommends = ref<any[]>([])

const emits = defineEmits(["selected"])
const buildPrompt = (item: any)=>{
    emits("selected",` ${props.name} ${item.enUS_name},`) 
}

onBeforeMount(() => {
    switch (props.name) {
        case 'style':
            recommends.value = promptRecommendStyles
            break
        case 'angle':
            recommends.value = promptRecommendAngles
            break
        case 'camera':
            recommends.value = promptRecommendCameras
            break
        case 'light':
            recommends.value = promptRecommendLights
            break
        case 'words':
            recommends.value = promptRecommendWords
            break
        case 'element':
            recommends.value = promptRecommendElements
            break
        default:
            recommends.value = []
    }
})
</script>
<template>
    <v-tooltip v-if="locale==='cn'" v-for="item in recommends" :text="item.zhCN_description||item.zhCN_name" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn @click="buildPrompt(item)" class="mx-1 my-2" v-bind="props">
                {{ item.zhCN_name }}
            </v-btn>
        </template>
    </v-tooltip>
    <v-tooltip v-else v-for="item in recommends" :text="item.enUS_description||item.enUS_name" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn @click="buildPrompt(item)" class="mx-1 my-2" v-bind="props">
                {{ item.enUS_name }}
            </v-btn>
        </template>
    </v-tooltip>
</template>
