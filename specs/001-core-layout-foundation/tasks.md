# Tasks: Core Layout, UI Foundation, and Routing

**Input**: Design documents from `/specs/001-core-layout-foundation/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not requested for this phase. Manual verification against acceptance scenarios per research.md R6.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Setup and Foundational phases have no story label
- Include exact file paths in descriptions

## Path Conventions

- Standard Nuxt 4 root-level convention: `app.vue`, `layouts/`, `pages/`, `components/`, `plugins/`, `assets/`
- shadcn-vue generated components: `components/ui/`
- Utility helpers: `lib/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Clean legacy artifacts, install new dependencies, initialize tooling

- [x] T001 Remove legacy artifacts per CAR-006 — delete `plugins/smooth.client.ts`, `plugins/reveal.client.ts`, remove `@studio-freight/lenis` from package.json, delete 9 unused components (`CaseGrid.vue`, `FAQ.vue`, `FinalCTA.vue`, `Hero3D.vue`, `ImpactMetrics.vue`, `OfferTriptych.vue`, `Showcase360.vue`, `Testimonials.vue`, `TrustBar.vue`) from `components/`
- [x] T002 Install core dependencies with pnpm — `pnpm add -D tailwindcss @tailwindcss/vite` and `pnpm add @nuxt/fonts geist` per research.md R1 and R3
- [x] T003 [P] Initialize shadcn-vue — run `pnpm dlx nuxi@latest module add shadcn-nuxt`, `pnpm dlx shadcn-vue@latest init` (new-york style, CSS variables), then `pnpm dlx shadcn-vue@latest add button sheet` to generate components into `components/ui/` and `lib/utils.ts` per research.md R1
- [x] T004 [P] Update `nuxt.config.ts` — add `@tailwindcss/vite` to Vite plugins, add `shadcn-nuxt` module with `componentDir: './components/ui'`, add `@nuxt/fonts` module, set `css: ['~/assets/css/main.css']`, remove legacy CSS entry per research.md R1 and R3

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create `assets/css/main.css` — `@import "tailwindcss"` directive, brand token `:root` variables (`--background`, `--foreground`, `--primary`/rust, `--secondary`/teal, `--border`, `--ring`, etc. mapped to shadcn semantic names), `@theme inline` block mapping tokens to Tailwind utility classes (`--color-background`, `--color-foreground`, `--color-rust`, `--color-teal`, `--font-sans: 'Geist'`), and `@media (prefers-reduced-motion: reduce)` CSS fallback layer per research.md R1, R3, R5 and FR-003, FR-004
- [x] T006 [P] Create `public/logo-placeholder.svg` — generic outlined shape (e.g., diamond or abstract mark) sized ~32×32px for the SiteNav logo slot
- [x] T007 [P] Create `plugins/gsap.client.ts` — import and register GSAP + ScrollTrigger globally, check `window.matchMedia('(prefers-reduced-motion: reduce)')` and set `gsap.defaults({ duration: 0.05 })` when reduced motion is preferred, provide gsap and ScrollTrigger to the app per research.md R5 and FR-006, FR-016
- [x] T008 Create `app.vue` — minimal root shell wrapping `<NuxtLayout>`, call `useSeoMeta` in `script setup` with baseline site metadata (title: "AKSE — Heritage-Tech Studio", description, og:title, og:description, og:type), set `htmlAttrs: { class: 'bg-background text-foreground font-sans antialiased' }` via `useHead` per FR-001, CAR-005
- [x] T009 Create `layouts/default.vue` — render `<SiteNav />`, `<PageVeil />`, `<ScrollProgress />`, `<main><slot /></main>`, `<SiteFooter />` in correct visual stacking order (nav + progress bar fixed on top, veil overlays everything, main in flow, footer at bottom) per FR-002

**Checkpoint**: Foundation ready — Tailwind, shadcn-vue, GSAP, Geist font, app shell, and layout hierarchy are in place. User story implementation can now begin.

---

## Phase 3: User Story 1 — Desktop Navigation Between Pages (Priority: P1) 🎯 MVP

**Goal**: A visitor can navigate between 4 pages using a fixed glassmorphism nav bar with animated active underline, cinematic page transitions via a fade overlay, and a scroll progress indicator. A 3-column footer is visible on every page.

**Independent Test**: Load the app in a desktop browser. Click each of the four nav links in sequence. Verify: correct dummy page renders, underline animates to the clicked link, page veil fades in/out, scroll progress bar resets on each page, footer visible at bottom.

### Implementation for User Story 1

