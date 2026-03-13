# Component Interface Contracts: Awwwards-Level Home Page

**Created**: 2026-03-06  
**Source**: [spec.md](../spec.md) + [data-model.md](../data-model.md)

---

## Overview

This feature creates new Vue components that expose interfaces via props, emits, and data attributes used for cursor/magnetic interaction targeting. This document defines those contracts so components can be developed independently.

---

## Page Route Contract

| Route | Component         | SSR                                    | SEO Metadata                                           |
| ----- | ----------------- | -------------------------------------- | ------------------------------------------------------ |
| `/`   | `pages/index.vue` | Yes — all text content in initial HTML | title, description, og:title, og:description, og:image |

---

## Component: `components/Home/HeroCinematic.vue`

**Purpose**: Full-viewport hero with animated headline, subtitle, CTAs, and interactive globe.

**Props**: None (self-contained with internal mock data)

**Emits**: None

**Slots**: None

**Data attributes exposed**:

- `data-cursor="drag"` on the globe canvas container — signals CustomCursor to show "Drag" label on hover.

**Internal dependencies**:

- `cobe` (npm) — globe rendering, client-only
- `useColorMode()` — theme detection for globe colors
- `useNuxtApp().$gsap` — headline character reveal animation

---

## Component: `components/Home/FeaturedTours.vue`

**Purpose**: Asymmetric staggered layout of tour cards with parallax images and hover effects.

**Props**: None (self-contained with internal mock data)

**Emits**: None

**Slots**: None

**Data attributes exposed**:

- `data-cursor="explore"` on each tour card — signals CustomCursor to show "Explore" label on hover.

**Internal dependencies**:

- `useNuxtApp().$gsap` + `$ScrollTrigger` — parallax effect on images
- Tour card links point to `/tours` (informational, not functional in mock)

---

## Component: `components/Home/ProcessPinned.vue`

**Purpose**: Scroll-pinned section with horizontal scroll through process steps.

**Props**: None (self-contained with internal mock data)

**Emits**: None

**Slots**: None

**Data attributes exposed**: None

**Internal dependencies**:

- `useNuxtApp().$gsap` + `$ScrollTrigger` — pin + scrub horizontal scroll

---

## Component: `components/Home/MassiveCTA.vue`

**Purpose**: Full-width CTA section with large typography, accent gradient background, and magnetic button.

**Props**: None (self-contained)

**Emits**: None

**Slots**: None

**Data attributes exposed**: None

**Internal dependencies**:

- `MagneticWrapper` component — wraps the "Book a Tour" button
- `useNuxtApp().$gsap` + `$ScrollTrigger` — scale-down effect on preceding content

---

## Component: `components/CustomCursor.vue`

**Purpose**: Global GSAP-driven custom cursor that replaces the default browser cursor on pointer devices.

**Props**: None

**Emits**: None

**Slots**: None

**Interaction contract (data-attribute targeting)**:

The custom cursor reads `data-cursor` attributes on any element in the DOM to determine hover behavior:

| `data-cursor` value | Cursor behavior                  |
| ------------------- | -------------------------------- |
| `"explore"`         | Expand dot + show "Explore" text |
| `"drag"`            | Expand dot + show "Drag" text    |
| `"action"`          | Expand dot (no text)             |
| (none / absent)     | Default small dot                |

**Implementation**: Global `mouseenter`/`mouseleave` event delegation on `[data-cursor]` elements.

**Pointer detection**: Only renders when `window.matchMedia('(pointer: fine)').matches` is true.

**CSS side effect**: Adds `cursor-none` class to `<html>` when active, removes on unmount.

---

## Component: `components/MagneticWrapper.vue`

**Purpose**: Wrapper that applies magnetic hover pull effect to its child content.

**Props**:

| Prop       | Type     | Default | Description                                                              |
| ---------- | -------- | ------- | ------------------------------------------------------------------------ |
| `strength` | `number` | `0.25`  | Pull factor (0–1). 0.25 = element moves 25% of cursor-to-center distance |
| `as`       | `string` | `"div"` | HTML element tag to render as wrapper                                    |

**Emits**: None

**Slots**:

- `default` — The content to apply magnetic effect to

**Pointer detection**: Effect only activates when `window.matchMedia('(pointer: fine)').matches`.

**Internal dependencies**:

- `useNuxtApp().$gsap` — `gsap.set()` for real-time tracking, `gsap.to()` with `elastic.out` for spring-back

---

## Composition: `pages/index.vue`

**Structure** (component composition order):

```vue
<template>
  <div>
    <HomeHeroCinematic />
    <HomeFeaturedTours />
    <HomeProcessPinned />
    <HomeMassiveCTA />
  </div>
</template>
```

**Script setup responsibilities**:

- `useSeoMeta()` — page-level SEO metadata
- No props, no emits — page is a pure composition root

**Global components** (rendered in layout, not in page):

- `CustomCursor` — mounted globally (in layout or app.vue level), reads `data-cursor` from any page
- `SiteNav`, `SiteFooter`, `ScrollProgress`, `PageVeil` — existing layout components, unchanged
