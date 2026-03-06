# Feature Specification: Site-Wide Logo

**Feature Branch**: `002-site-logo`  
**Created**: 2026-03-06  
**Status**: Draft  
**Input**: User description: "I have a akse.png in public folder, I want to use that as my logo site wide"

## User Scenarios & Testing _(mandatory)_

### User Story 1 — Navigation Bar Logo (Priority: P1)

As a visitor, I see the AKSE brand logo (from `akse.png`) in the navigation bar on every page, so I immediately recognize the brand and can click it to return to the homepage.

**Why this priority**: The navigation bar is the single most visible, persistent element across the entire site. Replacing the placeholder logo here delivers instant brand recognition on every page view.

**Independent Test**: Can be fully tested by loading any page and verifying the logo image renders in the nav bar, is clickable to `/`, and is properly sized.

**Acceptance Scenarios**:

1. **Given** a visitor lands on any page, **When** the page loads, **Then** the AKSE logo image is visible in the top-left area of the navigation bar.
2. **Given** a visitor sees the logo in the nav, **When** they click the logo, **Then** they are navigated to the homepage (`/`).
3. **Given** a visitor is on a mobile device (viewport < 768px), **When** the page loads, **Then** the logo is visible at a proportionally smaller size that fits the mobile nav bar.
4. **Given** a screen reader encounters the logo, **When** it reads the element, **Then** it announces meaningful alternative text identifying the brand (e.g., "AKSE — Home").

---

### User Story 2 — Footer Brand Logo (Priority: P2)

As a visitor, I see the AKSE brand logo in the footer, reinforcing brand identity at the bottom of every page.

**Why this priority**: The footer is the second highest-visibility branding location. Using the logo image here (instead of plain text) creates visual consistency between the nav and footer.

**Independent Test**: Can be tested by scrolling to the footer on any page and verifying the logo image renders correctly.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to the bottom of any page, **When** the footer is visible, **Then** the AKSE logo image appears in the brand column.
2. **Given** the footer logo is displayed, **When** it renders, **Then** it is appropriately sized for the footer context (smaller than the nav logo).

---

### User Story 3 — Legacy Placeholder Cleanup (Priority: P3)

As a developer, the placeholder SVG (`logo-placeholder.svg`) is removed from the codebase, so there are no orphaned assets or references left behind.

**Why this priority**: Cleanup is low-risk but necessary to maintain a clean codebase per the constitution's rewrite cleanup principle.

**Independent Test**: Can be tested by searching the codebase for any reference to `logo-placeholder` and confirming zero results, and verifying the SVG file no longer exists in `public/`.

**Acceptance Scenarios**:

1. **Given** the logo has been replaced in all components, **When** a developer searches for `logo-placeholder`, **Then** zero results are found in any source file.
2. **Given** the placeholder SVG was in `public/`, **When** the feature is complete, **Then** `public/logo-placeholder.svg` no longer exists.

---

### Edge Cases

- What happens if `akse.png` fails to load (network error, corrupt file)? The `alt` text should provide a readable brand fallback, and the layout should not break.
- What happens on high-DPI / Retina displays? The source image (2618×864) is large enough to render crisply at 2× the displayed size.
- What happens when the image is rendered in the mobile nav drawer? The logo should render correctly if displayed in the mobile Sheet drawer context.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The navigation bar MUST display `/akse.png` as the brand logo instead of the current placeholder SVG.
- **FR-002**: The navigation bar logo MUST link to the homepage (`/`).
- **FR-003**: The logo MUST have meaningful alternative text for accessibility (the existing `aria-label` on the parent link satisfies this; the `<img>` itself may use `alt=""` as a decorative image within the labeled link, or use descriptive `alt` text).
- **FR-004**: The logo MUST render at an appropriate display size in the nav bar (constrained height to fit within the 64px / `h-16` nav bar, with proportional width).
- **FR-005**: The footer brand column MUST display the AKSE logo image instead of the current plain text "AKSE".
- **FR-006**: The footer logo MUST render at a contextually appropriate size (smaller than the nav logo).
- **FR-007**: The legacy `public/logo-placeholder.svg` file MUST be removed.
- **FR-008**: All references to `logo-placeholder.svg` MUST be removed from the codebase.
- **FR-009**: The logo MUST be visible and appropriately scaled on both mobile (< 768px) and desktop viewports.
- **FR-010**: The logo image MUST be included in the SSR-rendered HTML (no client-only lazy loading for the primary brand mark).

### Constitution Alignment Requirements _(mandatory)_

- **CAR-001 (Stack)**: Implementation MUST use Nuxt 4 + Vue 3 Composition API with `script setup` for authored pages/components.
- **CAR-002 (Package Manager)**: All install/run instructions MUST use pnpm only.
- **CAR-003 (UI System)**: Structural UI styling MUST use Tailwind utilities and shadcn-vue component patterns.
- **CAR-006 (Rewrite Cleanup)**: The legacy placeholder SVG artifact MUST be removed.

### Assumptions

- The `akse.png` file in `public/` is the finalized brand logo and does not require design revisions.
- The logo contains the brand wordmark (no separate text "AKSE" is needed alongside it). If the image is purely a logomark (icon only), a text label may still be appropriate — but given the wide 3:1 aspect ratio (2618×864), it is assumed to contain the wordmark.
- No favicon or Open Graph image changes are in scope; this feature covers only in-page logo usage.
- The existing `akse.png` size (~115KB) is acceptable for now. Image optimization (WebP conversion, responsive `srcset`) is out of scope for this feature but could be a future enhancement.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: The brand logo image is visible on every page in the navigation bar within the initial server-rendered HTML.
- **SC-002**: The brand logo image is visible in the footer on every page.
- **SC-003**: No references to `logo-placeholder.svg` remain in any source file or the `public/` directory.
- **SC-004**: The logo is correctly sized and does not overflow or break the layout on viewports from 320px to 2560px wide.
- **SC-005**: The page remains accessible — the logo link has appropriate labeling for screen readers.

### Rewrite Quality Outcomes _(mandatory for rewrite features)_

- **RQ-001**: No npm/yarn/bun commands remain in feature docs or scripts touched by the feature.
- **RQ-002**: The legacy `logo-placeholder.svg` is fully removed (file and all references).
- **RQ-003**: SSR rendering is present for the logo image on all pages — the `<img>` tag appears in the initial HTML response.
