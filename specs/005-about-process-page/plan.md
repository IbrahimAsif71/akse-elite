# Implementation Plan: About & Process Page

**Branch**: `005-about-process-page` | **Date**: 2026-03-09 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-about-process-page/spec.md`

## Summary

Build the `pages/about.vue` About / Our Process page for the AKSE platform, replacing the existing placeholder content. The page uses five sequentially composed components: a typography-driven hero with animated word-reveal and scroll-scrubbed parallax image (`HeroStory.vue`); a mission pillar section with per-line scroll-linked opacity (`MissionStatement.vue`); a sticky split-screen process timeline with five steps and companion image crossfade (`ProcessTimeline.vue`); a bento-grid tech showcase with magnetic hover and accent border glow (`TechShowcase.vue`); and a bottom CTA (`AboutCTA.vue`). All content is static mock data. No new npm dependencies required. All animation uses the existing `$gsap` / `$ScrollTrigger` singletons and the single `$lenis` instance.

## Technical Context

**Language/Version**: TypeScript (Nuxt 4 / Vue 3 Composition API)  
**Primary Dependencies**: Nuxt 4, Vue 3, Tailwind CSS v4, shadcn-vue, GSAP 3.14.x + ScrollTrigger (existing `gsap.client.ts`), Lenis 1.3.x (existing `lenis.client.ts`), @nuxtjs/color-mode 4.x  
**Storage**: N/A — all content is inline static mock data  
**Testing**: Manual visual verification (no automated test framework configured in this project)  
**Target Platform**: Web (SSR + client hydration), Netlify deployment  
**Project Type**: Nuxt web app (SSR)  
**Performance Goals**: 60fps scroll animation budget; all scroll-triggered effects must not cause layout reflow (GPU-composited transforms and opacity only)  
**Constraints**: SplitText is NOT available in gsap@3.14.2 free tier — word-splitting uses Vue template spans (see R-001). Sticky split-screen and magnetic hover are desktop-only (≥ md breakpoint). All text content must be SSR-rendered for indexability.  
**Scale/Scope**: Single page + five new component files. No new npm packages.

**Package Manager**: pnpm (required)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Nuxt 4 + Vue 3 Composition API + `script setup` confirmed for all five new `components/About/` files and the modified `pages/about.vue`
- [x] pnpm-only workflow confirmed — `pnpm dev` / `pnpm build` only; no new package installs required
- [x] Tailwind CSS utilities for all structural layout; shadcn-vue Card used for TechShowcase items; raw CSS limited to existing token declarations in `main.css`
- [x] Motion plan uses `$gsap` + `$ScrollTrigger` from `gsap.client.ts`; uses single `$lenis` instance from `lenis.client.ts`; no `@studio-freight/lenis`; no new providers added
- [x] No Sanity fetch required (mock data only). Page is indexable — all visible text (mock) is server-rendered in SSR HTML. No client-only text content exceptions.
- [x] SEO plan: `useSeoMeta` in `pages/about.vue` `script setup` with title + description. Sitemap + favicon are pre-existing infrastructure, unchanged.
- [x] Legacy cleanup scope: `pages/about.vue` placeholder prose replaced entirely. `components/About/` directory does not currently exist — no legacy artifacts to clean. All existing components/plugins untouched.

### Post-Design Re-check

- [x] All Phase 1 artifacts (data-model.md, contracts/, quickstart.md) use pnpm-only commands
- [x] Component interface contracts show all new components use `script setup` + Composition API
- [x] No new raw CSS structural layout introduced — all layout via Tailwind utility classes
- [x] No constitution violations requiring complexity tracking

## Project Structure

### Documentation (this feature)

```text
specs/005-about-process-page/
├── plan.md                              # This file
├── research.md                          # Phase 0: Technology decisions
├── data-model.md                        # Phase 1: Entity definitions
├── quickstart.md                        # Phase 1: Setup & verification
├── contracts/
│   └── component-interfaces.md          # Phase 1: Component prop/emit/slot contracts
├── checklists/
│   └── requirements.md                  # Spec quality checklist
└── tasks.md                             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
pages/
└── about.vue                            # Modified — replaces placeholder, composes five sections

components/
└── About/
    ├── HeroStory.vue                    # New — word-reveal headline + scrubbed parallax image
    ├── MissionStatement.vue             # New — oversized typographic pillars + per-line opacity scrub
    ├── ProcessTimeline.vue              # New — sticky split-screen with 5 steps + image crossfade
    ├── TechShowcase.vue                 # New — bento grid with magnetic cards + accent glow
    └── AboutCTA.vue                     # New — dual-action CTA block

