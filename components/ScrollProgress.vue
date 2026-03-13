<script setup lang="ts">
import type Lenis from "lenis";

const progress = ref(0);
const route = useRoute();
const { $lenis } = useNuxtApp() as { $lenis: Lenis | null };

function onNativeScroll() {
  if (!import.meta.client) return;
  const scrollY = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;
  const maxScroll = scrollHeight - clientHeight;

  progress.value =
    maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
}

watch(
  () => route.path,
  () => {
    progress.value = 0;
  },
);

onMounted(() => {
  if ($lenis) {
    // Use Lenis scroll events for progress
    $lenis.on("scroll", (e: { progress: number }) => {
      progress.value = e.progress;
    });
  } else {
    // Fallback to native scroll (reduced-motion or no Lenis)
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    onNativeScroll();
  }
});

onBeforeUnmount(() => {
  if (!$lenis) {
    window.removeEventListener("scroll", onNativeScroll);
  }
});
</script>

<template>
  <div
    class="fixed top-0 left-0 z-50 h-[3px] bg-primary"
    :style="{ width: `${progress * 100}%` }"
    role="progressbar"
    :aria-valuenow="Math.round(progress * 100)"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Scroll progress"
  />
</template>
