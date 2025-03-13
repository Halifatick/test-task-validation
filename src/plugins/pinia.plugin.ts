import type { Plugin } from 'vue'
import { createPinia } from 'pinia'

const piniaPlugin = createPinia()

export const PiniaPlugin: Plugin = {
    install(app) {
        app.use(piniaPlugin)
    },
}
