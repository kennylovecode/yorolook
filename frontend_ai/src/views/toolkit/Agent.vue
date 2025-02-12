<template>
    <div class="chat-bot">
        <div class="messsage-area">
            <div class="no-message-container" v-if="!historyMessage?.has_more && historyMessage?.data.length === 0">
                <h1 class="text-h4 text-md-h2 text-primary font-weight-bold">
                    AI 智能体, 用聊天实现你的一切想法。
                </h1>
                <AnimationChat size="50%" />
            </div>
            <v-infinite-scroll v-else-if="conversationModel.id" @load="load" class="message-container"
                ref="scrollContainerRef" color="secondary" side="end" :empty-text="$t('$vuetify.infiniteScroll.empty')"
                :load-more-text="$t('$vuetify.infiniteScroll.loading')">
                <template data-desc="这里是渲染刚发出正在回答的消息" v-if="posting">
                    <div>
                        <div class="pb-1 botname">
                            {{ botInfo?.name }}
                        </div>
                        <div class="px-2 px-md-5 assistant-message">
                            <v-avatar class="d-none d-md-block mr-2 mr-md-4" rounded="sm" variant="elevated">
                                <img src="@/assets/images/avatars/avatar_assistant.jpg" alt="alt" />
                            </v-avatar>
                            <div class="md-preview-container">
                                <v-card class="px-5" v-if="!answering || outputMessage.length <= 0">
                                    <Loading />
                                </v-card>
                                <v-card v-else>
                                    <md-preview :key="outputMessage.length" :modelValue="outputMessage"
                                        class="py-2 font-1" />
                                </v-card>
                            </div>
                        </div>
                    </div>
                </template>
                <template data-desc="历史消息渲染" v-for="chat, idx in historyMessage?.data">
                    <div v-if="chat.role === 'user'">
                        <div class="pb-1 username">
                            {{ userMeta.nickname }}
                        </div>
                        <div class="pb-3 user-message flex align-center">
                            <v-avatar class="ml-4" rounded="sm">
                                <img src="@/assets/images/avatars/avatar_user.jpg" alt="alt" />
                            </v-avatar>
                            <div v-if="chat.content_type === 'text' && !isJSONText(chat.content)"
                                class="md-preview-container">
                                <v-card class="gradient gray text-pre-wrap" theme="dark">
                                    <v-card-text><b> {{ chat.content.replace("OptionSelectEvent::Answer::","") }}</b></v-card-text>
                                </v-card>
                            </div>
                            <div v-if="chat.content_type === 'object_string'" class="md-preview-container">
                                <v-card class="gradient gray text-pre-wrap" theme="dark">
                                    <v-card-text>
                                        <template v-for="item, index in JSON.parse(chat.content)">
                                            <p v-if="item.type === 'text'"><b> {{ item.text }}</b></p>
                                            <div v-if="item.type === 'image'"><v-img
                                                    @click="showPreview([item.file_url], idx)" width="100px"
                                                    :src="item.file_url || item.file_id" /></div>
                                        </template>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </div>
                    </div>
                    <div data-desc="非JSON信息"
                        v-else-if="chat.content_type !== 'card' && !isJSONText(chat.id, chat.content)">
                        <div class="pb-1 botname">
                            {{ botInfo?.name }}
                        </div>
                        <div v-if="chat.content.indexOf('OptionSelectEvent::')===0 && handleOptionSelectEventContent(chat.content).title" class="px-2 px-md-5 assistant-message">
                            <v-avatar class="d-none d-md-block mr-2 mr-md-4" rounded="sm" variant="elevated">
                                <img src="@/assets/images/avatars/avatar_assistant.jpg" alt="alt" />
                            </v-avatar>
                            <div v-if="idx===0"  class="md-preview-container">
                                <v-card>
                                    <v-card-text>
                                        <h1 class="mb-4">{{ lastOptionSelectEvent.title }}</h1>
                                        <v-radio-group v-model="lastOptionSelectEvent.selected">
                                            <v-radio v-for="item in lastOptionSelectEvent.options"
                                                :label="item.label" :value="item.value"></v-radio>
                                        </v-radio-group>
                                        <v-card-actions class="justify-end">
                                            <v-btn color="#fff" @click="streamingChat('OptionSelectEvent::Answer::取消任务')" variant="flat">取消</v-btn>
                                            <v-btn color="primary" @click="streamingChat(lastOptionSelectEvent.selected)" variant="flat">确认选择</v-btn>
                                        </v-card-actions>
                                    </v-card-text>
                                </v-card>
                            </div>
                            <div v-else class="md-preview-container">
                                <v-card>
                                    <v-card-text>
                                        <h1 class="mb-4">{{ handleOptionSelectEventContent(chat.content).title }}</h1>
                                        <v-radio-group>
                                            <v-radio readonly v-for="item in handleOptionSelectEventContent(chat.content).options"
                                                :label="item.label" :value="item.value"></v-radio>
                                        </v-radio-group>
                                        <v-card-actions class="justify-end">
                                            该选项已过期...
                                        </v-card-actions>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </div>
                        <div v-else class="px-2 px-md-5 assistant-message">
                            <v-avatar class="d-none d-md-block mr-2 mr-md-4" rounded="sm" variant="elevated">
                                <img src="@/assets/images/avatars/avatar_assistant.jpg" alt="alt" />
                            </v-avatar>
                            <div class="md-preview-container">
                                <v-card>
                                    <md-preview :modelValue="chat.content" class="py-2 font-1" />
                                </v-card>
                            </div>
                        </div>
                    </div>
                    <div v-if="isJSONText(chat.id, chat.content) && jsonMaps[chat.id] && jsonMaps[chat.id].imageItems!=null && (jsonMaps[chat.id].is_message)===false">
                        <div>
                            <div class="pb-1 botname">
                                {{ botInfo?.name }}
                            </div>
                            <div class="px-2 px-md-5 assistant-message">
                                <v-avatar class="d-none d-md-block mr-2 mr-md-4" rounded="sm" variant="elevated">
                                    <img src="@/assets/images/avatars/avatar_assistant.jpg" alt="alt" />
                                </v-avatar>
                                <div class="md-preview-container">
                                    <v-card>
                                        <div class="flex flex-wrap" v-for="item in jsonMaps[chat.id].imageItems">
                                            <v-img
                                                @click="showPreview(jsonMaps[chat.id].imageItems.map(item => item.previewPath), idx)"
                                                width="160px" :data-id="item.id" :data-title="item.title"
                                                :src="item.previewPath">
                                            </v-img>
                                            <div class="w-full flex justify-end px-3 py-1">
                                                <v-tooltip location="top" text="重新生成">
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn v-bind="props" class="ml-1" color="primary" size="16"
                                                            elevation="2" variant="tonal"><v-icon
                                                                size="12">mdi-image-refresh</v-icon></v-btn>
                                                    </template>
                                                </v-tooltip>
                                                <v-tooltip location="top" text="图片处理">
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn v-bind="props" class="ml-1" color="primary" size="16"
                                                            elevation="2" variant="tonal"><v-icon
                                                                size="12">mdi-pencil</v-icon></v-btn>
                                                    </template>
                                                </v-tooltip>
                                                <v-tooltip location="top" text="局部改图">
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn v-bind="props" class="ml-1" color="primary" size="16"
                                                            elevation="2" variant="tonal"><v-icon
                                                                size="12">mdi-image-area</v-icon></v-btn>
                                                    </template>
                                                </v-tooltip>
                                                <v-tooltip location="top" text="以图生图">
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn v-bind="props" class="ml-1" color="primary" size="16"
                                                            elevation="2" variant="tonal"><v-icon
                                                                size="12">mdi-image-move</v-icon></v-btn>
                                                    </template>
                                                </v-tooltip>
                                            </div>
                                        </div>
                                    </v-card>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </v-infinite-scroll>
        </div>
        <div class="input-area">
            <v-row>
                <v-col cols="12">
                    <v-row v-if="uploadedFiles.length > 0">
                        <v-col cols="12">
                            <v-card class="py-4 opacity-80">
                                <v-card-text class="w-full py-0 pb-1">
                                    <p>您上传的文件</p>
                                </v-card-text>
                                <v-card-text class="flex py-0">
                                    <div v-for="(file, index) in uploadedFiles" class="mr-1 position-relative">
                                        <v-img @click="showPreview(uploadedFiles.map(x => x.preview), index)"
                                            :src="file.preview" width="42" height="42" cover></v-img>
                                        <v-btn color="white" size="8" @click="removeFile(index)"
                                            class="position-absolute -right-1 -top-1">
                                            <v-icon size="4">mdi-close</v-icon>
                                        </v-btn>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-textarea v-model="inputMessage" :placeholder="$t('system.promptPlaceholder')" :rows="inputRow"
                        @keydown="handleKeydown" auto-grow hide-details @focus="inputRow = 3" @blur="inputRow = 1"
                        class="mb-2"></v-textarea>
                    <v-row no-gutters>
                        <v-col cols="6">
                            <v-tooltip location="top" text="历史工作室">
                                <template v-slot:activator="{ props }">
                                    <v-btn size="small" v-bind="props" icon @click="showHistorySession()" class="float-left">
                                        <v-icon>mdi-clipboard-text-clock</v-icon>
                                    </v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip location="top" text="新的工作室">
                                <template v-slot:activator="{ props }">
                                    <v-btn size="small" v-bind="props" icon @click="newSession()" class="float-left ml-2">
                                        <v-icon>mdi-chat-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip location="top" text="上传文件">
                                <template v-slot:activator="{ props }">
                                    <v-btn size="small" v-bind="props" icon @click="$refs.fileInput.click()"
                                        class="float-left ml-2">
                                        <v-icon>mdi-paperclip</v-icon>
                                    </v-btn>
                                </template>
                            </v-tooltip>
                            <input ref="fileInput" type="file" style="display: none" @change="handleFileUpload"
                                multiple>
                        </v-col>
                        <v-col cols="6" class="text-right">
                            <v-tooltip v-if="!answering" location="top" text="发送消息">
                                <template v-slot:activator="{ props }">
                                    <v-btn size="small" icon @click="streamingChat()">
                                        <v-icon>mdi-send</v-icon>
                                    </v-btn>
                                </template>
                            </v-tooltip>
                            <div v-else class="stop-area">
                                <v-btn @click="stop" append-icon="mdi-stop">停止响应</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
        <ImagePreview ref="previewRef" />
        <!--div class="input-area">
            <v-sheet v-if="!posting" color="transparent" elevation="0" class="input-panel d-flex align-end pa-1">
                <transition name="fade">
                    <v-textarea class="mx-2" color="primary" type="text" clearable variant="solo" ref="input"
                        v-model="inputMessage" :placeholder="$t('system.promptPlaceholder')" hide-details
                        @keydown="handleKeydown" :rows="inputRow" @focus="inputRow = 3"
                        @blur="inputRow = 1"></v-textarea>
                </transition>
                <v-btn class="mb-1" color="primary" variant="elevated" icon @click="streamingChat()">
                    <v-icon>mdi-send</v-icon>
                </v-btn>
                <v-btn class="mb-1" color="primary" variant="elevated" icon @click="$refs.fileInput.click()">
                    <v-icon>mdi-paperclip</v-icon>
                </v-btn>
                <input ref="fileInput" type="file" style="display: none" @change="handleFileUpload" />
            </v-sheet>
            <div v-else class="stop-area">
                <v-btn @click="stop" append-icon="mdi-stop">停止响应</v-btn>
            </div>
        </div-->
    </div>
    <v-navigation-drawer
    v-model="sessionListDrawer"
    temporary
    location="right"
  >
    <v-list-item
      :prepend-avatar="userMeta.url"
      :title="userMeta.nickname"
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-subheader>历史会话</v-list-subheader>
      <v-list-item
        v-for="session in sessionList"
        :key="session.session_id"
        :value="session"
        :title="`${session.title}（${getDateTile(session.created_at)}）`"
        :subtitle="session.created_at"
        @click="enterSession(session.conversation_id)"
        :active="session.conversation_id === conversationModel.id"
      >
        <template v-slot:prepend>
          <v-avatar color="primary" variant="tonal">
            {{ session.title.charAt(0).toUpperCase() }}
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import Loading from "@/components/animations/AnimaitonCss02.vue";
import { MdPreview } from "md-editor-v3";
import AnimationChat from "@/components/animations/AnimationChat1.vue";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { BotInfo, ChatV3Message, Conversation, CozeAPI, EnterMessage, ListMessageData, ObjectStringItem, RoleType } from "@coze/api";
import { getToken } from "@/cache/cookies";
import { useAuthStore } from "@/stores/authStore";
import { TokenInfo } from "@/api/types/login";
import ImagePreview from "@/components/ImagePreviewNew.vue";
import { saveSession, listSession } from "@/api/account";

