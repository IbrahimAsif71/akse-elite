# Component Interface Contracts: Heritage-Focused Home Page

**Feature**: `008-heritage-home-page`  
**Date**: 2026-03-11

All components use `<script setup lang="ts">` and Vue 3 Composition API. None accept props unless explicitly documented. All GSAP contexts and ScrollTrigger instances must be killed in `onBeforeUnmount`.

---

## `pages/index.vue` — Page Orchestrator

**Purpose**: Root page file. Assembles five section components in scroll order. Owns `useSeoMeta`, grain overlay activation check, and custom cursor lifecycle.

**Props**: None (Nuxt page)  
**Emits**: None  
**Slots**: None

**Script setup responsibilities**:

```typescript
// SEO
useSeoMeta({
  title: "AKSE — Immersive Cultural Exploration",
  description:
    "AKSE is a digital platform that transforms real-world locations into immersive virtual tours...",
  ogTitle: "AKSE — Immersive Cultural Exploration",
  ogDescription: "...",
  ogImage: "/images/og-home.jpg",
});
```

**Template composition order**:

```
1. <HomeHeroCultural />
2. <HomeDigitalHeritage />
3. <HomeImmersiveExploration />
4. <HomeFeaturedExperiences />
5. <HomeCreateTourCTA />
```

**Constraints**:

- ZERO `dark:` Tailwind utility classes in this file
- No GSAP code in this file — animations owned by each section component
- Custom cursor lifecycle managed in `app.vue`, not here

---

## `app.vue` — Global Shell (Modified)

**Change**: Add `useCustomCursor` composable call.

```typescript
// Added to app.vue script setup
const { init: initCursor, destroy: destroyCursor } = useCustomCursor();
onMounted(initCursor);
onBeforeUnmount(destroyCursor);
```

**Constraints**: Single cursor instance — never call `useCustomCursor` from any other component.

---

## `components/Home/HeroCultural.vue`

**Purpose**: Full-viewport hero section. Renders headline/subhead/body copy with GSAP staggered fade-up entrance. Hosts `InteractiveGlobe`.

**Props**: None  
**Emits**: None  
**Slots**: None

**GSAP contract**:

```typescript
// Entrance: staggered fade-up on copy elements
// Timeline: gsap.timeline({ defaults: { duration: 1.5, ease: 'power2.out' } })
//   .from(headlineRef, { y: 40, opacity: 0 }, 0)
//   .from(subheadRef,  { y: 30, opacity: 0 }, 0.3)
//   .from(bodyRef,     { y: 20, opacity: 0 }, 0.6)
// Context: gsap.context(() => { ... }, sectionRef)
// Cleanup: ctx.revert() in onBeforeUnmount
// Reduced motion: timeline skipped if gsap.defaults().duration < 0.1 (set by plugin)
```

**Template structure**:

```
<section ref="sectionRef" class="relative min-h-screen bg-background ...">
  <!-- Left column: copy -->
  <div>
    <h1 ref="headlineRef">Immersive Cultural Exploration</h1>
    <p ref="subheadRef">Step into places where...</p>
    <p ref="bodyRef">AKSE is a digital platform...</p>
  </div>
  <!-- Right column: globe -->
  <HomeInteractiveGlobe class="..." />
</section>
```

**Constraints**:

- ZERO `dark:` classes
- Font weight for `<h1>`: `font-light` or `font-extralight` (editorial magazine, not bold)
- Letter spacing on `<h1>`: tight (`tracking-tighter` or `tracking-tight`)
- Text color: `text-foreground` (resolves to `var(--text)` = `#2f261e`) — never `text-black`
- GSAP context must be `revert()`ed in `onBeforeUnmount`

---

## `components/Home/InteractiveGlobe.vue`

**Purpose**: Renders the `cobe` WebGL globe. Self-contained canvas element with auto-rotation and drag interaction.

**Props**:

```typescript
interface Props {
  /** Canvas size in logical pixels (actual canvas is size * devicePixelRatio) */
  size?: number; // default: 500
}
```

**Emits**: None  
**Slots**: None

**Exposed behavior**:

- Auto-rotation: constant slow phi increment (`phi += 0.003` per frame)
- Drag: `pointerdown` / `pointermove` / `pointerup` delta applied to phi
- WebGL fallback: if `createGlobe` throws, renders a sized beige placeholder `<div>`

**Globe config**:

