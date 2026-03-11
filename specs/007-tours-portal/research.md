# Research: Interactive Tours Portal

**Created**: 2026-03-11  
**Purpose**: Resolve all technical unknowns from spec before implementation design.

---

## R-001: Magnetic Wrapper Implementation

**Decision**: Create `components/MagneticWrapper.vue` using `gsap.set()` for real-time pull and `gsap.to()` with `elastic.out(1, 0.3)` for spring-back

**Rationale**:

- MagneticWrapper does not exist in the current codebase. It was planned in 004-awwwards-home-page but the component was never created/merged.
- Spec FR-016 requires the "Enter Virtual Tour" CTA to have a magnetic pull effect on pointer devices.
- Pattern from 004 research (R-006): Track `mousemove` relative to element center → apply `gsap.set(el, { x: dx * 0.25, y: dy * 0.25 })` for 25% pull toward cursor → on `mouseleave`, `gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' })`.
- Pointer detection: `window.matchMedia('(pointer: fine)').matches` — no-op on touch devices.
- Place at `components/MagneticWrapper.vue` (root-level) for reuse by About page (TechShowcase) and any future features.
- Component accepts default slot content. Wraps in a `<div>` that receives the transform. Exposes no props beyond an optional `strength` (default 0.25).

**Alternatives considered**:

- CSS-only hover transform: Cannot follow cursor position — fixed direction only. Rejected.
- GSAP physics2D plugin: Premium plugin, overkill for simple magnetic pull. Rejected.

---

## R-002: Glassmorphism Implementation

**Decision**: `backdrop-filter: blur(16px)` + themed semi-transparent background + subtle border

**Rationale**:

- Spec FR-015 requires a glassmorphism-styled metadata bar for the hero section.
- Tailwind provides `backdrop-blur-md` (12px) and `backdrop-blur-lg` (16px) utilities. Using `backdrop-blur-lg` or custom `backdrop-blur-[16px]`.
- Background: Use `bg-surface/60` (60% opacity of the themed `--surface` variable) in light mode. In dark mode: `bg-[rgba(14,21,22,0.5)]` or reference `--surface` dark override.
- Border: `border border-white/10` for subtle glass edge in dark mode, `border border-border/50` in light mode.
- This approach uses Tailwind utilities exclusively — no raw CSS structural layout. The `backdrop-filter` is applied via Tailwind's `backdrop-blur-*` class.

**Browser support**: `backdrop-filter` has >95% global support (all modern browsers). No polyfill needed.

**Alternatives considered**:

- Pure opacity background without blur: Loses the glass effect. Rejected per spec requirement.
- Frosted glass via SVG filter: More complex, worse performance. Rejected.

---

## R-003: Sticky Filter Bar Approach

**Decision**: CSS `position: sticky` with `top: 0` and `z-index` layering

**Rationale**:

- Spec FR-020 requires the filter bar to become sticky at the top when scrolling past the hero.
- CSS `position: sticky; top: 0` achieves this natively with zero JavaScript. The bar sits in normal document flow within its parent, and locks to the top when the scroll position passes it.
- No GSAP ScrollTrigger needed for the pin itself — CSS sticky is simpler, cheaper, and more reliable for this use case.
- The filter bar section should be placed directly after the hero in the DOM. Tailwind classes: `sticky top-0 z-30`.
- Background needs to be opaque (not transparent) so content doesn't show through when scrolling. Use `bg-background` or themed equivalent.

**Lenis compatibility**: CSS `position: sticky` works correctly with Lenis smooth scroll. The scroll position Lenis reports is the actual transformed position, so sticky triggers at the correct point.

**Alternatives considered**:

- GSAP ScrollTrigger `pin: true`: Introduces unnecessary complexity (height reservation, pin-spacer div). Overkill when CSS sticky suffices. Rejected.
- Intersection Observer to toggle a fixed class: More complex than native sticky. Rejected.

---

## R-004: Staggered Card Entrance Animation

**Decision**: `ScrollTrigger.batch()` with staggered `gsap.from()` for opacity + translateY

**Rationale**:

- Spec FR-033 requires cards to animate in with a staggered fade-up effect as they enter the viewport.
- `ScrollTrigger.batch('.tour-card', { onEnter: (batch) => gsap.from(batch, { y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' }) })` handles multiple elements efficiently with a single ScrollTrigger instance.
- `batch` groups elements that enter the viewport on the same frame into one callback, then `stagger` offsets them naturally.
- GPU-composited: uses `opacity` and `transform: translateY` only — no layout reflows.

**`once: true` pattern**: Cards should animate in only once (not re-trigger when scrolling back). Use `{ once: true }` option or set `toggleActions: 'play none none none'`.

**Lifecycle cleanup**: Store the ScrollTrigger batch instance and call `.kill()` in `onUnmounted`. Pattern: `const batchST = ScrollTrigger.batch(...)` → cleanup in unmount.

**Alternatives considered**:

