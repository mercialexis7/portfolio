import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    vueJsx(),
    nightwatchPlugin({
      renderPage: './nightwatch/index.html'
    }),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), 'src/locales/**'),
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vue: ['vue', 'vue-router', 'pinia'],
          ui: ['@vueuse/head', 'vue-i18n', 'vue-matomo'],
          utils: ['axios', 'date-fns', 'ical.js', '@emailjs/browser'],
        },
      },
    },
    // Enable compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Enable gzip compression
  server: {
    compress: true,
  },
})
