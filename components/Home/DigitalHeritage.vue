<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const { $gsap, $ScrollTrigger } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const imageWrapperRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
  if (!sectionRef.value) return;
  const targetSection = sectionRef.value;

  setTimeout(() => {
    ctx = $gsap.context((self) => {

      // Eyebrow + dividers
      const eyebrows = self.selector?.('.reveal-eyebrow');
      if (eyebrows?.length) {
        $gsap.fromTo(eyebrows,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: targetSection, start: 'top 78%' } }
        );
      }

      // Heading lines
      const titleLines = self.selector?.('.title-line');
      if (titleLines?.length) {
        $gsap.fromTo(titleLines,
          { yPercent: 105, opacity: 0, rotate: 1.2 },
          { yPercent: 0, opacity: 1, rotate: 0, duration: 1.3, ease: 'power4.out', stagger: 0.1,
            scrollTrigger: { trigger: targetSection, start: 'top 72%' } }
        );
      }

      // Body text
      const revealTexts = self.selector?.('.reveal-text');
      if (revealTexts?.length) {
        $gsap.fromTo(revealTexts,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: targetSection, start: 'top 62%' } }
        );
      }

      // Feature cards
      const cards = self.selector?.('.feature-card');
      if (cards?.length) {
        $gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: targetSection, start: 'top 55%' } }
        );
      }

      // Image reveal (clip-path wipe)
      if (imageWrapperRef.value && imageRef.value) {
        $gsap.fromTo(imageWrapperRef.value,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 0.97 },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1,
            duration: 1.6, ease: 'power4.inOut',
            scrollTrigger: { trigger: imageWrapperRef.value, start: 'top 82%' } }
        );

        // Parallax on scroll
        $gsap.fromTo(imageRef.value,
          { yPercent: -8, scale: 1.08 },
          { yPercent: 8, scale: 1, ease: 'none',
            scrollTrigger: {
              trigger: imageWrapperRef.value,
              start: 'top bottom', end: 'bottom top', scrub: true
            } }
        );
      }

      // Divider lines grow
      const lines = self.selector?.('.divider-line');
      if (lines?.length) {
        $gsap.fromTo(lines,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: 'power3.inOut', transformOrigin: 'left center', stagger: 0.15,
            scrollTrigger: { trigger: targetSection, start: 'top 72%' } }
        );
      }

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
    class="relative bg-background py-24 lg:py-36 overflow-hidden"
  >
    <!-- Subtle teal orb top-left -->
    <div
      class="absolute -top-[30%] -left-[15%] w-[50vw] max-w-[600px] aspect-square rounded-full pointer-events-none z-0"
      style="background: radial-gradient(circle, rgba(44,122,131,0.07) 0%, transparent 65%);"
    />

    <div class="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col gap-20 lg:gap-28">

      <!-- ── Section header ── -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4 reveal-eyebrow">
          <div class="w-8 h-px bg-primary/70 divider-line flex-shrink-0" />
          <span class="text-[11px] font-medium tracking-[0.22em] uppercase text-primary/90">
            Digital Heritage Platform
          </span>
        </div>

        <div class="flex flex-col gap-0 overflow-visible max-w-3xl">
          <div class="overflow-hidden pb-1">
            <h2 class="title-line text-[clamp(2.4rem,5.5vw,5rem)] font-light leading-[1] tracking-[-0.03em] text-foreground will-change-transform">
              Preserving places
            </h2>
          </div>
          <div class="overflow-hidden pb-1">
            <h2 class="title-line text-[clamp(2.4rem,5.5vw,5rem)] font-light leading-[1] tracking-[-0.03em] will-change-transform flex items-baseline gap-3 flex-wrap">
              through
              <em class="text-primary relative inline-block">
                immersive tech
                <svg class="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 260 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
                  <path d="M2 7.5 C 60 3, 140 2, 258 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="text-primary/50" />
                </svg>
              </em>
            </h2>
          </div>
        </div>
      </div>

      <!-- ── Main content: image + text ── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">

        <!-- Left: Image -->
        <div class="lg:col-span-5 relative group">
          <div ref="imageWrapperRef" class="overflow-hidden rounded-2xl w-full aspect-[4/5] relative bg-muted/10 shadow-[0_24px_60px_-12px_rgba(47,38,30,0.18)]">
            <img
              ref="imageRef"
              src="/images/about/step-02-capture.png"
              alt="Architectural detail of a heritage site captured by AKSE"
              class="w-full h-[116%] absolute -top-[8%] left-0 object-cover will-change-transform brightness-95 group-hover:brightness-100 transition-all duration-700"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#2f261e]/75 via-transparent to-transparent opacity-90 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
            <!-- In-image label -->
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <p class="text-[10px] font-medium tracking-[0.18em] uppercase text-white/55 mb-1">Capture Stage</p>
              <p class="text-base font-light text-white leading-snug">High-fidelity 3D Scanning</p>
            </div>
          </div>

          <!-- Floating stat badge -->
          <div class="absolute -top-4 -right-4 bg-background border border-border/60 rounded-xl px-4 py-3 shadow-lg reveal-eyebrow">
            <p class="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-0.5">Accuracy</p>
            <p class="text-xl font-light text-foreground tracking-tight">99.8<span class="text-sm text-primary">%</span></p>
          </div>
        </div>

        <!-- Right: Text + features -->
        <div class="lg:col-span-7 flex flex-col gap-10 lg:pt-6">

          <!-- Intro body -->
          <div class="flex flex-col gap-5 max-w-xl">
            <p class="text-lg font-light text-foreground leading-relaxed reveal-text">
              Preserving meaningful places through cutting-edge immersive technology, making heritage accessible to everyone — anywhere in the world.
            </p>
            <p class="text-sm font-light text-muted-foreground leading-loose reveal-text">
              AKSE brings real-world environments into the digital space through interactive virtual tours. Visitors can explore culturally significant locations while gaining a deeper understanding of their history, architecture, and atmosphere.
            </p>
            <p class="text-sm font-light text-muted-foreground leading-loose reveal-text">
              By combining high-fidelity scanning with intuitive design, we create spaces that feel tangible — bridging the gap between physical reality and limitless digital exploration.
            </p>
          </div>

          <!-- Divider -->
          <div class="w-full h-px bg-border/50 divider-line origin-left" />

          <!-- Feature cards row -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="feature-card flex flex-col gap-3 p-5 rounded-xl border border-border/60 bg-surface/60 hover:border-primary/30 hover:bg-accent/30 transition-colors duration-300">
              <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-foreground mb-1">360° Capture</p>
                <p class="text-xs font-light text-muted-foreground leading-relaxed">Full spherical photography with depth mapping for complete site coverage.</p>
              </div>
            </div>

            <div class="feature-card flex flex-col gap-3 p-5 rounded-xl border border-border/60 bg-surface/60 hover:border-primary/30 hover:bg-accent/30 transition-colors duration-300">
              <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.788-1.548 2.57A24.275 24.275 0 0112 18.75a24.275 24.275 0 01-8.653-1.378c-1.578.217-2.548-1.57-1.548-2.57l1.402-1.402M5 14.5V20" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-foreground mb-1">3D Modeling</p>
                <p class="text-xs font-light text-muted-foreground leading-relaxed">Photogrammetry and point-cloud processing for accurate spatial reconstruction.</p>
              </div>
            </div>

            <div class="feature-card flex flex-col gap-3 p-5 rounded-xl border border-border/60 bg-surface/60 hover:border-primary/30 hover:bg-accent/30 transition-colors duration-300">
              <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 01.284-2.253" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-foreground mb-1">Global Access</p>
                <p class="text-xs font-light text-muted-foreground leading-relaxed">Web-based tours accessible on any device, anywhere in the world.</p>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="reveal-text">
            <a
              href="#"
              class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium tracking-wide hover:bg-foreground/85 transition-colors duration-300"
            >
              Discover Our Process
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
