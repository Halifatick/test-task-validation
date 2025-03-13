/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
    readonly VITE_APP_ENV: string
    readonly VITE_APP_ENABLE_DEBUG_UTILS?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
