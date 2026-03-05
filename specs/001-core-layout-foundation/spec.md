# Feature Specification: Core Layout, UI Foundation, and Routing

**Feature Branch**: `001-core-layout-foundation`
**Created**: 2026-03-05
**Status**: Draft
**Input**: User description: "Phase 1: Core Layout, UI Foundation, and Routing — build the foundational application shell for the akse-elite rewrite including global providers, core layout components, shadcn-vue initialization, routing with dummy pages, smooth scrolling, and page transitions."

## Clarifications

### Session 2026-03-05

- Q: Should animations respect `prefers-reduced-motion`? → A: Yes — disable Lenis smooth scroll and reduce GSAP transitions to instant/minimal for users who prefer reduced motion.
- Q: What hex value defines the primary text color ("warm off-white")? → A: `#e2dad0` (warm cream from the legacy brand palette).
- Q: What duration should the PageVeil fade-in and fade-out transitions use? → A: 300ms each (fade-in and fade-out).
- Q: What occupies the left side of the navigation bar (logo/brand mark)? → A: A placeholder SVG logo slot with a generic mark, to be replaced with a real logo in a future phase.

## User Scenarios & Testing _(mandatory)_

### User Story 1 — Desktop Navigation Between Pages (Priority: P1)

A visitor on a desktop browser loads the site and sees a fixed top navigation bar with a translucent glassmorphism background. The nav contains links for Home, About, Tours, and Blog, plus a prominent "Start Project" call-to-action button styled with the Rust accent. The currently active route is highlighted by an animated underline that smoothly slides to the active link. Clicking any nav link transitions to the corresponding page with a cinematic fade overlay, and a 3px progress bar at the top of the viewport tracks scroll depth on the new page. The footer is consistently visible at the bottom of every page with brand information and links.

**Why this priority**: Navigation is the foundational user journey. Without working routing, animated transitions, and a styled shell, no subsequent feature (page content, CMS integration) can be meaningfully developed or demonstrated.

**Independent Test**: Load the app in a desktop browser. Click each of the four navigation links in sequence and verify: (a) the correct dummy page renders, (b) the underline animates to the clicked link, (c) the page veil fades in and out during the transition, (d) the scroll progress bar resets on each new page, (e) the footer appears below the content on every page.

**Acceptance Scenarios**:

1. **Given** the app is loaded at `/`, **When** the user clicks the "About" nav link, **Then** the page veil fades in, the route changes to `/about`, the veil fades out, and the nav underline slides to the About link.
2. **Given** the user is on `/about`, **When** they scroll down the page, **Then** the 3px progress bar at the top fills proportionally to the scroll depth.
3. **Given** the user is on any page, **When** they look at the top of the viewport, **Then** they see a fixed navigation bar with a translucent blurred background, and a visible "Start Project" button in the Rust accent color.
4. **Given** the user is on any page, **When** they scroll to the bottom, **Then** a 3-column footer is visible containing brand info, navigation/legal links, and social links.

---

### User Story 2 — Mobile Navigation via Drawer (Priority: P2)

A visitor on a mobile device sees a hamburger icon instead of the desktop nav links. Tapping the hamburger opens a sliding drawer panel from the right side containing the same navigation links and the "Start Project" CTA. Tapping a link inside the drawer closes it and navigates to the selected page with the same transition behavior as desktop. Body scroll is locked while the drawer is open.

**Why this priority**: Mobile traffic is critical for a client-facing portfolio site. The drawer interaction and body-scroll lock must work correctly before any page content is added.

**Independent Test**: Resize the browser below the mobile breakpoint (or use a mobile device). Tap the hamburger, verify the drawer slides in from the right and body scroll is locked. Tap a link, verify the drawer closes, the route changes, and the page transition plays.

**Acceptance Scenarios**:

1. **Given** the viewport is below the mobile breakpoint, **When** the page loads, **Then** the hamburger icon is visible and the desktop link rail is hidden.
2. **Given** the mobile drawer is closed, **When** the user taps the hamburger, **Then** the drawer slides in from the right and the page background cannot be scrolled.
3. **Given** the mobile drawer is open, **When** the user taps a navigation link, **Then** the drawer closes, the route changes, and the page veil transition plays.
4. **Given** the mobile drawer is open, **When** the user taps outside the drawer or presses Escape, **Then** the drawer closes and body scroll is restored.

---

### User Story 3 — Smooth Scrolling Experience (Priority: P3)

On any page, all native scroll interactions (mouse wheel, trackpad, keyboard arrows, touch swipe) are driven by a smooth scroll provider that produces fluid, eased motion. The smooth scroll must not conflict with page transitions and must reset cleanly when navigating between routes.

