<template>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
        <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-carousel v-model="currentIndex" height="calc(100vh - 128px)" hide-delimiter-background :show-arrows="images.length>1 ? 'hover' : false">
            <v-carousel-item v-for="(image, index) in images" :key="index">
                <v-img :src="image" :alt="image || '图片'" contain :style="imageStyle" class="image-preview"></v-img>
            </v-carousel-item>
        </v-carousel>
        <v-card-actions class="flex justify-center align-center">
            <v-btn icon @click="zoomIn">
                <v-icon>mdi-magnify-plus-outline</v-icon>
            </v-btn>
            <v-btn icon @click="zoomOut">
                <v-icon>mdi-magnify-minus-outline</v-icon>
            </v-btn>
            <v-btn icon @click="rotate">
                <v-icon>mdi-rotate-right</v-icon>
            </v-btn>
            <v-btn icon @click="resetZoom">
                <v-icon>mdi-fit-to-screen-outline</v-icon>
            </v-btn>
            <v-btn icon :disabled="images.length<=1" @click="prevImage">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn icon :disabled="images.length<=1" @click="nextImage">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn icon @click="downloadImage">
                <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon @click="copyImageUrl">
                <v-icon>mdi-content-copy</v-icon>
            </v-btn>
        </v-card-actions>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const dialog = ref(false)
const currentIndex = ref(0)
const scale = ref(1)
const rotation = ref(0)
const images = ref<string[]>([])

const imageStyle = computed(() => ({
    transform: `scale(${scale.value}) rotate(${rotation.value}deg)`,
    transition: 'transform 0.3s ease'
}))

const zoomIn = () => {
    scale.value = Math.min(scale.value + 0.1, 3)
}

const zoomOut = () => {
    scale.value = Math.max(scale.value - 0.1, 0.1)
}

const rotate = () => {
    rotation.value = (rotation.value + 90) % 360
}

const resetZoom = () => {
    scale.value = 1
    rotation.value = 0
}

const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
}

const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
}

const downloadImage = () => {
    const image = images.value[currentIndex.value]
    const link = document.createElement('a')
    link.href = image
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const copyImageUrl = () => {
    const image = images.value[currentIndex.value]
    navigator.clipboard.writeText(image).then(() => {
        // 可以在这里添加一个成功提示
        console.log('图片URL已复制到剪贴板')
    })
}

// 暴露方法给父组件
defineExpose({
    open: (imgs: string[], index: number = 0) => {
        images.value = imgs
        dialog.value = true
        currentIndex.value = index
    }
})
</script>

<style scoped>
.image-preview {
    max-height: calc(100vh - 128px);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>