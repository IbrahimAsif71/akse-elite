# Data Model: Core Layout, UI Foundation, and Routing

**Date**: 2026-03-05 | **Branch**: `001-core-layout-foundation`

> This phase has no persistent data entities or CMS models. The data model captures
> **runtime state** managed by components and plugins — the reactive values that
> drive the UI foundation.

## Runtime State Entities

### NavigationState

Managed by `SiteNav.vue`. Controls mobile drawer and active link presentation.

| Field          | Type                  | Description                                                                       |
| -------------- | --------------------- | --------------------------------------------------------------------------------- |
| `isDrawerOpen` | `Ref<boolean>`        | Whether the mobile Sheet drawer is open. Drives body scroll lock.                 |
| `activeRoute`  | `ComputedRef<string>` | Current `route.path` — determines which nav link receives the animated underline. |

**Relationships**: Consumed by `SiteNav.vue`. `isDrawerOpen` indirectly affects Lenis (scroll lock when drawer is open).

**Validation rules**: None (boolean toggle + derived from router).

**State transitions**: `isDrawerOpen`: `false → true` (hamburger tap) → `true → false` (link tap, outside tap, Escape key, route change).

---

### PageVeilState

Managed by `PageVeil.vue`. Controls the route transition overlay.

| Field       | Type                  | Description                                                      |
| ----------- | --------------------- | ---------------------------------------------------------------- |
| `active`    | `Ref<boolean>`        | Whether the veil overlay is visible (fading in or fully opaque). |
| `veilTimer` | `number \| undefined` | setTimeout ID for fade-out delay. Cleared on rapid navigation.   |

**Relationships**: Driven by Nuxt `page:start` / `page:finish` hooks. Uses `useMediaQuery` for reduced-motion duration.

**State transitions**: `active`: `false → true` (on `page:start`) → `true → false` (300ms after `page:finish`, or ≤50ms under reduced motion).

---

### ScrollProgressState

Managed by `ScrollProgress.vue`. Tracks scroll depth.

| Field      | Type          | Description                                                                |
| ---------- | ------------- | -------------------------------------------------------------------------- |
| `progress` | `Ref<number>` | Scroll depth as a value from 0 to 1. Drives the width of the progress bar. |

**Relationships**: Reads from Lenis scroll events (when Lenis is active) or native `scroll` event (when Lenis is null / reduced motion).

**Validation rules**: Clamped to `[0, 1]` — never negative, never exceeds 1.

---

### LenisProviderState

Managed by `plugins/lenis.client.ts`. Global smooth-scroll runtime.

| Field   | Type                 | Description                                                                                                    |
| ------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `lenis` | `Ref<Lenis \| null>` | The Lenis instance, or `null` when reduced motion is preferred. Provided to the app via `useNuxtApp().$lenis`. |

**Relationships**: Consumed by `ScrollProgress.vue` (scroll events), `SiteNav.vue` (scroll lock coordination). Integrates with GSAP ticker and ScrollTrigger.

**State transitions**: `null → Lenis` (on plugin init when reduced motion is off, or on mid-session toggle from reduce → no-preference). `Lenis → null` (on mid-session toggle to reduce, or on plugin teardown/HMR).

---

### ReducedMotionState

Managed by `@vueuse/core` `useMediaQuery` composable. Global accessibility signal.

| Field       | Type           | Description                                                                  |
| ----------- | -------------- | ---------------------------------------------------------------------------- |
| `isReduced` | `Ref<boolean>` | Whether the user prefers reduced motion. Reactive to mid-session OS changes. |

**Relationships**: Read by `lenis.client.ts` (skip instantiation), `gsap.client.ts` (duration defaults), `PageVeil.vue` (transition timing), `SiteNav.vue` (underline animation).

---

## Entity Relationship Summary

```
ReducedMotionState ──reads──▶ LenisProviderState
                    ──reads──▶ PageVeilState (duration)
                    ──reads──▶ GSAP defaults (duration)

LenisProviderState ──scroll events──▶ ScrollProgressState
                   ──scroll events──▶ ScrollTrigger.update

NavigationState.isDrawerOpen ──lock/unlock──▶ LenisProviderState (stop/start)

Nuxt page:start / page:finish ──drives──▶ PageVeilState
Router.afterEach ──resets──▶ LenisProviderState (scrollTo 0)
```
