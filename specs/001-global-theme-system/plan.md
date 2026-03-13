# Implementation Plan: Global Light and Dark Mode System

**Branch**: `001-global-theme-system` | **Date**: 2026-03-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-global-theme-system/spec.md`

## Summary

Introduce a strict dual-theme architecture for the Nuxt 4 app using `@nuxtjs/color-mode` with class strategy, semantic CSS variables, and shadcn-compatible tokens. Light mode becomes the new earthy beige/orange identity, while dark mode preserves the legacy cinematic palette (`#0e1516` base with rust/teal accents). Add a reusable `ThemeToggle` control in the global header so users can switch modes across all pages with persistence and accessibility.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (Nuxt 4 + Vue 3 Composition API with `script setup`)  
**Primary Dependencies**: Nuxt 4, Tailwind CSS 4, shadcn-nuxt, `@nuxtjs/color-mode` (new), GSAP, Lenis  
**Storage**: Browser local preference storage managed by Nuxt color mode module  
**Testing**: Manual verification with `pnpm dev`, SSR HTML checks (`curl`), and production build check (`pnpm build`)  
**Target Platform**: Web (SSR on Netlify)
**Project Type**: Nuxt web app  
**Performance Goals**: No visible theme flash on load, instant toggle feedback, no added long-running runtime work  
**Constraints**: Preserve existing component structure; avoid hardcoded per-element dark overrides; retain shadcn token compatibility  
**Scale/Scope**: 4-6 files changed (`nuxt.config.ts`, global CSS file, `components/SiteNav.vue`, new `components/ThemeToggle.vue`, optional Tailwind config)

**Package Manager**: pnpm

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Nuxt 4 + Vue 3 Composition API + `script setup` confirmed for changed UI/runtime code
- [x] pnpm-only workflow confirmed (`pnpm install`, `pnpm dev/build/test`), no npm/yarn/bun instructions
- [x] Tailwind CSS + shadcn-vue usage defined; no raw CSS structural layout planned
- [x] Motion plan uses GSAP + single modern `lenis`; no `@studio-freight/lenis` or duplicate instances (no motion-stack changes planned)
- [x] Sanity/content fetch strategy is SSR by default for indexable pages; exceptions documented (no data-fetch changes planned)
- [x] SEO plan uses `useSeoMeta` in `script setup`; sitemap + favicon coverage specified (no SEO surface changes planned)
- [x] Legacy cleanup scope identified (remove always-dark assumptions/comments and stale token naming in global CSS)

## Project Structure

### Documentation (this feature)

```text
specs/001-global-theme-system/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md             # generated later by /speckit.tasks
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
nuxt.config.ts
assets/
└── css/
  └── main.css
components/
├── SiteNav.vue
└── ThemeToggle.vue      # new
```

**Structure Decision**: Keep the existing single Nuxt app structure. Implement theme architecture at framework/config + global-token levels, with one new reusable UI control (`ThemeToggle.vue`) integrated into the existing global navigation.

## Complexity Tracking

No constitution violations identified.

## Post-Design Constitution Check

- [x] Nuxt 4 + Vue 3 Composition API + `script setup` remains the implementation target.
- [x] pnpm-only workflow retained for install/run/verify instructions.
- [x] Tailwind + shadcn token architecture enforced via semantic CSS variables and class-based dark mode.
- [x] Motion runtime unchanged (single GSAP + Lenis setup preserved).
- [x] SSR/data strategy unchanged for indexable content.
- [x] SEO authoring strategy unchanged (`useSeoMeta` in `script setup` where applicable).
- [x] Legacy cleanup explicitly included (remove always-dark constraints in global CSS and token comments).
