<script setup lang="ts"></script>

<template>
  <div
    class="relative min-h-screen overflow-x-hidden bg-background text-foreground"
  >
    <SiteNav />
    <ScrollProgress />
    <PageVeil />
    <CustomCursor />

    <main class="relative z-[1]">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
