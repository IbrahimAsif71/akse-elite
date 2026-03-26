<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const { $gsap } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const titleWrapperRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
  if (!sectionRef.value) return;
  const targetSection = sectionRef.value;

  setTimeout(() => {
    ctx = $gsap.context((self) => {
      
      // Clean, elegant text reveal
      const titleLines = self.selector?.('.cta-reveal');
      if (titleLines && titleLines.length > 0) {
        $gsap.fromTo(
          titleLines,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleWrapperRef.value,
              start: "top 80%",
            },
          }
        );
      }

      // Parallax text effect on scroll
      if (titleWrapperRef.value) {
        $gsap.fromTo(
          titleWrapperRef.value,
          { y: 0 },
          {
            y: 60,
            ease: "none",
            scrollTrigger: {
              trigger: targetSection,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
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
    class="relative min-h-[80vh] flex flex-col items-center justify-center py-32 lg:py-48 text-center overflow-hidden bg-background"
  >
    <!-- Subtle Background Glow -->
    <div 
      class="absolute inset-0 pointer-events-none opacity-40 z-0"
      style="background: radial-gradient(circle at 50% 100%, rgba(201,101,61,0.08) 0%, transparent 60%);"
    ></div>

    <div class="container mx-auto px-6 lg:px-12 flex flex-col items-center z-10 w-full relative">
      
      <!-- Clean Editorial Header Setup -->
      <div ref="titleWrapperRef" class="flex flex-col items-center max-w-4xl text-center mb-16 md:mb-24 pointer-events-none">
        <div class="flex items-center gap-4 cta-reveal mb-8 justify-center">
          <div class="w-8 h-px bg-primary/60" />
          <span class="text-[11px] font-medium tracking-[0.22em] uppercase text-primary/80">
            Collaboration
          </span>
          <div class="w-8 h-px bg-primary/60" />
        </div>

        <div class="overflow-hidden pb-4 mb-6">
          <h2 class="cta-reveal text-4xl md:text-5xl lg:text-7xl font-light text-foreground tracking-tight leading-tight">
            Create a tour with us
          </h2>
        </div>
        
        <div class="flex flex-col items-center gap-6 max-w-2xl">
          <p class="cta-reveal text-xl lg:text-3xl font-light text-foreground leading-snug tracking-tight">
            Transform your location into a digital destination.
          </p>
          <p class="cta-reveal text-base lg:text-lg font-light text-muted-foreground leading-relaxed">
            Organizations and property owners can collaborate with AKSE to produce
            immersive 360° virtual tours—making their spaces discoverable,
            explorable, and memorable from anywhere in the world.
          </p>
        </div>
      </div>

      <!-- Giant Interactive Button (Retained for Awwwards style interaction but cleaner) -->
      <div class="cta-reveal mt-8">
        <!-- Assuming MagneticWrapper is globally registered or imported elsewhere if needed.
             Since it was here before, we keep it. -->
        <component :is="'MagneticWrapper'" :strength="0.4" class="inline-block">
          <NuxtLink to="/contact" class="group relative inline-flex items-center justify-center">
            
            <div class="absolute inset-0 bg-primary/10 rounded-full scale-50 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-700 ease-out z-0 blur-xl"></div>
            
            <button class="relative z-10 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border border-border/60 bg-surface/50 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 group-hover:border-primary/40 group-hover:bg-primary/5">
              
              <div class="absolute inset-0 bg-primary scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-[1.05] pointer-events-none z-0"></div>
              
              <span class="relative z-10 text-xs md:text-sm tracking-[0.2em] uppercase font-medium text-foreground group-hover:text-background transition-colors duration-300">
                Get In Touch
              </span>
              
              <span class="relative z-10 mt-3 text-foreground group-hover:text-background transition-colors duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
            
          </NuxtLink>
        </component>
      </div>

    </div>
  </section>
</template>
