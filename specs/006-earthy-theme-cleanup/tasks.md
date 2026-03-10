# Tasks: Earthy Theme Cleanup

**Input**: Design documents from `/specs/006-earthy-theme-cleanup/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Remove shared configuration and dependencies that underpin dark mode

- [x] T001 Remove `@nuxtjs/color-mode` from modules array and delete the `colorMode: { ... }` config block in `nuxt.config.ts`
- [x] T002 Remove `darkMode: "class"` setting from `tailwind.config.ts`
- [x] T003 Uninstall `@nuxtjs/color-mode` package via `pnpm remove @nuxtjs/color-mode` and verify `package.json` updated

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Remove CSS-level dark theme tokens — MUST be complete before any user story component edits to avoid broken intermediate states

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Delete the entire `.dark { ... }` CSS rule block from `assets/css/main.css` (lines ~53–88), preserving the `:root` block with `color-scheme: light`

**Checkpoint**: Foundation ready — dark mode infrastructure fully removed. Component-level cleanup can now begin.

---

## Phase 3: User Story 1 — Unified Earthy Light Theme (Priority: P1) 🎯 MVP

**Goal**: Every page renders exclusively in the earthy beige palette with no dark mode artifacts. Theme toggle removed from navigation. Globe and Aurora use hardcoded light values.

**Independent Test**: Navigate every page and confirm earthy palette renders. No `.dark` class, no `dark:` utilities, no theme toggle visible. OS dark mode preference ignored.

### Implementation for User Story 1

- [x] T005 [P] [US1] Remove `ThemeToggle` import and both `<ThemeToggle />` instances (desktop + mobile) from `components/SiteNav.vue`
- [x] T006 [P] [US1] Delete component file `components/ThemeToggle.vue`
- [x] T007 [P] [US1] Remove all `dark:` prefixed Tailwind utility classes from CVA button variant definitions in `components/ui/button/index.ts` (base: `dark:aria-invalid:ring-destructive/40`; destructive: `dark:focus-visible:ring-destructive/40 dark:bg-destructive/60`; outline: `dark:bg-input/30 dark:border-input dark:hover:bg-input/50`; ghost: `dark:hover:bg-accent/50`)
- [x] T008 [US1] Remove `useColorMode()` import/call, delete `getGlobeTheme` function's dark branch (hardcode light values: `baseColor: [0.953, 0.922, 0.875]`, `dark: 0`), and remove `watch(() => colorMode.value, ...)` watcher in `components/Home/HeroCinematic.vue`
- [x] T009 [P] [US1] Remove `dark:opacity-80` class from the Aurora wrapper div (keep `opacity-50`) and update Aurora middle color stop from `#0E1516` to `#3b2e1f` in `components/Home/HeroCinematic.vue`
- [x] T010 [P] [US1] Delete the `.dark .bento-section { ... }` CSS rule and replace `--background-dark: var(--card)` usage with `var(--card)` directly in the inline style `backgroundColor` fallback in `components/Home/MagicBento.vue`

**Checkpoint**: All pages render earthy palette only. No theme toggle. No dark mode CSS or JS.

---

## Phase 4: User Story 2 — Remove Custom Cursor (Priority: P2)

**Goal**: No custom cursor overlay renders on any page. Standard browser cursor used everywhere.

**Independent Test**: Hover over all interactive elements on every page — only native browser cursor appears. No custom cursor DOM element in rendered HTML.

### Implementation for User Story 2

- [x] T011 [P] [US2] Remove `<CustomCursor />` from the template in `layouts/default.vue`
- [x] T012 [P] [US2] Delete component file `components/CustomCursor.vue`
- [x] T013 [P] [US2] Remove `data-cursor="action"` attribute from the NuxtLink in `components/Home/MassiveCTA.vue`

**Checkpoint**: Native cursor everywhere. No custom cursor component or attributes in codebase.

---

## Phase 5: User Story 3 — Remove Magnetic Hover Effects (Priority: P3)

**Goal**: No magnetic pull behavior on interactive elements. Buttons and cards stay in place on hover.

