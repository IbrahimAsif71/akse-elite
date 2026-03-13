<script setup lang="ts">
useSeoMeta({
  title: "AKSE — Immersive Cultural Exploration",
  description:
    "AKSE is a digital platform that transforms real-world locations into immersive virtual tours. Explore heritage sites, restaurants, and hospitality spaces through interactive 360° environments.",
  ogTitle: "AKSE — Immersive Cultural Exploration",
  ogDescription:
    "AKSE transforms real-world locations into immersive virtual tours. Explore heritage sites and culturally significant places from anywhere in the world.",
  ogImage: "/images/og-home.jpg",
});

import DomeGallery from "~/components/Home/DomeGallery.vue";
</script>

<template>
  <div>
    <HomeHeroCultural />
    <HomeDigitalHeritage />
    <HomeImmersiveExploration />
    <DomeGallery />
    <HomeFeaturedExperiences />
    <HomeCreateTourCTA />
  </div>
</template>
