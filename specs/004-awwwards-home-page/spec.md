# Feature Specification: Awwwards-Level Home Page

**Feature Branch**: `004-awwwards-home-page`  
**Created**: 2026-03-06  
**Status**: Draft  
**Input**: User description: "Awwwards-Level Home Page (pages/index.vue) — Build the primary landing page for the AKSE platform with Awwwards-winning interaction design, dual-theme architecture, GSAP/ScrollTrigger choreography, custom cursor, magnetic buttons, interactive globe, parallax tours, pinned scroll sections, and massive CTA."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Cinematic Hero First Impression (Priority: P1)

A first-time visitor lands on the AKSE home page and is immediately immersed in a full-viewport cinematic hero. The headline "Heritage Redefined" reveals character-by-character with fluid animation. An interactive 3D globe with glowing markers for AKSE locations (Rawalpindi, Hasanabdal, Lahore, Gilgit) slowly auto-rotates and responds to drag. The visitor perceives a premium, design-award-calibre first impression within the first 3 seconds.

**Why this priority**: The hero section is the single most important moment — it determines whether visitors stay or leave. A cinematic, polished first impression is the foundation of the "Awwwards-level" goal.

**Independent Test**: Can be fully tested by loading the home page and confirming the headline animates in, the globe renders with visible markers, auto-rotates, and responds to drag interaction.

**Acceptance Scenarios**:

1. **Given** a visitor loads the home page, **When** the hero section mounts, **Then** the headline text reveals character-by-character from a hidden overflow container with fluid animation.
2. **Given** the hero section is visible, **When** the globe finishes initializing, **Then** four glowing accent-colored markers are visible for Rawalpindi, Hasanabdal, Lahore, and Gilgit.
3. **Given** the globe is rendering, **When** no user interaction occurs, **Then** the globe auto-rotates smoothly at a slow pace.
4. **Given** the globe is rendering, **When** the visitor drags on the globe, **Then** rotation follows the drag direction and resumes auto-rotation after release.
5. **Given** the visitor is using dark mode, **When** the hero renders, **Then** accent markers use the rust color (`--rust`) and the background is the deep cinematic palette. In light mode, markers use the orange accent and background uses the beige/warm palette.

---

### User Story 2 - Scroll-Driven Content Discovery (Priority: P1)

A visitor scrolls past the hero and encounters a flowing sequence of content sections — featured heritage tours with parallax imagery, a pinned horizontal-scroll process section, and a massive call-to-action — all choreographed with scroll-linked animations that maintain 60fps.

**Why this priority**: Scroll-driven storytelling is the core differentiator that elevates the page beyond a standard landing page. Without it, the page cannot achieve the Awwwards-level standard.

**Independent Test**: Can be tested by scrolling through the entire page and verifying that each section triggers its scroll-linked animation (parallax, pinning, scrubbing) smoothly without jank.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls past the hero, **When** the Featured Tours section enters the viewport, **Then** tour card images animate with a parallax offset (images move at a different speed than the page scroll).
2. **Given** the visitor reaches the Process section, **When** scrolling continues, **Then** the left-side title text pins in place while the right-side content scrolls horizontally through process steps (Capture, Craft, Publish).
3. **Given** the visitor reaches the Massive CTA section, **When** the section enters the viewport, **Then** the preceding content slightly scales down, creating a dramatic reveal of the full-width CTA.
4. **Given** a visitor scrolls the entire page on a mid-range device, **When** all animations are active, **Then** the scroll experience maintains visually smooth performance without noticeable frame drops.

---

### User Story 3 - Interactive Polish — Custom Cursor & Magnetic Buttons (Priority: P2)

A visitor on a pointer device experiences a custom animated cursor that replaces the default browser cursor. The cursor subtly trails the mouse, expands with contextual labels when hovering actionable elements, and buttons exhibit a magnetic pull effect on hover.

**Why this priority**: Custom cursor and magnetic interactions are the micro-interaction layer that elevates perceived quality from "good website" to "award-winning experience." They depend on the core layout and scroll animations being in place first.

