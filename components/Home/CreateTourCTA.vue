<script setup lang="ts">
// No GSAP needed — MagneticWrapper handles the button interaction
</script>

<template>
  <section
    class="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
    :style="{
      background: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,101,61,0.15) 0%, transparent 70%), var(--bg)`,
    }"
  >
    <!-- Copy -->
    <div class="max-w-2xl mx-auto flex flex-col gap-5">
      <h2
        class="text-5xl lg:text-6xl font-extralight tracking-tight text-foreground leading-[1.05]"
      >
        Create a Tour With Us
      </h2>
      <p
        class="text-xl font-light text-muted-foreground leading-relaxed tracking-tight"
      >
        Transform your location into a digital destination.
      </p>
      <p class="text-base font-light text-muted-foreground leading-loose">
        Organizations and property owners can collaborate with AKSE to produce
        immersive 360° virtual tours — making their spaces discoverable,
        explorable, and memorable from anywhere in the world.
      </p>
    </div>

    <!-- Magnetic CTA button -->
    <MagneticWrapper :strength="0.3" class="mt-12">
      <NuxtLink to="/contact">
        <Button
          size="lg"
          class="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-5 text-base font-medium tracking-wide rounded-full transition-colors duration-200"
        >
          Get in Touch
        </Button>
      </NuxtLink>
    </MagneticWrapper>
  </section>
</template>
