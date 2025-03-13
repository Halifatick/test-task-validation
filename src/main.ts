import { createApp } from 'vue'

import '@/styles/app.scss'

import App from '@/App.vue'
import router from '@/router/index.ts'
import { PiniaPlugin } from '@/plugins/pinia.plugin.ts'
import { LoggerPlugin } from '@/plugins/logger.plugin.ts'

const app = createApp(App)

app.use(router)
app.use(PiniaPlugin)
app.use(LoggerPlugin)

app.mount('#app')
