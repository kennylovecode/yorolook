<template>
  <Toolbox :show-image="false" />
  <v-card-title class="mt-6 mb-2">
    <p class="text-h5 font-weight-bold">{{ $t('system.community_slogan') }}</p>
    <p class="text-subtitle-1 mt-1">{{ $t('system.community_slogan2') }}</p>
  </v-card-title>
  <v-container fluid class="pa-4">
    <masonry-wall :column-width="300" :items="tasks" :ssr-columns="1" :min-columns="1" :max-columns="6" :gap="20">
      <template #default="{ item: task }">
        <div class="d-flex flex-column">
          <v-card :key="task.id" class="task-card" elevation="2" @click="openDialog(task)">
            <v-img :src="`/disk/img?id=${task.images[0]}&w=300`" contain class="align-end">
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <Loading></Loading>
                </div>
              </template>
              <div class="card-overlay">
                <div class="top-left">
                  <v-chip class="user-chip" size="small">
                    <v-avatar size="24" color="primary">
                      <v-img v-if="task.user.avatar && !imageError" :src="task.user.avatar"
                        @error="imageError = true"></v-img>
                      <span v-else class="text-subtitle-2 white--text">{{ task.user.nickname?.charAt(0) ||
                        task.user.realname?.charAt(0) ||
                        task.user.username?.charAt(0) }}</span>
                    </v-avatar>
                    <span class="user-nickname text-caption">{{ task.user.nickname || task.user.realname ||
                      task.user.username
                      }}</span>
                  </v-chip>
                </div>
                <div class="bottom-left">
                  <v-chip size="x-small" class="info-chip">
                    <v-icon start icon="mdi-image" size="x-small"></v-icon>
                    {{ task.images.length }}
                  </v-chip>
                </div>
                <div class="bottom-right">
                  <v-chip :color="getAccessColor(task)" size="x-small" class="access-chip" variant="flat">
                    {{ task.directory.payment_limit === 0 ? $t('system.free') : `${task.directory?.payment_limit}
                    ${task.directory.payment_type === 'point' ?
                        $t('system.point') :
                        $t('system.amount')}` }}
                  </v-chip>
                </div>
              </div>
            </v-img>
          </v-card>
        </div>
      </template>
    </masonry-wall>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" class="task-dialog">
    <v-card class="rounded-0">
      <v-toolbar color="primary" density="compact">
        <v-toolbar-title class="text-truncate" style="max-width: calc(100% - 48px);">{{ showTask.directory?.title
          }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog" style="position: absolute; right: 0; top: 1px;">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container class="pa-4 pa-sm-6">
        <v-row>
          <v-col cols="12" md="7" class="pb-0 pb-md-4">
            <v-carousel v-model="currentSlide" :show-arrows="showTask.images?.length > 1" min-height="100%"
              hide-delimiter-background delimiter-icon="mdi-circle" class="rounded-lg mb-4 aspect-ratio-1-1">
              <v-carousel-item v-for="(image, index) in showTask.images" :key="index">
                <v-img :src="`/disk/img?id=${image}&w=800`" contain>
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-carousel-item>
            </v-carousel>
            <div class="w-100 my-2 d-flex overflow-x-auto">
              <div v-for="(image, index) in showTask.images" :key="index" class="pa-1" style="flex: 0 0 auto;">
                <v-img :src="`/disk/img?id=${image}&w=100`" @click="currentSlide = index" class="thumb-image"
                  :class="{ 'thumb-image-active': currentSlide === index }" width="64" height="64" contain></v-img>
              </div>
            </div>
            <v-card-actions class="px-0 py-4 d-flex flex-wrap gap-2">
              <v-btn color="warning" variant="flat" prepend-icon="mdi-download"
                @click="downloadImage(showTask.images[currentSlide])">
                下载无水印原图
              </v-btn>
              <v-btn variant="outlined" prepend-icon="mdi-heart">
                0
              </v-btn>
              <v-btn variant="outlined" prepend-icon="mdi-share-variant">
                分享
              </v-btn>
            </v-card-actions>
          </v-col>

          <v-col cols="12" md="5">
            <div class="d-flex align-center mb-6">
              <v-avatar size="40" class="mr-3" color="primary">
                <v-img class="flex justify-center align-center" :src="showTask.user?.avatar">
                  <template v-slot:error>
                    <div class="w-full h-full d-flex justify-center align-center text-title white--text">{{
                      showTask.user?.nickname.charAt(0) || showTask.user?.realname.charAt(0) ||
                      showTask.user?.username.charAt(0)
                    }}</div>
                  </template>
                </v-img>
              </v-avatar>
              <span class="text-h6">{{ showTask.user?.nickname || showTask.user?.realname || showTask.user?.username
                }}</span>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="flat" prepend-icon="mdi-account-plus">
                关注
              </v-btn>
            </div>

            <p class="text-body-2 text-grey-darken-1 mb-6">
              {{ showTask.directory?.created_at }}
            </p>

            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-palette-outline" class="mr-2"></v-icon>
                </template>
                <v-list-item-title>创作路径</v-list-item-title>
                <v-list-item-subtitle>{{ showTask.task?.title }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-text-box-outline" class="mr-2"></v-icon>
                </template>
                <v-list-item-title>创作提词</v-list-item-title>
                <v-list-item-subtitle>{{ showTask.task?.params?.prompt }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-cube-outline" class="mr-2"></v-icon>
                </template>
                <v-list-item-title>模型</v-list-item-title>
                <v-list-item-subtitle>{{ showTask.task?.params?.model }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import Loading from '@/components/Loading/Loading03.vue'
import taskPublishApi from '@/api/taskPublish';
import { ITaskPublish } from '@/api/types/task';
import Toolbox from '@/components/toolbox/Toolbox.vue';

const tasks = ref<ITaskPublish[]>([])
const showTask = ref<ITaskPublish>({} as ITaskPublish)

const loading = ref(false)
const page = ref(1)
const { name: displayName } = useDisplay()
const imageError = ref(false)
const dialog = ref(false)
const currentSlide = ref(0)

const openDialog = (item: ITaskPublish) => {
  showTask.value = item
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
}

const downloadImage = async (imageId: string) => {
  try {
    // Create a temporary anchor element
    const link = document.createElement('a')
    // Set the href to the full-size image URL
    link.href = `/disk/download?id=${imageId}`
    // Set download attribute to force download instead of navigation
    link.download = `image-${imageId}`
    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Failed to download image:', error)
  }
}

const fetchTasks = async () => {
  loading.value = true
  try {
    const { data, total } = await taskPublishApi.list({ idx: page.value, size: 10 });
    tasks.value = tasks.value.concat(data);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
  loading.value = false
}

const getAccessColor = (task: ITaskPublish): string => {
  if (task.directory?.payment_limit === 0) return 'green'
  return task.directory?.payment_type === 'point' ? 'yellow-darken-2' : 'red'
}

onMounted(() => {
  fetchTasks()
})
</script>

<style lang="scss" scoped>
.task-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
}

.top-left,
.bottom-left,
.bottom-right {
  position: absolute;
}

.top-left {
  top: 8px;
  left: 8px;
}

.bottom-left {
  bottom: 8px;
  left: 8px;
}

.bottom-right {
  bottom: 8px;
  right: 8px;
}

.user-chip {
  background-color: rgba(0, 0, 0, 0.6) !important;
  color: white !important;
}

.user-nickname {
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info-chip,
.access-chip {
  background-color: rgba(0, 0, 0, 0.6) !important;
  color: white !important;
}

.thumb-image {
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s ease-in-out;
}

.thumb-image:hover {
  border-color: var(--v-theme-primary);
  opacity: 0.9;
}

.thumb-image-active {
  border-color: var(--v-theme-primary);
  box-shadow: 0 0 0 2px var(--v-theme-primary);
  opacity: 1;
}

.v-responsive {
  display: flex;
  align-items: center;
  height: 100%;
  background: #fff;

}

.v-img__img--cover {
  width: initial;
  height: initial;
  object-fit: contain !important;
}

@media (max-width: 600px) {
  .task-dialog .v-toolbar {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .task-dialog .v-card-actions {
    flex-wrap: wrap;
  }

  .task-dialog .v-btn {
    flex: 1 0 auto;
    margin-bottom: 8px;
  }
}
</style>