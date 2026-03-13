<script setup lang="ts">
import { Button } from "~/components/ui/button";

const props = defineProps<{
  tour: {
    _id: string;
    title: string;
    slug: { current: string };
    category?: string;
    location?: string;
    summary?: string;
    heroImage?: any;
  } | null;
  urlFor: (source: any) => { width: (w: number) => { url: () => string } };
}>();

const { $gsap } = useNuxtApp();
const bgRef = ref<HTMLImageElement>();
let scaleTween: gsap.core.Tween | null = null;

const heroSrc = computed(() => {
  if (props.tour?.heroImage) {
    return props.urlFor(props.tour.heroImage).width(1800).url();
  }
  return "/images/tours/rohtas_fort_heritage_1773010968806.png";
});

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
      :src="heroSrc"
      :alt="tour ? `${tour.title} — immersive heritage tour` : 'AKSE Tours'"
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
        Featured Experience
      </span>

      <!-- Headline -->
      <h1
        class="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
      >
        {{ tour?.title || "Explore Immersive Archives" }}
      </h1>

      <!-- Glassmorphism metadata bar -->
      <div
        v-if="tour"
        class="mt-6 inline-flex items-center gap-3 rounded-full border border-border/50 bg-background/60 px-6 py-3 text-sm text-muted-foreground backdrop-blur-lg"
      >
        <span v-if="tour.category">{{ tour.category }}</span>
        <span v-if="tour.category && tour.location" class="text-border">•</span>
        <span v-if="tour.location">{{ tour.location }}</span>
      </div>

      <!-- CTA with magnetic wrapper -->
      <div class="mt-8" @mouseenter="onCtaEnter" @mouseleave="onCtaLeave">
        <MagneticWrapper>
          <NuxtLink :to="tour ? `/tours/${tour.slug.current}` : '/tours'">
            <Button variant="default" size="lg"> Enter Virtual Tour </Button>
          </NuxtLink>
        </MagneticWrapper>
      </div>
    </div>
  </section>
</template>
