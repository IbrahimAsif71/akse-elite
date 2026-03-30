<script setup lang="ts">
useSeoMeta({
  title: "Commercial Services — AKSE",
  description:
    "Cinematic 360° virtual tours for retail, hospitality, museums, and brand experiences. See packages and request a quote.",
  ogTitle: "Commercial Services — AKSE",
  ogDescription:
    "Cinematic 360° virtual tours scaled for commercial spaces. See packages and get a quote.",
});
</script>

<template>
  <div class="min-h-screen bg-background selection:bg-primary/20">
    <!-- Page header -->
    <section class="mx-auto max-w-3xl px-6 pb-4 pt-40 text-center">
      <p
        class="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
      >
        Commercial Services
      </p>
      <h1
        class="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl"
      >
        Pricing that scales with your space
      </h1>
      <p class="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
        Cinematic 360° virtual tours for retail, hospitality, museums, and brand
        experiences. Every project scoped to fit.
      </p>
    </section>

    <CommercialPackages />
    <CommercialContactForm />
  </div>
</template>
