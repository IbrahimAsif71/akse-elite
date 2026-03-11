<script setup lang="ts">
import { Card, CardContent } from "~/components/ui/card";

interface Tour {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  location?: string;
  summary?: string;
  heroImage?: any;
  status?: string;
}

const props = defineProps<{
  tours: Tour[];
  activeCategory: string;
  urlFor: (source: any) => { width: (w: number) => { url: () => string } };
}>();

const { $gsap, $ScrollTrigger } = useNuxtApp();
const gridRef = ref<HTMLElement>();
let batchTriggers: ScrollTrigger[] = [];

function isLive(tour: Tour) {
  return (tour.status || "").toLowerCase() !== "in-production";
}

function tourImage(tour: Tour) {
  if (tour.heroImage) {
    return props.urlFor(tour.heroImage).width(1400).url();
  }
  return "/images/tours/rohtas_fort_heritage_1773010968806.png";
}

function setupBatch() {
  killBatch();
  if (!gridRef.value) return;
  const cards = gridRef.value.querySelectorAll(".tour-card");
  if (!cards.length) return;

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
      <template v-for="tour in tours" :key="tour._id">
        <!-- Live tour card -->
        <NuxtLink
          v-if="isLive(tour)"
          :to="`/tours/${tour.slug.current}`"
          class="tour-card"
        >
          <Card class="group overflow-hidden transition-shadow hover:shadow-lg">
            <div class="relative aspect-4/3 overflow-hidden">
              <img
                :src="tourImage(tour)"
                :alt="tour.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                class="absolute left-3 top-3 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white"
              >
                Live
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
                :src="tourImage(tour)"
                :alt="tour.title"
                class="h-full w-full object-cover blur-sm grayscale"
              />
              <span
                class="badge-pulse absolute left-3 top-3 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-primary-foreground"
              >
                In Production
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
