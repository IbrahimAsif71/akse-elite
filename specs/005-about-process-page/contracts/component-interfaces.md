# Component Interfaces: About & Process Page

**Feature**: 005-about-process-page  
**Created**: 2026-03-09  
**Scope**: All new components in `components/About/` and the modified `pages/about.vue`

All components use Nuxt 4 + Vue 3 Composition API with `script setup`. No component accepts slot content unless explicitly listed. All GSAP/ScrollTrigger instances are created in `onMounted` and killed in `onBeforeUnmount`.

---

## `pages/about.vue`

**Path**: `pages/about.vue`  
**Type**: Nuxt page (modified — replaces placeholder)  
**Responsibility**: Page composition root. Registers SEO metadata. Imports and renders the five `About/` section components in order.

### Script

```ts
// No props (page component)
useSeoMeta({
  title: "About — AKSE",
  description:
    "Learn how AKSE documents and preserves heritage sites through 360° capture, immersive digital tours, and WebXR delivery.",
  ogTitle: "About — AKSE",
  ogDescription:
    "Learn how AKSE documents and preserves heritage sites through 360° capture, immersive digital tours, and WebXR delivery.",
});
```

### Template Structure

```html
<template>
  <div>
    <AboutHeroStory />
    <AboutMissionStatement />
    <AboutProcessTimeline />
    <AboutTechShowcase />
    <AboutAboutCTA />
  </div>
</template>
```

**Notes**:

- No outer padding/max-width wrapper — each section component owns its own layout.
- Components are auto-imported by Nuxt 4's `components/` resolver using the `About` prefix.

---

## `components/About/HeroStory.vue`

**Path**: `components/About/HeroStory.vue`  
**Type**: Section component (new)  
**Responsibility**: Full-viewport hero with animated word-reveal headline and scroll-scrubbed parallax image.

### Props

None. All content is static mock data defined in `script setup`.

### Emits

None.

### Internal refs

| Ref        | Type                  | Purpose                                             |
| ---------- | --------------------- | --------------------------------------------------- |
| `heroRef`  | `HTMLElement \| null` | ScrollTrigger marker for the image scrub effect     |
| `imageRef` | `HTMLElement \| null` | Target element for `scale` + `filter: blur()` scrub |
| `wordRefs` | `HTMLElement[]`       | Each word span for the GSAP stagger reveal          |

### Animation lifecycle

| Hook              | Action                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onMounted`       | Check `prefersReduced`. If not reduced: build word stagger timeline (plays once). Create ScrollTrigger on `heroRef` (scale + blur scrub on `imageRef`). |
| `onBeforeUnmount` | Kill ScrollTrigger. Kill word-reveal timeline.                                                                                                          |

### Internal data

```ts
const heroCopy: HeroCopy = {
  headline: "Preserving the Past. Building the Future.",
  tagline: "A behind-the-lens look at how AKSE works.",
  heroImage: "/images/about/hero-camera-rig.jpg",
  heroImageAlt: "AKSE camera rig set up at a heritage site",
};

// Computed from heroCopy.headline:
const words = computed(() => heroCopy.headline.split(" "));
```

### Layout contract

- Outer `<section>`: `min-h-screen flex flex-col items-center justify-center` — full viewport on load.
- Headline: centered, large display font (`text-5xl md:text-7xl lg:text-8xl`), `overflow-hidden` per word span.
- Image container: `w-full aspect-[21/9] md:aspect-[16/7] overflow-hidden rounded-2xl mt-12` — wide cinematic ratio.
- Image: `w-full h-full object-cover scale-[1.08]` initially — GSAP scrub drives to `scale(1)`.

---

## `components/About/MissionStatement.vue`

**Path**: `components/About/MissionStatement.vue`  
**Type**: Section component (new)  
**Responsibility**: Mission statement with three oversized pillar words and per-line scroll-linked opacity effect.

### Props

None. All content is static mock data.

### Emits

None.

### Internal refs

| Ref          | Type                  | Purpose                                                         |
| ------------ | --------------------- | --------------------------------------------------------------- |
| `sectionRef` | `HTMLElement \| null` | Scoped container for `gsap.utils.toArray('.mission-line', ...)` |

### Animation lifecycle

| Hook              | Action                                                                                                                                                                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onMounted`       | Check `prefersReduced`. If not reduced: `gsap.utils.toArray('.mission-line', sectionRef.value)` → for each el, `gsap.fromTo(el, { opacity: 0.2 }, { opacity: 1, scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 45%', scrub: true } })`. Store all ST refs. |
| `onBeforeUnmount` | Kill all stored ScrollTrigger instances.                                                                                                                                                                                                                              |

