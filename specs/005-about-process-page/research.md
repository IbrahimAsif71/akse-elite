# Research: About & Process Page

**Created**: 2026-03-09  
**Purpose**: Resolve all technical unknowns from spec before implementation design.

---

## R-001: Text Reveal — Template Word Splitting (not SplitText)

**Decision**: Use Vue template-driven word splitting + GSAP `from()` stagger animation

**Rationale**:

- GSAP SplitText is a premium Club/Business plugin — requires paid license. NOT included in `gsap@3.14.2` free tier. This was confirmed and documented for Feature 004 (research.md R-002, 2026-03-06). Nothing has changed — the `package.json` has `"gsap": "^3.14.2"` with no Club token.
- Template word splitting: compute `headline.split(' ')` in the `script setup` → render each word as nested inline spans: outer `<span class="overflow-hidden inline-block">` (acts as clipping mask) wrapping inner `<span>` (the animated element) → GSAP `from({ y: '110%', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, ease: 'power3.out', duration: 0.9 })`.
- The `overflow: hidden` outer span creates the classic "reveal from below" effect where words appear to rise up through a slit — identical to what SplitText's `lines` mode achieves.
- This approach is fully SSR-compatible: the spans render in the SSR HTML, GSAP animations fire client-side in `onMounted`.

**Implementation note**: For the headline "Preserving the Past. Building the Future." — split by word yields 7 words, each independently animating with the stagger. The sentence break between the two clauses is handled naturally since punctuation travels with its word token.

**Alternatives considered**:

- GSAP SplitText: Identical visual result but requires paid license. Rejected: unnecessary cost, not licensed.
- `splitting.js` (npm): Open-source DOM-based text splitter. Rejected: adds a dependency for something trivially done in Vue computed properties.
- CSS `animation-delay` per span: Rejected: no GSAP timeline control, cannot be scrubbed or reversed.

---

## R-002: Sticky Split-Screen — CSS `position: sticky` (not GSAP pin)

**Decision**: CSS `position: sticky; top: [offset]` on the left column; GSAP ScrollTrigger only for the image crossfade

**Rationale**:

- The spec requires the left column to "stay pinned" while the right column scrolls vertically through five steps. This is precisely the CSS `sticky` use case: an element stays fixed within its scroll container once it reaches the top edge.
- GSAP `pin: true` is designed for scroll-transform choreography — it reserves height, wraps the element, and coordinates transforms. For a simple "stay in view" requirement, it introduces unnecessary complexity (height-reservation artifacts, additional cleanup surface area).
- CSS approach: Left column `class="sticky top-24 self-start"` (Tailwind). Right column is normal document flow. The parent grid container provides the scroll container height.
- The sticky column automatically unpins when its parent container scrolls out of view — this is the natural behavior required (the left column leaves with the section when the user scrolls past it).
- Lenis compatibility: Lenis uses `transform: translateY(...)` for smooth scrolling. CSS sticky tracks the _real_ scroll position, not Lenis's virtual position. This is a known issue with Lenis + CSS sticky. **Mitigation**: Lenis's `ScrollTrigger.update` binding keeps ScrollTrigger honest, but `position: sticky` requires an additional check. The fix is to add `data-lenis-prevent` or use `lenis.options.prevent` for the sticky container, OR use GSAP `pin: true` if CSS sticky appears broken in testing. The quickstart.md documents this as a verification checkpoint.
- **Fallback**: If CSS sticky is visually broken with Lenis during manual testing, switch to `ScrollTrigger.create({ trigger: section, pin: leftColEl, start: 'top top', end: 'bottom bottom', pinSpacing: false })`. Both approaches produce the same visual result — the switchable fallback is documented in the tasks.

**Alternatives considered**:

- GSAP `pin: true`: Achieves the same visual result but requires careful height reservation math and cleanup. Kept as an explicit fallback if CSS sticky + Lenis proves incompatible in testing.
- `position: fixed` + transform coordination: Rejected — too manual, breaks document flow.
- `IntersectionObserver` + class toggle: Rejected — not smooth, not tied to scroll position.

---

## R-003: Per-Line Opacity Scrub — Individual ScrollTrigger per Line Element

**Decision**: `gsap.utils.toArray()` on line wrapper elements → one `ScrollTrigger` per line with `scrub: true`

**Rationale**:

- The spec requires text opacity to transition from 0.2 → 1.0 per line, tied to scroll position. This is a scrubbed animation, meaning it reverses when scrolling back — not a one-shot `toggleClass`.
- Pattern per line:
  ```js
  gsap.fromTo(
    lineEl,
    { opacity: 0.2 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: lineEl,
        start: "top 80%",
        end: "top 45%",
        scrub: true,
      },
    },
  );
  ```
