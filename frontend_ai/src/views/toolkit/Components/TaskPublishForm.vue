<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">{{ props.id ? '编辑内容' : '发布新内容' }}</v-card-title>
          <v-alert v-if="!taskId" type="error" class="mb-4">
            未提供任务ID，无法继续操作。
          </v-alert>
          <v-alert v-else-if="taskData && taskData.status !== 255" type="warning" class="mb-4">
            该任务正在发布中，无法修改。
          </v-alert>
          <v-form v-else @submit.prevent="submitForm" v-model="isFormValid">
            <v-text-field
              v-model="formData.title"
              label="标题"
              :rules="[v => !!v || '标题是必填项', v => v.length <= 255 || '标题不能超过255个字符']"
              required
            ></v-text-field>

            <v-select
              v-show="availableImages.length > 0"
              v-model="formData.cover"
              :items="availableImages"
              label="选择封面图片"
              item-title="text"
              item-value="value"
            >
              <template v-slot:selection="{ item }">
                <v-img :src="item.raw.value" height="50" width="50" cover class="mr-2"></v-img>
                {{ item.title }}
              </template>
              <template v-slot:item="{ item, props }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-img :src="item.raw.value" height="50" width="50" cover></v-img>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-select>

            <v-img v-if="formData.cover" :src="formData.cover.value" max-height="200" contain class="mb-4"></v-img>

            <v-switch
              v-model="formData.is_paid"
              label="原图收费下载"
              color="primary"
            ></v-switch>

            <v-expand-transition>
              <div v-if="formData.is_paid">
                <v-text-field
                  v-model.number="formData.cost"
                  label="费用"
                  type="number"
                  :rules="[v => v > 0 || '费用必须大于0']"
                  required
                ></v-text-field>

                <v-radio-group
                  v-model="formData.cost_type"
                  label="费用类型"
                  :rules="[v => !!v || '请选择费用类型']"
                  required
                >
                  <v-radio :label="$t('system.amount')" value="amount"></v-radio>
                  <v-radio :label="$t('system.point')" value="point"></v-radio>
                </v-radio-group>
              </div>
            </v-expand-transition>

            <v-btn
              type="submit"
              color="primary"
              block
              :disabled="!isFormValid || (taskData && taskData.status !== 255)"
              class="mt-4"
            >
              {{ props.id ? '保存修改' : '发布' }}
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import taskPublishApi from '@/api/taskPublish'

interface FormData {
  task_id: string
  title: string
  is_paid: boolean
  cost: number | null
  cost_type: 'amount' | 'point' | null
  cover: string | ''
}

interface Props {
  taskId?: string
  id?: string
}

const props = defineProps<Props>()

const isFormValid = ref(false)

const formData = reactive<FormData>({
  task_id: props.taskId || '',
  title: '',
  is_paid: false,
  cost: null,
  cost_type: null,
  cover: ''
})
const taskData = ref<any>()

const availableImages = ref<{ text: string; value: string }[]>([])

const fetchData = async () => {
  if (props.id) {
    const { data } = await taskPublishApi.get(props.id)
    if(!data) return
    taskData.value = data
    if (taskData.value) {
      formData.title = taskData.value.directory?.title
      formData.is_paid = taskData.value.directory.payment_limit > 0
      formData.cost = taskData.value.directory.payment_limit
      formData.cost_type = taskData.value.directory.payment_type
      
      availableImages.value = taskData.value.images.map((image, index) => ({
        text: `图片 ${index + 1}`,
        value: `/disk/img?id=${image}&w=300`
      }))
      
      formData.cover = availableImages.value[0].value
    }
  }
}

onMounted(fetchData)

watch(() => formData.is_paid, (newValue) => {
  if (!newValue) {
    formData.cost = null
    formData.cost_type = null
  } else if (formData.cost === null) {
    formData.cost = 0
    formData.cost_type = 'amount'
  }
})

const emits = defineEmits(['published'])
const submitForm = async () => {
  if (isFormValid.value && props.taskId) {
    try {
      if (props.id && taskData.value) {
        await taskPublishApi.update({
          id: props.id,
          ...formData
        })
      } else {
        await taskPublishApi.create(formData)
      }
      console.log('Form submitted successfully')
      emits('published')
      // 可以在这里添加成功提示或跳转逻辑
    } catch (error) {
      console.error('Form submission failed:', error)
      // 可以在这里添加错误提示逻辑
    }
  }
}
</script>

<style scoped>
.v-card {
  max-width: 100%;
}

@media (max-width: 600px) {
  .v-card-title {
    font-size: 1.25rem;
  }
}
</style>