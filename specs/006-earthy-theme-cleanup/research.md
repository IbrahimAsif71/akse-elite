# Research: Earthy Theme Cleanup

**Feature**: 006-earthy-theme-cleanup
**Date**: 2026-03-09

## Research Task 1: Safe removal of @nuxtjs/color-mode module

**Decision**: Remove entirely — uninstall via pnpm, remove from modules array and colorMode config block in nuxt.config.ts.

**Rationale**: The module's sole purpose is managing the `.dark` / `.light` class toggle on the `<html>` element and persisting preference to localStorage. Once the site is light-only, this functionality is unnecessary. No other Nuxt composable or plugin depends on `useColorMode()` outside the two identified consumers (ThemeToggle.vue, HeroCinematic.vue). The `color-scheme: light` CSS declaration in `:root` tells browsers to use light form controls, scrollbars, etc. — this is a CSS-native mechanism and does not require the module.

**Alternatives considered**:

- Keep module but lock to `preference: "light"` — rejected because it adds unnecessary JS overhead and a dependency for zero value.
- Remove module but keep the npm package — rejected because unused packages add to install time and audit surface.

## Research Task 2: HeroCinematic globe hardcoding strategy

**Decision**: Remove the `getGlobeTheme` function's dark branch and the `colorMode` watcher. Hardcode light values directly in the `initGlobe` function.

**Rationale**: The cobe globe library accepts `dark: 0 | 1` as a rendering flag controlling internal lighting. Setting `dark: 0` with `baseColor: [0.953, 0.922, 0.875]` produces a warm cream globe matching the earthy palette. The `markerColor` and `glowColor` are already the same in both themes (copper #C9653D as RGB normalized). The `watch()` on `colorMode.value` that triggers `initGlobe()` can be removed — no mode changes will occur.

**Light-only values**:

- `baseColor`: `[0.953, 0.922, 0.875]` (cream/beige — matches #f3ebdf)
- `markerColor`: `[0.788, 0.396, 0.239]` (copper/orange — #C9653D)
- `glowColor`: `[0.788, 0.396, 0.239]` (copper/orange — #C9653D)
- `dark`: `0`

**Alternatives considered**:

- Keep `getGlobeTheme` but always pass "light" — rejected because dead code that has no branching reason to exist.

## Research Task 3: Aurora color stops update

**Decision**: Update the Aurora middle color stop from `#0E1516` (dark navy) to an earthy dark tone that works with the beige background.

**Rationale**: The Aurora component renders a shader-based background animation with 3 color stops. The current stops are `['#C9653D', '#0E1516', '#C9653D']` — copper, dark navy, copper. The `#0E1516` was the dark mode background color and creates a cinematic dark wash. For a light-only earthy palette, the middle stop should be a deep earth tone that complements the beige background rather than clashing as a dark void. Options:

- `#3b2e1f` — deep warm brown (earthy, heritage feel)
- `#2f261e` — the site's text color (very dark brown)
- `#4a3728` — medium-dark brown

**Decision**: Use `#3b2e1f` (deep warm brown) — it creates a subtle warm wave effect against the beige background without being too dark or too light, maintaining the premium feel while being earthy rather than cinematic-dark.

**Alternatives considered**:

- Keep `#0E1516` — rejected because it creates a jarring dark void on the beige background at 50% opacity.
- Use a beige shade — rejected because low contrast between Aurora and background makes the animation invisible.

## Research Task 4: MagneticWrapper unwrapping pattern

**Decision**: Replace `<MagneticWrapper>` with a plain container (div or template) preserving all child content, props, events, and classes.

**Rationale**: MagneticWrapper renders its slot content inside a dynamic component (default `div`). In MassiveCTA, it wraps a NuxtLink button. In TechShowcase, it wraps Card components in a v-for loop with `:strength="0.2"` and `:class="sizeClass(item.size)"`. The unwrapping must:

- **MassiveCTA**: Remove `<MagneticWrapper>` tags — the NuxtLink becomes a direct child of the parent container. No `:class` or `:strength` props to preserve.
- **TechShowcase**: Replace `<MagneticWrapper v-for="..." :key="..." :strength="0.2" :class="sizeClass(item.size)">` with a simple `<div v-for="..." :key="..." :class="sizeClass(item.size)">`. The `v-for`, `:key`, and `:class` must transfer to the replacement element. The `:strength` prop is dropped.

**Alternatives considered**:

- Keep MagneticWrapper component but disable the effect via a prop — rejected because it adds dead code complexity for zero benefit.

## Research Task 5: MagicBento dark CSS cleanup

**Decision**: Remove the `.dark .bento-section` CSS rule entirely. Rename `--background-dark` to `--card-bg` or just use `var(--card)` directly.

**Rationale**: The `.bento-section` CSS block defines custom properties including `--background-dark: var(--card)`. The `.dark .bento-section` override only changes `--border-color` for dark mode. Since dark mode is being removed:

- The `.dark .bento-section` rule becomes dead code — delete it.
- The `--background-dark` variable name is misleading in a light-only context. The inline style `backgroundColor: card.color || 'var(--background-dark)'` can be changed to use `var(--card)` directly.

**Alternatives considered**:

- Rename `--background-dark` to `--card-bg` — acceptable but unnecessary indirection since `var(--card)` is a well-defined semantic token.

## Research Task 6: Tailwind darkMode config removal

**Decision**: Remove `darkMode: "class"` from tailwind.config.ts.

**Rationale**: With `darkMode: "class"`, Tailwind generates `dark:` variant utilities that activate when a `.dark` class is present on an ancestor. Since no `.dark` class will ever be applied and all `dark:` utilities are being removed from source, this config option is unnecessary. Removing it ensures no `dark:` utilities are generated in the production CSS, reducing bundle size.

**Alternatives considered**:

- Keep the config but just remove usage — rejected because it leaves a configuration that generates unused CSS and signals dark mode support that doesn't exist.

## Research Task 7: Button variant dark: class removal

**Decision**: Strip all `dark:` prefixed classes from the CVA button variant definitions.

**Rationale**: The shadcn-vue button variants use `dark:` utilities for alternative styling in dark mode. With dark mode removed, these classes will never activate and are dead weight. The affected variants:

- **Base**: `dark:aria-invalid:ring-destructive/40` → remove
- **destructive**: `dark:focus-visible:ring-destructive/40 dark:bg-destructive/60` → remove
- **outline**: `dark:bg-input/30 dark:border-input dark:hover:bg-input/50` → remove
- **ghost**: `dark:hover:bg-accent/50` → remove

The light-mode classes remain and provide correct styling for the earthy palette.

**Alternatives considered**:

- Replace dark: classes with equivalent light-mode classes — rejected because the existing light-mode classes already provide appropriate styling.
