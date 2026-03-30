<script setup lang="ts">
import { Button } from "~/components/ui/button";
</script>

<template>
  <section class="px-6 pb-20">
    <div
      class="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-muted ring-1 ring-border/40"
    >
      <div
        class="flex flex-col gap-10 px-8 py-14 md:px-14 lg:flex-row lg:items-center lg:justify-between lg:py-16"
      >
        <!-- Copy -->
        <div class="max-w-lg">
          <p
            class="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          >
            For Brands & Institutions
          </p>
          <h2
            class="text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-[2rem]"
          >
            Want your space preserved like this?
          </h2>
          <p class="mt-4 leading-relaxed text-muted-foreground">
            We bring the same heritage-tech craft to commercial spaces. Let us
            transform your brand story into an immersive digital journey.
          </p>
        </div>

        <!-- CTA -->
        <div class="shrink-0">
          <NuxtLink to="/commercial">
            <Button
              size="lg"
              class="group rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/35"
            >
              View Commercial Packages
              <svg
                class="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
