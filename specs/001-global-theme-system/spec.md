# Feature Specification: Global Light and Dark Mode System

**Feature Branch**: `001-global-theme-system`  
**Created**: 2026-03-06  
**Status**: Draft  
**Input**: User description: "Global Light and Dark Mode System"

## User Scenarios & Testing _(mandatory)_

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Switch Themes Site-Wide (Priority: P1)

As a visitor, I can switch between light and dark themes and see the entire site palette update consistently, including backgrounds, text, and interactive accents.

**Why this priority**: Theme switching is the core business outcome and must work globally before any polish.

**Independent Test**: Can be fully tested by toggling theme on any page and verifying that global colors and component colors change immediately and remain legible.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page in light mode, **When** they switch to dark mode, **Then** page background, text color, and accent colors update to the cinematic dark palette.
2. **Given** a visitor is on any page in dark mode, **When** they switch to light mode, **Then** page background, text color, and accent colors update to the earthy light palette.
3. **Given** a visitor reloads the page after choosing a theme, **When** the page renders, **Then** the previously selected theme is preserved.

---

### User Story 2 - Toggle Theme from Navigation (Priority: P2)

As a visitor, I can access a clear theme toggle from the global header so I can switch modes from every page.

**Why this priority**: Discoverability and easy access are required for practical adoption of dual themes.

**Independent Test**: Can be tested independently by verifying a keyboard-accessible toggle exists in the header on every route and changes visual mode on activation.

**Acceptance Scenarios**:

1. **Given** a visitor uses keyboard navigation in the header, **When** focus reaches the theme control and they activate it, **Then** the theme changes and focus remains visible.
2. **Given** a visitor views the toggle icon, **When** the current theme is light, **Then** the control shows a moon icon, and **When** the current theme is dark, **Then** it shows a sun icon.

---

### User Story 3 - Themed Component Consistency (Priority: P3)

As a visitor, I experience consistent component styling across modes so the interface feels intentional without isolated elements staying on the wrong palette.

**Why this priority**: Consistent component theming protects brand trust and prevents mixed-color regressions.

**Independent Test**: Can be tested by reviewing core surfaces, typography, and button states in both themes and confirming consistent color behavior without per-element overrides.

**Acceptance Scenarios**:

1. **Given** shared UI components are displayed in both modes, **When** theme changes, **Then** components inherit updated semantic color tokens automatically.
2. **Given** standard pages are reviewed across both modes, **When** switching themes, **Then** no major section appears with unreadable contrast or off-brand color accents.

---

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when system preference is dark but no explicit user choice exists? The initial render follows system preference.
- How does the system handle first load before hydration? The first painted theme must match the resolved mode to avoid visible flash between modes.
- What happens if storage is unavailable or blocked? Theme falls back to resolved default mode and remains fully usable.
- What happens if the toggle is activated rapidly multiple times? Each activation must deterministically flip mode without leaving a mixed token state.

## Requirements _(mandatory)_

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The system MUST provide two global visual modes: Light (beige/light-neutral base with orange primary accents) and Dark (cinematic base `#0e1516`, primary text `#F3EDE7`, rust `#C9653D`, teal `#2C7A83` accents).
- **FR-002**: The system MUST switch themes using a root-level class strategy so all theme-aware styles respond from one global state.
- **FR-003**: The system MUST define semantic color variables for background, surface, text, border, and interactive accents in both modes.
- **FR-004**: Theme-aware component tokens used by shared UI components MUST map to those semantic variables in both modes.
- **FR-005**: Users MUST be able to toggle theme from a persistent control in the global site navigation.
- **FR-006**: The theme toggle control MUST be keyboard accessible, have an accessible name, and maintain visible focus indication.
- **FR-007**: The theme toggle icon MUST reflect current state (sun indicator in dark mode, moon indicator in light mode).
- **FR-008**: The selected theme MUST persist across page navigation and reloads.
- **FR-009**: Global page background and text color styling MUST update based on active mode without requiring page-by-page hardcoded mode classes.
- **FR-010**: Existing legacy dark palette intent MUST be preserved exactly in dark mode while introducing the new earthy light identity in light mode.

### Assumptions

- The dual-theme scope applies to global layout, shared components, and pages currently routed in the Nuxt app.
- Existing content and motion behavior remain unchanged except for theme-driven color rendering.
- The default mode is resolved from color-mode configuration with system preference support.

### Constitution Alignment Requirements _(mandatory)_

- **CAR-001 (Stack)**: Implementation MUST use Nuxt 4 + Vue 3 Composition API with `script setup` for authored pages/components.
- **CAR-002 (Package Manager)**: All install/run instructions MUST use pnpm only.
- **CAR-003 (UI System)**: Structural UI styling MUST use Tailwind utilities and shadcn-vue component patterns.
- **CAR-004 (Motion)**: Animations MUST use GSAP + single modern `lenis` instance, with lifecycle-safe cleanup.
- **CAR-005 (Data + SEO)**: Indexable content MUST use SSR-first data fetching and SEO metadata via `useSeoMeta` in `script setup`.
- **CAR-006 (Rewrite Cleanup)**: Spec MUST identify legacy artifacts to remove or refactor (unused components, duplicate plugins, broken routes/styles).

- **CAR-007 (Dual Theme Governance)**: Theme architecture MUST align with constitution direction for strict dual-theme behavior across the UI system.

### Key Entities _(include if feature involves data)_

- **Theme Mode**: Represents the active visual mode (`light` or `dark`) used to resolve all semantic color tokens.
- **Theme Token Group**: Represents a named set of semantic visual values (background, surface, text, accent, border, ring) for a given mode.
- **Theme Toggle Control**: Represents the user-facing action in global navigation that reads and updates the active Theme Mode.

## Success Criteria _(mandatory)_

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 100% of reviewed primary routes show a visible theme change in global background and primary text within one interaction of the toggle.
- **SC-002**: 100% of reviewed shared UI components (including button variants used in the header) render with readable contrast in both modes.
- **SC-003**: 100% of theme toggles executed through keyboard interaction complete successfully without loss of visible focus.
- **SC-004**: Theme preference remains consistent after reload in at least 5 consecutive manual mode-switch-and-refresh cycles.

### Rewrite Quality Outcomes _(mandatory for rewrite features)_

- **RQ-001**: No npm/yarn/bun commands remain in feature docs or scripts touched by the feature.
- **RQ-002**: No duplicate smooth-scroll runtime providers exist after implementation.
- **RQ-003**: SSR rendering is present for all indexable pages modified by the feature unless an approved exception is documented.
- **RQ-004**: No legacy hardcoded palette values remain in shared theme tokens where semantic light/dark variables are expected.
