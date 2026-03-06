# Tasks: Global Light and Dark Mode System

**Input**: Design documents from `/specs/001-global-theme-system/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not explicitly requested in the feature specification; test tasks are not included.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Enable framework-level theme runtime and Tailwind class-based dark mode prerequisites.

- [x] T001 Install `@nuxtjs/color-mode` with pnpm and update dependencies in `package.json`
- [x] T002 [P] Add `@nuxtjs/color-mode` module registration and baseline color-mode config in `nuxt.config.ts`
- [x] T003 [P] Create `tailwind.config.ts` with `darkMode: 'class'` and project content paths for this Nuxt app

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish global semantic token architecture that all stories depend on.

**⚠️ CRITICAL**: No user story implementation should begin until this phase is complete.

- [x] T004 Refactor `assets/css/main.css` to define full light-mode semantic tokens in `:root` (background, surface, text, border, accent roles)
- [x] T005 Refactor `assets/css/main.css` to define full dark-mode semantic tokens in `.dark` using cinematic palette values (`#0e1516`, `#F3EDE7`, `#C9653D`, `#2C7A83`)
- [x] T006 Ensure `@theme inline` mappings in `assets/css/main.css` point to semantic variables (no hardcoded component palette values)
- [x] T007 Remove legacy always-dark comments/assumptions and update global base styles in `assets/css/main.css` for dual-mode behavior

**Checkpoint**: Global token system is in place and runtime can switch mode classes without per-element rewrites.

---

## Phase 3: User Story 1 - Switch Themes Site-Wide (Priority: P1) 🎯 MVP

**Goal**: Visitors can switch light/dark globally and see full palette transitions with persistence.

**Independent Test**: Toggle mode on any route; verify global background, text, and accent colors switch correctly and remain selected after reload.

### Implementation

- [x] T008 [US1] Configure `colorMode` options (`classSuffix`, `fallback`, `preference`) in `nuxt.config.ts` for deterministic class strategy behavior
- [x] T009 [US1] Implement light earthy palette tokens (beige/light-neutral + orange primary accents) in `assets/css/main.css`
- [x] T010 [US1] Implement dark legacy palette tokens (cinematic background and rust/teal accents) in `assets/css/main.css`
- [x] T011 [US1] Validate required shadcn semantic token coverage in both modes within `assets/css/main.css` (`--background`, `--foreground`, `--primary`, `--accent`, `--border`, `--ring`, component surface tokens)

**Checkpoint**: Site-wide palette switching and theme persistence are functional.

---

## Phase 4: User Story 2 - Toggle Theme from Navigation (Priority: P2)

**Goal**: Visitors can toggle themes from a global, accessible header control.

**Independent Test**: On multiple routes, activate the header toggle with mouse and keyboard; verify theme changes and icon state updates (moon in light, sun in dark).

### Implementation

- [x] T012 [US2] Create `components/ThemeToggle.vue` using shadcn `Button` ghost variant and `useColorMode` toggle logic
- [x] T013 [US2] Add dynamic sun/moon icon rendering and accessible labeling behavior in `components/ThemeToggle.vue`
- [x] T014 [US2] Integrate `ThemeToggle` into desktop header layout in `components/SiteNav.vue`
- [x] T015 [US2] Integrate `ThemeToggle` into mobile header context in `components/SiteNav.vue` while preserving keyboard focus visibility

**Checkpoint**: Theme toggle is globally accessible from the site header and behaves accessibly.

---

## Phase 5: User Story 3 - Themed Component Consistency (Priority: P3)

**Goal**: Shared components inherit semantic tokens consistently without scattered hardcoded mode styles.

**Independent Test**: Review key components in both modes and confirm consistent, readable surfaces/text/accents without ad hoc per-element mode patching.

### Implementation

- [x] T016 [P] [US3] Audit and normalize nav theme classes in `components/SiteNav.vue` to rely on semantic tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-accent`)
- [x] T017 [P] [US3] Audit and normalize footer theme classes in `components/SiteFooter.vue` to rely on semantic tokens and preserve contrast in both modes
- [x] T018 [US3] Finalize token parity in `assets/css/main.css` so shared component surfaces (card/popover/muted/accent/input) resolve correctly in both modes

**Checkpoint**: Shared UI surfaces and typography remain visually coherent across both themes.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup across all stories.

- [x] T019 [P] Verify contract checks in `specs/001-global-theme-system/contracts/theme-ui-contract.md` against implementation files (`nuxt.config.ts`, `assets/css/main.css`, `components/ThemeToggle.vue`, `components/SiteNav.vue`)
- [x] T020 [P] Run end-to-end validation steps from `specs/001-global-theme-system/quickstart.md` and confirm all scenarios pass
- [x] T021 Run production build verification (`pnpm build`) for changes in `nuxt.config.ts`, `assets/css/main.css`, `components/ThemeToggle.vue`, and `components/SiteNav.vue`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies; starts immediately
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories
- **Phase 3 (US1)**: Depends on Phase 2
- **Phase 4 (US2)**: Depends on Phase 2; can proceed after foundational work
- **Phase 5 (US3)**: Depends on Phases 3 and 4 outputs for consistency audit
- **Phase 6 (Polish)**: Depends on completion of all user story phases

### User Story Dependencies

- **US1 (P1)**: MVP; independent once foundational phase is complete
- **US2 (P2)**: Independent after foundational phase, integrates into global nav
- **US3 (P3)**: Uses outputs of US1/US2 to finalize consistency

### Parallel Opportunities

- T002 and T003 can run in parallel after T001 (different files: `nuxt.config.ts`, `tailwind.config.ts`)
- T016 and T017 can run in parallel in US3 (different files: `components/SiteNav.vue`, `components/SiteFooter.vue`)
- T019 and T020 can run in parallel during polish (contract verification vs quickstart validation)

---

## Parallel Example: User Story 1

```bash
# US1 token tasks share assets/css/main.css and should be executed sequentially:
Task: "T009 [US1] Implement light earthy palette tokens in assets/css/main.css"
Task: "T010 [US1] Implement dark legacy palette tokens in assets/css/main.css"
```

## Parallel Example: User Story 2

```bash
# US2 tasks depend on ThemeToggle creation and are primarily sequential:
Task: "T012 [US2] Create components/ThemeToggle.vue"
Task: "T014 [US2] Integrate ThemeToggle into desktop header in components/SiteNav.vue"
```

## Parallel Example: User Story 3

```bash
# Story-level audits on separate files:
Task: "T016 [US3] Normalize nav theme classes in components/SiteNav.vue"
Task: "T017 [US3] Normalize footer theme classes in components/SiteFooter.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational)
3. Complete Phase 3 (US1)
4. Validate US1 independently before moving on

### Incremental Delivery

1. Deliver US1 (global switching + persistence)
2. Deliver US2 (header toggle access)
3. Deliver US3 (consistency hardening)
4. Execute final polish validations

### Parallel Team Strategy

1. One developer handles runtime/config (`nuxt.config.ts`, `tailwind.config.ts`)
2. One developer handles tokens (`assets/css/main.css`)
3. One developer handles UI integration (`components/ThemeToggle.vue`, `components/SiteNav.vue`)
