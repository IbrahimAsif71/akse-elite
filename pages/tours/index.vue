<script setup lang="ts">
import { useSanity, urlFor } from "~/utils/sanity";

export type Tour = {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  location?: string;
  summary?: string;
  heroImage?: any;
  status?: string;
};

useSeoMeta({
  title: "Tours — AKSE",
  description:
    "Explore heritage-tech virtual tours. Immersive 360° experiences of Pakistan's most iconic cultural sites.",
  ogTitle: "Tours — AKSE",
  ogDescription: "Explore heritage-tech virtual tours by AKSE.",
});

const activeCategory = ref("all");
const sanity = useSanity();

const {
  data: tours,
  pending,
  error,
  refresh,
} = await useAsyncData<Tour[]>(
  "tours",
  () =>
    sanity.fetch(
      `*[_type=="tour" && defined(slug.current)] | order(_createdAt desc){
        _id, title, slug, category, location, summary, heroImage, status
      }`,
    ),
  { server: false },
);

onMounted(() => refresh());

const featuredTour = computed(() => {
  const list = tours.value || [];
  return list.find((t) => (t.status || "").toLowerCase() !== "in-production") ?? null;
});

const filteredTours = computed(() => {
  const list = tours.value || [];
  if (activeCategory.value === "all") return list;
  if (activeCategory.value === "in-production") {
    return list.filter(
      (t) => (t.status || "").toLowerCase() === "in-production",
    );
  }
  return list.filter(
    (t) =>
      (t.category || "").toLowerCase().replace(/\s+/g, "-") ===
      activeCategory.value,
  );
});
</script>

<template>
  <div class="min-h-screen bg-background selection:bg-primary/20">
    <!-- Cinematic full-viewport hero -->
    <ToursFeaturedTour :tour="featuredTour" :url-for="urlFor" />

    <!-- Sticky category filter -->
    <ToursFilterRail v-model="activeCategory" />

    <!-- Loading state -->
    <div v-if="pending" class="flex items-center justify-center py-24">
      <div class="flex items-center gap-1.5">
        <span
          class="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
          style="animation-delay: 0ms"
        />
        <span
          class="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
          style="animation-delay: 150ms"
        />
        <span
          class="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
          style="animation-delay: 300ms"
        />
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="py-24 text-center text-muted-foreground">
      Error loading tours.
    </div>

    <!-- Tour grid -->
    <ToursUpcomingGrid
      v-else
      :tours="filteredTours"
      :active-category="activeCategory"
      :url-for="urlFor"
    />

    <!-- Commercial conversion teaser -->
    <ToursCommercialTeaser />
  </div>
</template>
