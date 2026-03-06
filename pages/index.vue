<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();

useSeoMeta({
  title: "AKSE — Heritage Redefined",
  description:
    "AKSE is a heritage-tech studio creating Awwwards-level digital experiences. Cinematic tours, scroll-driven storytelling, and dual-theme design.",
  ogTitle: "AKSE — Heritage Redefined",
  ogDescription:
    "Heritage-tech studio crafting cinematic digital experiences for brands that value craft over convention.",
  ogImage: "/images/og-home.jpg",
});

const contentWrapperRef = ref<HTMLElement | null>(null);
const ctaSectionRef = ref<HTMLElement | null>(null);
let scaleDownTrigger: any = null;

onMounted(() => {
  if (!contentWrapperRef.value || !ctaSectionRef.value) return;

  const tween = $gsap.to(contentWrapperRef.value, {
    scale: 0.95,
    borderRadius: "24px",
    transformOrigin: "center top",
    ease: "none",
    scrollTrigger: {
      trigger: ctaSectionRef.value,
      start: "top bottom",
      end: "top center",
      scrub: 1,
    },
  });
  scaleDownTrigger = tween.scrollTrigger;

  // Refresh ScrollTrigger after content settles to fix pin/scrub calculations
  nextTick(() => {
    setTimeout(() => $ScrollTrigger.refresh(), 500);
  });
});

onBeforeUnmount(() => {
  scaleDownTrigger?.kill();
});
</script>

<template>
  <div>
    <!-- Wrapper for scale-down effect -->
    <div
      ref="contentWrapperRef"
      class="relative z-10 overflow-hidden bg-background"
    >
      <HomeHeroCinematic />
      <HomeFeaturedTours />
      <HomeProcessPinned />
    </div>

    <!-- CTA sits outside the scaled wrapper -->
    <div ref="ctaSectionRef">
      <HomeMassiveCTA />
    </div>
  </div>
</template>
