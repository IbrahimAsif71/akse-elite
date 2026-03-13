# Feature Specification: About & Process Page

**Feature Branch**: `005-about-process-page`  
**Created**: 2026-03-09  
**Status**: Draft  
**Input**: User description: "About & Process Page (pages/about.vue) — Build the About / Our Process page for the AKSE platform with dual-theme architecture, GSAP/ScrollTrigger cinematic animations, hero with SplitText, mission pillars with scroll-linked text highlighting, sticky split-screen process timeline, bento tech showcase, and bottom CTA."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Cinematic Hero First Impression (Priority: P1)

A potential client navigates to the About page and is immediately met with a full-viewport, typography-driven hero. The headline "Preserving the Past. Building the Future." reveals word-by-word through a fluid animation. Below it, a wide cinematic image (a camera rig at a heritage site) anchors the page with gravitas — as the visitor begins to scroll, the image scales and sharpens in sync with their movement, drawing them deeper into the story.

**Why this priority**: The hero is the single most critical moment on the page. It establishes AKSE's brand voice and creative standard before the visitor reads a word. Without it, the page cannot achieve the premium storytelling goal.

**Independent Test**: Can be fully tested by navigating to `/about` and confirming the headline animates in on load, and then slowly scrolling — the image should scale down and sharpen (blur decreases) tied to scroll position.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/about`, **When** the page first loads, **Then** the headline "Preserving the Past. Building the Future." is hidden and begins a word-by-word or character-by-character reveal animation within 500ms of mount.
2. **Given** the hero is fully visible, **When** no scrolling has occurred, **Then** the cinematic image below the headline appears slightly scaled up and has a subtle blur applied.
3. **Given** a visitor begins scrolling down from the hero, **When** the scroll position progresses, **Then** the image scale decreases toward 1 and the blur filter decreases toward 0, in sync with the scroll position (scrubbed).
4. **Given** the visitor is in dark mode, **When** the hero renders, **Then** the background uses the deep `#0e1516` palette and text uses the light contrast color. In light mode, the background uses the warm beige palette.
5. **Given** the visitor is on a mobile device, **When** the hero renders, **Then** the headline and image both display without overflow and the animation still plays (reduced complexity acceptable on mobile).

---

### User Story 2 - Mission Philosophy Scroll-Reveal (Priority: P1)

A visitor scrolls past the hero and encounters a large, bold mission statement built around the three pillars: Preserve, Present, Elevate. As they scroll through the section, the text gradually illuminates — words begin at low opacity and transition to full legibility as each line enters the active scroll window, creating a sense of reading being guided by movement.

**Why this priority**: This section communicates AKSE's core value proposition. The scroll-linked text highlight elevates it from a wall of text into an interactive declaration — essential for avoiding "wall-of-text fatigue."

**Independent Test**: Can be tested by scrolling through the mission section, line by line, and verifying each line transitions from ~20% to 100% opacity as it crosses the scroll threshold.

**Acceptance Scenarios**:

1. **Given** the mission section is in the viewport, **When** the visitor has not yet scrolled to it, **Then** all body text lines appear at a low opacity (approximately 0.2).
2. **Given** the visitor scrolls through the mission section, **When** each line of text enters the active scroll zone, **Then** that line's opacity transitions from 0.2 to 1.0, tied to scroll position.
3. **Given** the visitor scrolls backward (up) through the section, **When** a line exits the active zone, **Then** the line's opacity transitions back toward 0.2.
4. **Given** the section has rendered, **When** viewed on any screen size, **Then** the three pillar words (Preserve, Present, Elevate) are displayed in an oversized typographic treatment, visually larger than the surrounding body text.

---

### User Story 3 - 360° Process Deep-Dive (Priority: P1)

A potential client wants to understand exactly how AKSE works. They scroll into the "How We Capture Reality" section and discover a sticky split-screen layout: a pinned left column holds the section title while the right column scrolls through five richly described process steps. As each step becomes active, the accompanying visual transitions (crossfades) to match — immersing the reader in each phase of AKSE's workflow.

