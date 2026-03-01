<template>
  <section ref="wrap" class="wrap">
    <div ref="pin" class="pin">
      <div class="left">
        <h2 ref="title">From Site to Digital Immortality</h2>
        <p class="muted">
          A structured process that preserves cultural spaces with cinematic fidelity.
        </p>
      </div>

      <div class="right">
        <div class="step" v-for="(s,i) in steps" :key="i" :ref="el => stepEls[i]=el">
          <div class="n">{{ String(i+1).padStart(2,'0') }}</div>
          <div class="t">{{ s.t }}</div>
          <div class="d">{{ s.d }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const { $gsap } = useNuxtApp()

const wrap = ref(null)
const pin = ref(null)
const title = ref(null)
const stepEls = []
const steps = [
  { t: 'Assessment', d: 'Cultural + spatial feasibility and route planning.' },
  { t: 'Capture', d: 'High-resolution imaging and spatial acquisition.' },
  { t: 'Pathway Design', d: 'Interactive navigation, hotspots, storytelling.' },
  { t: 'Optimization', d: 'Performance tuning for web + mobile delivery.' },
  { t: 'Deployment', d: 'Hosting, analytics, and partner handover.' },
]

onMounted(() => {
  // Title reveal
  $gsap.from(title.value, {
    y: 60, opacity: 0, duration: 1,
    scrollTrigger: { trigger: wrap.value, start: 'top 80%' }
  })

  // Pin the block and choreograph steps
  $gsap.to(pin.value, {
    scrollTrigger: {
      trigger: wrap.value,
      start: 'top top',
      end: '+=900',
      pin: pin.value,
      scrub: true
    }
  })

  stepEls.forEach((el, i) => {
    $gsap.fromTo(el,
      { opacity: 0.2, y: 30 },
      {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: wrap.value,
          start: () => `top+=${150 + i*140} top`,
          end: () => `top+=${260 + i*140} top`,
          scrub: true
        }
      }
    )
  })
})
</script>

<style scoped>
.wrap{ max-width: 1100px; margin:0 auto; padding: 110px 18px; color:white; }
.pin{
  display:grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 26px;
  background: rgba(19,43,53,0.55);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 26px;
  padding: 34px;
  backdrop-filter: blur(10px);
}
.left h2{ font-size: 44px; font-weight: 300; margin: 0 0 14px; }
.muted{ opacity:0.85; line-height:1.8; }
.right{ display:flex; flex-direction:column; gap: 14px; }
.step{
  background: linear-gradient(180deg, var(--surface-2), var(--surface));
  border-top: 1px solid rgba(30,107,114,0.25);
  border-radius: 18px;
  padding: 18px 18px;
}
.n{ color:var(--rust); font-size: 18px; letter-spacing:1px; }
.t{ font-size: 18px; margin-top: 6px; }
.d{ opacity:0.85; line-height:1.6; margin-top: 6px; }
@media (max-width: 900px){
  .pin{ grid-template-columns: 1fr; }
}
</style>