const snackbarStore = useSnackbarStore();
const { user } = useAuthStore()
// change the access key to your own
const ACCESS_KEY = "pat_L65TY6qQH6G2fnZxJlt8II2u9UqxEwXVXqXgy8X8NcrlgDSsZ1aM4s75V7X2kyfV";
const BOT_ID = "7437406737831444521"

const userMeta = {
    id: user.id,
    url: user.profile?.avatar ? `/disk/img?id=${user.profile?.avatar}` : 'https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/obric/coze/favicon.1970.png',
    nickname: user.profile?.nickname || user.profile?.realname || user.profile.username || `User_${user.id}`,
}

const client = new CozeAPI({
    token: ACCESS_KEY || '',
    baseURL: "/coze/api",
    allowPersonalAccessTokenInBrowser: true,
});
const botInfo = ref<BotInfo>()
const inputMessage = ref('')
const enterMessage = ref<EnterMessage[]>()
const outputMessage = ref('')
const answerMessage = ref<ChatV3Message>()
const chat_id = ref('')
const conversationModel = ref<Conversation>({
    id: "",
    created_at: 0,
    meta_data: {

    }
})
const historyMessage = ref<ListMessageData>({
    data: [],
    first_id: "",
    last_id: "",
    has_more: true
})
/** 发送问题中 */
const posting = ref(false)
/** AI输出中 */
const answering = ref(false)
const inputRow = ref(1)
const uploadedFiles = ref<any[]>([])
const fileInput = ref()
const previewRef = ref()
const jsonMaps = ref({})
const lastOptionSelectEvent = reactive({
    title: "",
    options: [] as any[],
    selected: ""
})

