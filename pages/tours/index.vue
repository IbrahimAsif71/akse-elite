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

const featured = computed<Tour | null>(() => {
  const list = tours.value;
  return list?.length ? (list[0] ?? null) : null;
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
  <div>
    <ToursFeaturedTour :tour="featured" :url-for="urlFor" />
    <ToursFilterRail v-model="activeCategory" />

    <div v-if="pending" class="py-20 text-center text-muted-foreground">
      Loading tours…
    </div>
    <div v-else-if="error" class="py-20 text-center text-muted-foreground">
      Error loading tours.
    </div>

    <ToursUpcomingGrid
      v-else
      :tours="filteredTours"
      :active-category="activeCategory"
      :url-for="urlFor"
    />
    <ToursCommercialTeaser />
  </div>
</template>
