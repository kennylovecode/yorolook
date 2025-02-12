<template>
    <div class="replace-com">
        <div class="image-preview">
            <div class="draw-box">
                <img id="target-source" @load="imgLoad" :src="props.imageUrl" alt="">
            </div>
        </div>
        <canvas ref="canvasArea" :key="`canvas_${canvas.width}_${canvas.height}`" id="drawing" :width="canvas.width"
            :height="canvas.height">
        </canvas>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, nextTick } from 'vue'
const canvasArea = ref({});
const canvas = reactive({
    width: 300,
    height: 300
})

const props = defineProps({
    imageUrl: '',
})

let selectionBoxIndex = ref(0);

onMounted(() => {

})

var intervalLimit = {};
///操作图加载完成后触发定时器
const imgLoad = () => {
    intervalLimit = setInterval(()=>{
        let target = document.querySelector('#target-source');
        //设置与图片宽高一致的canvas
        canvas.width = target.clientWidth;
        canvas.height = target.clientHeight;
        if(canvas.width>0)
        {
            drawCanvasBackground();
            startDraw();
            clearInterval(intervalLimit);
        }
    },1000)
}

const startDraw = () => {
    // 获取元素
    const drawBox = document.querySelector('.draw-box')
    const img = document.querySelector('#target-source')

    // 定义变量
    let isDragging = false
    let startX, startY, endX, endY;
    let currentSelectBox = {};
    function onMouseUp(e) {
        // 取消拖拽标志
        isDragging = false
        if (currentSelectBox) {
            var remove = currentSelectBox.clientWidth < 30 && currentSelectBox.clientHeight < 30;
            remove = remove && (currentSelectBox.clientWidth <= 5 || currentSelectBox.clientHeight == 5);
            if (remove)
                currentSelectBox.remove();
            else {
                var closeBtn = document.createElement('span');
                closeBtn.innerText = "X";
                closeBtn.setAttribute('data-id', currentSelectBox.id);
                closeBtn.addEventListener('click', (e) => {
                    var box = document.querySelector('#' + e.target.getAttribute('data-id'));
                    drawCanvasBox(box.offsetLeft, box.offsetTop, box.clientWidth, box.clientHeight, 'rgba(0,0,0,1)');
                    box.remove();
                });
                currentSelectBox.appendChild(closeBtn);
                drawCanvasBox(currentSelectBox.offsetLeft, currentSelectBox.offsetTop, currentSelectBox.clientWidth, currentSelectBox.clientHeight);
            }
        }
        // 移除 mouseup 事件监听器
        document.removeEventListener('mouseup', onMouseUp)
    }

    // 监听鼠标事件
    img.addEventListener('mousedown', e => {
        // 禁止默认行为
        e.preventDefault()
        // 设置拖拽标志
        isDragging = true
        // 获取起始坐标
        startX = e.offsetX
        startY = e.offsetY
        // 创建新的 selection-box 元素
        const selectionBox = document.createElement('div')
        // 设置唯一标识符
        const selectionBoxId = `selection-box-${selectionBoxIndex.value}`
        selectionBox.setAttribute('id', selectionBoxId)
        selectionBox.classList.add('selection-box')
        // 添加到 draw-box 中
        drawBox.appendChild(selectionBox)
        // 增加索引号
        selectionBoxIndex.value++
        currentSelectBox = selectionBox;
        document.addEventListener('mouseup', onMouseUp)
    })

    img.addEventListener('mousemove', e => {
        // 如果没有拖拽，则返回
        if (!isDragging)
            return
        // 获取结束坐标
        endX = e.offsetX
        endY = e.offsetY
        // 获取当前的 selection-box 元素
        const selectionBox = document.querySelector(`#selection-box-${selectionBoxIndex.value - 1}`)
        // 计算选择框的位置和大小
        const x = Math.min(startX, endX)
        const y = Math.min(startY, endY)
        const width = Math.abs(endX - startX)
        const height = Math.abs(endY - startY)
        // 更新选择框的样式
        selectionBox.style.left = x + 'px'
        selectionBox.style.top = y + 'px'
        selectionBox.style.width = width + 'px'
        selectionBox.style.height = height + 'px'
    })
}

//画上canvas的黑色背景
const drawCanvasBackground = async () => {
    nextTick(() => {
        let drawArea = canvasArea.value;
        let context = drawArea.getContext('2d')
        context.beginPath()
        context.fillStyle = "rgba(0,0,0,1)"
        context.fillRect(0, 0, canvas.width, canvas.height)
    })
}

//在canvas上画上相应的区域，用作遮罩图的生成
const drawCanvasBox = async (x, y, width, height, rgba = 'rgba(255,255,255,1)') => {
    nextTick(() => {
        let drawArea = canvasArea.value;
        let context = drawArea.getContext('2d')
        context.beginPath()
        context.fillStyle = rgba;
        context.fillRect(x, y, width, height);
    })
}

const clearAreas = ()=>{
    document.querySelectorAll('.selection-box').forEach(box => {
        drawCanvasBox(box.offsetLeft, box.offsetTop, box.clientWidth, box.clientHeight, 'rgba(0,0,0,1)');
        box.remove();
    })

    selectionBoxIndex.value = 0;
}

defineExpose({ clearAreas, selectionBoxIndex })

</script>

<style lang="scss" scoped>
.replace-com {
    position: relative;
    .image-preview {
        float: left;

        .draw-box {
            max-width: 100%;
            position: relative;
            font-size: 0;
            margin-bottom: 1rem;
            img {
                max-width: 100%;
                object-fit: scale-down;
            }
        }
    }

    canvas{
        //display: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
}
</style>

<style lang="scss">
.selection-box {
    position: absolute;
    background: rgba(144, 77, 33, .3);
    border: solid 1px #999;

    span {
        position: absolute;
        top: 0;
        right: 0;
        background: rgba($color: #fff, $alpha: .6);
        cursor: pointer;
        font-size: 12px;
        display: block;
        padding: 3px;
        &:hover {
            background: #fff;
        }
    }
}
</style>