async function streamingChat(query: string = "", hidden: boolean = false) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    /** 开始新的问答 */
    if (uploadedFiles.value.length > 0) {
        const contents: ObjectStringItem[] = [{ type: 'text', text: inputMessage.value } as ObjectStringItem]
        uploadedFiles.value.map((x) => {
            if (x.preview) contents.push({ type: "image", file_id: x.id, file_url: x.preview })
            else contents.push({ type: "file", file_id: x.id })
        });

        enterMessage.value = [
            {
                role: RoleType.User,
                content: JSON.stringify(contents),
                content_type: 'object_string',
            },
        ];
    } else {
        enterMessage.value = [
            {
                role: RoleType.User,
                content: query || inputMessage.value,
                content_type: 'text',
            },
        ];
    }

    /** 初始化参数 */
    answering.value = false
    posting.value = false
    inputMessage.value = ""
    outputMessage.value = ""

    if (!hidden) {
        posting.value = true
        /** 将最后的问答消息PUSH到历史消息 */
        if (enterMessage.value?.length) {
            enterMessage.value.map(x => {
                historyMessage.value.data.unshift(x as ChatV3Message)
            })
        }
    }
    uploadedFiles.value = []
    const v = await client.chat.stream({
        bot_id: BOT_ID,
        user_id: userMeta.id,
        conversation_id: conversationModel.value.id,
        auto_save_history: !hidden,
        additional_messages: enterMessage.value,
    });
    console.log('=== End of Streaming Chat ===');


    let msg = '';
    for await (const part of v) {
        if (typeof part === 'string' || hidden) {
            continue;
        }
        if (part.event === 'conversation.chat.created') {
            console.log('[START]');
            /** AI已经开始响应 */
            answering.value = true
        } else if (part.event === 'conversation.message.delta') {
            msg += part.data.content;
            outputMessage.value = msg
        } else if (part.event === 'conversation.message.completed') {
            const { role, type, content } = part.data;
            if (role === 'assistant' && type === 'answer') {
                msg += '\n';
                outputMessage.value = msg
            } else {
                console.log('[%s]:[%s]:%s', role, type, content);
            }
            if (part.data.type === 'answer') {
                answerMessage.value = part.data as ChatV3Message
                if (answerMessage.value)
                    historyMessage.value.data.unshift(answerMessage.value)
            }
        } else if (part.event === 'conversation.chat.completed') {
            inputMessage.value = ''
            console.log(part.data.usage);
        } else if (part.event === 'done') {
            posting.value = false
            answering.value = false
            console.log(part.data);
        }
    }
    //outputMessage.value = outputMessage.value.replace('#_initial_set_agent success#', '智能体初始化成功...')
}


