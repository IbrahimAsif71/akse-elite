<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
const { $gsap, $ScrollTrigger } = useNuxtApp();

interface ExperienceCard {
  title: string;
  category: string;
  image: string;
  alt: string;
  slug?: string;
  number: string;
}

const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    title: "Golra Railway Station",
    category: "Heritage",
    image: "/images/tours/lahore_old_city_heritage_1773010984542.png",
    alt: "Golra Railway Station — historic railway junction and museum in Islamabad",
    slug: "golra-railway-station",
    number: "01",
  },
  {
    title: "Saidpur Village",
    category: "Heritage",
    image: "/images/tours/rohtas_fort_heritage_1773010968806.png",
    alt: "Saidpur Village — historic Mughal-era village in Islamabad",
    slug: "saidpur-village",
    number: "02",
  },
  {
    title: "Dome Restaurant",
    category: "Hospitality",
    image: "/images/tours/taxila_museum_heritage_1773011014212.png",
    alt: "Dome Restaurant — premium dining experience",
    slug: "dome-restaurant",
    number: "03",
  },
  {
    title: "Serena Hotel",
    category: "Hospitality",
    image: "/images/tours/hunza_valley_adventure_1773011000439.png",
    alt: "Serena Hotel — luxury 5-star hotel in Islamabad",
    slug: "serena-hotel",
    number: "04",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

// Store refs for the hover images
const imageRefs = ref<(HTMLElement | null)[]>([]);
const rowRefs = ref<(HTMLElement | null)[]>([]);

let ctx: gsap.Context;

onMounted(async () => {
  if (!sectionRef.value) return;
  const targetSection = sectionRef.value;

  await nextTick();

  setTimeout(() => {
    ctx = $gsap.context((self) => {
      
      // 1. Header Reveal
      const headerEls = self.selector?.('.header-reveal');
      if (headerEls?.length) {
        $gsap.fromTo(headerEls,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: targetSection, start: 'top 80%' } }
        );
      }

      // 2. Staggered List Items Reveal
      if (rowRefs.value && rowRefs.value.length > 0) {
        $gsap.fromTo(
          rowRefs.value,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.value,
              start: "top 75%",
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

// Cursor follow logic for the images on hover
function onMouseMove(event: MouseEvent, index: number) {
  const currentImageContainer = imageRefs.value[index];
  if (!currentImageContainer) return;

  const row = (event.currentTarget as HTMLElement).getBoundingClientRect();
  
  // Base offset
  const x = event.clientX - row.left;
  const y = event.clientY - row.top;

  $gsap.to(currentImageContainer, {
    x: x - 150, // center the 300px wide image roughly
    y: y - 200, // center the 400px tall image roughly
    duration: 0.6,
    ease: "power2.out",
  });
}
</script>

<template>
  <section ref="sectionRef" class="relative bg-background py-20 lg:py-32 overflow-hidden">
    <!-- Subtle accent orb -->
    <div
      class="absolute top-[10%] right-[5%] w-[40vw] max-w-[500px] aspect-square rounded-full pointer-events-none z-0"
      style="background: radial-gradient(circle, rgba(201,101,61,0.04) 0%, transparent 60%);"
    />

    <div class="container mx-auto px-6 lg:px-12 relative z-10">
      
      <!-- Section header: Clean, editorial, no hero underline -->
      <div ref="headerRef" class="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/40 pb-12">
        <div class="flex flex-col gap-4 max-w-xl">
          <div class="flex items-center gap-4 header-reveal">
            <div class="w-6 h-px bg-primary/60 flex-shrink-0" />
            <span class="text-[11px] font-medium tracking-[0.22em] uppercase text-primary/80">
              Curated Selection
            </span>
          </div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-tight header-reveal">
            Featured Experiences
          </h2>
        </div>
        
        <p class="text-SM lg:text-base font-light text-muted-foreground leading-relaxed max-w-sm header-reveal">
          Carefully crafted to bring the essence of a place to life—architecture, atmosphere, and culture rendered through immersive environments.
        </p>
      </div>

      <!-- Interactive List (Clean Claude Style) -->
      <div ref="listRef" class="flex flex-col relative">
        <component
          :is="item.slug ? 'NuxtLink' : 'div'"
          v-for="(item, index) in EXPERIENCE_CARDS"
          :key="item.title"
          :to="item.slug ? `/tours/${item.slug}` : undefined"
          :ref="(el: any) => rowRefs[index] = el as HTMLElement"
          class="group relative py-6 md:py-10 border-b border-border/30 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-surface/40 transition-colors duration-300 px-4 -mx-4 rounded-xl"
          @mousemove="onMouseMove($event, index)"
        >
          <!-- Left Side: Number & Title -->
          <div class="flex items-center gap-6 md:gap-12 z-10 pointer-events-none">
            <span class="text-sm font-mono text-muted-foreground/60 group-hover:text-primary transition-colors duration-300">
              {{ item.number }}
            </span>
            <h3 class="text-2xl md:text-4xl font-light text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              {{ item.title }}
            </h3>
          </div>

          <!-- Right Side: Category & Arrow -->
          <div class="flex items-center gap-6 md:gap-12 z-10 pointer-events-none">
            <span class="text-xs uppercase tracking-[0.18em] text-muted-foreground hidden sm:block">
              {{ item.category }}
            </span>
            <div class="w-10 h-10 rounded-full flex items-center justify-center border border-border group-hover:border-primary group-hover:bg-primary transition-all duration-300 overflow-hidden">
               <svg class="w-4 h-4 text-foreground group-hover:text-background transform -translate-x-full group-hover:translate-x-0 absolute transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
               <svg class="w-4 h-4 text-foreground group-hover:text-background transform translate-x-0 group-hover:translate-x-full absolute transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
            </div>
          </div>

          <!-- Floating Image Reveal (Shows on hover, follows cursor) -->
          <div class="absolute inset-0 pointer-events-none z-20 overflow-hidden hidden md:block">
            <div 
              class="absolute left-0 top-0 w-[300px] aspect-[3/4] overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 ease-out transform-gpu pointer-events-none shadow-2xl rounded-2xl border border-white/10"
              style="will-change: transform, opacity;"
              :ref="(el: any) => imageRefs[index] = el as HTMLElement"
            >
              <img
                :src="item.image"
                :alt="item.alt"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

        </component>
      </div>

      <!-- Bottom action -->
      <div class="mt-16 flex justify-center header-reveal">
        <NuxtLink to="/tours" class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wide border border-border text-foreground hover:border-foreground/40 hover:bg-surface transition-colors duration-300">
          View all experiences
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Optional: slightly soften the background hover if needed */
</style>
