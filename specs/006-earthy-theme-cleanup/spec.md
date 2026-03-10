# Feature Specification: Earthy Theme Cleanup

**Feature Branch**: `006-earthy-theme-cleanup`  
**Created**: 2026-03-09  
**Status**: Draft  
**Input**: User description: "Remove dark mode entirely from the project and make everything follow earthy beige tones with the existing shade of orange. Fresh, earthy, heritage look. Remove magnetic elements and custom cursor. Apply everywhere."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Unified Earthy Light Theme (Priority: P1)

A visitor lands on any page of the site and sees a cohesive, warm, earthy visual identity — beige backgrounds, muted earth tones, and the brand orange (#c9653d) as the primary accent. There is no dark mode toggle, no theme switching, and no flash of alternative theme on load. Every page, every component, every state renders consistently under a single light earthy palette.

**Why this priority**: The visual identity is the foundation of the brand. Every other change (cursor removal, magnetic removal) is cosmetic cleanup, but getting the single earthy palette right across all surfaces is the core deliverable.

**Independent Test**: Can be fully tested by navigating every page and confirming all backgrounds, text colors, borders, and accents use the earthy palette. No `.dark` class or dark-mode CSS variables should be active or reachable.

**Acceptance Scenarios**:

1. **Given** a visitor on any device/browser, **When** they load any page, **Then** the page renders with the earthy beige palette (background #f3ebdf, surface #fbf6ee, text #2f261e, orange accent #c9653d) and no dark-mode styles are present.
2. **Given** a visitor with OS dark mode preference enabled, **When** they load the site, **Then** the site still renders the earthy light theme — the OS preference is ignored.
3. **Given** the site navigation, **When** a visitor looks at the header/nav area, **Then** there is no theme toggle button visible.

---

### User Story 2 - Remove Custom Cursor (Priority: P2)

A visitor uses the site and sees the standard browser cursor at all times. There is no custom animated cursor overlay, no `data-cursor` hover effects expanding or displaying labels. The browsing experience feels native and lightweight.

**Why this priority**: Removing the custom cursor reduces visual clutter, improves perceived performance, and simplifies the codebase. It is a self-contained change that can be shipped independently.

**Independent Test**: Can be tested by hovering over all interactive elements on every page and confirming only the native browser cursor appears. No custom cursor DOM element should exist in the rendered page.

**Acceptance Scenarios**:

1. **Given** a visitor using a pointer device, **When** they move the cursor anywhere on the site, **Then** only the native browser cursor is visible — no custom cursor overlay.
2. **Given** elements that previously had `data-cursor` attributes, **When** a visitor hovers over them, **Then** no custom expand/label animation occurs.

---

### User Story 3 - Remove Magnetic Hover Effects (Priority: P3)

Interactive elements (buttons, tech showcase items) no longer exhibit magnetic pull behavior on hover. Elements stay in their original position and respond only with standard CSS hover states. The interactions feel clean and predictable.

**Why this priority**: Magnetic effects are a nice-to-have flourish but add complexity and can feel distracting for a heritage/earthy brand. Removing them completes the visual cleanup and reduces JS overhead.

**Independent Test**: Can be tested by hovering over previously magnetic elements (CTA buttons, tech showcase cards) and confirming they do not shift position toward the cursor.

**Acceptance Scenarios**:

1. **Given** a visitor hovering over a CTA button that previously had magnetic behavior, **When** they move the cursor around the button, **Then** the button remains in its original position.
2. **Given** the tech showcase section, **When** a visitor hovers over tech items, **Then** no magnetic pull animation occurs.

---

### User Story 4 - Clean Codebase (Priority: P4)

After all visual changes, the codebase contains no dead code related to dark mode, custom cursor, or magnetic wrappers. Configuration, components, CSS, and utilities are cleaned up so future development starts from a clean baseline.

**Why this priority**: Codebase hygiene ensures maintainability. Dead code creates confusion for future developers and increases bundle size.

**Independent Test**: Can be tested by searching the codebase for dark mode references (`.dark`, `colorMode`, `useColorMode`, `ThemeToggle`), custom cursor references (`CustomCursor`, `data-cursor`), and magnetic references (`MagneticWrapper`). None should remain in active code paths.

**Acceptance Scenarios**:

1. **Given** the final codebase, **When** a developer searches for `.dark` CSS rules, `useColorMode()`, or `ThemeToggle`, **Then** no active references are found.
2. **Given** the final codebase, **When** a developer searches for `CustomCursor` or `MagneticWrapper` component usage, **Then** no active references are found.
3. **Given** the production build, **When** the bundle is analyzed, **Then** no dark mode, custom cursor, or magnetic wrapper code is included.

### Edge Cases

- What happens when a user's OS is set to dark mode? The site must still render the earthy light theme — OS preference is explicitly ignored.
- What happens to components that had dark-mode-specific styling (e.g., HeroCinematic globe theme, MagicBento dark background variable)? They must be updated to use only light earthy values.
- What happens to the `dark:` Tailwind prefixed utilities in shadcn-vue button variants? They must be removed since no `.dark` class will ever be applied.
- What happens to the `@nuxtjs/color-mode` module after dark mode removal? It should be removed as a dependency since it serves no purpose.
- What happens to the `data-cursor` attributes on elements that previously triggered custom cursor behavior? They should be removed.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The site MUST render exclusively in a single earthy light palette across all pages, components, and states — using the existing `:root` CSS variables as the sole theme (background #f3ebdf, surface #fbf6ee, surface-alt #ece2d2, text #2f261e, text-muted #6b5a49, orange #c9653d, teal #2c7a83).
- **FR-002**: All `.dark` CSS rule blocks MUST be removed from the stylesheet.
- **FR-003**: All `dark:` prefixed Tailwind utility classes MUST be removed from component templates and variant definitions.
- **FR-004**: The `@nuxtjs/color-mode` module MUST be removed from the Nuxt configuration and package dependencies.
- **FR-005**: The `ThemeToggle` component MUST be removed from the navigation and deleted from the codebase.
- **FR-006**: The `CustomCursor` component MUST be removed from the default layout and deleted from the codebase.
- **FR-007**: All `data-cursor` attributes MUST be removed from component templates.
- **FR-008**: The `MagneticWrapper` component MUST be removed from all component templates where it is used (MassiveCTA, TechShowcase) and deleted from the codebase.
- **FR-009**: Components that had dark-mode-aware logic (HeroCinematic globe theming, MagicBento dark background) MUST be updated to use only the light earthy palette values, removing any dark/light branching logic.
- **FR-010**: The Nuxt `colorMode` configuration block MUST be removed from `nuxt.config.ts`.
- **FR-011**: The `color-scheme: light` declaration MUST remain in `:root` CSS to signal the light-only intent to browsers.
- **FR-012**: Unwrapping `MagneticWrapper` MUST preserve the wrapped content and any existing interactive behavior (click handlers, links, etc.) — only the magnetic hover effect is removed.

### Constitution Alignment Requirements _(mandatory)_

- **CAR-001 (Stack)**: Implementation MUST use Nuxt 4 + Vue 3 Composition API with `script setup` for authored pages/components.
- **CAR-002 (Package Manager)**: All install/run instructions MUST use pnpm only.
- **CAR-003 (UI System)**: Structural UI styling MUST use Tailwind utilities and shadcn-vue component patterns.
- **CAR-004 (Motion)**: Remaining animations MUST use GSAP + single modern `lenis` instance, with lifecycle-safe cleanup.
- **CAR-005 (Data + SEO)**: Indexable content MUST use SSR-first data fetching and SEO metadata via `useSeoMeta` in `script setup`.
- **CAR-006 (Rewrite Cleanup)**: Spec MUST identify legacy artifacts to remove or refactor (unused components, duplicate plugins, broken routes/styles).

### Legacy Artifacts to Remove (CAR-006)

| Artifact                      | Location                            | Action                                                        |
| ----------------------------- | ----------------------------------- | ------------------------------------------------------------- |
| `.dark` CSS block             | `assets/css/main.css`               | Delete entire `.dark { ... }` rule                            |
| `@nuxtjs/color-mode` module   | `nuxt.config.ts`, `package.json`    | Remove from modules array, colorMode config, and dependencies |
| `ThemeToggle.vue`             | `components/ThemeToggle.vue`        | Delete file                                                   |
| `ThemeToggle` usage           | `components/SiteNav.vue`            | Remove import and both `<ThemeToggle />` instances            |
| `CustomCursor.vue`            | `components/CustomCursor.vue`       | Delete file                                                   |
| `CustomCursor` usage          | `layouts/default.vue`               | Remove `<CustomCursor />` from template                       |
| `MagneticWrapper.vue`         | `components/MagneticWrapper.vue`    | Delete file                                                   |
| `MagneticWrapper` usage       | `components/Home/MassiveCTA.vue`    | Unwrap content from `<MagneticWrapper>`                       |
| `MagneticWrapper` usage       | `components/About/TechShowcase.vue` | Unwrap content from `<MagneticWrapper>`                       |
| `data-cursor` attributes      | `components/Home/MassiveCTA.vue`    | Remove attribute                                              |
| `useColorMode()` calls        | `components/Home/HeroCinematic.vue` | Remove dark/light branching; hardcode light palette values    |
| `dark:` Tailwind classes      | `components/ui/button/index.ts`     | Remove all `dark:` prefixed utilities                         |
| `.dark .bento-section` rule   | `components/Home/MagicBento.vue`    | Remove dark-specific CSS rule                                 |
| `--background-dark` variable  | `components/Home/MagicBento.vue`    | Remove or rename to non-dark semantic                         |
| `dark:opacity-80` class       | `components/Home/HeroCinematic.vue` | Remove `dark:` prefix variant                                 |
| `akse-color-mode` storage key | Browser localStorage                | No longer written; old values become inert                    |

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of pages render the earthy beige palette on first load, regardless of OS theme preference.
- **SC-002**: Zero dark-mode CSS rules (`.dark` blocks, `dark:` utilities) exist in the production stylesheet.
- **SC-003**: Zero references to `useColorMode`, `ThemeToggle`, `CustomCursor`, or `MagneticWrapper` exist in active source files.
- **SC-004**: The theme toggle button is absent from all navigation states (desktop, mobile, scroll).
- **SC-005**: No custom cursor DOM element is rendered on any page.
- **SC-006**: No magnetic hover displacement occurs on any interactive element.
- **SC-007**: All existing page content, links, and navigation remain fully functional after cleanup.
- **SC-008**: Production bundle size for CSS and JS decreases or remains stable (no regressions from dead code).

### Rewrite Quality Outcomes _(mandatory for rewrite features)_

- **RQ-001**: No npm/yarn/bun commands remain in feature docs or scripts touched by the feature.
- **RQ-002**: No duplicate smooth-scroll runtime providers exist after implementation.
- **RQ-003**: SSR rendering is present for all indexable pages modified by the feature unless an approved exception is documented.

## Assumptions

- The existing `:root` earthy palette (beige #f3ebdf, surface #fbf6ee, orange #c9653d, teal #2c7a83) is the desired final palette — no new colors are being introduced.
- The `teal` accent color (#2c7a83) remains in the palette as a secondary/supporting color.
- Standard CSS hover states (opacity changes, background shifts using existing semantic tokens) are sufficient to replace any visual feedback previously provided by magnetic effects or custom cursor labels.
- The `@nuxtjs/color-mode` module has no other consumers beyond theme toggling — it can be fully removed.
- The HeroCinematic WebGL globe will use a fixed light-themed color configuration rather than branching on dark/light mode.
