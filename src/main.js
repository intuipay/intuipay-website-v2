import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locale'
import './assets/css/index.css'

// naive-ui
import { create, NMessageProvider, NTooltip } from 'naive-ui'

const naive = create({
  components: [NMessageProvider, NTooltip],
})

createApp(App).use(router).use(i18n).use(naive).mount('#app')
