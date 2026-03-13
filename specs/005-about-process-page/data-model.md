# Data Model: About & Process Page

**Feature**: 005-about-process-page  
**Created**: 2026-03-09  
**Source**: Spec entities → refined with implementation choices from research.md

All entities represent **static mock data** defined inline within Vue components. There is no external API, CMS, or database integration for this feature.

---

## Entity: HeroCopy

Represents the primary text content of the hero section. Fully static.

| Field          | Type     | Value (mock)                                  | Notes                                                      |
| -------------- | -------- | --------------------------------------------- | ---------------------------------------------------------- |
| `headline`     | `string` | `"Preserving the Past. Building the Future."` | Split by `' '` into word array for GSAP stagger animation  |
| `tagline`      | `string` | `"A behind-the-lens look at how AKSE works."` | Rendered below the headline; fades in after word reveal    |
| `heroImage`    | `string` | `"/images/about/hero-camera-rig.jpg"`         | Path to mock hero image; fallback: `bg-muted` placeholder  |
| `heroImageAlt` | `string` | `"AKSE camera rig set up at a heritage site"` | Alt text for accessibility; SSR-rendered in `<img alt="">` |

**Usage**: `components/About/HeroStory.vue` — values inlined as `const` in `script setup`.

---

## Entity: Pillar

Represents one of the three core mission pillars displayed in `MissionStatement.vue`.

| Field         | Type     | Constraints               | Notes                                      |
| ------------- | -------- | ------------------------- | ------------------------------------------ |
| `word`        | `string` | One capitalized word      | Oversized display type; opacity scrub text |
| `description` | `string` | One sentence, ≤ 120 chars | Sub-text below the pillar word             |

**Mock data** (defined in `MissionStatement.vue`):

```ts
const pillars: Pillar[] = [
  {
    word: "Preserve",
    description:
      "Every site is documented with clinical precision before a single restoration decision is made.",
  },
  {
    word: "Present",
    description:
      "Raw captures are transformed into immersive, navigable 360° experiences for any device.",
  },
  {
    word: "Elevate",
    description:
      "Heritage becomes a living asset — generating engagement, tourism, and cultural reverence.",
  },
];
```

**Mission statement copy** (also in `MissionStatement.vue`):

```ts
const missionLines: string[] = [
  "We believe the past is not a burden to carry —",
  "it is a competitive advantage waiting to be unlocked.",
  "AKSE exists to bridge the gap between physical heritage",
  "and the people who should inherit it.",
  "Every site we document becomes a digital monument.",
  "Every tour we build becomes a doorway to understanding.",
];
```

Each `missionLines` string corresponds to one `<span class="mission-line block">` element targeted by the per-line opacity ScrollTrigger (R-003).

---

## Entity: ProcessStep

Represents one step in AKSE's 360° production workflow, displayed in `ProcessTimeline.vue`.

| Field         | Type     | Constraints          | Notes                                              |
| ------------- | -------- | -------------------- | -------------------------------------------------- |
| `number`      | `number` | 1–5                  | Displayed as `"01"` through `"05"` (zero-padded)   |
| `title`       | `string` | ≤ 50 chars           | Primary step heading                               |
| `summary`     | `string` | ≤ 80 chars           | Short sub-heading or descriptor                    |
| `description` | `string` | ≤ 300 chars          | Extended prose copy for right column               |
| `image`       | `string` | Path to public asset | Mock image path; fallback: `bg-muted aspect-video` |
| `imageAlt`    | `string` | Descriptive alt text | SSR-rendered in `<img alt="">`                     |

**Mock data** (defined in `ProcessTimeline.vue`):

```ts
const steps: ProcessStep[] = [
  {
    number: 1,
    title: "The Assessment",
    summary: "Planning the shoot",
    description:
      "We begin every project with a full cultural and spatial feasibility study. Our team visits the site, maps access points, evaluates lighting conditions across the day, and produces a shoot blueprint — including equipment manifest, crew logistics, and heritage authority permits.",
    image: "/images/about/step-01-assessment.jpg",
    imageAlt:
      "Site assessment map spread on a survey table at a heritage location",
  },
  {
    number: 2,
    title: "360° Capture & Camera Tech",
    summary: "Details on the hardware",
    description:
      "We deploy Matterport Pro3 and Insta360 Pro 2 rigs, supplemented by DJI aerial platforms for exterior envelope coverage. Structured-light scanning is applied to high-detail architectural surfaces. Capture sessions span multiple lighting conditions to ensure the tour remains visually authentic at any time of day.",
    image: "/images/about/step-02-capture.jpg",
    imageAlt:
      "360° camera rig deployed in a historically significant courtyard",
  },
  {
    number: 3,
    title: "Editing & Post-Production",
    summary: "Colour, stitching, and polish",
    description:
      "Raw spherical imagery is colour-graded to a heritage-neutral profile, aligned to a photometric standard established during the assessment phase. Blinding artefacts, crew reflections, and equipment shadows are removed. Each scan point is reviewed individually before delivery to the stitching stage.",
    image: "/images/about/step-03-editing.jpg",
    imageAlt:
      "Post-production workstation displaying 360° image editing software",
  },
  {
    number: 4,
    title: "Tour Stitching & Digital Development",
    summary: "Assembling the experience",
    description:
      "Individual scan points are stitched into a navigable tour graph. Hotspots, information panels, audio narration anchors, and embedded media layers are authored against a content schema developed with the site custodian. The tour is then packaged for web (WebGL), VR (WebXR), and embedded-app delivery targets.",
    image: "/images/about/step-04-stitching.jpg",
    imageAlt:
      "Digital development interface showing tour node graph and hotspot placement",
  },
  {
    number: 5,
    title: "Deployment & VR Integration",
    summary: "Going live and beyond",
    description:
      "Production builds are deployed to a global CDN with adaptive streaming for image tiles. VR headset compatibility is tested across Quest 3, Quest 2, and PSVR2. Analytics dashboards are handed over to the partner organisation. Post-launch SLA support covers a minimum 90-day monitoring and optimisation window.",
    image: "/images/about/step-05-deployment.jpg",
    imageAlt:
      "Person wearing a VR headset exploring a heritage site virtual tour",
  },
];
```

