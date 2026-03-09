<script setup lang="ts">
  import FlowingMenu from "./FlowingMenu.vue";

  const items = [
    { link: '#', text: 'Rohtas Fort', image: '/images/tours/rohtas_fort_heritage_1773010968806.png' },
    { link: '#', text: 'Lahore Old City', image: '/images/tours/lahore_old_city_heritage_1773010984542.png' },
    { link: '#', text: 'Hunza Valley', image: '/images/tours/hunza_valley_adventure_1773011000439.png' },
    { link: '#', text: 'Taxila Museum', image: '/images/tours/taxila_museum_heritage_1773011014212.png' }
  ];
</script>

<template>
  <section class="relative bg-background lg:py-32 flex flex-col items-center justify-center w-full px-0 py-0 min-h-screen">
    <div class="mb-12 max-w-xl text-center px-4">
      <p class="text-sm font-semibold uppercase tracking-widest text-primary">
        Featured Tours
      </p>
      <h2
        class="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
      >
        Heritage Worth Experiencing
      </h2>
    </div>
    <div class="h-[600px] w-full">
      <FlowingMenu :items="items" />
    </div>
  </section>
</template>
