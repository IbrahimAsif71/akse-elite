# Feature Specification: Heritage-Focused Home Page

**Feature Branch**: `008-heritage-home-page`  
**Created**: 2026-03-11  
**Status**: Draft  
**Input**: User description: "Heritage-Focused Home Page (pages/index.vue) — Build the primary landing page for the AKSE platform. The design must strictly adhere to our Single Light Theme architecture (Beige/light neutral backgrounds, Orange interactive accents) without any dark mode logic or dark: utility classes. The aesthetic is an elegant, airy, cinematic museum-exhibit heritage vibe. Use GSAP for slow, premium, sweeping animations. Five primary sections: HeroCultural, DigitalHeritage, ImmersiveExploration, FeaturedExperiences, CreateTourCTA."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Cinematic Hero First Impression (Priority: P1)

A first-time visitor arrives at `akse.co` and encounters a full-viewport hero section. The clean earthy-beige background fills the screen. On one side the platform's headline copy fades upward in elegant, slow motion. On the other, an interactive globe rendered in a matte sand finish rotates gently, with glowing orange markers pinpointing Rawalpindi, Hasanabdal, Lahore, and Gilgit — places the platform has captured. A subtle film-grain overlay gives the entire canvas a tactile, historical texture. The visitor can drag the globe to explore, and the cursor transforms into a custom branded disc that responds to the globe's surface.

**Why this priority**: The hero is the single most critical section — it establishes the premium heritage positioning of the platform in under five seconds. If this section fails to communicate sophistication, the rest of the page is irrelevant.

