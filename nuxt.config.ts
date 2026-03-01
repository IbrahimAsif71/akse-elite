export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'static'
  },
  css: ['~/assets/styles/main.css']
})