- [x] T010 [P] [US1] Create `components/PageVeil.vue` — fixed full-screen overlay (`inset-0`, `z-50`, `bg-background`, `pointer-events-none`), listen to `useNuxtApp().hook('page:start')` to fade in and `page:finish` to fade out (300ms via GSAP, ≤50ms under reduced motion), store setTimeout ID and clear on rapid navigation per FR-010, research.md R4
- [x] T011 [P] [US1] Create `components/ScrollProgress.vue` — fixed 3px bar at top of viewport (`z-50`, `bg-primary`/rust), listen to native `scroll` event, compute `progress = scrollY / (scrollHeight - clientHeight)` clamped to `[0, 1]`, render as `width: ${progress * 100}%`, reset to 0 on route change via `watch(route.path)` per FR-011
- [x] T012 [P] [US1] Create `components/SiteFooter.vue` — responsive 3-column grid footer with: (col 1) brand name "AKSE" + tagline, (col 2) company/legal links (About, Tours, Blog, Privacy, Terms), (col 3) social links (placeholders). Use Tailwind utilities, `text-muted-foreground` for links, stack to single column on mobile per FR-009
- [x] T013 [US1] Create `components/SiteNav.vue` — fixed top bar with `backdrop-blur-md bg-background/80` glassmorphism, `<NuxtLink to="/">` wrapping the placeholder logo SVG on the left, desktop nav links (Home `/`, About `/about`, Tours `/tours`, Blog `/blog`) with GSAP-animated underline on active `route.path` match, shadcn `<Button>` CTA "Start Project" linking to `/contact` styled with Rust accent variant, `@supports not (backdrop-filter: blur())` fallback to solid `bg-background` per FR-007, research.md R1
- [x] T014 [P] [US1] Create 4 dummy pages — `pages/index.vue` (heading "Home" + 6+ paragraphs of placeholder text for scroll testing), `pages/about.vue` ("About"), `pages/tours/index.vue` ("Tours"), `pages/blog/index.vue` ("Blog"), each with `<script setup>` and minimal heading per FR-012

**Checkpoint**: Desktop navigation, page transitions, scroll progress, and footer are fully functional. The site can be navigated between all 4 routes with cinematic transitions on desktop.

---

## Phase 4: User Story 2 — Mobile Navigation via Drawer (Priority: P2)

**Goal**: On mobile viewports, a hamburger button replaces the desktop link rail. Tapping it opens a shadcn Sheet drawer from the right with navigation links and CTA. Body scroll is locked while drawer is open. Drawer closes on link tap, outside tap, or Escape.

**Independent Test**: Resize below 768px. Tap hamburger → drawer slides in, body locked. Tap a link → drawer closes, route changes with veil transition. Open drawer, press Escape → closes, scroll restored.

### Implementation for User Story 2

- [x] T015 [US2] Extend `components/SiteNav.vue` — add responsive breakpoint: hide desktop link rail below `md`, show hamburger button (`lucide-vue-next` Menu icon). Wire shadcn `<Sheet>` component (side="right") containing the same nav links + "Start Project" CTA. On link click inside drawer: close sheet, navigate. Sheet's built-in body scroll lock satisfies FR-008. Close drawer on route change via `watch(route.path)` per FR-008

**Checkpoint**: Mobile navigation drawer is functional. The site is fully navigable on both desktop and mobile viewports.

---

## Phase 5: User Story 3 — Smooth Scrolling Experience (Priority: P3)

**Goal**: All scroll interactions are driven by a smooth Lenis provider producing fluid eased motion. Scroll resets on route change. Exactly one smooth-scroll instance is active.

**Independent Test**: Load any page with scroll content. Scroll with mouse wheel — observe eased motion. Navigate to another page — scroll resets to top with no stutter or duplicate providers.

### Implementation for User Story 3

- [x] T016 [US3] Create `plugins/lenis.client.ts` — check `prefers-reduced-motion`, if reduced provide `null` and return early. Otherwise: create single `new Lenis()` instance, run on GSAP ticker (`gsap.ticker.add((t) => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`), wire `lenis.on('scroll', ScrollTrigger.update)`, reset scroll on `router.afterEach` (`lenis.scrollTo(0, { immediate: true })`), add `import.meta.hot.dispose` cleanup (`lenis.destroy()`, `gsap.ticker.remove(cb)`), provide lenis instance via `provide: { lenis }`, import `lenis/dist/lenis.css` per FR-005, FR-014, FR-016, research.md R2, R5
- [x] T017 [US3] Update `components/ScrollProgress.vue` — detect Lenis availability via `useNuxtApp().$lenis`, when Lenis is active read progress from `lenis.on('scroll', ({ progress }))` instead of native scroll event, keep native scroll fallback for reduced-motion mode per data-model.md ScrollProgressState

**Checkpoint**: Smooth scrolling is active on all pages. ScrollProgress reads from Lenis when available. Route changes reset scroll to top.

---

## Phase 6: User Story 4 — Cinematic Dark Theme Presentation (Priority: P4)