**Why this priority**: Smooth scrolling is a signature element of the cinematic brand. It must be established as a global runtime before any scroll-based animations or pinned sections are developed in later phases.

**Independent Test**: Load any dummy page with enough content to scroll. Scroll with a mouse wheel and observe the eased motion. Navigate to another page and verify scroll position resets to top without stutter or duplicate scroll providers.

**Acceptance Scenarios**:

1. **Given** a page with scrollable content, **When** the user scrolls with any input method, **Then** scrolling is visibly eased and smooth (not native step-based).
2. **Given** the user is partway down a page, **When** they click a nav link, **Then** the new page loads at scroll position 0 without a visible jump or double-scroll.
3. **Given** the app is running, **When** a developer inspects the runtime, **Then** exactly one smooth-scroll provider is active (no duplicate instances).

---

### User Story 4 — Cinematic Dark Theme Presentation (Priority: P4)

On every page, the overall visual presentation uses the brand's dark theme with the signature color palette. Text is rendered in the premium Geist Sans font. Background uses the base dark color with optional ambient gradient effects. All interactive elements (buttons, links, nav items) use the Rust and Teal accent tokens consistently.

**Why this priority**: Visual consistency is the baseline for brand credibility. It must be established at the shell level before content-specific pages are designed.

**Independent Test**: Load any page and verify: dark background is present, text renders in Geist Sans, the "Start Project" button uses the Rust accent, active nav states use the correct accent, and the footer links use the expected color scheme.

**Acceptance Scenarios**:

1. **Given** the app is loaded, **When** the user views any page, **Then** the page background is the brand dark color (`#0e1516`) and text is the warm cream color (`#e2dad0`).
2. **Given** the app is loaded, **When** the user inspects rendered text, **Then** the body font is Geist Sans.
3. **Given** the user views the "Start Project" button, **When** they hover over it, **Then** it shows the Rust accent color treatment consistently across all pages.

---

### Edge Cases

- What happens when JavaScript fails to load or is delayed? The nav should still render visible (albeit without animated underline or smooth scroll) because the HTML/CSS structure is functional without JS.
- What happens if the user rapidly clicks between nav links during a page transition? The transition system should not stack or produce a visual glitch; the latest route wins.
- What happens on browsers that do not support `backdrop-filter`? The nav should gracefully degrade to a solid dark background.
- What happens on very tall pages where scroll progress approaches 100%? The progress bar must reach exactly full width without overflowing.
- What happens on pages with no scrollable content? The scroll progress bar should remain at 0% (empty) and smooth scroll should not produce errors.
- What happens when the user has `prefers-reduced-motion: reduce` enabled? Lenis is not instantiated, GSAP transitions run with near-zero duration, and the site remains fully functional with native scrolling.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The application shell MUST include `app.vue` and `layouts/default.vue` as the root rendering hierarchy.
- **FR-002**: The default layout MUST render `SiteNav`, `PageVeil`, `ScrollProgress`, a `<main>` slot for page content, and `SiteFooter` in the correct visual stacking order.
- **FR-003**: Global CSS MUST register the brand color tokens (`--bg: #0e1516`, `--rust: #C9653D`, `--teal: #2C7A83`, `--text: #e2dad0`) as Tailwind CSS variables available in utility classes.
- **FR-004**: Geist Sans MUST be loaded and applied as the primary sans-serif font for all body and UI text.
- **FR-005**: A single Lenis smooth-scroll instance MUST be created as a global provider, running on one `requestAnimationFrame` loop, and MUST reset scroll position on Nuxt route changes.
- **FR-006**: GSAP and ScrollTrigger MUST be registered globally so future components can access them without per-component imports of the registration step.
- **FR-007**: `SiteNav.vue` MUST be a fixed-position top navigation bar with a glassmorphism effect (`backdrop-filter: blur`). The left side MUST contain a placeholder SVG logo slot (generic mark or outlined shape) linking to `/`. The nav MUST contain desktop links (Home → `/`, About → `/about`, Tours → `/tours`, Blog → `/blog`), an animated underline on the active link, and a "Start Project" CTA button styled with the Rust accent using a shadcn-vue `Button` variant.
- **FR-008**: `SiteNav.vue` MUST include a mobile-responsive hamburger button that opens a sliding drawer (using shadcn-vue `Sheet` component) containing the same navigation links and CTA. Body scroll MUST be locked while the drawer is open.
- **FR-009**: `SiteFooter.vue` MUST be a responsive footer with three visible column groups: Brand information, Company/Legal links, and Social links.
- **FR-010**: `PageVeil.vue` MUST be a full-screen overlay that fades in (300ms) on `page:start` and fades out (300ms) after `page:finish`, providing a cinematic transition between routes. Under `prefers-reduced-motion`, both durations MUST be ≤50ms per FR-016.
- **FR-011**: `ScrollProgress.vue` MUST be a fixed 3px bar at the top of the viewport that indicates current scroll depth as a percentage using the Rust accent color.
- **FR-012**: The application MUST include four routable dummy pages (`/`, `/about`, `/tours`, `/blog`) each rendering a minimal heading so routing and transitions can be verified.
- **FR-013**: shadcn-vue MUST be initialized with at least `Button` and `Sheet` components configured for the dark cinematic theme (dark backgrounds, warm text, Rust/Teal accents).
- **FR-014**: The legacy `@studio-freight/lenis` package and its associated `smooth.client.ts` plugin MUST NOT be present in the rewrite.
- **FR-015**: The legacy `reveal.client.ts` plugin MUST NOT be present unless explicitly re-implemented with correct lifecycle integration. The `page-ready` class approach should be replaced by Vue-native reactivity.
- **FR-016**: When the user's system indicates `prefers-reduced-motion: reduce`, Lenis smooth scroll MUST be disabled (native scroll used instead) and all GSAP-driven transitions (PageVeil fade, nav underline slide, drawer animation) MUST be instant or near-instant (duration ≤ 50ms).

