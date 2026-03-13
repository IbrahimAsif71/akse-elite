# Tasks: Awwwards-Level Home Page

**Input**: Design documents from `/specs/004-awwwards-home-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested — manual visual verification only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install new dependency and prepare project for feature work

- [x] T001 Install cobe globe library via `pnpm add cobe`
- [x] T002 Verify dev server runs (`pnpm dev`) with cobe installed and no regressions

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the page composition root that all section components plug into

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create pages/index.vue composition root with `useSeoMeta` (title, description, og:title, og:description, og:image) and placeholder slots for section components in pages/index.vue

**Checkpoint**: Foundation ready — page renders at `/` with SEO metadata and empty section slots

---

## Phase 3: User Story 1 — Cinematic Hero First Impression (Priority: P1) 🎯 MVP

**Goal**: Full-viewport hero with animated "Heritage Redefined" headline, interactive cobe globe with 4 Pakistan location markers, auto-rotate, drag interaction, and theme-responsive colors.

**Independent Test**: Load the home page → hero fills viewport, headline animates character-by-character, globe renders with 4 glowing markers, auto-rotates, and responds to drag. Toggle theme → globe colors update.

### Implementation for User Story 1

- [x] T004 [US1] Create components/Home/HeroCinematic.vue with full-viewport (100vh) layout, supporting subtitle text, and two CTA links ("Explore Tours" → /tours, "Start a Project" → /contact) using Tailwind utilities and CSS variable theme tokens
- [x] T005 [US1] Implement character-by-character text reveal for "Heritage Redefined" headline using template-driven spans (computed char array) inside overflow-hidden container with GSAP `from({ y: '110%', opacity: 0 }, { stagger: 0.03 })` in components/Home/HeroCinematic.vue
- [x] T006 [US1] Implement interactive cobe globe in a `<ClientOnly>` wrapper with 4 GlobeMarker entries (Rawalpindi 33.5731/73.1898, Hasanabdal 33.7847/72.7178, Lahore 31.5497/74.3436, Gilgit 35.9202/74.3114), initial rotation centered on Pakistan (phi≈0, theta≈-1.28), auto-rotate, and pointer drag interaction in components/Home/HeroCinematic.vue
- [x] T007 [US1] Implement theme-responsive globe colors by watching `useColorMode()` and destroying/recreating the cobe instance with dark config (baseColor [0.055,0.082,0.086], glowColor [0.173,0.478,0.514], dark:1) or light config (baseColor [0.953,0.922,0.875], glowColor [0.788,0.396,0.239], dark:0) in components/Home/HeroCinematic.vue
- [x] T008 [US1] Add `data-cursor="drag"` attribute on the globe canvas container and `aria-label="Interactive globe showing AKSE locations in Pakistan"` for accessibility in components/Home/HeroCinematic.vue
- [x] T009 [US1] Import and render HomeHeroCinematic in pages/index.vue template as the first section component

**Checkpoint**: Home page displays full-viewport hero with animated headline, interactive globe, and theme-responsive colors. MVP is shippable.

---

## Phase 4: User Story 2 — Scroll-Driven Content Discovery (Priority: P1)

**Goal**: Flowing scroll sequence — parallax tour cards, pinned horizontal-scroll process section, and massive CTA with scale-down reveal — all at 60fps via GSAP ScrollTrigger.

**Independent Test**: Scroll through the entire page → tour images parallax, process section pins and scrubs horizontally, preceding content scales down as CTA reveals. No jank.

### Implementation for User Story 2

- [x] T010 [P] [US2] Create components/Home/FeaturedTours.vue with asymmetric staggered card layout (varied vertical offsets, overlapping edges via Tailwind), 4+ tour cards using inline mock TourCard data (id, title, location, description, image from /public/images/tours/, category), each card with overflow-hidden clipped image container (image sized h-[120%]) in components/Home/FeaturedTours.vue
- [x] T011 [US2] Implement ScrollTrigger parallax on each tour card image: `gsap.to(imageEl, { yPercent: -15, scrollTrigger: { trigger: cardEl, start: 'top bottom', end: 'bottom top', scrub: true } })` using `gsap.utils.toArray()` in `onMounted` with cleanup in `onBeforeUnmount` in components/Home/FeaturedTours.vue
- [x] T012 [P] [US2] Create components/Home/ProcessPinned.vue with left-side "Our Process" heading that pins in place, and right-side horizontal scroll container for 3 ProcessStep entries (Capture, Craft, Publish — each with step number, title, description), driven by `ScrollTrigger pin: true, scrub: 1` mapping vertical scroll to horizontal `x` translation, with dynamic scroll distance calculation in components/Home/ProcessPinned.vue
- [x] T013 [P] [US2] Create components/Home/MassiveCTA.vue with full-viewport-width section, accent gradient background using CSS variable `--orange`/`--rust`, large screen-scale typography "Want us to shoot a tour for you?", and primary "Book a Tour" button linking to /contact in components/Home/MassiveCTA.vue
- [x] T014 [US2] Implement scale-down reveal effect: wrap HeroCinematic + FeaturedTours + ProcessPinned in a container div, apply `gsap.to(wrapper, { scale: 0.95, borderRadius: '24px', transformOrigin: 'center top', scrollTrigger: { trigger: ctaSection, start: 'top bottom', end: 'top center', scrub: 1 } })` in pages/index.vue
- [x] T015 [US2] Wire HomeFeaturedTours, HomeProcessPinned, and HomeMassiveCTA into pages/index.vue template in correct order (Hero → Tours → Process → CTA) and verify full scroll sequence

**Checkpoint**: Full page scroll experience works — parallax tours, pinned horizontal process, scale-down CTA reveal. All P1 stories complete.

---

## Phase 5: User Story 3 — Custom Cursor & Magnetic Buttons (Priority: P2)

**Goal**: Custom animated cursor replaces default browser cursor on pointer devices. Cursor trails mouse, expands with contextual labels on hover. CTA button has magnetic pull effect.

**Independent Test**: Move mouse across page → custom dot cursor trails smoothly. Hover tour card → cursor expands with "Explore". Hover globe → "Drag". Hover CTA button → button pulls toward cursor, springs back on leave.

### Implementation for User Story 3

- [x] T016 [US3] Create components/CustomCursor.vue with `gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3' })` and corresponding Y quickTo for smooth 60fps trailing, `window.matchMedia('(pointer: fine)')` guard to skip rendering on touch devices, and reactive `cursor-none` class toggle on `<html>` element in components/CustomCursor.vue
- [x] T017 [US3] Implement `data-cursor` attribute event delegation in CustomCursor.vue: global `mouseenter`/`mouseleave` listeners on `[data-cursor]` elements, expanding cursor dot and showing contextual label text ("Explore", "Drag", or expand-only for "action") via GSAP scale timeline in components/CustomCursor.vue
- [x] T018 [US3] Mount CustomCursor component in layouts/default.vue (alongside existing SiteNav, ScrollProgress, PageVeil, SiteFooter)
- [x] T019 [P] [US3] Create components/MagneticWrapper.vue with `strength` prop (default 0.25) and `as` prop (default "div"), mousemove handler applying `gsap.set(el, { x: dx * strength, y: dy * strength })` for real-time pull, and mouseleave handler applying `gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' })` for spring-back, with `(pointer: fine)` guard in components/MagneticWrapper.vue
- [x] T020 [US3] Wrap the "Book a Tour" button in MassiveCTA.vue with `<MagneticWrapper>` component in components/Home/MassiveCTA.vue

