<script setup lang="ts">
useSeoMeta({
  title: "Tours — AKSE",
  description:
    "Explore heritage-tech virtual tours. Immersive 360° experiences of Pakistan's most iconic cultural sites.",
  ogTitle: "Tours — AKSE",
  ogDescription: "Explore heritage-tech virtual tours by AKSE.",
});

const activeCategory = ref("all");
</script>

<template>
  <div>
    <ToursFeaturedTour />
    <ToursFilterRail v-model="activeCategory" />
    <ToursUpcomingGrid :active-category="activeCategory" />
    <ToursCommercialTeaser />
  </div>
</template>
