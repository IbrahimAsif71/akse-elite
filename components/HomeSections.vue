<template>
  <section class="wrap">
    <section ref="features" class="section">
      <h2>What we build</h2>
      <div class="grid">
        <div class="card">360° Immersive Tours</div>
        <div class="card">Digital Heritage Preservation</div>
        <div class="card">Museum & Cultural Archiving</div>
        <div class="card">Commercial Immersive Spaces</div>
      </div>
    </section>

    <section ref="stats" class="section dark">
      <h2>Digital Preservation Index</h2>
      <div class="grid3">
        <div class="stat"><div class="num">25+</div><div class="lbl">Sites Digitized</div></div>
        <div class="stat"><div class="num">150K+</div><div class="lbl">Sq Ft Captured</div></div>
        <div class="stat"><div class="num">300+</div><div class="lbl">Years Preserved</div></div>
      </div>
    </section>

    <section ref="cta" class="section">
      <h2>Ready to preserve your space?</h2>
      <p class="muted">Tell us about your heritage site, museum, or venue. We’ll propose the best immersive pathway.</p>
      <Magnetic>
  <NuxtLink class="btn" to="/contact">Start a Project</NuxtLink>
</Magnetic>
    </section>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const { $gsap } = useNuxtApp()
const features = ref(null)
const stats = ref(null)
const cta = ref(null)

onMounted(() => {
  ;[features.value, stats.value, cta.value].forEach((el) => {
    $gsap.from(el, {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' }
    })
  })
})
</script>

<style scoped>
.wrap{ max-width: 1100px; margin: 0 auto; padding: 90px 18px; color:white; }
.section{ padding: 90px 0; }
.dark{
  background: linear-gradient(
    160deg,
    rgba(14,38,42,0.92),
    rgba(10,28,32,0.95)
  );
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 26px;
  padding: 90px 26px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.35);
}
h2{ font-weight:300; font-size:42px; margin: 0 0 22px; }
.grid{ display:grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 18px; }
.card{
  padding: 18px;
  border-radius: 18px;
  background: rgba(32,16,14,0.55);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  transition: all .35s ease;
  font-weight: 600;
}

.card:hover{
  background: rgba(201,101,61,0.16);
  border-color: rgba(201,101,61,0.45);
  transform: translateY(-6px);
}
.grid3{ display:grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 18px; }
.stat{ background: linear-gradient(180deg, var(--surface-2), var(--surface)); padding: 28px; border-radius: 18px; text-align:center; }
.num{ color:var(--rust); font-size:40px; }
.lbl{ opacity:0.85; margin-top: 10px; }
.muted{ opacity:0.85; line-height:1.8; max-width: 760px; }
.btn{ display:inline-block; margin-top: 18px; background:var(--rust); padding: 12px 18px; border-radius: 999px; color:white; text-decoration:none; }
</style>