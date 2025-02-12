<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">API Task Executor</h1>
    <form class="mb-4">
      <div class="mb-2 grid grid-cols-2 gap-4">
        <div>
          <label for="idx" class="block mb-1">PrefixUrl:</label>
          <input v-model.number="PrefixUrl" id="idx" required class="w-full p-2 border rounded" />
        </div>
        <div>
          <label for="idx" class="block mb-1">Start Index:</label>
          <input v-model.number="currentTaskIndex" id="idx" type="number" required class="w-full p-2 border rounded" />
        </div>
        <div>
          <label for="total" class="block mb-1">Total Tasks:</label>
          <input v-model.number="total" id="total" type="number" class="w-full p-2 border rounded" />
        </div>
      </div>
      <el-button @click="controlPower" :type="isRunning ? 'danger' : 'primary'">
        {{ isRunning ? "Stop Task" : "Start Task" }}
      </el-button>
    </form>
    <div v-if="isRunning" :key="currentTaskIndex + currentTaskId" class="mb-4">
      <p>Current Task: {{ currentTaskIndex }} / {{ total }}</p>
      <p>Status: {{ taskStatus }}</p>
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${progress}%` }" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">Success Logs</h2>
        <ul class="bg-green-100 p-2 rounded max-h-60 overflow-y-auto">
          <li v-for="(log, index) in successLogs" :key="index" class="mb-1">{{ log }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Error Logs</h2>
        <ul class="bg-red-100 p-2 rounded max-h-60 overflow-y-auto">
          <li v-for="(log, index) in errorLogs" :key="index" class="mb-1">{{ log }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { importDir as initiateTask, getById as getTaskById } from "@/api/brand/index" // 假设这些是导入的API接口

const total = ref(567)
const currentTaskIndex = ref(1)
const PrefixUrl = ref("")
const isRunning = ref(false)
const taskStatus = ref("")
const successLogs = ref([])
const errorLogs = ref([])
const progress = computed(() => (currentTaskIndex.value / total.value) * 100)
const currentTaskId = ref("")

const controlPower = async () => {
  if (isRunning.value) {
    stopTask()
  } else {
    isRunning.value = true
    createTask()
  }
}

const createTask = async () => {
  if (currentTaskIndex.value <= total.value && isRunning.value) {
    try {
      taskStatus.value = `Task begin ${currentTaskIndex.value}`
      const { data } = await initiateTask({ idx: currentTaskIndex.value, prefixUrl: PrefixUrl.value })
      currentTaskId.value = data
      taskStatus.value = `Task Id ${currentTaskId.value}`
      await pollTaskStatus()
    } catch (error) {
      errorLogs.value.push(`Error initiating task ${currentTaskIndex.value}: ${error.message}`)
    }
  } else {
    isRunning.value = false
    taskStatus.value = "All tasks completed"
  }
}

const pollTaskStatus = async () => {
  try {
    const { data } = await getTaskById(currentTaskId.value)
    taskStatus.value = `Ask Task ${currentTaskIndex.value} status: ${data.status}`

    if (data.status === 252 || data.status === 253) {
      successLogs.value.push(`Task ${currentTaskIndex.value} completed with status ${data.status}`)
      currentTaskIndex.value++
      setTimeout(() => {
        createTask()
      }, 1000)
    } else {
      // errorLogs.value.push(`Task ${currentTaskIndex.value} failed with status ${data.status}`)
      await new Promise((resolve) => setTimeout(resolve, 10000)) // 等待10秒
      pollTaskStatus()
    }
  } catch (error) {
    errorLogs.value.push(`Error polling task ${currentTaskIndex.value}: ${error.message}`)
    await new Promise((resolve) => setTimeout(resolve, 10000)) // 等待10秒
    pollTaskStatus()
  }
}

onMounted(() => {
  console.log("组件被挂载了")
})
</script>
