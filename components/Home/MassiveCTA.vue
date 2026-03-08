<script setup lang="ts">
// MassiveCTA — full-width CTA with accent gradient and large typography
</script>

<template>
  <section
    class="relative flex min-h-[60vh] md:min-h-screen items-center justify-center overflow-hidden px-6 py-16 md:py-24"
    :style="{
      background: `linear-gradient(135deg, var(--orange) 0%, var(--teal) 100%)`,
    }"
  >
    <!-- Content -->
    <div class="relative z-10 mx-auto max-w-4xl text-center">
      <h2
        class="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
      >
        Want us to shoot a tour for you?
      </h2>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
        From heritage landmarks to luxury brands — we craft cinematic digital
        experiences that command attention.
      </p>
      <div class="mt-10">
        <MagneticWrapper>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center rounded-xl bg-white px-8 py-4 text-base font-bold text-foreground shadow-lg transition-transform hover:shadow-xl"
            data-cursor="action"
          >
            Book a Tour
          </NuxtLink>
        </MagneticWrapper>
      </div>
    </div>
  </section>
</template>
