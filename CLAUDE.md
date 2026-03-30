# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AKSE Elite is a premium Nuxt 4 website for a heritage-tech studio that creates cinematic 3D/360° virtual tours for heritage sites and museums. Content is managed via Sanity CMS and deployed to Netlify (SSR preset).

## Commands

```bash
pnpm dev        # Start dev server at localhost:3000
pnpm build      # Production build (Netlify SSR preset)
pnpm generate   # Static site generation
pnpm preview    # Preview production build
```

Use **pnpm** exclusively — no npm or yarn.

## Architecture

**Framework:** Nuxt 4 + Vue 3 (Composition API, `<script setup lang="ts">`)
**Styling:** Tailwind CSS v4 (configured via `vite.plugins`, not postcss)
**Components:** shadcn-nuxt with no prefix, stored in `components/ui/`
**Animations:** GSAP 3 + ScrollTrigger (registered in `plugins/gsap.client.ts`) + Lenis smooth scroll (`plugins/lenis.client.ts`)
**CMS:** Sanity — client + image URL builder in `utils/sanity.ts`

### Key Data Flow

- Pages use `useSanity()` from `utils/sanity.ts` to query Sanity CMS
- Images use `urlFor(source)` from the same utility for Sanity image URLs
- GSAP animations are initialized per-component in `onMounted` lifecycle hooks
- Lenis is globally initialized but disabled on `/admin` routes

### Plugin Initialization Order

1. `gsap.client.ts` — registers ScrollTrigger, respects `prefers-reduced-motion`
2. `lenis.client.ts` — sets up smooth scroll, syncs with GSAP ticker

### Layouts

- `layouts/default.vue` — public site (SiteNav + SiteFooter)
- `layouts/admin.vue` — admin section (dark theme, no nav)

### Admin Auth

Simple password auth via `composables/useAdminAuth.ts` using Vue `useState`. Password: `akse2026`. Not production-grade — intentionally minimal.

## Design System

**Theme:** Light-only, earthy palette (defined in `assets/css/main.css`):
- Background: `#f3ebdf`
- Surface: `#fbf6ee`
- Text: `#2f261e`
- Orange (primary): `#c9653d`
- Teal (accent): `#2c7a83`

Film grain texture overlay is always visible (fixed SVG in CSS) — part of the heritage aesthetic, do not remove.

Class merging utility: `cn()` from `lib/utils.ts` (wraps clsx + tailwind-merge).

## Sanity CMS

Runtime config in `nuxt.config.ts`:
- Project ID: `44elzz3z` (override via `NUXT_PUBLIC_SANITY_PROJECT_ID`)
- Dataset: `production` (override via `NUXT_PUBLIC_SANITY_DATASET`)
- API version: `2026-03-01` (override via `NUXT_PUBLIC_SANITY_API_VERSION`)

## Specs

Feature specs live in `/specs/` as markdown files (e.g. `008-heritage-home-page`). These detail the design intent and implementation requirements for each feature. Read the relevant spec before implementing a feature.
