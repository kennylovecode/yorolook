<script setup lang="ts">
import { useSnackbarStore } from "@/stores/snackbarStore";
import AnimationChat from "@/components/animations/AnimationChat1.vue";
import AnimationAi from "@/components/animations/AnimationBot1.vue";
import { read, countAndCompleteCodeBlocks } from "@/utils/aiUtils";
import { scrollToBottom } from "@/utils/common";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { useAuthStore } from "@/stores/authStore";
import { IAIConfig, IModel, IMessage, IHistoryChat } from "@/api/types/aiproxy";
import AIProxyAPI from '@/api/aiproxy'
import chatApi from '@/api/chat'
import { IListRequest } from "@/api/types/base";
import LoadingView from "@/components/LoadingView.vue";

const config = ref<IAIConfig<IModel>>()
const snackbarStore = useSnackbarStore();

// Message List
const { user, setUser } = useAuthStore()
const { historyChats } = storeToRefs(useAuthStore())
const listQuery = ref<IListRequest & { model: string }>({
  model: "",
  idx: 0,
  size: 20
})
// User Input Message
const userMessage = ref<string>("");
const isLoading = ref(false);
const total = ref(-1)
const refrence = ref(false)
const finish = ref(false)

const buildPostChat = () => {
  const pMessage: IMessage = {
    content: userMessage.value,
    role: "user"
  }
  const chatModel = {
    from_account_uuid: user?.id,
    model: listQuery.value.model,
    content: userMessage.value,
    status: 0,
    messages: [pMessage]
  }
  historyChats.value.unshift({ ...chatModel })

  /** 无需参考上一条消息 */
  if(!refrence.value) return [pMessage]
  const reversedMessages = historyChats.value
    .slice()
    .reverse()
    .slice(-2) //-10    10条太贵了，改成2条吧
    .flatMap(chat => chat.messages);

  userMessage.value = "";
  return reversedMessages
}

// Post Messsage
const postMessage = async () => {
  isLoading.value = true;
  if (userMessage.value) {
    const posChat = {
      model: listQuery.value.model,
      messages: buildPostChat(),
    }
    const { data } = await AIProxyAPI.chat(posChat);
    isLoading.value = false
    historyChats.value[0] = data.q as IHistoryChat
    historyChats.value.unshift(data.a as IHistoryChat)
    if (data.total_fee) {
      const model = config.value?.models.find(x => x.name === data.q.model)
      if (model?.cost_type) {
        user[model.cost_type] = user[model.cost_type] - data.total_fee;
        setUser(user)
      }
    }
    userMessage.value = ""
  }
};

const recreateId = ref("")
const recreate = async (chat: IHistoryChat) => {
  recreateId.value = chat.id || ""
  isLoading.value = true
  const { data } = await AIProxyAPI.rechat(recreateId.value)
  historyChats.value[0] = data.q as IHistoryChat;
  historyChats.value.unshift(data.a as IHistoryChat)
  isLoading.value = false
  if (data.total_fee) {
    const model = config.value?.models.find(x => x.name === chat.model)
    if (model?.cost_type) {
      user[model.cost_type] = user[model.cost_type] - data.total_fee;
      setUser(user)
    }
  }
}

const stop = () => {
  recreateId.value = ""
  isLoading.value = false
}

watch(
  () => historyChats.value,
  (val) => {
    if (val) {
      scrollToBottom(document.querySelector(".message-container"));
    }
  },
  {
    deep: true,
  }
);

const displayMessages = computed(() => {
  const messagesCopy = historyChats.value.slice(); // 创建原始数组的副本
  const lastMessage = messagesCopy[messagesCopy.length - 1];
  const updatedLastMessage = {
    ...lastMessage,
    content: countAndCompleteCodeBlocks(lastMessage.content || ""),
  };
  messagesCopy[messagesCopy.length - 1] = updatedLastMessage;
  return messagesCopy;
});

const handleKeydown = (e) => {
  if (e.key === "Enter" && (e.altKey || e.shiftKey)) {
    // 当同时按下 alt或者shift 和 enter 时，插入一个换行符
    e.preventDefault();
    userMessage.value += "\n";
  } else if (e.key === "Enter") {
    // 当只按下 enter 时，发送消息
    e.preventDefault();
    postMessage();
  }
};

const inputRow = ref(1);

function countMixedTokens(text) {
  // 使用正则表达式匹配中文字符、英文单词和标点符号
  const tokens = text.match(/[\u4e00-\u9fa5]+|[a-zA-Z]+|[^\u4e00-\u9fa5\s]/g);

  // 如果没有匹配到任何 token，返回 0
  return tokens ? tokens.length : 0;
}

const loading = ref(false)
const load = ({ done }) => {
  if(loading.value) return
  loading.value = true
  if(finish.value) {
    done('ok')
    return
  }
  if (historyChats.value.length >= total.value && total.value >= 0) {
    done('empty')
    return
  }
  listQuery.value.idx += 1
  chatApi.my(listQuery.value).then((res) => {
    
    loading.value = false
    historyChats.value = historyChats.value.concat(res.data || [])
    total.value = res.total
    if(!res.data) finish.value = true
    done('ok')
  })
}

const changeModel = () => {
  localStorage.setItem("defaultChatModel", listQuery.value.model)
  listQuery.value.idx = 0;
  historyChats.value = []
  total.value = -1
  finish.value = false
  loading.value = false
}

