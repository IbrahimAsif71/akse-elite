# Tasks: Heritage-Focused Home Page

**Input**: Design documents from `/specs/008-heritage-home-page/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: No automated test tasks — no test framework is configured in this project. Verification is manual per quickstart.md checklist.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Exact file paths included in all task descriptions

---

## Phase 1: Setup (No New Dependencies)

**Purpose**: Confirm environment and branch readiness. All packages are already installed.

- [x] T001 Confirm active branch is `008-heritage-home-page` and `pnpm install` produces no new lockfile mutations
- [x] T002 Run `pnpm dev` and verify homepage loads at `http://localhost:3000/` without build errors before any changes

**Checkpoint**: Dev server confirms current state is stable — ready to add global infrastructure.

---

## Phase 2: Foundational — Global Ambient Infrastructure

**Purpose**: Film-grain overlay and custom cursor must exist before any section component is built. Both are cross-cutting and affect every story.

**⚠️ CRITICAL**: Complete before any user story phase — section components depend on the cursor and grain being in place.

- [x] T003 Add `html::before` film-grain overlay to `assets/css/main.css` — SVG fractalNoise, `z-index: 9998`, `pointer-events: none`, `mix-blend-mode: multiply`, `opacity: 0.03`
- [x] T004 Create `composables/useCustomCursor.ts` — GSAP `quickTo` cursor, renders `#__akse-cursor` orange ring, SSR-safe, pointer-device only, `prefers-reduced-motion` guard, idempotent `init()` / `destroy()`
- [x] T005 Modify `app.vue` — import `useCustomCursor`, call `init` in `onMounted`, call `destroy` in `onBeforeUnmount`

**Checkpoint**: Open `http://localhost:3000/any-page`. Subtle grain visible on beige background. On pointer device, orange ring cursor replaces native cursor and follows mouse with inertia.

---

## Phase 3: User Story 1 — Cinematic Hero First Impression (Priority: P1) 🎯 MVP

**Goal**: Full-viewport hero section with GSAP fade-up copy, interactive cobe globe (matte sand + orange markers), film-grain atmosphere, and custom cursor interaction.

**Independent Test**: Navigate to `/`. Confirm: 100vh beige hero visible, globe renders and auto-rotates with orange markers, text stagger-fades upward on load (1.5s min per element), grain overlay subtly present, custom cursor disc follows mouse.

### Implementation for User Story 1

- [x] T006 [P] [US1] Create `components/Home/InteractiveGlobe.vue` — `createGlobe` from `cobe` 0.6.5, canvas with `role="img"` + `aria-label`, `baseColor:[0.94,0.89,0.81]`, `markerColor:[0.788,0.396,0.239]`, `glowColor:[0.82,0.65,0.45]`, `diffuse:0.9`, `mapBrightness:4.5`, `dark:0`, `mapSamples:16000`, four Pakistani city markers (Rawalpindi 33.6008/73.0679, Hasanabdal 33.7019/72.6899, Lahore 31.5497/74.3436, Gilgit 35.9208/74.3081 — size 0.04 each), auto-rotation (`phi += 0.003`), drag via `pointerdown/pointermove/pointerup`, `devicePixelRatio` capped at 2, `size` prop (default 500), WebGL try/catch fallback renders beige placeholder `<div>`, `globeInstance.destroy()` in `onBeforeUnmount`
- [x] T007 [US1] Create `components/Home/HeroCultural.vue` — full-viewport `min-h-screen bg-background` two-column layout (copy left, `<HomeInteractiveGlobe>` right), verbatim copy: headline `"Immersive Cultural Exploration"` (`<h1 font-light tracking-tighter text-foreground>`), subhead `"Step into places where history, space, and technology converge."`, body paragraph from spec; GSAP `gsap.context()` timeline `{ defaults: { duration: 1.5, ease: 'power2.out' } }` with `.from(headlineRef, { y:40, opacity:0 }, 0)` / `.from(subheadRef, { y:30, opacity:0 }, 0.3)` / `.from(bodyRef, { y:20, opacity:0 }, 0.6)`; reduced-motion check via `gsap.defaults().duration < 0.1` skip; `ctx.revert()` in `onBeforeUnmount`; ZERO `dark:` classes

