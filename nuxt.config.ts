import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxt/image', 
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],

  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
      link: [
        { rel: "icon", type: "image/ico", sizes: "32x32", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/32.png" },
        { rel: "apple-touch-icon", type: "image/png", sizes: "180x180", href: "/180.png" },
      ]
    },
    // pageTransition: { name: 'page', mode: 'out-in' },
    // layoutTransition: { name: 'slide', mode: 'out-in' }
    layoutTransition: false,
    pageTransition: true,
  },

  build: {
    transpile: ["gsap"],
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Russian' },
    ],
    langDir: './locales',
    strategy: 'prefix_except_default',
    defaultLocale: 'ru',
    baseUrl: process.env.ORIGIN
  },

  runtimeConfig: {
    public: {
      ORIGIN: process.env.ORIGIN,
    }
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss()
    ],
  },

})