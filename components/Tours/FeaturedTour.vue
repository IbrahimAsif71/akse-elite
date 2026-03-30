<script setup lang="ts">
interface Tour {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  location?: string;
  summary?: string;
  heroImage?: any;
  status?: string;
}

const props = defineProps<{
  tour: Tour | null;
  urlFor: (source: any) => { width: (w: number) => { url: () => string } };
}>();

const { $gsap } = useNuxtApp();
const bgRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
let bgTween: gsap.core.Tween | null = null;

const bgImage = computed(() => {
  if (props.tour?.heroImage) {
    return props.urlFor(props.tour.heroImage).width(1920).url();
  }
  return "/images/tours/rohtas_fort_heritage_1773010968806.png";
});

const metaItems = computed(() => {
  const items: string[] = [];
  if (props.tour?.location) items.push(props.tour.location);
  items.push("360° Capture");
  if (props.tour?.category) items.push(props.tour.category);
  return items;
});

onMounted(() => {
  if (!contentRef.value) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const els = contentRef.value.querySelectorAll("[data-hero-el]");
  $gsap.from(els, {
    y: 28,
    opacity: 0,
    duration: 1.1,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.25,
    clearProps: "all",
  });
});

function onCTAEnter() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !bgRef.value) return;
  bgTween?.kill();
  bgTween = $gsap.to(bgRef.value, { scale: 1.06, duration: 1.4, ease: "power2.out" });
}

function onCTALeave() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !bgRef.value) return;
  bgTween?.kill();
  bgTween = $gsap.to(bgRef.value, { scale: 1, duration: 1.6, ease: "power2.inOut" });
}

onUnmounted(() => {
  bgTween?.kill();
});
</script>

<template>
  <section class="relative h-screen overflow-hidden">
    <!-- Background image layer -->
    <div ref="bgRef" class="absolute inset-0 will-change-transform">
      <img
        :src="bgImage"
        alt="Featured heritage site"
        class="h-full w-full object-cover"
      />
    </div>

    <!-- Gradient overlays for depth -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

    <!-- Content -->
    <div
      ref="contentRef"
      class="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-12 lg:px-20"
    >
      <div class="max-w-2xl">
        <!-- Kicker badge -->
        <div data-hero-el class="mb-5 inline-flex items-center gap-2.5">
          <span
            class="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
            style="box-shadow: 0 0 6px var(--orange)"
          />
          <span class="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Featured Experience
          </span>
        </div>

        <!-- Headline -->
        <h1
          data-hero-el
          class="text-5xl font-semibold leading-[1.04] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {{ tour?.title || "Immersive Heritage Tours" }}
        </h1>

        <!-- Glassmorphism metadata bar -->
        <div
          data-hero-el
          class="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-full border border-white/10 bg-background/20 px-5 py-2.5 backdrop-blur-md"
        >
          <template v-for="(item, i) in metaItems" :key="item">
            <span class="text-sm font-medium text-white/85">{{ item }}</span>
            <span
              v-if="i < metaItems.length - 1"
              class="h-0.5 w-0.5 rounded-full bg-white/35"
            />
          </template>
        </div>

        <!-- CTA -->
        <div
          data-hero-el
          class="mt-8"
          @mouseenter="onCTAEnter"
          @mouseleave="onCTALeave"
        >
          <NuxtLink
            v-if="tour"
            :to="`/tours/${tour.slug.current}`"
            class="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/40"
          >
            Enter Virtual Tour
            <svg
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </NuxtLink>
          <span
            v-else
            class="inline-flex cursor-default items-center gap-2.5 rounded-full bg-primary/50 px-8 py-3.5 text-sm font-semibold text-primary-foreground"
          >
            Experiences Coming Soon
          </span>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <div
      class="absolute bottom-9 right-8 z-10 hidden items-center gap-2.5 opacity-40 md:flex"
      aria-hidden="true"
    >
      <span class="text-[10px] font-medium uppercase tracking-[0.25em] text-white/60">
        Scroll
      </span>
      <div class="h-px w-8 bg-white/40" />
    </div>
  </section>
</template>
