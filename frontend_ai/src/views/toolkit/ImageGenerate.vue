<script setup lang="ts">
import MJControl from './Components/MJControl.vue';
import FLUXControl from './Components/FLUXControl.vue';

import TaskList from './Components/TaskList.vue';

const taskListRef = ref()
const controlRef = ref()
const control = ref("")

const onMJControlPosted = (data: any) => {
  taskListRef.value?.add(data)
}
const onPaint = (task: ITask<any, any>, action: string) => {
  controlRef.value?.setInpaintTask(task, action)
}
const changeModel = () => {
  localStorage.setItem("defaultGenerateModel", control.value)
}

onBeforeMount(() => {
  control.value = localStorage.getItem("defaultGenerateModel")?.toString() || ""
})
</script>

<template>
  <div class="generate-area pa-6">
    <div class="control-panel">
      <v-card width="100%">
        <v-tabs v-model="control" @update:model-value="changeModel">
          <v-tab text="MJ" value="MJ"></v-tab>
          <v-tab text="FLUX" value="FLUX"></v-tab>
        </v-tabs>
      </v-card>
      <div class="position-relative top-0">
        <v-card>
          <MJControl v-if="control === 'MJ'" ref="controlRef" @on-posted="onMJControlPosted" />
          <FLUXControl v-if="control === 'FLUX'" ref="controlRef" @on-posted="onMJControlPosted" />
        </v-card>
      </div>
    </div>
    <div class="task-panel">
        <TaskList @on-paint="onPaint" ref="taskListRef"></TaskList>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.generate-area {
  display: flex;
  flex-wrap: wrap;

  .control-panel {
    max-width: 450px;
    width: 100%;
  }
  .task-panel{
    margin-left: 1rem;
    width: calc(100% - 450px - 1rem);
  }
}

@media screen and (max-width: 750px) {
  .generate-area{
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