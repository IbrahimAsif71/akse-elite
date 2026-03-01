import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.9
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return { provide: { lenis } }
})