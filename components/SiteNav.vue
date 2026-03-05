<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const route = useRoute();
const { $gsap } = useNuxtApp();

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Tours", to: "/tours" },
  { label: "Blog", to: "/blog" },
];

// Mobile drawer state
const drawerOpen = ref(false);

// Close drawer on route change
watch(
  () => route.path,
  () => {
    drawerOpen.value = false;
  },
);

// Underline animation
const navRef = ref<HTMLElement | null>(null);
const underlineRef = ref<HTMLElement | null>(null);

function isActive(to: string): boolean {
  if (to === "/") return route.path === "/";
  return route.path.startsWith(to);
}

function animateUnderline() {
  if (!import.meta.client || !navRef.value || !underlineRef.value || !$gsap)
    return;

  const activeLink = navRef.value.querySelector<HTMLElement>(
    '[data-active="true"]',
  );
  if (!activeLink) {
    $gsap.to(underlineRef.value, {
      width: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    return;
  }

  const navRect = navRef.value.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  $gsap.to(underlineRef.value, {
    x: linkRect.left - navRect.left,
    width: linkRect.width,
    duration: 0.3,
    ease: "power2.out",
  });
}

watch(
  () => route.path,
  () => {
    nextTick(animateUnderline);
  },
);

onMounted(() => {
  nextTick(animateUnderline);
});
</script>

<template>
  <header
    class="fixed top-0 right-0 left-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md supports-not-[backdrop-filter]:bg-background"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2" aria-label="AKSE — Home">
        <img
          src="/logo-placeholder.svg"
          alt=""
          width="32"
          height="32"
          class="text-foreground"
        />
        <span class="text-lg font-semibold tracking-tight text-foreground">
          AKSE
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav
        ref="navRef"
        class="relative hidden items-center gap-1 md:flex"
        aria-label="Main navigation"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :data-active="isActive(link.to)"
          class="relative px-3 py-2 text-sm font-medium transition-colors"
          :class="[
            isActive(link.to)
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          {{ link.label }}
        </NuxtLink>

        <!-- Animated underline -->
        <div
          ref="underlineRef"
          class="absolute bottom-0 left-0 h-[2px] bg-primary"
          :style="{ width: '0px' }"
        />
      </nav>

      <!-- CTA (desktop) -->
      <div class="hidden md:block">
        <Button as-child>
          <NuxtLink to="/contact"> Start Project </NuxtLink>
        </Button>
      </div>

      <!-- Mobile hamburger -->
      <div class="md:hidden">
        <Sheet v-model:open="drawerOpen">
          <button
            class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Open menu"
            @click="drawerOpen = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          <SheetContent side="right" class="w-72 bg-background">
            <SheetHeader>
              <SheetTitle class="text-foreground">Navigation</SheetTitle>
              <SheetDescription class="text-muted-foreground">
                Browse the site
              </SheetDescription>
            </SheetHeader>

            <nav
              class="mt-6 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              <NuxtLink
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                class="rounded-md px-3 py-2.5 text-base font-medium transition-colors"
                :class="[
                  isActive(link.to)
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                ]"
                @click="drawerOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
            </nav>

            <div class="mt-6 px-3">
              <Button as-child class="w-full">
                <NuxtLink to="/contact" @click="drawerOpen = false">
                  Start Project
                </NuxtLink>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
