<script setup lang="ts">
const ctaCopy = {
  headline: "Ready to Preserve Something Beautiful?",
  subtext:
    "Whether you have a site to document or a collection to explore, the next step starts here.",
  primaryCta: { label: "Start a Project", href: "/contact" },
  secondaryCta: { label: "View the Archive", href: "/tours" },
};
</script>

<template>
  <section
    class="bg-foreground px-6 py-24 text-center text-background md:py-40"
  >
    <div class="mx-auto max-w-3xl">
      <h2 class="text-4xl font-bold tracking-tight md:text-5xl">
        {{ ctaCopy.headline }}
      </h2>
      <p class="mt-6 text-lg text-background/70 md:text-xl">
        {{ ctaCopy.subtext }}
      </p>
      <div
        class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Button as-child size="lg">
          <NuxtLink :to="ctaCopy.primaryCta.href">
            {{ ctaCopy.primaryCta.label }}
          </NuxtLink>
        </Button>
        <Button
          as-child
          variant="outline"
          size="lg"
          class="border-background/20 text-background hover:bg-background/10"
        >
          <NuxtLink :to="ctaCopy.secondaryCta.href">
            {{ ctaCopy.secondaryCta.label }}
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>
