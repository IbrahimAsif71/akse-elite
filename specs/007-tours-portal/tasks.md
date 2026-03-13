# Tasks: Interactive Tours Portal

**Input**: Design documents from `/specs/007-tours-portal/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/component-interfaces.md, quickstart.md

**Tests**: Not requested — manual visual verification only.

**Organization**: Tasks grouped by user story (6 stories from spec.md) in priority order (P1 → P2 → P3).

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on in-progress tasks)
- **[Story]**: Which user story this task belongs to (US1–US6)
- All file paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install the one new dependency and configure the Nuxt module before any component work begins.

- [x] T001 Install `@nuxtjs/color-mode` via `pnpm add @nuxtjs/color-mode` and add module + `colorMode` config (`classSuffix: ''`, `preference: 'system'`, `fallback: 'light'`) to `nuxt.config.ts`
- [x] T002 Verify `pnpm dev` starts without errors after color-mode addition

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infrastructure that MUST be complete before ANY user story — dark theme CSS variables, the reusable MagneticWrapper utility, and the page shell that composes all sections.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 [P] Add `.dark` class CSS variable override block to `assets/css/main.css` after the `:root` block — override `--bg`, `--surface`, `--surface-alt`, `--text`, `--text-muted`, `--border`, `--card`, `--secondary`, `--muted`, `--accent`, and set `color-scheme: dark` per R-005 in research.md
- [x] T004 [P] Create `components/MagneticWrapper.vue` with default slot, optional `strength` prop (default `0.25`), `mousemove` → `gsap.set()` pull, `mouseleave` → `gsap.to()` elastic spring-back, pointer/motion guards via `matchMedia`, and GSAP cleanup in `onUnmounted` per contract in contracts/component-interfaces.md
- [x] T005 Replace `pages/tours/index.vue` placeholder with page shell — `useSeoMeta` (title, description, ogTitle, ogDescription), `activeCategory` ref defaulting to `'all'`, and template composing `<ToursFeaturedTour />`, `<ToursFilterRail v-model="activeCategory" />`, `<ToursUpcomingGrid :active-category="activeCategory" />`, `<ToursCommercialTeaser />` per contract in contracts/component-interfaces.md

**Checkpoint**: Foundation ready — `pnpm dev` runs, dark mode toggles via color-mode, MagneticWrapper available, page shell renders at `/tours`.

---

## Phase 3: User Story 1 — Immersive Featured Tour Hero (Priority: P1) 🎯 MVP

**Goal**: Full-viewport cinematic hero showcasing Golra Sharif Railway Museum with glassmorphism metadata bar, glowing kicker, and magnetic CTA that scales the background on hover.

**Independent Test**: Navigate to `/tours` → hero fills 100vh, background image with themed gradient overlay visible, kicker/headline/metadata bar rendered, CTA button has magnetic pull on pointer hover, background scales to ~1.05× on CTA hover.

### Implementation for User Story 1

- [x] T006 [US1] Create `components/Tours/FeaturedTour.vue` with 100vh section, background `<img>` (ref `bgRef`, `object-cover`, `will-change: transform`), themed gradient overlay div using CSS variables, and centered content stack (z-10) with inline featured tour mock data per data-model.md
- [x] T007 [US1] Add glassmorphism metadata bar to `components/Tours/FeaturedTour.vue` — `backdrop-blur-lg`, themed semi-transparent background (`bg-background/60`), subtle border, displaying "1881 • Victorian Architecture • 360° Capture" per R-002 in research.md
- [x] T008 [US1] Add "Featured Experience" kicker tag with glow effect (accent-colored `box-shadow` or `text-shadow`) and "Golra Sharif Railway Museum" headline in large-scale typography to `components/Tours/FeaturedTour.vue`
- [x] T009 [US1] Wrap "Enter Virtual Tour" CTA in `<MagneticWrapper>` with shadcn-vue `<Button>`, implement GSAP `bgRef` scale to 1.05 on CTA `mouseenter` and back to 1.0 on `mouseleave` (`duration: 1.2, ease: 'power2.out'`), store tween and kill in `onUnmounted` in `components/Tours/FeaturedTour.vue`

**Checkpoint**: Featured hero is fully functional — visitor sees cinematic hero at `/tours` with all interactive effects on pointer devices.

---

## Phase 4: User Story 3 — "In Production" Upcoming Tours Grid (Priority: P1)

**Goal**: Responsive card grid showing all tours (1 live + 5 upcoming) with blur/grayscale treatment on in-production cards, animated badges, staggered scroll entrance, and lock cursor.

**Independent Test**: Scroll to grid section → at least 6 cards visible, Golra Sharif card is full-color with "Live" badge and clickable, remaining cards are blurred/grayscale with pulsing "In Production" badge and cursor-not-allowed on hover, cards stagger in from bottom on scroll.

### Implementation for User Story 3

- [x] T010 [P] [US3] Define typed mock data arrays (`allTours` combining FeaturedTour + UpcomingTour entries, `categories` array) as constants at the top of `components/Tours/UpcomingGrid.vue` per data-model.md mock data set
- [x] T011 [US3] Create `components/Tours/UpcomingGrid.vue` with `activeCategory` prop, computed `filteredTours`, responsive grid (`grid cols-1 md:cols-2 lg:cols-3 gap-8`), live card (full-color image, "Live" badge, `<NuxtLink>` to `ctaLink`) and in-production card (blur/grayscale image filter, non-clickable) per contract in contracts/component-interfaces.md
- [x] T012 [US3] Add animated "In Production" badge with CSS `@keyframes badge-pulse` (2s infinite alternate, accent-colored box-shadow oscillation) to in-production cards in `components/Tours/UpcomingGrid.vue` per R-008 in research.md
- [x] T013 [US3] Implement `ScrollTrigger.batch()` staggered fade-up entrance (`y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out'`, `once: true`) on tour cards in `onMounted`, kill in `onUnmounted` in `components/Tours/UpcomingGrid.vue` per R-004 in research.md
- [x] T014 [US3] Add `cursor-not-allowed` and `aria-disabled="true"` to in-production cards, ensure no click handler or navigation on these cards in `components/Tours/UpcomingGrid.vue`