**Independent Test**: Can be tested by moving the mouse across the page and verifying cursor behavior changes on hover over links, tour cards, and the globe. Magnetic effect tested by hovering the CTA button and observing the pull/spring-release.

**Acceptance Scenarios**:

1. **Given** a visitor is using a pointer device (mouse/trackpad), **When** the page loads, **Then** the default browser cursor is hidden and replaced by a custom animated dot that smoothly follows the mouse position.
2. **Given** the custom cursor is active, **When** the visitor hovers over a link or tour card, **Then** the cursor dot expands and displays contextual text (e.g., "Explore").
3. **Given** the custom cursor is active, **When** the visitor hovers over the interactive globe, **Then** the cursor expands and displays "Drag".
4. **Given** the Massive CTA "Book a Tour" button is visible, **When** the visitor hovers near the button, **Then** the button visually pulls toward the cursor position with a magnetic attraction effect.
5. **Given** the visitor moves the cursor away from a magnetic button, **When** the cursor leaves the button's proximity, **Then** the button springs back to its original position with a physics-based easing.

---

### User Story 4 - Featured Heritage Tours Exploration (Priority: P2)

A visitor sees featured heritage tours presented in an asymmetric, staggered card layout that breaks the grid convention. Each card has a parallax image, and hovering reveals metadata with an accent-color sweep.

**Why this priority**: The tours section directly showcases AKSE's core offering — it bridges the immersive page experience with the product catalog.

**Independent Test**: Can be tested by scrolling to the tours section, verifying the staggered layout, checking parallax on scroll, and hovering individual cards to observe the image scale and accent sweep.

**Acceptance Scenarios**:

1. **Given** the tours section is visible, **When** rendering completes, **Then** tour cards appear in an asymmetric, staggered layout with varied vertical offsets and overlapping edges — not a uniform grid.
2. **Given** the visitor scrolls through the tours section, **When** the scroll position changes, **Then** images inside the tour cards move at a parallax offset relative to the page scroll.
3. **Given** a visitor hovers over a tour card, **When** the cursor enters the card boundary, **Then** the image scales up slightly within its clipped container and the accent color sweeps across the card metadata area.
4. **Given** the visitor is in dark mode, **When** hovering a tour card, **Then** the sweep color is rust. In light mode, the sweep color is orange.

---

### User Story 5 - Dual-Theme Visual Consistency (Priority: P2)

A visitor toggles between light and dark themes and every section of the home page — hero, tours, process, CTA, cursor, and button states — updates consistently using the global CSS variable system without any mixed-palette artifacts.

**Why this priority**: The dual-theme system is an established architectural requirement. The home page must fully participate in it to maintain brand integrity.

**Independent Test**: Can be tested by switching themes and visually reviewing each section for correct background, text, accent, and surface color application in both modes.

**Acceptance Scenarios**:

1. **Given** the visitor switches to dark mode, **When** the home page renders, **Then** all backgrounds use the cinematic dark palette (`--bg`), text uses warm off-white (`--text`), and accents use rust (`--rust`).
2. **Given** the visitor switches to light mode, **When** the home page renders, **Then** all backgrounds use the beige/warm palette, text uses dark foreground tokens, and accents use the orange variant.
3. **Given** any animated element (cursor, magnetic button, parallax card), **When** the theme changes, **Then** the element's colors update via CSS variables without requiring re-initialization of the animation.

---

### User Story 6 - Touch and Non-Pointer Graceful Fallback (Priority: P3)

A visitor on a touch device (phone or tablet) experiences the full content and scroll animations without the custom cursor or magnetic interactions, which are pointer-only enhancements.

**Why this priority**: Mobile traffic is essential for reach. The page must deliver a complete, polished experience on touch devices even without pointer-dependent features.

**Independent Test**: Can be tested by loading the page on a touch device or with touch emulation and verifying all content is visible, scroll animations function, and no custom cursor or magnetic behavior appears.

**Acceptance Scenarios**:

1. **Given** a visitor is on a touch device, **When** the page loads, **Then** the custom cursor component does not render and the default browser touch behavior is preserved.
2. **Given** a touch device visitor scrolls the page, **When** passing through the tours and process sections, **Then** scroll-triggered parallax and pinning animations function correctly.
3. **Given** the globe is displayed on a touch device, **When** the visitor touches and drags, **Then** the globe responds to touch drag for rotation.

---

### Edge Cases

- What happens when the globe WebGL context fails to initialize (e.g., unsupported GPU or browser)? The hero section displays all other content (headline, subtitle, CTAs) normally with the globe area showing a graceful empty state or static fallback.
- What happens when GSAP ScrollTrigger calculations fire before images load? ScrollTrigger recalculates after content settles to prevent incorrect pin positions.
- What happens on very wide (ultrawide) or very narrow (320px) viewports? Layout remains coherent — the staggered tour grid and pinned sections adapt to available width without horizontal overflow or broken overlap.
- What happens when the visitor uses reduced-motion preferences? All GSAP animations respect `prefers-reduced-motion: reduce` by disabling scrub, parallax offsets, and character reveals, falling back to immediate content display.
- What happens when the page is rendered server-side? All content and SEO metadata are present in the SSR HTML. Animations and interactive behaviors activate only after client hydration.
- What happens during rapid theme switching while animations are running? Animations continue uninterrupted with colors updating through CSS variables — no JavaScript re-initialization needed.

## Requirements _(mandatory)_

### Functional Requirements

#### Page Composition

- **FR-001**: The home page (`pages/index.vue`) MUST compose five distinct section components in order: HeroCinematic, FeaturedTours, ProcessPinned, MassiveCTA, and the global SiteFooter (from layout).
- **FR-002**: The home page MUST set SEO metadata (title, description, OG tags) for search engine discoverability.
- **FR-003**: All section content MUST use mock/static data defined within the components (no CMS integration required for this feature).

#### Hero Section (HeroCinematic)

- **FR-010**: The hero section MUST occupy the full viewport height (100vh) with a split-screen or overlay layout.
- **FR-011**: The primary headline "Heritage Redefined" MUST animate in using a character-by-character reveal from a hidden overflow container on mount.
- **FR-012**: The hero MUST display supporting subtitle text and at least two call-to-action links ("Explore Tours" linking to `/tours`, "Start a Project" linking to `/contact`).
- **FR-013**: The hero MUST contain a prominently displayed interactive 3D globe showing the Earth with glowing accent-colored markers at four locations: Rawalpindi, Hasanabdal, Lahore, and Gilgit.
- **FR-014**: The globe MUST auto-rotate slowly when no user interaction is occurring.
- **FR-015**: The globe MUST accept drag interactions to manually rotate its view.
- **FR-016**: The globe's marker color MUST use the current theme's accent color (rust in dark mode, orange in light mode) via CSS variables or runtime theme detection.

#### Featured Heritage Tours (FeaturedTours)

- **FR-020**: The tours section MUST present tour cards in an asymmetric, staggered layout with varied vertical offsets — not a uniform grid.
- **FR-021**: Tour card images MUST exhibit a parallax scroll effect where images move at a different speed than the page scroll (vertical offset range approximately -15% to +15%).
- **FR-022**: On hover (pointer devices only), tour card images MUST scale up slightly within their clipped/masked container boundaries.
- **FR-023**: On hover (pointer devices only), the theme's accent color MUST sweep across the card's metadata area.
- **FR-024**: Each tour card MUST display an image, title, location label, and brief description using mock data.
- **FR-025**: The tours section MUST display at minimum four tour cards with representative mock imagery.

#### Process / Immersive Highlights (ProcessPinned)

- **FR-030**: The process section MUST implement a scroll-pinned layout where the left-side heading ("Our Process") pins in place while the right side scrolls horizontally.
- **FR-031**: The horizontal scroll MUST reveal three process steps: Capture, Craft, and Publish.
- **FR-032**: The horizontal scroll MUST be driven by vertical scrolling (scrub-linked) so the visitor scrolls down to move content sideways.
- **FR-033**: Each process step MUST display a step number, title, and descriptive text.

