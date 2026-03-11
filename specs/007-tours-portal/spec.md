# Feature Specification: Interactive Tours Portal

**Feature Branch**: `007-tours-portal`  
**Created**: 2026-03-11  
**Status**: Draft  
**Input**: User description: "Interactive Tours Portal (pages/tours/index.vue) — Build the main Tours discovery page for the AKSE platform with an immersive featured tour hero, sticky discovery filter bar, in-production grid with locked upcoming tours, and a commercial teaser bridging Tours to Commercial services. Follows dual-theme architecture (Light: Beige/Orange, Dark: Deep #0e1516/Rust) with GSAP premium animations."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Immersive Featured Tour Hero (Priority: P1)

A visitor navigates to the Tours page and is immediately immersed in a massive, full-viewport cinematic showcase dedicated entirely to the flagship "Golra Sharif Railway Heritage" tour. A high-quality background image (or looping video) of the Victorian railway station fills the screen, covered by a dynamic gradient overlay that adapts to the current theme. A glowing "Featured Experience" kicker tag, the massive headline "Golra Sharif Railway Museum," and a glassmorphism metadata bar ("1881 • Victorian Architecture • 360° Capture") communicate prestige. The primary "Enter Virtual Tour" CTA invites interaction with a magnetic pull effect, and hovering the button causes the background image to scale up slightly, teasing the 3D experience within.

**Why this priority**: The featured hero is the single most critical section — it must make the one active tour feel like an exclusive, high-end digital premiere, establishing that AKSE's work is museum-grade before the visitor scrolls further.

**Independent Test**: Can be fully tested by navigating to `/tours` and confirming the hero fills 100vh, displays the background visual with themed gradient overlay, shows the kicker/headline/metadata bar, and exhibits hover-scale on the CTA button.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/tours`, **When** the page loads, **Then** a full-viewport (100vh) hero section is displayed with a high-quality background image of the Golra Sharif Railway Station.
2. **Given** the hero is visible, **When** looking at the overlay, **Then** a dynamic gradient overlay is applied that uses the current theme's color palette (dark palette gradients in dark mode, warm palette gradients in light mode).
3. **Given** the hero content is rendered, **When** the visitor reads the content, **Then** a glowing "Featured Experience" kicker tag, the headline "Golra Sharif Railway Museum," and a glassmorphism metadata bar with "1881 • Victorian Architecture • 360° Capture" are all visible.
4. **Given** a visitor hovers the "Enter Virtual Tour" button on a pointer device, **When** the cursor enters the button's proximity, **Then** the button exhibits a magnetic pull effect and the background image scales up to approximately 1.05× with a smooth animation.
5. **Given** the visitor moves the cursor away from the CTA, **When** the cursor exits the button proximity, **Then** the button springs back to origin and the background image scales back to 1.0× smoothly.
6. **Given** the visitor is in dark mode, **When** the hero renders, **Then** gradients use the `#0e1516` base and rust accent. In light mode, gradients use the beige base and orange accent.

---

### User Story 2 - Discovery Filter Bar (Priority: P2)

As the visitor scrolls past the featured hero, a horizontally scrollable filter bar transitions to a sticky position at the top of the viewport. The filter presents category chips — "All," "Heritage Sites," "Museums," "Commercial," "In Production" — that allow the visitor to browse tour categories. The active chip uses the platform's accent color and pill-shaped styling.

**Why this priority**: The filter bar provides navigational structure and prepares the page for future scale as more tours are added. It signals to the visitor that the platform has organized categories, building confidence in the breadth of offerings.

**Independent Test**: Can be tested by scrolling past the hero and confirming the filter bar sticks to the top, the chips are visible and horizontally scrollable, and tapping/clicking a chip visually activates it with the theme's accent color.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls past the featured hero section, **When** the filter bar reaches the top of the viewport, **Then** it becomes sticky and remains fixed at the top during further scrolling.
2. **Given** the filter bar is visible, **When** rendered, **Then** it displays five pill-shaped category chips: "All," "Heritage Sites," "Museums," "Commercial," "In Production."
3. **Given** the filter bar is displayed, **When** the "All" category is active by default, **Then** the "All" chip uses the primary accent color (orange in light mode, rust in dark mode) as its active indicator.
4. **Given** the visitor clicks a different category chip, **When** the click registers, **Then** the selected chip transitions to the active accent-colored state and the previously active chip returns to its inactive state.
5. **Given** the filter bar is on a narrow viewport, **When** all chips cannot fit in the visible area, **Then** the bar is horizontally scrollable with no visible scrollbar (overflow hidden, touch-scrollable).
6. **Given** a category is selected, **When** filtering is applied, **Then** the grid below updates to show only tours matching that category (for the current implementation, this filters the mock data set).

