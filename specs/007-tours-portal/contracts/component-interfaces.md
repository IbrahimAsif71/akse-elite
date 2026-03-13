# Component Interface Contracts: Interactive Tours Portal

**Created**: 2026-03-11  
**Source**: [spec.md](../spec.md), [data-model.md](../data-model.md)

---

## Page Composition: `pages/tours/index.vue`

```vue
<script setup lang="ts">
// SEO metadata
useSeoMeta({
  title: "Tours — AKSE",
  description:
    "Explore heritage-tech virtual tours. Immersive 360° experiences of Pakistan's most iconic cultural sites.",
  ogTitle: "Tours — AKSE",
  ogDescription: "Explore heritage-tech virtual tours by AKSE.",
});

// State: active filter category
const activeCategory = ref("all");
</script>

<template>
  <div>
    <ToursFeaturedTour />
    <ToursFilterRail v-model="activeCategory" />
    <ToursUpcomingGrid :active-category="activeCategory" />
    <ToursCommercialTeaser />
  </div>
</template>
```

---

## `components/Tours/FeaturedTour.vue`

Full-viewport hero showcasing the flagship Golra Sharif Railway Museum tour.

### Props

None — data is self-contained (static mock).

### Emits

None.

### Template Contract

```
┌─────────────────────────────────────────────────────────┐
│ <section> 100vh, relative, overflow-hidden              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ <img/video> background — object-cover, scale    │    │
│  │ ref="bgRef" for GSAP scale animation            │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Gradient overlay — themed via CSS vars           │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌───── Content (z-10, centered) ──────────────────┐    │
│  │                                                  │    │
│  │  "Featured Experience" kicker (glow effect)      │    │
│  │                                                  │    │
│  │  "Golra Sharif Railway Museum" (heading)         │    │
│  │                                                  │    │
│  │  ┌── Glassmorphism metadata bar ──────────┐     │    │
│  │  │ "1881 • Victorian Architecture • 360°" │     │    │
│  │  └────────────────────────────────────────┘     │    │
│  │                                                  │    │
│  │  <MagneticWrapper>                               │    │
│  │    <Button>"Enter Virtual Tour"</Button>         │    │
│  │  </MagneticWrapper>                              │    │
│  │                                                  │    │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Behavior

- On CTA `mouseenter` (pointer devices): `gsap.to(bgRef, { scale: 1.05, duration: 1.2, ease: 'power2.out' })`
- On CTA `mouseleave`: `gsap.to(bgRef, { scale: 1, duration: 1.2, ease: 'power2.out' })`
- GSAP instance stored and killed in `onUnmounted`

---

## `components/Tours/FilterRail.vue`

Sticky horizontally scrollable filter bar with pill-shaped category chips.

### Props

| Prop         | Type     | Required | Default | Description                    |
| ------------ | -------- | -------- | ------- | ------------------------------ |
| `modelValue` | `string` | Yes      | —       | Currently active category slug |

### Emits

| Event               | Payload  | Description                    |
| ------------------- | -------- | ------------------------------ |
| `update:modelValue` | `string` | Emitted when a chip is clicked |

### Template Contract

```
┌─────────────────────────────────────────────────────────┐
│ <div> sticky top-0, z-30, bg-background, border-b      │
│                                                         │
│  ┌── Horizontal scroll container (overflow-x-auto) ──┐ │
│  │                                                    │ │
│  │  [All] [Heritage Sites] [Museums] [Commercial]     │ │
│  │  [In Production]                                   │ │
│  │                                                    │ │
│  │  Active chip: bg-primary text-primary-foreground   │ │
│  │  Inactive: bg-muted text-muted-foreground          │ │
│  │                                                    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Behavior

- Clicks update `modelValue` via `emit('update:modelValue', slug)`
- Active chip uses accent color: `bg-primary text-primary-foreground`
- Scrollbar hidden: `scrollbar-hide` or `-webkit-scrollbar: none`
- Keyboard: chips are `<button>` elements (focusable, activatable with Enter/Space)

---

## `components/Tours/UpcomingGrid.vue`

Card grid showing all tours (active + upcoming) filtered by active category.

