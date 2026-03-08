<script setup lang="ts">
import createGlobe from "cobe";

const { $gsap } = useNuxtApp();
const colorMode = useColorMode();

// ── Word-level reveal setup ──
const words = ["Heritage", "Redefined"];
const wordRefs = ref<HTMLSpanElement[][]>([]);
const headlineContainer = ref<HTMLElement | null>(null);

// ── Globe setup ──
const canvasRef = ref<HTMLCanvasElement | null>(null);
const arcCanvasRef = ref<HTMLCanvasElement | null>(null);
let globeInstance: ReturnType<typeof createGlobe> | null = null;
let arcAnimationId: number | null = null;

// Pakistan centered — experimentally tuned for COBE
// COBE phi: camera azimuth angle. Higher phi = view rotates eastward.
const PAKISTAN_PHI = 3.6; // tuned to face ~73°E (Pakistan)
const PAKISTAN_THETA = 0.3; // slight northern tilt for ~30°N

// 3 destination cities in Pakistan
const ISLAMABAD: [number, number] = [33.6844, 73.0479];
const LAHORE: [number, number] = [31.5497, 74.3436];
const KARACHI: [number, number] = [24.8607, 67.0011];

// Markers — Pakistan destination cities only (prominent)
const MARKERS = [
  { location: ISLAMABAD, size: 0.04 },
  { location: LAHORE, size: 0.04 },
  { location: KARACHI, size: 0.04 },
];

// Source cities spread across the globe — visitors coming in
const SOURCES: [number, number][] = [
  [51.5074, -0.1278], // London
  [40.7128, -74.006], // New York
  [48.8566, 2.3522], // Paris
  [35.6762, 139.6503], // Tokyo
  [25.2048, 55.2708], // Dubai
  [55.7558, 37.6173], // Moscow
  [-33.8688, 151.2093], // Sydney
  [1.3521, 103.8198], // Singapore
  [19.076, 72.8777], // Mumbai
  [39.9042, 116.4074], // Beijing
  [52.52, 13.405], // Berlin
  [-23.5505, -46.6333], // São Paulo
];

// Destinations to cycle through for arcs
const DESTINATIONS = [ISLAMABAD, LAHORE, KARACHI];

/**
 * Simplified arc drawing — no 3D projection needed.
 * Destinations are placed at fixed positions relative to globe center
 * (since globe is always locked on Pakistan).
 * Arcs emerge from various edge angles and curve inward to destinations.
 */

// Destination positions as fractions of globe radius from center (x, y)
// Tuned to match where COBE renders Islamabad, Lahore, Karachi
const DST_POSITIONS: { name: string; rx: number; ry: number }[] = [
  { name: "Islamabad", rx: 0.45, ry: -0.32 }, // upper right area
  { name: "Lahore", rx: 0.5, ry: -0.22 }, // slightly right, slightly lower
  { name: "Karachi", rx: 0.3, ry: 0.05 }, // center-right, near equator
];

// Arc sources — angles around the globe edge (in radians, 0 = right, π/2 = bottom)
// Each represents the direction a flight originates from
interface ArcConfig {
  edgeAngle: number; // angle on globe edge where arc starts
  dstIdx: number; // which destination (0=ISB, 1=LHR, 2=KHI)
  speed: number; // animation speed multiplier
  offset: number; // time offset
}

