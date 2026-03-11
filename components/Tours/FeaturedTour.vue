<script setup lang="ts">
import { Button } from "~/components/ui/button";

const { $gsap } = useNuxtApp();
const bgRef = ref<HTMLImageElement>();
let scaleTween: gsap.core.Tween | null = null;

const featured = {
  id: "golra-sharif",
  title: "Golra Sharif Railway Museum",
  kicker: "Featured Experience",
  year: "1881",
  style: "Victorian Architecture",
  captureType: "360° Capture",
  ctaLabel: "Enter Virtual Tour",
  ctaLink: "/tours/golra-sharif",
  image: "/images/tours/rohtas_fort_heritage_1773010968806.png",
};

function onCtaEnter() {
  if (!bgRef.value) return;
  scaleTween?.kill();
  scaleTween = $gsap.to(bgRef.value, {
    scale: 1.05,
    duration: 1.2,
    ease: "power2.out",
  });
}

function onCtaLeave() {
  if (!bgRef.value) return;
  scaleTween?.kill();
  scaleTween = $gsap.to(bgRef.value, {
    scale: 1,
    duration: 1.2,
    ease: "power2.out",
  });
}

onUnmounted(() => {
  scaleTween?.kill();
});
</script>

<template>
  <section class="relative h-screen w-full overflow-hidden">
    <!-- Background image -->
    <img
      ref="bgRef"
      :src="featured.image"
      :alt="`${featured.title} — heritage railway station exterior`"
      class="absolute inset-0 h-full w-full object-cover will-change-transform"
    />

    <!-- Themed gradient overlay -->
    <div
      class="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent"
    />

    <!-- Content -->
    <div
      class="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center"
    >
      <!-- Kicker -->
      <span
        class="mb-4 inline-block rounded-full border border-primary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-[0_0_16px_var(--orange)]"
      >
        {{ featured.kicker }}
      </span>

      <!-- Headline -->
      <h1
        class="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
      >
        {{ featured.title }}
      </h1>

      <!-- Glassmorphism metadata bar -->
      <div
        class="mt-6 inline-flex items-center gap-3 rounded-full border border-border/50 bg-background/60 px-6 py-3 text-sm text-muted-foreground backdrop-blur-lg"
      >
        <span>{{ featured.year }}</span>
        <span class="text-border">•</span>
        <span>{{ featured.style }}</span>
        <span class="text-border">•</span>
        <span>{{ featured.captureType }}</span>
      </div>

      <!-- CTA with magnetic wrapper -->
      <div class="mt-8" @mouseenter="onCtaEnter" @mouseleave="onCtaLeave">
        <MagneticWrapper>
          <NuxtLink :to="featured.ctaLink">
            <Button variant="default" size="lg">
              {{ featured.ctaLabel }}
            </Button>
          </NuxtLink>
        </MagneticWrapper>
      </div>
    </div>
  </section>
</template>
