<template>
    <div class="image-compare" ref="container">
      <div class="image-wrapper">
        <img :src="beforeImage" alt="Before" class="image before-image" />
        <img v-if="afterImage" :src="afterImage" alt="After" class="image after-image" />
      </div>
      <div 
      v-if="afterImage"
        class="slider" 
        :style="{ left: `${sliderPosition}%` }"
        @mousedown="startDragging"
        @touchstart="startDragging"
      >
        <div class="slider-line"></div>
        <div class="slider-button">
          <v-icon>mdi-arrow-left-right</v-icon>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    beforeImage: {
      type: String,
      required: true
    },
    afterImage: {
      type: String,
      required: true
    }
  });
  
  const container = ref(null);
  const sliderPosition = ref(50);
  let isDragging = false;
  
  const startDragging = (event) => {
    event.preventDefault();
    isDragging = true;
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);
  };
  
  const stopDragging = () => {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', stopDragging);
    document.removeEventListener('touchend', stopDragging);
  };
  
  const drag = (event) => {
    if (!isDragging) return;
    const containerRect = container.value.getBoundingClientRect();
    const containerWidth = containerRect.width;
    let clientX;
  
    if (event.type === 'touchmove') {
      clientX = event.touches[0].clientX;
    } else {
      clientX = event.clientX;
    }
  
    const newPosition = ((clientX - containerRect.left) / containerWidth) * 100;
    sliderPosition.value = Math.max(0, Math.min(100, newPosition));
  };
  
  onMounted(() => {
    window.addEventListener('resize', updateSliderPosition);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateSliderPosition);
  });
  
  const updateSliderPosition = () => {
    // Recalculate slider position on window resize
    const containerRect = container.value.getBoundingClientRect();
    const containerWidth = containerRect.width;
    sliderPosition.value = (sliderPosition.value / 100) * containerWidth;
  };
  </script>
  
  <style scoped>
  .image-compare {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
  
  .image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .after-image {
    clip-path: inset(0 0 0 var(--clip-position));
  }
  
  .slider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: white;
    cursor: ew-resize;
  }
  
  .slider-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  
  .slider-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background-color: white;
    transform: translateX(-50%);
  }
  </style>