<template>
  <section class="homeHero">
    <video
      ref="videoEl"
      class="homeHeroBg"
      autoplay
      muted
      loop
      playsinline
      webkit-playsinline
      preload="auto"
    >
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>

    <div class="homeHeroOverlay">
      <h1 ref="h">Digital Immortality</h1>
      <p ref="p">Preserving heritage through immersive 3D and 360° pathways.</p>

      <div ref="btns" class="btns">
        <NuxtLink class="btn" to="/tours">Explore Tours</NuxtLink>
        <NuxtLink class="btn ghost" to="/contact">Start Project</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const { $gsap } = useNuxtApp()

const h = ref(null)
const p = ref(null)
const btns = ref(null)
const videoEl = ref(null)

const tryPlay = async () => {
  const v = videoEl.value
  if (!v) return

  // iOS Safari quirks: make sure these are set as attributes too
  v.muted = true
  v.defaultMuted = true
  v.setAttribute('muted', '')
  v.setAttribute('playsinline', '')
  v.setAttribute('webkit-playsinline', '')

  try {
    v.load() // helps in some iOS cases
    await v.play()
  } catch (e) {
    // autoplay blocked -> user gesture required
  }
}

const onFirstGesture = () => {
  tryPlay()
}

onMounted(() => {
  // GSAP animation (text/buttons)
  const tl = $gsap.timeline()
  tl.from(h.value, { y: 120, opacity: 0, duration: 1.2, ease: 'power4.out' })
    .from(p.value, { y: 50, opacity: 0, duration: 1.0 }, '-=0.8')
    .from(btns.value, { y: 30, opacity: 0, duration: 0.9 }, '-=0.7')

  // Try autoplay
  tryPlay()

  // Fallback: first user gesture starts the video
  window.addEventListener('touchstart', onFirstGesture, { once: true, passive: true })
  window.addEventListener('click', onFirstGesture, { once: true })
})

onBeforeUnmount(() => {
  // Safety cleanup (in case route changes before "once" triggers)
  window.removeEventListener('touchstart', onFirstGesture)
  window.removeEventListener('click', onFirstGesture)
})
</script>

<style scoped>
.homeHero{
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
}

.homeHeroBg{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  pointer-events: none;
}

.homeHero::after{
  content:"";
  position:absolute;
  inset:0;
  z-index: -1;
  background: radial-gradient(
    900px 540px at 50% 45%,
    rgba(0,0,0,0.35),
    rgba(0,0,0,0.65)
  );
}

.homeHeroOverlay{
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 0 22px;
  color: white;
  text-align: left;
}

.homeHeroOverlay h1{
  font-size: clamp(38px, 6vw, 72px);
  line-height: 1.1;
  font-weight: 300;
  letter-spacing: 1px;
  margin: 0 0 14px;
}

.homeHeroOverlay p{
  font-size: clamp(15px, 2.5vw, 20px);
  line-height: 1.8;
  opacity: 0.9;
  max-width: 640px;
  margin: 0;
}

.btns{
  margin-top: 28px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.btn{
  display: inline-block;
  background: var(--rust);
  padding: 12px 18px;
  border-radius: 999px;
  color: white;
  text-decoration: none;
}

.ghost{
  background: rgba(0,0,0,0.18);
  border: 1px solid rgba(255,255,255,0.35);
}

@media (max-width: 640px){
  .homeHeroOverlay{
    align-items: center;
    text-align: center;
  }
  .btns{
    justify-content: center;
  }
}

@media (max-width: 768px){
  .homeHero{
    padding-top: calc(80px + env(safe-area-inset-top));
  }
  .homeHeroOverlay{
    align-items: center;
    text-align: center;
    padding: 0 18px;
  }
  .btns{
    justify-content: center;
  }
}
</style>