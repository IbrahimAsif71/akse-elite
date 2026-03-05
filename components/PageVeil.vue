<script setup lang="ts">
const nuxtApp = useNuxtApp();
const { $gsap } = nuxtApp;

const veilRef = ref<HTMLElement | null>(null);
const isActive = ref(false);
let veilTimer: ReturnType<typeof setTimeout> | undefined;

const prefersReduced = import.meta.client
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

const fadeDuration = prefersReduced ? 0.05 : 0.3;

nuxtApp.hook("page:start", () => {
  clearTimeout(veilTimer);
  isActive.value = true;

  if (veilRef.value && $gsap) {
    $gsap.killTweensOf(veilRef.value);
    $gsap.to(veilRef.value, {
      opacity: 1,
      duration: fadeDuration,
      ease: "power2.inOut",
    });
  }
});

nuxtApp.hook("page:finish", () => {
  clearTimeout(veilTimer);

  if (veilRef.value && $gsap) {
    $gsap.killTweensOf(veilRef.value);
    $gsap.to(veilRef.value, {
      opacity: 0,
      duration: fadeDuration,
      ease: "power2.inOut",
      onComplete: () => {
        isActive.value = false;
      },
    });
  } else {
    // Fallback: immediate hide
    veilTimer = setTimeout(() => {
      isActive.value = false;
    }, fadeDuration * 1000);
  }
});
</script>

<template>
  <div
    ref="veilRef"
    class="pointer-events-none fixed inset-0 z-50 bg-background"
    :style="{ opacity: 0 }"
    aria-hidden="true"
  />
</template>
