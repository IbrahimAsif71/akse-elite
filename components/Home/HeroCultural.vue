<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const eyebrowRef = ref<HTMLElement | null>(null);
const line1Ref = ref<HTMLElement | null>(null);
const line2Ref = ref<HTMLElement | null>(null);
const line3Ref = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);
const orbRef = ref<HTMLElement | null>(null);
const dividerRef = ref<HTMLElement | null>(null);

let ctx: ReturnType<typeof $gsap.context> | null = null;

onMounted(() => {
  if (($gsap.defaults() as any).duration < 0.1) return;

  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ defaults: { ease: "power4.out" } });

    // Orb slow fade
    tl.fromTo(
      orbRef.value,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" },
      0
    );

    // Eyebrow + divider
    tl.fromTo(
      [eyebrowRef.value, dividerRef.value],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      0.2
    );

    // Headline lines
    tl.fromTo(
      [line1Ref.value, line2Ref.value, line3Ref.value],
      { yPercent: 110, opacity: 0, rotate: 1.5 },
      { yPercent: 0, opacity: 1, rotate: 0, duration: 1.6, stagger: 0.12 },
      0.35
    );

    // Body + CTA
    tl.fromTo(
      [bodyRef.value, ctaRef.value],
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, stagger: 0.12 },
      0.75
    );

    // Image card entrance
    tl.fromTo(
      cardRef.value,
      { y: 60, opacity: 0, scale: 0.96, rotate: 1 },
      { y: 0, opacity: 1, scale: 1, rotate: 2, duration: 1.8, ease: "power3.out" },
      0.5
    );

    // Subtle card float loop
    $gsap.to(cardRef.value, {
      y: -14,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.3,
    });

    // Card parallax on scroll
    if (cardRef.value && sectionRef.value) {
      $gsap.to(cardRef.value, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
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
    class="relative min-h-[100svh] flex flex-col justify-center bg-background overflow-hidden"
  >
    <!-- Warm radial orb — background accent -->
    <div
      ref="orbRef"
      class="absolute -top-[20%] -right-[10%] w-[60vw] max-w-[720px] aspect-square rounded-full pointer-events-none z-0"
      style="background: radial-gradient(circle, rgba(201,101,61,0.12) 0%, rgba(201,101,61,0.04) 50%, transparent 70%);"
    />
    <!-- Secondary orb bottom-left -->
    <div
      class="absolute bottom-[-15%] left-[-10%] w-[40vw] max-w-[480px] aspect-square rounded-full pointer-events-none z-0"
      style="background: radial-gradient(circle, rgba(44,122,131,0.07) 0%, transparent 65%);"
    />

    <!-- Main content wrapper -->
    <div class="container mx-auto px-6 lg:px-12 relative z-10 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center min-h-[100svh]">

      <!-- ── Left column: editorial text ── -->
      <div class="lg:col-span-7 flex flex-col gap-8 lg:gap-10">

        <!-- Eyebrow + thin rule -->
        <div class="flex items-center gap-5">
          <div ref="dividerRef" class="w-10 h-px bg-primary/70 flex-shrink-0" />
          <span ref="eyebrowRef" class="text-[11px] font-medium tracking-[0.22em] uppercase text-primary/90">
            Cultural &amp; Heritage Experiences
          </span>
        </div>

        <!-- Headline -->
        <div class="flex flex-col gap-1 overflow-visible">
          <div class="overflow-hidden pb-1">
            <h1
              ref="line1Ref"
              class="text-[clamp(2.8rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-foreground will-change-transform"
            >
              Immersive
            </h1>
          </div>
          <div class="overflow-hidden pb-1">
            <h1
              ref="line2Ref"
              class="text-[clamp(2.8rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em] will-change-transform flex items-baseline gap-4 flex-wrap"
            >
              <em class="italic text-primary not-italic relative inline-block">
                Cultural
                <!-- SVG hand-drawn underline -->
                <svg
                  class="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 C 40 4, 100 2, 198 8"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    class="text-primary/60"
                  />
                </svg>
              </em>
            </h1>
          </div>
          <div class="overflow-hidden pb-1">
            <h1
              ref="line3Ref"
              class="text-[clamp(2.8rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-foreground will-change-transform"
            >
              Exploration
            </h1>
          </div>
        </div>

        <!-- Body copy -->
        <p
          ref="bodyRef"
          class="text-base lg:text-lg font-light text-muted-foreground leading-relaxed max-w-md"
        >
          AKSE transforms real-world locations into immersive virtual tours —
          letting visitors explore heritage sites, restaurants, and hospitality
          spaces from anywhere in the world through interactive 360° environments.
        </p>

        <!-- CTA row -->
        <div ref="ctaRef" class="flex flex-wrap gap-4 items-center">
          <a
            href="#"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium tracking-wide hover:bg-foreground/85 transition-colors duration-300"
          >
            Start Exploring
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide border border-border text-foreground hover:border-foreground/40 hover:bg-foreground/5 transition-colors duration-300"
          >
            View Tours
          </a>
        </div>

        <!-- Stats strip -->
        <div class="flex gap-8 pt-4 border-t border-border/50">
          <div>
            <p class="text-2xl font-light tracking-tight text-foreground">50+</p>
            <p class="text-xs tracking-[0.12em] uppercase text-muted-foreground mt-0.5">Heritage Sites</p>
          </div>
          <div class="w-px bg-border/50 self-stretch" />
          <div>
            <p class="text-2xl font-light tracking-tight text-foreground">360°</p>
            <p class="text-xs tracking-[0.12em] uppercase text-muted-foreground mt-0.5">Immersive Views</p>
          </div>
          <div class="w-px bg-border/50 self-stretch" />
          <div>
            <p class="text-2xl font-light tracking-tight text-foreground">10k+</p>
            <p class="text-xs tracking-[0.12em] uppercase text-muted-foreground mt-0.5">Virtual Visitors</p>
          </div>
        </div>
      </div>

      <!-- ── Right column: floating editorial image card ── -->
      <div class="lg:col-span-5 flex justify-center lg:justify-end items-center lg:pl-6">
        <div
          ref="cardRef"
          class="relative w-full max-w-sm will-change-transform"
          style="transform: rotate(2deg);"
        >
          <!-- Main image card -->
          <div class="rounded-2xl overflow-hidden shadow-[0_32px_80px_-12px_rgba(47,38,30,0.22)] bg-surface border border-border/30">
            <div class="relative aspect-[3/4] overflow-hidden">
              <img
                src="/images/tours/lahore_old_city_heritage_1773010984542.png"
                alt="Lahore Old City Heritage"
                class="w-full h-[115%] absolute -top-[7%] left-0 object-cover"
              />
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#2f261e]/80 via-transparent to-transparent pointer-events-none" />
              <!-- Caption inside image -->
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <p class="text-[10px] font-medium tracking-[0.18em] uppercase text-white/60 mb-1">Heritage Site</p>
                <p class="text-base font-light text-white leading-snug">Lahore Old City</p>
              </div>
            </div>
            <!-- Card footer -->
            <div class="px-5 py-4 flex items-center justify-between bg-surface">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span class="text-xs text-muted-foreground tracking-wide">Virtual Tour Available</span>
              </div>
              <span class="text-xs font-medium text-primary">360°</span>
            </div>
          </div>

          <!-- Floating mini-card accent -->
          <div class="absolute -bottom-5 -left-8 bg-background/90 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 shadow-lg">
            <p class="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Also explore</p>
            <div class="flex items-center gap-2">
              <img
                src="/images/tours/taxila_museum_heritage_1773011014212.png"
                alt="Taxila Museum"
                class="w-8 h-8 rounded-lg object-cover flex-shrink-0"
              />
              <p class="text-sm font-light text-foreground leading-tight">Taxila<br/>Museum</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom thin rule -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-border/40 z-10" />
  </section>
</template>

<style scoped>
.will-change-transform {
  will-change: transform, opacity;
}
em.not-italic {
  font-style: normal;
}
</style>
