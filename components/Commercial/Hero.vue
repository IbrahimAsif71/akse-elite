<script setup lang="ts">
import { Button } from "~/components/ui/button";

const stats = [
  { value: "360°", label: "Full-sphere capture, every angle" },
  { value: "4K", label: "Ultra-high resolution output" },
  { value: "2 wks", label: "Average delivery turnaround" },
  { value: "WebXR", label: "VR headset & browser ready" },
];

const { $gsap } = useNuxtApp();
const headlineRef = ref<HTMLElement>();
const bodyRef = ref<HTMLElement>();

onMounted(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;
  $gsap.from([headlineRef.value, bodyRef.value], {
    y: 24,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.1,
    clearProps: "all",
  });
});
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 pb-16 pt-40 md:px-12 lg:px-20">
    <div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
      <!-- Left: copy -->
      <div>
        <p class="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Commercial Services
        </p>

        <h1
          ref="headlineRef"
          class="text-5xl font-semibold leading-[1.04] tracking-tight text-foreground md:text-6xl"
        >
          Your space,<br />
          <span class="text-muted-foreground">made</span> immersive.
        </h1>

        <p
          ref="bodyRef"
          class="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
        >
          We deploy the same cinematic 360° capture technology we use for
          Pakistan's heritage sites — scaled for retail, hospitality, museums,
          and brand experiences. Every deliverable is web-ready, embeddable, and
          built to impress.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4">
          <Button
            as-child
            size="lg"
            class="rounded-full bg-surface-alt px-8 text-foreground shadow-sm ring-1 ring-border/50 transition-all hover:bg-border/40 hover:shadow-md"
          >
            <a href="#packages">See Packages</a>
          </Button>
          <Button
            as-child
            variant="outline"
            size="lg"
            class="rounded-full border-border/50 px-8 transition-colors hover:bg-background/80"
          >
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-2 content-start gap-5">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-3xl bg-surface-alt/40 p-6 ring-1 ring-border/50 backdrop-blur-md transition-all duration-500 hover:bg-surface-alt/60 hover:shadow-sm"
        >
          <p class="text-3xl font-medium tracking-tight text-foreground">
            {{ stat.value }}
          </p>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>

    <!-- Full-width image strip -->
    <div class="mt-24 overflow-hidden rounded-[2rem] ring-1 ring-border/40 shadow-sm group">
      <img
        src="/image1.jpeg"
        alt="Commercial 360° capture in progress"
        loading="lazy"
        class="h-[320px] w-full object-cover transition-transform duration-1000 group-hover:scale-105 md:h-[460px]"
      />
    </div>
  </section>
</template>