**Checkpoint**: Grid is fully functional — live card is interactive, in-production cards are locked, scroll stagger animates on entry.

---

## Phase 5: User Story 2 — Discovery Filter Bar (Priority: P2)

**Goal**: Sticky horizontally-scrollable filter bar with 5 pill chips that filter the tour grid by category.

**Independent Test**: Scroll past hero → filter bar sticks to top, 5 chips visible ("All" active by default with accent color), click "Heritage Sites" → grid filters to matching tours, bar is horizontally scrollable on narrow viewports.

### Implementation for User Story 2

- [x] T015 [US2] Create `components/Tours/FilterRail.vue` with `modelValue` prop, `update:modelValue` emit, `sticky top-0 z-30 bg-background border-b` positioning, horizontal scroll container (`overflow-x-auto`, hidden scrollbar), 5 pill-shaped `<button>` chips with active (`bg-primary text-primary-foreground`) and inactive (`bg-muted text-muted-foreground`) styling per contract in contracts/component-interfaces.md
- [x] T016 [US2] Wire filter to grid — call `nextTick(() => ScrollTrigger.refresh())` in `UpcomingGrid.vue` `watch` on `activeCategory` prop to recalculate batch positions after filter changes in `components/Tours/UpcomingGrid.vue`

**Checkpoint**: Filter bar sticks on scroll, chips toggle active state, grid reactively filters and re-staggers.

---

## Phase 6: User Story 4 — Commercial Teaser Section (Priority: P2)

**Goal**: Clean minimalist banner at page bottom bridging visitors to `/commercial`.

**Independent Test**: Scroll to bottom of `/tours` → "Want your space preserved like this?" headline visible, "View Commercial Packages" button present and links to `/commercial`, adapts to both themes.

### Implementation for User Story 4

- [x] T017 [P] [US4] Create `components/Tours/CommercialTeaser.vue` with `py-24 px-6 text-center` section, headline "Want your space preserved like this?", shadcn-vue `<Button variant="default">` reading "View Commercial Packages" wrapped in `<NuxtLink to="/commercial">` per contract in contracts/component-interfaces.md

**Checkpoint**: Commercial teaser renders at page bottom with working navigation to `/commercial`.

---

## Phase 7: User Story 5 — Dual-Theme Visual Consistency (Priority: P2)

**Goal**: Verify every section renders correctly in both light and dark modes with no mixed-palette artifacts.

**Independent Test**: Toggle theme while on `/tours` → all four sections update backgrounds, text, accents, and surfaces consistently in both modes.

### Implementation for User Story 5

- [x] T018 [US5] Audit all four Tours section components and verify every background, text, accent, border, and surface color uses semantic Tailwind classes (`bg-background`, `text-foreground`, `text-primary`, `border-border`, etc.) that derive from CSS variables — fix any hardcoded hex values in `components/Tours/`
- [x] T019 [US5] Verify glassmorphism metadata bar in `FeaturedTour.vue` and hero gradient overlay render correctly in both light and dark modes — adjust semi-transparent surface values if needed in `components/Tours/FeaturedTour.vue`

**Checkpoint**: Both themes render all sections without palette artifacts, broken overlays, or unstyled elements.

---

## Phase 8: User Story 6 — Touch Device & Reduced Motion Fallback (Priority: P3)

**Goal**: Ensure complete experience on touch devices without pointer-only features, and respect `prefers-reduced-motion`.

**Independent Test**: Enable touch emulation in DevTools → magnetic effect absent, all content visible, scroll stagger works. Enable reduced-motion → all GSAP animations skip, content displays immediately, badge pulse stops.

### Implementation for User Story 6

