<script setup lang="ts">
const { $gsap } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const eyebrowRef = ref<HTMLElement | null>(null);
const headlineRef = ref<HTMLElement | null>(null);
const subRef = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);
const galleryRef = ref<HTMLElement | null>(null);

const spaces = [
  { src: "/images/tours/lahore_old_city_heritage_1773010984542.png", label: "Golra Station" },
  { src: "/image1.jpeg", label: "Dome Restaurant" },
  { src: "/image2.jpeg", label: "Dome Restaurant" },
  { src: "/image3.jpeg", label: "Dome Restaurant" },
  { src: "/image4.jpeg", label: "Saidpur Village" },
  { src: "/image6.jpeg", label: "Saidpur Village" },
];

let ctx: ReturnType<typeof $gsap.context> | null = null;

onMounted(() => {
  const reduced = ($gsap.defaults() as any).duration < 0.1;

  if (reduced) {
    [eyebrowRef.value, headlineRef.value, subRef.value, bodyRef.value, ctaRef.value, galleryRef.value]
      .forEach((el) => { if (el) (el as HTMLElement).style.opacity = "1"; });
    return;
  }

  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(eyebrowRef.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.4 }, 0.3);
    tl.fromTo(headlineRef.value, { opacity: 0, y: 48, skewY: 1.5 }, { opacity: 1, y: 0, skewY: 0, duration: 2 }, 0.55);
    tl.fromTo(subRef.value, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.6 }, 0.9);
    tl.fromTo(bodyRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 }, 1.1);
    tl.fromTo(ctaRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.4 }, 1.3);

    tl.fromTo(
      galleryRef.value,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 1.6 },
      1.0
    );

    // Stagger the individual cards
    tl.fromTo(
      ".space-card",
      { opacity: 0, y: 24, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" },
      1.15
    );
  }, sectionRef.value ?? undefined);
});

onBeforeUnmount(() => {
  ctx?.revert();
  ctx = null;
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative h-[100svh] min-h-[100svh] flex flex-col justify-end overflow-hidden"
  >
    <!-- Video background -->
    <video
      class="absolute inset-0 w-full h-full object-cover z-0"
      src="/video.mp4"
      autoplay
      loop
      muted
      playsinline
      aria-hidden="true"
    />

    <!-- Dark overlay -->
    <div class="absolute inset-0 z-[1]" style="background: rgba(20, 14, 10, 0.72);" />

    <!-- Vignette -->
    <div
      class="absolute inset-0 z-[2] pointer-events-none"
      style="background: radial-gradient(ellipse at center, transparent 40%, rgba(10, 7, 5, 0.55) 100%);"
    />

    <!-- Content row -->
    <div class="relative z-[3] w-full px-6 lg:px-16 xl:px-24 pb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-8">

      <!-- Left: text -->
      <div class="flex flex-col items-start flex-shrink-0 lg:max-w-xl">

        <!-- Eyebrow -->
        <div ref="eyebrowRef" class="flex items-center gap-4 mb-8 opacity-0">
          <div class="w-8 h-px bg-primary/80 flex-shrink-0" />
          <span class="text-[11px] font-medium tracking-[0.26em] uppercase text-primary/90">
            Cultural &amp; Heritage Experiences
          </span>
        </div>

        <!-- Headline -->
        <h1
          ref="headlineRef"
          class="opacity-0 text-[clamp(2.4rem,5.5vw,5rem)] font-light leading-[0.94] tracking-[-0.03em] text-white mb-5 will-change-transform"
        >
          Immersive<br />
          <em class="not-italic text-primary">Cultural</em><br />
          Exploration
        </h1>

        <!-- Subtext -->
        <p ref="subRef" class="opacity-0 text-base font-light tracking-wide text-white/65 mb-4 max-w-sm leading-snug">
          Step into places where history, space, and technology converge.
        </p>

        <!-- Body -->
        <p ref="bodyRef" class="opacity-0 text-sm font-light text-white/45 leading-relaxed max-w-xs mb-10">
          AKSE transforms real-world heritage locations into immersive 360° virtual
          environments — letting visitors explore culturally significant places from
          anywhere in the world.
        </p>

        <!-- CTAs -->
        <div ref="ctaRef" class="opacity-0 flex flex-wrap gap-3 items-center">
          <a
            href="#"
            class="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-primary text-white text-sm font-medium tracking-wide hover:bg-primary/85 transition-colors duration-300"
          >
            Start Exploring
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide border border-white/20 text-white/75 hover:border-white/40 hover:bg-white/5 transition-colors duration-300"
          >
            View Tours
          </a>
        </div>
      </div>

      <!-- Right: Virtual Spaces & Artifacts -->
      <div ref="galleryRef" class="opacity-0 flex flex-col gap-3 lg:items-end">
        <!-- Section label -->
        <div class="flex items-center gap-3 mb-1">
          <div class="w-5 h-px bg-primary/60" />
          <span class="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40">
            Virtual Spaces &amp; Artifacts
          </span>
        </div>

        <!-- Image strip -->
        <div class="flex gap-2.5 items-end">
          <div
            v-for="(space, i) in spaces"
            :key="i"
            class="space-card opacity-0 relative overflow-hidden rounded-xl flex-shrink-0 group cursor-pointer"
            :class="i === 2 ? 'h-36 w-24' : i === 0 || i === 5 ? 'h-28 w-20' : 'h-32 w-22'"
            style="width: 5rem;"
          >
            <img
              :src="space.src"
              :alt="space.label"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p class="absolute bottom-2 left-0 right-0 text-center text-[9px] font-medium tracking-wide text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-1 leading-tight">
              {{ space.label }}
            </p>
          </div>
        </div>

        <!-- Count pill -->
        <div class="flex items-center gap-2 mt-1">
          <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span class="text-[10px] text-white/35 tracking-wide">Multiple locations captured</span>
        </div>
      </div>

    </div>

    <!-- Bottom rule -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-[3]" />
  </section>
</template>

<style scoped>
.will-change-transform {
  will-change: transform, opacity;
}
.w-22 {
  width: 5.5rem;
}
</style>
