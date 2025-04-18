import { createI18n } from 'vue-i18n'
import en from './en.json'
import zh from './zh.json'

// 获取浏览器语言
const browserLang = navigator.language || navigator.userLanguage
let lang = ''
if (browserLang) {
  lang = browserLang.split('-')[0]
}
lang = localStorage.getItem('lang') || lang || 'en'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    zh
  }
})

export default i18n