### Constitution Alignment Requirements _(mandatory)_

- **CAR-001 (Stack)**: Implementation MUST use Nuxt 4 + Vue 3 Composition API with `script setup` for all authored pages and components.
- **CAR-002 (Package Manager)**: All install/run instructions MUST use pnpm only.
- **CAR-003 (UI System)**: Structural UI styling MUST use Tailwind utilities and shadcn-vue component patterns. Raw CSS is limited to token declarations, animation keyframes, and browser-specific fixes.
- **CAR-004 (Motion)**: Smooth scroll MUST use a single modern `lenis` instance. GSAP + ScrollTrigger MUST be the animation runtime. All listeners and timelines MUST be cleaned up in `onBeforeUnmount` or equivalent hooks.
- **CAR-005 (Data + SEO)**: No CMS data fetching is in scope for this phase. SEO baseline via `useSeoMeta` in `script setup` should be established in `app.vue` or `layouts/default.vue` with default site-level metadata (title, description, OG tags).
- **CAR-006 (Rewrite Cleanup)**: The following legacy artifacts MUST be removed or not carried forward: `smooth.client.ts` (duplicate Lenis), `reveal.client.ts` (non-functional lifecycle), `@studio-freight/lenis` package, `useHead` calls placed inside `<style>` blocks, and all 9 unused components (CaseGrid, FAQ, FinalCTA, Hero3D, ImpactMetrics, OfferTriptych, Showcase360, Testimonials, TrustBar).

### Assumptions

- The premium font pairing will use **Geist Sans** for both body and UI text. A separate display/heading font is deferred to a future phase unless the user specifies one during clarification.
- Ambient animated background gradients (the `.bg-anim` layer from the legacy site) are considered optional for this phase and may be included if straightforward, but are not a hard requirement.
- The "Start Project" CTA link target (`/contact`) does not need to resolve to a real page in this phase — it can 404 or link to a dummy.
- Legal page routes (`/privacy`, `/terms`, `/cookies`) are out of scope for this phase; they will be addressed in a content-focused phase.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A user can navigate between all four dummy pages (`/`, `/about`, `/tours`, `/blog`) using the navigation bar and arrive at the correct route within 1 second, with a visible page transition on every navigation.
- **SC-002**: The mobile navigation drawer opens and closes without visual stutter, and body scroll is fully locked while it is open.
- **SC-003**: Smooth scrolling is perceptible on pages with enough content, with no visible judder or frame drops during normal scroll interactions.
- **SC-004**: The scroll progress bar accurately reflects scroll position from 0% to 100% on any page with scrollable content.
- **SC-005**: All text on the site renders in Geist Sans, and all accent-colored elements (buttons, progress bar, active nav states) use the correct brand tokens.
- **SC-006**: The site presents the cinematic dark theme consistently across all pages with no white flashes or unstyled content during initial load or transitions.

### Rewrite Quality Outcomes _(mandatory for rewrite features)_

- **RQ-001**: No npm/yarn/bun commands remain in any documentation, script, or configuration file touched by this feature.
- **RQ-002**: Exactly one smooth-scroll runtime provider exists after implementation. No `@studio-freight/lenis` dependency is present.
- **RQ-003**: No indexable page content exists in this phase (dummy pages only), so SSR rendering of content is not applicable. The SSR-ready structure (server-side layout rendering) MUST be confirmed functional.