- `start: 'top 80%'` means the trigger fires when the top of the line element reaches 80% down the viewport (near bottom). `end: 'top 45%'` means full opacity when the line reaches mid-viewport. As the user scrolls, the opacity interpolates between 0.2 and 1.0 based on scroll position within that window.
- Bidirectionality is automatic: `scrub: true` means the animation reverses when scrolling back up.
- All ScrollTrigger instances stored in an array and killed in `onBeforeUnmount`.

**Line element strategy**: Each paragraph or sentence in the mission statement is wrapped in a `<p>` or `<span class="mission-line block">` at template level. `gsap.utils.toArray('.mission-line', sectionRef.value)` finds them. This avoids DOM queries outside the component's scoped subtree.

**Alternatives considered**:

- Single shared timeline with labels: Works but is harder to control per individual line when lines have different heights. Per-element ScrollTriggers are more compositional.
- CSS `@keyframes` + Intersection Observer toggle: Cannot scrub (no position-linked continuous opacity). Rejected.
- GSAP `matchMedia`: Not needed for this effect — scrub handles direction. `matchMedia` used elsewhere for responsive disable.

---

## R-004: Image Crossfade — ScrollTrigger Callbacks with GSAP Timeline

**Decision**: Stack five step images absolutely; ScrollTrigger per step using `onEnter` / `onLeaveBack` callbacks driving `gsap.to(autoAlpha)`

**Rationale**:

- Five images need to crossfade as the user scrolls through five right-column steps. The images are stacked in a single container (all absolutely positioned), with only the active one visible.
- Each step's right-column element gets a ScrollTrigger. The trigger fires when the step crosses the viewport center (~50% mark). `onEnter` fades the new image in and the previous image out simultaneously. `onLeaveBack` reverses.
- Crossfade implementation:
  ```js
  steps.forEach((stepEl, i) => {
    ScrollTrigger.create({
      trigger: stepEl,
      start: "top center",
      onEnter: () => {
        gsap.to(imageEls[i], { autoAlpha: 1, duration: 0.6 });
        if (i > 0) gsap.to(imageEls[i - 1], { autoAlpha: 0, duration: 0.6 });
      },
      onLeaveBack: () => {
        gsap.to(imageEls[i], { autoAlpha: 0, duration: 0.4 });
        if (i > 0) gsap.to(imageEls[i - 1], { autoAlpha: 1, duration: 0.4 });
      },
    });
  });
  ```
- Uses `autoAlpha` (not `opacity`) to also set `visibility: hidden` when fully transparent — prevents invisible images from capturing pointer events.
- Initial state: image 0 at `autoAlpha: 1`, images 1–4 at `autoAlpha: 0`.

**Mock images**: `public/images/about/step-01-assessment.jpg` through `step-05-deployment.jpg`. If files are missing, the container background-color (theme `--muted`) provides a graceful placeholder.

**Alternatives considered**:

- CSS `scroll-snap` + nth-child: No crossfade capability. Rejected.
- GSAP `scrub` timeline for sequential fades: Requires careful timing math relative to total section scroll distance. `onEnter`/`onLeaveBack` callbacks are simpler and more predictable.
- Vue `<Transition>` component: Reactive approach, triggered by watching active step index. Works but couples the animation to Vue's reactive system, adding indirection. GSAP callbacks are more direct here.

---

## R-005: Tech Card Glow — CSS `box-shadow` with Theme Token + MagneticWrapper

**Decision**: CSS `box-shadow` transition on hover using `var(--accent)` token; `MagneticWrapper.vue` wraps each card for magnetic pull

**Rationale**:

- The existing `components/MagneticWrapper.vue` already implements pointer-fine detection, GSAP magnetic pull, and elastic spring-back. It accepts a `strength` prop (default 0.25). Each tech card is wrapped: `<MagneticWrapper><Card>…</Card></MagneticWrapper>`.
- Border glow: A CSS approach using `box-shadow` and a scoped Tailwind `group-hover:` or direct `:hover` style. The `--accent` CSS variable resolves to orange in light mode and rust in dark mode automatically:
  ```css
  .tech-card:hover {
    box-shadow:
      0 0 0 1.5px hsl(var(--primary)),
      0 0 18px 2px hsl(var(--primary) / 0.3);
    transition: box-shadow 0.3s ease;
  }
  ```
- Using `hsl(var(--primary))` references the shadcn-vue primary token defined by the theme system (Feature 001). This guarantees theme-correct glow without manual media query branching.
- No GSAP needed for the glow — GPU-composited `box-shadow` transition is smooth and allocation-free.

**Existing component check**: `components/MagneticWrapper.vue` confirmed present in codebase (verified 2026-03-09). Uses `$gsap` from `useNuxtApp()`. No modifications needed.

**Alternatives considered**:

