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
    title: "Lahore Old City",
    category: "Heritage",
    image: "/images/tours/lahore_old_city_heritage_1773010984542.png",
    alt: "Lahore Old City — historic Mughal-era architecture and bazaars",
    slug: "lahore-old-city",
    number: "01",
  },
  {
    title: "Rohtas Fort",
    category: "Heritage",
    image: "/images/tours/rohtas_fort_heritage_1773010968806.png",
    alt: "Rohtas Fort — UNESCO World Heritage Site near Jehlum",
    number: "02",
  },
  {
    title: "Taxila Museum",
    category: "Museum",
    image: "/images/tours/taxila_museum_heritage_1773011014212.png",
    alt: "Taxila Museum — ancient Gandharan artifacts and Buddhist sculptures",
    number: "03",
  },
  {
    title: "Hunza Valley",
    category: "Nature",
    image: "/images/tours/hunza_valley_adventure_1773011000439.png",
    alt: "Hunza Valley — dramatic mountain landscapes in Gilgit-Baltistan",
    number: "04",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

// Store refs for the hover images
const imageRefs = ref<(HTMLImageElement | null)[]>([]);
const rowRefs = ref<(HTMLElement | null)[]>([]);

let ctx: gsap.Context;

onMounted(async () => {
  if (!sectionRef.value) return;
  const targetSection = sectionRef.value;

  await nextTick();

  setTimeout(() => {
    ctx = $gsap.context((self) => {
      
      // 1. Header Reveal
      if (headerRef.value) {
        $gsap.fromTo(
          headerRef.value,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: targetSection,
              start: "top 80%",
            },
          }
        );
      }

      // 2. Staggered List Items Reveal
      if (rowRefs.value && rowRefs.value.length > 0) {
        $gsap.fromTo(
          rowRefs.value,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.15,
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
  const currentImage = imageRefs.value[index];
  if (!currentImage) return;

  // Calculate mouse position relative to the row bounding box
  const row = (event.currentTarget as HTMLElement).getBoundingClientRect();
  
  // Center the image around the cursor
  const x = event.clientX - row.left - (currentImage.offsetWidth / 2);
  const y = event.clientY - row.top - (currentImage.offsetHeight / 2);

  $gsap.to(currentImage, {
    x: x,
    y: y,
    duration: 0.5,
    ease: "power2.out",
  });
}
</script>

<template>
  <section ref="sectionRef" class="relative bg-background pt-24 pb-32 lg:py-48 overflow-hidden">
    <div class="container mx-auto px-6 lg:px-12">
      
      <!-- Section header -->
      <div ref="headerRef" class="mb-24 md:mb-32 max-w-2xl">
        <p class="text-xs font-mono tracking-[0.2em] uppercase text-primary/80 mb-6">
          [ Curated Selection ]
        </p>
        <h2 class="text-5xl lg:text-7xl xl:text-8xl font-extralight tracking-tight text-foreground leading-[1.0] mb-8">
          Featured <br/>
          <span class="text-muted-foreground italic">Experiences</span>
        </h2>
        <p class="text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
          Each tour is carefully crafted to bring the essence of a place to life—its architecture, atmosphere, and cultural significance rendered through immersive environments.
        </p>
      </div>

      <!-- Interactive List (Awwwards Style) -->
      <div ref="listRef" class="flex flex-col border-t border-border/40 relative">
        <component
          :is="item.slug ? 'NuxtLink' : 'div'"
          v-for="(item, index) in EXPERIENCE_CARDS"
          :key="item.title"
          :to="item.slug ? `/tours/${item.slug}` : undefined"
          :ref="(el: any) => rowRefs[index] = el as HTMLElement"
          class="group relative py-8 md:py-12 lg:py-16 border-b border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer overflow-hidden"
          @mousemove="onMouseMove($event, index)"
        >
          
          <!-- Background Hover Effect -->
          <div class="absolute inset-0 bg-muted/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

          <!-- Left Side: Number & Title -->
          <div class="flex items-center gap-8 lg:gap-16 z-10 pointer-events-none">
            <span class="text-sm md:text-lg font-mono text-muted-foreground group-hover:text-primary transition-colors duration-500">
              {{ item.number }}
            </span>
            <h3 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-foreground tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out">
              {{ item.title }}
            </h3>
          </div>

          <!-- Right Side: Category & Arrow -->
          <div class="flex items-center gap-8 z-10 pointer-events-none">
            <span class="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground hidden md:block group-hover:text-foreground transition-colors duration-500">
              {{ item.category }}
            </span>
            <div class="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-500 overflow-hidden relative">
               <span class="text-foreground group-hover:text-background transform -translate-x-full group-hover:translate-x-0 absolute transition-transform duration-500 ease-out">→</span>
               <span class="text-foreground group-hover:text-background transform translate-x-0 group-hover:translate-x-full absolute transition-transform duration-500 ease-out">→</span>
            </div>
          </div>

          <!-- Floating Image Reveal (Shows on hover, follows cursor) -->
          <div class="absolute inset-0 pointer-events-none z-20 overflow-hidden hidden md:block">
            <div 
              class="absolute left-0 top-0 w-[400px] aspect-[4/3] overflow-hidden opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out transform-gpu pointer-events-none"
              style="will-change: transform, opacity;"
              :ref="(el: any) => imageRefs[index] = el as HTMLImageElement"
            >
              <img
                :src="item.image"
                :alt="item.alt"
                class="w-full h-full object-cover rounded-sm filter brightness-90"
              />
            </div>
          </div>

        </component>
      </div>

    </div>
  </section>
</template>
