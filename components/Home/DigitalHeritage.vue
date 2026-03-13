<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);

let scrollTriggerInstance: ReturnType<typeof $ScrollTrigger.create> | null =
  null;

onMounted(() => {
  if (!imageRef.value || !sectionRef.value) return;

  const st = $gsap.to(imageRef.value, {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  scrollTriggerInstance = (st as any).scrollTrigger ?? null;
});

onBeforeUnmount(() => {
  scrollTriggerInstance?.kill();
  scrollTriggerInstance = null;
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative bg-background py-24 lg:py-36 overflow-hidden"
  >
    <div class="container mx-auto px-6 lg:px-12">
      <div
        class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start"
      >
        <!-- Text column (dominant) -->
        <div class="flex flex-col gap-6">
          <h2
            class="text-5xl lg:text-7xl xl:text-8xl font-extralight tracking-tight text-foreground leading-[1.0]"
          >
            Digital Heritage Platform
          </h2>
          <p
            class="text-xl font-light text-muted-foreground leading-relaxed tracking-tight max-w-lg"
          >
            Preserving meaningful places through immersive technology.
          </p>
          <p
            class="text-base font-light text-muted-foreground leading-loose max-w-prose"
          >
            AKSE brings real-world environments into the digital space through
            interactive virtual tours. Visitors can explore culturally
            significant locations while gaining a deeper understanding of their
            history, architecture, and atmosphere.
          </p>
        </div>

        <!-- Image column (parallax) -->
        <div class="overflow-hidden rounded-lg mt-4">
          <img
            ref="imageRef"
            src="/images/about/step-02-capture.png"
            alt="Architectural detail of a heritage site captured by AKSE"
            class="w-full object-cover aspect-[4/5]"
          />
        </div>
      </div>
    </div>
  </section>
</template>