**Independent Test**: Can be fully tested by navigating to `/` and confirming: the beige background fills 100vh, hero copy is present and legible, the globe renders and auto-rotates with orange markers visible, the grain overlay is subtly present without obstructing content, and the custom cursor disc follows mouse movement.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/`, **When** the page loads, **Then** a full-viewport hero section is displayed with an earthy beige background and no dark-mode styling.
2. **Given** the hero is rendered, **When** the visitor reads the content, **Then** the headline "Immersive Cultural Exploration," the subhead "Step into places where history, space, and technology converge," and the full body paragraph are all visible with appropriate editorial typography (light weight, tight letter-spacing on headline, relaxed line-height on body).
3. **Given** the hero loads, **When** the initial animation plays, **Then** the headline, subhead, and body text each fade upward sequentially with a minimum duration of 1.5 seconds per element.
4. **Given** the hero is rendered on a touch or pointer device, **When** the visitor interacts with the globe, **Then** the globe responds to drag/rotate interactions and continues its auto-rotation when released.
5. **Given** the page is loaded, **When** inspecting the hero visually, **Then** a film-grain/static-noise overlay is present at approximately 3% opacity using a multiply or overlay blend mode, visible without obstructing the text.
6. **Given** a pointer device is in use, **When** the visitor moves the cursor across the hero, **Then** the native cursor is hidden and replaced with a custom GSAP-driven circular branded disc that follows the cursor with slight inertia.
7. **Given** the page is visible, **When** examining the corner area, **Then** a circulating AKSE logo element is present in a corner of the viewport.

---

### User Story 2 - Digital Heritage Editorial Section (Priority: P2)

As the visitor scrolls past the hero, they arrive at an asymmetrical editorial layout. On one side, the "Digital Heritage Platform" headline is rendered at a massive scale — dominating the column — with the subhead and body copy below it in a relaxed reading weight. On the other side, a high-resolution architectural detail image floats and shifts at a different scroll speed than the surrounding content, creating a sense of physical depth. The section communicates AKSE's purpose as a preservation tool using the exact provided copy.

**Why this priority**: This section is the platform's value proposition explained in one scroll-depth. Without it, visitors who scroll past the hero have no context for what AKSE actually does or why it matters culturally.

**Independent Test**: Can be fully tested by scrolling to the `DigitalHeritage` section and confirming: the headline "Digital Heritage Platform" renders at an oversized scale, the body copy is present verbatim, the image element is visible and positioned asymmetrically to the text, and scrolling causes the image to translate at a noticeably different rate from the surrounding text (parallax).

**Acceptance Scenarios**:

1. **Given** the visitor scrolls to the `DigitalHeritage` section, **When** the section enters the viewport, **Then** the headline "Digital Heritage Platform," subhead "Preserving meaningful places through immersive technology," and the full body paragraph are all visible.
2. **Given** the section is rendered, **When** looking at the layout, **Then** the text column and the image column occupy an asymmetrical split — one column is noticeably wider or more dominant than the other.
3. **Given** the visitor scrolls through this section, **When** the scroll position advances, **Then** the image element translates vertically at a slower or faster rate than the main scroll speed, creating a visible parallax depth effect.
4. **Given** the section is rendered in the light theme, **When** inspecting colors, **Then** text uses dark grey/ink tones (not pure black), accents use the platform's orange, and the background remains in the beige palette.

---

### User Story 3 - Immersive Exploration Portal (Priority: P2)

Continuing to scroll, the visitor encounters the "Immersive Exploration" section. At the center of the beige canvas is an elegantly framed rectangular "portal" — a window whose interior gives a glimpse of a 360° environment. As the visitor scrolls, the portal frame smoothly scales from a modest size to nearly full-width using a GSAP ScrollTrigger, creating the visceral sensation of stepping through a doorway into the tour space. The copy alongside communicates the navigation mechanics of the platform.

**Why this priority**: This section converts abstract curiosity into desire — it simulates the feeling of "entering" a tour before the visitor has clicked anything. It is the page's strongest conversion mechanism short of the CTA.

**Independent Test**: Can be fully tested by scrolling into the `ImmersiveExploration` section and confirming: the portal frame element is visible at a smaller initial size, scrolling causes it to scale upward smoothly, the scaling is driven by GSAP ScrollTrigger (not CSS transitions), and the copy "Immersive Exploration" / "Move through spaces as though you were there" is legible at all scroll positions.

**Acceptance Scenarios**:

1. **Given** the visitor begins scrolling into the `ImmersiveExploration` section, **When** the section enters the viewport, **Then** a centrally positioned, framed rectangular portal element is visible at an initially modest scale.
2. **Given** the portal is in view and the visitor scrolls, **When** the scroll position advances through the section's pin zone, **Then** the portal frame scales upward continuously, reaching near full-width at the end of the scroll trigger range.
3. **Given** the portal animation is playing, **When** inspecting the animation, **Then** the scaling is driven by a GSAP ScrollTrigger animation (not a CSS transition) and moves at a slow, premium pace.
4. **Given** the section is rendered on a beige background, **When** looking at framing, **Then** the portal's border/frame treatment uses elegant, restrained styling — no heavy drop shadows or neon effects; the frame is subtle (e.g., a thin ink or warm-grey border with slight inner vignette).
5. **Given** the section is fully scrolled through, **When** reading the copy, **Then** the headline "Immersive Exploration," subhead "Move through spaces as though you were there," and the full body paragraph are all legible at some point during the scroll sequence.

---

### User Story 4 - Museum-Style Experiences Gallery (Priority: P3)

The visitor arrives at the "Featured Experiences" gallery — a refined, portrait-oriented grid of location images formatted like museum exhibition photographs. Each image is tall and stately, surrounded by generous beige negative space. On hover (or tap), the image subtly brightens and a metadata overlay fades in below or over the image: the location name, a category tag, and a thin orange accent line that animates in from left to right. The copy above the gallery uses the provided verbatim text.

**Why this priority**: This is the social-proof and catalog-presentation layer. Visitors need to see the breadth of places AKSE captures before they've committed to exploring any single one. Without this gallery, the page feels unsubstantiated.

**Independent Test**: Can be tested by scrolling to the `FeaturedExperiences` section and confirming: images render in a portrait grid with deliberate negative space, hovering an image triggers a slow metadata reveal with an orange accent line, the grid layout reads as "museum-style" (not a dense tight grid), and the headline "Featured Experiences" and body copy are present.

**Acceptance Scenarios**:

1. **Given** the visitor arrives at the `FeaturedExperiences` section, **When** looking at the gallery, **Then** images are displayed in portrait orientation with substantial beige negative space between and around each item.
2. **Given** the visitor hovers over a gallery image, **When** the cursor enters the image bounds, **Then** the location name, a category label, and a thin orange accent line are revealed with a slow fade and/or slide animation.
3. **Given** the orange accent line animates in, **When** observing timing, **Then** the line draws from left to right over a duration of at least 0.6 seconds, giving a deliberate, refined feel.
4. **Given** the visitor moves the cursor away from an image, **When** the cursor exits, **Then** the metadata overlay fades back out and the image returns to its default state smoothly.
5. **Given** the section is visible, **When** reading the headline area, **Then** "Featured Experiences," "Selected locations that define the character of our cities," and the body paragraph are present verbatim.

---

### User Story 5 - Magnetic Call-to-Action Finale (Priority: P3)

At the bottom of the page, the visitor reaches the "Create a Tour With Us" CTA section. A warm orange radial gradient blooms subtly from the center-bottom of the beige canvas, grounding the section with warmth without abandoning the light-theme palette. The provided headline, subhead, and body copy are displayed. The primary action button uses AKSE's orange accent and is wrapped in the existing `MagneticWrapper` component, causing it to physically pull toward the cursor as the visitor approaches — communicating craft and creating a satisfying, tactile micro-interaction before the click.

**Why this priority**: The CTA converts brand-awareness into a qualified action (organizations/property owners reaching out). Without it, the entire page is informational with no business outcome.

**Independent Test**: Can be tested by scrolling to the `CreateTourCTA` section and confirming: the orange radial gradient is subtly visible, all copy is present verbatim, the primary button renders in orange, and hovering near the button causes it to displace toward the cursor (magnetic effect).

**Acceptance Scenarios**:

1. **Given** the visitor scrolls to the `CreateTourCTA` section, **When** the section is in view, **Then** a warm orange radial gradient is visible blending into the beige background — present but not overwhelming (soft, atmospheric).
2. **Given** the section is rendered, **When** reading the content, **Then** "Create a Tour With Us," "Transform your location into a digital destination," and the full body paragraph are visible verbatim.
3. **Given** a pointer device is in use and the cursor approaches the primary CTA button, **When** the cursor enters the magnetic influence zone, **Then** the button physically displaces toward the cursor, snapping back to origin when the cursor exits.
4. **Given** the CTA button is rendered, **When** inspecting its visual, **Then** it uses the platform's orange accent for its primary fill and white text — consistent with all other primary CTAs on the platform.
5. **Given** the page is viewed on a touch device, **When** the magnetic interaction is unavailable, **Then** the button renders correctly in its default centered state with no visual artifacts from the magnetic logic.

---

### Edge Cases

- What happens when the `cobe` globe library fails to initialize (e.g., WebGL not supported)? The globe container should gracefully fall back to a static decorative placeholder that preserves the section's visual weight without a blank or broken area.
- What happens on a mobile viewport where the asymmetric editorial split of `DigitalHeritage` cannot display side-by-side? Both columns should stack vertically with the image appearing first (or below), maintaining legibility at all breakpoints.
- What happens if the film-grain overlay asset fails to load? The beige background must still be visually coherent — the grain is an enhancement, not a structural element.
- What happens when the page is rendered without JavaScript (SSR-only)? All copy, images, and layout must be visible and readable; animations simply do not play.
- What happens when the `ImmersiveExploration` portal interior image fails to load? The portal frame must remain visible with a beige/placeholder fill to preserve the scroll-scale effect logic.
- What happens when a user has `prefers-reduced-motion` set? All GSAP-driven scroll and entrance animations must either be disabled or reduced to instant/opacity-only transitions; the portal scale-up must not play.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The page (`pages/index.vue`) MUST be rebuilt as a clean single-file orchestrator that imports five new section components: `HeroCultural`, `DigitalHeritage`, `ImmersiveExploration`, `FeaturedExperiences`, and `CreateTourCTA`.
- **FR-002**: The global page aesthetic MUST include an ultra-subtle static noise/film-grain overlay at approximately 3% opacity using `mix-blend-mode: multiply` or `overlay`, applied over the beige background without disrupting text legibility or interactive elements.
- **FR-003**: The page MUST implement a GSAP-driven custom cursor — a circular disc branded to the AKSE identity — that replaces the native cursor on pointer devices and follows mouse movement with inertia. It MUST be hidden on touch/mobile.
- **FR-004**: A circulating AKSE logo element MUST persist in a fixed corner of the viewport across all sections of the home page.
- **FR-005**: All typography across the page MUST follow an editorial magazine approach: light font weights for body and supporting text, tight letter-spacing on mass display/headline text, relaxed line-heights for body copy, and dark grey/ink tones (not pure black) for text colors.
- **FR-006**: `HeroCultural.vue` MUST render a full-viewport (100vh) layout with the exact provided headline, subhead, and body copy, including a GSAP fade-up entrance animation of at least 1.5 seconds per staggered element.
- **FR-007**: `HeroCultural.vue` MUST integrate an `InteractiveGlobe.vue` component using the `cobe` library, styled with a matte beige/sand finish and glowing orange markers for Rawalpindi, Hasanabdal, Lahore, and Gilgit. The globe MUST auto-rotate and respond to drag interactions.
- **FR-008**: `DigitalHeritage.vue` MUST render the exact provided copy in an asymmetric editorial split layout with a parallax-scrolling architectural image on one side.
- **FR-009**: `ImmersiveExploration.vue` MUST implement a centrally framed "digital portal" element that scales upward from a modest starting size to near-full-width as the user scrolls through its section, driven by GSAP ScrollTrigger.
- **FR-010**: `FeaturedExperiences.vue` MUST render a portrait-orientation museum-style gallery with ample beige negative space. Hovering over an image MUST reveal location metadata including a thin orange accent line that animates from left to right.
- **FR-011**: `CreateTourCTA.vue` MUST render the provided copy with a warm orange radial gradient atmospheric background and wrap the primary CTA button in the existing `MagneticWrapper` component.
- **FR-012**: The entire page MUST use only the light theme color palette (beige backgrounds, orange accents, dark grey text). Zero `dark:` Tailwind utility classes are permitted anywhere in the page or its section components.
- **FR-013**: All GSAP animations MUST respect `prefers-reduced-motion` — either skipping entirely or reducing to opacity-only transitions with no transforms or scroll-driven effects.
- **FR-014**: The `cobe` globe MUST provide a graceful visual fallback if WebGL is unavailable.

### Constitution Alignment Requirements _(mandatory)_

- **CAR-001 (Stack)**: Implementation MUST use Nuxt 4 + Vue 3 Composition API with `script setup` for all new page and component files.
- **CAR-002 (Package Manager)**: All install/run instructions MUST use pnpm only.
- **CAR-003 (UI System)**: Structural layout and spacing MUST use Tailwind CSS utilities; decorative styling (grain texture, gradient atmospheres) may use scoped `<style>` blocks where Tailwind cannot express the intent.
- **CAR-004 (Motion)**: All animations MUST use GSAP registered through the existing `plugins/gsap.client.ts` plugin. Scroll animations MUST use GSAP ScrollTrigger. All GSAP contexts and ScrollTrigger instances MUST be killed in `onUnmounted`. Lenis smooth-scroll MUST use the single existing instance from `plugins/lenis.client.ts`.
- **CAR-005 (Data + SEO)**: The `pages/index.vue` page MUST include `useSeoMeta` in its `<script setup>` with appropriate `title`, `description`, and Open Graph values for the heritage home page.
- **CAR-006 (Rewrite Cleanup)**: The existing `components/Home/HeroCinematic.vue`, `components/Home/MassiveCTA.vue`, `components/Home/Aurora.vue`, and `components/Home/ProcessPinned.vue` components used by the previous `pages/index.vue` MUST be identified as candidates for removal or archival if they are no longer referenced after this rewrite. The old `pages/index.vue` home-section composition MUST be replaced entirely.

### Key Entities

- **Section Component**: Each of the five section Vue files (`HeroCultural`, `DigitalHeritage`, `ImmersiveExploration`, `FeaturedExperiences`, `CreateTourCTA`) is a self-contained presentational component with its own GSAP context and no shared mutable state between sections.
- **Globe Marker**: A data record describing a place to highlight on the interactive globe — attributes: `name` (display label), `location` (lat/long coordinates), `accent` (orange glow color). Initially four markers: Rawalpindi, Hasanabdal, Lahore, Gilgit.
- **Experience Card**: A presentational data item for the `FeaturedExperiences` gallery — attributes: `title` (location name), `category` (tag label), `image` (asset path), `slug` (optional link to tour page).
- **Grain Overlay**: A fixed-position decorative layer element applied once at the page level — not repeated per-section.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify AKSE's core value proposition ("digital virtual tours of heritage/cultural locations") within 10 seconds of landing on the page, based on the hero copy and globe visual alone.
- **SC-002**: All five section components render correctly at viewport widths from 375px (mobile) through 1920px (large desktop) without content overflow, broken layouts, or invisible text.
- **SC-003**: The page achieves a Lighthouse Performance score of 80 or above in a production build, with Largest Contentful Paint (LCP) under 3 seconds on a simulated mid-tier mobile connection.
- **SC-004**: The portal scroll-scale animation in `ImmersiveExploration` plays smoothly at 60fps on a modern mid-range laptop — no visible jank or frame drops during the scroll sequence.
- **SC-005**: Zero `dark:` Tailwind utility classes appear anywhere in `pages/index.vue` or the five new section components, confirmed by a grep/audit pass.
- **SC-006**: All five verbatim copy blocks (hero, heritage platform, exploration, gallery, CTA) are present in the rendered HTML and visible to a user with JavaScript disabled (SSR correctness).
- **SC-007**: The magnetic CTA button returns to its origin position within 0.5 seconds of the cursor leaving its influence zone, with no visual stutter.
- **SC-008**: On a device with `prefers-reduced-motion: reduce`, the page loads without any animating elements — all content is immediately visible in its final state.

### Rewrite Quality Outcomes _(mandatory for rewrite features)_

- **RQ-001**: No npm/yarn/bun commands remain in any feature documentation or scripts related to this feature.
- **RQ-002**: No duplicate smooth-scroll runtime providers exist after implementation — the single Lenis instance from `plugins/lenis.client.ts` is the only scroll controller.
- **RQ-003**: The `pages/index.vue` page has SSR-rendered HTML for all copy, image alt text, and semantic heading structure, confirmed by viewing page source without JavaScript.

## Assumptions

- The `InteractiveGlobe.vue` component using `cobe` will be created as part of this feature (it does not currently exist). Its creation is in scope.
- The film-grain overlay will be implemented as a fixed-position CSS pseudo-element or a thin SVG filter applied to the page wrapper — the exact technique is left to the implementer so long as the visual result matches the ~3% opacity specification.
- The architectural detail image used in `DigitalHeritage.vue` and the gallery images for `FeaturedExperiences.vue` are assumed to exist in `public/images/` based on the existing project structure. If specific assets are not yet available, visually appropriate placeholder images from the same directory will be used.
- The `MagneticWrapper.vue` component already exists in `components/MagneticWrapper.vue` and is available for use in `CreateTourCTA.vue` without modification.
- "Circulating AKSE logo" refers to a CSS or GSAP-driven rotation animation applied to the logo mark — a slow, continuous orbit or spin that adds kinetic energy to the corner element.
- The globe will display a static decoration/placeholder container (no globe, no error) on browsers without WebGL support, sized to match the globe's intended layout footprint.
