export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    // Do NOT return the timer id (number). Just run it.
    window.setTimeout(() => {
      document.documentElement.classList.add('page-ready')
    }, 60)
  })
})