onBeforeMount(async () => {
  const { data } = await AIProxyAPI.config("CHAT");
  if (data) {
    config.value = data
    listQuery.value.model = localStorage.getItem("defaultChatModel")?.toString() || ""
    if (!listQuery.value.model)
      listQuery.value.model = config.value?.models[0].name || ""
  }
})

</script>

<template>
  <div class="chat-bot">
    <div class="position-absolute top-5 z-10 opacity-90 w-100 px-8">
      <v-card>
        <v-tabs show-arrows grow v-model="listQuery.model" align-tabs="title" @update:modelValue="changeModel">
          <v-tab v-for="item in config?.models" :key="item.name" :text="item.title" :value="item.name"></v-tab>
        </v-tabs>
      </v-card>
    </div>
    <div class="messsage-area">
      <div class="no-message-container" v-if="total === 0 && historyChats.length === 0">
        <h1 class="text-h4 text-md-h2 text-primary font-weight-bold">
          {{ $t('toolkit.chatTitle') }}
        </h1>
        <AnimationChat size="50%" />
      </div>
      <v-infinite-scroll v-else :key="listQuery.model" @load="load" class="message-container" ref="scrollContainerRef"
        color="secondary" side="end" :empty-text="$t('$vuetify.infiniteScroll.empty')"
        :load-more-text="$t('$vuetify.infiniteScroll.loading')">
        <div v-if="isLoading">
          <div class="pa-6">
            <div class="message">
              <AnimationAi size="50%" />
            </div>
          </div>
        </div>
        <template v-for="chat, idx in historyChats">
          <div v-if="chat.from_account_uuid">
            <div class="pb-1 date-line">
              {{ chat.updated_at }}
            </div>
            <div class="pb-6 user-message flex align-center">
              <v-avatar class="ml-4" rounded="sm">
                <img src="@/assets/images/avatars/avatar_user.jpg" alt="alt" />
              </v-avatar>
              <div class="md-preview-container">
                <v-card class="gradient gray text-pre-wrap" theme="dark">
                  <v-card-text><b> {{ chat.content }}</b></v-card-text>
                </v-card>
              </div>
              <v-progress-circular class="mx-2" v-if="isLoading && (recreateId === chat.id || idx === 0)" :size="24"
                :width="5" color="primary" indeterminate></v-progress-circular>
              <v-tooltip v-else :text="chat.status === 0 ? '刷新重试' : '成功'" location="left">
                <template v-slot:activator="{ props }">
                  <v-btn @click="recreate(chat)" class="mx-2" density="compact"
                    :icon="chat.status === 0 ? 'mdi-refresh' : 'mdi-check'" variant="flat"
                    :color="chat.status === 0 ? 'error' : 'success'">
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </div>
          <div v-else>
            <div class="pa-2 pa-md-5 assistant-message">
              <v-avatar class="d-none d-md-block mr-2 mr-md-4" rounded="sm" variant="elevated">
                <img src="@/assets/images/avatars/avatar_assistant.jpg" alt="alt" />
              </v-avatar>

              <div class="md-preview-container">
                <v-card>
                  <md-preview :modelValue="chat.content" class="font-1" />
                </v-card>
              </div>
            </div>
          </div>
        </template>
      </v-infinite-scroll>
    </div>
    <div class="input-area">
      <v-sheet v-if="!isLoading"  color="transparent" elevation="0" class="input-panel d-flex align-end pa-1">
        <transition name="fade">
          <v-textarea class="mx-2" color="primary" type="text" clearable variant="solo" ref="input"
            v-model="userMessage" :placeholder="$t('system.promptPlaceholder')" hide-details @keydown="handleKeydown"
            :rows="inputRow" @focus="inputRow = 3" @blur="inputRow = 1">
          </v-textarea>
        </transition>
        <v-btn class="mb-1" color="primary" variant="elevated" icon>
          <v-icon @click="postMessage">mdi-send</v-icon>
        </v-btn>
      </v-sheet>
      <div v-else class="stop-area">
        <v-btn @click="stop" append-icon="mdi-stop">停止</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-bot {
  background-repeat: repeat;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  overflow: hidden;
  .v-card{
    width: 100%;
  }

  .messsage-area {
    flex: 1;
    height: calc(100vh - 74px);
    max-width: 100%
  }

  .input-area {
    position: absolute;
    width: calc(100% - 2rem);
    bottom: 0;
    padding: 1rem;
    align-items: center;

    .input-panel {
      border-radius: 5px;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
}

.stop-area {
  display: flex;
  justify-content: center;
}

.date-line {
  display: flex;
  align-content: center;
  justify-content: end;
  flex-direction: row-reverse;
  color: #ccc;
  margin-right: 54px;
}

.user-message {
  display: flex;
  align-content: center;
  justify-content: end;
  flex-direction: row-reverse;
}

.assistant-message {
  display: flex;
  align-content: center;
  justify-content: start;
  flex-direction: row;
}

.message {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
}

.message-container {
  height: calc(100vh - 104px);
  display: flex;
  flex-direction: column-reverse;
  padding: 100px 0;
}

.no-message-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    font-weight: 500;
  }
}

:deep(.md-editor-preview-wrapper) {
  padding: 5px 15px;
}

.font-1 {
  font-size: 13px !important;
}

@media screen and (max-width: 768px) {

  :deep(#md-editor-v3-preview),
  .user-message {
    font-size: 14px !important;
  }

  .chat-bot{
    .input-area{
      width: 100%;
      padding: 0;
    }
  }
}

.md-preview-container {
  max-width: calc(98%);
}
</style>