**Checkpoint**: Custom cursor active on pointer devices with contextual hover labels. CTA button has magnetic pull + spring-back.

---

## Phase 6: User Story 4 — Featured Heritage Tours Exploration (Priority: P2)

**Goal**: Tour cards have hover image scale-up, accent-color metadata sweep, and cursor integration.

**Independent Test**: Scroll to tours section → staggered layout visible. Hover a card → image scales up within clipped container, accent color sweeps across metadata area. Cursor shows "Explore".

### Implementation for User Story 4

- [x] T021 [US4] Implement hover image scale-up effect on tour cards: CSS/GSAP `transform: scale(1.05)` on image within overflow-hidden container on `mouseenter` (pointer devices only) in components/Home/FeaturedTours.vue
- [x] T022 [US4] Implement accent-color sweep on card metadata area on hover using CSS `background` transition with `var(--orange)` (light) / `var(--rust)` (dark) accent in components/Home/FeaturedTours.vue
- [x] T023 [US4] Add `data-cursor="explore"` attribute to each tour card element for CustomCursor integration in components/Home/FeaturedTours.vue

**Checkpoint**: Tours section has full hover interaction layer — scale, sweep, cursor label.

---

## Phase 7: User Story 5 — Dual-Theme Visual Consistency (Priority: P2)

**Goal**: Every section updates correctly on theme toggle — no mixed-palette artifacts, no hardcoded hex for themed properties.

**Independent Test**: Toggle between light and dark mode → verify hero, tours, process, CTA, cursor, and buttons all update via CSS variables without any stale colors.

### Implementation for User Story 5

- [x] T024 [US5] Audit all Home section components (HeroCinematic, FeaturedTours, ProcessPinned, MassiveCTA) and replace any hardcoded hex color values for themed properties with CSS variable references (`var(--bg)`, `var(--text)`, `var(--orange)`, `var(--rust)`, `var(--teal)`, `var(--surface)`, etc.) in components/Home/\*.vue
- [x] T025 [US5] Verify CustomCursor and MagneticWrapper visual styling uses CSS variables or `currentColor` for theme adaptation — fix any hardcoded colors in components/CustomCursor.vue and components/MagneticWrapper.vue
- [x] T026 [US5] Perform full theme toggle test: switch light→dark→light and verify all sections (hero globe, tour cards, process steps, CTA gradient, cursor dot) update without mixed-palette artifacts or animation re-initialization

**Checkpoint**: Theme toggle produces consistent visual results across all sections.

