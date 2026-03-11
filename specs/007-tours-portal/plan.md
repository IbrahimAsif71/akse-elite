# Implementation Plan: Interactive Tours Portal

**Branch**: `007-tours-portal` | **Date**: 2026-03-11 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/007-tours-portal/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build the Tours discovery page (`pages/tours/index.vue`), replacing the existing placeholder. The page composes four section components: a full-viewport cinematic featured tour hero (`FeaturedTour.vue`) showcasing Golra Sharif Railway Museum with a glassmorphism metadata bar and magnetic CTA that scales the background on hover; a sticky horizontally-scrollable filter bar (`FilterRail.vue`) with five pill-shaped category chips that filter mock tour data; a card grid (`UpcomingGrid.vue`) with blur/grayscale-treated "In Production" upcoming tours using ScrollTrigger staggered entrance and lock-cursor hover; and a minimalist commercial teaser banner (`CommercialTeaser.vue`) linking to `/commercial`. All content is static mock data. Requires a new `MagneticWrapper` utility component (does not currently exist in codebase). All theming via existing CSS variable system. Dark mode CSS variable overrides needed for dual-theme compliance per constitution (currently light-only). One new dependency: `@nuxtjs/color-mode` for dual-theme class strategy.

## Technical Context

**Language/Version**: TypeScript (Nuxt 4 / Vue 3 Composition API)  
**Primary Dependencies**: Nuxt 4, Vue 3, Tailwind CSS v4, shadcn-vue, GSAP 3.14.x + ScrollTrigger (existing `gsap.client.ts`), Lenis 1.3.x (existing `lenis.client.ts`)  
**Storage**: N/A — all content is inline static mock data  
**Testing**: Manual visual verification (no automated test framework configured in this project)  
**Target Platform**: Web (SSR + client hydration), Netlify deployment  
**Project Type**: Nuxt web app (SSR)  
**Performance Goals**: 60fps scroll animation budget; hero background scale and card stagger must be GPU-composited (transforms and opacity only, no layout reflows)  
**Constraints**: SplitText NOT available in gsap@3.14.2 free tier. MagneticWrapper does not exist — must be created. Dark mode CSS variables not yet implemented — must be added for dual-theme. All text content must be SSR-rendered for indexability.  
**Scale/Scope**: Single page + 5 new component files (4 section + 1 utility). Dark mode CSS variable block in main.css.

**Package Manager**: pnpm (required)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Nuxt 4 + Vue 3 Composition API + `script setup` confirmed for all new `components/Tours/` files, `MagneticWrapper.vue`, and the modified `pages/tours/index.vue`
- [x] pnpm-only workflow confirmed — `pnpm dev` / `pnpm build` only; one new dependency: `pnpm add @nuxtjs/color-mode` for dual-theme support
- [x] Tailwind CSS utilities for all structural layout; shadcn-vue Card primitives for tour grid cards; filter chips built from Tailwind pill patterns; raw CSS limited to existing token declarations in `main.css` + new `.dark` variable overrides
- [x] Motion plan uses `$gsap` + `$ScrollTrigger` from `gsap.client.ts`; uses single `$lenis` instance from `lenis.client.ts`; no `@studio-freight/lenis`; no new motion providers
- [x] No Sanity fetch required (mock data only). Page is indexable — all visible text is server-rendered in SSR HTML. No client-only text content exceptions.
- [x] SEO plan: `useSeoMeta` in `pages/tours/index.vue` `script setup` with title + description + OG tags. Sitemap + favicon are pre-existing infrastructure.
- [x] Legacy cleanup scope: `pages/tours/index.vue` placeholder prose replaced entirely. `components/Tours/` directory does not currently exist — no legacy artifacts to clean.

### Post-Design Re-check

_Re-evaluated after Phase 1 design artifacts (data-model.md, contracts/, quickstart.md) were produced._

