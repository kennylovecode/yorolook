<template>
    <v-card class="m-4 gradient-card" rounded="lg" elevation="4">
        <v-card-text class="text-center py-16">
            <h1 class="text-h3 font-weight-bold text-white mb-4">
                让创意照进现实
            </h1>
            <p class="text-subtitle-1 text-white">
                彻底改变您的工作方式，让AI为您提高效率，释放您的创造潜能
            </p>
        </v-card-text>
    </v-card>
    <v-container fluid class="pa-4 bg-background">
        <v-card-title class="text-h5 font-weight-bold mb-4 ml-0">
            {{ $t('frequently_used') }}
        </v-card-title>
        <v-row>
            <v-col v-for="tool in frequentTools" :key="tool.key" cols="12" sm="6" md="4" lg="2" xl="2">
                <v-card class="tool-card" elevation="2">
                    <v-card-text class="d-flex align-center pa-4">
                        <div class="tool-icon-wrapper mr-2">
                            <v-icon size="36" :color="tool.iconColor">{{ tool.icon }}</v-icon>
                        </div>
                        <div class="tool-text-wrapper">
                            <h3 class="text-subtitle-1 font-weight-medium mb-1 text-truncate">{{ $t(tool.key) }}</h3>
                            <p class="text-caption mb-0 text-truncate">{{ $t(`${tool.key}_desc`) }}</p>
                        </div>
                    </v-card-text>
                    <ImageCompare v-if="props.showImage && tool.before && tool.after" :beforeImage="tool.before" :afterImage="tool.after"
                        class="mt-2" />
                </v-card>
            </v-col>
        </v-row>

        <v-card-title class="text-h5 font-weight-bold mb-4 mt-8">
            {{ $t('suggested_tools') }}
        </v-card-title>
        <v-row>
            <v-col v-for="tool in suggestedTools" :key="tool.key" cols="12" sm="6" md="4" lg="2" xl="2">
                <v-card class="tool-card" elevation="2">
                    <v-card-text class="d-flex align-center pa-4">
                        <div class="tool-icon-wrapper mr-2">
                            <v-icon size="36" :color="tool.iconColor">{{ tool.icon }}</v-icon>
                        </div>
                        <div class="tool-text-wrapper">
                            <h3 class="text-subtitle-1 font-weight-medium mb-1 text-truncate">
                                {{ $t(tool.key) }}
                            </h3>
                            <p class="text-caption mb-0 text-truncate">
                                {{ $t(`${tool.key}_desc`) }}
                            </p>
                        </div>
                    </v-card-text>
                    <ImageCompare v-if="props.showImage && tool.before" :beforeImage="tool.before" :afterImage="tool.after" class="mt-2" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ImageCompare from './ImageCompare.vue'

const props = defineProps<{
    showImage: boolean
}>()

const frequentTools = ref([
    {
        key: 'region_inpaint',
        before: 'https://picsum.photos/id/1018/600/400',
        after: 'https://picsum.photos/id/1015/600/400',
        icon: 'mdi-brush',
        iconColor: 'primary'
    },
    {
        key: 'hd_upscale',
        before: 'https://picsum.photos/id/1019/600/400',
        after: 'https://picsum.photos/id/1016/600/400',
        icon: 'mdi-high-definition',
        iconColor: 'secondary'
    }
])

const suggestedTools = ref([
    {
        key: 'sketch_rendering',
        before: 'https://picsum.photos/id/1020/600/400',
        after: 'https://picsum.photos/id/1024/600/400',
        icon: 'mdi-home-variant',
        iconColor: 'success'
    },
    {
        key: 'consistency_rendering',
        before: 'https://picsum.photos/id/1021/600/400',
        after: 'https://picsum.photos/id/1025/600/400',
        icon: 'mdi-cube-outline',
        iconColor: 'info'
    },
    {
        key: 'hd_upscale',
        before: 'https://picsum.photos/id/1022/600/400',
        after: 'https://picsum.photos/id/1026/600/400',
        icon: 'mdi-high-definition',
        iconColor: 'warning'
    },
    {
        key: 'region_inpaint',
        before: 'https://picsum.photos/id/1023/600/400',
        after: 'https://picsum.photos/id/1027/600/400',
        icon: 'mdi-brush',
        iconColor: 'error'
    },
    {
        key: 'outpainting',
        before: 'https://picsum.photos/id/1028/600/400',
        after: 'https://picsum.photos/id/1029/600/400',
        icon: 'mdi-arrow-expand-all',
        iconColor: 'primary'
    },
    {
        key: 'partial_sketch_rendering',
        before: 'https://picsum.photos/id/1030/600/400',
        after: 'https://picsum.photos/id/1031/600/400',
        icon: 'mdi-pencil-box-outline',
        iconColor: 'secondary'
    },
    {
        key: 'image_to_video',
        before: 'https://picsum.photos/id/1032/600/400',
        after: 'https://picsum.photos/id/1033/600/400',
        icon: 'mdi-video',
        iconColor: 'success'
    },
    {
        key: 'workflow',
        before: 'https://picsum.photos/id/1033/600/400',
        icon: 'mdi-arrow-right',
        iconColor: 'info'
    }
])

