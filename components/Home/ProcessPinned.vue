<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    title: "Capture",
    description:
      "We immerse ourselves in your story — on-location shoots, archival research, and deep discovery sessions that uncover what makes your heritage unique.",
  },
  {
    number: 2,
    title: "Craft",
    description:
      "Every frame, transition, and interaction is designed with intention. We build cinematic web experiences using cutting-edge technology and meticulous attention to detail.",
  },
  {
    number: 3,
    title: "Publish",
    description:
      "From performance tuning to seamless deployment, we launch your experience to the world — fast, accessible, and built to make an impression.",
  },
];

const triggerRef = ref<HTMLElement | null>(null);
const scrollContainerRef = ref<HTMLElement | null>(null);
const mobileCardsRef = ref<HTMLElement | null>(null);
let scrollTween: any = null;
let scrollTriggerInstance: any = null;
const isMobile = ref(false);

function checkMobile() {
  isMobile.value = window.innerWidth < 768;
}

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);

  nextTick(() => {
    setupAnimations();
  });
});

function setupAnimations() {
  // Kill previous
  scrollTriggerInstance?.kill();
  scrollTween = null;

  if (isMobile.value) {
    // Mobile: simple fade-in for stacked cards
    if (mobileCardsRef.value) {
      const cards = mobileCardsRef.value.querySelectorAll(".process-card");
      cards.forEach((card) => {
        $gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }
  } else {
    // Desktop: horizontal scroll
    if (!triggerRef.value || !scrollContainerRef.value) return;

    const container = scrollContainerRef.value;
    const scrollDistance = container.scrollWidth - container.offsetWidth;

    scrollTween = $gsap.to(container, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.value,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollDistance}`,
        invalidateOnRefresh: true,
      },
    });
    scrollTriggerInstance = scrollTween.scrollTrigger;
  }
}

watch(isMobile, () => {
  nextTick(() => {
    $ScrollTrigger.getAll().forEach((st: any) => st.kill());
    setupAnimations();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
  scrollTriggerInstance?.kill();
});
</script>

<template>
  <!-- Desktop: horizontal scroll pinned layout -->
  <section
    v-if="!isMobile"
    ref="triggerRef"
    class="relative min-h-screen overflow-hidden bg-background"
  >
    <div class="flex h-screen items-center">
      <!-- Left pinned heading -->
      <div class="shrink-0 w-[40vw] max-w-md px-6 lg:px-12">
        <p class="text-sm font-semibold uppercase tracking-widest text-primary">
          How We Work
        </p>
        <h2
          class="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Our Process
        </h2>
        <p class="mt-4 text-muted-foreground">
          Three phases. One seamless experience.
        </p>
      </div>

      <!-- Horizontal scroll container — extra padding ensures card 3 is fully visible -->
      <div
        ref="scrollContainerRef"
        class="flex h-full items-center gap-8 pr-[25vw]"
      >
        <div
          v-for="step in steps"
          :key="step.number"
          class="flex h-[60vh] w-[60vw] max-w-lg shrink-0 flex-col justify-center rounded-2xl border border-border bg-card p-10 lg:p-14"
        >
          <span class="text-7xl font-bold text-primary/20 lg:text-8xl">
            {{ String(step.number).padStart(2, "0") }}
          </span>
          <h3 class="mt-4 text-3xl font-bold text-foreground lg:text-4xl">
            {{ step.title }}
          </h3>
          <p class="mt-4 text-lg leading-relaxed text-muted-foreground">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Mobile: stacked vertical layout -->
  <section
    v-else
    class="bg-background px-6 py-16"
  >
    <div class="mx-auto max-w-lg">
      <p class="text-sm font-semibold uppercase tracking-widest text-primary">
        How We Work
      </p>
      <h2
        class="mt-3 text-3xl font-bold tracking-tight text-foreground"
      >
        Our Process
      </h2>
      <p class="mt-3 text-sm text-muted-foreground">
        Three phases. One seamless experience.
      </p>

      <div ref="mobileCardsRef" class="mt-10 flex flex-col gap-6">
        <div
          v-for="step in steps"
          :key="step.number"
          class="process-card rounded-2xl border border-border bg-card p-8"
        >
          <span class="text-5xl font-bold text-primary/20">
            {{ String(step.number).padStart(2, "0") }}
          </span>
          <h3 class="mt-3 text-2xl font-bold text-foreground">
            {{ step.title }}
          </h3>
          <p class="mt-3 text-base leading-relaxed text-muted-foreground">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
