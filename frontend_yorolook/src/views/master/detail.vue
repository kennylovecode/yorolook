<style lang="scss" scoped>
.banner {
  margin: 0 auto;
  position: relative;
  font-size: 0;
  height: 24vw;
  overflow: hidden;
  max-height: 260px;
  background: var(--el-color-primary-light-9);
  img {
    max-width: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 14px;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    .information {
      width: calc(96% - 40px);
      height: calc(100% - 80px);
      margin: 30px 0;
      padding: 20px;

      .logo-area {
        float: left;
        margin-right: 1rem;
        padding: 2px;
        background: #fff;
        font-size: 0;
      }

      .info-area {
        p {
          margin: 0;
          padding: calc(var(--margin-y-base) / 2) 0;
          padding-top: 0;
          display: flex;
          align-items: baseline;

          &:first-child {
            height: 36px;
          }

          span {
            display: inline-block;
            height: 100%;
            margin-right: 8px;
            font-size: 0.7rem;

            &:first-child {
              font-size: 1.2rem;
            }
          }

          a {
            color: var(--el-color-white);

            &:hover {
              background: rgba($color: #fff, $alpha: 0.2);
            }

            margin-right: calc(var(--margin-y-base) * 2);
            text-decoration: none;
            display: block;
            border: var(--el-border);
            background: rgba($color: #000, $alpha: 0.3);
            padding: var(--margin-x-base) var(--margin-y-base);
          }

          &.description {
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 24px;
            margin-top: 8px;
          }
        }
      }
    }

    .control {
      position: absolute;
      right: 3px;
      top: 8px;
      display: flex;
      width: 100px;
      justify-content: space-around;
      :deep(.el-link) {
        font-size: 1.2rem;
        color: var(--el-color-white);
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
}

.detail {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  :deep(.el-tabs__nav-wrap) {
    margin-bottom: 0;
    .el-tabs__nav-scroll {
      width: var(--max-width);
      margin: 0 auto;
    }
    &::after {
      height: 0;
    }
  }
}

@media screen and (max-width: 750px) {
  .banner {
    height: 75vw;

    img {
      height: 100%;
      object-fit: cover;
    }

    .information {
      .info-area {
        p {
          flex-wrap: wrap;

          a {
            padding: 1vw !important;
            margin: 0.5vw 0;
            font-size: 0.5rem;
          }

          &.description {
            -webkit-line-clamp: 4 !important;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div v-if="itemModel.id" class="app-container">
    <div
      class="banner"
      :style="{ backgroundImage: itemModel.banners ? `url(/disk/view?id=${itemModel.banners}&w=${clientWidth})` : '' }"
    >
      <div class="overlay">
        <div class="information">
          <div class="logo-area">
            <img width="100" :src="`/disk/view?id=${itemModel.logo}&w=100`" />
          </div>
          <div class="info-area">
            <p>
              <span style="font-weight: bold">{{ itemModel.title + " " + itemModel.sub_title }}</span>
              <span
                ><el-icon> <LocationInformation /> </el-icon>{{ itemModel.country }} {{ itemModel.city }}</span
              >
            </p>
            <p v-if="itemModel.website">
              <el-tooltip class="box-item" effect="dark" content="点击前往品牌官网" placement="top-start">
                <a :href="itemModel.website" target="_blank">品牌官网</a>
              </el-tooltip>
            </p>
            <p
              v-if="itemModel?.description"
              class="description"
              v-text="itemModel?.description.replace(/(<([^>]+)>)/gi, '')"
            />
          </div>
        </div>
        <div class="control">
          <el-link v-permission :icon="Star" />
          <el-link
            v-permission="['manage', `owner_${itemModel.owner_uuid}`]"
            :icon="Edit"
            @click="editorDrawerVisible = true"
          />
          <el-link v-permission="['manage', `owner_${itemModel.owner_uuid}`]" :icon="Delete" />
        </div>
      </div>
    </div>
    <div class="detail" v-if="itemModel">这里显示大咖的文章</div>
    <el-drawer :z-index="1003" v-model="editorDrawerVisible" title="编辑大咖信息" size="50%">
      <yl-master-editor
        :id="itemModel.id"
        :dialog="true"
        @after-submit="(status: number) => (status == 0 ? (editorDrawerVisible = false) : '')"
      />
    </el-drawer>
  </div>
  <page404 v-else />
</template>

<script lang="ts" setup>
"use strict"
import { getById } from "@/api/master/index"
import { useTagsViewStore } from "@/store/modules/tags-view"
import { ref, onBeforeMount, onUpdated } from "vue"
import { useRoute, useRouter } from "vue-router"
import { LocationInformation } from "@element-plus/icons-vue"
import ylMasterEditor from "./edit.vue"
import { Edit, Star, Delete } from "@element-plus/icons-vue"
import directoryList from "@/components/custom/directory/list.vue"
import page404 from "@/views/error-page/404.vue"

const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()
const itemModel = ref<any>({})
const clientWidth = document.documentElement.clientWidth
const editorDrawerVisible = ref<boolean>(false)
const entryDirectory = ref<string>("")

onBeforeMount(async () => {
  const { data } = await getById(route.params.id as string)
  itemModel.value = data

  if (route.query.edit) {
    editorDrawerVisible.value = true
  }

  if (route.query.dir) {
    entryDirectory.value = route.query.dir as string
  }
  tagsViewStore.editTagTitle(route, `${itemModel.value.title} - ${itemModel.value.country} - 大咖详情`)
})

onUpdated(() => {
  console.log("onActivated")
})
</script>