**Why this priority**: This is the core educational section of the page. It directly addresses the client's primary question — "how does the process work?" — and has the highest information density. The sticky layout prevents spatial disorientation when reading long-form content.

**Independent Test**: Can be tested by scrolling into the process section, verifying the left column title stays pinned, and confirming the background visual crossfades as each of the 5 steps scrolls into view.

**Acceptance Scenarios**:

1. **Given** the process section is active, **When** the visitor begins scrolling through it, **Then** the left column (containing "How We Capture Reality" and the section number/label) remains fixed in position while the right column scrolls.
2. **Given** the visitor scrolls to Step 1 ("The Assessment"), **When** that step's scroll trigger fires, **Then** the accompanying visual for Step 1 is fully visible at full opacity.
3. **Given** the visitor scrolls past Step 1 into Step 2 ("360° Capture & Camera Tech"), **When** the transition threshold is crossed, **Then** the companion visual crossfades from the Step 1 image to the Step 2 image with a smooth opacity transition.
4. **Given** all 5 steps are rendered (Assessment → 360° Capture → Editing → Tour Stitching → Deployment), **When** the visitor scrolls through all of them, **Then** each step triggers its own visual crossfade in sequence.
5. **Given** the visitor reaches the end of the process section, **When** the last step scrolls out of the trigger zone, **Then** the left column unpins and the next page section scrolls into view naturally.
6. **Given** the visitor is on a mobile device, **When** the process section renders, **Then** the layout stacks vertically (no sticky split-screen) and each step displays with its visual above the text description.

---

### User Story 4 - Tech Stack & VR Showcase (Priority: P2)

A technically-minded visitor or partner wants to understand what tools and technology power AKSE's 360° experiences. They encounter a bento-grid layout showcasing VR headset compatibility, WebGL interfaces, and camera hardware. Hovering over individual cards triggers a magnetic pull effect and an accent-color glow on the border — reinforcing the premium interactive feel established throughout the site.

**Why this priority**: The tech showcase builds credibility and differentiates AKSE from less specialized competitors. It's lower priority than the core storytelling sections but important for technical due diligence.

**Independent Test**: Can be tested by hovering over tech grid cards on a pointer device, verifying the magnetic pull effect and accent border glow activate, and confirming the grid renders cleanly on both themes.

**Acceptance Scenarios**:

1. **Given** the tech section is visible, **When** it renders on any screen size, **Then** the technology items are laid out in a bento-style grid (varied card sizes, not a uniform grid of identical cells).
2. **Given** the visitor is using a pointer device, **When** the cursor enters a tech card's boundary, **Then** the card visually pulls slightly toward the cursor (magnetic effect) with a smooth spring-back on exit.
3. **Given** a visitor hovers a tech card, **When** the hover state is active, **Then** the card's border illuminates with the theme's primary accent color (orange in light mode, rust in dark mode).
4. **Given** the page is rendered in dark mode, **When** the tech section is visible, **Then** all card backgrounds use the dark theme palette and accent glow uses the rust color. In light mode, cards use the beige palette and glow uses orange.

---

### User Story 5 - Bottom CTA & Page Completion (Priority: P2)

After consuming the full page narrative, the visitor reaches a clean, high-contrast CTA section that presents two clear next actions: "Start a Project" and "View the Archive." The section transitions smoothly from the content above, making the progression feel intentional and complete.

**Why this priority**: The CTA is the conversion endpoint of the page. A visitor who has engaged with the full process narrative needs a clear, frictionless path to take the next step.

**Independent Test**: Can be tested by scrolling to the bottom of the `/about` page and verifying the CTA renders with two actionable links, correct theme colors, and a smooth visual transition from the section above.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to the bottom of the About page, **When** the CTA section enters the viewport, **Then** two distinct calls to action are visible: one for starting a project and one for viewing the tour archive.
2. **Given** the CTA section renders, **When** viewed in either theme, **Then** the layout uses strong contrast, clear hierarchy, and the primary button uses the accent color (orange/rust) appropriate to the current theme.
3. **Given** a visitor clicks "Start a Project," **When** the click registers, **Then** the visitor is navigated to the contact page (`/contact`) or an equivalent enquiry destination.
4. **Given** a visitor clicks "View the Archive," **When** the click registers, **Then** the visitor is navigated to the tours listing page (`/tours`).

