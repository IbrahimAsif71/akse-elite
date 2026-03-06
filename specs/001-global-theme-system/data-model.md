# Data Model: Global Light and Dark Mode System

**Date**: 2026-03-06  
**Feature**: 001-global-theme-system

## Entity: ThemeMode

- Description: Active visual mode resolved by runtime.
- Allowed values: `light`, `dark`, `system` (selection), with resolved runtime output `light|dark`.
- Validation rules:
  - Persisted value must be one of allowed values.
  - Invalid persisted values fall back to module default.
- State transitions:
  - `light -> dark` via toggle action.
  - `dark -> light` via toggle action.
  - `system -> light|dark` based on OS preference at render time.

## Entity: ThemeTokenSet

- Description: Semantic color variables for one mode.
- Fields:
  - `background`
  - `foreground`
  - `card`
  - `card-foreground`
  - `popover`
  - `popover-foreground`
  - `primary`
  - `primary-foreground`
  - `secondary`
  - `secondary-foreground`
  - `muted`
  - `muted-foreground`
  - `accent`
  - `accent-foreground`
  - `border`
  - `input`
  - `ring`
- Validation rules:
  - Every semantic token required by shadcn-vue must exist in both light and dark modes.
  - Token values must maintain readable contrast in intended contexts.

## Entity: ThemeToggleControl

- Description: Header-level control that mutates `ThemeMode`.
- Fields:
  - `aria-label` (string, required)
  - `icon` (sun|moon, derived from current mode)
  - `variant` (`ghost`)
- Validation rules:
  - Control must be keyboard activatable.
  - Focus indication must be visible.
  - Icon state must correspond to currently resolved mode.