**Checkpoint**: `HeroCultural` complete — US1 independently testable. Globe renders with sand finish and orange markers, hero copy stagger-fades on page load, custom cursor visible, grain texture faint but present.

---

## Phase 4: User Story 2 — Digital Heritage Editorial (Priority: P2)

**Goal**: Asymmetric editorial split — dominant text column with oversized headline, parallax architectural image on the other side.

**Independent Test**: Scroll to `DigitalHeritage` section. Confirm: `"Digital Heritage Platform"` headline renders at `text-5xl` or larger, full body copy is present, image column visible on desktop (asymmetric `3fr / 2fr` grid), scrolling causes image to translate at noticeably different speed from page content.

### Implementation for User Story 2

- [x] T008 [US2] Create `components/Home/DigitalHeritage.vue` — `grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12`, text column with `<h2 class="text-5xl lg:text-7xl font-light tracking-tight text-foreground">Digital Heritage Platform</h2>`, subhead `"Preserving meaningful places through immersive technology."`, body paragraph from spec; image column using `public/images/about/step-02-capture.png` wrapped in `overflow-hidden`; GSAP `$gsap.to(imageRef, { yPercent: -20, ease:'none', scrollTrigger: { trigger: sectionRef, start:'top bottom', end:'bottom top', scrub:true } })`; `scrollTrigger?.kill()` in `onBeforeUnmount`; ZERO `dark:` classes
- [x] T009 [US2] Add `<HomeDigitalHeritage />` to `pages/index.vue` below `<HomeHeroCultural />`

**Checkpoint**: US2 independently testable. Scroll past hero → editorial section visible with oversized headline and parallax image movement.

---

## Phase 5: User Story 3 — Immersive Exploration Portal (Priority: P2)

**Goal**: Centrally framed portal element that scale-scrubs from 0.42 to 0.95 as user scrolls through the pinned section, simulating entering a tour space.

**Independent Test**: Scroll through `ImmersiveExploration` section. Confirm: portal frame visible at modest initial size, scrolling causes smooth scale-up to near full-width (GSAP ScrollTrigger — not CSS transition), copy `"Immersive Exploration"` / `"Move through spaces as though you were there."` legible during scroll, section tall enough for gradual scrub (`min-h-[180vh]`).

### Implementation for User Story 3

- [x] T010 [US3] Create `components/Home/ImmersiveExploration.vue` — `relative min-h-[180vh]` section, centered text header (headline `"Immersive Exploration"`, subhead, body from spec), portal `<div ref="portalRef">` with `border border-border rounded-lg overflow-hidden aspect-video w-[95%]` containing interior image `public/images/tours/lahore_old_city_heritage_1773010984542.png`; in `onMounted`: `$gsap.set(portalRef, { scale:0.42, transformOrigin:'center center' })` then `$gsap.to(portalRef, { scale:0.95, ease:'none', scrollTrigger:{ trigger:sectionRef, start:'top 80%', end:'bottom center', scrub:1 } })`; `await nextTick(); setTimeout(() => $ScrollTrigger.refresh(), 300)`; `scrollTrigger?.kill()` in `onBeforeUnmount`; ZERO `dark:` classes
- [x] T011 [US3] Add `<HomeImmersiveExploration />` to `pages/index.vue` below `<HomeDigitalHeritage />`

**Checkpoint**: US3 independently testable. Enter section → portal small and centered. Scroll → portal expands to near full-width with a slow, premium scrub pace. Copy remains legible throughout.

---

## Phase 6: User Story 4 — Museum-Style Experiences Gallery (Priority: P3)

**Goal**: Portrait-orientation gallery with four location images and generous beige negative space. Hover/tap reveals category, title, and an orange line animating left-to-right.

