<template>
    <v-card v-if="props.card" class="pa-4">
        <v-card-title class="text-h6 mb-4">
            传图/图片链接
        </v-card-title>
        <v-card-text>
            <div class="text-body-1 mb-2">{{ props.title }}</div>
            <!-- Image Upload Area -->
            <v-card class="mb-4 pa-6 d-flex flex-column align-center justify-center" v-if="loading">
                <Loading03 v-if="loading" />
            </v-card>
            <v-card v-else class="mb-4 d-flex flex-column align-center justify-center pa-2" width="305px" 
                :class="{ 'hover-effect': true, 'pa-6': !previewFile }" @click="selectFile">
                <v-img v-if="previewFile" :src="previewFile" width="100%" height="150px">
                </v-img>
                <div v-else class="text-center mt-4">
                    <v-icon size="48" color="grey">mdi-image-outline</v-icon>
                    <div>点击或拖拽图片上传</div>
                    <div class="text-caption text-grey">
                        支持上传 jpeg、png、gif、bmp、tiff、最多...
                    </div>
                </div>
                <v-file-input type="file" ref="fileUploadRef" accept="image/*" v-show="false" @change="uploadImage" />
            </v-card>
            <!-- Image URL Input -->
            <v-text-field v-model="previewFile" label="请输入图片链接" variant="outlined" density="comfortable" hide-details
                class="mb-4">
                <template v-slot:append-inner>
                    <v-icon @click="selectFile">mdi-link</v-icon>
                    <v-icon v-if="props.data" @click="showDialog">mdi-image</v-icon>
                </template>
            </v-text-field>
        </v-card-text>
    </v-card>
    <div v-else style="width: 100%; ">
        <v-img @click.prevent="selectFile" min-height="60px" :src="previewFile" :width="props.width || 60"
            :height="props.height || 'auto'" class="my-4 border-sm text-center flex align-center justify-center"
            :class="previewFile ? 'text-white' : ''">
            <template v-slot:default>
                {{ $t('toolkit.upload') }}
            </template>
        </v-img>
        <v-textarea v-if="props.enter" v-model="previewFile" :label="$t('toolkit.imageurl')" :active="true" rows="2"
            :placeholder="$t('toolkit.imageurlplaceholder')">
        </v-textarea>
        <v-file-input v-show="false" ref="fileUploadRef" accept="image/*" @change="uploadImage">
        </v-file-input>
    </div>

    <v-dialog v-model="dataDialogVisible" width="600px">
        <v-card>
            <v-card-text>
                <p class="w-full text-subtitle">选择其中一个材质</p>
                <div class="flex flex-wrap">
                    <img class="m-1" v-for="item in props.data" :src="item" alt="" fit="contain"
                        @click="useUrl(item)"
                        style="width: 60px; height: 60px;" />
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { upload } from '@/api/service';
import Loading03 from '@/components/loading/Loading03.vue';

const loading = ref(false)
const fileUploadRef = ref()
const previewFile = ref("")
const dataDialogVisible = ref(false)

const props = defineProps<{
    type: "upload" | "url" | "base64"
    enter: boolean
    url?: string
    width?: string
    height?: string
    title?: string
    card?: boolean
    data?: any[]
}>()

const selectFile = () => {
    if (fileUploadRef) fileUploadRef?.value.click()
}
const emits = defineEmits(["onSelected"])
const uploadImage = async (event) => {
    loading.value = true
    const formData = new FormData();
    formData.append('files[]', event.target.files[0]);
    if (props.type === 'url') {
        const { data } = await upload<any>({
            baseURL: "/disk",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            url: "/upload_temp",
            method: "post",
            data: formData
        })

        if (data) {
            previewFile.value = `${location.origin}/disk${data}`
        }
    }
    if (props.type === 'base64') {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            console.log(e.target?.result)
            img.src = e.target.result;
            img.onload = function () {
                // 创建一个 canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // 设置目标宽度和高度
                const maxWidth = 500; // 限制最大宽度
                const maxHeight = 500; // 限制最大高度
                let width = img.width;
                let height = img.height;

                // 计算压缩比例
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                // 设置 canvas 尺寸并绘制图像
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // 转换为 Base64
                const base64String = canvas.toDataURL('image/png', 0.7); // 图片格式和质量（0-1）
                previewFile.value = base64String
                emits("onSelected", base64String, event.target.files[0])
            };
        }
        reader.readAsDataURL(event.target.files[0]);
        return
    }

    loading.value = false
}
const useUrl = (url)=>{
    previewFile.value = `${location.origin}${url}`
    emits("onSelected", `${location.origin}${url}`)
    dataDialogVisible.value = false
}

const showDialog = async () => {
    dataDialogVisible.value = true
    
}

watch(previewFile, (val) => {
    emits("onSelected", val)
})

onMounted(() => {
    if (props.url) previewFile.value = props.url
})
</script>