### Props

| Prop             | Type     | Required | Default | Description                 |
| ---------------- | -------- | -------- | ------- | --------------------------- |
| `activeCategory` | `string` | Yes      | —       | Active filter category slug |

### Emits

None.

### Template Contract

```
┌─────────────────────────────────────────────────────────┐
│ <section> px-6, py-16, max-w-7xl mx-auto                │
│                                                         │
│  ┌── Grid (grid cols-1 md:cols-2 lg:cols-3 gap-8) ──┐  │
│  │                                                    │  │
│  │  ┌── Tour Card (live) ─────────────────────┐      │  │
│  │  │  Image (full color, no filter)          │      │  │
│  │  │  "Live" badge (green/accent, solid)     │      │  │
│  │  │  Title + Location                       │      │  │
│  │  │  Clickable → ctaLink                    │      │  │
│  │  └─────────────────────────────────────────┘      │  │
│  │                                                    │  │
│  │  ┌── Tour Card (in-production) ────────────┐      │  │
│  │  │  Image (blur-lg OR grayscale filter)    │      │  │
│  │  │  "In Production" badge (pulse anim)     │      │  │
│  │  │  Title + Location                       │      │  │
│  │  │  NOT clickable, cursor-not-allowed      │      │  │
│  │  │  aria-disabled="true"                   │      │  │
│  │  └─────────────────────────────────────────┘      │  │
│  │                                                    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Behavior

- Filters `allTours` by `activeCategory` (computed, reactive)
- `"all"` shows everything; `"in-production"` shows only `status === "in-production"` tours
- Other categories match on `tour.category === activeCategory`
- ScrollTrigger.batch on mount for staggered fade-up entrance
- `ScrollTrigger.refresh()` called via `nextTick` after filter changes
- Live cards: standard hover effects, clickable via `<NuxtLink>`
- In-production cards: `cursor-not-allowed`, `aria-disabled="true"`, no click handler
- Badge pulse via CSS `@keyframes badge-pulse` (2s infinite alternate)

---

## `components/Tours/CommercialTeaser.vue`

Minimalist banner section bridging Tours to Commercial services.

### Props

None — content is static.

### Emits

None.

### Template Contract

```
┌─────────────────────────────────────────────────────────┐
│ <section> py-24, px-6, text-center                      │
│                                                         │
│  "Want your space preserved like this?" (heading)       │
│                                                         │
│  Optional supporting subtext                            │
│                                                         │
│  <NuxtLink to="/commercial">                            │
│    <Button variant="default">                           │
│      "View Commercial Packages"                         │
│    </Button>                                            │
│  </NuxtLink>                                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Behavior

- Static content, no animation, no reactive state
- Uses shadcn-vue `Button` component for styling consistency
- Accent color driven by CSS variables (auto-adapts to theme)

---

## `components/MagneticWrapper.vue`

Reusable magnetic hover effect wrapper. Placed at `components/` root for cross-feature reuse.

### Props

| Prop       | Type     | Required | Default | Description                                   |
| ---------- | -------- | -------- | ------- | --------------------------------------------- |
| `strength` | `number` | No       | `0.25`  | Pull strength (0–1 fraction of cursor offset) |

### Emits

None (parent listens to DOM events on the wrapper div if needed).

### Slots

| Slot      | Description                        |
| --------- | ---------------------------------- |
| `default` | Content to receive magnetic effect |

### Template Contract

```
┌──────────────────────────────────────┐
│ <div ref="wrapperRef">               │
│                                      │
│   <slot />                           │
│                                      │
│ </div>                               │
└──────────────────────────────────────┘
```

### Behavior

- **Pointer detection**: `matchMedia('(pointer: fine)')` and `matchMedia('(prefers-reduced-motion: reduce)')` — if either fails, component renders slot content in a plain `<div>` with no event handling.
- **On `mousemove`**: Calculate `dx` and `dy` from cursor position to element center. Apply `gsap.set(wrapperRef, { x: dx * strength, y: dy * strength })`.
- **On `mouseleave`**: `gsap.to(wrapperRef, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' })`.
- GSAP tween stored for cleanup in `onUnmounted`.
