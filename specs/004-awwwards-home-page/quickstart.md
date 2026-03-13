# Quickstart: Awwwards-Level Home Page

**Feature Branch**: `004-awwwards-home-page`

---

## Prerequisites

- Node.js (Nuxt 4 compatible)
- pnpm installed globally

## Setup

```bash
# Switch to feature branch
git checkout 004-awwwards-home-page

# Install dependencies (includes new cobe package)
pnpm install

# Start dev server
pnpm dev
```

## New Dependency

This feature adds one new package:

```bash
pnpm add cobe
```

`cobe` (v0.6.5) — lightweight WebGL globe renderer (5 kB gzipped, MIT license).

## Verify

1. Open `http://localhost:3000/` in the browser
2. **Hero section**: Headline "Heritage Redefined" animates in character-by-character. Globe renders with 4 glowing markers over Pakistan. Globe auto-rotates and responds to drag.
3. **Scroll down**: Featured tours section shows staggered cards with parallax image movement on scroll. Hover a card to see image scale and accent color sweep.
4. **Continue scrolling**: Process section pins the left heading while right side scrolls horizontally through Capture → Craft → Publish.
5. **Massive CTA**: Full-width "Want us to shoot a tour for you?" with accent gradient. "Book a Tour" button has magnetic pull effect on hover. Preceding content scales down as CTA enters.
6. **Custom cursor**: On pointer devices, default cursor is replaced by a trailing dot. Expands with labels on hover over interactive elements.
7. **Theme toggle**: Click the theme toggle in the nav. All sections including the globe should update colors seamlessly.

## File Map

| Path                                | Purpose                                                      |
| ----------------------------------- | ------------------------------------------------------------ |
| `pages/index.vue`                   | Home page composition root — composes all section components |
| `components/Home/HeroCinematic.vue` | Full-viewport hero with globe + text reveal                  |
| `components/Home/FeaturedTours.vue` | Asymmetric tour cards with parallax                          |
| `components/Home/ProcessPinned.vue` | Scroll-pinned horizontal process steps                       |
| `components/Home/MassiveCTA.vue`    | Full-width CTA with magnetic button                          |
| `components/CustomCursor.vue`       | Global GSAP-driven custom cursor                             |
| `components/MagneticWrapper.vue`    | Magnetic hover effect wrapper                                |

## Key Technical Decisions

- **Globe**: `cobe` (not Three.js) — purpose-built, 5 kB, no 3D knowledge required
- **Text splitting**: Vue template spans + GSAP stagger (not SplitText premium plugin)
- **Cursor trailing**: `gsap.quickTo()` for allocation-free 60fps tracking
- **Magnetic spring**: `elastic.out(1, 0.3)` easing — no physics plugin needed
- **Theme colors on globe**: Destroy + recreate instance on theme change (cheap, ~5ms)
