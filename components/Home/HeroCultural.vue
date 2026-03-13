<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const line1Ref = ref<HTMLHeadingElement | null>(null);
const line2Ref = ref<HTMLHeadingElement | null>(null);
const line3Ref = ref<HTMLHeadingElement | null>(null);
const subheadRef = ref<HTMLParagraphElement | null>(null);
const bodyRef = ref<HTMLParagraphElement | null>(null);
const image1Ref = ref<HTMLImageElement | null>(null);
const image2Ref = ref<HTMLImageElement | null>(null);
const badgeRef = ref<HTMLDivElement | null>(null);

let ctx: ReturnType<typeof $gsap.context> | null = null;
let scrollTrigger1: any = null;
let scrollTrigger2: any = null;

onMounted(() => {
  if (($gsap.defaults() as any).duration < 0.1) return;

  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ defaults: { ease: "power4.out" } });

    // Entrance Animation
    tl.fromTo(
      [line1Ref.value, line2Ref.value, line3Ref.value],
      { yPercent: 120, opacity: 0, rotate: 2 },
      { yPercent: 0, opacity: 1, rotate: 0, duration: 1.8, stagger: 0.15 },
      0
    )
    .fromTo(
      [image1Ref.value, image2Ref.value],
      { y: 100, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 0.65, scale: 1, duration: 2, stagger: 0.2, ease: "slow(0.7, 0.7, false)" },
      0.3
    )
    .from(
      [subheadRef.value, bodyRef.value],
      { y: 30, opacity: 0, duration: 1.5, stagger: 0.1 },
      0.8
    )
    .from(
      badgeRef.value,
      { scale: 0, opacity: 0, duration: 1, ease: "back.out(1.7)" },
      1.2
    );

    // Continuous Badge Rotation
    $gsap.to(badgeRef.value, {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: "none"
    });

    // Parallax on Scroll
    if (image1Ref.value && sectionRef.value) {
      scrollTrigger1 = $gsap.to(image1Ref.value, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      }) as any;
    }

    if (image2Ref.value && sectionRef.value) {
      scrollTrigger2 = $gsap.to(image2Ref.value, {
        yPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      }) as any;
    }
  }, sectionRef.value ?? undefined);
});

onBeforeUnmount(() => {
  ctx?.revert();
  ctx = null;
  scrollTrigger1?.scrollTrigger?.kill();
  scrollTrigger2?.scrollTrigger?.kill();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative min-h-[100svh] flex flex-col justify-between bg-background overflow-hidden pt-32 pb-16"
  >
    <!-- Background Floating Parallax Images -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <img
        ref="image1Ref"
        src="/images/tours/lahore_old_city_heritage_1773010984542.png"
        alt=""
        class="absolute top-[10%] left-[55%] w-[35vw] max-w-[500px] aspect-[4/5] object-cover rounded-sm mix-blend-multiply opacity-65 rotate-[-4deg] shadow-2xl"
      />
      <img
        ref="image2Ref"
        src="/images/tours/taxila_museum_heritage_1773011014212.png"
        alt=""
        class="absolute top-[40%] left-[10%] w-[25vw] max-w-[350px] aspect-[3/4] object-cover rounded-sm mix-blend-multiply opacity-65 rotate-[3deg] shadow-xl"
      />
    </div>

    <!-- Massive Staggered Typography -->
    <div class="container mx-auto px-6 lg:px-12 relative z-10 flex-1 flex flex-col justify-center">
      <div class="flex flex-col gap-0 uppercase tracking-tighter leading-[0.85] w-full text-foreground relative z-20">
        <div class="overflow-hidden pb-4">
          <h1 ref="line1Ref" class="text-[12vw] font-bold will-change-transform text-foreground">
            Immersive
          </h1>
        </div>
        <div class="overflow-hidden pb-4 flex justify-center w-full lg:w-[110%] -ml-[5%]">
          <h1 ref="line2Ref" class="text-[14vw] font-black italic text-primary will-change-transform pr-12 drop-shadow-lg">
            Cultural
          </h1>
        </div>
        <div class="overflow-hidden pb-4 flex justify-end">
          <h1 ref="line3Ref" class="text-[12vw] font-bold will-change-transform text-foreground">
            Exploration
          </h1>
        </div>
      </div>
    </div>

    <!-- Bottom Editorial Grid -->
    <div class="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-16">
      
      <!-- Scroll Badge -->
      <div class="md:col-span-2 flex justify-start hidden md:flex">
        <div ref="badgeRef" class="relative w-24 h-24 flex items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm">
          <svg viewBox="0 0 100 100" class="w-full h-full animate-spin-slow">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text class="text-[11px] font-medium tracking-[0.2em] uppercase fill-foreground">
              <textPath href="#circlePath">Scroll Down • Explore Now •</textPath>
            </text>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Subhead -->
      <div class="md:col-span-4 md:col-start-4">
        <p
          ref="subheadRef"
          class="text-xl lg:text-2xl font-light text-foreground leading-snug tracking-tight bg-background/80 backdrop-blur-sm py-2 px-1 inline-block"
        >
          Step into places where history, space, and technology converge.
        </p>
      </div>

      <!-- Body Copy -->
      <div class="md:col-span-4 md:col-start-9">
        <p
          ref="bodyRef"
          class="text-sm lg:text-base font-light text-muted-foreground leading-relaxed bg-background/80 backdrop-blur-sm py-2 px-1"
        >
          AKSE is a digital platform that transforms real-world locations into
          immersive virtual tours. Through interactive 360° environments,
          visitors can explore heritage sites, restaurants, and hospitality
          spaces from anywhere while discovering the stories behind them.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.will-change-transform {
  will-change: transform, opacity;
}
</style>