```typescript
{
  baseColor:     [0.94, 0.89, 0.81],      // Warm beige ~#f0e3ce
  markerColor:   [0.788, 0.396, 0.239],   // #c9653d AKSE orange
  glowColor:     [0.82, 0.65, 0.45],      // ~#d1a673 warm glow
  diffuse:       0.9,
  mapBrightness: 4.5,
  dark:          0,
  mapSamples:    16000,
  markers: [
    { location: [33.6008, 73.0679], size: 0.04 }, // Rawalpindi
    { location: [33.7019, 72.6899], size: 0.04 }, // Hasanabdal
    { location: [31.5497, 74.3436], size: 0.04 }, // Lahore
    { location: [35.9208, 74.3081], size: 0.04 }, // Gilgit
  ]
}
```

**Cleanup**: `globeInstance.destroy()` in `onBeforeUnmount`

**Constraints**:

- `<canvas>` must have accessible `role="img"` and `aria-label` describing the globe
- `pointer-events: auto` on canvas for drag interaction
- `devicePixelRatio` capped at 2 for performance

---

## `components/Home/DigitalHeritage.vue`

**Purpose**: Asymmetric editorial layout. Massive headline + body copy on one side, parallax-scrolling architectural detail image on the other.

**Props**: None  
**Emits**: None  
**Slots**: None

**GSAP contract**:

```typescript
// Parallax: image translates on Y axis at ~40% of scroll speed
// $gsap.to(imageRef, {
//   yPercent: -20,
//   ease: 'none',
//   scrollTrigger: {
//     trigger: sectionRef,
//     start: 'top bottom',
//     end: 'bottom top',
//     scrub: true,
//   }
// })
// Cleanup: scrollTrigger?.kill() in onBeforeUnmount
```

**Image asset**: `public/images/about/step-02-capture.png` (placeholder until dedicated architectural photo available)

**Template structure**:

```
<section ref="sectionRef" class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 ...">
  <!-- Text column (dominant) -->
  <div>
    <h2>Digital Heritage Platform</h2>
    <p>Preserving meaningful places through immersive technology.</p>
    <p>AKSE brings real-world environments...</p>
  </div>
  <!-- Image column (parallax) -->
  <div class="overflow-hidden">
    <img ref="imageRef" src="..." alt="..." class="w-full object-cover" />
  </div>
</section>
```

**Constraints**:

- ZERO `dark:` classes
- Headline `<h2>` at `text-5xl` or larger — "massive scale" as specified
- `overflow-hidden` on image wrapper to clip parallax overflow

---

## `components/Home/ImmersiveExploration.vue`

**Purpose**: Tall section containing a centrally framed "portal" element that scales from ~40% to ~95% width as the user scrolls through.

**Props**: None  
**Emits**: None  
**Slots**: None

**GSAP contract**:

```typescript
// Initial state set in onMounted before ScrollTrigger
// $gsap.set(portalRef, { scale: 0.42, transformOrigin: 'center center' })
//
// Scroll-driven scale up:
// $gsap.to(portalRef, {
//   scale: 0.95,
//   ease: 'none',
//   scrollTrigger: {
//     trigger: sectionRef,
//     start: 'top 80%',
//     end: 'bottom center',
//     scrub: 1,
//   }
// })
// scrollTrigger?.kill() in onBeforeUnmount
// $ScrollTrigger.refresh() via nextTick + setTimeout(300)
```

**Portal interior**: Static image from `public/images/tours/lahore_old_city_heritage_1773010984542.png` or a frosted-glass placeholder with `360° →` label.

**Template structure**:

```
<section ref="sectionRef" class="relative min-h-[180vh] flex flex-col items-center justify-start pt-32 bg-background overflow-hidden">
  <!-- Section header copy (above portal) -->
  <div class="text-center mb-16">
    <h2>Immersive Exploration</h2>
    <p>Move through spaces as though you were there.</p>
    <p>Our tours allow visitors...</p>
  </div>
  <!-- The portal element -->
  <div ref="portalRef" class="relative w-[95%] aspect-video border border-border rounded-lg overflow-hidden">
    <img src="..." alt="360° tour preview" class="h-full w-full object-cover" />
  </div>
</section>
```

**Constraints**:

- ZERO `dark:` classes
- Portal frame border: `border-border` (resolves to `var(--border)` = `#d9cab4`) — subtle, not heavy
- Section must be tall enough for scrub to feel gradual (min `180vh` or `200vh`)

---

## `components/Home/FeaturedExperiences.vue`

**Purpose**: Portrait-orientation museum gallery. Four experience cards with ample negative space. Hover reveals metadata with orange accent line.

