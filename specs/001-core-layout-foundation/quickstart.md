# Quickstart: Core Layout, UI Foundation, and Routing

**Date**: 2026-03-05 | **Branch**: `001-core-layout-foundation`

## Prerequisites

- **Node.js** ≥ 22.12.0 (required by Nuxt 4 engine constraints)
- **pnpm** ≥ 9.x (mandatory per constitution Principle I)

## Setup

```bash
# 1. Clone and checkout the feature branch
git checkout 001-core-layout-foundation

# 2. Install dependencies
pnpm install

# 3. Generate Nuxt types
pnpm dlx nuxi prepare

# 4. Start the dev server
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Verify the Foundation

### Desktop Navigation (User Story 1)

1. Open `http://localhost:3000` in a desktop browser
2. Verify: fixed nav bar with glassmorphism blur at the top, placeholder logo on the left
3. Click each nav link (Home, About, Tours, Blog) — verify:
   - Page veil fades in (300ms), route changes, veil fades out (300ms)
   - Active link underline animates to the clicked link
   - Scroll progress bar resets to 0
4. Scroll down any page — verify the 3px Rust-colored progress bar fills
5. Scroll to bottom — verify 3-column footer is visible

### Mobile Navigation (User Story 2)

1. Resize browser below 768px (or use device emulation)
2. Verify: hamburger icon replaces desktop link rail
3. Tap hamburger — verify: drawer slides in from right, body scroll locked
4. Tap a link — verify: drawer closes, route changes with page transition
5. Open drawer, press Escape — verify: drawer closes, scroll restored

### Smooth Scroll (User Story 3)

1. On any page with enough content, scroll with mouse wheel
2. Verify: scrolling is visibly eased and fluid (not native step-based)
3. Navigate to another page — verify: scroll resets to top, no double-scroll

### Dark Theme (User Story 4)

1. Verify: dark background (`#0e1516`) on all pages, warm cream text (`#e2dad0`)
2. Verify: "Start Project" button uses Rust accent color
3. Inspect text — verify: Geist Sans is the rendered font-family

### Reduced Motion (FR-016)

1. Enable "Reduce motion" in OS accessibility settings
2. Reload the app
3. Verify: no smooth scroll (native scroll), page transitions are instant, no animated underline

## Key Files

| File                            | Purpose                                                     |
| ------------------------------- | ----------------------------------------------------------- |
| `app.vue`                       | Root shell — `<NuxtLayout>` wrapper + SEO baseline          |
| `layouts/default.vue`           | SiteNav + PageVeil + ScrollProgress + `<slot>` + SiteFooter |
| `components/SiteNav.vue`        | Navigation bar with desktop links + mobile Sheet drawer     |
| `components/SiteFooter.vue`     | 3-column responsive footer                                  |
| `components/PageVeil.vue`       | Route transition overlay (300ms fade)                       |
| `components/ScrollProgress.vue` | 3px scroll depth indicator                                  |
| `plugins/gsap.client.ts`        | GSAP + ScrollTrigger global registration                    |
| `plugins/lenis.client.ts`       | Single Lenis instance on GSAP ticker                        |
| `assets/css/main.css`           | Tailwind directives + brand tokens + shadcn theme           |
| `components/ui/button/`         | shadcn-vue Button component                                 |
| `components/ui/sheet/`          | shadcn-vue Sheet component                                  |
| `lib/utils.ts`                  | `cn()` class merge utility                                  |

## Common Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build (Netlify preset)
pnpm preview      # Preview production build locally
pnpm dlx nuxi prepare   # Regenerate .nuxt types
```
