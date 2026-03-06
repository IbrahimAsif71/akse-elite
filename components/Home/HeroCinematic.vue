<script setup lang="ts">
import createGlobe from "cobe";

const { $gsap } = useNuxtApp();
const colorMode = useColorMode();

// ── Character reveal setup ──
const headline = "Heritage Redefined";
const chars = headline.split("");
const charRefs = ref<HTMLSpanElement[]>([]);
const headlineContainer = ref<HTMLElement | null>(null);

// ── Globe setup ──
const canvasRef = ref<HTMLCanvasElement | null>(null);
let globeInstance: ReturnType<typeof createGlobe> | null = null;
let pointerInteracting: number | null = null;
let pointerInteractionMovement = 0;
let phi = 0;

const MARKERS = [
  { location: [33.5731, 73.1898] as [number, number], size: 0.05 },
  { location: [33.7847, 72.7178] as [number, number], size: 0.04 },
  { location: [31.5497, 74.3436] as [number, number], size: 0.05 },
  { location: [35.9202, 74.3114] as [number, number], size: 0.04 },
];

function getGlobeTheme(mode: string) {
  const isDark = mode === "dark";
  return {
    baseColor: isDark
      ? ([0.055, 0.082, 0.086] as [number, number, number])
      : ([0.953, 0.922, 0.875] as [number, number, number]),
    markerColor: [0.788, 0.396, 0.239] as [number, number, number],
    glowColor: isDark
      ? ([0.173, 0.478, 0.514] as [number, number, number])
      : ([0.788, 0.396, 0.239] as [number, number, number]),
    dark: isDark ? 1 : 0,
  };
}

const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

function initGlobe() {
  if (!canvasRef.value) return;

  // Destroy existing instance
  if (globeInstance) {
    globeInstance.destroy();
    globeInstance = null;
  }

  const theme = getGlobeTheme(colorMode.value);

  try {
    globeInstance = createGlobe(canvasRef.value, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: canvasRef.value.offsetWidth * 2,
      height: canvasRef.value.offsetHeight * 2,
      phi: 0,
      theta: -1.28,
      dark: theme.dark,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: theme.baseColor,
      markerColor: theme.markerColor,
      glowColor: theme.glowColor,
      markers: MARKERS,
      onRender: (state) => {
        if (pointerInteracting !== null) {
          // User is dragging
          state.phi = pointerInteractionMovement;
        } else {
          // Auto-rotate
          state.phi = phi;
          phi += prefersReduced ? 0 : 0.003;
        }
        state.width = canvasRef.value ? canvasRef.value.offsetWidth * 2 : 600;
        state.height = canvasRef.value ? canvasRef.value.offsetHeight * 2 : 600;
      },
    });
  } catch {
    // WebGL not supported — globe area stays hidden
  }
}

function onPointerDown(e: PointerEvent) {
  pointerInteracting = e.clientX;
  if (canvasRef.value) canvasRef.value.style.cursor = "grabbing";
}

function onPointerUp() {
  pointerInteracting = null;
  if (canvasRef.value) canvasRef.value.style.cursor = "grab";
}

function onPointerOut() {
  pointerInteracting = null;
  if (canvasRef.value) canvasRef.value.style.cursor = "grab";
}

function onPointerMove(e: PointerEvent) {
  if (pointerInteracting !== null) {
    const delta = e.clientX - pointerInteracting;
    pointerInteractionMovement = phi + delta / 200;
  }
}

// ── Lifecycle ──
onMounted(() => {
  // Character reveal animation
  if (charRefs.value.length && !prefersReduced) {
    $gsap.from(charRefs.value, {
      y: "110%",
      opacity: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: "power3.out",
      delay: 0.3,
    });
  }

  // Globe init — wait for ClientOnly to render the canvas
  nextTick(() => {
    initGlobe();
  });
});

// Theme change → recreate globe
watch(
  () => colorMode.value,
  () => {
    initGlobe();
  },
);

onBeforeUnmount(() => {
  if (globeInstance) {
    globeInstance.destroy();
    globeInstance = null;
  }
});
</script>

<template>
  <section
    class="relative flex min-h-screen items-center overflow-hidden bg-background"
  >
    <!-- Text content -->
    <div class="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
      <div class="max-w-2xl">
        <!-- Headline with character reveal -->
        <h1 ref="headlineContainer" class="overflow-hidden">
          <span
            class="flex flex-wrap text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl"
          >
            <span
              v-for="(char, i) in chars"
              :key="i"
              :ref="
                (el) => {
                  if (el) charRefs[i] = el as HTMLSpanElement;
                }
              "
              class="inline-block"
              :class="{ 'mr-3 md:mr-4': char === ' ' }"
              >{{ char === " " ? "\u00A0" : char }}</span
            >
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="mt-6 max-w-lg text-lg text-muted-foreground md:text-xl">
          A heritage-tech studio bridging timeless craftsmanship with
          cutting-edge digital experiences.
        </p>

        <!-- CTAs -->
        <div class="mt-10 flex flex-wrap gap-4">
          <NuxtLink
            to="/tours"
            class="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore Tours
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Start a Project
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Globe -->
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] opacity-80"
    >
      <ClientOnly>
        <div
          data-cursor="drag"
          class="h-full w-full"
          aria-label="Interactive globe showing AKSE locations in Pakistan"
          role="img"
        >
          <canvas
            ref="canvasRef"
            class="h-full w-full cursor-grab"
            @pointerdown="onPointerDown"
            @pointerup="onPointerUp"
            @pointerout="onPointerOut"
            @pointermove="onPointerMove"
          />
        </div>
      </ClientOnly>
    </div>
  </section>
</template>
