<script setup lang="ts">
interface TechItem {
  name: string;
  description: string;
  category: "Hardware" | "Software";
  icon: "hardware" | "software-matterport" | "software-3dvista";
}

const techItems: TechItem[] = [
  {
    name: "Insta360",
    description:
      "High-resolution 360° cameras used to capture immersive and accurate spatial visuals.",
    category: "Hardware",
    icon: "hardware",
  },
  {
    name: "Matterport",
    description:
      "Platform used for creating structured, high-quality 3D spatial experiences.",
    category: "Software",
    icon: "software-matterport",
  },
  {
    name: "3DVista",
    description:
      "Software used to build interactive, customizable virtual tours with advanced navigation features.",
    category: "Software",
    icon: "software-3dvista",
  },
];
</script>

<template>
  <section class="mt-16 px-6 py-32 md:mt-0 md:py-48 lg:px-12">
    <div class="mx-auto max-w-7xl">

      <!-- Section label -->
      <div class="mb-14">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Technology</p>
        <h2 class="mt-3 text-3xl font-light tracking-tight text-foreground md:text-4xl">
          Tools of the Trade
        </h2>
        <p class="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          Purpose-built hardware and software that power every AKSE virtual tour, from capture to delivery.
        </p>
      </div>

      <!-- Hardware label -->
      <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">Hardware</p>

      <!-- Hardware card (full-width) -->
      <div
        class="group mb-4 flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-lg sm:flex-row sm:items-center sm:gap-8 md:p-9"
      >
        <!-- Icon -->
        <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
          <!-- Camera / 360 icon -->
          <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
        </div>
        <!-- Text -->
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-3">
            <h3 class="text-xl font-semibold text-foreground">Insta360</h3>
            <span class="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Hardware
            </span>
          </div>
          <p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            High-resolution 360° cameras used to capture immersive and accurate spatial visuals.
          </p>
        </div>
      </div>

      <!-- Software label -->
      <p class="mb-4 mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">Software</p>

      <!-- Software cards (2-col grid) -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <!-- Matterport -->
        <div
          class="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-lg md:p-8"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <!-- Box / Cube icon -->
            <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="text-lg font-semibold text-foreground">Matterport</h3>
              <span class="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Software
              </span>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Platform used for creating structured, high-quality 3D spatial experiences.
            </p>
          </div>
        </div>

        <!-- 3DVista -->
        <div
          class="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-lg md:p-8"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <!-- Globe / interactive icon -->
            <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="text-lg font-semibold text-foreground">3DVista</h3>
              <span class="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Software
              </span>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Software used to build interactive, customizable virtual tours with advanced navigation features.
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