- [x] T020 [US6] Verify `components/MagneticWrapper.vue` renders slot content in a plain div with no event handlers when `matchMedia('(pointer: fine)')` or `matchMedia('(prefers-reduced-motion: reduce)')` fails
- [x] T021 [US6] Ensure `components/Tours/FilterRail.vue` scrollbar is hidden on touch (`scrollbar-hide` or `-webkit-scrollbar: none`) and pill chips are swipe-scrollable
- [x] T022 [US6] Validate that GSAP ScrollTrigger.batch stagger and hero scale animations in `components/Tours/FeaturedTour.vue` and `components/Tours/UpcomingGrid.vue` respect the reduced-motion defaults set by `plugins/gsap.client.ts`

**Checkpoint**: Touch and reduced-motion users get full content without pointer-only or motion-intensive features.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final validation across all stories.

- [x] T023 Validate SSR output — `pnpm build && pnpm preview`, view-source `/tours` and confirm all tour titles, descriptions, CTA text, badge labels, and filter chip labels are present in the HTML without client-side JavaScript
- [x] T024 Keyboard navigation audit — Tab through the page and verify "Enter Virtual Tour" CTA and all five filter chip buttons are focusable and activatable via Enter/Space
- [x] T025 Run all 9 quickstart.md verification steps end-to-end and confirm each passes in `specs/007-tours-portal/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 Hero (Phase 3)**: Depends on Phase 2 (needs MagneticWrapper + page shell)
- **US3 Grid (Phase 4)**: Depends on Phase 2 (needs page shell). Can run in parallel with US1 (different files)
- **US2 Filter (Phase 5)**: Depends on Phase 4 (needs UpcomingGrid to wire filtering)
- **US4 Teaser (Phase 6)**: Depends on Phase 2 only. Can run in parallel with US1/US3 (different file)
- **US5 Theme (Phase 7)**: Depends on all component phases (3, 4, 5, 6) being complete
- **US6 Touch/Motion (Phase 8)**: Depends on US1 + US3 being complete (needs MagneticWrapper and stagger)
- **Polish (Phase 9)**: Depends on all user story phases

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — no dependency on other stories
- **US3 (P1)**: After Phase 2 — no dependency on other stories. Parallel with US1
- **US2 (P2)**: After US3 — FilterRail wires to UpcomingGrid
- **US4 (P2)**: After Phase 2 — fully independent, parallel with US1/US3/US2
- **US5 (P2)**: After US1 + US3 + US2 + US4 — audits all components
- **US6 (P3)**: After US1 + US3 — verifies touch/motion on interactive components

### Within Each User Story

- Earlier-numbered tasks within a phase depend on previous tasks (same file, sequential modifications)
- Tasks marked [P] can run in parallel with other tasks in the same phase

### Parallel Opportunities

```
Phase 2 parallel batch:
  T003 (.dark CSS vars in main.css)  ║  T004 (MagneticWrapper.vue)

Phase 3 + Phase 4 parallel batch (after Phase 2):
  T006→T009 (FeaturedTour.vue)       ║  T010→T014 (UpcomingGrid.vue)

Phase 6 can overlap with Phase 5:
  T017 (CommercialTeaser.vue)        ║  T015→T016 (FilterRail + grid wiring)
```

---

## Parallel Example: US1 + US3 Simultaneously

```text
# After Phase 2 completes, launch both P1 stories in parallel:

Stream A (US1 — FeaturedTour):
  T006 → T007 → T008 → T009

Stream B (US3 — UpcomingGrid):
  T010 → T011 → T012 → T013 → T014

# Both streams work on different files with no shared state
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup (install color-mode)
2. Complete Phase 2: Foundational (dark CSS, MagneticWrapper, page shell)
3. Complete Phase 3: US1 — Featured Tour Hero
4. **STOP and VALIDATE**: Navigate to `/tours`, verify cinematic hero with all effects
5. Deploy/demo if ready — single hero section is a viable MVP

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 (Hero) → Test independently → **MVP deployed**
3. US3 (Grid) → Upcoming cards visible → Platform scale communicated
4. US2 (Filter) → Category navigation functional → Discovery enabled
5. US4 (Teaser) → Commercial bridge in place → Conversion path complete
6. US5 + US6 → Theme audit + accessibility pass → Production quality
7. Polish → SSR + keyboard + quickstart validation → Ship

---

## Notes

- **No test tasks**: Spec specifies manual visual verification. No automated test framework in project.
- **Mock data is inline**: All tour data lives inside component files — no shared data files or composables needed.
- **Single new dependency**: `@nuxtjs/color-mode` — installed in Phase 1, the only `pnpm add` needed.
- **Existing infrastructure reused**: GSAP (`$gsap`, `$ScrollTrigger`), Lenis (`$lenis`), reduced-motion guards — all pre-existing via plugins.
- **[P] tasks**: Different files with no dependencies — safe to execute simultaneously.
- **[Story] labels**: Map each task to its user story for traceability (US1–US6).
