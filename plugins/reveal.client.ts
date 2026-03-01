export default defineNuxtPlugin(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp()

  const run = () => {
    if (!$gsap || !$ScrollTrigger) return

    // kill old triggers on route change
    $ScrollTrigger.getAll().forEach((t: any) => t.kill())

    const els = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[]
    els.forEach((el) => {
      $gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      })
    })
  }

  // run after transitions
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', () => requestAnimationFrame(() => requestAnimationFrame(run)))
  onMounted(() => run())
})