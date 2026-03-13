# Implementation Plan: Site-Wide Logo

**Branch**: `002-site-logo` | **Date**: 2026-03-06 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-site-logo/spec.md`

## Summary

Replace the placeholder logo SVG with the real `akse.png` brand logo across the navigation bar and footer. Remove the placeholder asset and all references. The logo image (2618×864 PNG, ~115KB) is already in `public/` and will be referenced via standard `<img>` tags with Tailwind sizing utilities. No new dependencies are required.

## Technical Context

**Language/Version**: TypeScript (Nuxt 4 / Vue 3 Composition API with `script setup`)
**Primary Dependencies**: Nuxt 4, Tailwind CSS 4, shadcn-vue (existing — no new deps)
**Storage**: N/A (static asset in `public/`)
**Testing**: Manual verification — SSR curl check, visual viewport check
**Target Platform**: Web (SSR on Netlify)
**Project Type**: Nuxt web app
**Performance Goals**: Logo renders in initial SSR HTML; no CLS from missing dimensions
**Constraints**: Logo `<img>` must have explicit `width`/`height` to prevent layout shift; ~115KB PNG acceptable for now
**Scale/Scope**: 2 component files changed, 1 file deleted

**Package Manager**: pnpm (no install commands needed — no new deps)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Nuxt 4 + Vue 3 Composition API + `script setup` confirmed for changed UI/runtime code
- [x] pnpm-only workflow confirmed (`pnpm install`, `pnpm dev/build/test`), no npm/yarn/bun instructions
- [x] Tailwind CSS + shadcn-vue usage defined; no raw CSS structural layout planned
- [x] Motion plan uses GSAP + single modern `lenis`; no `@studio-freight/lenis` or duplicate instances — N/A (no motion changes)
- [x] Sanity/content fetch strategy is SSR by default for indexable pages; exceptions documented — N/A (no data fetching)
- [x] SEO plan uses `useSeoMeta` in `script setup`; sitemap + favicon coverage specified — N/A (no SEO changes, favicon out of scope per spec)
- [x] Legacy cleanup scope identified: `public/logo-placeholder.svg` and all references to be removed

## Project Structure

### Documentation (this feature)

```text
specs/002-site-logo/
├── plan.md              # This file
├── research.md          # Phase 0 output (minimal — no unknowns)
├── data-model.md        # Phase 1 output (N/A — no data entities)
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (changes at repository root)

```text
public/
├── akse.png                 # Existing brand logo (2618×864, ~115KB) — unchanged
└── logo-placeholder.svg     # TO BE DELETED

components/
├── SiteNav.vue              # MODIFIED — replace <img src="/logo-placeholder.svg"> with /akse.png, remove "AKSE" text span
└── SiteFooter.vue           # MODIFIED — replace "AKSE" text <p> with <img src="/akse.png">
```

**Structure Decision**: No new files or directories. Two existing components are modified and one static asset is deleted.

## Complexity Tracking

> No constitution violations — table not needed.