---

## Phase 8: User Story 6 — Touch & Non-Pointer Graceful Fallback (Priority: P3)

**Goal**: Touch device users see all content and scroll animations but no custom cursor or magnetic effects.

**Independent Test**: Load page in touch emulation or on a mobile device → all content visible, scroll parallax and pinning work, no custom cursor appears, no magnetic pull, globe responds to touch drag.

### Implementation for User Story 6

- [x] T027 [US6] Verify CustomCursor `(pointer: fine)` guard prevents rendering on touch-only devices — test in Chrome DevTools touch emulation in components/CustomCursor.vue
- [x] T028 [US6] Verify MagneticWrapper `(pointer: fine)` guard makes magnetic effect a no-op on touch devices — button renders normally without pull in components/MagneticWrapper.vue
- [x] T029 [US6] Verify globe cobe instance responds to touch drag events on mobile and that all ScrollTrigger parallax/pin animations function correctly with touch scroll in components/Home/HeroCinematic.vue

**Checkpoint**: Touch devices get full content experience minus pointer-only enhancements.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Reduced motion, fallbacks, responsiveness, SSR validation

- [x] T030 [P] Implement reduced-motion handling in all Home section components: check `prefers-reduced-motion: reduce` and disable GSAP scrub/parallax/stagger/auto-rotate, show content immediately — leverage existing gsap.client.ts defaults in components/Home/\*.vue
- [x] T031 [P] Implement WebGL fallback in HeroCinematic.vue: wrap cobe initialization in try/catch, show graceful empty state (hero layout with headline/CTAs intact, globe area hidden) when WebGL context fails in components/Home/HeroCinematic.vue
- [x] T032 Add `ScrollTrigger.refresh()` call after initial content mount settles (e.g., `nextTick` + short delay) to ensure correct pin/scrub calculations with all images loaded in pages/index.vue
- [x] T033 Verify responsive layout from 320px to ultrawide viewports — staggered tour grid adapts, pinned sections don't overflow, CTA typography scales, no horizontal overflow in all components
- [x] T034 Validate SSR output — confirm all text content, CTA links, and SEO metadata are present in server-rendered HTML before client hydration (view page source at `/`)
- [x] T035 Run quickstart.md validation steps and verify all success criteria SC-001 through SC-008

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — first MVP increment
- **US2 (Phase 4)**: Depends on Phase 2; benefits from US1 being complete for full scroll testing
- **US3 (Phase 5)**: Depends on Phase 2; benefits from US1+US2 for hover targets
- **US4 (Phase 6)**: Depends on US2 (FeaturedTours must exist) and US3 (CustomCursor for data-cursor)
- **US5 (Phase 7)**: Depends on US1+US2+US3+US4 — audit/verification pass
- **US6 (Phase 8)**: Depends on US3 (cursor/magnetic must exist to verify guards)
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

```
Phase 1 (Setup) → Phase 2 (Foundational)
                       │
                       ├── US1 (Phase 3) ──────┐
                       │                        │
                       ├── US2 (Phase 4) ──┐    │
                       │                   │    │
                       └── US3 (Phase 5) ──┤    │
                                           │    │
                       US4 (Phase 6) ◄─────┘    │
                                                │
                       US5 (Phase 7) ◄──────────┘ (all stories)
                       US6 (Phase 8) ◄── US3
                                           │
                       Polish (Phase 9) ◄──┘ (all stories)
```

### Within Each User Story

- Component structure/layout before animation logic
- ScrollTrigger setup before scroll-dependent integration
- All GSAP instances stored for `onBeforeUnmount` cleanup (.kill())
- Story testable at checkpoint before moving to next priority

### Parallel Opportunities

**Phase 4 (US2)**: T010, T012, T013 can run in parallel (three different component files)

**Phase 5 (US3)**: T016 (CustomCursor) and T019 (MagneticWrapper) can run in parallel (different files)

**Phase 9 (Polish)**: T030 and T031 can run in parallel (different concerns)

---

## Parallel Example: User Story 2

```
T010 (FeaturedTours layout) ──→ T011 (add parallax to tours)
T012 (ProcessPinned)         ──→ ─┐
T013 (MassiveCTA)            ──→ ─┤──→ T014 (scale-down in index) ──→ T015 (wire all sections)
                                   │
                  (all three parallel, then sequential integration)
```

## Implementation Strategy

**MVP**: Phase 1 + Phase 2 + Phase 3 (US1) = hero section with globe, headline animation, CTAs. Page is visually impressive and shippable at this point.

**Full P1**: Add Phase 4 (US2) = complete scroll experience with all four sections.

**Interactive Polish**: Add Phase 5 (US3) + Phase 6 (US4) = cursor, magnetic, tour hover effects.

**Quality Assurance**: Phase 7 (US5) + Phase 8 (US6) + Phase 9 (Polish) = theme verification, touch fallback, reduced motion, SSR, responsive.

**Incremental delivery**: Each phase produces a testable, deployable increment. No phase requires future phases to function.
