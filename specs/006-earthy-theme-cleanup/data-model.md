# Data Model: Earthy Theme Cleanup

**Feature**: 006-earthy-theme-cleanup
**Date**: 2026-03-09

## Overview

This feature does not introduce new data entities. It simplifies the existing theme token architecture from a dual-theme (light/dark) system to a single-theme (light earthy) system.

## Theme Token Model (Post-Cleanup)

### CSS Custom Properties (`:root` only)

| Token                 | Value     | Semantic Role               |
| --------------------- | --------- | --------------------------- |
| `--bg`                | `#f3ebdf` | Page background             |
| `--surface`           | `#fbf6ee` | Card/panel background       |
| `--surface-alt`       | `#ece2d2` | Muted surfaces, code blocks |
| `--text`              | `#2f261e` | Primary text color          |
| `--text-muted`        | `#6b5a49` | Secondary/caption text      |
| `--orange`            | `#c9653d` | Brand primary accent        |
| `--orange-foreground` | `#fff7ef` | Text on orange backgrounds  |
| `--teal`              | `#2c7a83` | Brand secondary accent      |

### Semantic Aliases (shadcn-vue mapping)

| Alias           | Maps To              | Used By                     |
| --------------- | -------------------- | --------------------------- |
| `--background`  | `var(--bg)`          | `bg-background` utilities   |
| `--foreground`  | `var(--text)`        | `text-foreground` utilities |
| `--card`        | `var(--surface)`     | Card components             |
| `--primary`     | `var(--orange)`      | Buttons, links, accents     |
| `--secondary`   | `#e2d4c0`            | Secondary buttons           |
| `--muted`       | `var(--surface-alt)` | Muted panels                |
| `--accent`      | `#f0e4d3`            | Hover backgrounds           |
| `--border`      | `#d9cab4`            | Borders, dividers           |
| `--ring`        | `var(--orange)`      | Focus rings                 |
| `--destructive` | `#b91c1c`            | Error states                |

### Tailwind Theme Mapping (via `@theme inline`)

| Tailwind Utility        | CSS Variable        |
| ----------------------- | ------------------- |
| `bg-background`         | `var(--background)` |
| `text-foreground`       | `var(--foreground)` |
| `bg-primary`            | `var(--primary)`    |
| `text-primary`          | `var(--primary)`    |
| `bg-rust` / `bg-orange` | `var(--orange)`     |
| `bg-teal`               | `var(--teal)`       |

### Globe Theme Constants (HeroCinematic)

| Property      | Value                   | Hex Equivalent    |
| ------------- | ----------------------- | ----------------- |
| `baseColor`   | `[0.953, 0.922, 0.875]` | ~#f3ebdf (cream)  |
| `markerColor` | `[0.788, 0.396, 0.239]` | ~#c9653d (copper) |
| `glowColor`   | `[0.788, 0.396, 0.239]` | ~#c9653d (copper) |
| `dark`        | `0`                     | Light mode flag   |

### Aurora Color Stops (HeroCinematic)

| Index | Value     | Role                   |
| ----- | --------- | ---------------------- |
| 0     | `#C9653D` | Copper/orange start    |
| 1     | `#3b2e1f` | Deep warm brown middle |
| 2     | `#C9653D` | Copper/orange end      |

## Removed Entities

| Entity                      | Previous Role                    | Replacement             |
| --------------------------- | -------------------------------- | ----------------------- |
| `.dark` CSS block           | Dark mode token overrides        | N/A — deleted           |
| `colorMode` state           | Reactive theme preference        | N/A — deleted           |
| `ThemeToggle` component     | User theme switch                | N/A — deleted           |
| `CustomCursor` component    | Animated cursor overlay          | Native browser cursor   |
| `MagneticWrapper` component | Hover magnetic pull effect       | Plain `<div>` container |
| `darkMode: "class"` config  | Tailwind dark variant activation | N/A — removed           |

## State Transitions

No state transitions — the theme is now static (always light earthy). No runtime theme changes, no localStorage persistence, no OS preference detection.
