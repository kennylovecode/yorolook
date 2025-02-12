<template>
  <div class="aigc-page">
    <div class="printidea">
      <div class="printidea-operation">
        <div class="operation-wrap">
          <div class="operation">
            <div class="line">
              <div class="title"><span>*</span>选择智能工具：</div>
              <el-select v-model="submitForm.model" clearable placeholder="选择AI模型">
                <template #prefix>
                  <span v-if="submitForm.model" style="color: #216386; font-weight: bold">{{
                    aiModels.find((x) => x.value === submitForm.model).key
                  }}</span>
                </template>
                <el-option v-for="item in aiModels" :key="item.value" :value="item.value" :label="item.label">
                  <span>{{ item.key }}</span>
                  <span style="width: 300px; color: #216386; float: right; font-size: 12px; text-align: right">{{
                    item.label
                  }}</span>
                </el-option>
              </el-select>
            </div>
            <div :key="submitForm.model" class="line" v-if="aiModels.find((x) => submitForm.model === x.value)?.upload">
              <div class="title">上传参考图或贴入图片链接：</div>
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :data="formData"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
              >
                <img v-if="submitForm.imageUrl" :src="submitForm.imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
              <el-input
                v-model="submitForm.imageUrl"
                style="margin-top: 10px"
                type="text"
                placeholder="在此处粘贴图片连接"
              />

              <el-button
                v-if="submitForm.imageUrl && areaComponentRef?.selectionBoxIndex"
                style="margin-top: 10px"
                type="primary"
                size="default"
                @click="areaVisible = true"
                plain
                >已选 {{ areaComponentRef?.selectionBoxIndex }} 个图片区域</el-button
              >
              <el-button
                v-if="submitForm.imageUrl && !areaComponentRef?.selectionBoxIndex"
                style="margin-top: 10px"
                type="primary"
                @click="areaVisible = true"
                plain
                >全图模式（点击可进行区域框选修图模式）</el-button
              >
            </div>
            <div class="line">
              <div class="title"><span>*</span>输入描述题词：</div>
              <el-input
                maxlength="800"
                show-word-limit
                v-model="submitForm.prompt"
                :autosize="{ minRows: 6, maxRows: 12 }"
                type="textarea"
                placeholder="尽可能详细地描述你脑海中的场景，让聪明的AI帮你画"
              />
            </div>
            <div class="line">
              <div class="title">生成数量：({{ submitForm.amount }}张)</div>
              <el-slider v-model="submitForm.amount" :step="1" show-stops :min="1" :max="4" />
            </div>
            <div class="line">
              <div class="title">图片尺寸：</div>
              <el-select v-model="submitForm.aspectRatio" clearable placeholder="选择宽高比例">
                <template #prefix>
                  <span v-if="submitForm.aspectRatio" style="color: #216386; font-weight: bold"
                    >宽{{ ratioOptions.find((x) => x.value === submitForm.aspectRatio).key }}</span
                  >
                </template>
                <el-option v-for="item in ratioOptions" :key="item.value" :value="item.value" :label="item.label">
                  <span>{{ item.key }}</span>
                  <span style="width: 300px; color: #216386; float: right; font-size: 12px; text-align: right">{{
                    item.label
                  }}</span>
                </el-option>
              </el-select>
              <el-select style="margin-top: 10px" v-model="submitForm.width" clearable placeholder="选择图片尺寸">
                <template #prefix>
                  <span v-if="submitForm.width" style="color: #000">高 {{ submitForm.height }}px</span>
                </template>
                <el-option v-for="item in pixelOptions" :key="item.value" :value="item.value" :label="`宽${item.key}`">
                  <span>{{ item.key }}</span>
                  <span style="width: 300px; color: #216386; float: right; font-size: 12px; text-align: right">{{
                    item.label
                  }}</span>
                </el-option>
              </el-select>
            </div>
            <div class="line">
              <el-button v-loading="loading" type="primary" size="large" @click="doGenerate">生成</el-button>
            </div>
            <div class="line">
              <div class="title">往期示例：</div>
              <div class="history-list">
                <div @click="showDemo(item)" v-for="item in demos" class="item">
                  <img
                    :alt="item.prompt"
                    title="点击查看"
                    :src="`/public/resource/${item.name}/${item.cover}`"
                    width="100"
                    height="100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="generate-space">
        <div
          v-loading="generating"
          element-loading-text="正在努力生成结果中..."
          class="output-list"
          :class="`list-${currentOutputs.length}`"
        >
          <div v-for="item in currentOutputs" class="item">
            <el-image fit="scale-down" :src="item" :preview-src-list="currentOutputs" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog title="框选区域进行修图" v-model="areaVisible" width="600">
    <yl-area-select ref="areaComponentRef" :image-url="submitForm.imageUrl" />
    <template #footer>
      <el-button @click="areaVisible = false">关闭</el-button>
      <el-button type="danger" @click="areaComponentRef.clearAreas">清空</el-button>
      <el-button type="primary" @click="">完成</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import { reactive, ref, watch, getCurrentInstance } from "vue"
