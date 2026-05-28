// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/motion/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-01-01',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: '~/features/components',
      pathPrefix: false
    }
  ],
  imports: {
    dirs: [
      'features/utils',
      'features/stores',
      'features/lib'
    ]
  },
  serverDir: 'features/server', // Nuxt 3 supports `serverDir` to point to a custom server directory
})
