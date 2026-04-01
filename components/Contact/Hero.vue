<script setup lang="ts">
const { $gsap } = useNuxtApp();

const heroRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) return;

  const tl = $gsap.timeline();
  tl.from(titleRef.value, {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
  tl.from(
    descRef.value,
    {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.6"
  );
});
</script>

<template>
  <section
    ref="heroRef"
    class="relative flex flex-col items-center justify-center overflow-hidden px-6 py-32 md:py-48"
  >
    <!-- Dot Grid fills the hero section bounds -->
    <div class="absolute inset-0 z-0">
      <ContactDotGrid
        :dot-size="6"
        :gap="22"
        base-color="#c2410c"
        active-color="#fb923c"
        :proximity="130"
        :speed-trigger="80"
        :shock-radius="220"
        :shock-strength="5"
        :max-speed="5000"
        :resistance="750"
        :return-duration="1.5"
      />
    </div>

    <!-- Dark gradient overlay for text legibility -->
    <div
      class="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
      style="background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 100%);"
    />

    <!-- Content -->
    <div class="relative z-20 mx-auto max-w-4xl text-center">
      <h1
        ref="titleRef"
        class="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
      >
        Let's <span class="text-orange-400">Connect</span>
      </h1>
      <p
        ref="descRef"
        class="mt-6 text-lg text-white/70 md:text-xl lg:text-2xl"
      >
        Whether you have a project in mind or just want to explore possibilities, our team is ready to collaborate.
      </p>
    </div>
  </section>
</template>
