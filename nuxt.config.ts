/*
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-25 13:32:46
 * @FilePath: /cq-green-magpies-app/nuxt.config.ts
 * @Description:
 */
import { isDevelopment } from 'std-env'
import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@huntersofbook/naive-ui-nuxt',
  ],

  imports: {
    dirs: [
      // 扫描顶层目录中模块，指定特定文件名和后缀名
      'components/*/*.vue',
      // 扫描顶层目录中模块
      'composables',
      // 扫描内嵌一层深度的模块，指定特定文件名和后缀名
      'composables/*/index.{ts,js,mjs,mts}',
      // 扫描给定目录中所有模块
      'composables/**',
      'store',
    ],
  },

  appConfig: {
    wsServerPort: 4000,
  },

  runtimeConfig: {
    JWTSECRET: isDevelopment ? 'jLmbfXUz897WgG' : `${Math.random().toString(36).substring(2, 7)}`,
    cqConfig: {
      host: '192.168.1.218',
      port: '6800',
      accessToken: '',
    },
  },

  routeRules: {
    // Homepage pre-rendered at build time
    '/**': { ssr: false },
    // Product page generated on-demand, revalidates in background
    // '/products/**': { swr: true },
    // Blog post generated on-demand once until next deploy
    // '/blog/**': { isr: true },
    // Admin dashboard renders only on client-side
    // '/admin/**': { ssr: false },
    // Add cors headers on API routes
    // '/api/**': { cors: true },
    // Redirects legacy urls
    // '/old-page': { redirect: '/new-page' }
  },
  plugins: ['plugins/error.ts'],
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: true,
    },
  },

  sourcemap: isDevelopment,

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      bodyAttrs: {
        class: 'overflow-x-hidden',
      },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      script: [
        { ...(isDevelopment && { src: 'https://cdn.jsdelivr.net/npm/spacingjs', type: 'text/javascript', defer: true }) },
      ],
    },
  },

  pwa,
  devtools: {
    enabled: true,
  },
  vite: {
  },
})
