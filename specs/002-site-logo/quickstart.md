# Quickstart: Site-Wide Logo

**Date**: 2026-03-06 | **Branch**: `002-site-logo`

## Prerequisites

- Feature `001-core-layout-foundation` completed (SiteNav, SiteFooter in place)
- `public/akse.png` exists (2618×864 PNG brand logo)

## Setup

```bash
# 1. Checkout the feature branch
git checkout 002-site-logo

# 2. Install dependencies (if not already done)
pnpm install

# 3. Start the dev server
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Verify the Logo

### Navigation Bar Logo (User Story 1)

1. Open `http://localhost:3000` in a desktop browser
2. Verify: the AKSE brand logo image is visible in the top-left of the nav bar (not a diamond placeholder, not plain text)
3. Click the logo — verify: navigates to `/`
4. Resize browser below 768px — verify: logo is still visible and proportionally smaller
5. Inspect with DevTools — verify: `<img src="/akse.png">` is present in the server-rendered HTML

### Footer Logo (User Story 2)

1. Scroll to the bottom of any page
2. Verify: the AKSE brand logo image appears in the footer brand column (not plain text "AKSE")
3. Verify: the footer logo is smaller than the nav logo

### Placeholder Cleanup (User Story 3)

1. Open DevTools Network tab, search for `logo-placeholder` — verify: no requests
2. Check `public/` directory — verify: `logo-placeholder.svg` does not exist
3. Search codebase for `logo-placeholder` — verify: zero results

### Accessibility

1. Use a screen reader (VoiceOver / NVDA) on the nav logo link
2. Verify: announces "AKSE — Home" (from aria-label), does not double-announce the image
3. Tab to the logo — verify: focus ring is visible

## Key Files

| File                          | Change                                                     |
| ----------------------------- | ---------------------------------------------------------- |
| `components/SiteNav.vue`      | Logo `<img>` src changed to `/akse.png`, text span removed |
| `components/SiteFooter.vue`   | Brand text replaced with logo `<img>`                      |
| `public/logo-placeholder.svg` | Deleted                                                    |
| `public/akse.png`             | Unchanged (existing asset)                                 |

## Common Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build (Netlify preset)
pnpm preview      # Preview production build locally
```
