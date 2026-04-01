<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
const { $gsap, $ScrollTrigger } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const portalRef = ref<HTMLDivElement | null>(null);
const infoGridRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(async () => {
  if (!sectionRef.value) return;
  const targetSection = sectionRef.value;

  await nextTick();

  setTimeout(() => {
    ctx = $gsap.context((self) => {

      // Eyebrow + heading entrance
      const headerEls = self.selector?.('.header-reveal');
      if (headerEls?.length) {
        $gsap.fromTo(headerEls,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: targetSection, start: 'top 78%' } }
        );
      }

      // Portal: scale from small rounded card → full bleed
      if (portalRef.value) {
        $gsap.fromTo(portalRef.value,
          { scale: 0.82, borderRadius: '1.5rem' },
          { scale: 1, borderRadius: '0rem', ease: 'none',
            scrollTrigger: {
              trigger: portalRef.value,
              start: 'top bottom',
              end: 'center center',
              scrub: true,
            } }
        );
      }

      // Info blocks
      const infoBlocks = self.selector?.('.info-block');
      if (infoBlocks?.length) {
        $gsap.fromTo(infoBlocks,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: infoGridRef.value, start: 'top 75%' } }
        );
      }

      // Stat numbers count-up feel (just opacity + slight scale)
      const stats = self.selector?.('.stat-item');
      if (stats?.length) {
        $gsap.fromTo(stats,
          { y: 24, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: infoGridRef.value, start: 'top 65%' } }
        );
      }

      $ScrollTrigger.refresh();
    }, targetSection);
  }, 100);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative bg-background pt-24 lg:pt-36 pb-0 overflow-hidden"
  >
    <!-- ── Section header ── -->
    <div class="container mx-auto px-6 lg:px-12 mb-14 lg:mb-20">
      <div ref="headerRef" class="flex flex-col gap-5 max-w-4xl">

        <!-- Eyebrow -->
        <div class="flex items-center gap-4 header-reveal">
          <div class="w-8 h-px bg-primary/70 flex-shrink-0" />
          <span class="text-[11px] font-medium tracking-[0.22em] uppercase text-primary/90">
            Interaction &amp; Navigation
          </span>
        </div>

        <!-- Heading -->
        <div class="overflow-hidden pb-1 header-reveal">
          <h2 class="text-[clamp(2.4rem,5.5vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-foreground">
            Move through spaces
          </h2>
        </div>
        <div class="overflow-hidden pb-1 header-reveal">
          <h2 class="text-[clamp(2.4rem,5.5vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] flex items-baseline gap-3 flex-wrap">
            as though you were
            <em class="text-primary relative inline-block">
              there.
              <svg class="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 80 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
                <path d="M2 7 C 20 3, 50 2.5, 78 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="text-primary/50" />
              </svg>
            </em>
          </h2>
        </div>

        <!-- Sub-copy -->
        <p class="text-base lg:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl header-reveal">
          Our tours let visitors navigate real environments using high-fidelity 360° imagery — rotating perspective, moving between locations, and experiencing heritage sites in rich spatial detail.
        </p>
      </div>
    </div>

    <!-- ── Expanding Portal Image ── -->
    <div class="w-full flex justify-center sticky top-0 z-10">
      <div
        ref="portalRef"
        class="relative w-full h-[58vh] md:h-[78vh] lg:h-screen overflow-hidden will-change-transform group"
      >
        <img
          src="/images/tours/lahore_old_city_heritage_1773010984542.png"
          alt="360° immersive tour preview of Lahore Old City"
          class="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-1000"
        />

        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-background via-black/15 to-transparent opacity-85 pointer-events-none" />

        <!-- Bottom info overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12 flex items-end justify-between">
          <div>
            <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-black/50 mb-1">Currently Viewing</p>
            <p class="text-lg lg:text-2xl font-light text-black leading-snug">Golra Railway Station — Islamabad</p>
          </div>
          <div class="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
            <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span class="text-xs font-medium text-white tracking-wide">360° · Interactive</span>
          </div>
        </div>

        <!-- Corner tag -->
        <div class="absolute top-8 right-8 text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mix-blend-difference">
          Immersive View
        </div>
      </div>
    </div>

    <!-- ── Info block below image ── -->
    <div class="relative bg-background z-20 pt-20 pb-28">
      <div class="container mx-auto px-6 lg:px-12">
        <div ref="infoGridRef" class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <!-- Left: pull-quote -->
          <div class="lg:col-span-5 info-block">
            <div class="flex flex-col gap-6">
              <div class="w-8 h-px bg-primary/60" />
              <p class="text-2xl lg:text-3xl font-light text-foreground leading-snug tracking-tight">
                Spatial fidelity that respects the scale and atmosphere of every original site.
              </p>
              <a
                href="#"
                class="inline-flex items-center gap-2 text-sm font-medium text-primary group/link w-fit"
              >
                <span class="group-hover/link:underline underline-offset-4">Explore all tours</span>
                <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Right: body + stats -->
          <div class="lg:col-span-6 lg:col-start-7 flex flex-col gap-8 info-block">
            <p class="text-sm lg:text-base font-light text-muted-foreground leading-loose">
              Our platform uses high-fidelity 360° photography combined with spatial metadata to give visitors a true sense of place. Every tour preserves lighting, scale, and the feeling of being present — without being there physically.
            </p>

            <!-- Stats grid -->
            <div class="grid grid-cols-3 gap-6 pt-6 border-t border-border/40">
              <div class="stat-item flex flex-col gap-1">
                <span class="text-3xl lg:text-4xl font-light text-foreground tracking-tight">4K</span>
                <span class="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Resolution</span>
              </div>
              <div class="stat-item flex flex-col gap-1">
                <span class="text-3xl lg:text-4xl font-light text-foreground tracking-tight">360°</span>
                <span class="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Panoramic</span>
              </div>
              <div class="stat-item flex flex-col gap-1">
                <span class="text-3xl lg:text-4xl font-light text-foreground tracking-tight">0ms</span>
                <span class="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Load Lag</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
