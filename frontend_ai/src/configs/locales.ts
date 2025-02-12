import en from "@/locales/index.enUS";
import cn from "@/locales/index.zhCN";
import ja from "@/locales/index.ja";

const supported = ["cn", "en", "ja"];
let locale = "cn";

try {
  const { 0: browserLang } = navigator.language.split("-");
  if (supported.includes(browserLang)) locale = browserLang;
} catch (e) {
  console.log(e);
}

export default {
  // current locale
  locale,
  current: locale,

  // when translation is not available fallback to that locale
  fallbackLocale: "cn",

  // availabled locales for user selection
  availableLocales: [{
    code: "cn",
    flag: "cn",
    name: "china",
    label: "中文",
    messages: cn,
  },
  {
    code: "en",
    flag: "us",
    name: "united-states",
    label: "English",
    messages: en,
  },
  {
    code: "ja",
    flag: "jp",
    name: "japan",
    label: "日本語",
    messages: ja,
  },
  ],
  messages: {
    cn,
    en,
    ja
  },
};
