# Phase 0 Research: Heritage-Focused Home Page

**Feature**: `008-heritage-home-page`  
**Date**: 2026-03-11

---

## R-001: Film Grain / Static Noise Overlay Technique

**Decision**: SVG `fractalNoise` inline `data:image/svg+xml` background on `html::before` in `main.css`.

**Rationale**:

- SSR-safe: no JavaScript, no client-only rendering, renders in static HTML
- Zero LCP impact: pure CSS, no additional HTTP request
- Click-blocking prevention: `pointer-events: none` on the pseudo-element
- Organic grain pattern: `feTurbulence` with `type="fractalNoise"` produces cloud-like stochastic distribution superior to geometric CSS gradients for a film-look
- `mix-blend-mode: multiply` darkens the beige (#f3ebdf) naturally — shadows deepen without hue shifts
- At `opacity: 0.03` (~3%) the grain is tactile in feel but invisible to casual inspection; text legibility is fully unaffected

**Implementation**:

```css
/* assets/css/main.css */
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9998; /* above page content, below modals */
  pointer-events: none;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  will-change: transform; /* GPU promote to avoid repaint */
}
```

**Tuning notes**:

- `baseFrequency="0.85"`: medium-fine grain (increase toward 1.5 for finer, decrease toward 0.5 for coarser)
- `numOctaves="4"`: detail layers (3–5 typical)
- `stitchTiles="stitch"`: tiles the 200×200 SVG seamlessly
- `will-change: transform`: GPU-composited layer — no repaint on scroll

**Alternatives considered**:

- Canvas texture (client-only, impacts LCP) — rejected
- Static PNG noise asset (extra HTTP request + potential cache miss) — rejected
- CSS `repeating-linear-gradient` (geometric diamond pattern, not film-organic) — rejected
- `backdrop-filter` blur (wrong effect entirely) — rejected

---

## R-002: GSAP-Driven Global Custom Cursor

**Decision**: `composables/useCustomCursor.ts` composable called from `app.vue` `onMounted`, using GSAP `quickTo()` for x/y axis tracking. Controlled by `(pointer: fine)` media query. Destroyed in `app.vue` `onBeforeUnmount`.

**Rationale**:

- `quickTo()` is GSAP's purpose-built cursor API: creates a single tween per axis (no redundant animation objects). Internally uses RAF, guarantees 60fps without a manual `requestAnimationFrame` loop.
- `app.vue` placement: one instance survives all route navigations. No flash/re-create on page change.
- Composable pattern: portable to other pages if needed. Keeps `app.vue` lean.
- `matchMedia('(pointer: fine)')` gates: no activation on touch/mobile — cursor element never appended to DOM on touch devices.
- `prefers-reduced-motion` check: if motion is reduced, cursor is not initialized.
- Cursor element appended via `document.createElement` inside `onMounted` — SSR-safe (no `document` in server context).

**Implementation pattern**:

```typescript
// composables/useCustomCursor.ts
export function useCustomCursor() {
  const { $gsap } = useNuxtApp();
  let el: HTMLElement | null = null;
  let quickX: gsap.QuickToFunc | null = null;
  let quickY: gsap.QuickToFunc | null = null;

  function onMove(e: MouseEvent) {
    quickX?.(e.clientX - 20); // offset by half cursor size
    quickY?.(e.clientY - 20);
  }

  function init() {
    const isPointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!isPointer || isReduced) return;

    el = document.createElement("div");
    el.id = "__akse-cursor";
    // Styling: 40×40 circle, orange ring, brand mark
    el.style.cssText = [
      "position:fixed",
      "top:0",
      "left:0",
      "width:40px",
      "height:40px",
      "border-radius:50%",
      "border:1.5px solid #c9653d",
      "pointer-events:none",
      "z-index:9999",
      "mix-blend-mode:normal",
      "transition:opacity .3s",
    ].join(";");
    document.body.appendChild(el);
    document.documentElement.style.cursor = "none";

    quickX = $gsap.quickTo(el, "x", { duration: 0.35, ease: "power2.out" });
    quickY = $gsap.quickTo(el, "y", { duration: 0.35, ease: "power2.out" });
    window.addEventListener("mousemove", onMove);
  }

  function destroy() {
    window.removeEventListener("mousemove", onMove);
    el?.remove();
    document.documentElement.style.cursor = "";
    el = null;
    quickX = null;
    quickY = null;
  }

  return { init, destroy };
}
```

**Usage in `app.vue`**:

```vue
<script setup lang="ts">
const { init, destroy } = useCustomCursor();
onMounted(init);
onBeforeUnmount(destroy);
</script>
```

**Alternatives considered**:

- Per-page cursor component (re-mounts on every navigation, causes visible flash) — rejected
- Nuxt plugin (runs outside Vue component lifecycle; harder to integrate with `useNuxtApp()` safely in all contexts) — rejected
- CSS `cursor: url()` custom cursor (no inertia, no GSAP control, low art-direction) — rejected

---

## R-003: COBE Globe — Matte Beige/Sand Finish

**Decision**: Globe styled with warm beige surface, orange markers, and warm golden glow via specific `cobe` configuration parameters.

**Rationale**:

- `diffuse: 0.9` (reduced from existing `HeroCinematic.vue`'s 1.2) creates a matte, not glossy, surface — the key difference between a "plastic white ball" and a "sandy tactile sphere"
- `mapBrightness: 4.5` (reduced from 6) prevents the warm baseColor from washing out toward near-white at higher values
- `baseColor: [0.94, 0.89, 0.81]` (≈`#f0e3ce`) — warmer and more golden than the app's `--bg` (#f3ebdf); sits between cream and earthy sand
- `markerColor: [0.788, 0.396, 0.239]` — exact RGB conversion of AKSE orange `#c9653d`
- `glowColor: [0.82, 0.65, 0.45]` (≈`#d1a673`) — warm golden-orange; echoes marker color at lower saturation; avoids cold white or teal glow that would conflict with the light heritage palette

**Full configuration**:

```typescript
const MARKERS = [
  { location: [33.6008, 73.0679], size: 0.04 }, // Rawalpindi
  { location: [33.7019, 72.6899], size: 0.04 }, // Hasanabdal
  { location: [31.5497, 74.3436], size: 0.04 }, // Lahore
  { location: [35.9208, 74.3081], size: 0.04 }, // Gilgit
];

const globeConfig = {
  devicePixelRatio: Math.min(window.devicePixelRatio, 2),
  width: size * 2,
  height: size * 2,
  phi: 3.5, // Camera azimuth centered on Pakistan (~73°E)
  theta: 0.3, // Slight northern tilt for ~30°N
  dark: 0, // Light map (bright terrain)
  diffuse: 0.9, // ← Matte finish (below 1.0)
  mapSamples: 16000,
  mapBrightness: 4.5, // ← Warm, not washed-out
  baseColor: [0.94, 0.89, 0.81] as [number, number, number], // ~#f0e3ce
  markerColor: [0.788, 0.396, 0.239] as [number, number, number], // #c9653d
  glowColor: [0.82, 0.65, 0.45] as [number, number, number], // ~#d1a673
  markers: MARKERS,
};
```

**Auto-rotation pattern** (simple, no oscillation):

```typescript
let phi = 3.5;
onRender: (state) => {
  phi += 0.003; // slow constant rotation
  state.phi = phi;
};
```

**WebGL fallback**: Wrap canvas in a `try/catch` on `createGlobe()`. On failure, show a styled `<div>` placeholder (same size, beige bg, Pākistān silhouette or decorative border) rather than an empty/broken canvas.

**Tuning guide** (for implementer):

- If globe appears too bright → reduce `mapBrightness` to `3.5`
- If globe base looks grayish → shift `baseColor[0]` toward `0.96`
- If gloss remains → reduce `diffuse` to `0.75`
- If glow feels too warm/orange → shift `glowColor` toward `[0.88, 0.75, 0.60]`

**Alternatives considered**:

- White globe (existing HeroCinematic pattern — clinical, not warm-heritage) — rejected
- Dark globe `dark: 1` (violates light-theme mandate) — rejected
- Three.js sphere (heavier dependency than already-installed `cobe`) — rejected

---

## R-004: GSAP ScrollTrigger Portal Scale Effect

**Decision**: Single `gsap.to()` call with a `scrollTrigger` config using `scrub: 1`. Initial portal CSS `scale` set to `0.42` (via inline style or `gsap.set`). Scales to `0.95` over the section's scroll range. Section is tall (`min-h-[200vh]`) to provide scroll distance. No pinning — natural tall-section scrub.

**Rationale**:

- The same structural pattern is already used in `pages/index.vue` (legacy `scaleDown` effect) — consistent with existing codebase patterns
- `scrub: 1` introduces a 1-second lag between scroll input and animation completion — creates the slow, deliberate "stepping inside" feel the spec requires
- `start: "top 80%"` / `end: "bottom center"` gives a generous scroll range for the effect to play over
- No `pin: true` — pinning adds layout complexity and `ScrollTrigger.refresh()` requirements; a tall section achieves the same result more robustly with Lenis smooth scroll
- `transform-origin: center center` — scale pivots from the visual center of the portal

**Implementation**:

```typescript
// components/Home/ImmersiveExploration.vue
const sectionRef = ref<HTMLElement | null>(null);
const portalRef = ref<HTMLElement | null>(null);
let scrollTrigger: ReturnType<typeof $ScrollTrigger.create> | null = null;

onMounted(() => {
  if (!sectionRef.value || !portalRef.value) return;
  $gsap.set(portalRef.value, { scale: 0.42, transformOrigin: "center center" });

  const tween = $gsap.to(portalRef.value, {
    scale: 0.95,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 80%",
      end: "bottom center",
      scrub: 1,
    },
  });
  scrollTrigger = tween.scrollTrigger;

  nextTick(() => setTimeout(() => $ScrollTrigger.refresh(), 300));
});

onBeforeUnmount(() => {
  scrollTrigger?.kill();
});
```

**Alternatives considered**:

- CSS scroll-driven animations (`animation-timeline: scroll()`) — browser support gap on Safari iOS < 17.2 — rejected for production use
- Pinned section + scrub — overengineered for this effect; adds `ScrollTrigger.refresh()` complexity — rejected
- `IntersectionObserver` + CSS transition — no scrub granularity; snaps/jumps — rejected