**Independent Test**: Hover over CTA buttons and tech showcase cards — elements do not shift position toward cursor.

### Implementation for User Story 3

- [x] T014 [P] [US3] Unwrap `<MagneticWrapper>` from `components/Home/MassiveCTA.vue` — remove the wrapper tags, keep the NuxtLink child as a direct child of the parent container
- [x] T015 [P] [US3] Replace `<MagneticWrapper v-for="item in techItems" :key="item.name" :strength="0.2" :class="sizeClass(item.size)">` with `<div v-for="item in techItems" :key="item.name" :class="sizeClass(item.size)">` (and closing `</MagneticWrapper>` → `</div>`) in `components/About/TechShowcase.vue`
- [x] T016 [US3] Delete component file `components/MagneticWrapper.vue`

**Checkpoint**: No magnetic hover effects on any element. All wrapped content preserved and functional.

---

## Phase 6: User Story 4 — Clean Codebase (Priority: P4)

**Goal**: Zero dead code referencing dark mode, custom cursor, or magnetic wrappers.

**Independent Test**: Grep codebase for `useColorMode`, `ThemeToggle`, `CustomCursor`, `MagneticWrapper`, `.dark `, `dark:`, `data-cursor` — zero matches in active source files.

### Implementation for User Story 4

- [x] T017 [US4] Run codebase-wide grep validation: search for `useColorMode`, `ThemeToggle`, `CustomCursor`, `MagneticWrapper`, `data-cursor`, `.dark `, and `dark:` across all `.vue`, `.ts`, and `.css` files — fix any remaining references found
- [x] T018 [US4] Run `pnpm build` and verify clean build with no errors or warnings related to removed components/modules
- [x] T019 [US4] Run quickstart.md validation checklist: visually verify all pages show earthy beige background, no theme toggle, no custom cursor, no magnetic pull, globe renders cream/beige

**Checkpoint**: Codebase fully clean. Production build succeeds. All pages visually verified.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — core theme cleanup
- **US2 (Phase 4)**: Depends on Phase 2 — can run in PARALLEL with US1 and US3
- **US3 (Phase 5)**: Depends on Phase 2 — can run in PARALLEL with US1 and US2
- **US4 (Phase 6)**: Depends on US1 + US2 + US3 all being complete — final validation sweep

### Within Each User Story

- Tasks marked [P] within the same story can run in parallel (different files)
- T008 and T009 both edit HeroCinematic.vue — T008 should complete before T009 (or combine)
- T013 and T014 both edit MassiveCTA.vue — T013 should complete before T014 (or combine)

### Parallel Opportunities

```
Phase 1 (sequential):  T001 → T002 → T003
Phase 2 (single task):  T004
                        ┌─── Phase 3 (US1): T005‖T006‖T007 → T008 → T009‖T010
Phase 2 done → fork → ├─── Phase 4 (US2): T011‖T012‖T013
                        └─── Phase 5 (US3): T014‖T015 → T016
All stories done → Phase 6 (US4): T017 → T018 → T019
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T003)
2. Complete Phase 2: Foundational (T004)
3. Complete Phase 3: User Story 1 (T005–T010)
4. **STOP and VALIDATE**: Theme renders correctly, no dark mode artifacts
5. Deploy/demo if ready — site is fully usable with earthy palette

### Incremental Delivery

1. Setup + Foundational → Dark mode infrastructure removed
2. Add US1 → Earthy palette everywhere, no toggle → **MVP!**
3. Add US2 → Custom cursor removed → Clean browsing experience
4. Add US3 → Magnetic effects removed → Predictable interactions
5. Add US4 → Codebase validated clean → Ready for future development

---

## Notes

- All changes are subtractive — no new files or components created
- 3 component files deleted: ThemeToggle.vue, CustomCursor.vue, MagneticWrapper.vue
- 1 package removed: @nuxtjs/color-mode
- Total task count: 19
- [P] tasks within the same phase can run in parallel (different files)
- Commit after each phase for clean git history
