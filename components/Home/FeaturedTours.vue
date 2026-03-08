<script setup lang="ts">
import type { Ref } from "vue";

const { $gsap, $ScrollTrigger } = useNuxtApp();

interface TourCard {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  category: string;
}

const tours: TourCard[] = [
  {
    id: "tour-1",
    title: "Rohtas Fort",
    location: "Jhelum, Punjab",
    description:
      "A 16th-century garrison fortress built by Sher Shah Suri, showcasing Pashtun military architecture at its finest.",
    image: "/images/tours/rohtas-fort.jpg",
    category: "Heritage",
  },
  {
    id: "tour-2",
    title: "Lahore Old City",
    location: "Lahore, Punjab",
    description:
      "Walk through centuries of Mughal grandeur — from the Walled City's bazaars to the Badshahi Mosque's marble courts.",
    image: "/images/tours/lahore-old-city.jpg",
    category: "Heritage",
  },
  {
    id: "tour-3",
    title: "Hunza Valley",
    location: "Gilgit-Baltistan",
    description:
      "Where the Karakoram Highway meets ancient watchtowers. Dramatic peaks, terraced orchards, and glacial rivers.",
    image: "/images/tours/hunza-valley.jpg",
    category: "Adventure",
  },
  {
    id: "tour-4",
    title: "Taxila Museum",
    location: "Rawalpindi, Punjab",
    description:
      "Gandhara civilization artifacts spanning two millennia — stucco heads, bronze relics, and stone carvings.",
    image: "/images/tours/taxila-museum.jpg",
    category: "Museum",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const cardRefs: Ref<HTMLElement[]> = ref([]);
const imageRefs: Ref<HTMLElement[]> = ref([]);
const triggers: any[] = [];

// Staggered vertical offsets for asymmetric layout
const offsets = ["mt-0", "lg:mt-16", "lg:mt-8", "lg:mt-24"];

onMounted(() => {
  if (!imageRefs.value.length) return;

  imageRefs.value.forEach((img, i) => {
    const card = cardRefs.value[i];
    if (!img || !card) return;

    const st = $gsap.to(img, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    triggers.push(st.scrollTrigger);
  });
});

onBeforeUnmount(() => {
  triggers.forEach((st) => st?.kill());
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative bg-background px-6 py-24 lg:px-12 lg:py-32"
  >
    <div class="mx-auto max-w-7xl">
      <!-- Section heading -->
      <div class="mb-16 max-w-xl">
        <p class="text-sm font-semibold uppercase tracking-widest text-primary">
          Featured Tours
        </p>
        <h2
          class="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          Heritage Worth Experiencing
        </h2>
      </div>

      <!-- Asymmetric card grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(tour, i) in tours"
          :key="tour.id"
          :ref="
            (el) => {
              if (el) cardRefs[i] = el as HTMLElement;
            }
          "
          :class="[offsets[i], 'group relative']"
          data-cursor="explore"
        >
          <!-- Image container with parallax -->
          <div class="relative overflow-hidden rounded-xl aspect-[3/4]">
            <!-- Gradient placeholder (no images in /public/images/tours/ yet) -->
            <div
              :ref="
                (el) => {
                  if (el) imageRefs[i] = el as HTMLElement;
                }
              "
              class="absolute inset-0 h-[120%] -top-[10%] transition-transform duration-500 ease-out group-hover:scale-105"
              :class="[
                i % 2 === 0
                  ? 'bg-gradient-to-br from-primary/30 via-muted to-secondary/40'
                  : 'bg-gradient-to-tl from-secondary/30 via-muted to-primary/40',
              ]"
            />
            <!-- Category badge -->
            <span
              class="absolute left-3 top-3 z-10 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm"
            >
              {{ tour.category }}
            </span>
          </div>

          <!-- Metadata with accent sweep on hover -->
          <div
            class="relative mt-4 space-y-1 overflow-hidden rounded-lg px-3 py-2 transition-colors duration-500 group-hover:bg-primary/10"
          >
            <div
              class="pointer-events-none absolute inset-0 -translate-x-full bg-primary/15 transition-transform duration-500 ease-out group-hover:translate-x-0"
            />
            <h3
              class="relative text-lg font-semibold text-foreground transition-colors"
            >
              {{ tour.title }}
            </h3>
            <p class="relative text-sm text-muted-foreground">
              {{ tour.location }}
            </p>
            <p
              class="relative text-sm leading-relaxed text-muted-foreground/80"
            >
              {{ tour.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