- CSS `outline` on hover: Not blurry — cannot achieve glow effect. Rejected.
- GSAP `to(el, { boxShadow: ... })`: Works but GSAP animating `box-shadow` requires string interpolation and is slower than CSS transition on GPU. Rejected in favor of CSS.
- `border-color` transition only: No glow effect. Rejected.

---

## R-006: Parallax Hero Image — ScrollTrigger `scrub` on `scale` and `filter: blur()`

**Decision**: GSAP ScrollTrigger with `scrub: true` on `scale` (from 1.08 → 1.0) and `filter` (from `blur(8px)` → `blur(0px)`) tied to hero scroll position

**Rationale**:

- Hero image starts slightly scaled up (1.08) with a blur applied, making it feel "unresolved." As the user scrolls down, the scale decreases toward 1.0 and blur toward 0 — the image "sharpens into focus" as the visitor commits to reading the page.
- GSAP `filter` animation: GSAP 3.x supports animating CSS filter strings. Use `gsap.to(imageEl, { scale: 1.0, filter: 'blur(0px)', scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true } })`.
- `transformOrigin: 'center center'` on the image so scale-down appears concentric.
- The image container uses `overflow: hidden` to clip the scale-up overhang.
- **Performance note**: `filter: blur()` is GPU-composited in modern browsers (Chrome, Safari render it on the compositor thread). Does NOT cause layout reflow. Acceptable for a single hero image element.

**Alternatives considered**:

- CSS `backdrop-filter` (on an overlay): More complex compositing model. The direct `filter` on the `<img>` is simpler.
- `clip-path` scale-in: No blur capability. Rejected.
- Separate CSS `@keyframes` + JS scroll listener: Non-scrubbed, cannot reverse naturally. Rejected.

---

## R-007: Mock Image Asset Strategy

**Decision**: Use existing `public/images/tours/` assets where suitable; create `public/images/about/` directory with placeholder filenames

**Rationale**:

- The `public/images/tours/` directory exists with real assets from the tour features. For the About page, some of these shots (heritage sites, camera rigs) may be repurposed as mock stand-ins.
- Create `public/images/about/` with expected filenames. If actual photographs are not yet available, use `<div class="bg-muted aspect-video rounded-xl">` as a placeholder — this is styled by the theme and requires no image file.
- This means zero hard dependency on specific image files. Components MUST implement image fallback patterns (conditional rendering or CSS background placeholder).
- Five step images needed: `step-01-assessment.jpg`, `step-02-capture.jpg`, `step-03-editing.jpg`, `step-04-stitching.jpg`, `step-05-deployment.jpg`. Hero image: `hero-camera-rig.jpg`.

**Alternatives considered**:

- External placeholder services (picsum.photos / unsplash.it): Rejected — introduces network dependency in development; creates SSRF risk in CI environments.
- Imported inline SVG placeholders: Rejected — unnecessarily complex for a placeholder state.

---

## R-008: `prefers-reduced-motion` Handling

**Decision**: Multi-layer defense (same as Feature 004, extended for new animation types)

1. **CSS layer** (already in `main.css`): `@media (prefers-reduced-motion: reduce)` zeroes CSS transition/animation durations.
2. **GSAP layer** (already in `gsap.client.ts`): Sets `gsap.defaults({ duration: 0.05 })` when reduced motion preferred.
3. **Lenis layer** (already in `lenis.client.ts`): Skips Lenis entirely, provides `$lenis: null`.
4. **Component layer** (new for this feature): Each `onMounted` animation block checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. For the word-reveal timeline: skip `from({ y: '110%' })` and show text immediately. For per-line opacity scrub: set all lines to `opacity: 1` immediately without ScrollTrigger. For crossfade: show all images at their initial state without transition.

No new infrastructure needed — layers 1-3 are inherited. Layer 4 is a local `if (prefersReduced) return` guard at the top of each animation setup function.

---

## R-009: Mobile Responsive Layout for ProcessTimeline

**Decision**: Below `md` breakpoint (< 768px), stack layout vertically; CSS sticky disabled; image renders above text for each step

**Rationale**:

- CSS `sticky` only applies on the left column within a two-column grid. On mobile, the grid collapses to a single column (`grid-cols-1`). The left column becomes a normal section header rendered once at the top of the mobile layout, with each step's image + copy stacked sequentially below.
- No ScrollTrigger crossfade on mobile: the images are embedded inline with each step (not stacked in an absolute container), so the crossfade mechanism is simply omitted. Each step's image renders above its text copy.
- GSAP ScrollTrigger setup for sticky/crossfade is wrapped in a `window.matchMedia('(min-width: 768px)')` check using `gsap.matchMedia()` to automatically clean up when the viewport resizes below the breakpoint.

**Implementation note**: GSAP `gsap.matchMedia()` (not `window.matchMedia`) is the correct tool here — it integrates ScrollTrigger cleanup into the responsive breakpoint lifecycle, avoiding stale triggers if the user resizes.
