---
description: "Task list for About & Process Page (005-about-process-page)"
---

# Tasks: About & Process Page

**Input**: Design documents from `/specs/005-about-process-page/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/component-interfaces.md ✅, quickstart.md ✅

**Tests**: No automated tests requested in spec. Manual verification checklist in quickstart.md.

**Organization**: Tasks are grouped by user story. Each phase (US1–US5) can be demonstrated independently without requiring subsequent phases to be complete.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US5)
- Exact file paths included in all descriptions

---

## Phase 1: Setup

**Purpose**: Create the `components/About/` directory scaffold and the mock image directory. No code logic yet.

- [x] T001 Create `public/images/about/` directory and add `README.md` placeholder noting images are mock stand-ins
- [x] T002 [P] Create empty shell files: `components/About/HeroStory.vue`, `components/About/MissionStatement.vue`, `components/About/ProcessTimeline.vue`, `components/About/TechShowcase.vue`, `components/About/AboutCTA.vue`

**Checkpoint**: Directory structure matches plan.md. `pnpm dev` still compiles without errors.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Update `pages/about.vue` to compose all five sections and register SEO metadata. This is the page root that all user story components plug into — it must exist before any section component can be visually verified.

**⚠️ CRITICAL**: All US phase tasks depend on this phase being complete.

- [x] T003 Replace placeholder content in `pages/about.vue` with the page composition root: import and render `<AboutHeroStory />`, `<AboutMissionStatement />`, `<AboutProcessTimeline />`, `<AboutTechShowcase />`, `<AboutAboutCTA />` inside a single `<div>`, and update `useSeoMeta` with the title `"About — AKSE"` plus a description and OG fields per contracts/component-interfaces.md

**Checkpoint**: Navigate to `/about` in dev. Page renders blank sections (empty components) without 404 or hydration errors.

---

## Phase 3: User Story 1 — Cinematic Hero First Impression (Priority: P1) 🎯 MVP

**Goal**: Full-viewport hero section with animated word-reveal headline and scroll-scrubbed parallax image. Page nav to `/about` immediately delivers a cinematic first impression.

**Independent Test**: Navigate to `/about`. Confirm the headline "Preserving the Past. Building the Future." animates word-by-word on load. Scroll slowly — image should scale down from 1.08 to 1.0 and blur should clear, tied to scroll position.

### Implementation for User Story 1

- [x] T004 [US1] Implement static markup and layout in `components/About/HeroStory.vue`: full-viewport `<section>` with `min-h-screen`, centered headline block using `overflow-hidden inline-block` word spans (split from `heroCopy.headline`), tagline below headline, and wide cinematic image container (`w-full aspect-[21/9] md:aspect-[16/7] overflow-hidden rounded-2xl mt-12`) with `<img>` referencing `/images/about/hero-camera-rig.jpg` and a `bg-muted` fallback on the container
- [x] T005 [US1] Add TypeScript types and mock data constant `heroCopy` (headline, tagline, heroImage, heroImageAlt) to `components/About/HeroStory.vue` per data-model.md `HeroCopy` entity; add `words` computed property splitting headline by space
- [x] T006 [US1] Implement word-reveal animation in `components/About/HeroStory.vue` `onMounted`: retrieve `$gsap` from `useNuxtApp()`; check `prefersReduced`; if not reduced, run `gsap.from(wordInnerRefs, { y: '110%', opacity: 0, stagger: 0.08, ease: 'power3.out', duration: 0.9 })` on the inner word spans; also fade in tagline after headline completes; store timeline ref for cleanup
- [x] T007 [US1] Implement scroll-scrubbed hero image effect in `components/About/HeroStory.vue` `onMounted`: create ScrollTrigger on `heroRef` (`start: 'top top'`, `end: 'bottom top'`, `scrub: true`) animating `imageRef` from `{ scale: 1.08, filter: 'blur(8px)' }` to `{ scale: 1.0, filter: 'blur(0px)' }`; skip if `prefersReduced`; kill ScrollTrigger in `onBeforeUnmount`

**Checkpoint**: User Story 1 fully functional. Navigate to `/about`, verify word-reveal plays, scroll and verify image scrub. Works in both light and dark modes.

---

## Phase 4: User Story 2 — Mission Philosophy Scroll-Reveal (Priority: P1)

**Goal**: Mission statement section with three oversized pillar words and per-line scroll-linked opacity, making the philosophy legible through progressive scrolling.

**Independent Test**: Scroll into the mission section below the hero. All `missionLines` should start at ~0.2 opacity. As each line enters the scroll zone it brightens to full opacity. Scrolling back dims them. Three pillar words (Preserve / Present / Elevate) appear oversized.

### Implementation for User Story 2

- [x] T008 [US2] Implement static markup and layout in `components/About/MissionStatement.vue`: section with `py-24 md:py-32 px-6 lg:px-12`, a `max-w-5xl mx-auto` content wrapper, each `missionLines` string rendered as `<span class="mission-line block text-xl md:text-2xl leading-relaxed text-foreground">`, and a pillars block with each pillar `word` at `text-6xl md:text-8xl lg:text-9xl font-bold text-primary` and `description` at `text-base text-muted-foreground mt-2`
- [x] T009 [US2] Add TypeScript types and mock data constants `pillars` (Pillar[]) and `missionLines` (string[]) to `components/About/MissionStatement.vue` per data-model.md; add `sectionRef` template ref on the outer section element
- [x] T010 [US2] Implement per-line opacity ScrollTrigger in `components/About/MissionStatement.vue` `onMounted`: retrieve `$gsap` and `$ScrollTrigger`; check `prefersReduced`; if not reduced, use `gsap.utils.toArray('.mission-line', sectionRef.value)` to get line elements; for each element create `gsap.fromTo(el, { opacity: 0.2 }, { opacity: 1, scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 45%', scrub: true } })`; store all ScrollTrigger instances in `const sts: ScrollTrigger[] = []`; if `prefersReduced`, set all lines to opacity 1 immediately; kill all instances in `onBeforeUnmount`

**Checkpoint**: User Stories 1 AND 2 both independently functional. Mission lines illuminate per scroll.

---

## Phase 5: User Story 3 — 360° Process Deep-Dive (Priority: P1)

**Goal**: Sticky split-screen timeline with five process steps and image crossfade, giving a visitor a clear sequential understanding of AKSE's production workflow.

**Independent Test**: Scroll into the process section on desktop (≥ 768px). Left column heading stays fixed. Scrolling through the five steps causes the companion image to crossfade. On mobile, steps are stacked vertically with inline images.

### Implementation for User Story 3

- [x] T011 [US3] Add TypeScript types and mock data `steps: ProcessStep[]` array (all five steps with number, title, summary, description, image, imageAlt) to `components/About/ProcessTimeline.vue` per data-model.md; add `sectionRef`, `stepRefs`, and `imageRefs` template refs
- [x] T012 [US3] Implement desktop layout markup in `components/About/ProcessTimeline.vue`: outer `<section ref="sectionRef">` with `px-6 lg:px-12 py-24 md:py-32`; inner `max-w-7xl mx-auto` with `md:grid md:grid-cols-2 md:gap-16`; left column `md:sticky md:top-24 md:self-start` containing section label, heading "How We Capture Reality", descriptor text, and the image stack container (`relative aspect-[4/3] overflow-hidden rounded-2xl`); image stack has five `<img>` or `bg-muted` containers as `absolute inset-0 w-full h-full object-cover` elements each assigned to `imageRefs`
- [x] T013 [US3] Implement right column step list in `components/About/ProcessTimeline.vue`: five step `<div>` blocks each assigned to `stepRefs` with `min-h-[50vh] flex flex-col justify-center py-12`; each block shows zero-padded number badge (`String(step.number).padStart(2, '0')`), title, summary, and description; add border/divider between steps
- [x] T014 [US3] Implement mobile layout variant in `components/About/ProcessTimeline.vue`: below `md`, render a single-column list where the left-column content renders as a static non-sticky section header once at the top; each step renders with its image inline (`<img>` with `aspect-video w-full object-cover rounded-xl mb-6`) above the step text; no crossfade HTML needed on mobile
- [x] T015 [US3] Implement image crossfade ScrollTriggers in `components/About/ProcessTimeline.vue` `onMounted`: use `gsap.matchMedia()` with breakpoint `'(min-width: 768px)'`; inside the callback, check `prefersReduced`; if desktop + not reduced: set `imageRefs[1..4]` to `autoAlpha: 0` (first visible); for each `stepRefs[i]` create `ScrollTrigger.create({ trigger: stepRefs[i], start: 'top center', onEnter: () => { gsap.to(imageRefs[i], { autoAlpha: 1, duration: 0.6 }); if (i > 0) gsap.to(imageRefs[i-1], { autoAlpha: 0, duration: 0.6 }) }, onLeaveBack: () => { ... } })`; store all instances; kill in `onBeforeUnmount`

**Checkpoint**: User Story 3 independently functional. Scroll through all five steps on desktop and verify sequential crossfade. Verify mobile stacked layout. Verify reduced-motion shows all images at initial state.

---

## Phase 6: User Story 4 — Tech Stack & VR Showcase (Priority: P2)

**Goal**: Bento-grid of seven tech cards with magnetic hover and accent border glow, establishing technical credibility.

**Independent Test**: Scroll to the tech section. Seven cards render in a varied bento grid. On desktop with a pointer device, hover a card — it should pull magnetically toward cursor and spring back on exit. Border glows with orange (light) or rust (dark) on hover. On touch/mobile, cards render flat.

### Implementation for User Story 4

- [x] T016 [P] [US4] Add TypeScript types and `techItems: TechItem[]` mock data array (seven items with name, description, category, icon, size) to `components/About/TechShowcase.vue` per data-model.md; define `sizeClass` helper computing Tailwind `col-span` from `size`
- [x] T017 [US4] Implement bento grid markup in `components/About/TechShowcase.vue`: outer `<section>` with `py-24 md:py-32 px-6 lg:px-12`; `max-w-7xl mx-auto` wrapper with section heading (`text-3xl md:text-4xl font-bold mb-12`); grid `grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6`; for each `techItem`, render `<MagneticWrapper :strength="0.2">` wrapping a shadcn-vue `<Card>` with class `"h-full cursor-default transition-shadow duration-300 hover:shadow-[0_0_0_1.5px_hsl(var(--primary)),_0_0_18px_2px_hsl(var(--primary)/0.3)]"` and `col-span` class from `sizeClass(item.size)`; inside `<CardContent>`, render Lucide icon, name, category badge, and description
- [x] T018 [US4] Import required Lucide icons (`Camera`, `RotateCcw`, `Wind`, `Globe`, `Glasses`, `Layers`, `MapPin`) from `lucide-vue-next` in `components/About/TechShowcase.vue`; create an icon map object keyed by string name so each `techItem.icon` string resolves to the correct component; render via `<component :is="iconMap[item.icon]" />`

**Checkpoint**: User Story 4 independently functional. Seven cards render with correct grid spans. Magnetic hover and border glow work on pointer devices.

---

## Phase 7: User Story 5 — Bottom CTA & Page Completion (Priority: P2)

**Goal**: High-contrast dual-action CTA block at the bottom of the page, converting engaged visitors toward `/contact` or `/tours`.

**Independent Test**: Scroll to the bottom of `/about`. Two buttons visible: "Start a Project" (→ `/contact`) and "View the Archive" (→ `/tours`). Both navigate correctly via SPA. Layout is high-contrast in both themes.

### Implementation for User Story 5

- [x] T019 [P] [US5] Add mock copy constant `ctaCopy` (headline, subtext, primaryCta, secondaryCta with labels and hrefs) to `components/About/AboutCTA.vue` per contracts/component-interfaces.md internal data
- [x] T020 [US5] Implement CTA markup in `components/About/AboutCTA.vue`: full-width `<section>` with high-contrast background (use `bg-foreground text-background` or `bg-primary text-primary-foreground`); `text-center py-24 md:py-40 px-6`; `max-w-3xl mx-auto` content wrapper; headline at `text-4xl md:text-5xl font-bold mb-6`; subtext at `text-lg md:text-xl text-muted-foreground mb-12` (adjust for contrast background); two `<NuxtLink>` buttons using shadcn-vue `<Button>`: primary variant for `/contact`, outline/ghost variant for `/tours`

**Checkpoint**: User Story 5 independently functional. Both nav links route correctly. Section has strong contrast in both themes.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, SSR verification, reduced-motion guard audit, and cleanup.

- [x] T021 Audit all five `components/About/*.vue` files: verify every `<img>` tag has a non-empty `alt` attribute matching the `imageAlt` mock data values
- [x] T022 [P] Audit `onMounted` / `onBeforeUnmount` lifecycle pairing in `HeroStory.vue`, `MissionStatement.vue`, and `ProcessTimeline.vue` — confirm every ScrollTrigger and GSAP timeline created in `onMounted` has a corresponding `.kill()` in `onBeforeUnmount`
- [x] T023 [P] Verify `prefers-reduced-motion` guard fires correctly in all three animated components (`HeroStory.vue`, `MissionStatement.vue`, `ProcessTimeline.vue`): with DevTools emulation enabled, confirm no stagger/scrub animations run and all text/images appear immediately at their end-state
- [x] T024 Run SSR verification: `pnpm build && pnpm preview` → `view-source:http://localhost:3000/about` MUST contain inline text for the headline, all `missionLines`, all five step titles, and all seven tech item names; fix any component that wraps text content in `<ClientOnly>` or computes it only in `onMounted`
- [x] T025 [P] Verify Lenis + CSS sticky compatibility for `ProcessTimeline.vue`'s left column on desktop: if the sticky column wobbles or lags during smooth scroll, implement the GSAP `pin` fallback documented in research.md R-002 (replace `md:sticky md:top-24 md:self-start` with a `ScrollTrigger.create({ pin: leftColEl, ... })` setup)
- [x] T026 Run quickstart.md verification checklist: manually step through all 40 items across the six sections (Hero, Mission, Process desktop, Process mobile, Tech Showcase, CTA) and confirm all pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all US phases
- **Phases 3–7 (US1–US5)**: All depend on Phase 2 completion
  - US1, US2, US3 are all P1 and should be done first, sequentially (they build the primary narrative)
  - US4 and US5 are P2 and can be done after US1–3 or in parallel with each other
- **Phase 8 (Polish)**: Depends on Phases 3–7 all complete

### User Story Dependencies

| Story         | Depends On | Notes                                         |
| ------------- | ---------- | --------------------------------------------- |
| US1 — Hero    | Phase 2    | Fully independent — test at `/about`          |
| US2 — Mission | Phase 2    | Fully independent — scroll past hero          |
| US3 — Process | Phase 2    | Fully independent — scroll to process section |
| US4 — Tech    | Phase 2    | Fully independent — scroll to tech section    |
| US5 — CTA     | Phase 2    | Fully independent — scroll to bottom          |

No user story depends on another user story being complete. Each can be implemented, tested, and demonstrated in isolation once Phase 2 is done.

### Within Each User Story

- Static markup and data → GSAP animation setup
- Refs/template wiring → `onMounted` animation blocks
- Desktop layout → mobile responsive variant
- Implementation complete → lifecycle cleanup (`onBeforeUnmount`)

### Parallel Opportunities Per User Story

**US1 (Hero)**  
T004 (markup) → T005 (types/data) are both independent of each other; T006 and T007 both depend on T004+T005 but are independent of each other:

```
T004 + T005 (parallel)
     ↓
T006 + T007 (parallel)
```

**US3 (Process)**  
T011 (data) can run alongside T012 (desktop markup); T013 (right column) can run alongside T014 (mobile layout); T015 (crossfade logic) depends on T012+T013:

```
T011 + T012 + T013 + T014 (parallel)
                 ↓
              T015
```

**US4 (Tech)**  
T016 (data) and T017 (markup) are independent; T018 (icon resolution) depends on T017 but is small:

```
T016 + T017 (parallel)
       ↓
     T018
```

**US5 (CTA)**  
T019 (data) and T020 (markup) depend on each other sequentially but both are trivial — treat as one unit.

**Phase 8 (Polish)**  
T021, T022, T023, T024, T025, T026 are all independent — can all run in parallel:

```
T021 + T022 + T023 + T024 + T025 + T026 (fully parallel)
```

---

## Implementation Strategy

### MVP First (User Stories 1–3 Only)

1. Complete Phase 1: Setup (T001–T002)
2. Complete Phase 2: Foundational (T003) — CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 — Hero (T004–T007)
4. Complete Phase 4: User Story 2 — Mission (T008–T010)
5. Complete Phase 5: User Story 3 — Process Timeline (T011–T015)
6. **STOP and VALIDATE**: All three P1 stories working. Page tells the full AKSE narrative.
7. Deploy/demo MVP.

### Full Delivery

8. Complete Phase 6: User Story 4 — Tech Showcase (T016–T018)
9. Complete Phase 7: User Story 5 — CTA (T019–T020)
10. Complete Phase 8: Polish (T021–T026)
11. Final SSR build verification and quickstart checklist sign-off.