const arcConfigs: ArcConfig[] = [
  { edgeAngle: -2.4, dstIdx: 0, speed: 1.0, offset: 0 }, // London → ISB
  { edgeAngle: -2.8, dstIdx: 1, speed: 0.85, offset: 500 }, // NY → LHR
  { edgeAngle: -2.0, dstIdx: 2, speed: 1.1, offset: 1000 }, // Paris → KHI
  { edgeAngle: 1.8, dstIdx: 0, speed: 0.9, offset: 1500 }, // Tokyo → ISB
  { edgeAngle: 0.3, dstIdx: 2, speed: 1.0, offset: 2000 }, // Dubai → KHI
  { edgeAngle: -1.5, dstIdx: 1, speed: 0.95, offset: 2500 }, // Moscow → LHR
  { edgeAngle: 2.5, dstIdx: 0, speed: 0.8, offset: 3000 }, // Sydney → ISB
  { edgeAngle: 1.3, dstIdx: 2, speed: 1.05, offset: 3500 }, // Singapore → KHI
  { edgeAngle: 0.6, dstIdx: 1, speed: 0.9, offset: 800 }, // Mumbai → LHR
  { edgeAngle: 2.0, dstIdx: 0, speed: 1.0, offset: 1800 }, // Beijing → ISB
  { edgeAngle: -1.8, dstIdx: 2, speed: 0.85, offset: 2800 }, // Berlin → KHI
  { edgeAngle: -3.0, dstIdx: 1, speed: 0.95, offset: 3300 }, // São Paulo → LHR
];

function drawArcs(timestamp: number) {
  const canvas = arcCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.45;

  const cycleDuration = 3500;

  arcConfigs.forEach((arc) => {
    const t =
      ((timestamp * arc.speed + arc.offset) % cycleDuration) / cycleDuration;

    // Source: on or near the globe edge
    const srcX = cx + Math.cos(arc.edgeAngle) * radius * 0.95;
    const srcY = cy + Math.sin(arc.edgeAngle) * radius * 0.95;

    // Destination: fixed position relative to globe center
    const dst = DST_POSITIONS[arc.dstIdx]!;
    const dstX = cx + dst.rx * radius;
    const dstY = cy + dst.ry * radius;

    // Compute control point for curved arc
    const midX = (srcX + dstX) / 2;
    const midY = (srcY + dstY) / 2;
    const dist = Math.hypot(dstX - srcX, dstY - srcY);
    const arcHeight = dist * 0.35;

    // Perpendicular offset for the control point (creates the arc curve)
    const dx = dstX - srcX;
    const dy = dstY - srcY;
    const nx = -dy / dist;
    const ny = dx / dist;
    const cpX = midX + nx * arcHeight;
    const cpY = midY + ny * arcHeight;

    // Animated dash — draw a portion of the bezier
    const trailLength = 0.3;
    const startT = Math.max(0, t - trailLength);
    const endT = t;

    // Draw the arc trail
    const steps = 40;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= steps; i++) {
      const p = i / steps;
      if (p < startT || p > endT) continue;
      const oneMinP = 1 - p;
      const px =
        oneMinP * oneMinP * srcX + 2 * oneMinP * p * cpX + p * p * dstX;
      const py =
        oneMinP * oneMinP * srcY + 2 * oneMinP * p * cpY + p * p * dstY;
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else {
        ctx.lineTo(px, py);
      }
    }

    const alpha = Math.sin(t * Math.PI) * 0.6 + 0.15;
    ctx.strokeStyle = `rgba(201, 101, 61, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Glowing head dot
    if (endT > 0 && endT <= 1) {
      const oneMinEnd = 1 - endT;
      const headX =
        oneMinEnd * oneMinEnd * srcX +
        2 * oneMinEnd * endT * cpX +
        endT * endT * dstX;
      const headY =
        oneMinEnd * oneMinEnd * srcY +
        2 * oneMinEnd * endT * cpY +
        endT * endT * dstY;

      ctx.beginPath();
      ctx.arc(headX, headY, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 101, 61, ${Math.min(1, alpha + 0.3)})`;
      ctx.fill();

      // Soft glow
      const grad = ctx.createRadialGradient(headX, headY, 0, headX, headY, 5);
      grad.addColorStop(0, `rgba(201, 101, 61, ${alpha * 0.5})`);
      grad.addColorStop(1, "rgba(201, 101, 61, 0)");
      ctx.beginPath();
      ctx.arc(headX, headY, 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  });

  arcAnimationId = requestAnimationFrame(drawArcs);
}

