<script setup lang="ts">
const currentYear = new Date().getFullYear();

const navLinks = [
  { label: "About", to: "/about" },
  { label: "Tours", to: "/tours" },
  { label: "Blog", to: "/blog" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
];
</script>

<template>
  <footer class="border-t border-border bg-background">
    <div class="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Col 1: Brand -->
        <div>
          <p class="text-xl font-semibold tracking-tight text-foreground">
            AKSE
          </p>
          <p class="mt-2 text-sm text-muted-foreground">
            Heritage-tech studio crafting cinematic digital experiences.
          </p>
          <p class="mt-4 text-xs text-muted-foreground">
            &copy; {{ currentYear }} AKSE. All rights reserved.
          </p>
        </div>

        <!-- Col 2: Navigation / Legal -->
        <div>
          <p class="text-sm font-medium text-foreground">Company</p>
          <nav class="mt-3 flex flex-col gap-2" aria-label="Footer navigation">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Col 3: Social -->
        <div>
          <p class="text-sm font-medium text-foreground">Social</p>
          <nav class="mt-3 flex flex-col gap-2" aria-label="Social links">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>