### Internal data

```ts
const pillars: Pillar[] = [
  /* see data-model.md */
];
const missionLines: string[] = [
  /* see data-model.md */
];
```

### Layout contract

- `missionLines` rendered as `<span class="mission-line block text-xl md:text-2xl leading-relaxed text-foreground">` — one per line, initial opacity handled by GSAP (not inline style, to remain SSR-clean).
- `pillars` rendered as a row or stacked list of oversized words: each `word` at `text-6xl md:text-8xl lg:text-9xl font-bold text-primary`, with `description` at `text-base text-muted-foreground` below it.
- Section has `py-24 md:py-32 px-6 lg:px-12` padding.

---

## `components/About/ProcessTimeline.vue`

**Path**: `components/About/ProcessTimeline.vue`  
**Type**: Section component (new)  
**Responsibility**: Sticky split-screen layout with five process steps (left column pinned via CSS sticky, right column scrolls). Companion images crossfade as steps enter viewport.

### Props

None. All content is static mock data.

### Emits

None.

### Internal refs

| Ref          | Type                  | Purpose                                              |
| ------------ | --------------------- | ---------------------------------------------------- |
| `sectionRef` | `HTMLElement \| null` | ScrollTrigger marker for crossfade trigger bounds    |
| `stepRefs`   | `HTMLElement[]`       | Each right-column step element; one ST per element   |
| `imageRefs`  | `HTMLElement[]`       | Five stacked image elements in the fixed image panel |

### Animation lifecycle

| Hook              | Action                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `onMounted`       | Check `prefersReduced` AND `isMobile` (via `gsap.matchMedia('(min-width: 768px)')`). Desktop + not reduced: set all imageRefs to `autoAlpha: 0` except first. For each `stepRef[i]`, create ScrollTrigger with `start: 'top center'`, `onEnter` → crossfade to image[i], `onLeaveBack` → crossfade to image[i-1]. Store all ST refs. |
| `onBeforeUnmount` | Kill all ScrollTrigger instances.                                                                                                                                                                                                                                                                                                    |

### Internal data

```ts
const steps: ProcessStep[] = [
  /* five steps — see data-model.md */
];
```

### Layout contract (desktop, ≥ md)

- Outer `<section>`: `grid grid-cols-2 gap-12 px-6 lg:px-12 py-24 md:py-32 max-w-7xl mx-auto`.
- Left column: `sticky top-24 self-start` — section number label, title "How We Capture Reality", short descriptor, and the crossfade image stack.
  - Image stack: `relative aspect-[4/3] overflow-hidden rounded-2xl`. Images are `absolute inset-0 w-full h-full object-cover`.
- Right column: normal flow — each step is a `<div ref="setStepRef">` with step number badge, title, summary, and description.
- Each right-column step has `min-h-[50vh]` to ensure sufficient scroll distance for the crossfade trigger.

### Layout contract (mobile, < md)

- Single column. Left-column content renders once at top as a section header (not sticky).
- Each step: image (inline `<img>` or `bg-muted` placeholder above text, `aspect-video` ratio) then step text below.
- No crossfade animation (ScrollTrigger crossfade only initializes inside `gsap.matchMedia('(min-width: 768px)')`).

---

## `components/About/TechShowcase.vue`