const handleKeydown = (e) => {
    if (e.key === "Enter" && (e.altKey || e.shiftKey)) {
        // 当同时按下 alt或者shift 和 enter 时，插入一个换行符
        e.preventDefault();
        inputMessage.value += "\n";
    } else if (e.key === "Enter") {
        // 当只按下 enter 时，发送消息
        e.preventDefault();
        streamingChat();
    }
};

const stop = async () => {
    posting.value = false
    answering.value = false
    inputMessage.value = ''
    if (chat_id.value)
        await client.chat.cancel(conversationModel.value.id, chat_id.value)
}
const load = async ({ done }) => {
    if (!historyMessage.value.has_more) return done('empty')
    /** 取出用户会话的历史消息 */
    const apiResponse = await client.conversations.messages.list(conversationModel.value.id, { after_id: (historyMessage.value.last_id || "0"), limit: 20 });
    historyMessage.value.data = historyMessage.value.data.concat(apiResponse.data)
    historyMessage.value.first_id = apiResponse.first_id;
    historyMessage.value.last_id = apiResponse.last_id;
    historyMessage.value.has_more = apiResponse.has_more;
    return done('ok')
}


const handleFileUpload = async (event) => {
    const files: any = Array.from(event.target.files)
    for (const file of files) {
        const { id } = await client.files.upload({ file })
        const reader = new FileReader()
        reader.onload = (e) => {
            uploadedFiles.value.push({
                id,
                name: file.name,
                preview: isImageFile(file) ? e.target?.result : null,
                file: file
            })
        }
        reader.readAsDataURL(file)
    }
    snackbarStore.showSuccessMessage('Files uploaded successfully')
}

