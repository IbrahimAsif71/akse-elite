# akse-elite Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-05

## Active Technologies
- TypeScript (Nuxt 4 / Vue 3 Composition API with `script setup`) + Nuxt 4, Tailwind CSS 4, shadcn-vue (existing — no new deps) (002-site-logo)
- N/A (static asset in `public/`) (002-site-logo)
- TypeScript (Nuxt 4 + Vue 3 Composition API with `script setup`) + Nuxt 4, Tailwind CSS 4, shadcn-nuxt, `@nuxtjs/color-mode` (new), GSAP, Lenis (001-global-theme-system)
- Browser local preference storage managed by Nuxt color mode module (001-global-theme-system)
- TypeScript (Nuxt 4 / Vue 3 Composition API) + Nuxt 4, Vue 3, Tailwind CSS v4, shadcn-vue, GSAP 3.14.x + ScrollTrigger, Lenis 1.3.x, cobe 0.6.x (new), @nuxtjs/color-mode 4.x (004-awwwards-home-page)
- N/A — all data is static mock arrays (004-awwwards-home-page)
- TypeScript (Nuxt 4 / Vue 3 Composition API) + Nuxt 4, Vue 3, Tailwind CSS v4, shadcn-vue, GSAP 3.14.x + ScrollTrigger (existing `gsap.client.ts`), Lenis 1.3.x (existing `lenis.client.ts`), @nuxtjs/color-mode 4.x (005-about-process-page)
- N/A — all content is inline static mock data (005-about-process-page)
- TypeScript (Nuxt 4 / Vue 3 Composition API) + Nuxt 4, Tailwind CSS v4, shadcn-vue, GSAP 3, Lenis, cobe (globe), Sanity clien (006-earthy-theme-cleanup)
- N/A (no data persistence changes) (006-earthy-theme-cleanup)
- TypeScript (Nuxt 4 / Vue 3 Composition API) + Nuxt 4, Vue 3, Tailwind CSS v4, shadcn-vue, GSAP 3.14.2 + ScrollTrigger (existing `gsap.client.ts`), Lenis 1.3.17 (existing `lenis.client.ts`), `cobe` 0.6.5 (already installed) (008-heritage-home-page)
- N/A — all content is inline static data (copy hardcoded, images from `public/images/`) (008-heritage-home-page)

- TypeScript (Nuxt 4 / Vue 3 Composition API with `script setup`) + Nuxt 4, Tailwind CSS 4, shadcn-vue, GSAP, lenis (modern package), Geist Sans fon (001-core-layout-foundation)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

pnpm test && pnpm lint

## Code Style

TypeScript (Nuxt 4 / Vue 3 Composition API with `script setup`): Follow standard conventions

## Recent Changes
- 008-heritage-home-page: Added TypeScript (Nuxt 4 / Vue 3 Composition API) + Nuxt 4, Vue 3, Tailwind CSS v4, shadcn-vue, GSAP 3.14.2 + ScrollTrigger (existing `gsap.client.ts`), Lenis 1.3.17 (existing `lenis.client.ts`), `cobe` 0.6.5 (already installed)
- 007-tours-portal: Added TypeScript (Nuxt 4 / Vue 3 Composition API) + Nuxt 4, Vue 3, Tailwind CSS v4, shadcn-vue, GSAP 3.14.x + ScrollTrigger (existing `gsap.client.ts`), Lenis 1.3.x (existing `lenis.client.ts`)
- 006-earthy-theme-cleanup: Added TypeScript (Nuxt 4 / Vue 3 Composition API) + Nuxt 4, Tailwind CSS v4, shadcn-vue, GSAP 3, Lenis, cobe (globe), Sanity clien


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