// i18n resources
const resources = {
    zhCN: {
        frequently_used: '您常用的',
        suggested_tools: '您可能想试试',
        region_inpaint: '涂抹替换',
        region_inpaint_desc: '选取需要修改局部,写上需要替换的内容即可',
        sketch_rendering: '草图渲染',
        sketch_rendering_desc: '上传手绘设计草图,照片或建模软件的截图,生成逼真的照片级渲染效果.',
        consistency_rendering: '一致性渲染',
        consistency_rendering_desc: '探索PromeAI强大的一致性模型功能,仅用一张图片或一句提示示词就绘视觉上一致的AI模型.',
        hd_upscale: '高清放大',
        hd_upscale_desc: '体验惊人的高清晰度提升,不仅放大,还增强内容,修复损坏元素,并添加更多细节!',
        outpainting: '尺寸外扩',
        outpainting_desc: '根据比例或尺寸进行图片内容扩充.',
        partial_sketch_rendering: '局部草图渲染',
        partial_sketch_rendering_desc: '上传一张底图,对要修改的区域进行涂抹,并上传另一张图像作为控制画进行细节替换.',
        image_to_video: '图生视频',
        image_to_video_desc: '上传你喜欢的图片,快速转化为高质量的视频.',
        workflow: '工作流',
        workflow_desc: '创建和管理自定义的AI图像处理工作流程.'
    },
    enUS: {
        frequently_used: 'Frequently Used',
        suggested_tools: 'You Might Want to Try',
        region_inpaint: 'Region Inpainting',
        region_inpaint_desc: 'Select the area you want to modify and describe the desired replacement content.',
        sketch_rendering: 'Sketch to Image',
        sketch_rendering_desc: 'Upload hand-drawn sketches, photos, or software screenshots to generate photorealistic renders.',
        consistency_rendering: 'Consistency Rendering',
        consistency_rendering_desc: 'Explore PromeAI\'s powerful consistency model - create visually consistent AI models with just one image or prompt.',
        hd_upscale: 'HD Upscaling',
        hd_upscale_desc: 'Experience amazing high-definition enhancement - not just upscaling, but also content enhancement and detail restoration!',
        outpainting: 'Outpainting',
        outpainting_desc: 'Expand image content based on proportions or dimensions.',
        partial_sketch_rendering: 'Partial Sketch Rendering',
        partial_sketch_rendering_desc: 'Upload a base image, paint the area to modify, and use another image as control for detailed replacement.',
        image_to_video: 'Image to Video',
        image_to_video_desc: 'Upload your favorite images and quickly convert them into high-quality videos.',
        workflow: 'Workflow',
        workflow_desc: 'Create and manage custom AI image processing workflows.'
    }
}

// Simulated i18n function (replace with your actual i18n implementation)
const $t = (key) => {
    // You can switch between 'zhCN' and 'enUS' here
    const currentLocale = 'zhCN'
    return resources[currentLocale][key] || key
}
</script>

<style scoped>
.tool-card {
    transition: all 0.3s ease;
    height: 100%;
}

.tool-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.tool-icon-wrapper {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tool-text-wrapper {
    width: 75%;
    padding-left: 8px;
}

.v-card-text {
    padding: 16px;
}

.gradient-card {
    background: linear-gradient(90deg, #E94E8C 0%, #A054C2 100%) !important;
    border-radius: 24px !important;
}

.v-card-title{
    padding-left: 0;
}
</style>