**Path**: `components/About/TechShowcase.vue`  
**Type**: Section component (new)  
**Responsibility**: Bento-style grid of technology cards with magnetic hover and accent border glow.

### Props

None. All content is static mock data.

### Emits

None.

### Dependencies (consumed as-is, no modification)

- `components/MagneticWrapper.vue` — wraps each card for magnetic pull (pointer-fine only, handled internally by `MagneticWrapper`)

### Internal data

```ts
const techItems: TechItem[] = [
  /* seven items — see data-model.md */
];
```

### Card rendering contract

Each tech item rendered as:

```html
<MagneticWrapper :strength="0.2">
  <Card
    class="tech-card h-full cursor-default transition-shadow duration-300 hover:shadow-[0_0_0_1.5px_hsl(var(--primary)),0_0_18px_2px_hsl(var(--primary)/0.3)]"
  >
    <CardContent>
      <!-- icon (lucide), name, category badge, description -->
    </CardContent>
  </Card>
</MagneticWrapper>
```

### Layout contract

- Outer `<section>`: `py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto`.
- Grid: `grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6`.
- `size` mapping: `sm` → `col-span-1`, `md` → `col-span-2`, `lg` → `col-span-2 md:col-span-4`.
- On mobile (`< md`), all items collapse to `col-span-2` (full row width).
- Section heading: `text-3xl md:text-4xl font-bold mb-12`.

### Animation lifecycle

No GSAP required. `MagneticWrapper` handles all pointer interactions internally. Card glow is CSS-only via `hover:shadow-[...]` Tailwind arbitrary value — no `onMounted` needed.

---

## `components/About/AboutCTA.vue`

**Path**: `components/About/AboutCTA.vue`  
**Type**: Section component (new)  
**Responsibility**: Dual-action CTA block linking to `/contact` and `/tours`.

### Props

None. All content is static mock data.

### Emits

None.

### Internal data

```ts
const ctaCopy = {
  headline: "Ready to Preserve Something Beautiful?",
  subtext:
    "Whether you have a site to document or a collection to explore, the next step starts here.",
  primaryCta: { label: "Start a Project", href: "/contact" },
  secondaryCta: { label: "View the Archive", href: "/tours" },
};
```

### Layout contract

- Full-width section with strong contrast background (use `bg-foreground text-background` or `bg-primary text-primary-foreground` depending on design intent — implementer to choose the more impactful option that respects the theme).
- Two buttons: primary button (`Button variant="default"`) links to `/contact`. Secondary button (`Button variant="outline"` or `variant="ghost"`) links to `/tours`.
- Centered layout with `text-center py-24 md:py-40 px-6`.
- Both links use `<NuxtLink>` for SPA navigation.

### Animation lifecycle

None required. The CTA section transitions naturally from the section above via scroll. Optional: simple `opacity` + `y` entrance animation using `ScrollTrigger` with `toggleActions: 'play none none reset'` (not scrubbed). Not required for spec compliance.

---

## Shared Conventions

| Convention                 | Rule                                                                                                                                                      |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plugin access              | `const { $gsap, $ScrollTrigger } = useNuxtApp()` — never import GSAP directly                                                                             |
| Animation guard            | `const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches` at top of `onMounted` — if true, skip all animation setup          |
| Cleanup                    | All `ScrollTrigger` instances stored in a local array `const sts: ScrollTrigger[] = []` → killed in `onBeforeUnmount(() => sts.forEach(st => st.kill()))` |
| Image fallback             | All `<img>` tags wrapped in a container with `bg-muted` background — if image 404s, the block remains styled                                              |
| Mobile responsive prefixes | `md:` breakpoint (768px) as the boundary for desktop-only features (sticky, crossfade, magnetic-cursor interaction)                                       |
| Lucide icons               | Import from `lucide-vue-next`, e.g. `import { Camera } from 'lucide-vue-next'`                                                                            |
| shadcn-vue cards           | Import from `@/components/ui/card` — already scaffolded in the project                                                                                    |
