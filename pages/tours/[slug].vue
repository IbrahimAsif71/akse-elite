<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Button } from "~/components/ui/button";
import { useSanity, urlFor } from "~/utils/sanity";

definePageMeta({
  layout: false,
});

const route = useRoute();
const slug = route.params.slug as string;
const sanity = useSanity();

const {
  data: tour,
  pending,
  error,
} = await useAsyncData(`tour-${slug}`, () =>
  sanity.fetch(
    `*[_type=="tour" && slug.current==$slug][0]{
      title,
      category,
      location,
      summary,
      heroImage,
      tourUrl
    }`,
    { slug },
  ),
);

useHead(() => ({
  title: tour.value?.title ? `${tour.value.title} — AKSE` : "Tour — AKSE",
  meta: [
    {
      name: "description",
      content: tour.value?.summary || "Immersive 360 tour powered by AKSE.",
    },
    { property: "og:title", content: tour.value?.title || "AKSE Tour" },
    {
      property: "og:description",
      content: tour.value?.summary || "Immersive 360 tour powered by AKSE.",
    },
  ],
}));

const { $gsap } = useNuxtApp();

const wrap = ref<HTMLElement | null>(null);
const uiPanel = ref<HTMLElement | null>(null);
const panelContent = ref<HTMLElement | null>(null);
const topBar = ref<HTMLElement | null>(null);
const iframeWrap = ref<HTMLElement | null>(null);
const fallbackImg = ref<HTMLElement | null>(null);

const infoVisible = ref(true);

const toggleInfo = () => {
  if (!panelContent.value) return;
  infoVisible.value = !infoVisible.value;
  
  if (infoVisible.value) {
    // Show info
    $gsap.to(panelContent.value, {
      height: "auto",
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      marginTop: "1rem"
    });
  } else {
    // Hide info, leaving only the button/header bar of the panel
    $gsap.to(panelContent.value, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power3.inOut",
      marginTop: 0
    });
  }
};

const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen().catch(err => {
      console.warn(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    await document.exitFullscreen();
  }
};

onMounted(() => {
  if (!wrap.value) return;

  const tl = $gsap.timeline({ delay: 0.2 });

  // Fade in the iframe or fallback background
  if (iframeWrap.value) {
    tl.from(iframeWrap.value, { opacity: 0, scale: 1.05, duration: 1.5, ease: "power2.out" }, 0);
  }
  if (fallbackImg.value) {
    tl.from(fallbackImg.value, { opacity: 0, scale: 1.05, duration: 1.5, ease: "power2.out" }, 0);
  }

  // Slide down top bar
  if (topBar.value) {
    tl.from(topBar.value, { y: -30, opacity: 0, duration: 1, ease: "power3.out" }, 0.5);
  }

  // Slide up the floating info panel
  if (uiPanel.value) {
    tl.from(uiPanel.value, { y: 50, opacity: 0, duration: 1.2, ease: "power3.out" }, 0.7);
  }
});
</script>

<template>
  <div ref="wrap" class="fixed inset-0 z-[100] w-full h-[100dvh] overflow-hidden bg-black text-foreground">
    
    <!-- Loading / Error States across full screen -->
    <div v-if="pending" class="absolute inset-0 flex items-center justify-center z-50 bg-background text-muted-foreground">
      <span class="animate-pulse tracking-widest uppercase text-sm">Loading Environment…</span>
    </div>
    <div v-else-if="error || !tour" class="absolute inset-0 flex flex-col items-center justify-center z-50 bg-background text-muted-foreground gap-4">
      <span>Error loading environment.</span>
      <NuxtLink to="/tours"><Button variant="outline">Return to Tours</Button></NuxtLink>
    </div>

    <template v-else>
      <!-- Background Layer: Full-bleed Iframe or Image -->
      <div class="absolute inset-0 z-0 pointer-events-auto">
        <div v-if="tour.tourUrl" ref="iframeWrap" class="w-full h-full bg-black">
          <iframe
            :src="tour.tourUrl"
            loading="lazy"
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; camera; clipboard-write; clipboard-read"
            allowfullscreen
            class="block w-full h-full border-0"
          />
        </div>
        <div v-else-if="tour.heroImage" ref="fallbackImg" class="w-full h-full">
          <img
            :src="urlFor(tour.heroImage).width(2000).url()"
            :alt="tour.title"
            class="w-full h-full object-cover brightness-75"
          />
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay opacity-60">
             <span class="text-4xl text-white font-light tracking-widest uppercase">Immersive View Unavailable</span>
          </div>
        </div>
        <div v-else class="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
          No environment details available.
        </div>
      </div>

      <!-- Top Tools Bar -->
      <div ref="topBar" class="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 z-20 pointer-events-auto flex justify-between items-start">
        <NuxtLink to="/tours" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white/90 hover:bg-black/60 hover:text-white transition-all text-xs tracking-wider uppercase">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Leave Tour
        </NuxtLink>

        <!-- Fullscreen Toggle Button -->
        <button @click="toggleFullscreen" class="p-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white/90 hover:bg-black/60 hover:text-white transition-all">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>

      <!-- UI Overlay Layer: Floating Info Panel (Bottom Left) -->
      <div ref="uiPanel" class="absolute bottom-6 left-6 right-6 md:left-8 md:bottom-8 md:max-w-md lg:max-w-lg z-20 pointer-events-auto">
        <div class="p-5 md:p-7 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl flex flex-col">
          
          <!-- Persistent Header -->
          <div class="flex items-center justify-between">
            <h1 class="text-xl md:text-2xl font-light tracking-tight text-white leading-tight">
              {{ tour.title }}
            </h1>
            <button @click="toggleInfo" class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors" :title="infoVisible ? 'Hide Info' : 'Show Info'">
               <svg v-if="infoVisible" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
               </svg>
               <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
               </svg>
             </button>
          </div>

          <!-- Collapsible Body -->
          <div ref="panelContent" class="overflow-hidden mt-4">
            <div class="flex items-center justify-between mb-3">
              <div v-if="tour.category" class="text-[10px] font-medium tracking-[0.2em] uppercase text-white/70">
                {{ tour.category }}
              </div>
              <div v-if="tour.location" class="text-xs font-light text-white/50 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ tour.location }}
              </div>
            </div>

            <p v-if="tour.summary" class="text-sm font-light leading-relaxed text-white/80 line-clamp-3">
              {{ tour.summary }}
            </p>

            <div class="mt-5">
               <NuxtLink to="/contact">
                 <button class="px-5 py-2 rounded-full bg-white text-black font-medium text-xs tracking-wide hover:bg-white/90 transition-colors uppercase w-full">
                   Start A Project
                 </button>
               </NuxtLink>
            </div>
          </div>

        </div>
      </div>

    </template>
  </div>
</template>

<style scoped>
/* Ensure content stays within the viewport on mobile without bouncing */
div[ref="wrap"] {
  overscroll-behavior: none;
}
</style>
