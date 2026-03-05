<script setup lang="ts">
useSeoMeta({
  title: "AKSE — Heritage-Tech Studio",
  ogTitle: "AKSE — Heritage-Tech Studio",
  description:
    "Premium heritage-tech studio crafting cinematic digital experiences.",
  ogDescription:
    "Premium heritage-tech studio crafting cinematic digital experiences.",
  ogType: "website",
});

useHead({
  htmlAttrs: {
    class: "bg-background text-foreground font-sans antialiased",
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
