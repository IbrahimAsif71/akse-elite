# Quickstart: Heritage-Focused Home Page

**Feature**: `008-heritage-home-page`  
**Branch**: `008-heritage-home-page`  
**Date**: 2026-03-11

---

## Prerequisites

You must be on the correct branch before starting:

```bash
git checkout 008-heritage-home-page
```

---

## No New Dependencies

All required packages are already installed in `package.json`:

| Package              | Version   | Purpose                                                         |
| -------------------- | --------- | --------------------------------------------------------------- |
| `cobe`               | `^0.6.5`  | Interactive globe (`InteractiveGlobe.vue`)                      |
| `gsap`               | `^3.14.2` | All animations                                                  |
| `lenis`              | `^1.3.17` | Smooth scroll (existing plugin)                                 |
| `@nuxtjs/color-mode` | `^4.0.0`  | Color mode module (not used for dark mode — already configured) |

**No `pnpm add` command required.** If you are starting on a fresh clone:

```bash
pnpm install
```

---

## Development Server

```bash
pnpm dev
```

The dev server starts at `http://localhost:3000`. Navigate to `http://localhost:3000/` to preview the home page.

---

## Implementation Order

Follow this sequence to build the feature with the fewest merge conflicts and the ability to verify each section independently:

### Step 1 — Grain Overlay + Cursor (Global Infrastructure)