---

### User Story 3 - "In Production" Upcoming Tours Grid (Priority: P1)

Below the filter bar, the visitor encounters a grid of upcoming tour cards — Lahore Fort, Mohenjo-Daro, Faisal Mosque, and other mock entries. These cards are rendered with a heavy blur or grayscale filter to communicate they are not yet available. Each card bears an animated "In Production" or "Scanning…" badge. As the visitor scrolls, the cards stagger in from the bottom using scroll-triggered animations. The cards are not clickable, and on pointer devices the cursor changes to a lock/soon indicator when hovering them.

**Why this priority**: This section is critical to solving the "empty catalog" problem. By showing stylized upcoming tours, the page communicates platform scale and ambition, making the single active tour feel like the first of many rather than the only one.

**Independent Test**: Can be tested by scrolling to the grid section and confirming cards appear with blur/grayscale treatment, the "In Production" badges are visible and animated, cards stagger in on scroll, and hovering shows a lock/soon cursor state.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls to the grid section, **When** it enters the viewport, **Then** tour cards animate in with a staggered fade-up effect (each card delays slightly after the previous).
2. **Given** the upcoming tour cards are rendered, **When** looking at the cards, **Then** each card's imagery is displayed with a heavy blur or grayscale filter to indicate unavailability.
3. **Given** an upcoming tour card is visible, **When** rendered, **Then** it displays an animated badge reading "In Production" or "Scanning…" that pulses or has a subtle motion effect.
4. **Given** a visitor clicks on an upcoming tour card, **When** the click event fires, **Then** nothing happens — the card is non-interactive and does not navigate anywhere.
5. **Given** a visitor on a pointer device hovers an upcoming tour card, **When** the cursor enters the card, **Then** the cursor icon changes to a lock or "soon" indicator (custom cursor state or CSS cursor change).
6. **Given** the grid is rendered with mock data, **When** displayed, **Then** at minimum three upcoming tour cards are shown with distinct titles, locations, and placeholder images (e.g., Lahore Fort, Mohenjo-Daro, Faisal Mosque).

---

### User Story 4 - Commercial Teaser Section (Priority: P2)

At the bottom of the Tours page, the visitor reaches a clean, minimalist banner that bridges the Tours experience to AKSE's commercial services. The headline reads "Want your space preserved like this?" with a "View Commercial Packages" button linking to `/commercial`. The section provides a natural endpoint that converts tour-impressed visitors into potential commercial clients.

**Why this priority**: The commercial teaser is the conversion bridge of the page. A visitor impressed by the tours needs a clear path to explore AKSE's commercial offering. It depends on the core page content being in place first.

**Independent Test**: Can be tested by scrolling to the bottom of the Tours page and verifying the teaser banner renders with the correct headline, the button is present and links to `/commercial`, and the styling adapts to both themes.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls to the bottom of the Tours page, **When** the commercial teaser section enters the viewport, **Then** the headline "Want your space preserved like this?" is displayed prominently.
2. **Given** the commercial teaser is visible, **When** rendered, **Then** a "View Commercial Packages" button is present and styled with the primary accent color.
3. **Given** a visitor clicks "View Commercial Packages," **When** the click registers, **Then** the visitor is navigated to `/commercial`.
4. **Given** the teaser is in dark mode, **When** it renders, **Then** backgrounds, text, and accent colors match the dark theme palette. In light mode, colors match the light theme palette.
5. **Given** the teaser section renders, **When** viewed at any screen width, **Then** the layout remains clean and readable with appropriate spacing.

---

### User Story 5 - Dual-Theme Visual Consistency (Priority: P2)

A visitor toggles between light and dark themes and every section of the Tours page — hero, filter bar, tour grid, and commercial teaser — updates consistently using the global CSS variable system without any mixed-palette artifacts or broken overlays.

**Why this priority**: The dual-theme system is an established architectural requirement. All new pages must fully participate to maintain brand integrity across the platform.

**Independent Test**: Can be tested by switching themes while on the Tours page and visually reviewing each section for correct background, text, accent, and surface color application in both modes.