- Individual ScrollTrigger per card: Works but creates N ScrollTriggers (one per card). Batch is purpose-built for this. Rejected.
- Intersection Observer + manual GSAP calls: Reinvents what ScrollTrigger.batch does. Rejected.
- CSS `animation-delay` with IntersectionObserver class toggle: No stagger control relative to batch entry. Rejected.

---

## R-005: Dual-Theme Dark Mode Implementation

**Decision**: Add `.dark` class variable overrides to `assets/css/main.css` with the cinematic dark palette

**Rationale**:

- The constitution mandates dual-theme architecture using `@nuxtjs/color-mode` (class strategy).
- Current state: `main.css` is light-only (earthy beige palette). No `.dark` selector exists. `@nuxtjs/color-mode` is **not installed**.
- The spec explicitly requests dual-theme: "Follow our Dual-Theme architecture (Light: Beige/Orange, Dark: Deep #0e1516/Rust)."
- Implementation: Add a `.dark` CSS class block after `:root` that overrides all semantic variables with the cinematic dark palette from the constitution:
  - `--bg: #0e1516`, `--surface: rgba(10,12,13,0.34)`, `--surface-alt: rgba(10,12,13,0.46)`
  - `--text: #F3EDE7`, `--text-muted: rgba(243,237,231,0.78)`
  - `--orange: #C9653D` (same), `--teal: #2C7A83` (same)
  - Adjust `--border`, `--card`, `--secondary`, `--muted`, `--accent` for dark palette
  - Set `color-scheme: dark`
- Install `@nuxtjs/color-mode` via `pnpm add @nuxtjs/color-mode` and add to `nuxt.config.ts` modules with `classSuffix: ''` (class strategy: adds `.dark` class to `<html>`).
- This is a **cross-cutting infrastructure change** that benefits all current and future pages/components since they already use semantic Tailwind classes (`bg-background`, `text-foreground`, `text-primary`, etc.) which derive from CSS variables.

**Note**: Feature 006-earthy-theme-cleanup specifies removing dark mode, but it is in Draft status and has not been implemented. The constitution (ratified 2026-03-05 — earlier authority) mandates dual-theme. This plan follows the constitution and the explicit user request.

**Scope**: This feature adds the dark variable block and `@nuxtjs/color-mode` integration. It does NOT add a theme toggle UI to the nav — that is out of scope (toggle UI can be added in a separate task or the existing layout can be extended).

**Alternatives considered**:

- Skip dark mode, implement light-only: Violates the constitution and spec requirements. Rejected.
- Use `prefers-color-scheme` media query only: Constitution specifies class strategy with `@nuxtjs/color-mode` for explicit user control. Rejected.
- Tailwind v4 `@variant dark`: Tailwind v4's dark variant reads `prefers-color-scheme` by default. Constitution requires class-based switching via color-mode module. CSS variable overrides under `.dark` class are the correct pattern. Rejected as sole mechanism.

---

## R-006: Lock Cursor for Upcoming Cards

**Decision**: CSS `cursor: not-allowed` with optional custom cursor SVG fallback

**Rationale**:

- Spec FR-035 requires hovering upcoming (locked) tour cards to show a lock or "soon" indicator.
- Simplest approach: `cursor: not-allowed` on the card element. This uses the browser's native disabled cursor (a circle with a line through it) as a universally understood "not available" signal.
- Enhanced approach: `cursor: url('/images/cursors/lock.svg') 12 12, not-allowed` — custom lock SVG with fallback to `not-allowed`. The SVG is a small (~500 byte) lock icon.
- Tailwind: Apply via `cursor-not-allowed` class (simplest) or a custom utility.
- No JavaScript required. Works on all pointer devices including trackpads.

**Alternatives considered**:

- Full custom cursor system (like 004's CustomCursor.vue): Massive overkill for a single hover state change. Rejected.
- CSS `pointer-events: none`: Would prevent any hover styling from activating. Bad UX — user can't tell they're hovering. Rejected.

---

## R-007: Hero Background Scale on CTA Hover

**Decision**: GSAP `gsap.to()` targeting the background image element, triggered by MagneticWrapper mouse events

**Rationale**:

- Spec FR-017/018 require the hero background to scale up to ~1.05× when the CTA button is hovered, and back to 1.0× on exit.
- The FeaturedTour component holds a ref to the background `<img>` (or `<video>`) element. The MagneticWrapper component emits `mouseenter`/`mouseleave` events (or the parent listens to these DOM events on the wrapper).
- On CTA mouseenter: `gsap.to(bgRef, { scale: 1.05, duration: 1.2, ease: 'power2.out' })`.
- On CTA mouseleave: `gsap.to(bgRef, { scale: 1, duration: 1.2, ease: 'power2.out' })`.
- GPU-composited: uses `transform: scale()` only — no layout reflow.
- Initial state: `scale: 1` with `will-change: transform` for paint layer promotion.

**Alternatives considered**:

- CSS `transition` on hover: Cannot be triggered by hovering a sibling element (the button). JS event linking needed. Rejected as sole mechanism.
- CSS `:has()` selector: `.hero:has(.cta:hover) .bg { transform: scale(1.05) }` — modern CSS approach but no easing control and browser support still spotty for complex selectors. Rejected for reliability.

---

## R-008: "In Production" Badge Animation

**Decision**: CSS `@keyframes` pulse animation on the badge background/border

**Rationale**:

- Spec FR-031 requires an animated badge on upcoming tour cards ("In Production" or "Scanning…") with a pulse or subtle motion effect.
- A CSS-only pulse avoids GSAP overhead for a simple repeating effect. Tailwind's `animate-pulse` (opacity oscillation) or a custom keyframe that pulses the badge's box-shadow/border-glow.
- Custom keyframe: `@keyframes badge-pulse { 0%, 100% { opacity: 0.7; box-shadow: 0 0 8px var(--orange); } 50% { opacity: 1; box-shadow: 0 0 16px var(--orange); } }`.
- Duration: ~2s infinite alternate — slow, premium feel.
- Respects `prefers-reduced-motion` via the defense-in-depth CSS rule already in `main.css` that zeros out animation durations.

**"Scanning…" text animation**: Optionally, the badge text can cycle between "In Production" and "Scanning…" with a CSS `text-overflow` or a simple Vue interval. Decision: Use a static "In Production" label with the pulse — text cycling adds complexity without proportional value.

**Alternatives considered**:

- GSAP timeline for badge: Overkill for a simple repeating effect. GSAP excels at complex choreography, not simple pulses. Rejected.
- Lottie animation: Requires asset creation and a new dependency. Rejected.

---

## R-009: Filter Chip Category Matching

**Decision**: Client-side array filter on mock data using `computed()` reactive property

**Rationale**:

- Spec FR-024 requires clicking a filter chip to update the visible grid cards.
- All data is mock/static. Store tours in a reactive array. Active category stored in a `ref<string>('All')`.
- `const filteredTours = computed(() => activeCategory.value === 'All' ? allTours : allTours.filter(t => t.category === activeCategory.value))`.
- The UpcomingGrid component receives the filtered list as a prop. FilterRail emits the selected category. Parent page coordinates via v-model or event.
- Grid re-renders reactively. ScrollTrigger.batch needs to be refreshed after filter changes to register new elements: `ScrollTrigger.refresh()`.

**Alternatives considered**:

- URL-based filtering (query params): Out of scope per spec ("deep linking is out of scope"). Rejected for now.
- CSS-only show/hide (display: none): Would break ScrollTrigger batch calculations. Rejected.

---

## R-010: Mock Tour Data & Existing Assets

**Decision**: Use existing `/public/images/tours/` assets for the active tour and placeholder gradient blocks for upcoming tours

**Rationale**:

- The `public/images/tours/` directory already contains tour images used by the home page FeaturedTours component:
  - `rohtas_fort_heritage_1773010968806.png`
  - `lahore_old_city_heritage_1773011000439.png` (reusable for Lahore Fort mock)
  - `hunza_valley_adventure_1773011000439.png`
  - `taxila_museum_heritage_1773011014212.png`
- For the featured tour (Golra Sharif): Use one of these existing assets or add a new representative image to `public/images/tours/`.
- For upcoming (blurred) cards: The blur/grayscale filter obscures detail, so existing assets work well as placeholders. The visual treatment communicates "coming soon" regardless of the actual image content.
- Fallback: If a specific image is missing, use a solid gradient block with the accent color — themed via CSS variables.

---

## R-011: Reduced Motion Handling

**Decision**: Multi-layer defense (reuse existing infrastructure)

1. **CSS layer** (already in `main.css`): `@media (prefers-reduced-motion: reduce)` zeros out all CSS animation/transition durations — covers badge pulse.
2. **GSAP layer** (already in `gsap.client.ts`): Sets `gsap.defaults({ duration: 0.05 })` — covers all GSAP tweens including card stagger and hero scale.
3. **Lenis layer** (already in `lenis.client.ts`): Skips Lenis entirely when reduced motion preferred.
4. **Component layer**: MagneticWrapper checks `matchMedia('(pointer: fine)')` and `matchMedia('(prefers-reduced-motion: reduce)')` — no-op when either fails. ScrollTrigger.batch `stagger` still works but with near-zero duration.

No additional infrastructure needed.

---

## R-012: Existing Artifacts Audit

| Artifact                         | Status                                | Action                                     |
| -------------------------------- | ------------------------------------- | ------------------------------------------ |
| `pages/tours/index.vue`          | Exists — placeholder content          | Replace entirely with new page composition |
| `components/Tours/`              | Does not exist                        | Create new directory with 4 components     |
| `components/MagneticWrapper.vue` | Does not exist                        | Create new                                 |
| `components/Magnetic.vue`        | Does not exist (historical reference) | N/A                                        |
| `plugins/smooth.client.ts`       | Does not exist (removed previously)   | N/A                                        |
| `.dark` CSS class                | Does not exist in main.css            | Create new variable override block         |
| `@nuxtjs/color-mode`             | Not installed                         | Install and configure in nuxt.config.ts    |
