import { zhCN as mjCN } from "../api/toolkit/MJ";
import { zhCN as fluxCN } from "../api/toolkit/FLUX";
import menu from './zhCN/menu'
import app from './zhCN/app'

export default {
  app,
  system:{
    title: "Yorolook",
    contact: "kennychong19890925@gmail.com",
    welcome: "欢迎使用",
    slogan: "让创意照进现实",
    slogan_desc: "一站式软装AI工具，助力设计师提升工作效率",
    start_free: "免费试用",
    promptPlaceholder: "与AI交谈提出您的需求",
    language_switch: "语言选择",
    theme_toggle: "主题切换",
    primary_colors: "主系颜色",
    copyright: "",
    coin: "币",
    free: "免费",
    point: "积分",
    amount: "Y币",
    community_slogan: "加入我们的创新者和探索者社区",
    community_slogan2: "探索发现、一键同款，还可以分享作品",
    errors: {
      illegal_request: "非法请求"
    }
  },
  toolkit: {
    chatTitle: '智能AI聊天助手',
    control_panel: "控制台",
    prompt: "关键提词",
    prompt_req:"必须输入一些提词",
    prompt_tips: "请描述生成图片时使用的关键词",
    negative_prompt_tips: "请提供您不想在生成图片时使用的反向关键词",
    generate: "生成",
    generate_count: "生成数量",
    upload: "上传",
    imageurl: "图片地址",
    imageurlplaceholder: "您可以粘贴地址，也可以拖拽图片到此处，或双击进行上传",
    redstyle:"风格提词器",
    redcamera: "镜头提词器",
    redlight: "灯光提词器",
    redangle: "视角提词器",
    redelement: "元素提词器",
    redwords: "词汇大全",
    MJ: mjCN,
    FLUX: fluxCN
  },
  common: {
    add: "新增",
    cancel: "取消",
    description: "描述",
    delete: "删除",
    title: "标题",
    save: "保存",
    faq: "常见问题",
    contact: "联系我们",
    tos: "服务条款",
    policy: "隐私政策",
  },
  login: {
    username: "账户名",
    nickname: "用户名",
    realname: "真实姓名",
    occupation: "职业",
    location: "详细地址",
    email: "电子邮件",
    idcard: "身份证号",
    tips: "登录您的账户",
    title: "登录",
    phone: "手机号码",
    change: "更改",
    password: "密码",
    button: "登录",
    orsign: "或使用",
    forgot: "忘记密码？",
    noaccount: "还没有帐号？",
    create: "在此处创建一个",
    error: "手机号码/密码组合无效",
    wechat: "微信登录",
    placeholder: {
      phone: "请输入您的手机号码",
      password: "请输入您的密码",
      verify_code: "请输入手机验证码"
    },
    validate: {
      phone_required: "必须输入手机号码",
      phone_error: "请输入正确的手机号码",
      password_required: "必须输入密码",
      password_length: "密码必须至少为6位",
      verify_code_required: "必须输入验证码"
    }
  },
  register: {
    title: "创建帐号",
    username: "全名",
    email: "电子邮件",
    password: "密码",
    button: "创建帐号",
    orsign: "或注册",
    agree: "签署即表示您同意",
    account: "已经有帐号了？",
    signin: "登录",
  },
  menu,
  dashboard: {
    activity: "活动",
    weeklySales: "每周销售",
    sales: "营业额",
    recentOrders: "最近的订单",
    sources: "流量来源",
    lastweek: "与上周",
    orders: "订单",
    customers: "顾客",
    tickets: "支持票",
    viewReport: "查看报告",
  },
  // toolbox
  toolbox: {
    apikey: {
      title: "API Key",
    },
    chatgptConfig: {
      title: "ChatGPT 配置",
    },
    chatAssistant: {
      title: "聊天助手",
    },
    translationAssistant: {
      title: "翻译助手",
      targetLanguage: "目标语言",
      translate: "翻译",
      speech: "点击开始录音",
      stopSpeech: "再次点击结束录音",
      read: "朗读",
      sourceLanguagePlaceholder: "请选择目标翻译语言",
      targetLanguagePlaceholder: "可以直接粘贴文本进行阅读",
    },
    codeAssistant: {
      title: "代码助手",
    },
    playGround: {
      title: "PlayGround",
    },
  },
  chatgpt: {
    config: {
      title: "ChatGPT 配置",
      apikey: "API Key",
      proxyUrl: "代理地址",
      proxyUrlPlaceholder: "请输入你的代理地址",
      apikeyPlaceholder: "优先使用输入的apikey,否则读取环境变量的apikey",
      model: "语言模型",
      role: "扮演角色",
    },
  },
  // Vuetify 组件内部翻译
  $vuetify: {
    badge: "徽章",
    open: "开",
    close: "关",
    dataIterator: {
      noResultsText: "未找到匹配的记录",
      loadingText: "正在载入项目...",
    },
    dataTable: {
      itemsPerPageText: "每页行数：",
      ariaLabel: {
        sortDescending: "降序排列。",
        sortAscending: "升序排列。",
        sortNone: "未排序。",
        activateNone: "激活以删除排序。",
        activateDescending: "激活以降序排列。",
        activateAscending: "激活以升序排序。",
      },
      sortBy: "排序方式",
    },
    dataFooter: {
      itemsPerPageText: "每页项目：",
      itemsPerPageAll: "所有",
      nextPage: "下一页",
      prevPage: "上一页",
      firstPage: "第一页",
      lastPage: "最后一页",
      pageText: "{2}中的{0}-{1}",
    },
    datePicker: {
      itemsSelected: "已选择{0}",
      nextMonthAriaLabel: "下个月",
      nextYearAriaLabel: "明年",
      prevMonthAriaLabel: "上个月",
      prevYearAriaLabel: "去年",
    },
    noDataText: "无可用数据",
    carousel: {
      prev: "上一张",
      next: "下一张",
      ariaLabel: {
        delimiter: "{1}的轮播幻灯片{0}",
      },
    },
    calendar: {
      moreEvents: "还有{0}个",
    },
    input:{
      clear: "清除",
      appendAction: "动作",
      prependAction: "prependAction",
    },
    fileInput: {
      counter: "{0}个文件",
      counterSize: "{0}个文件（共{1}个）",
    },
    timePicker: {
      am: "AM",
      pm: "PM",
    },
    pagination: {
      ariaLabel: {
        wrapper: "分页导航",
        next: "下一页",
        previous: "上一页",
        page: "转到页面{0}",
        currentPage: "当前页，第{0}页",
      },
    },
    infiniteScroll:{
      loading: "正在加载...",
      error: "加载失败，点击重试",
      empty: "NoMore"
    }
  },
  error:{
    NoConsumCheck: '余额不足',
  },
  NoMore: "没有更多历史数据了 ..."
};