- [x] All Phase 1 artifacts use pnpm-only commands (`pnpm add`, `pnpm dev`)
- [x] Component contracts confirm all 5 components use `<script setup lang="ts">` + Composition API
- [x] No new raw CSS for structural layout — all layout via Tailwind utilities; raw CSS limited to `.dark` variable override block in `main.css` (theming, not structural)
- [x] Motion contracts use `$gsap` / `$ScrollTrigger` from existing plugin; no new motion providers introduced
- [x] Mock data is inline in component files — no Sanity or external data fetches
- [x] One new dependency (`@nuxtjs/color-mode`) documented in quickstart.md with exact install command
- [x] No constitution violations — no complexity justifications required

## Project Structure

### Documentation (this feature)

```text
specs/007-tours-portal/
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
└── tours/
    └── index.vue                        # Modified — replaces placeholder, composes four sections

components/
├── MagneticWrapper.vue                  # New — magnetic hover effect wrapper (reusable utility)
└── Tours/
    ├── FeaturedTour.vue                 # New — full-viewport hero with glassmorphism + magnetic CTA
    ├── FilterRail.vue                   # New — sticky horizontal filter bar with pill chips
    ├── UpcomingGrid.vue                 # New — blurred/grayscale card grid with staggered scroll entrance
    └── CommercialTeaser.vue             # New — minimalist CTA banner bridging to /commercial

assets/
└── css/
    └── main.css                         # Modified — add .dark class variable overrides for dual-theme

public/
└── images/
    └── tours/                           # Existing directory — mock imagery (existing + placeholder assets)
```

**Structure Decision**: Nuxt convention — page-scoped section components in `components/Tours/`. `MagneticWrapper.vue` placed at `components/` root as a reusable utility (not page-specific). Dark mode variable overrides added to existing `main.css`. Mock images use existing `public/images/tours/` directory.

## Key Technical Decisions

### MagneticWrapper: New Reusable Component

- **Why**: Does not exist in current codebase. Required by spec FR-016 for the hero CTA hover effect. Built as root-level utility for reuse across pages.
- **Pattern**: Track mouse position relative to element center, apply `gsap.set()` translation (25% pull). On leave, `gsap.to()` with `elastic.out(1, 0.3)` spring-back. Pointer-only via `matchMedia('(pointer: fine)')`.
- **Research**: [R-001 in research.md](research.md#r-001-magnetic-wrapper-implementation)

### Glassmorphism Metadata Bar: backdrop-filter + themed surface

- **Why**: Spec FR-015 requires a translucent blurred bar. `backdrop-filter: blur()` with themed `--surface` color at reduced opacity.
- **Research**: [R-002 in research.md](research.md#r-002-glassmorphism-implementation)

### Sticky Filter Bar: CSS `position: sticky` + `top: 0`

- **Why**: Simpler and cheaper than ScrollTrigger pinning. CSS sticky handles the lock-to-top behavior natively when scrolling past the hero. GSAP not needed for the pin itself.
- **Research**: [R-003 in research.md](research.md#r-003-sticky-filter-bar-approach)

### Card Stagger: GSAP ScrollTrigger batch

- **Why**: `ScrollTrigger.batch()` is purpose-built for staggering multiple elements as they enter the viewport. Cleaner than individual ScrollTrigger instances per card.
- **Research**: [R-004 in research.md](research.md#r-004-staggered-card-entrance-animation)

### Dual-Theme: `.dark` CSS Variable Overrides in main.css

- **Why**: Constitution mandates dual-theme via `@nuxtjs/color-mode` (class strategy). Current CSS is light-only. Adding a `.dark` class block to `main.css` with the cinematic dark palette enables theme switching for this page and all future pages.
- **Research**: [R-005 in research.md](research.md#r-005-dual-theme-dark-mode-implementation)

### Lock Cursor on Upcoming Cards: CSS `cursor` property

- **Why**: Spec FR-035 requires a lock/soon indicator on hover. Using `cursor: not-allowed` or a custom cursor URL (`cursor: url('/cursors/lock.svg'), not-allowed`) is simpler than re-implementing a full custom cursor system.
- **Research**: [R-006 in research.md](research.md#r-006-lock-cursor-for-upcoming-cards)

## Complexity Tracking

No constitution violations. No complexity justifications required.
