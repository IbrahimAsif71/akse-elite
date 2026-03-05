# Implementation Plan: Core Layout, UI Foundation, and Routing

**Branch**: `001-core-layout-foundation` | **Date**: 2026-03-05 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-core-layout-foundation/spec.md`

## Summary

Build the foundational application shell for the akse-elite Nuxt 4 rewrite: `app.vue` → `layouts/default.vue` rendering hierarchy with four core layout components (SiteNav, SiteFooter, PageVeil, ScrollProgress), a single Lenis smooth-scroll provider, GSAP + ScrollTrigger global registration, shadcn-vue initialization (Button + Sheet), Tailwind brand tokens, Geist Sans font loading, four routable dummy pages, and `prefers-reduced-motion` support. Legacy artifacts (duplicate Lenis, reveal plugin, unused components) are excluded from the rewrite.

## Technical Context

**Language/Version**: TypeScript (Nuxt 4 / Vue 3 Composition API with `script setup`)
**Primary Dependencies**: Nuxt 4, Tailwind CSS 4, shadcn-vue, GSAP, lenis (modern package), Geist Sans font
**Storage**: N/A (no data persistence this phase)
**Testing**: Manual verification against acceptance scenarios (see research.md R6); automated testing (Vitest / Playwright) deferred to a future phase
**Target Platform**: Web (SSR + static), deployed to Netlify
**Project Type**: Nuxt web application (SSR)
**Performance Goals**: 60fps animation budget for scroll and transitions; PageVeil transition ≤300ms each direction
**Constraints**: `prefers-reduced-motion` must disable Lenis and reduce GSAP durations to ≤50ms; no legacy `@studio-freight/lenis`
**Scale/Scope**: 4 dummy pages, 4 layout components, 2 shadcn-vue primitives, 2 global plugins

**Package Manager**: pnpm (REQUIRED per constitution Principle I)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Nuxt 4 + Vue 3 Composition API + `script setup` confirmed for all authored pages and components (CAR-001, FR-001)
- [x] pnpm-only workflow confirmed — all install/run/build instructions use pnpm (CAR-002)
- [x] Tailwind CSS + shadcn-vue usage defined — FR-003 (tokens), FR-013 (Button + Sheet init); raw CSS limited to token declarations per CAR-003
- [x] Motion plan uses GSAP + single modern `lenis` — FR-005 (single Lenis on RAF), FR-006 (GSAP global reg), FR-014 (no @studio-freight/lenis)
- [x] Sanity/content fetch strategy: N/A this phase — dummy pages only, no indexable content; exception documented in RQ-003
- [x] SEO plan uses `useSeoMeta` in `script setup` for baseline site-level metadata in layout (CAR-005); sitemap + favicon deferred to content phase (not indexable content this phase)
- [x] Legacy cleanup scope identified: FR-014 (remove @studio-freight/lenis + smooth.client.ts), FR-015 (remove reveal.client.ts), CAR-006 (9 unused components not carried forward)

> **Post-design re-check (2026-03-05)**: All 7 gates re-evaluated after Phase 0 research and Phase 1 design. No new violations. Research confirmed pnpm-only commands (R1, quickstart), GSAP-ticker Lenis integration (R2), Tailwind v4 CSS-first config (R1), and `useSeoMeta` baseline (CAR-005). All gates PASS.

## Project Structure

### Documentation (this feature)

```text
specs/001-core-layout-foundation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A — no external interfaces this phase)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app.vue                          # Root shell — NuxtLayout wrapper
layouts/
└── default.vue                  # SiteNav + PageVeil + ScrollProgress + <slot> + SiteFooter

pages/
├── index.vue                    # Dummy home page
├── about.vue                    # Dummy about page
├── tours/
│   └── index.vue                # Dummy tours listing page
└── blog/
    └── index.vue                # Dummy blog listing page

components/
├── SiteNav.vue                  # Fixed glassmorphism nav with logo slot, links, CTA, mobile drawer
├── SiteFooter.vue               # 3-column responsive footer
├── PageVeil.vue                 # Route transition overlay (300ms fade)
├── ScrollProgress.vue           # 3px scroll depth indicator
└── ui/                          # shadcn-vue generated components
    ├── button/
    │   ├── Button.vue
    │   └── index.ts
    └── sheet/
        ├── Sheet.vue
        ├── SheetContent.vue
        ├── SheetTrigger.vue
        └── index.ts

plugins/
├── gsap.client.ts               # GSAP + ScrollTrigger global registration
└── lenis.client.ts              # Single Lenis instance on RAF loop

assets/
└── css/
    └── main.css                 # Tailwind directives + brand token declarations

public/
└── logo-placeholder.svg         # Generic placeholder logo mark
```

**Structure Decision**: Standard Nuxt 4 convention — flat `app.vue` → `layouts/` → `pages/` hierarchy. Components at root level for layout-level pieces, `components/ui/` for shadcn-vue generated primitives. Two client-only plugins for motion runtime. No `src/` wrapper directory (Nuxt convention).

## Complexity Tracking

> No constitution violations. All gates pass. No complexity justification needed.