---

### Edge Cases

- What happens when the user has the `prefers-reduced-motion` media query enabled? All scroll-triggered animations and SplitText reveals MUST either be disabled entirely or replaced with instant opacity transitions to respect the user's accessibility preference.
- What happens when the page is rendered server-side (SSR)? All animation libraries and ScrollTrigger registrations MUST be guarded with `onMounted` / `client-only` patterns so the server render is clean and hydration does not throw.
- What happens when the visitor is on a touch device without pointer hover support? The magnetic hover effect on tech cards MUST be disabled (no effect applied) and the layout still functions correctly without it.
- What happens when the sticky process section is taller than the viewport? The pin logic MUST account for the full scrollable height of the right column to prevent the left column from unpinning prematurely or staying pinned past the section.
- What happens when mock image assets are missing or fail to load? Each image container MUST show a themed placeholder (using the background color of the current theme) rather than a broken image icon.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The page MUST render five distinct sections in order: Hero, Mission/Pillars, Process Timeline, Tech Showcase, and Bottom CTA.
- **FR-002**: The Hero section MUST play a text-reveal animation (word-by-word or character-by-character) on page load, triggered once automatically.
- **FR-003**: The Hero section MUST include a cinematic wide-format image that responds to scroll with a scale and blur scrub effect tied to vertical scroll position.
- **FR-004**: The Mission section MUST implement a scroll-linked text-highlight effect where each line of body text transitions from low opacity (~0.2) to full opacity (1.0) as it enters the active scroll window.
- **FR-005**: The Mission section MUST visually distinguish the three pillar words (Preserve, Present, Elevate) using oversized typographic sizing relative to surrounding text.
- **FR-006**: The Process Timeline section MUST implement a sticky split-screen layout where the left title column is pinned during the scroll through all five process steps.
- **FR-007**: The Process Timeline MUST include all five steps with mock copy: The Assessment, 360° Capture & Camera Tech, Editing & Post-Production, Tour Stitching & Digital Development, and Deployment & VR Integration.
- **FR-008**: The Process Timeline MUST crossfade companion visuals (mock images) as the user scrolls from one step to the next, with each step having a corresponding visual.
- **FR-009**: The Tech Showcase section MUST render technology items in a bento-style grid layout with varied card sizes.
- **FR-010**: The Tech Showcase cards MUST implement the magnetic hover effect (cursor proximity pull) on pointer devices, consistent with the Phase 2 interaction pattern.
- **FR-011**: The Tech Showcase cards MUST display an accent-colored border glow on hover, using the primary accent color of the active theme.
- **FR-012**: The Bottom CTA section MUST present exactly two navigation actions: one leading to the contact/project enquiry page and one leading to the tours archive.
- **FR-013**: All animations MUST be disabled or reduced to instant opacity transitions when `prefers-reduced-motion: reduce` is active.
- **FR-014**: All GSAP-related setup (ScrollTrigger creation, SplitText usage, scroll listeners) MUST be initialized inside `onMounted` and cleaned up inside `onUnmounted` to prevent SSR hydration errors and memory leaks.
- **FR-015**: All content (headlines, body copy, image alt text, step descriptions, tech item labels) MUST use mock data defined within each component — no CMS integration required for this feature.
- **FR-016**: The page MUST replace the existing placeholder `pages/about.vue` content entirely while preserving its file path and `useSeoMeta` call.

### Constitution Alignment Requirements _(mandatory)_