**Independent Test**: Scroll to `FeaturedExperiences`. Confirm: four portrait images in `grid-cols-2 lg:grid-cols-4` with `aspect-[3/4]` and generous gaps, hovering any card reveals category + title + orange accent line that draws from left over ≥0.6s, headline `"Featured Experiences"` and subhead present.

### Implementation for User Story 4

- [x] T012 [US4] Create `components/Home/FeaturedExperiences.vue` — `EXPERIENCE_CARDS` inline data array (4 items: Lahore Old City / Heritage / `/images/tours/lahore_old_city_heritage_1773010984542.png`, Rohtas Fort / Heritage / `/images/tours/rohtas_fort_heritage_1773010968806.png`, Taxila Museum / Museum / `/images/tours/taxila_museum_heritage_1773011014212.png`, Hunza Valley / Nature / `/images/tours/hunza_valley_adventure_1773011000439.png`); section header copy from spec (`"Featured Experiences"`, subhead, body); `grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10`; each card: `group relative overflow-hidden`, image with `aspect-[3/4] w-full object-cover`, hover overlay `absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`, individual `accentLineRef` per card; GSAP on `mouseenter`: `$gsap.to(accentLineRef, { scaleX:1, duration:0.7, ease:'power2.out', transformOrigin:'left center' })`, on `mouseleave`: `$gsap.to(accentLineRef, { scaleX:0, duration:0.4, ease:'power2.in', transformOrigin:'left center' })`; `NuxtLink` wrapper if `card.slug` exists; ZERO `dark:` classes
- [x] T013 [US4] Add `<HomeFeaturedExperiences />` to `pages/index.vue` below `<HomeImmersiveExploration />`

**Checkpoint**: US4 independently testable. Four portrait museum cards render with ample whitespace. Hovering any card → slow metadata reveal, orange line draws left-to-right over ~0.7s.

---

## Phase 7: User Story 5 — Magnetic Call-to-Action Finale (Priority: P3)

**Goal**: Warm radial orange gradient CTA section with verbatim copy and a MagneticWrapper-wrapped primary button that physically pulls toward the cursor.

**Independent Test**: Scroll to `CreateTourCTA`. Confirm: orange radial gradient subtly visible blending into beige, `"Create a Tour With Us"` headline and full body copy present, primary button rendered in `bg-primary` orange, cursor approaching button causes displacement toward cursor, touch devices show static button without artifacts.

### Implementation for User Story 5

