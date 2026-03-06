# Implementation Plan: Awwwards-Level Home Page

**Branch**: `004-awwwards-home-page` | **Date**: 2026-03-06 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-awwwards-home-page/spec.md`

## Summary

Build the AKSE home page to Awwwards-level interaction design standards. The page composes five sections: a cinematic full-viewport hero with GSAP character-reveal text and a `cobe` WebGL globe (4 Pakistan location markers, drag + auto-rotate), an asymmetric featured tours section with ScrollTrigger-driven parallax, a scroll-pinned horizontal-scroll process section (pin + scrub), and a full-width massive CTA with accent gradient. Two global interaction components are added: a GSAP `quickTo`-driven custom cursor with contextual hover labels, and a magnetic wrapper using elastic spring-back easing. All visuals derive from the dual-theme CSS variable system. All content uses static mock data.

## Technical Context

**Language/Version**: TypeScript (Nuxt 4 / Vue 3 Composition API)  
**Primary Dependencies**: Nuxt 4, Vue 3, Tailwind CSS v4, shadcn-vue, GSAP 3.14.x + ScrollTrigger, Lenis 1.3.x, cobe 0.6.x (new), @nuxtjs/color-mode 4.x  
**Storage**: N/A — all data is static mock arrays  
**Testing**: Manual visual verification (no automated test framework configured)  
**Target Platform**: Web (SSR + client hydration), Netlify deployment  
**Project Type**: Nuxt web app (SSR)  
**Performance Goals**: 60fps scroll animation budget, hero visible within 3s on broadband, globe drag response <100ms  
**Constraints**: cobe WebGL is client-only (no SSR). Custom cursor pointer-only. All text content must be SSR-rendered.  
**Scale/Scope**: Single page (home), 7 new/modified component files, 1 new npm dependency

**Package Manager**: pnpm (required)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Nuxt 4 + Vue 3 Composition API + `script setup` confirmed for all new components and modified page
- [x] pnpm-only workflow confirmed — `pnpm add cobe` for new dependency, `pnpm dev` / `pnpm build` for development
- [x] Tailwind CSS utilities for all structural layout; raw CSS limited to theme tokens (already in main.css) and cursor `pointer-events`/`mix-blend-mode` styling
- [x] Motion plan uses GSAP + single modern `lenis` (from `lenis.client.ts`); no `@studio-freight/lenis`; `smooth.client.ts` already removed
- [x] No Sanity fetch required (mock data only). Page is indexable — all text rendered in SSR HTML. Globe canvas is client-only (non-indexable visual — documented exception).
- [x] SEO plan uses `useSeoMeta` in `pages/index.vue` `script setup` for title, description, og tags. Sitemap + favicon are pre-existing infrastructure.
- [x] Legacy cleanup scope: `pages/index.vue` placeholder content replaced. Root-level legacy components (HeroCinematic, HomeSections, StoryPinned, Magnetic) already removed in prior branches. `smooth.client.ts` already removed.

### Post-Design Re-check

- [x] All Phase 1 artifacts (data-model.md, contracts/, quickstart.md) use pnpm-only commands
- [x] Component interface contracts show all new components use `script setup` + Composition API
- [x] No new raw CSS structural layout introduced — all layout via Tailwind utility classes
- [x] Globe WebGL exception documented: canvas content is decorative, not indexable content
- [x] No constitution violations requiring complexity tracking

## Project Structure

### Documentation (this feature)

```text
specs/004-awwwards-home-page/
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
└── index.vue                    # Modified — home page composition root

components/
├── CustomCursor.vue             # New — global GSAP-driven custom cursor
├── MagneticWrapper.vue          # New — magnetic hover effect wrapper
└── Home/
    ├── HeroCinematic.vue        # New — full-viewport hero with globe + text reveal
    ├── FeaturedTours.vue        # New — asymmetric tour cards with parallax
    ├── ProcessPinned.vue        # New — scroll-pinned horizontal process steps
    └── MassiveCTA.vue           # New — full-width CTA with accent gradient

layouts/
└── default.vue                  # Modified — add CustomCursor to global layout
```

**Structure Decision**: Nuxt convention structure — page-level components in `components/Home/`, global interaction components at `components/` root. No new directories beyond existing conventions.

## Key Technical Decisions

### Globe: cobe (not Three.js / @tresjs)

- **Why**: 5 kB purpose-built globe with markers, auto-rotate, drag — vs 150 kB+ Three.js overhead for a single visual element
- **Research**: [R-001 in research.md](research.md#r-001-interactive-globe-library--cobe-vs-threejs-tresjsnuxt)

### Text Reveal: Template spans + GSAP stagger (not SplitText)

- **Why**: SplitText requires paid GSAP Club license. Vue template splitting achieves identical visual result at zero cost
- **Research**: [R-002 in research.md](research.md#r-002-character-by-character-text-reveal--splittext-vs-template-splitting)

### Cursor Trailing: gsap.quickTo()

- **Why**: Pre-compiled tween function — allocation-free on every mousemove frame. Superior to `gsap.to()` with overwrite for high-frequency updates
- **Research**: [R-005 in research.md](research.md#r-005-custom-cursor-implementation)

### Magnetic Spring: elastic.out(1, 0.3)

- **Why**: Built-in GSAP easing achieves spring-back overshoot without premium physics plugin
- **Research**: [R-006 in research.md](research.md#r-006-magnetic-wrapper-spring-physics)

### Globe Theme Switching: Destroy + Recreate

- **Why**: Cobe colors are config-time only. Destroy/recreate is ~5ms and avoids partial state. Clean and predictable.
- **Research**: [R-009 in research.md](research.md#r-009-theme-color-mapping-for-globe)

## Complexity Tracking

No constitution violations. No complexity justifications required.
