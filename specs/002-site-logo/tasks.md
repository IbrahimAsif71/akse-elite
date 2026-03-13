# Tasks: Site-Wide Logo

**Input**: Design documents from `/specs/002-site-logo/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks grouped by user story. No setup/foundational phases needed — infrastructure from feature 001 is already in place.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: User Story 1 — Navigation Bar Logo (Priority: P1) 🎯 MVP

**Goal**: Replace the placeholder SVG with `akse.png` in the navigation bar, remove the redundant "AKSE" text span, and ensure proper sizing and accessibility.

**Independent Test**: Load any page, verify the logo image renders in the nav, is clickable to `/`, and appears in the SSR HTML.

### Implementation

- [x] T001 [US1] Replace `<img src="/logo-placeholder.svg">` with `<img src="/akse.png" alt="" width="2618" height="864" class="h-8 w-auto md:h-7">` in `components/SiteNav.vue` per research.md R2 and R4
- [x] T002 [US1] Remove the `<span>AKSE</span>` text label next to the logo in `components/SiteNav.vue` per research.md R3

**Checkpoint**: Nav bar shows the real brand logo on all pages. Logo is clickable to `/`, responsive (smaller on mobile), and SSR-rendered.

---

## Phase 2: User Story 2 — Footer Brand Logo (Priority: P2)

**Goal**: Replace the plain text "AKSE" in the footer brand column with the logo image at a smaller display size.

**Independent Test**: Scroll to the footer on any page, verify the logo image renders correctly and is smaller than the nav logo.

### Implementation

- [x] T003 [US2] Replace the `<p>AKSE</p>` text element with `<img src="/akse.png" alt="AKSE" width="2618" height="864" class="h-6 w-auto">` in the brand column of `components/SiteFooter.vue` per research.md R2 and R4

**Checkpoint**: Footer shows the brand logo image instead of plain text. Logo is appropriately sized (h-6, smaller than nav h-8).

---

## Phase 3: User Story 3 — Legacy Placeholder Cleanup (Priority: P3)

**Goal**: Remove the placeholder SVG file and verify no orphaned references remain.

**Independent Test**: Search the codebase for `logo-placeholder` and confirm zero matches. Verify the file is gone from `public/`.

### Implementation

- [x] T004 [US3] Delete `public/logo-placeholder.svg`
- [x] T005 [US3] Search all source files for any remaining references to `logo-placeholder` and remove them (should be zero after T001)

**Checkpoint**: No trace of the placeholder logo in the codebase.

---

## Phase 4: Polish & Validation

**Purpose**: Cross-cutting verification across all user stories.

- [x] T006 Verify SSR output — run `pnpm dev` and `curl http://localhost:3000`, confirm `<img src="/akse.png"` appears in the initial HTML for both nav and footer per SC-001, SC-003, RQ-003

- [x] T007 Run `quickstart.md` scenarios end-to-end — follow all verification steps and confirm all acceptance scenarios pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (US1)**: No dependencies — can start immediately
- **Phase 2 (US2)**: No dependency on Phase 1 (different file) — can run in parallel
- **Phase 3 (US3)**: Depends on Phase 1 completion (T001 replaces the only reference to the placeholder)
- **Phase 4 (Polish)**: Depends on Phases 1–3 completion

### Parallel Opportunities

T001 and T002 modify the same file (`SiteNav.vue`) so they must be sequential. T003 modifies a different file (`SiteFooter.vue`) and can run in parallel with T001/T002:

```text
T001 (SiteNav img) → T002 (SiteNav text removal)
                                                   → T004 (delete placeholder) → T005 (verify cleanup)
T003 (SiteFooter img)  ─────────────────────────────┘
                                                      → T006 (SSR verify) → T007 (quickstart)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001–T002: Nav bar logo replaces placeholder
2. **STOP and VALIDATE**: Logo visible, clickable, responsive, SSR-rendered
3. This alone delivers the primary brand identity improvement

### Full Delivery

1. T001–T002: Nav bar logo (US1)
2. T003: Footer logo (US2) — can overlap with step 1
3. T004–T005: Placeholder cleanup (US3) — after US1 done
4. T006–T007: Validation pass

---

## Notes

- No new dependencies needed — pure template and asset changes
- T001 and T003 set explicit `width="2618" height="864"` HTML attributes to prevent CLS (browser knows aspect ratio before image loads)
- Nav uses `alt=""` (decorative, parent link has `aria-label`); footer uses `alt="AKSE"` (standalone context) per research.md R4
- Mobile sizing: `h-7` (28px) on small viewports, `h-8` (32px) on `md:` and up in nav; `h-6` (24px) in footer
