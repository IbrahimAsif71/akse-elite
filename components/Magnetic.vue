<script setup lang="ts">
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const x = ref(0)
const y = ref(0)

const onMove = (e: MouseEvent) => {
  if (!el.value) return
  const r = el.value.getBoundingClientRect()
  const dx = e.clientX - (r.left + r.width / 2)
  const dy = e.clientY - (r.top + r.height / 2)
  x.value = dx * 0.12
  y.value = dy * 0.12
}
const onLeave = () => { x.value = 0; y.value = 0 }
</script>

<template>
  <div ref="el" class="mag" @mousemove="onMove" @mouseleave="onLeave"
       :style="{ transform: `translate(${x}px, ${y}px)` }">
    <slot />
  </div>
</template>

<style scoped>
.mag{ display:inline-block; transition: transform .22s cubic-bezier(.2,.8,.2,1); }
</style>