function initArcCanvas() {
  const canvas = arcCanvasRef.value;
  const globeCanvas = canvasRef.value;
  if (!canvas || !globeCanvas) return;

  const dpr = Math.min(window.devicePixelRatio, 2);
  canvas.width = globeCanvas.offsetWidth * dpr;
  canvas.height = globeCanvas.offsetHeight * dpr;
  canvas.style.width = globeCanvas.offsetWidth + "px";
  canvas.style.height = globeCanvas.offsetHeight + "px";

  if (arcAnimationId) cancelAnimationFrame(arcAnimationId);
  arcAnimationId = requestAnimationFrame(drawArcs);
}

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
      phi: PAKISTAN_PHI,
      theta: PAKISTAN_THETA,
      dark: theme.dark,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: theme.baseColor,
      markerColor: theme.markerColor,
      glowColor: theme.glowColor,
      markers: MARKERS,
      onRender: (state) => {
        // Globe is locked on Pakistan — no rotation
        state.phi = PAKISTAN_PHI;
        state.theta = PAKISTAN_THETA;
        state.width = canvasRef.value ? canvasRef.value.offsetWidth * 2 : 600;
        state.height = canvasRef.value ? canvasRef.value.offsetHeight * 2 : 600;
      },
    });
  } catch {
    // WebGL not supported
  }
}

// ── Lifecycle ──
onMounted(() => {
  // Word-level character reveal animation
  const allCharEls: HTMLSpanElement[] = [];
  wordRefs.value.forEach((wordChars) => {
    allCharEls.push(...wordChars);
  });

  if (allCharEls.length && !prefersReduced) {
    $gsap.from(allCharEls, {
      y: "110%",
      opacity: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: "power3.out",
      delay: 0.3,
    });
  }

  // Globe init + arc overlay
  nextTick(() => {
    initGlobe();
    setTimeout(() => initArcCanvas(), 500); // short delay for globe to render
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
  if (arcAnimationId) {
    cancelAnimationFrame(arcAnimationId);
    arcAnimationId = null;
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
        <!-- Headline with word-level character reveal (no mid-word breaks) -->
        <h1 ref="headlineContainer" class="overflow-hidden">
          <span
            class="flex flex-wrap gap-x-3 md:gap-x-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-8xl"
          >
            <span
              v-for="(word, wi) in words"
              :key="wi"
              class="inline-flex whitespace-nowrap overflow-hidden"
            >
              <span
                v-for="(char, ci) in word.split('')"
                :key="ci"
                :ref="
                  (el) => {
                    if (el) {
                      if (!wordRefs[wi]) wordRefs[wi] = [];
                      wordRefs[wi][ci] = el as HTMLSpanElement;
                    }
                  }
                "
                class="inline-block"
                >{{ char }}</span
              >
            </span>
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          class="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg md:text-xl"
        >
          A heritage-tech studio bridging timeless craftsmanship with
          cutting-edge digital experiences.
        </p>

        <!-- CTAs -->
        <div class="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
          <NuxtLink
            to="/tours"
            class="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-6 sm:py-3"
          >
            Explore Tours
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:px-6 sm:py-3"
          >
            Start a Project
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Globe — hidden on mobile, visible on md+ -->
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px] xl:w-[700px] xl:h-[700px] opacity-80"
    >
      <ClientOnly>
        <div
          class="relative h-full w-full"
          aria-label="Globe showing AKSE locations in Pakistan"
          role="img"
        >
          <canvas ref="canvasRef" class="h-full w-full" />
          <!-- Arc overlay canvas — drawn on top of globe -->
          <canvas
            ref="arcCanvasRef"
            class="pointer-events-none absolute inset-0 h-full w-full"
          />
        </div>
      </ClientOnly>
    </div>
  </section>
</template>
