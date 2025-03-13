import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type UserConfigExport, type ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { compression } from 'vite-plugin-compression2'
import Sitemap from 'vite-plugin-sitemap'

const additionalScssImports = `@use '@/styles/base/_variables.scss' as *;`

const config: UserConfigExport = defineConfig(({ mode }: ConfigEnv) => ({
  base: 'test-task-validation',
  envDir: './env',
  plugins: [
    vue(),
    svgLoader(),
    compression({
      algorithm: 'gzip',
      filename: '[path][base].gz',
      threshold: 8192,
      deleteOriginalAssets: false,
      skipIfLargerOrEqual: true,
      include: /\.(html|css|js|json|svg)$/,
      exclude: /\.(map|woff2?|ttf|eot|png|jpg|jpeg|webp|gif)$/,
    }),
    compression({
      algorithm: 'brotliCompress',
      threshold: 8192,
      filename: '[path][base].br',
      deleteOriginalAssets: false,
      skipIfLargerOrEqual: true,
      include: /\.(html|css|js|json|svg)$/,
      exclude: /\.(map|woff2?|ttf|eot|png|jpg|jpeg|webp|gif)$/,
    }),
    Sitemap({ hostname: 'https://halifatick.github.io/test-task-validation' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: additionalScssImports,
        api: 'modern-compiler',
      },
    },
  },

  build: {
    target: 'esnext',
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },

  server: {
    port: 3000,
    open: true,
    cors: true,
    hmr: {
      overlay: false,
    },
  },
}))

export default config
