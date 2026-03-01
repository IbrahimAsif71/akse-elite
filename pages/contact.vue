<script setup>
import { ref } from 'vue'
const { $gsap } = useNuxtApp()

const h = ref(null)
const p = ref(null)

usePageIntro(() => {
  const tl = $gsap.timeline()
  tl.from(h.value, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' })
    .from(p.value, { y: 18, opacity: 0, duration: 0.7 }, '-=0.55')
})
</script>

<template>
  <section class="wrap">
    <h1 ref="h">About akse</h1>
    <p ref="p">
      akse preserves heritage through immersive 3D modeling, 360° pathways, and digital archiving.
    </p>
  </section>
</template>