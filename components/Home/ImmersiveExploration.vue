<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const portalRef = ref<HTMLDivElement | null>(null);

let scrollTriggerInstance: ReturnType<typeof $ScrollTrigger.create> | null =
  null;

onMounted(async () => {
  if (!portalRef.value || !sectionRef.value) return;

  // Set initial collapsed scale before ScrollTrigger calculates positions
  $gsap.set(portalRef.value, { scale: 0.42, transformOrigin: "center center" });

  const tween = $gsap.to(portalRef.value, {
    scale: 0.95,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 80%",
      end: "bottom center",
      scrub: 1,
    },
  });

  scrollTriggerInstance = (tween as any).scrollTrigger ?? null;

  // Give Lenis + layout time to settle before measuring
  await nextTick();
  setTimeout(() => $ScrollTrigger.refresh(), 300);
});

onBeforeUnmount(() => {
  scrollTriggerInstance?.kill();
  scrollTriggerInstance = null;
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative min-h-[180vh] flex flex-col items-center justify-start pt-32 pb-32 bg-background overflow-hidden"
  >
    <!-- Section copy -->
    <div class="text-center mb-20 px-6 max-w-2xl mx-auto">
      <h2
        class="text-5xl lg:text-7xl font-extralight tracking-tight text-foreground leading-[1.0] mb-6"
      >
        Immersive Exploration
      </h2>
      <p
        class="text-xl font-light text-muted-foreground leading-relaxed tracking-tight mb-4"
      >
        Move through spaces as though you were there.
      </p>
      <p class="text-base font-light text-muted-foreground leading-loose">
        Our tours allow visitors to navigate environments using 360° imagery.
        Users can rotate their perspective, move between locations, and
        experience spaces through a fully interactive digital environment.
      </p>
    </div>

    <!-- Portal element — scales up as user scrolls -->
    <div
      ref="portalRef"
      class="relative w-[95%] max-w-6xl aspect-video border border-border rounded-lg overflow-hidden"
    >
      <img
        src="/images/tours/lahore_old_city_heritage_1773010984542.png"
        alt="360° tour preview: Lahore Old City heritage site"
        class="w-full h-full object-cover"
      />
      <!-- Inner vignette for portal depth -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="box-shadow: inset 0 0 60px rgba(47, 38, 30, 0.18)"
      />
      <!-- 360° label -->
      <div
        class="absolute bottom-4 right-4 text-xs font-light tracking-widest text-foreground/60 select-none"
      >
        360° →
      </div>
    </div>
  </section>
</template>
