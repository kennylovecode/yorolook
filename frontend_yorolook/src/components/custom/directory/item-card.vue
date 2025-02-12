<style lang="scss" scoped>
.diskitem {
  padding: 8px;

  .dir {
    .cover {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 5px;

      .el-image {
        width: 50%;
        aspect-ratio: 1/1;
        padding: 3px;

        .replace-block {
          background: var(--el-fill-color-light);
          font-size: 10px;
        }
      }
    }
  }

  .file {
    .cover {
      .el-image {
        width: 100%;
      }
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      padding: 1vw 0;
      i {
        font-size: 80pt;
      }
    }
  }

  .title {
    text-align: center;

    .el-text {
      width: 90%;
      margin: 0 auto;
    }
  }

  .keywords {
    text-align: left;
  }
}
</style>

<template>
  <el-card draggable="true" shadow="always" :body-style="{ padding: '0' }">
    <!-- Direcroty Card -->
    <div class="diskitem">
      <div v-if="props.item.deep >= 0" class="dir" @click="operate('onEnterDir')">
        <div v-if="props.item.covers" class="cover">
          <template v-for="n in 4">
            <el-image
              :key="n"
              v-if="props.item.covers && props.item.covers.split(',')[n - 1]"
              @load="imageLoad"
              :src="`/disk/view?id=${props.item.covers.split(',')[n - 1]}&w=300`"
              fit="cover"
              :lazy="true"
            />
            <el-image :key="`defualt${n}`" v-else @load="imageLoad" src="/default-image.jpg" fit="cover" :lazy="true">
              <template #error>
                <div
                  style="
                    width: 100%;
                    height: 100%;
                    color: var(--el-text-color-placeholder);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                  class="replace-block"
                >
                  无封面
                </div>
              </template>
            </el-image>
          </template>
        </div>
        <div class="icon" v-else>
          <div>
            <i class="yorolook icon-files" />
          </div>
        </div>
      </div>
      <div v-else class="file" @click="operate('onPreview')">
        <div v-if="props.item.original_mime_type && props.item.original_mime_type.indexOf('image') === 0" class="cover">
          <el-image fit="contain" @load="imageLoad" :lazy="true" :src="`/disk/view?id=${props.item.id}&w=300`" />
        </div>
        <div class="icon" v-else>
          <div v-if="props.item.original_mime_type">
            <i class="yorolook icon-document" />
          </div>
          <div v-else>
            <i class="yorolook icon-files" />
          </div>
        </div>
      </div>
      <div class="title">
        <el-text size="small" line-clamp="1">{{ props.item.title }}</el-text>
      </div>
      <div class="keywords">
        <el-text size="small" line-clamp="2">{{ item.keywords }}</el-text>
      </div>
      <operate-group :can-fav="canFav" :can-edit="canEdit" :operate="operate" />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
import { computed, getCurrentInstance } from "vue"
import operateGroup from "@/components/custom/operate-group.vue"

const { accountInfo, roles } = useUserStore()

const emits = defineEmits(["onEnterDir", "onPreview", "onFav", "onEdit", "onRemove"])

const props = defineProps<{
  item: any
  index: number
}>()

const app = getCurrentInstance()
const $redrawVueMasonry = app?.appContext.config.globalProperties.$redrawVueMasonry

const canEdit = computed(() => {
  return roles.includes("manage") || accountInfo?.id === props.item?.owner_uuid
})
const canFav = computed(() => {
  return props.item.status === 0
})
const operate = (action: "onEnterDir" | "onPreview" | "onFav" | "onEdit" | "onRemove") => {
  emits(`${action}`, props.item, props.index)
}
const imageLoad = () => {
  $redrawVueMasonry()
}
</script>
