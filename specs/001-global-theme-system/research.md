# Research: Global Light and Dark Mode System

**Date**: 2026-03-06  
**Feature**: 001-global-theme-system

## R1: Nuxt theme runtime strategy

- Decision: Use `@nuxtjs/color-mode` with class strategy and `dark` class name.
- Rationale: Native Nuxt integration handles SSR-friendly mode resolution, persistence, and `.dark` class toggling expected by Tailwind variants and global token overrides.
- Alternatives considered:
  - Manual class toggling composable: higher maintenance and more flash-of-incorrect-theme risk.
  - VueUse-only storage + DOM toggling: duplicates capabilities already solved by `@nuxtjs/color-mode`.

## R2: Tailwind dark mode compatibility in Tailwind v4 project

- Decision: Add explicit Tailwind config with `darkMode: 'class'` to satisfy governance and keep behavior deterministic.
- Rationale: The feature requirement explicitly mandates class-based dark mode; codifying it in Tailwind configuration avoids ambiguity.
- Alternatives considered:
  - Rely only on defaults and CSS custom variants: less explicit and easier to regress.
  - Attribute strategy (`[data-theme]`): conflicts with requested `.dark` class strategy.

## R3: Token architecture for dual-theme shadcn compatibility

- Decision: Define complete semantic token sets in `:root` (light) and `.dark` (dark) for background/surface/text/border/ring/interactive roles, then map via Tailwind `@theme inline`.
- Rationale: This updates all shadcn-vue components through shared semantic tokens without sprinkling hardcoded `dark:` utilities on every element.
- Alternatives considered:
  - Element-by-element `dark:` utility refactor: brittle and difficult to scale.
  - Direct hardcoded hex values in components: violates tokenized design-system principles.

## R4: Brand palette mapping

- Decision: Light mode uses beige/light-neutral surfaces with orange-driven primary accent; dark mode preserves cinematic base `#0e1516`, primary text `#F3EDE7`, rust `#C9653D`, and teal `#2C7A83` accents.
- Rationale: This directly implements the updated constitution and feature specification while preserving legacy dark identity.
- Alternatives considered:
  - Reusing current dark palette for light mode: fails product requirement for a distinct light identity.
  - Introducing additional accent colors: out of scope and increases visual inconsistency risk.

## R5: Theme toggle integration pattern

- Decision: Create `components/ThemeToggle.vue` as a minimal ghost button with accessible label and dynamic sun/moon icon, then place it in `SiteNav` so it is globally available.
- Rationale: Header-level placement guarantees discoverability on all routes and aligns with existing shadcn button patterns.
- Alternatives considered:
  - Footer toggle placement: low discoverability.
  - Page-local toggles: duplicates logic and can drift in behavior.

## R6: Legacy cleanup scope

- Decision: Remove always-dark language and assumptions from global CSS comments/tokens and replace with explicit dual-mode definitions.
- Rationale: Prevents future developers from reintroducing single-theme behavior and satisfies rewrite hygiene requirements.
- Alternatives considered:
  - Keep existing comments and append light-mode tokens: leaves contradictory guidance in source.
