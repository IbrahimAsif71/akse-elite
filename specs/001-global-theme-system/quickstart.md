# Quickstart: Global Light and Dark Mode System

**Date**: 2026-03-06  
**Branch**: `001-global-theme-system`

## Prerequisites

- On feature branch `001-global-theme-system`
- Dependencies installed with pnpm

## Setup

```bash
pnpm install
pnpm dev
```

App runs at `http://localhost:3000`.

## Validation Flow

### 1) Runtime + configuration

1. Confirm module is installed and configured in `nuxt.config.ts`.
2. Confirm Tailwind dark mode uses class strategy.
3. Load page source and verify no build/runtime errors.

### 2) Light mode baseline

1. Ensure current mode is light.
2. Verify beige/light-neutral page background.
3. Verify primary interactive accents are orange.
4. Verify text is readable on all primary surfaces.

### 3) Dark mode baseline

1. Toggle to dark mode from header toggle.
2. Verify base background appears as `#0e1516`.
3. Verify primary text appears as light warm tone (`#F3EDE7`-family).
4. Verify rust (`#C9653D`) and teal (`#2C7A83`) accents are present.

### 4) Toggle behavior

1. Toggle is visible in global `SiteNav` on multiple routes.
2. Toggle button is keyboard accessible and shows focus ring.
3. Icon semantics:
   - Moon shown in light mode.
   - Sun shown in dark mode.
4. Refresh page and verify chosen theme persists.

### 5) Token propagation

1. Check shared shadcn components (e.g., Button, Sheet) in both modes.
2. Verify they pick up semantic token changes without per-element hardcoded dark classes.
3. Verify background, foreground, border, and accent tokens all switch.

## Build Verification

```bash
pnpm build
```

Build should complete successfully with no theme-related errors.
