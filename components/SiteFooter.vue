<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const currentYear = new Date().getFullYear();

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Tours", to: "/tours" },
  { label: "Blog", to: "/blog" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
];

// Live time in Lahore, PK
const localTime = ref("");
let timer: ReturnType<typeof setInterval>;

const updateTime = () => {
  localTime.value = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <footer
    class="relative overflow-hidden border-t border-border bg-background pt-20 text-foreground pb-8 md:pt-32"
  >
    <div class="relative z-10 mx-auto max-w-7xl px-6">
      <!-- Top Section -->
      <div
        class="mb-24 grid grid-cols-1 gap-12 md:mb-40 md:grid-cols-12 md:gap-8"
      >
        <!-- Brand / Intro -->
        <div class="flex flex-col justify-between md:col-span-5">
          <div>
            <img
              src="/akse.png"
              alt="AKSE"
              width="2618"
              height="864"
              class="mb-6 h-8 w-auto md:h-10"
            />
            <h3
              class="max-w-md text-2xl font-light leading-tight text-foreground/90 md:text-4xl"
            >
              Crafting cinematic digital experiences for heritage and beyond.
            </h3>
          </div>

          <div class="mt-12 md:mt-0">
            <a
              href="mailto:hello@akse.studio"
              class="group relative inline-block text-xl font-medium tracking-tight transition-colors hover:text-primary md:text-2xl"
            >
              hello@akse.studio
              <span
                class="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
          </div>
        </div>

        <div class="hidden md:block md:col-span-1"></div>

        <!-- Links -->
        <div class="md:col-span-2">
          <h4
            class="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground"
          >
            Explore
          </h4>
          <nav class="flex flex-col gap-4">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="group relative w-fit text-lg font-medium text-foreground/80 transition-colors hover:text-foreground md:text-xl"
            >
              {{ link.label }}
              <span
                class="absolute -bottom-1 left-0 h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full"
              ></span>
            </NuxtLink>
          </nav>
        </div>

        <!-- Socials -->
        <div class="md:col-span-2">
          <h4
            class="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground"
          >
            Socials
          </h4>
          <nav class="flex flex-col gap-4">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              class="group relative w-fit text-lg font-medium text-foreground/80 transition-colors hover:text-foreground md:text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
              <span
                class="absolute -bottom-1 left-0 h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
          </nav>
        </div>

        <!-- Location / Time -->
        <div class="md:col-span-2">
          <h4
            class="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground"
          >
            Location
          </h4>
          <div class="flex flex-col gap-1 text-foreground/80">
            <p class="text-lg font-medium md:text-xl">Lahore, PK</p>
            <p
              class="mt-2 flex items-center gap-2 font-mono text-sm md:text-base"
            >
              <span class="relative flex h-2 w-2">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex h-2 w-2 rounded-full bg-green-500"
                ></span>
              </span>
              {{ localTime }} <span class="text-muted-foreground">PKT</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row"
      >
        <p>&copy; {{ currentYear }} AKSE Studio. All rights reserved.</p>
        <div class="flex gap-6">
          <NuxtLink
            v-for="link in legalLinks"
            :key="link.to"
            :to="link.to"
            class="transition-colors hover:text-foreground"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Massive Background Text -->
    <div
      class="pointer-events-none absolute bottom-[-10%] left-0 z-0 flex w-full select-none justify-center overflow-hidden opacity-5 md:bottom-[-20%]"
    >
      <h1
        class="m-0 whitespace-nowrap p-0 text-[25vw] font-black leading-none tracking-tighter text-foreground"
      >
        A K S E
      </h1>
    </div>
  </footer>
</template>
