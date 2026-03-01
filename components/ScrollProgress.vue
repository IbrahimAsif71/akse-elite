<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const p = ref(0)

const onScroll = () => {
  const doc = document.documentElement
  const scrollTop = doc.scrollTop
  const max = doc.scrollHeight - doc.clientHeight
  p.value = max > 0 ? scrollTop / max : 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const width = computed(() => `${Math.round(p.value * 1000) / 10}%`)
</script>

<template>
  <div class="bar">
    <div class="fill" :style="{ width }" />
  </div>
</template>

<style scoped>
.bar{
  position: fixed;
  left: 0;
  top: 0;
  height: 3px;
  width: 100%;
  z-index: 9999;
  background: rgba(255,255,255,0.08);
}
.fill{
  height: 100%;
  background: rgba(201,101,61,0.95);
  box-shadow: 0 0 18px rgba(201,101,61,0.35);
  transition: width .08s linear;
}
</style>