const removeFile = (index) => {
    uploadedFiles.value.splice(index, 1)
}

const isImageFile = (file) => {
    if (!file?.type) return false
    return file.type.indexOf('image/') === 0
}

const showPreview = (imgs: string[], index: number) => {
    previewRef.value?.open(imgs, index)
}

const isJSONText = (id: string, text: string) => {
    try {
        if (JSON.parse(text)) {
            jsonMaps.value[id] = JSON.parse(text)
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

const handleOptionSelectEventContent = (content: string) => {
    // Content Demo: OptionSelectEvent::#请您为本次生图任务选择一个图片处理的大模型。# \n- 默认\n- FLUX\n- MJ\n
    const tmpContent = content.replace("OptionSelectEvent::#", "").replace("#", "")
    const contentArr = tmpContent.split('\n')
    const title = contentArr[0]
    const options = contentArr.splice(1, contentArr.length - 1).map(x => {
        return {
            label: x.replace("OptionSelectEvent::Answer::", ""),
            value: x
        }
    }).filter(x=> x.value)
    lastOptionSelectEvent.options = options
    lastOptionSelectEvent.selected = options[0].value
    lastOptionSelectEvent.title = title
    return {
        title,
        options
    }
}

const sessionList = ref<any[]>([])
const sessionListDrawer = ref(false)

const showHistorySession = ()=>{
    sessionListDrawer.value = true
}
const newSession = async ()=>{
    /** 保存当前的会话 */
    const { data } = await saveSession({
        title: "AI会话",
        conversation_id: conversationModel.value.id,
    })
    sessionList.value.unshift(data)

    /** 新建会话 */
    const { id } = (await client.conversations.create({
        meta_data: userMeta
    }))
    localStorage.setItem("conversation_id", id)
    conversationModel.value = await client.conversations.retrieve(id)
    /** 清空原会话数据 */
    historyMessage.value = {
        data: [],
        first_id: "",
        last_id: "",
        has_more: true
    }
    jsonMaps.value = {}
    lastOptionSelectEvent.options = []
    lastOptionSelectEvent.title=""
    lastOptionSelectEvent.selected=""
    const tmpToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0MTdmMGZmLTljN2QtNGVhNy04MTQ0LTZkMmI4ZWFlOTFjZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJtYW5hZ2UiOnRydWUsImV4cCI6MTc2NzkxODIyNSwidHlwZSI6eyJpZCI6Ijk0ZDFjOWRlLTBhZTAtNGNmMS04N2I2LWRlNTVjZGIzYWQyYSIsIm5hbWUiOiJkZWZhdWx0IiwidGl0bGUiOiLkvJrlkZgiLCJkZXNjcmlwdGlvbiI6IiIsImRpc3BsYXlfb3JkZXIiOjEsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTA2IDE4OjAyOjMxIiwidXBkYXRlZF9hdCI6IjIwMjQtMDgtMTIgMTY6MDk6MzkifSwiaWF0IjoxNzMxOTIxODI1fQ.ZqBKyy2hPvlrrGA7vDxOS77bJQFDKyat_vJ5IHtm6mA'
    streamingChat(`_initial_set_agent custom_name=${user.username}助理,token=${tmpToken},user_id=${user.id}`, true)
}
const enterSession = async (id: string)=>{
    localStorage.setItem("conversation_id", id)
    conversationModel.value = await client.conversations.retrieve(id)
    /** 清空原会话数据 */
    historyMessage.value = {
        data: [],
        first_id: "",
        last_id: "",
        has_more: true
    }
    jsonMaps.value = {}
    lastOptionSelectEvent.options = []
    lastOptionSelectEvent.title=""
    lastOptionSelectEvent.selected=""
    const tmpToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0MTdmMGZmLTljN2QtNGVhNy04MTQ0LTZkMmI4ZWFlOTFjZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJtYW5hZ2UiOnRydWUsImV4cCI6MTc2NzkxODIyNSwidHlwZSI6eyJpZCI6Ijk0ZDFjOWRlLTBhZTAtNGNmMS04N2I2LWRlNTVjZGIzYWQyYSIsIm5hbWUiOiJkZWZhdWx0IiwidGl0bGUiOiLkvJrlkZgiLCJkZXNjcmlwdGlvbiI6IiIsImRpc3BsYXlfb3JkZXIiOjEsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTA2IDE4OjAyOjMxIiwidXBkYXRlZF9hdCI6IjIwMjQtMDgtMTIgMTY6MDk6MzkifSwiaWF0IjoxNzMxOTIxODI1fQ.ZqBKyy2hPvlrrGA7vDxOS77bJQFDKyat_vJ5IHtm6mA'
    streamingChat(`_initial_set_agent custom_name=${user.username}助理,token=${tmpToken},user_id=${user.id}`, true)
}

const getDateTile = (date: string)=>{
    /** 根据传入的时间字符串，判断与今天的时差，分别输出
     * 1.今天
     * 2.昨天
     * 3.几天前
     * 4.一周前
     * 5.几周前
     * 6.某月
     */
     const now = new Date()
     const dateObj = new Date(date)
     const diff = now.getTime() - dateObj.getTime()
     const dayDiff = Math.floor(diff / (24 * 3600 * 1000))
     if (dayDiff === 0) {
         return "今天"
     } else if (dayDiff === 1) {
         return "昨天"
     } else if (dayDiff < 7) {
         return dayDiff + "天前"
     } else if (dayDiff < 30) {
         return Math.floor(dayDiff / 7) + "周前"
     } else if (dayDiff < 365) {
         return Math.floor(dayDiff / 30) + "月前"
     } else {
         return Math.floor(dayDiff / 365) + "年前"
     }
}

onMounted(async () => {
    const { data } = await listSession({
        idx: 1,
        size: 20
    })
    if(data) sessionList.value = data
    botInfo.value = await client.bots.retrieve({ bot_id: BOT_ID });
    let conversation_id
    /** 首先取本地的会话ID，这个ID是最新的，没有存储的 */
    if (localStorage.getItem("conversation_id")) conversation_id = localStorage.getItem("conversation_id") || "";
    if (!conversation_id) {
        /** 本地没有的情况下 */
        if(sessionList.value.length>0)   //默认为存储中的第一个
            conversation_id = sessionList.value[0].conversation_id
        else{
            // 如果存储列表中没有就会新建一个
            const { id } = (await client.conversations.create({
                meta_data: userMeta
            }))
            conversation_id = id
            localStorage.setItem("conversation_id", id)
        }
    }
    conversationModel.value = await client.conversations.retrieve(conversation_id)
    if(!sessionList.value.find(x=> x.conversation_id===conversation_id)){
        sessionList.value.push({
            title: "新建会话",
            conversation_id,
            created_at: Intl.DateTimeFormat("zh-CN",{
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).format(new Date()).replaceAll("/","-")
        })
    }

    /** 初始化用户信息 */
    const token = getToken() as TokenInfo;
    const tmpToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0MTdmMGZmLTljN2QtNGVhNy04MTQ0LTZkMmI4ZWFlOTFjZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJtYW5hZ2UiOnRydWUsImV4cCI6MTc2NzkxODIyNSwidHlwZSI6eyJpZCI6Ijk0ZDFjOWRlLTBhZTAtNGNmMS04N2I2LWRlNTVjZGIzYWQyYSIsIm5hbWUiOiJkZWZhdWx0IiwidGl0bGUiOiLkvJrlkZgiLCJkZXNjcmlwdGlvbiI6IiIsImRpc3BsYXlfb3JkZXIiOjEsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTA2IDE4OjAyOjMxIiwidXBkYXRlZF9hdCI6IjIwMjQtMDgtMTIgMTY6MDk6MzkifSwiaWF0IjoxNzMxOTIxODI1fQ.ZqBKyy2hPvlrrGA7vDxOS77bJQFDKyat_vJ5IHtm6mA'
    streamingChat(`_initial_set_agent custom_name=${user.username}助理,token=${tmpToken},user_id=${user.id}`, true)
})
</script>

<style scoped lang="scss">
.chat-bot {
    background-repeat: repeat;
    display: flex;
    position: relative;
    flex-wrap: wrap;
    overflow: hidden;

    .v-card {
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

.username {
    display: flex;
    align-content: center;
    justify-content: end;
    flex-direction: row-reverse;
    color: #ccc;
    margin-right: 54px;
}

.botname {
    display: flex;
    align-content: center;
    justify-content: start;
    flex-direction: row-reverse;
    color: #ccc;
    margin-left: 20px;
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

    .chat-bot {
        .input-area {
            width: 100%;
            padding: 0;
        }
    }
}

.md-preview-container {
    max-width: calc(80%);
    min-width: 100px;
}
</style>