<script setup lang="ts">
import MagicBento from "./MagicBento.vue";

const steps = [
  {
    title: "Assessment",
    description: "Cultural + spatial feasibility and route planning.",
    label: "01",
    color: "#0e1516",
  },
  {
    title: "Capture",
    description: "High-resolution imaging and spatial acquisition.",
    label: "02",
    color: "#0e1516",
  },
  {
    title: "Pathway Design",
    description: "Interactive navigation, hotspots, storytelling.",
    label: "03",
    color: "#0e1516",
  },
  {
    title: "Optimization",
    description: "Performance tuning for web + mobile delivery.",
    label: "04",
    color: "#0e1516",
  },
  {
    title: "Deployment",
    description: "Hosting, analytics, and partner handover.",
    label: "05",
    color: "#0e1516",
  },
];
</script>

<template>
  <section class="bg-background px-6 py-24 lg:px-12 lg:py-32 min-h-screen flex flex-col items-center justify-center">
    <div class="mx-auto max-w-7xl w-full">
      <!-- Section heading -->
      <div class="mb-16 max-w-xl text-center mx-auto">
        <p class="text-sm font-semibold uppercase tracking-widest text-primary">
          How We Work
        </p>
        <h2
          class="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          Our Process
        </h2>
        <p class="mt-4 text-muted-foreground">
          Three phases. One seamless experience.
        </p>
      </div>

      <div class="w-full">
        <MagicBento
          :card-data="steps"
          :text-auto-hide="false"
          :enable-stars="true"
          :enable-spotlight="true"
          :enable-border-glow="true"
          :enable-tilt="true"
          :enable-magnetism="true"
          :click-effect="true"
          :spotlight-radius="300"
          :particle-count="12"
          glow-color="201, 101, 61" 
        />
      </div>
    </div>
  </section>
</template>
