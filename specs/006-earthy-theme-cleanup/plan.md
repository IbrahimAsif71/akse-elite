# Implementation Plan: Earthy Theme Cleanup

**Branch**: `006-earthy-theme-cleanup` | **Date**: 2026-03-09 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/006-earthy-theme-cleanup/spec.md`

## Summary

Remove the dual-theme (light/dark) architecture entirely, collapsing the site to a single earthy beige palette driven by the existing `:root` CSS variables. Simultaneously remove three cosmetic systems — custom cursor, magnetic hover wrappers, and the theme toggle — to simplify the visual identity and reduce JS overhead. The approach is purely subtractive: delete .dark CSS blocks, strip `dark:` Tailwind utilities, remove `@nuxtjs/color-mode` module, delete three component files (ThemeToggle, CustomCursor, MagneticWrapper), unwrap magnetic wrappers preserving child content, and hardcode the HeroCinematic globe to its light theme values.

## Technical Context

**Language/Version**: TypeScript (Nuxt 4 / Vue 3 Composition API)
**Primary Dependencies**: Nuxt 4, Tailwind CSS v4, shadcn-vue, GSAP 3, Lenis, cobe (globe), Sanity client
**Storage**: N/A (no data persistence changes)
**Testing**: Manual visual verification + codebase grep validation (no test framework configured)
**Target Platform**: Web (SSR via Netlify)
**Project Type**: Nuxt web app (SSR with Netlify adapter)
**Performance Goals**: 60 fps animation budget maintained; CSS/JS bundle size reduced or stable
**Constraints**: No new dependencies introduced; purely subtractive changes
**Scale/Scope**: ~15 component files affected, 1 CSS file, 1 config file, 1 Tailwind config, 3 component deletions

**Package Manager**: pnpm

## Constitution Check (Pre-Phase 0)

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Nuxt 4 + Vue 3 Composition API + `script setup` confirmed for changed UI/runtime code
- [x] pnpm-only workflow confirmed (`pnpm install`, `pnpm dev/build/test`), no npm/yarn/bun instructions
- [x] Tailwind CSS + shadcn-vue usage defined; no raw CSS structural layout planned (CSS changes limited to token declarations)
- [x] Motion plan uses GSAP + single modern `lenis`; no `@studio-freight/lenis` or duplicate instances (motion stack untouched except removing MagneticWrapper GSAP usage)
- [x] Sanity/content fetch strategy is SSR by default for indexable pages; exceptions documented (no SSR changes — this feature only touches CSS and component templates)
- [x] SEO plan uses `useSeoMeta` in `script setup`; sitemap + favicon coverage specified (no SEO changes — purely visual/cleanup scope)
- [x] Legacy cleanup scope identified: ThemeToggle.vue, CustomCursor.vue, MagneticWrapper.vue, .dark CSS block, @nuxtjs/color-mode module, dark: Tailwind utilities, data-cursor attributes, colorMode branching in HeroCinematic + MagicBento

**Gate Result**: PASS — no violations. All changes align with constitution principles.

## Constitution Check (Post-Phase 1 Design)

_Re-check after Phase 1 design artifacts are complete._

- [x] Nuxt 4 + Vue 3 Composition API + `script setup` confirmed — all edited components use `script setup`; changes are subtractive only
- [x] pnpm-only workflow confirmed — quickstart.md uses pnpm exclusively; @nuxtjs/color-mode removed via `pnpm remove`
- [x] Tailwind CSS + shadcn-vue usage defined — CSS changes limited to token declarations; button variants stay in shadcn CVA pattern
- [x] Motion plan uses GSAP + single modern `lenis` — MagneticWrapper GSAP usage removed (component deleted); no new motion code introduced
- [x] SSR strategy unchanged — no data fetching modifications; all pages remain SSR
- [x] SEO unchanged — no useSeoMeta or metadata modifications
- [x] Legacy cleanup complete — 15 artifacts identified with locations and removal strategies validated in research.md

**Gate Result**: PASS — post-design review confirms no constitution violations introduced during planning.

## Project Structure

### Documentation (this feature)

```text
specs/006-earthy-theme-cleanup/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (files affected)

```text
# Configuration
nuxt.config.ts                          # Remove @nuxtjs/color-mode module + colorMode block
tailwind.config.ts                      # Remove darkMode: "class" setting
package.json                            # Remove @nuxtjs/color-mode dependency

# CSS
assets/css/main.css                     # Delete .dark { ... } block; keep :root with color-scheme: light

# Components to DELETE
components/ThemeToggle.vue              # Delete entirely
components/CustomCursor.vue             # Delete entirely
components/MagneticWrapper.vue          # Delete entirely

# Components to EDIT (remove dark/cursor/magnetic references)
components/SiteNav.vue                  # Remove ThemeToggle import + instances
layouts/default.vue                     # Remove <CustomCursor />
components/Home/MassiveCTA.vue          # Unwrap <MagneticWrapper>, remove data-cursor
components/About/TechShowcase.vue       # Unwrap <MagneticWrapper> from v-for loop
components/Home/HeroCinematic.vue       # Remove useColorMode, hardcode light globe theme, remove dark: classes
components/Home/MagicBento.vue          # Remove .dark .bento-section CSS rule, clean --background-dark
components/ui/button/index.ts           # Remove all dark: prefixed utilities from CVA variants
```

**Structure Decision**: Single Nuxt web app at repo root. No nested project structure. All changes are edits to existing files or deletions — no new files or directories created in source code.

## Complexity Tracking

No constitution violations to justify. All changes are subtractive and align with existing stack.
