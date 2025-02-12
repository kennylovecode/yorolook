<script lang="ts" setup>
const tools = [
    {
        name: "AI文案助手",
        url: "https://yoroai001-writing.302.ai?region=1&confirm=true&lang=zh-CN&pwd=0914",
        image: "https://file.302ai.cn/gpt/imgs/writing_cn_tool_logo.png",
        desc: "文案创作得力助手，让创意和效率并驾齐驱"
    },{
        name: "AI图片处理",
        url: "https://yoroimage-pictool.302.ai?region=1&confirm=true&lang=zh-CN&pwd=2662",
        image: "https://file.302ai.cn/gpt/imgs/pictool_cn_tool_logo.png",
        desc: "AI绘画创作得力助手，让创意和效率并驾齐驱"
    },{
        name: "AI生成PPT",
        url: "https://yoro003-ppt.302.ai?region=1&confirm=true&lang=zh-CN&pwd=6489",
        image: "https://file.302ai.cn/gpt/imgs/ppt_cn_tool_logo.png",
        desc: "一键生成高质量PPT演示文稿"
    }
]
const currentUrl = ref("https://yoroai001-writing.302.ai?region=1&confirm=true&lang=zh-CN&pwd=0914")

const dialog = ref(false);
const selectedTool = ref<any>();

const openTool = (tool) => {
  selectedTool.value = tool;
  dialog.value = true;
};

</script>

<template>
    <v-container>
      <v-row>
        <v-col v-for="(tool, index) in tools" :key="index" cols="12" sm="6" md="4">
          <v-card class="tool-card" elevation="2" @click="openTool(tool)">
            <v-img :src="tool.image" height="200" class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
              <v-card-title class="text-h5 font-weight-bold fill-height d-flex align-end">
                {{ tool.name }}
              </v-card-title>
            </v-img>
            <v-card-text>
              <p class="text-body-2 text--secondary mb-4">{{ tool.desc }}</p>
              <div class="d-flex justify-space-between align-center">
                <v-btn text color="primary" @click.stop="openTool(tool)">
                  打开工具
                </v-btn>
                <v-icon color="grey">mdi-github</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ selectedTool ? selectedTool.name : '' }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-0">
            <iframe v-if="selectedTool" :src="selectedTool.url" style="width: 100%; height: calc(100vh - 64px); border: none;"></iframe>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  
<style lang="scss">
.util-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    .item{
        width: 360px;
    }
}

@media screen and (max-width: 768px){
    .item {
        .card-text{
            display: none
        }
    }
}
</style>