public/
└── images/
    └── about/
        ├── hero-camera-rig.jpg          # Mock hero image (placeholder / existing asset)
        ├── step-01-assessment.jpg       # Mock step visuals (5 total)
        ├── step-02-capture.jpg
        ├── step-03-editing.jpg
        ├── step-04-stitching.jpg
        └── step-05-deployment.jpg
```

**Structure Decision**: Nuxt convention — page-scoped components in `components/About/`. No new directories beyond this. Mock images co-located under `public/images/about/`. Existing `MagneticWrapper.vue` at `components/MagneticWrapper.vue` is consumed as-is without modification.

## Key Technical Decisions

### Text Reveal: Vue Template Word Splitting + GSAP Stagger (not SplitText)

- **Why**: GSAP SplitText requires a paid Club/Business license. Not included in `gsap@3.14.2` free tier (confirmed by 004 research R-002, 2026-03-06). Vue template word splitting achieves identical visual output.
- **Pattern**: Compute `headline.split(' ')` → render each word in an `overflow: hidden` container (`<span class="overflow-hidden inline-block">`) wrapping an inner `<span>` → GSAP `from({ y: '110%', opacity: 0 })` with `stagger: 0.08` per word.
- **Research**: [R-001 in research.md](research.md#r-001-text-reveal--template-word-splitting-not-splittext)

### Sticky Split-Screen: CSS `position: sticky` (not GSAP pin)

- **Why**: The spec's left-column title merely needs to stay in view while the right column scrolls vertically. CSS `position: sticky; top: ...` handles this natively at zero JS cost. GSAP `pin: true` introduces a height-reservation mechanism suitable for transforms — unnecessary when sticky positioning suffices.
- **Pattern**: Left column `sticky top-24 self-start` (Tailwind). Right column `overflow-y-auto` or normal document flow. GSAP ScrollTrigger used only for the image crossfade, not for the pin.
- **Research**: [R-002 in research.md](research.md#r-002-sticky-split-screen--css-sticky-not-gsap-pin)

### Per-Line Opacity Scrub: Individual ScrollTrigger per Line Element

- **Why**: Achieved by querying each line element with `gsap.utils.toArray()` and creating one ScrollTrigger per line with `scrub: true`. Each trigger watches that line's entry into the viewport. Bidirectional (scrub going backward restores low opacity).
- **Pattern**: `gsap.fromTo(line, { opacity: 0.2 }, { opacity: 1, scrollTrigger: { trigger: line, start: 'top 80%', end: 'top 45%', scrub: true } })`
- **Research**: [R-003 in research.md](research.md#r-003-per-line-opacity-scrub--individual-scrolltrigger-per-element)

### Image Crossfade: ScrollTrigger `onEnter` / `onLeave` Callbacks

- **Why**: Each step's visual needs to become fully opaque when that step enters the active zone and fade back when leaving. GSAP timeline with `autoAlpha` transitions between a stack of absolutely-positioned images. ScrollTrigger `toggleActions` alone is insufficient — crossfade requires opacity animation coordinated across multiple elements simultaneously.
- **Pattern**: Stack all five step images (`position: absolute`, all but first at `opacity: 0`). For each step's ScrollTrigger: `onEnter` fades the new image to 1 and the previous to 0. `onLeaveBack` reverses.
- **Research**: [R-004 in research.md](research.md#r-004-image-crossfade--scrolltrigger-callbacks-with-gsap-timeline)

### Tech Card Glow: CSS `box-shadow` with Theme Token + `MagneticWrapper`

- **Why**: Accent border glow on hover is a pure CSS effect — no animation library needed. `box-shadow: 0 0 0 1.5px var(--accent), 0 0 20px 2px rgb(var(--accent-rgb) / 0.25)` delivers the glow. The existing `MagneticWrapper.vue` wraps each card for the magnetic pull effect.
- **Pattern**: shadcn-vue `Card` component + Tailwind `transition` on `box-shadow` and `scale`. `--accent` resolves to orange (light) or rust (dark) automatically.
- **Research**: [R-005 in research.md](research.md#r-005-tech-card-glow--css-box-shadow-with-theme-token)

## Complexity Tracking

No constitution violations. No complexity justifications required.