1. Modify `assets/css/main.css` — add `html::before` grain overlay block (see [contracts/component-interfaces.md](../contracts/component-interfaces.md#assetscssmain.css--grain-overlay-addition))
2. Create `composables/useCustomCursor.ts` (see contracts for signature)
3. Modify `app.vue` — call `useCustomCursor().init/destroy` in `onMounted`/`onBeforeUnmount`

**Verification**: Open `http://localhost:3000/`. Subtle grain texture should be faintly visible on beige background. On a pointer device, the orange ring cursor should follow mouse movement.

### Step 2 — InteractiveGlobe Component

1. Create `components/Home/InteractiveGlobe.vue`
2. Import `createGlobe` from `cobe`
3. Implement auto-rotation, drag interaction, and WebGL fallback placeholder

**Verification**: Temporarily add `<HomeInteractiveGlobe />` to `pages/index.vue` or `pages/about.vue`. Globe should render with a matte beige finish and orange markers over Pakistan. Auto-rotation should be visible. Drag should work. Remove the test import after verifying.

### Step 3 — HeroCultural (P1)

1. Create `components/Home/HeroCultural.vue`
2. Implement two-column layout with copy + `InteractiveGlobe`
3. Add GSAP staggered fade-up entrance for copy elements

**Verification**: At `http://localhost:3000/`, the hero should fill 100vh with earthy beige background. Globe visible with orange markers. Text fades up on load. Custom cursor visible in hero area.

### Step 4 — DigitalHeritage (P2)

1. Create `components/Home/DigitalHeritage.vue`
2. Implement asymmetric editorial grid layout
3. Add GSAP ScrollTrigger parallax on image
4. Add section to `pages/index.vue`

**Verification**: Scroll to the section. Headline "Digital Heritage Platform" renders at oversized scale. Image translates noticeably slower than scroll speed.

### Step 5 — ImmersiveExploration (P2)

1. Create `components/Home/ImmersiveExploration.vue`
2. Set initial portal scale to `0.42` via `gsap.set()`
3. Add ScrollTrigger scrub to scale up to `0.95`
4. Add section to `pages/index.vue`

**Verification**: Scroll through the section. Portal starts small and expands to near-full-width. Animation feels slow and deliberate (scrub lag of 1s).

### Step 6 — FeaturedExperiences (P3)

1. Create `components/Home/FeaturedExperiences.vue`
2. Implement portrait gallery grid with four `ExperienceCard` items
3. Add GSAP accent-line animation on hover
4. Add section to `pages/index.vue`

**Verification**: Four portrait images render with generous white-space. Hovering reveals metadata with an orange line that draws from left to right.

### Step 7 — CreateTourCTA (P3)

1. Create `components/Home/CreateTourCTA.vue`
2. Implement radial orange gradient atmosphere
3. Wrap primary button in `<MagneticWrapper>`
4. Add section to `pages/index.vue`

**Verification**: Orange radial glow visible at bottom of section. Button drifts toward cursor on hover and springs back on leave.

### Step 8 — Legacy Cleanup

Delete the following files (all confirmed to have no references outside `pages/index.vue`):

```bash
rm components/Home/HeroCinematic.vue
rm components/Home/Aurora.vue
rm components/Home/MassiveCTA.vue
rm components/Home/ProcessPinned.vue
rm components/Home/FeaturedTours.vue
rm components/Home/MagicBento.vue
rm components/Home/FlowingMenu.vue
```

**Verification**: Run `pnpm dev` and navigate to all pages (`/`, `/about`, `/tours`). No "component not found" errors in console. No broken imports.

### Step 9 — SEO & Final Audit

1. Update `useSeoMeta` in `pages/index.vue` with heritage-home copy
2. Run dark-class audit: `grep -r "dark:" pages/index.vue components/Home/HeroCultural.vue components/Home/DigitalHeritage.vue components/Home/ImmersiveExploration.vue components/Home/FeaturedExperiences.vue components/Home/CreateTourCTA.vue` — must return zero results
3. Run `pnpm build` and verify no build errors

---

## Verification Checklist

Run these checks before closing the feature branch:

```bash
# 1. Zero dark: utility classes in new files
grep -r "dark:" pages/index.vue components/Home/HeroCultural.vue \
  components/Home/InteractiveGlobe.vue components/Home/DigitalHeritage.vue \
  components/Home/ImmersiveExploration.vue components/Home/FeaturedExperiences.vue \
  components/Home/CreateTourCTA.vue
# Expected output: (no results)

# 2. No npm/yarn/bun references in spec documentation
grep -r "npm\|yarn\|bun " specs/008-heritage-home-page/
# Expected output: (no results)

# 3. No duplicate lenis/scroll providers
grep -r "new Lenis\|studio-freight" plugins/ composables/
# Expected output: lenis.client.ts only

# 4. GSAP cleanup in all section components
grep -r "onBeforeUnmount\|onUnmounted" components/Home/HeroCultural.vue \
  components/Home/ImmersiveExploration.vue components/Home/DigitalHeritage.vue
# Expected output: each file should have at least one match

# 5. useSeoMeta present in pages/index.vue
grep "useSeoMeta" pages/index.vue
# Expected output: useSeoMeta({ ...

# 6. Production build passes
pnpm build
```

---

## Responsive Breakpoints

All five sections must be verified at these widths:

| Breakpoint | Width  | Critical check                                        |
| ---------- | ------ | ----------------------------------------------------- |
| Mobile S   | 375px  | Hero stacks vertically, globe below copy, no overflow |
| Mobile L   | 428px  | Same as above                                         |
| Tablet     | 768px  | Editorial split becomes side-by-side                  |
| Desktop    | 1280px | Full layout as designed                               |
| Large      | 1920px | No runaway font sizes, contained max-width            |

---

## Known Constraints

- **SplitText unavailable**: GSAP Free tier does not include SplitText. Use `<span>` word wrapping or line-by-line refs for text reveal animations.
- **cobe globe size**: On small viewports, the globe canvas should be capped at `300px` to prevent layout overflow. Use a computed `size` prop based on `useWindowSize()` or CSS `max-width`.
- **Lenis + ScrollTrigger**: The existing `lenis.client.ts` plugin wires Lenis to ScrollTrigger's RAF loop. Do not call `ScrollTrigger.update()` manually in any section component — Lenis handles this.
- **SSR guard for GSAP**: All GSAP code must be inside `onMounted` (or `onBeforeMount` for `gsap.set()`). Never call `$gsap` or `$ScrollTrigger` at the top-level of `<script setup>`.
