<script setup lang="ts">
import { Button } from "~/components/ui/button";
</script>

<template>
  <section class="px-6 py-24 text-center">
    <h2
      class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-4xl"
    >
      Want your space preserved like this?
    </h2>
    <p class="mx-auto mt-4 max-w-lg text-muted-foreground">
      We bring the same heritage-tech craft to commercial spaces. Let us
      transform your brand story into an immersive digital journey.
    </p>
    <div class="mt-8">
      <NuxtLink to="/commercial">
        <Button variant="default" size="lg"> View Commercial Packages </Button>
      </NuxtLink>
    </div>
  </section>
</template>
