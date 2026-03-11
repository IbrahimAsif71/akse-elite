<script setup lang="ts">
import { Card, CardContent } from "~/components/ui/card";

const props = defineProps<{ activeCategory: string }>();

const { $gsap, $ScrollTrigger } = useNuxtApp();
const gridRef = ref<HTMLElement>();
let batchTriggers: ScrollTrigger[] = [];

interface Tour {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  status: "live" | "in-production";
  badgeLabel: string;
  ctaLink?: string;
}

const allTours: Tour[] = [
  {
    id: "golra-sharif",
    title: "Golra Sharif Railway Museum",
    location: "Rawalpindi, Punjab",
    category: "museums",
    image: "/images/tours/rohtas_fort_heritage_1773010968806.png",
    status: "live",
    badgeLabel: "Live",
    ctaLink: "/tours/golra-sharif",
  },
  {
    id: "lahore-fort",
    title: "Lahore Fort",
    location: "Lahore, Punjab",
    category: "heritage-sites",
    image: "/images/tours/lahore_old_city_heritage_1773010984542.png",
    status: "in-production",
    badgeLabel: "In Production",
  },
  {
    id: "mohenjo-daro",
    title: "Mohenjo-Daro",
    location: "Larkana, Sindh",
    category: "heritage-sites",
    image: "/images/tours/hunza_valley_adventure_1773011000439.png",
    status: "in-production",
    badgeLabel: "In Production",
  },
  {
    id: "faisal-mosque",
    title: "Faisal Mosque",
    location: "Islamabad, ICT",
    category: "heritage-sites",
    image: "/images/tours/rohtas_fort_heritage_1773010968806.png",
    status: "in-production",
    badgeLabel: "In Production",
  },
  {
    id: "taxila-museum",
    title: "Taxila Museum",
    location: "Taxila, Punjab",
    category: "museums",
    image: "/images/tours/taxila_museum_heritage_1773011014212.png",
    status: "in-production",
    badgeLabel: "In Production",
  },
  {
    id: "pearl-continental",
    title: "Pearl Continental Lobby",
    location: "Lahore, Punjab",
    category: "commercial",
    image: "/images/tours/lahore_old_city_heritage_1773010984542.png",
    status: "in-production",
    badgeLabel: "In Production",
  },
];

const filteredTours = computed(() => {
  if (props.activeCategory === "all") return allTours;
  if (props.activeCategory === "in-production") {
    return allTours.filter((t) => t.status === "in-production");
  }
  return allTours.filter((t) => t.category === props.activeCategory);
});

function setupBatch() {
  killBatch();
  if (!gridRef.value) return;
  const cards = gridRef.value.querySelectorAll(".tour-card");
  if (!cards.length) return;

  // Set initial state
  $gsap.set(cards, { y: 60, opacity: 0 });

  batchTriggers = $ScrollTrigger.batch(cards, {
    onEnter: (batch: Element[]) => {
      $gsap.to(batch, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    once: true,
  }) as unknown as ScrollTrigger[];
}

function killBatch() {
  if (Array.isArray(batchTriggers)) {
    batchTriggers.forEach((st: ScrollTrigger) => st.kill());
  }
  batchTriggers = [];
}

onMounted(() => {
  nextTick(() => setupBatch());
});

watch(
  () => props.activeCategory,
  () => {
    nextTick(() => {
      setupBatch();
      $ScrollTrigger.refresh();
    });
  },
);

onUnmounted(() => {
  killBatch();
});
</script>

<template>
  <section ref="gridRef" class="mx-auto max-w-7xl px-6 py-16">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="tour in filteredTours" :key="tour.id">
        <!-- Live tour card -->
        <NuxtLink
          v-if="tour.status === 'live'"
          :to="tour.ctaLink!"
          class="tour-card"
        >
          <Card class="group overflow-hidden transition-shadow hover:shadow-lg">
            <div class="relative aspect-4/3 overflow-hidden">
              <img
                :src="tour.image"
                :alt="tour.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                class="absolute left-3 top-3 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white"
              >
                {{ tour.badgeLabel }}
              </span>
            </div>
            <CardContent class="p-4">
              <h3 class="text-lg font-semibold text-foreground">
                {{ tour.title }}
              </h3>
              <p class="mt-1 text-sm text-muted-foreground">
                {{ tour.location }}
              </p>
            </CardContent>
          </Card>
        </NuxtLink>

        <!-- In-production tour card -->
        <div v-else class="tour-card cursor-not-allowed" aria-disabled="true">
          <Card class="overflow-hidden">
            <div class="relative aspect-4/3 overflow-hidden">
              <img
                :src="tour.image"
                :alt="tour.title"
                class="h-full w-full object-cover blur-sm grayscale"
              />
              <span
                class="badge-pulse absolute left-3 top-3 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-primary-foreground"
              >
                {{ tour.badgeLabel }}
              </span>
            </div>
            <CardContent class="p-4">
              <h3 class="text-lg font-semibold text-foreground">
                {{ tour.title }}
              </h3>
              <p class="mt-1 text-sm text-muted-foreground">
                {{ tour.location }}
              </p>
            </CardContent>
          </Card>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
@keyframes badge-pulse {
  0%,
  100% {
    opacity: 0.7;
    box-shadow: 0 0 8px var(--orange);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 16px var(--orange);
  }
}

.badge-pulse {
  animation: badge-pulse 2s infinite alternate;
}
</style>