- [x] T014 [US5] Create `components/Home/CreateTourCTA.vue` — `min-h-[60vh] flex flex-col items-center justify-center text-center`, radial gradient applied via scoped CSS or `:style`: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,101,61,0.15) 0%, transparent 70%)` composited over `var(--bg)`; verbatim copy: `"Create a Tour With Us"` (`<h2>`), `"Transform your location into a digital destination."` subhead, body paragraph from spec; `<MagneticWrapper :strength="0.3">` wrapping `<NuxtLink to="/contact"><Button size="lg" class="bg-primary text-primary-foreground">Get in Touch</Button></NuxtLink>`; ZERO `dark:` classes
- [x] T015 [US5] Add `<HomeCreateTourCTA />` to `pages/index.vue` below `<HomeFeaturedExperiences />`

**Checkpoint**: US5 independently testable. Orange atmospheric glow visible. Button pulls toward cursor. All five sections now visible in scroll order on `/`.

---

## Phase 8: Page Orchestrator & SEO

**Purpose**: Wire the final `pages/index.vue` orchestrator with `useSeoMeta` and correct component import order. Must come after all section components exist.

- [x] T016 Rewrite `pages/index.vue` as clean orchestrator — import and render five sections in order: `<HomeHeroCultural />`, `<HomeDigitalHeritage />`, `<HomeImmersiveExploration />`, `<HomeFeaturedExperiences />`, `<HomeCreateTourCTA />`; add `useSeoMeta({ title:'AKSE — Immersive Cultural Exploration', description:'AKSE is a digital platform that transforms real-world locations into immersive virtual tours...', ogTitle:'AKSE — Immersive Cultural Exploration', ogDescription:'...', ogImage:'/images/og-home.jpg' })`; ZERO `dark:` classes; no GSAP code in this file

**Checkpoint**: `pages/index.vue` is a clean orchestrator. All five sections render in scroll sequence. Page title in browser tab reads "AKSE — Immersive Cultural Exploration".

---

## Phase 9: Legacy Cleanup

**Purpose**: Delete seven legacy `components/Home/` files that were exclusively referenced from `pages/index.vue`. Safe to delete now that the orchestrator has been rewritten.

- [x] T017 [P] Delete `components/Home/HeroCinematic.vue`
- [x] T018 [P] Delete `components/Home/Aurora.vue`
- [x] T019 [P] Delete `components/Home/MassiveCTA.vue`
- [x] T020 [P] Delete `components/Home/ProcessPinned.vue`
- [x] T021 [P] Delete `components/Home/FeaturedTours.vue`
- [x] T022 [P] Delete `components/Home/MagicBento.vue`
- [x] T023 [P] Delete `components/Home/FlowingMenu.vue`

**Checkpoint**: Run `pnpm dev` and navigate to `/`, `/about`, `/tours`. Zero "component not found" errors in console. No broken imports across the app.

---

...existing code...

- [x] T024 Audit zero `dark:` utility classes in all new files: `grep -r "dark:" pages/index.vue components/Home/HeroCultural.vue components/Home/InteractiveGlobe.vue components/Home/DigitalHeritage.vue components/Home/ImmersiveExploration.vue components/Home/FeaturedExperiences.vue components/Home/CreateTourCTA.vue composables/useCustomCursor.ts` — must return no results
- [x] T025 Verify GSAP cleanup in all section components: `grep -r "onBeforeUnmount\|onUnmounted" components/Home/HeroCultural.vue components/Home/ImmersiveExploration.vue components/Home/DigitalHeritage.vue` — each file must have at least one match
- [x] T026 Verify `useSeoMeta` present: `grep "useSeoMeta" pages/index.vue` — must return match
- [x] T027 Verify no duplicate Lenis providers: `grep -r "new Lenis\|studio-freight" plugins/ composables/` — must match `lenis.client.ts` only
- [x] T028 Run viewport QA at 375px, 768px, 1280px, 1920px — verify hero stacks on mobile, editorial split is side-by-side on tablet+, no font size runaway on 1920px

**Checkpoint**: All audits pass, build green, feature branch ready for review.

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 8 (Orchestrator)**: Depends on ALL section components existing (Phases 3–7 complete)
- **Phase 10 (Audit)**: Depends on Phase 9 (cleanup complete)

### User Story Dependencies

| US3 — Immersive Exploration Portal | P2 | Phase 2 | ✅ Yes — scroll scrub works in isolation |
| US5 — Magnetic CTA | P3 | Phase 2, `MagneticWrapper` exists | ✅ Yes — MagneticWrapper already in codebase |

### Within Each User Story

- No `dark:` classes at any point during implementation

### Parallel Opportunities

- **T006 (InteractiveGlobe)**: Can be developed in parallel with T003/T004/T005 — different files, no dependencies

---

## Parallel Example: Phase 2 + Globe Preflight

```

```

Once T003–T006 are done:

```

```

---

## Implementation Strategy

1. Phases 1–2: Infrastructure (grain + cursor) — no visual changes on existing page
2. Phase 3: Hero + globe — page has a complete above-the-fold experience (MVP)
3. Phases 8–10: Orchestrator, cleanup, and audit — ship-ready state
   **Scope**: 26 tasks total — 1 composable, 6 new components, 1 page rewrite, 1 CSS modification, 1 app.vue modification, 7 deletions, 5 audit/verification tasks.
