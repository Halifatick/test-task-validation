import type { Plugin } from 'vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $console: Console
    }
}

export const LoggerPlugin: Plugin = {
    install(app) {
        app.config.globalProperties.$console = console
    },
}