**Acceptance Scenarios**:

1. **Given** the visitor switches to dark mode, **When** the Tours page renders, **Then** all section backgrounds use the deep cinematic palette (`--bg: #0e1516`), text uses warm off-white (`--text`), and accents use rust (`--rust`).
2. **Given** the visitor switches to light mode, **When** the Tours page renders, **Then** all section backgrounds use the beige/warm palette, text uses dark foreground tokens, and accents use the orange variant.
3. **Given** any animated element (hero overlay, filter chips, card badges), **When** the theme changes, **Then** colors update via CSS variables without requiring animation re-initialization.
4. **Given** the glassmorphism metadata bar in the hero, **When** viewed in dark mode, **Then** the glass effect uses a dark-tinted translucent surface. In light mode, it uses a light-tinted translucent surface.

---

### User Story 6 - Touch Device & Reduced Motion Fallback (Priority: P3)

A visitor on a touch device (phone or tablet) experiences the full content and scroll animations without the magnetic button effect or custom cursor states, which are pointer-only enhancements. A visitor with reduced-motion preferences sees all content without scroll-driven animations.

**Why this priority**: Mobile traffic and accessibility are essential. The page must deliver a complete experience on touch devices and respect motion preferences.

**Independent Test**: Can be tested on a touch device or with touch emulation — verifying all content is visible, scroll animations function (or are disabled for reduced motion), and no pointer-only features appear.

**Acceptance Scenarios**:

1. **Given** a visitor is on a touch device, **When** the page loads, **Then** the magnetic button effect on the CTA does not activate and the default touch interaction is preserved.
2. **Given** a touch device visitor scrolls through the upcoming grid, **When** cards enter the viewport, **Then** the staggered scroll-triggered fade-in animations still function correctly.
3. **Given** the visitor has `prefers-reduced-motion: reduce` enabled, **When** the page renders, **Then** all GSAP scroll-triggered animations (stagger, hero scale, filter bar transitions) are disabled and content is displayed immediately.
4. **Given** the visitor is on a small mobile screen, **When** the filter bar renders, **Then** the pill chips are horizontally scrollable via touch swipe.

---

### Edge Cases

- What happens when the featured tour's background image or video fails to load? The hero section displays all text content (kicker, headline, metadata bar, CTA) over a themed solid gradient background — no broken image or empty space.
- What happens when GSAP ScrollTrigger calculations fire before card images load? ScrollTrigger recalculates positions after layout settles to prevent stagger timing from being misaligned.
- What happens on very wide (ultrawide) or very narrow (320px) viewports? The card grid, filter bar, and hero layout adapt — cards reflow to single column on mobile, the filter bar remains scrollable, and the hero content stays centered without overflow.
- What happens during rapid theme switching while the hero gradient animation is active? The gradient transitions through CSS variables without JavaScript re-initialization, avoiding flicker.
- What happens when the page is rendered server-side? All content (tour titles, descriptions, badges, CTA text) is present in the SSR HTML for crawlers and screen readers. Animations and interactive behaviors activate only after client hydration.
- What happens when a visitor navigates directly to a filtered category via URL (future consideration)? The filter bar initializes with "All" selected by default; deep linking to categories is out of scope for this feature but the architecture should not prevent it.

## Requirements _(mandatory)_

### Functional Requirements

#### Page Composition

- **FR-001**: The Tours page (`pages/tours/index.vue`) MUST compose four distinct section components in order: FeaturedTour (hero), FilterRail, UpcomingGrid, and CommercialTeaser.
- **FR-002**: The Tours page MUST set SEO metadata (title, description, OG tags) via `useSeoMeta` for search engine discoverability.
- **FR-003**: All section content MUST use mock/static data defined within the components — no CMS integration required for this feature.
- **FR-004**: The page MUST replace the existing placeholder `pages/tours/index.vue` content entirely while preserving its file path.

#### Featured Tour Hero (FeaturedTour)