**Props**: None  
**Emits**: None  
**Slots**: None

**Inline data**: The `EXPERIENCE_CARDS: ExperienceCard[]` array is defined in `<script setup>` — see [data-model.md](../data-model.md) for values.

**GSAP contract**:

```typescript
// On mouseenter per card: animate orange accent line from scaleX(0) to scaleX(1)
// $gsap.to(accentLineRef, { scaleX: 1, duration: 0.7, ease: 'power2.out', transformOrigin: 'left center' })
// On mouseleave: reverse
// $gsap.to(accentLineRef, { scaleX: 0, duration: 0.4, ease: 'power2.in', transformOrigin: 'left center' })
// No ScrollTrigger needed — simple hover micro-interactions
```

**Template structure** (per card):

```
<div class="group relative overflow-hidden">
  <img src="..." alt="..." class="w-full h-full object-cover aspect-[3/4] ..." />
  <!-- Hover overlay -->
  <div class="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-background/80">
    <p class="text-sm text-muted-foreground">{{ card.category }}</p>
    <h3 class="text-foreground font-medium">{{ card.title }}</h3>
    <!-- Orange accent line -->
    <div ref="accentLineRef" class="mt-2 h-px bg-primary origin-left scale-x-0" />
  </div>
</div>
```

**Constraints**:

- ZERO `dark:` classes
- Grid: 2 columns on mobile, 4 columns on large (`grid-cols-2 lg:grid-cols-4`)
- Portrait aspect ratio: `aspect-[3/4]` per image wrapper
- Generous gap: `gap-6 lg:gap-10`
- `NuxtLink` wrapper if `card.slug` exists, plain `div` otherwise

---

## `components/Home/CreateTourCTA.vue`

**Purpose**: Footer-style CTA. Warm orange radial gradient atmosphere. Verbatim copy. Primary button wrapped in `MagneticWrapper`.

**Props**: None  
**Emits**: None  
**Slots**: None

**Radial gradient** (scoped CSS or inline style):

```css
/* Warm orange radial bloom, blending into beige bg */
background:
  radial-gradient(
    ellipse 80% 60% at 50% 100%,
    rgba(201, 101, 61, 0.15) 0%,
    transparent 70%
  ),
  var(--bg);
```

**Template structure**:

```
<section class="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
  <!-- Gradient atmosphere applied via :style or scoped CSS -->
  <h2>Create a Tour With Us</h2>
  <p>Transform your location into a digital destination.</p>
  <p>Organizations and property owners can collaborate...</p>
  <MagneticWrapper :strength="0.3" class="mt-10">
    <NuxtLink to="/contact">
      <Button size="lg" class="bg-primary text-primary-foreground ...">Get in Touch</Button>
    </NuxtLink>
  </MagneticWrapper>
</section>
```

**Constraints**:

- ZERO `dark:` classes
- `MagneticWrapper` already exists at `components/MagneticWrapper.vue` — no props changes needed
- Gradient must be atmospheric, not a full solid orange — `rgba(201,101,61,0.15)` maximum at center
- Button must use `bg-primary` (resolves to `var(--orange)` = `#c9653d`) and `text-primary-foreground`

---

## `composables/useCustomCursor.ts`

**Purpose**: Global GSAP-driven custom cursor. Single instance, pointer-device only.

**Signature**:

```typescript
export function useCustomCursor(): {
  init: () => void;
  destroy: () => void;
};
```

**Constraints**:

- Called ONCE from `app.vue` only — never from section components
- `init()` is a no-op on touch devices (`pointer: coarse`) and on `prefers-reduced-motion: reduce`
- `destroy()` is idempotent — safe to call multiple times
- Appended element id: `__akse-cursor` — never duplicated (check `document.getElementById('__akse-cursor')` existence before appending)
- `document.documentElement.style.cursor = 'none'` on init, reset to `''` on destroy

---

## `assets/css/main.css` — Grain Overlay Addition

**Change**: Add `html::before` block after existing `:root` declarations:

```css
/* Film grain overlay — fixed, non-interactive, tactile heritage texture */
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.03'/%3E%3C/svg%3E");
  will-change: transform;
}
```

**Constraints**:

- Must be placed AFTER the `:root` block and AFTER the `.dark` block to avoid specificity conflicts
- `will-change: transform` ensures GPU compositing — no scroll-perf regressions
- `opacity='0.03'` in the SVG is the authoritative opacity source — do not add additional `opacity:` CSS property