- **CAR-001 (Stack)**: Implementation MUST use Nuxt 4 + Vue 3 Composition API with `script setup` for all authored `pages/` and `components/` files.
- **CAR-002 (Package Manager)**: All install/run instructions in feature docs MUST use pnpm only.
- **CAR-003 (UI System)**: Card layouts in the Tech Showcase MUST use shadcn-vue card component patterns; structural layout spacing MUST use Tailwind utilities.
- **CAR-004 (Motion)**: ALL animations MUST use the globally registered GSAP instance (via `useNuxtApp().$gsap` or the `gsap.client.ts` plugin). ScrollTrigger MUST be registered once, not re-registered per component. Smooth scroll coordination MUST use the single `lenis` instance from `lenis.client.ts`. All timeline/ScrollTrigger instances MUST be killed in `onUnmounted`.
- **CAR-005 (Data + SEO)**: The `pages/about.vue` page MUST call `useSeoMeta` with a meaningful title and description. All visible text is mock data, not dynamically fetched — SSR renders the static mock content directly.
- **CAR-006 (Rewrite Cleanup)**: The existing placeholder content in `pages/about.vue` MUST be removed. Any `components/About/` directory artifacts from previous abandoned attempts MUST be cleaned up if they exist.

### Key Entities

- **ProcessStep**: A single step in AKSE's 360° workflow. Attributes: step number (1–5), title, short summary, extended description, and companion image (mock asset reference).
- **TechItem**: A single technology or capability card in the Showcase grid. Attributes: name, short description, category (Hardware / Software / Platform), and an icon or representative image (mock).
- **HeroCopy**: The primary headline text and supporting tagline for the Hero section. Static mock string, split at the component level for animation.
- **Pillar**: One of the three mission pillars (Preserve / Present / Elevate). Attributes: pillar word, one-sentence description.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A visitor can scroll through the entire About page from hero to CTA in under 3 minutes while all scroll-driven animations play without visible frame drops or jank.
- **SC-002**: The text-reveal hero animation completes within 1.5 seconds of the page becoming interactive, creating an immediate cinematic impression without blocking reading.
- **SC-003**: The scroll-linked text opacity highlight in the Mission section causes 100% of body text lines to reach full legibility as the visitor scrolls through them — no line is permanently stuck at low opacity.
- **SC-004**: All five process steps in the Timeline are fully readable and their corresponding visuals are distinct and correctly crossfade, making the workflow comprehensible in a single scroll pass.
- **SC-005**: The page renders identically correct in both light (beige/orange) and dark (#0e1516/rust) themes — no accent colors bleed between themes and no layout breaks occur on theme switch.
- **SC-006**: The page achieves a Lighthouse Performance score of 80+ and a Lighthouse Accessibility score of 90+ on a standard desktop emulation.
- **SC-007**: Both CTA navigation actions route to the correct destination pages without 404 errors.

### Rewrite Quality Outcomes _(mandatory for rewrite features)_

- **RQ-001**: No npm/yarn/bun commands remain in any feature docs or scripts touched by this feature.
- **RQ-002**: No duplicate smooth-scroll providers are introduced — the single `lenis.client.ts` plugin remains the sole scroll controller.
- **RQ-003**: The `pages/about.vue` page SSR-renders all visible text content (mock copy) so it is indexable by search engines without JavaScript execution.

## Assumptions

- All text copy (hero headline, mission statement, process step descriptions, tech item names) will use inline mock data defined within each Vue component. No external CMS or API is required.
- All images will be local mock assets placed under `public/images/about/` using representative placeholder filenames (e.g., `hero-camera-rig.jpg`, `step-01-assessment.jpg`). Actual photography will be replaced in a future content phase.
- The magnetic hover effect for Tech Showcase cards uses the same `MagneticWrapper.vue` component established in Phase 2 / the home page feature — it is treated as an existing, reusable component.
- GSAP and its plugins (ScrollTrigger, SplitText) are already available via the `gsap.client.ts` plugin. No additional GSAP package installation is required.
- The dual-theme CSS custom properties (`--background`, `--foreground`, `--accent`, `--rust`, etc.) are already defined in the global theme system (Feature 001-global-theme-system). Components will consume these tokens directly.
- The `prefers-reduced-motion` check will be implemented via a CSS `@media` query for animation disabling, supplemented by a JavaScript check in GSAP timeline creation where appropriate.
- Mobile breakpoint is treated as < 768px (Tailwind `md` breakpoint). The sticky split-screen and magnetic effects are desktop-only features; mobile receives a simplified stacked flow.
