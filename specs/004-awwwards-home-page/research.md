# Research: Awwwards-Level Home Page

**Created**: 2026-03-06  
**Purpose**: Resolve all technical unknowns from spec before implementation design.

---

## R-001: Interactive Globe Library — cobe vs Three.js (@tresjs/nuxt)

**Decision**: Use `cobe` (v0.6.5, MIT, 5 kB gzipped)

**Rationale**:

- Purpose-built for interactive globe rendering with markers, auto-rotation, and drag
- 5 kB vs ~150 kB for Three.js — minimal bundle impact
- Simple imperative API: `createGlobe(canvas, config)` → returns instance with `.destroy()` and `.toggle()`
- Built-in marker support: `markers: [{ location: [lat, lng], size, color }]`
- Widely adopted (145k+ weekly downloads, used in Vercel's own site)
- Colors are runtime-configurable: recreate instance with new markerColor/baseColor/glowColor arrays on theme change
- @tresjs/nuxt is already installed (v5.3.0) but unused — overkill for a single globe component

**Alternatives considered**:

- `@tresjs/nuxt` (Three.js): Massively more capable but 30x the bundle size. No built-in globe primitive — would require custom sphere geometry, shader materials, and marker placement math. Rejected: disproportionate complexity for the scope.
- `globe.gl`: Feature-rich globe library (~200 kB). Rejected: too heavy, designed for data visualization dashboards, not decorative presentation.
- Pure CSS globe: Rejected: cannot achieve the visual quality, marker placement, or drag interaction required.

**SSR handling**: cobe requires a canvas DOM element. Must initialize client-side only — use `onMounted` in Vue, wrap canvas in `<ClientOnly>`.

**Cleanup**: Call `globe.destroy()` in `onBeforeUnmount` to release WebGL context. Critical for SPA navigation to prevent context leaks.

---

## R-002: Character-by-Character Text Reveal — SplitText vs Template Splitting

**Decision**: Use Vue template-driven character splitting + GSAP stagger animation

**Rationale**:

- GSAP SplitText is a premium Club/Business plugin — requires paid license. Not included in gsap@3.14.2 free tier.
- Template splitting wraps each character in a `<span>` at the Vue template level, giving GSAP full control via `gsap.from()` with stagger.
- Pattern: Compute an array of characters from the headline string → render as `<span>` elements inside an `overflow: hidden` container → GSAP `from({ y: '110%', opacity: 0 })` with `stagger: 0.03`.
- Achieves identical visual result to SplitText with zero licensing cost and full GSAP timeline integration.

**Alternatives considered**:

- GSAP SplitText plugin: Identical result but requires paid license. Rejected: unnecessary cost.
- Splitting.js (npm): Open-source DOM-based text splitter. Rejected: adds a dependency for something trivially done in Vue templates.
- CSS `@property` animations: Rejected: no per-character stagger control.

---

## R-003: Scroll-Pinned Horizontal Scroll (ProcessPinned)

**Decision**: GSAP ScrollTrigger `pin: true` + `scrub: 1` driving horizontal `x` translation

**Rationale**:

- Standard Awwwards pattern: trigger element pins at viewport, vertical scroll maps to horizontal movement via `scrub: 1`.
- Scroll distance = total content width minus viewport width. Calculate dynamically on mount and on resize.
- `gsap.to(scrollContainer, { x: -scrollDistance, scrollTrigger: { trigger, pin: true, scrub: 1, end: () => '+=' + scrollDistance } })`
- Lenis integration: Lenis is already wired to fire `ScrollTrigger.update` on every scroll event (see `lenis.client.ts` line 35). No conflict with `pin: true` — the integration is clean.

**Lenis + ScrollTrigger pin compatibility**: Confirmed compatible. The existing `lenis.on("scroll", ScrollTrigger.update)` binding ensures ScrollTrigger receives position updates from Lenis's smoothed scroll. Pin calculations work correctly with this setup.

**Lifecycle cleanup**: Each component must store its ScrollTrigger instances and call `.kill()` in `onBeforeUnmount`. Pattern: `const st = ScrollTrigger.create({...}); onBeforeUnmount(() => st.kill())`.

**Alternatives considered**:

- CSS `scroll-snap`: No pin capability, no scrub-linking with vertical scroll. Rejected.
- Intersection Observer + manual transform: Would require reimplementing GSAP's scrub math. Rejected: unnecessary when ScrollTrigger is available.

---

## R-004: Parallax Image Effect (FeaturedTours)

**Decision**: GSAP ScrollTrigger with `yPercent` and `scrub: true` on each card image

**Rationale**:

- Simple invocation: `gsap.to(imageEl, { yPercent: -15, scrollTrigger: { trigger: cardEl, start: 'top bottom', end: 'bottom top', scrub: true } })`
- Creates the effect of images moving at a different speed than the page scroll.
- Parent card containers use `overflow: hidden` + `border-radius` for masked clipping. Images are sized larger than the container (e.g., `h-[120%]`) so parallax offset doesn't reveal empty space.
- Multiple instances created efficiently via `gsap.utils.toArray()` + forEach on mount.
- GPU-composited: translates use `transform` only — no layout reflows.

---

## R-005: Custom Cursor Implementation

**Decision**: `gsap.quickTo()` for smooth 60fps cursor trailing

**Rationale**:

- `gsap.quickTo(cursorEl, 'x', { duration: 0.3, ease: 'power3' })` pre-compiles the tween. Calling `quickToX(clientX)` on every mousemove is allocation-free.
- Same for Y axis. Two quickTo instances cover full cursor movement.
- Duration 0.3s creates the classic trailing "delay" effect seen on Awwwards sites.
- Cursor expansion: GSAP timeline with `scale` and showing/hiding label text on mouseenter/mouseleave of hoverable elements.
- Pointer detection: `window.matchMedia('(pointer: fine)')` — only mount cursor on devices with fine pointer.
- CSS: `cursor: none` on `html` when custom cursor is active. Managed via a reactive CSS class.

**Alternatives considered**:

- `gsap.to()` with `overwrite: true`: Works but creates new tween objects on every mousemove. `quickTo` is specifically optimized for this pattern.
- CSS `transition` on a div: Cannot achieve the smooth non-linear trailing. Rejected.
- requestAnimationFrame manual loop: Would duplicate GSAP's ticker. Rejected.

---

## R-006: Magnetic Wrapper Spring Physics

**Decision**: `gsap.to()` with `elastic.out(1, 0.3)` easing on mouse leave

**Rationale**:

- On hover: Track mouse position relative to element center. Apply `gsap.set(el, { x: dx * 0.25, y: dy * 0.25 })` for real-time pull (25% of distance = subtle).
- On mouse leave: `gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' })` — spring-back with ~2 oscillations.
- `elastic.out(amplitude, period)`: amplitude 1 = full overshoot, period 0.3 = moderate oscillation speed. Feels like a physical spring.
- Pointer detection: Same `(pointer: fine)` check as custom cursor. No-op on touch devices.

**Alternatives considered**:

- GSAP physics2D plugin: Premium plugin, overkill for a simple spring-back. Rejected.
- CSS `transition: transform 0.8s cubic-bezier(...)`: Cannot replicate elastic overshoot. Rejected.

---

## R-007: Scale-Down Reveal Effect (MassiveCTA)

**Decision**: ScrollTrigger on preceding content wrapper applying `scale` transform as CTA enters viewport

**Rationale**:

- Wrap all pre-CTA sections in a container div. As the CTA section enters the viewport from below, scrub-animate the wrapper: `gsap.to(wrapper, { scale: 0.95, borderRadius: '24px', scrollTrigger: { trigger: ctaSection, start: 'top bottom', end: 'top center', scrub: 1 } })`.
- Creates a dramatic "falling away" effect similar to Apple's product pages.
- The CTA section itself sits outside the wrapper at full width, so it rises at normal scale while everything above shrinks.
- `transformOrigin: 'center top'` ensures the scale-down appears to recede from the viewer.

---

## R-008: Globe Marker Coordinates

**Decision**: Use verified Pakistani city coordinates

| City       | Latitude | Longitude |
| ---------- | -------- | --------- |
| Rawalpindi | 33.5731  | 73.1898   |
| Hasanabdal | 33.7847  | 72.7178   |
| Lahore     | 31.5497  | 74.3436   |
| Gilgit     | 35.9202  | 74.3114   |

Initial globe rotation: `phi ≈ 0` (equator), `theta ≈ -1.28` (Pakistan longitude in radians ≈ 73° × π/180). This centers the globe view on Pakistan on load.

---

## R-009: Theme Color Mapping for Globe

**Decision**: Read resolved theme mode from `useColorMode()`, map to cobe RGB arrays

| Token                     | Dark Mode (RGB 0-1)                    | Light Mode (RGB 0-1)                          |
| ------------------------- | -------------------------------------- | --------------------------------------------- |
| markerColor (accent)      | `[0.788, 0.396, 0.239]` (#C9653D)      | `[0.788, 0.396, 0.239]` (#C9653D)             |
| baseColor (globe surface) | `[0.055, 0.082, 0.086]` (#0e1516)      | `[0.953, 0.922, 0.875]` (#f3ebdf)             |
| glowColor (ambient)       | `[0.173, 0.478, 0.514]` (#2C7A83 teal) | `[0.788, 0.396, 0.239]` (#C9653D orange glow) |
| dark (cobe param)         | `1` (full dark map)                    | `0` (bright map)                              |

On theme change: destroy and recreate globe instance with new color config. Cheap operation (~5ms) and avoids partial state issues.

---

## R-010: Mock Tour Data for FeaturedTours

**Decision**: Use placeholder images from `/public/images/tours/` (existing directory) and hardcoded mock data arrays

The tours imagery already exists in `/public/images/tours/`. Use those paths for mock data. If images are missing, use solid color placeholder blocks with the accent gradient.

---

## R-011: Reduced Motion Handling

**Decision**: Multi-layer defense

1. **CSS layer** (already implemented in `main.css`): `@media (prefers-reduced-motion: reduce)` zeros out all CSS animation/transition durations.
2. **GSAP layer** (already implemented in `gsap.client.ts`): Sets `gsap.defaults({ duration: 0.05 })` when reduced motion preferred.
3. **Lenis layer** (already implemented in `lenis.client.ts`): Skips Lenis entirely and provides `$lenis: null`.
4. **Component layer**: Globe auto-rotation speed set to 0. Character reveal shows immediately. Parallax offsets disabled. ScrollTrigger `scrub` disabled (instant position).

No additional infrastructure needed — the existing plugin setup covers layers 1-3. Components just need to check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` for component-specific decisions.

---

## R-012: Existing Legacy Components Audit

| Component                      | Status                             | Action                                   |
| ------------------------------ | ---------------------------------- | ---------------------------------------- |
| `components/HeroCinematic.vue` | Does not exist in current codebase | N/A — listed in SPEC.md as historical    |
| `components/HomeSections.vue`  | Does not exist                     | N/A                                      |
| `components/StoryPinned.vue`   | Does not exist                     | N/A                                      |
| `components/Magnetic.vue`      | Does not exist                     | N/A                                      |
| `plugins/smooth.client.ts`     | Does not exist                     | N/A — already removed in earlier cleanup |
| `pages/index.vue`              | Exists — placeholder content       | Replace entirely                         |

**Finding**: The legacy components referenced in the spec have already been cleaned up in prior feature branches. The only file requiring replacement is `pages/index.vue` (current placeholder).
