# Quickstart: Interactive Tours Portal

**Branch**: `007-tours-portal`  
**Created**: 2026-03-11

---

## Prerequisites

- Node.js (version compatible with Nuxt 4 engine constraints)
- pnpm installed globally (`npm install -g pnpm` if not already)

## Setup

```bash
# Switch to feature branch
git checkout 007-tours-portal

# Install dependencies (includes new @nuxtjs/color-mode)
pnpm install

# Start dev server
pnpm dev
```

## New Dependency

This feature requires one new package:

```bash
pnpm add @nuxtjs/color-mode
```

Add to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    "shadcn-nuxt",
    "@nuxt/fonts",
    "@nuxtjs/color-mode", // ← new
  ],
  colorMode: {
    classSuffix: "", // adds .dark directly to <html>, no suffix
    preference: "system",
    fallback: "light",
  },
  // ... rest of config
});
```

## Verification Steps

### 1. Page loads without errors

Navigate to `http://localhost:3000/tours`. The placeholder text should be replaced by the full Tours portal.

### 2. Featured hero section

- Full-viewport (100vh) hero visible with background image
- "Featured Experience" kicker tag visible with glow effect
- "Golra Sharif Railway Museum" headline visible
- Glassmorphism metadata bar showing "1881 • Victorian Architecture • 360° Capture"
- "Enter Virtual Tour" button visible

### 3. Magnetic CTA hover (pointer devices)

- Hover near the "Enter Virtual Tour" button → button pulls toward cursor
- Move away → button springs back with elastic easing
- While hovering CTA → background image scales up slightly

### 4. Sticky filter bar

- Scroll past the hero → filter bar locks to top of viewport
- Five category chips visible: All, Heritage Sites, Museums, Commercial, In Production
- Click a chip → grid below filters. "All" selected by default.

### 5. Tour grid

- Golra Sharif card: full color, "Live" badge, clickable
- Upcoming cards (Lahore Fort, Mohenjo-Daro, etc.): blurred/grayscale, "In Production" badge pulsing, not clickable, lock cursor on hover
- Cards stagger in from bottom on first scroll into view

### 6. Commercial teaser

- Scroll to bottom → "Want your space preserved like this?" banner visible
- "View Commercial Packages" button links to `/commercial`

### 7. Dual-theme

- If a theme toggle exists, switch between light and dark. All section colors, overlays, and accents should adapt.
- Light: beige backgrounds, orange accents
- Dark: #0e1516 background, rust/teal accents, warm off-white text

### 8. SSR content

```bash
# Verify server-rendered HTML contains tour content
curl -s http://localhost:3000/tours | grep -q "Golra Sharif Railway Museum" && echo "SSR OK" || echo "SSR FAIL"
```

### 9. Reduced motion

- Enable "Reduce motion" in OS accessibility settings
- Reload `/tours` — all animations should be disabled or near-instant
- Content still fully visible and interactive

## File Checklist

| File                                    | Action   |
| --------------------------------------- | -------- |
| `pages/tours/index.vue`                 | Modified |
| `components/Tours/FeaturedTour.vue`     | New      |
| `components/Tours/FilterRail.vue`       | New      |
| `components/Tours/UpcomingGrid.vue`     | New      |
| `components/Tours/CommercialTeaser.vue` | New      |
| `components/MagneticWrapper.vue`        | New      |
| `assets/css/main.css`                   | Modified |
| `nuxt.config.ts`                        | Modified |
