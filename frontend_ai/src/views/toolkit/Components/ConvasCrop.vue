<template>
    <v-dialog v-model="dialogVisible" width="848px" height="1000px">
        <v-card>
            <v-card-text>
                <div v-if="loading">加载中</div>
                <div class="canvas-area">
                    <canvas ref="canvasRef" id="cropCanvas" width="800px" height="800px"></canvas>
                    <img id="showImg" :src="props.img" />
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn variant="flat" color="#666" @click="reloadCanvas">清除</v-btn>
                <v-btn variant="flat" color="primary" @click="finished">完成</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-btn @click="openDialog" size="small" width="100%">涂抹原图修改</v-btn>
    <div class="crop-control">
        <!--img v-for="point in points" id="cropImage" :src="point.base64" alt=""-->
        <img v-if="maskBase64 && props.mask" id="maskImage" :src="maskBase64" alt="">
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

const props = defineProps<{
    img: string
    mask: boolean
    multiple?: boolean
}>()
const emits = defineEmits(["onCroped"])
const dialogVisible = ref(false)
const cropBase64 = ref("")
const maskBase64 = ref("")
const loading = ref(false)
const canvasRef = ref()
const points = ref<{
    startX: number
    startY: number
    width: number
    height: number
    base64: string
}[]>([])

const reloadCanvas = ()=>{
    points.value = []
    maskBase64.value = "";
    cropBase64.value = "";
    nextTick(() => {
        const canvas = document.getElementById('cropCanvas');
        if (!canvas) return
        // if (!props.img) return
        const ctx = canvas.getContext('2d');
        const saveBtn = document.getElementById('saveBtn');
        const preview = document.getElementById('preview');
        let startX, startY, endX, endY;
        let isDrawing = false;

        // const mapImage = document.getElementById('#showImg');
        // const mapImage = new Image();
        // // 替换成您地图的 URL
        // mapImage.src = props.img;
        // // 设置 CORS
        // mapImage.crossOrigin = 'anonymous';
        // mapImage.onload = function () {
        //     ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
        // };

        // 鼠标事件处理
        canvas.addEventListener('mousedown', (e) => {
            startX = e.offsetX;
            startY = e.offsetY;
            isDrawing = true;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                endX = e.offsetX;
                endY = e.offsetY;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                //ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
                // 重新绘制所有已保存的矩形框
                if(props.multiple)
                {
                    for (const rect of points.value) {
                        ctx.strokeStyle = 'red';
                        ctx.strokeRect(rect.startX, rect.startY, rect.width, rect.height);
                    }
                }

                ctx.strokeStyle = 'red';
                ctx.strokeRect(startX, startY, endX - startX, endY - startY);
            }
        });

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            endX = endX || startX;
            endY = endY || startY;

            const width = Math.abs(endX - startX);
            const height = Math.abs(endY - startY);
            const x = Math.min(startX, endX);
            const y = Math.min(startY, endY);
            const imageData = ctx.getImageData(x, y, width, height);
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.putImageData(imageData, 0, 0);
            cropBase64.value = tempCanvas.toDataURL();
            if (props.multiple) {
                points.value.push({
                    startX, startY, width, height,
                    base64: cropBase64.value
                })
            } else {
                points.value[0] = {
                    startX, startY, width, height,
                    base64: cropBase64.value
                }
            }
        });

        loading.value = false
    })
}
const finished = ()=>{
    dialogVisible.value = false
     // 生成遮罩图
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvasRef.value.width;
    maskCanvas.height = canvasRef.value.height;
    const maskCtx = maskCanvas.getContext('2d');

    if (!maskCtx) return
    // 创建遮罩
    maskCtx.fillStyle = 'rgba(0, 0, 0, 1)'; // 黑色填充
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    for (const point of points.value) {
        const { startX, startY, width, height } = point;
        maskCtx.fillStyle = 'rgba(255, 255, 255, 1)'; // 白色填充
        maskCtx.fillRect(startX, startY, width, height); // 清除选定区域
    }
    maskBase64.value = maskCanvas.toDataURL();

    emits("onCroped", points.value, maskBase64.value)
}

const openDialog = () => {
    dialogVisible.value = true
    loading.value = true
    reloadCanvas()
}

onMounted(() => {

})
</script>

<style>
#cropCanvas {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
}

.canvas-area{
    position: relative;
    width: 800px;
    height: 800px;
    img {
        position: absolute;
        width: 800px;
        height: 800px;
    }
}
</style>