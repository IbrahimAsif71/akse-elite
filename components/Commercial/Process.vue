<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "Brief & Survey",
    description:
      "We start with a discovery call to understand your space, goals, and audience. Then we visit for a technical survey to plan the capture session.",
  },
  {
    number: "02",
    title: "Capture & Craft",
    description:
      "Our team deploys the rig on-site. Raw footage is then processed, colour-graded, and refined into a cinematic, fully navigable experience.",
  },
  {
    number: "03",
    title: "Deliver & Embed",
    description:
      "The finished tour is handed off as a web-ready embed code. We handle hosting, QA, and provide documentation to get it live on your site.",
  },
];
</script>

<template>
  <section class="relative bg-background">
    <div class="mx-auto max-w-7xl px-6 pt-16 pb-32 md:px-12 lg:px-20">
      <!-- Heading -->
      <div class="mb-16">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          How It Works
        </p>
        <h2 class="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          From brief to live in three steps
        </h2>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 gap-0 md:grid-cols-3">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          class="relative flex flex-col gap-5 border-border/30 py-12 md:px-10 md:py-4"
          :class="[
            i < steps.length - 1 ? 'border-b md:border-b-0 md:border-r' : '',
            i > 0 ? 'md:pl-16' : '',
          ]"
        >
          <!-- Step number watermark -->
          <span
            class="absolute -left-2 top-2 z-0 text-[6rem] font-bold leading-none tracking-tighter text-border/40 select-none md:-left-4 md:-top-6 md:text-[8rem] lg:text-[10rem]"
          >
            {{ step.number }}
          </span>

          <div class="relative z-10 mt-8 md:mt-12">
            <h3 class="text-xl font-medium text-foreground">{{ step.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
