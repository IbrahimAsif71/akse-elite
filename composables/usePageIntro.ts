export const usePageIntro = (run: () => void) => {
  const nuxtApp = useNuxtApp()

  onMounted(() => {
    // run once initially (first load)
    requestAnimationFrame(() => requestAnimationFrame(run))

    // run after every route transition completes
    nuxtApp.hook('page:finish', () => {
      requestAnimationFrame(() => requestAnimationFrame(run))
    })
  })
}