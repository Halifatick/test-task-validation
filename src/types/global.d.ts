import type { Router } from 'vue-router'

declare global {
    interface Window {
        $router: Router
    }
}
