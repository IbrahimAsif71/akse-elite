<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const { $gsap, $ScrollTrigger } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const titleWrapperRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
  if (!sectionRef.value) return;
  const targetSection = sectionRef.value;

  setTimeout(() => {
    ctx = $gsap.context((self) => {
      
      // ... (rest of context code)
      // Massive text reveal
      const titleLines = self.selector?.('.cta-title');
      if (titleLines && titleLines.length > 0) {
        $gsap.fromTo(
          titleLines,
          { yPercent: 100, opacity: 0, rotateZ: 2 },
          {
            yPercent: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
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
            y: 100,
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

      // Fade up smaller text details
      const details = self.selector?.('.cta-detail');
      if (details && details.length > 0) {
        $gsap.fromTo(
          details,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: titleWrapperRef.value,
              start: "top 60%",
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
    class="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-48 text-center overflow-hidden bg-background"
  >
    <!-- Background Glow -->
    <div 
      class="absolute inset-0 pointer-events-none opacity-40 z-0"
      style="background: radial-gradient(circle at 50% 100%, rgba(201,101,61,0.15) 0%, transparent 60%);"
    ></div>

    <!-- Main Content -->
    <div class="container mx-auto px-6 lg:px-12 flex flex-col items-center z-10 w-full relative">
      
      <!-- Top Label -->
      <div class="mb-12 cta-detail">
        <p class="text-xs font-mono tracking-[0.2em] uppercase text-primary/80">
          [ Collaboration ]
        </p>
      </div>

      <!-- Massive Titles -->
      <div ref="titleWrapperRef" class="flex flex-col items-center w-full mb-20 pointer-events-none">
        <div class="overflow-hidden pb-4">
          <h2 class="cta-title text-[15vw] md:text-[12vw] lg:text-[160px] xl:text-[200px] leading-[0.8] font-extralight tracking-tighter text-foreground uppercase">
            Create
          </h2>
        </div>
        <div class="overflow-hidden pb-4">
          <h2 class="cta-title text-[15vw] md:text-[12vw] lg:text-[160px] xl:text-[200px] leading-[0.8] font-extralight tracking-tighter text-muted-foreground uppercase italic px-4">
            A Tour
          </h2>
        </div>
        <div class="overflow-hidden pb-4">
          <h2 class="cta-title text-[15vw] md:text-[12vw] lg:text-[160px] xl:text-[200px] leading-[0.8] font-extralight tracking-tighter text-foreground uppercase flex items-center justify-center gap-4">
            With Us
            <!-- Optional subtle graphic inline with text -->
            <span class="inline-block w-[10vw] h-[10vw] lg:w-[120px] lg:h-[120px] border border-border/40 rounded-full flex items-center justify-center -rotate-45">
              <span class="text-3xl lg:text-6xl text-primary font-light">→</span>
            </span>
          </h2>
        </div>
      </div>

      <!-- Context Paragraphs -->
      <div class="max-w-2xl mx-auto flex flex-col gap-8 mb-20 relative">
        <div class="absolute -left-12 top-0 bottom-0 w-px bg-primary/30 hidden md:block"></div>
        <p class="cta-detail text-2xl lg:text-3xl font-light text-foreground leading-snug tracking-tight">
          Transform your location into a digital destination.
        </p>
        <p class="cta-detail text-base lg:text-lg font-light text-muted-foreground leading-relaxed">
          Organizations and property owners can collaborate with AKSE to produce
          immersive 360° virtual tours—making their spaces discoverable,
          explorable, and memorable from anywhere in the world.
        </p>
      </div>

      <!-- Giant Interactive Button -->
      <div class="cta-detail">
        <MagneticWrapper :strength="0.4" class="inline-block">
          <NuxtLink to="/contact" class="group relative inline-flex items-center justify-center">
            
            <div class="absolute inset-0 bg-primary/20 rounded-full scale-50 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-700 ease-out z-0 blur-2xl"></div>
            
            <button class="relative z-10 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border border-border/60 bg-background/50 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 group-hover:border-primary/50 group-hover:bg-primary/5">
              
              <!-- Inner circle hover expanding effect -->
              <div class="absolute inset-0 bg-primary scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-[1.05] pointer-events-none z-0"></div>
              
              <span class="relative z-10 text-sm md:text-base tracking-[0.2em] uppercase font-medium text-foreground group-hover:text-background transition-colors duration-300">
                Get In Touch
              </span>
              
              <span class="relative z-10 mt-4 text-foreground group-hover:text-background transition-colors duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
            
          </NuxtLink>
        </MagneticWrapper>
      </div>

    </div>
  </section>
</template>