- **FR-010**: The featured tour hero MUST occupy the full viewport height (100vh).
- **FR-011**: The hero MUST display a high-quality background image (or looping video) of the Golra Sharif Railway Station with `object-fit: cover` behavior.
- **FR-012**: A dynamic gradient overlay MUST be applied over the background that uses the currently active theme's color palette.
- **FR-013**: The hero MUST display a glowing "Featured Experience" kicker tag with a subtle luminous/glow effect using the theme's accent color.
- **FR-014**: The hero MUST display the headline "Golra Sharif Railway Museum" in large-scale typography.
- **FR-015**: The hero MUST display a glassmorphism-styled metadata bar showing "1881 • Victorian Architecture • 360° Capture" with a blurred translucent background.
- **FR-016**: The primary CTA button MUST read "Enter Virtual Tour" and be wrapped in a MagneticWrapper component for the magnetic pull hover effect on pointer devices.
- **FR-017**: On pointer-device hover of the CTA button, the background image MUST scale up to approximately 1.05× with a smooth GSAP-driven animation.
- **FR-018**: On hover exit from the CTA button, the background image MUST scale back to 1.0× with smooth easing.

#### Discovery Filter Bar (FilterRail)

- **FR-020**: The filter bar MUST become sticky at the top of the viewport once the user scrolls past the featured hero section.
- **FR-021**: The filter bar MUST display five pill-shaped category chips: "All," "Heritage Sites," "Museums," "Commercial," "In Production."
- **FR-022**: The active chip MUST be visually distinguished using the primary accent color (orange in light mode, rust in dark mode).
- **FR-023**: The filter bar MUST be horizontally scrollable on narrow viewports without a visible scrollbar.
- **FR-024**: Clicking a chip MUST update the active state and filter the visible cards in the grid below accordingly.
- **FR-025**: The "All" category MUST be selected by default on page load.

#### Upcoming Tours Grid (UpcomingGrid)

- **FR-030**: The grid MUST display at minimum three upcoming tour cards using mock data (Lahore Fort, Mohenjo-Daro, Faisal Mosque).
- **FR-031**: Each card MUST display a tour title, location, placeholder image, and an animated "In Production" or "Scanning…" badge.
- **FR-032**: Card imagery MUST be rendered with a heavy blur or grayscale filter to communicate unavailability.
- **FR-033**: Cards MUST animate into view with a staggered fade-up effect triggered by GSAP ScrollTrigger as they enter the viewport.
- **FR-034**: Cards MUST NOT be clickable — click events must not navigate the user anywhere.
- **FR-035**: On pointer devices, hovering an upcoming tour card MUST change the cursor to a lock or "soon" indicator.
- **FR-036**: The active featured tour (Golra Sharif) MUST also appear in the grid as a fully visible (non-blurred) card with a distinct "Live" or "Active" badge when the "All" or matching category filter is selected.

#### Commercial Teaser (CommercialTeaser)

- **FR-040**: The commercial teaser MUST be a clean, minimalist banner section at the bottom of the page.
- **FR-041**: The teaser MUST display the headline "Want your space preserved like this?" in prominent typography.
- **FR-042**: The teaser MUST display a "View Commercial Packages" button that links to `/commercial`.
- **FR-043**: The button MUST be styled with the primary accent color appropriate to the current theme.

#### Theming & Visual Design

- **FR-050**: All section backgrounds, text colors, accent colors, surface colors, and border colors MUST be driven by the global CSS variable theme system.
- **FR-051**: In dark mode, the palette MUST use: background `#0e1516`, text `#F3EDE7`, primary accent rust `#C9653D`, secondary accent teal `#2C7A83`.
- **FR-052**: In light mode, the palette MUST use: warm beige/neutral backgrounds, dark foreground text, and orange primary accent, as defined by the global theme tokens.
- **FR-053**: The glassmorphism metadata bar MUST use backdrop-filter blur with a translucent surface color that adapts to the active theme.

#### Animation & Performance

- **FR-060**: All scroll-driven animations MUST use GSAP ScrollTrigger with lifecycle-safe setup (`onMounted`) and cleanup (`onUnmounted`).
- **FR-061**: All animations MUST respect `prefers-reduced-motion: reduce` by disabling motion-intensive effects and falling back to immediate content display.
- **FR-062**: The staggered card entrance animation MUST maintain visually smooth performance on mid-range devices.
- **FR-063**: The hero background scale animation MUST be GPU-accelerated (transform-based, not layout-triggering).

#### Accessibility

- **FR-070**: All text content, navigation links, and CTAs MUST be present in the SSR-rendered HTML for screen reader and crawler access.
- **FR-071**: Interactive elements (CTA button, filter chips) MUST be keyboard-focusable and activatable.
- **FR-072**: Non-interactive upcoming tour cards MUST communicate their disabled state to assistive technology (e.g., `aria-disabled`).
- **FR-073**: Decorative animations (stagger, scale, badge pulse) MUST NOT block or interfere with keyboard navigation.
- **FR-074**: The hero background image or video MUST have an appropriate alt text or aria-label describing the scene.

