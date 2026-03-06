# UI Contract: Global Theme System

**Feature**: 001-global-theme-system

## Contract 1: Theme Runtime Contract

- Module: `@nuxtjs/color-mode`
- Required behavior:
  - Applies `.dark` class to the `html` element when dark mode is active.
  - Persists selected mode across reloads.
  - Exposes runtime mode state for UI controls.

### Acceptance checks

1. Selecting dark mode results in `html.dark` present in DOM.
2. Reload preserves chosen mode.
3. System mode resolves according to OS preference when no explicit override exists.

## Contract 2: CSS Token Contract

- Surface: `assets/css/main.css`
- Required behavior:
  - `:root` defines complete light semantic token set.
  - `.dark` defines complete dark semantic token set.
  - Tailwind theme mapping references semantic tokens, not hardcoded per-component colors.

### Acceptance checks

1. Core tokens (`--background`, `--foreground`, `--primary`, `--accent`, `--border`) exist in both modes.
2. Shared components (Button, Sheet, nav/footer surfaces) visually switch without component-level token rewrites.

## Contract 3: ThemeToggle Component Contract

- Component: `components/ThemeToggle.vue`
- Public contract:
  - Renders a shadcn ghost button.
  - Activating control toggles light/dark mode.
  - Displays moon icon when current mode is light.
  - Displays sun icon when current mode is dark.
  - Provides accessible label and visible focus state.

### Acceptance checks

1. Button is reachable and operable via keyboard.
2. Icon updates immediately after toggle.
3. Component can be embedded in `SiteNav` and remain functional on all routes.