**Goal**: Every page consistently presents the brand dark theme with correct color tokens, Geist Sans font, and graceful degradation for unsupported CSS features.

**Independent Test**: Load any page. Verify: dark background `#0e1516`, warm cream text `#e2dad0`, Geist Sans font, Rust accent on CTA button, no white flash on initial load.

### Implementation for User Story 4

- [x] T018 [US4] Add `@supports` backdrop-filter fallback to `components/SiteNav.vue` — when `backdrop-filter: blur()` is not supported, fall back to solid `bg-background` (no transparency). Verify in the same file that all color references use Tailwind token utilities (`bg-background`, `text-foreground`, `text-primary`, `bg-primary`) not raw hex per FR-007 edge case, CAR-003

**Checkpoint**: Dark theme is consistently applied. All edge cases (no backdrop-filter, reduced motion) have fallback behavior.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validation, documentation, and cross-story verification

- [x] T019 [P] Verify no npm/yarn/bun commands remain in any project file — search all `.md`, `.json`, `.ts`, `.sh` files for `npm `, `yarn `, `bun ` and replace with pnpm equivalents per RQ-001
- [x] T020 [P] Verify SSR renders layout correctly — run `pnpm build` and `pnpm preview`, inspect server-rendered HTML for SiteNav, SiteFooter, and page structure present in initial response per RQ-003
- [x] T021 Run `specs/001-core-layout-foundation/quickstart.md` end-to-end validation — follow all setup steps and verification checklists, confirm all acceptance scenarios pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–6)**: All depend on Foundational phase completion
  - US1 can start immediately after Foundational
  - US2 depends on US1 (extends SiteNav.vue created in T013)
  - US3 can start after Foundational (independent of US1/US2 for plugin creation; T017 depends on T011)
  - US4 can start after US1 (extends SiteNav.vue)
- **Polish (Phase 7)**: Depends on all user stories being complete

### Within Each Phase

- Tasks marked [P] can run in parallel (different files, no dependencies)
- Tasks without [P] must run sequentially or after their dependencies

### User Story Dependencies

```
Setup (T001–T004)
  └── Foundational (T005–T009)
        ├── US1 (T010–T014) ← MVP
        │     ├── US2 (T015) ← extends SiteNav
        │     └── US4 (T018) ← extends SiteNav
        └── US3 (T016–T017) ← T017 depends on T011 from US1
              └── (T017 specifically depends on ScrollProgress from T011)
Polish (T019–T021) ← after all stories
```

### Parallel Opportunities

**Within Phase 1 (Setup)**:

```
T001 (sequential — must finish before installing deps)
T002 (sequential — install deps)
T003 + T004 (parallel — shadcn init + nuxt config are independent files)
```

**Within Phase 2 (Foundational)**:

```
T005 (sequential — CSS tokens needed by everything)
T006 + T007 (parallel — SVG + GSAP plugin are independent files)
T008 (sequential — app.vue needs CSS from T005)
T009 (sequential — layout needs app.vue from T008)
```

**Within Phase 3 (US1)**:

```
T010 + T011 + T012 + T014 (parallel — PageVeil, ScrollProgress, SiteFooter, dummy pages are independent files)
T013 (can run in parallel too — SiteNav is independent file)
```

**Across User Stories (after Foundational)**:

```
US1 + US3.T016 (parallel — SiteNav/Footer/PageVeil + Lenis plugin are different files)
US2 + US3.T017 (must be sequential — both touch SiteNav.vue / ScrollProgress.vue)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T004)
2. Complete Phase 2: Foundational (T005–T009)
3. Complete Phase 3: User Story 1 (T010–T014)
4. **STOP and VALIDATE**: Navigate between all 4 pages with desktop nav, verify transitions, scroll progress, and footer
5. Deploy/demo if ready — this is a functional navigable shell

### Incremental Delivery

1. Setup + Foundational → Foundation ready (T001–T009)
2. Add US1 → Desktop navigation works → **MVP deployed** (T010–T014)
3. Add US2 → Mobile navigation works (T015)
4. Add US3 → Smooth scrolling + Lenis integration (T016–T017)
5. Add US4 → Theme polish + fallbacks (T018)
6. Polish → Validation pass (T019–T021)
7. Each story adds value without breaking previous stories

---

## Notes

- [P] indicates tasks that can be run in parallel (different files, no dependency on incomplete tasks)
- [US1]–[US4] labels map tasks to specific user stories for traceability
- T003 (shadcn-vue init) uses `pnpm dlx` — NOT `npx` — per CAR-002
- T016 (Lenis plugin) must import `lenis/dist/lenis.css` for scroll lock classes (research.md R2)
- All authored `.vue` files use `<script setup lang="ts">` per CAR-001
- Commit after each task or logical group
- Stop at any checkpoint to validate the story independently
