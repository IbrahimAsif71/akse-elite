<script setup lang="ts">
interface Pillar {
  word: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    word: "Preserve",
    description:
      "Every site is documented with clinical precision before a single restoration decision is made.",
  },
  {
    word: "Present",
    description:
      "Raw captures are transformed into immersive, navigable 360° experiences for any device.",
  },
  {
    word: "Elevate",
    description:
      "Heritage becomes a living asset — generating engagement, tourism, and cultural reverence.",
  },
];

const missionLines: string[] = [
  "We believe the past is not a burden to carry —",
  "it is a competitive advantage waiting to be unlocked.",
  "AKSE exists to bridge the gap between physical heritage",
  "and the people who should inherit it.",
  "Every site we document becomes a digital monument.",
  "Every tour we build becomes a doorway to understanding.",
];

const sectionRef = ref<HTMLElement | null>(null);
const { $gsap, $ScrollTrigger } = useNuxtApp();
const sts: any[] = [];

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const gsap = $gsap as any;

  if (prefersReduced) {
    // Show all lines at full opacity immediately
    const lines = gsap.utils.toArray(".mission-line", sectionRef.value);
    lines.forEach((el: HTMLElement) => {
      gsap.set(el, { opacity: 1 });
    });
    return;
  }

  const ScrollTrigger = $ScrollTrigger as any;
  const lines = gsap.utils.toArray(".mission-line", sectionRef.value);

  lines.forEach((el: HTMLElement) => {
    const anim = gsap.fromTo(
      el,
      { opacity: 0.2 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 45%",
          scrub: true,
        },
      },
    );
    sts.push(anim.scrollTrigger);
  });
});

onBeforeUnmount(() => {
  sts.forEach((st) => st?.kill());
});
</script>

<template>
  <section ref="sectionRef" class="px-6 py-24 md:py-32 lg:px-12">
    <div class="mx-auto max-w-5xl">
      <!-- Mission lines -->
      <div class="mb-24 md:mb-32">
        <span
          v-for="(line, i) in missionLines"
          :key="i"
          class="mission-line block text-xl leading-relaxed text-foreground md:text-2xl"
        >
          {{ line }}
        </span>
      </div>

      <!-- Pillars -->
      <div class="grid gap-16 md:grid-cols-3 md:gap-12">
        <div v-for="pillar in pillars" :key="pillar.word">
          <h3
            class="break-words text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl"
          >
            {{ pillar.word }}
          </h3>
          <p class="mt-2 text-base text-muted-foreground">
            {{ pillar.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