#### Massive CTA (MassiveCTA)

- **FR-040**: The CTA section MUST span the full viewport width with a visually dominant presence.
- **FR-041**: The section background MUST display a dynamic, subtle gradient using the current theme's accent color.
- **FR-042**: The section MUST display large, screen-scale typography: "Want us to shoot a tour for you?"
- **FR-043**: A primary "Book a Tour" action button MUST be present and link to `/contact`.
- **FR-044**: The "Book a Tour" button MUST be wrapped in a magnetic interaction wrapper (MagneticWrapper).
- **FR-045**: As the CTA section enters the viewport during scroll, the preceding sections MUST exhibit a slight scale-down effect to create a dramatic reveal.

#### Custom Cursor (CustomCursor)

- **FR-050**: A custom animated cursor MUST replace the default browser cursor on pointer devices.
- **FR-051**: The cursor MUST appear as a subtle dot that smoothly trails the actual mouse position with animation-driven interpolation.
- **FR-052**: When hovering over actionable items (links, buttons, tour cards), the cursor MUST expand and display contextual text (e.g., "Explore").
- **FR-053**: When hovering over the interactive globe, the cursor MUST expand and display "Drag".
- **FR-054**: The custom cursor MUST NOT render on touch-only devices.
- **FR-055**: The cursor's visual styling (color, blend mode) MUST adapt to the active theme.

#### Magnetic Wrapper (MagneticWrapper)

- **FR-060**: The magnetic wrapper MUST track the mouse position relative to the wrapped element and apply a translation that pulls the element toward the cursor on hover.
- **FR-061**: On mouse leave, the element MUST animate back to its origin with a spring/physics-based easing curve.
- **FR-062**: The magnetic effect MUST only activate on pointer devices.

#### Theming & Visual Design

- **FR-070**: All section backgrounds, text colors, accent colors, surface colors, and border colors MUST be driven by the global CSS variable theme system established in `001-global-theme-system`.
- **FR-071**: In dark mode, the palette MUST use: background `#0e1516`, text `#F3EDE7`, primary accent rust `#C9653D`, secondary accent teal `#2C7A83`.
- **FR-072**: In light mode, the palette MUST use: warm beige/neutral backgrounds, dark foreground text, and orange primary accent, as defined by the global theme tokens.
- **FR-073**: Theme transitions for all home page elements MUST occur through CSS variable changes — no JavaScript-driven color swaps on individual elements.

#### Animation & Performance

- **FR-080**: All scroll-driven animations MUST use GSAP ScrollTrigger with lifecycle-safe setup and cleanup.
- **FR-081**: All animations MUST respect `prefers-reduced-motion: reduce` by disabling motion-intensive effects and falling back to immediate content display.
- **FR-082**: The page MUST deliver a visually smooth scrolling experience on mid-range devices.
- **FR-083**: The interactive globe MUST initialize only on the client side (no SSR for WebGL).

#### Accessibility

- **FR-090**: All text content, navigation links, and CTAs MUST be present in the SSR-rendered HTML for screen reader and crawler access.
- **FR-091**: Interactive elements (CTA buttons, tour cards) MUST be keyboard-focusable and activatable.
- **FR-092**: The globe area MUST have an accessible label describing its purpose.
- **FR-093**: Decorative animations (custom cursor, parallax, magnetic pull) MUST NOT block or interfere with keyboard navigation.

### Assumptions

- The global dual-theme system (`001-global-theme-system`) is implemented and provides CSS variable tokens in both light and dark modes.
- The core layout foundation (`001-core-layout-foundation`) with SiteNav, SiteFooter, ScrollProgress, and PageVeil is in place.
- The GSAP plugin (`gsap.client.ts`) and Lenis smooth scroll plugin (`lenis.client.ts`) are available and registered.
- Mock/static data is used for all content — no CMS integration is required for this feature.
- The `cobe` package (lightweight WebGL globe) will be added as a dependency.
- Existing unused legacy components (`HeroCinematic.vue`, `HomeSections.vue`, `StoryPinned.vue`, `Magnetic.vue` at root component level) are superseded by the new `components/Home/` and global-level components created in this feature.

