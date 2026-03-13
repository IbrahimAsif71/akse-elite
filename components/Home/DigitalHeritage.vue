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

  // Small delay to ensure rendering and DOM paints before calculating ScrollTriggers
  setTimeout(() => {
    ctx = $gsap.context((self) => {
      // 1. Title Lines Reveal
      const titleLines = self.selector?.('.title-line');
      if (titleLines && titleLines.length > 0) {
        $gsap.fromTo(
          titleLines,
          { yPercent: 120, rotateZ: 3, opacity: 0 },
          {
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: targetSection,
              start: "top 75%",
            },
          }
        );
      }

      // 2. Text Reveal
      const revealTexts = self.selector?.('.reveal-text');
      if (revealTexts && revealTexts.length > 0) {
        $gsap.fromTo(
          revealTexts,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: targetSection,
              start: "top 60%",
            },
          }
        );
      }

      // 3. Image Parallax & Reveal
      if (imageWrapperRef.value && imageRef.value) {
        // Wrapper Reveal (clip-path scale-y)
        $gsap.fromTo(
          imageWrapperRef.value,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 0.95 },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            duration: 1.8,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imageWrapperRef.value,
              start: "top 85%",
            },
          }
        );

        // Image Parallax
        $gsap.fromTo(
          imageRef.value,
          { yPercent: -10, scale: 1.05 },
          {
            yPercent: 10,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapperRef.value,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Separation Line Grow
      const lines = self.selector?.('.divider-line');
      if (lines && lines.length > 0) {
        $gsap.fromTo(
          lines,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            transformOrigin: "left center",
            stagger: 0.2,
            scrollTrigger: {
              trigger: targetSection,
              start: "top 70%",
            },
          }
        );
      }

    }, targetSection);
  }, 100);
});

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative bg-background py-24 lg:py-40 overflow-hidden flex flex-col items-center"
  >
    <div class="container mx-auto px-6 lg:px-12 flex flex-col gap-16 lg:gap-32 w-full">
      
      <!-- Massive Title Area -->
      <div class="flex flex-col w-full relative z-10 pt-10">
        <div class="overflow-hidden mb-[-2%]">
          <h2 class="title-line text-[14vw] md:text-[11vw] lg:text-[180px] xl:text-[220px] leading-[0.8] font-extralight tracking-[-0.04em] uppercase text-foreground">
            Digital
          </h2>
        </div>
        <div class="overflow-hidden sm:pl-16 md:pl-32 lg:pl-64 xl:pl-[20%] mb-[-2%]">
          <h2 class="title-line text-[14vw] md:text-[11vw] lg:text-[180px] xl:text-[220px] leading-[0.8] font-extralight tracking-[-0.04em] uppercase text-muted-foreground italic">
            Heritage
          </h2>
        </div>
        <div class="overflow-hidden text-left lg:text-right lg:pr-12">
          <h2 class="title-line text-[14vw] md:text-[11vw] lg:text-[180px] xl:text-[220px] leading-[0.8] font-extralight tracking-[-0.04em] uppercase text-foreground">
            Platform
          </h2>
        </div>
        
        <!-- Decorative subtle line -->
        <div class="w-full h-px bg-border/40 mt-16 md:mt-24 divider-line origin-left"></div>
      </div>

      <!-- Editorial Layout for Text & Image -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative z-20">
        
        <!-- Left side: The abstract idea or thin text -->
        <div class="lg:col-span-3 flex flex-col gap-8 lg:justify-end h-full lg:pb-12 order-2 lg:order-1">
          <div class="w-8 h-px bg-primary/60 divider-line hidden lg:block mb-4"></div>
          <p class="text-xs font-medium tracking-[0.2em] uppercase text-primary/80 reveal-text">
            [ Immersive Tech ]
          </p>
          <p class="text-xl md:text-2xl font-light text-foreground leading-relaxed tracking-tight reveal-text">
            Preserving meaningful places through cutting-edge immersive technology.
          </p>
          <div class="pt-4 reveal-text">
            <button class="rounded-full px-8 py-4 text-xs tracking-[0.15em] font-medium uppercase border border-foreground/20 hover:bg-foreground hover:text-background transition-colors duration-500">
              Discover Process
            </button>
          </div>
        </div>

        <!-- Center: Image -->
        <div class="lg:col-span-6 relative group order-1 lg:order-2 w-full max-w-2xl mx-auto lg:max-w-none">
          <div ref="imageWrapperRef" class="overflow-hidden rounded-sm w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] relative bg-muted/10">
            <img
              ref="imageRef"
              src="/images/about/step-02-capture.png"
              alt="Architectural detail of a heritage site captured by AKSE"
              class="w-full h-[120%] absolute -top-[10%] left-0 object-cover will-change-transform filter brightness-95 group-hover:brightness-105 transition-all duration-700"
            />
            <!-- Overlay gradient for depth -->
            <div class="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
          </div>
        </div>

        <!-- Right side: Paragaph text -->
        <div class="lg:col-span-3 flex flex-col justify-between h-full lg:pt-32 order-3">
          <div class="flex flex-col gap-6">
            <p class="text-sm font-light text-muted-foreground leading-loose reveal-text">
              AKSE brings real-world environments into the digital space through
              interactive virtual tours. Visitors can explore culturally
              significant locations while gaining a deeper understanding of their
              history, architecture, and atmosphere.
            </p>
            <p class="text-sm font-light text-muted-foreground leading-loose reveal-text">
              By combining high-fidelity scanning with intuitive design, we create 
              spaces that feel tangible, bridging the gap between physical reality and 
              limitless digital exploration.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