---

## Entity: TechItem

Represents one technology card in the `TechShowcase.vue` bento grid.

| Field         | Type                                     | Constraints      | Notes                                                    |
| ------------- | ---------------------------------------- | ---------------- | -------------------------------------------------------- |
| `name`        | `string`                                 | ≤ 40 chars       | Card primary heading                                     |
| `description` | `string`                                 | ≤ 120 chars      | Sub-text inside the card                                 |
| `category`    | `'Hardware' \| 'Software' \| 'Platform'` | Enum of three    | Displayed as a small badge/label                         |
| `icon`        | `string`                                 | Lucide icon name | Resolved via `lucide-vue-next`; no separate image needed |
| `size`        | `'sm' \| 'md' \| 'lg'`                   | Grid span hint   | `sm` = 1 col, `md` = 2 cols, `lg` = full width           |

**Mock data** (defined in `TechShowcase.vue`):

```ts
const techItems: TechItem[] = [
  {
    name: "Matterport Pro3",
    description:
      "High-fidelity 3D spatial data capture with 20MP colour camera and LiDAR precision.",
    category: "Hardware",
    icon: "Camera",
    size: "md",
  },
  {
    name: "Insta360 Pro 2",
    description:
      "8K spherical capture for richly detailed 360° photography and video.",
    category: "Hardware",
    icon: "RotateCcw",
    size: "sm",
  },
  {
    name: "DJI Aerial Platform",
    description: "Exterior envelope coverage and overhead spatial mapping.",
    category: "Hardware",
    icon: "Wind",
    size: "sm",
  },
  {
    name: "WebGL 2.0 Renderer",
    description:
      "Custom-built tour viewer leveraging GPU acceleration for smooth 360° navigation on any browser.",
    category: "Software",
    icon: "Globe",
    size: "md",
  },
  {
    name: "WebXR / VR Integration",
    description:
      "Full headset support for Quest 3, Quest 2, and PSVR2 — no app install required.",
    category: "Platform",
    icon: "Glasses",
    size: "lg",
  },
  {
    name: "Adaptive Tile Streaming",
    description:
      "Progressive resolution loading from global CDN — high quality on broadband, functional on 3G.",
    category: "Platform",
    icon: "Layers",
    size: "md",
  },
  {
    name: "Hotspot & Annotation Engine",
    description:
      "Author rich information panels, audio, and embedded media at any point in the tour.",
    category: "Software",
    icon: "MapPin",
    size: "sm",
  },
];
```

**Bento grid layout logic**: Items are rendered in a CSS grid. `size` hints map to Tailwind `col-span-1`, `col-span-2`, `col-span-3` (on desktop). On mobile, all items span the full width.

---

## State Transitions

### ProcessTimeline Active Step

The timeline tracks the currently "active" crossfade step purely via GSAP `autoAlpha` state — there is no reactive Vue ref for active step index. The GSAP ScrollTrigger callbacks manage image visibility directly. This is intentional: keeping the crossfade purely in GSAP avoids introducing reactive re-renders during scroll.

### Theme Changes

All components consume theme via CSS custom properties (`--background`, `--foreground`, `--primary`, `--muted`). No component holds local theme state. `@nuxtjs/color-mode` manages the class on `<html>`. No component-level cleanup is needed on theme switch.

---

## Validation Rules

| Entity         | Rule                                                                               |
| -------------- | ---------------------------------------------------------------------------------- |
| `ProcessStep`  | `number` MUST be 1–5 (checked at compile time by index in `const` array)           |
| `ProcessStep`  | `image` path SHOULD exist under `/public`; if missing, `bg-muted` fallback renders |
| `TechItem`     | `icon` MUST be a valid Lucide icon name; TypeScript type imports enforce this      |
| `TechItem`     | `size` MUST be one of `'sm' \| 'md' \| 'lg'`; TypeScript union enforces this       |
| `Pillar`       | Array MUST have exactly 3 elements (Preserve, Present, Elevate)                    |
| `missionLines` | Array SHOULD have 4–8 elements; fewer than 4 reduces scroll-reveal effect          |