### Constitution Alignment Requirements _(mandatory)_

- **CAR-001 (Stack)**: Implementation MUST use Nuxt 4 + Vue 3 Composition API with `script setup` for authored pages/components.
- **CAR-002 (Package Manager)**: All install/run instructions MUST use pnpm only.
- **CAR-003 (UI System)**: Structural UI styling MUST use Tailwind utilities and shadcn-vue component patterns.
- **CAR-004 (Motion)**: Animations MUST use GSAP + single modern `lenis` instance, with lifecycle-safe cleanup.
- **CAR-005 (Data + SEO)**: Indexable content MUST use SSR-first data fetching and SEO metadata via `useSeoMeta` in `script setup`.
- **CAR-006 (Rewrite Cleanup)**: Spec MUST identify legacy artifacts to remove or refactor (unused components, duplicate plugins, broken routes/styles).
- **CAR-007 (Dual Theme)**: All visual tokens MUST derive from the dual-theme CSS variable system — no hardcoded hex values for themed properties.

### Legacy Artifacts to Address

- **Root `components/HeroCinematic.vue`**: Superseded by `components/Home/HeroCinematic.vue`. Mark for removal after migration.
- **Root `components/HomeSections.vue`**: Superseded by the new sectional components (FeaturedTours, ProcessPinned, MassiveCTA). Mark for removal.
- **Root `components/StoryPinned.vue`**: Superseded by `components/Home/ProcessPinned.vue`. Mark for removal.
- **Root `components/Magnetic.vue`**: Superseded by `components/MagneticWrapper.vue`. Mark for removal after migration.
- **`plugins/smooth.client.ts`**: Legacy duplicate Lenis instance. Must not be used. Should be removed in a cleanup pass.
- **`pages/index.vue`**: Current placeholder content is entirely replaced by this feature's implementation.

### Key Entities

- **Tour Card**: Represents a heritage tour preview displayed in the Featured Tours section. Attributes: title, location, description, image, category.
- **Process Step**: Represents one phase in the AKSE workflow displayed in the pinned section. Attributes: step number, title, description.
- **Globe Marker**: Represents a geographic location displayed on the interactive globe. Attributes: name, latitude, longitude, accent color.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A first-time visitor sees the fully animated hero (headline reveal + globe rendering) within 3 seconds of page load on a standard broadband connection.
- **SC-002**: The page scroll experience maintains visually smooth animation (targeting 60fps) through all scroll-triggered sections on a mid-range laptop (e.g., M1 MacBook Air equivalent).
- **SC-003**: 100% of page sections (hero, tours, process, CTA) render with correct theme colors in both light and dark modes without any mixed-palette artifacts.
- **SC-004**: All textual content and CTAs are present in the server-rendered HTML, enabling full crawlability by search engines before client hydration.
- **SC-005**: On touch devices, all content is visible and scroll animations function, with pointer-only enhancements (custom cursor, magnetic effect) gracefully absent.
- **SC-006**: Interactive globe responds to drag within 100ms of touch/click initiation and resumes auto-rotation within 2 seconds of interaction ending.
- **SC-007**: The custom cursor tracks mouse movement with no perceptible lag on pointer devices.
- **SC-008**: Visitors with `prefers-reduced-motion: reduce` see all content immediately without scrub, parallax, or character reveal animations.

### Rewrite Quality Outcomes _(mandatory for rewrite features)_

- **RQ-001**: No npm/yarn/bun commands remain in feature docs or scripts touched by the feature.
- **RQ-002**: No duplicate smooth-scroll runtime providers exist after implementation.
- **RQ-003**: SSR rendering is present for the home page with all indexable content available in the initial HTML response.
- **RQ-004**: No hardcoded hex color values appear for themed properties — all themed colors reference CSS variables.
