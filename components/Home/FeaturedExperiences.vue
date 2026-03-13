<script setup lang="ts">
interface ExperienceCard {
  title: string;
  category: string;
  image: string;
  alt: string;
  slug?: string;
}

const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    title: "Lahore Old City",
    category: "Heritage",
    image: "/images/tours/lahore_old_city_heritage_1773010984542.png",
    alt: "Lahore Old City — historic Mughal-era architecture and bazaars",
    slug: "lahore-old-city",
  },
  {
    title: "Rohtas Fort",
    category: "Heritage",
    image: "/images/tours/rohtas_fort_heritage_1773010968806.png",
    alt: "Rohtas Fort — UNESCO World Heritage Site near Jehlum",
  },
  {
    title: "Taxila Museum",
    category: "Museum",
    image: "/images/tours/taxila_museum_heritage_1773011014212.png",
    alt: "Taxila Museum — ancient Gandharan artifacts and Buddhist sculptures",
  },
  {
    title: "Hunza Valley",
    category: "Nature",
    image: "/images/tours/hunza_valley_adventure_1773011000439.png",
    alt: "Hunza Valley — dramatic mountain landscapes in Gilgit-Baltistan",
  },
];

const { $gsap } = useNuxtApp();

// Per-card accent line refs (array)
const accentLineRefs = ref<(HTMLDivElement | null)[]>([]);

function onCardEnter(index: number): void {
  const line = accentLineRefs.value[index];
  if (!line) return;
  $gsap.to(line, {
    scaleX: 1,
    duration: 0.7,
    ease: "power2.out",
    transformOrigin: "left center",
  });
}

function onCardLeave(index: number): void {
  const line = accentLineRefs.value[index];
  if (!line) return;
  $gsap.to(line, {
    scaleX: 0,
    duration: 0.4,
    ease: "power2.in",
    transformOrigin: "left center",
  });
}
</script>

<template>
  <section class="relative bg-background py-24 lg:py-36">
    <div class="container mx-auto px-6 lg:px-12">
      <!-- Section header -->
      <div class="mb-16 max-w-xl">
        <h2
          class="text-5xl lg:text-6xl font-extralight tracking-tight text-foreground leading-[1.05] mb-6"
        >
          Featured Experiences
        </h2>
        <p
          class="text-xl font-light text-muted-foreground leading-relaxed tracking-tight mb-4"
        >
          Selected locations that define the character of our cities.
        </p>
        <p class="text-base font-light text-muted-foreground leading-loose">
          Each tour is crafted to bring the essence of a place to life — its
          architecture, atmosphere, and cultural significance rendered through
          immersive 360° environments.
        </p>
      </div>

      <!-- Gallery grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        <component
          :is="card.slug ? 'NuxtLink' : 'div'"
          v-for="(card, index) in EXPERIENCE_CARDS"
          :key="card.title"
          :to="card.slug ? `/tours/${card.slug}` : undefined"
          class="group relative overflow-hidden rounded-md"
          @mouseenter="onCardEnter(index)"
          @mouseleave="onCardLeave(index)"
        >
          <!-- Portrait image -->
          <img
            :src="card.image"
            :alt="card.alt"
            class="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          <!-- Hover overlay with metadata -->
          <div
            class="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-background/80 to-transparent"
          >
            <p
              class="text-xs font-light tracking-widest text-muted-foreground uppercase mb-1"
            >
              {{ card.category }}
            </p>
            <h3 class="text-sm font-medium text-foreground leading-tight mb-3">
              {{ card.title }}
            </h3>
            <!-- Orange accent line: initially scaleX(0), animated by GSAP on hover -->
            <div
              :ref="
                (el) => {
                  accentLineRefs[index] = el as HTMLDivElement | null;
                }
              "
              class="h-px bg-primary origin-left"
              style="transform: scaleX(0)"
            />
          </div>
        </component>
      </div>
    </div>
  </section>
</template>
