<template>
  <section class="homeHero">
    <video class="homeHeroBg" autoplay muted loop playsinline>
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
import { onMounted, ref } from 'vue'
const { $gsap } = useNuxtApp()
const h = ref(null)
const p = ref(null)
const btns = ref(null)

onMounted(() => {
  const tl = $gsap.timeline()
  tl.from(h.value, { y: 120, opacity: 0, duration: 1.2, ease: 'power4.out' })
    .from(p.value, { y: 50, opacity: 0, duration: 1.0 }, '-=0.8')
    .from(btns.value, { y: 30, opacity: 0, duration: 0.9 }, '-=0.7')
})
</script>

<style scoped>
/* paste ALL your .homeHero CSS here */
.homeHero{
  position: relative;
  isolation: isolate; /* IMPORTANT: prevents weird stacking with video */
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
  z-index: -1;  /* between video (-2) and text (1+) */
  background:
    radial-gradient(900px 540px at 50% 45%, rgba(0,0,0,0.35), rgba(0,0,0,0.65));
}

.homeHeroOverlay{
  position:relative;
  z-index:2;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:center;
  max-width:1100px;
  margin:0 auto;
  width:100%;
  min-height:auto;
  padding: 0 22px;
  color:white;
  text-align:left;
}

.homeHeroOverlay h1{ font-size:64px; font-weight:300; letter-spacing:1px; margin:0 0 14px; }
.homeHeroOverlay p{ font-size:18px; line-height:1.8; opacity:0.9; max-width:760px; margin:0; }
.homeHeroOverlay{ z-index: 5 !important; }

.btns{ margin-top:28px; display:flex; gap:14px; flex-wrap:wrap; }
.btn{ display:inline-block; background:var(--rust); padding:12px 18px; border-radius:999px; color:white; text-decoration:none; }
.ghost{ background: rgba(0,0,0,0.18); border: 1px solid rgba(255,255,255,0.35); }

@media (max-width: 640px){
  .homeHeroOverlay{ align-items:center; text-align:center; }
  .homeHeroOverlay h1{ font-size:44px; }
  .homeHeroOverlay p{ font-size:16px; }
  .btns{ justify-content:center; }
}


.homeHeroOverlay h1{
  font-size: clamp(38px, 6vw, 72px);
  line-height: 1.1;
}

.homeHeroOverlay p{
  font-size: clamp(15px, 2.5vw, 20px);
  max-width: 640px;
}

@media (max-width: 768px){
  .homeHeroOverlay{
    align-items: center;
    text-align: center;
    padding: 0 18px;
  }
@media (max-width: 768px){
  .homeHero{
    padding-top: calc(80px + env(safe-area-inset-top));
  }
  .homeHeroOverlay{
    padding: 0 18px;
  }
}
  .btns{
    justify-content: center;
  }
}
</style>