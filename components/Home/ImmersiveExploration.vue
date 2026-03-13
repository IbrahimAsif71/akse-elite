<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
const { $gsap, $ScrollTrigger } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const headerTextRef = ref<HTMLElement | null>(null);
const portalRef = ref<HTMLDivElement | null>(null);
const infoGridRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(async () => {
  if (!sectionRef.value || !portalRef.value) return;
  const targetSection = sectionRef.value;

  await nextTick();
  
  setTimeout(() => {
    ctx = $gsap.context((self) => {
      
      // 1. Header Typography Scale + Fade
      if (headerTextRef.value) {
        $gsap.fromTo(
          headerTextRef.value,
          { scale: 0.8, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: targetSection,
              start: "top 80%",
            },
          }
        );
      }

      // 2. Portal Full-Screen Expansion effect
      // It starts as a wide letterbox and expands to full height
      if (portalRef.value) {
        $gsap.fromTo(
          portalRef.value,
          { scale: 0.8, borderRadius: "2rem" },
          {
            scale: 1,
            borderRadius: "0rem",
            ease: "none",
            scrollTrigger: {
              trigger: portalRef.value,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          }
        );
      }

      // 3. Info Text Stagger Reveal
      const infoBlocks = self.selector?.('.info-block');
      if (infoBlocks && infoBlocks.length > 0) {
        $gsap.fromTo(
          infoBlocks,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: infoGridRef.value,
              start: "top 75%",
            },
          }
        );
      }
      
      // Refresh ScrollTrigger to ensure bounds are correct after DOM updates
      $ScrollTrigger.refresh();
      
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
    class="relative bg-background pt-32 pb-12 lg:pt-48 overflow-hidden"
  >
    <!-- Massive Intro Typography -->
    <div class="container mx-auto px-6 lg:px-12 mb-20 lg:mb-32">
      <div class="max-w-5xl" ref="headerTextRef">
        <p class="text-xs font-mono tracking-[0.2em] uppercase text-primary/80 mb-8">
          [ 03. Interaction ]
        </p>
        <h2 class="text-6xl md:text-8xl lg:text-[160px] font-extralight tracking-tighter text-foreground leading-[0.85] uppercase flex flex-col">
          <span class="block">Immersive</span>
          <span class="text-muted-foreground italic ml-[10%] -mt-2">Exploration</span>
        </h2>
      </div>
    </div>

    <!-- The Expanding Portal / Image -->
    <div class="w-full flex justify-center sticky top-0 z-10">
      <div
        ref="portalRef"
        class="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden group transform-origin-center will-change-transform"
      >
        <img
          src="/images/tours/lahore_old_city_heritage_1773010984542.png"
          alt="360° tour preview"
          class="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
        />
        
        <!-- Gradient Overlay for contrast -->
        <div class="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-80 pointer-events-none"></div>

        <!-- Corner indicators for awwwards feel -->
        <div class="absolute bottom-8 right-8 text-xs font-mono tracking-widest text-white/50 z-20 mix-blend-difference">
          360° VIEW &mdash; READY
        </div>
      </div>
    </div>

    <!-- Editorial Text Block below the image -->
    <div class="relative bg-background z-20 pt-20 pb-32">
      <div class="container mx-auto px-6 lg:px-12">
        <div ref="infoGridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          <div class="lg:col-span-5 info-block">
            <h3 class="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-foreground tracking-tight">
              Move through spaces as though you were there.
            </h3>
          </div>

          <div class="lg:col-span-5 lg:col-start-7 flex flex-col gap-8 info-block">
            <div class="w-12 h-[1px] bg-primary/60"></div>
            <p class="text-base lg:text-lg font-light text-muted-foreground leading-relaxed">
              Our tours allow visitors to navigate environments using high-fidelity 360° imagery. 
              Users can rotate their perspective, move between real-world locations seamlessly, and 
              experience spaces through a fully interactive digital environment that respects the 
              scale and atmosphere of the original site.
            </p>
            
            <!-- Statistics/Details Grid -->
            <div class="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-border/40">
              <div>
                <span class="block text-4xl lg:text-5xl font-extralight text-foreground mb-2">4K+</span>
                <span class="text-xs uppercase tracking-widest text-muted-foreground">Resolution</span>
              </div>
              <div>
                <span class="block text-4xl lg:text-5xl font-extralight text-foreground mb-2">360°</span>
                <span class="text-xs uppercase tracking-widest text-muted-foreground">Panoramic</span>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>
