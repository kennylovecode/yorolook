<script setup lang="ts">
import MJControl from './Components/MJControl.vue';
import TaskList from './Components/TaskList.vue';

const taskListRef = ref()
const controlRef = ref()

const onMJControlPosted = (data: any)=>{
  taskListRef.value?.add(data)
}
const onPaint = (task: ITask<any,any>,action: string)=>{
  controlRef.value?.setInpaintTask(task,action)
}
</script>

<template>
  <v-container class="h-full" max-width="100%">
    <v-row class="h-full">
      <v-col cols="6" md="4">
        <div class="h-full position-relative top-0">
          <v-card class="position-absolute top-0 overflow-y-scroll" width="100%" height="100%">
            <MJControl ref="controlRef" @on-posted="onMJControlPosted"/>
          </v-card>
        </div>
      </v-col>
      <v-col cols="18" md="8">
        <v-card class="h-full">
          <TaskList @on-paint="onPaint" ref="taskListRef"></TaskList>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.generate-container {
  width: 80%;
}

.loading {
  display: flex;
  align-items: center;
  background: #f4f4f4;
  flex-wrap: wrap;
  text-align: center;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.op {
  opacity: .1;
  border: solid 1px #fff;
}
</style>
