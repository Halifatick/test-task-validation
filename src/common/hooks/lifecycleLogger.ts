import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated } from 'vue'

import { VITE_APP_ENABLE_DEBUG_UTILS } from '@/common/appConfig.ts'

export function useLifecycleLogger(payload: { name: string }): void {
    if (!VITE_APP_ENABLE_DEBUG_UTILS) return

    onBeforeMount(() => {
        console.log(payload.name, 'onBeforeMount')
    })

    onMounted(() => {
        console.log(payload.name, 'onMounted')
    })

    onBeforeUpdate(() => {
        console.log(payload.name, 'onBeforeUpdate')
    })

    onUpdated(() => {
        console.log(payload.name, 'onUpdated')
    })

    onBeforeUnmount(() => {
        console.log(payload.name, 'onBeforeUnmount')
    })

    onUnmounted(() => {
        console.log(payload.name, 'onUnmounted')
    })
}