import YlAreaSelect from "./components/area-select-canvas.vue"

const { proxy } = getCurrentInstance()
const aiModels = [
  {
    key: "以文生图",
    value: "prompt-to-image",
    label: "关键词描述生成图片",
    upload: false
  },
  {
    key: "以图生图",
    value: "image-to-image",
    label: "将图片还原成线稿或局部框选生成新图片",
    upload: true
  },
  {
    key: "以图生文",
    value: "image-to-prompt",
    label: "通过图片分析出关键词描述",
    upload: true
  },
  {
    key: "智能问答",
    value: "prompt-answer",
    label: "通过输入文本得到AI的智能答复",
    upload: false
  }
]

const ratioOptions = [
  {
    key: "方图1:1",
    value: 11,
    label: "应用于头像、照片、封面等"
  },
  {
    key: "竖长图9:16",
    value: 916,
    label: "应用于手机壁纸、海报、公众号配图等"
  },
  {
    key: "横长图16:9",
    value: 169,
    label: "应用于PCBanner、公众号配图、广告图等"
  },
  {
    key: "竖长图 3:4",
    value: 34,
    label: "应用于手机壁纸、海报、公众号配图等"
  },
  {
    key: "横长图 4:3",
    value: 43,
    label: "应用于PCBanner、公众号配图、广告图等"
  }
]

const pixelOptions = [
  {
    key: "1920px",
    value: 1920,
    label: ""
  },
  {
    key: "1440px",
    value: 1440,
    label: ""
  },
  {
    key: "1280px",
    value: 1280,
    label: ""
  },
  {
    key: "1024px",
    value: 1024,
    label: ""
  },
  {
    key: "768px",
    value: 768,
    label: ""
  },
  {
    key: "512px",
    value: 512,
    label: ""
  },
  {
    key: "256px",
    value: 256,
    label: ""
  }
]

const demos = [
  {
    model: "prompt-to-image",
    name: "g1",
    prompt: "生成一个现代风格的主卧室，其中有一张舒适的大床，床头柜上有两盏灯，窗户上有一副白色窗帘。",
    outs: ["out_0.png", "out_1.png", "out_2.png", "out_3.png"],
    cover: "cover.png",
    sourceImg: ""
  },
  {
    model: "prompt-to-image",
    name: "g2",
    prompt: "生成一个海滩风格的卧室，其中有一张白色的床，床头有一面带壳的大镜子，阳台上有一把藤椅和一张小桌子。",
    outs: ["out_0.png", "out_1.png"],
    cover: "cover.png",
    sourceImg: ""
  },
  {
    model: "prompt-to-image",
    name: "g3",
    prompt:
      "打造一个乡村风格的客厅，包括一套胡桃木沙发和茶几，上面有配套的木制茶盘和缝隙。在木制电视柜旁边，有木制酒柜和书柜。墙上挂着一台40英寸的电视。客厅需要一个阳台。阳台采用白色窗帘和推拉式落地窗。",
    outs: ["out_0.png", "out_1.png", "out_2.png"],
    cover: "cover.png",
    sourceImg: ""
  },
  {
    model: "prompt-to-image",
    name: "g4",
    prompt: "生成一个日式风格的卧室，其中有一张折叠式床垫，床头柜上有一盏纸灯笼，墙上挂着一幅传统的日本画。",
    outs: ["out_0.png"],
    cover: "cover.png",
    sourceImg: ""
  }
]

const currentOutputs = ref([])
const areaVisible = ref(false)
const areaComponentRef = ref({})
const submitForm = reactive({
  model: "",
  prompt: "",
  imageUrl: "",
  amount: 1,
  aspectRatio: 11,
  width: 1920,
  height: 1920,
  maskUrl: ""
})
const generating = ref(false)

const loading = ref(false)
const showDemo = (item) => {
  currentOutputs.value = item.outs.map((x) => {
    return `/public/resource/${item.name}/${x}`
  })
  submitForm.model = item.model
  submitForm.prompt = item.prompt
  console.log(currentOutputs)
}

//发起生成请求
const doGenerate = async () => {
  const url = "/newserver/aigcmicroservice/api/image/prompt-to-image"
  const res = await proxy.$http.post(url, submitForm)

  currentOutputs.value = []
  generating.value = true
  askGenerated()
}
let askInterval
//轮询生成的结果
const askGenerated = (uuid) => {
  askInterval = setInterval(async () => {
    ElMessage.success("AI已完成作业!")
    generating.value = false
    clearInterval(askInterval)
  }, 1000)
}

const handleUploadSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const uploadUrl = ref("/newserver/filemicroservice/api/chunkUpload")
const formData = reactive({
  chunkIndex: 0,
  totalChunks: 1,
  filename: "",
  md5: "",
  size: 0
})
const beforeUpload = async (rawFile) => {
  if (rawFile.type.indexOf("image/") < 0) {
    ElMessage.error("请上传图片文件")
    return false
  }

  const isLt500k = rawFile.size / 1024 < 500
  const isGt10m = rawFile.size / (1024 * 1024) > 10
  // 如果文件大小小于 500KB，使用 base64Upload 接口上传
  if (isLt500k) {
    const reader = new FileReader()
    // 读取文件内容
    reader.readAsDataURL(rawFile)
    // 监听文件读取完成事件
    reader.onload = async () => {
      uploadUrl.value = "/newserver/filemicroservice/api/base64Upload"
      console.log(rawFile)
      const res = await proxy.$http.post(uploadUrl.value, {
        filename: rawFile.name,
        data: reader.result
      })
      if (res.data.path) submitForm.imageUrl = "/newserver-image/filemicroservice/" + res.data.path
    }
    return false
  } else if (isGt10m) {
    //大于10M的文件
    // uploadUrl.value = '/newserver/filemicroservice/api/chunkUpload';
    // const fileResult = await splitFile(rawFile, 1024 * 1024 * 2);
    // formData.chunkIndex = 0;
    // formData.totalChunks = fileResult.chunks.length;
    // formData.filename = rawFile.name;
    // formData.size = rawFile.size;
    return true
  }
  // formData.md5 = await getFileMD5(rawFile);
  uploadUrl.value = "/newserver/filemicroservice/api/singleUpload"
  return true
}

watch(submitForm, () => {
  if (!submitForm.aspectRatio && submitForm.width) return
  let wr = 1
  let hr = 1
  switch (submitForm.aspectRatio) {
    case 916:
      wr = 9
      hr = 16
      break
    case 169:
      wr = 16
      hr = 9
      break
    case 34:
      wr = 3
      hr = 4
      break
    case 43:
      wr = 4
      hr = 3
      break
    default:
      break
  }
  submitForm.height = ((submitForm.width / wr) * hr).toFixed(0)
})
</script>

<style lang="scss" scoped>
.aigc-page {
  background-color: #f2f3f5;
  min-height: calc(100vh - 60px);

  .printidea {
    display: flex;

    .printidea-operation {
      box-sizing: border-box;
      padding: 24px 0 24px 24px;

      .operation-wrap {
        border-radius: 20px;
        background-color: #fff;
        width: 420px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .operation {
          overflow-y: auto;
          overflow-x: hidden;
          padding: 1rem;

          &::-webkit-scrollbar {
            width: 6px;
            border-radius: 100px;
            display: block !important;
          }

          &::-webkit-scrollbar-thumb {
            width: 6px;
            background: #e5e6eb;
            border-radius: 100px;
          }

          .line {
            margin-top: 10px;

            .title {
              padding: 12px 0;
              display: flex;
              font-weight: 700;

              span {
                color: #f0f;
                padding: 0px 3px;
              }
            }

            .el-select,
            .el-button {
              width: 100%;
            }

            .history-list {
              display: flex;

              .item {
                margin: 0 4px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .generate-space {
      width: 96%;
      padding: 24px;

      .output-list {
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        height: calc(100vh - 64px);
        background: #fff;
        border-radius: 20px;

        .item {
          overflow: hidden;

          > div {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: zoom-in;
          }
        }

        &.list-4,
        &.list-3 {
          padding: 20px;

          .item {
            width: 49.5%;
            height: calc(50vh - 102px);
            display: flex;
            justify-content: center;
            margin-top: 10px;

            > div {
              width: 100%;
              background-color: #fff;
              padding: 2rem;

              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: cover;
              }
            }
          }
        }

        &.list-2 {
          padding: 20px;

          .item {
            width: 49.5%;
            height: calc(100vh - 164px);
            display: flex;
            justify-content: center;

            > div {
              width: 100%;
              height: 100%;
              align-items: flex-start;

              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: cover;
              }
            }
          }
        }

        &.list-1 {
          padding: 20px;

          .item {
            width: 100%;
            min-width: 768px;
            height: calc(100vh - 164px);
            display: flex;
            justify-content: center;

            > div {
              width: 100%;
              height: 100%;

              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
