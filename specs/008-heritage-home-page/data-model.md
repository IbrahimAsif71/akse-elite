# Data Model: Heritage-Focused Home Page

**Feature**: `008-heritage-home-page`  
**Date**: 2026-03-11

All data on this page is static inline content — no Sanity fetches, no API calls, no reactive stores. Entities are defined here as TypeScript interfaces to drive consistent implementation across the five section components.

---

## Entity: GlobeMarker

A single point of interest displayed on the `InteractiveGlobe`. Rendered as a glowing orange dot on the surface of the `cobe` sphere.

```typescript
interface GlobeMarker {
  /** Display label for accessibility / aria-label (not rendered visually by cobe) */
  name: string;
  /** Latitude/Longitude pair as required by cobe's markers[] array */
  location: [lat: number, lng: number];
  /** Marker dot radius (0.03–0.06 is normal range in cobe) */
  size: number;
}
```

**Initial data set** (hardcoded in `InteractiveGlobe.vue`):

| Name       | Lat     | Lng     | Size |
| ---------- | ------- | ------- | ---- |
| Rawalpindi | 33.6008 | 73.0679 | 0.04 |
| Hasanabdal | 33.7019 | 72.6899 | 0.04 |
| Lahore     | 31.5497 | 74.3436 | 0.04 |
| Gilgit     | 35.9208 | 74.3081 | 0.04 |

**Relationships**: Owned by `InteractiveGlobe.vue`. Passed in as `markers` prop or hardcoded inside the component. No relationship to `ExperienceCard` data.

---

## Entity: ExperienceCard

A single location entry displayed in the `FeaturedExperiences` museum gallery. Rendered as a portrait-orientation image with hover-revealed metadata.

```typescript
interface ExperienceCard {
  /** Location name displayed in the hover overlay */
  title: string;
  /** Category tag displayed beside/below the title in the hover overlay */
  category: string;
  /** Path to image asset under /public/images/ — relative or absolute */
  image: string;
  /** Alt text for the image — required for accessibility and SSR SEO */
  alt: string;
  /** Optional: slug for NuxtLink to /tours/[slug] — omit if not yet a live tour */
  slug?: string;
}
```

**Initial data set** (hardcoded in `FeaturedExperiences.vue`):

| Title           | Category | Image                                                      | Slug              |
| --------------- | -------- | ---------------------------------------------------------- | ----------------- |
| Lahore Old City | Heritage | `/images/tours/lahore_old_city_heritage_1773010984542.png` | `lahore-old-city` |
| Rohtas Fort     | Heritage | `/images/tours/rohtas_fort_heritage_1773010968806.png`     | —                 |
| Taxila Museum   | Museum   | `/images/tours/taxila_museum_heritage_1773011014212.png`   | —                 |
| Hunza Valley    | Nature   | `/images/tours/hunza_valley_adventure_1773011000439.png`   | —                 |

**Relationships**: Owned by `FeaturedExperiences.vue`. No relationship to `GlobeMarker`.

---

## Entity: SectionCopy

Inline copy block for each of the five section components. Not a TypeScript interface — documented here as a content reference for implementers to ensure verbatim accuracy.

```typescript
interface SectionCopy {
  headline: string;
  subhead: string;
  body: string;
}
```

**Verbatim copy per section** (must match spec exactly, guaranteed SSR-rendered):

### HeroCultural

```
headline: "Immersive Cultural Exploration"
subhead:  "Step into places where history, space, and technology converge."
body:     "AKSE is a digital platform that transforms real-world locations into
           immersive virtual tours. Through interactive 360° environments, visitors
           can explore heritage sites, restaurants, and hospitality spaces from
           anywhere while discovering the stories behind them."
```

### DigitalHeritage

```
headline: "Digital Heritage Platform"
subhead:  "Preserving meaningful places through immersive technology."
body:     "AKSE brings real-world environments into the digital space through
           interactive virtual tours. Visitors can explore culturally significant
           locations while gaining a deeper understanding of their history,
           architecture, and atmosphere."
```

### ImmersiveExploration

```
headline: "Immersive Exploration"
subhead:  "Move through spaces as though you were there."
body:     "Our tours allow visitors to navigate environments using 360° imagery.
           Users can rotate their perspective, move between locations, and
           experience spaces through a fully interactive digital environment."
```

### FeaturedExperiences

```
headline: "Featured Experiences"
subhead:  "Selected locations that define the character of our cities."
body:     "This section highlights featured virtual tours available on the
           platform. These experiences showcase unique places that have been
           captured and transformed into immersive digital journeys."
```

### CreateTourCTA

```
headline: "Create a Tour With Us"
subhead:  "Transform your location into a digital destination."
body:     "Organizations and property owners can collaborate with our team to
           create immersive virtual tours of their spaces. These tours help
           present locations to a broader digital audience."
cta:      "Get in Touch"
cta_href: "/contact"
```

---

## Entity: GrainOverlay

A decorative, non-interactive layer. Implemented as a CSS pseudo-element — not a Vue component and not a TypeScript entity. Documented here for completeness.

```
Implementation: html::before pseudo-element in assets/css/main.css
Technique:      SVG fractalNoise inline data URI as background-image
Opacity:        ~3% (encoded within the SVG rect)
Blend mode:     mix-blend-mode: multiply
z-index:        9998 (above page content, below SiteNav/modals)
pointer-events: none
Size:           position: fixed; inset: 0 (full viewport)
```

---

## Entity: CustomCursor

A global, pointer-device-only, GSAP-tracked cursor disc. Implemented as a composable + DOM element. Not a Vue component.

```
Implementation: composables/useCustomCursor.ts
DOM element:    div#__akse-cursor appended to document.body
Dimensions:     40×40px
Style:          circular (border-radius: 50%), 1.5px orange border (#c9653d)
Motion:         GSAP quickTo() — x/y, duration: 0.35s, ease: power2.out
Gate:           matchMedia('(pointer: fine)') only
Gate:           matchMedia('(prefers-reduced-motion: reduce)') — skip if true
Lifecycle:      init() called in app.vue onMounted, destroy() in onBeforeUnmount
Cleanup:        window removeEventListener, el.remove(), cursor CSS reset
```

---

## State Transitions

All five section components are stateless presentational components. No shared state, no Pinia stores, no composable stores. The only "state" is GSAP animation progress, which is internal to each component's scroll trigger.

The `FeaturedExperiences.vue` hover metadata reveal is driven by CSS hover state (`group-hover:`) and GSAP in the `onMouseEnter`/`onMouseLeave` handlers — component-local, no shared state.