### Constitution Alignment Requirements _(mandatory)_

- **CAR-001 (Stack)**: Implementation MUST use Nuxt 4 + Vue 3 Composition API with `script setup` for all authored `pages/` and `components/` files.
- **CAR-002 (Package Manager)**: All install/run instructions in feature docs MUST use pnpm only.
- **CAR-003 (UI System)**: Filter chips MUST use shadcn-vue component patterns; card layouts MUST use Tailwind utilities and shadcn-vue Card primitives where appropriate.
- **CAR-004 (Motion)**: ALL animations MUST use the globally registered GSAP instance (via `useNuxtApp().$gsap` or the `gsap.client.ts` plugin). ScrollTrigger MUST be registered once, not re-registered per component. Smooth scroll coordination MUST use the single `lenis` instance from `lenis.client.ts`. All timeline/ScrollTrigger instances MUST be killed in `onUnmounted`.
- **CAR-005 (Data + SEO)**: The `pages/tours/index.vue` page MUST call `useSeoMeta` with a meaningful title and description. All visible text is mock data — SSR renders the static mock content directly.
- **CAR-006 (Rewrite Cleanup)**: The existing placeholder content in `pages/tours/index.vue` MUST be removed and replaced. Any artifacts from previous tours-related attempts MUST be cleaned up if found.

### Key Entities

- **FeaturedTour**: The single active flagship tour. Attributes: title ("Golra Sharif Railway Museum"), kicker ("Featured Experience"), year ("1881"), architecture style ("Victorian Architecture"), capture type ("360° Capture"), CTA label ("Enter Virtual Tour"), background image/video reference.
- **UpcomingTour**: A tour in production, not yet available. Attributes: title, location, category (Heritage Sites / Museums / Commercial), placeholder image, status badge ("In Production" or "Scanning…"), availability state (locked).
- **TourCategory**: A filter category for organizing tours. Attributes: label (one of "All," "Heritage Sites," "Museums," "Commercial," "In Production"), slug, active state.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A visitor perceives the Tours page as a premium, cinematic experience — the featured tour hero occupies the full viewport and feels like a high-end digital premiere rather than a placeholder page.
- **SC-002**: A visitor can scroll through the entire Tours page from hero to commercial teaser in under 90 seconds while all scroll-driven animations play without visible frame drops or jank.
- **SC-003**: The "In Production" grid successfully communicates platform scale — a visitor seeing the page understands that additional tours are forthcoming, solving the "empty catalog" perception problem.
- **SC-004**: 100% of visible content (tour titles, descriptions, CTAs, filter labels) is present in the server-rendered HTML, ensuring search engine crawlers index the page without needing client-side JavaScript.
- **SC-005**: The featured tour CTA is discoverable and interactable within 5 seconds of page load — a visitor immediately understands how to enter the virtual tour.
- **SC-006**: Both light and dark theme modes render the complete Tours page without any mismatched palette artifacts, broken overlays, or unstyled elements.

### Rewrite Quality Outcomes _(mandatory for rewrite features)_

- **RQ-001**: No npm/yarn/bun commands remain in feature docs or scripts touched by the feature.
- **RQ-002**: No duplicate smooth-scroll runtime providers exist after implementation.
- **RQ-003**: SSR rendering is present for the Tours page — all indexable content renders without client-side JavaScript.

## Assumptions

- The Golra Sharif Railway Heritage tour is the only active/live tour at launch. All other tours are mock placeholders shown as "In Production."
- The "Enter Virtual Tour" CTA links to an existing virtual tour URL or route that will be defined outside this feature's scope (likely `/tours/golra-sharif` or an external embed).
- The `/commercial` route referenced by the commercial teaser either exists or will be handled as a future feature. The CTA should link to it regardless.
- Mock placeholder images for upcoming tours use appropriately licensed or project-owned assets. Specific image sourcing is an implementation detail.
- The MagneticWrapper component referenced in the hero CTA either already exists in the codebase (from the homepage feature) or will be built as a shared component. This spec assumes it is available or will be created as part of implementation.
- Performance targets assume mid-range devices (equivalent to an iPhone 12 or mid-tier Android) as the baseline for smooth animation.
