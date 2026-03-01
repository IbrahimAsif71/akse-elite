export default defineNuxtConfig({
  nitro: {
    preset: 'netlify'
  },

  // IMPORTANT: make sure your global stylesheet is included
  css: ['~/assets/styles/main.css']
})