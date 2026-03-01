<template>
  <div class="veil" :class="{ on: active }" aria-hidden="true"></div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(false)
const nuxtApp = useNuxtApp()

nuxtApp.hook('page:start', () => {
  active.value = true
})

nuxtApp.hook('page:finish', () => {
  // small delay makes it feel cinematic
  setTimeout(() => (active.value = false), 180)
})
</script>

<style scoped>
.veil{
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  transition: opacity 280ms ease;
  background: radial-gradient(circle at 40% 20%, rgba(20,53,66,.55) 0%, rgba(8,20,26,.88) 60%, rgba(8,20,26,.95) 100%);
}
.veil.on{
  opacity: 1;
}
</style>