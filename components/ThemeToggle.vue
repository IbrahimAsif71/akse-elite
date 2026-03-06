<script setup lang="ts">
const colorMode = useColorMode();

const resolvedMode = computed<"light" | "dark">(() =>
  colorMode.value === "dark" ? "dark" : "light",
);

const label = computed(() =>
  resolvedMode.value === "dark"
    ? "Switch to light mode"
    : "Switch to dark mode",
);

function toggleTheme() {
  colorMode.preference = resolvedMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    @click="toggleTheme"
  >
    <ClientOnly>
      <svg
        v-if="resolvedMode === 'dark'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-5 shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-5 shrink-0"
        aria-hidden="true"
      >
        <path d="M12 3a6 6 0 1 0 9 9 9 9 0 1 1-9-9" />
      </svg>
      <template #fallback>
        <div class="size-5 shrink-0" />
      </template>
    </ClientOnly>
  </button>
</template>
