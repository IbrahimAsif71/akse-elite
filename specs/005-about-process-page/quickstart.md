# Quickstart: About & Process Page

**Feature**: 005-about-process-page  
**Created**: 2026-03-09

---

## Prerequisites

- Node.js version compatible with Nuxt 4 (check `package.json` engines field; typically Node 20+)
- pnpm installed globally (`npm install -g pnpm` — one-time setup only)
- Git branch `005-about-process-page` checked out

## Setup

No new dependencies required. All libraries are already installed.

```bash
# Verify you are on the correct branch
git branch --show-current
# Expected: 005-about-process-page

# Install dependencies (if not already installed)
pnpm install

# Start development server
pnpm dev
```

## Create Image Asset Directory

Mock images need a home. Create the directory and add placeholder filenames:

```bash
mkdir -p public/images/about

# If you have actual photography, copy it here:
# cp /path/to/hero-camera-rig.jpg public/images/about/hero-camera-rig.jpg
# etc.

# If no images are available yet, the components use bg-muted as a graceful fallback.
# No files are required to run the dev build.
```

Expected files (all optional — fallback renders if absent):

```
public/images/about/
├── hero-camera-rig.jpg          # Hero section background
├── step-01-assessment.jpg       # Process step 1
├── step-02-capture.jpg          # Process step 2
├── step-03-editing.jpg          # Process step 3
├── step-04-stitching.jpg        # Process step 4
└── step-05-deployment.jpg       # Process step 5
```

## New Files to Create

```
components/About/HeroStory.vue
components/About/MissionStatement.vue
components/About/ProcessTimeline.vue
components/About/TechShowcase.vue
components/About/AboutCTA.vue
```

Modify:

```
pages/about.vue           # Replace placeholder content
```

Do NOT modify:

```
components/MagneticWrapper.vue     # Already correct — consumed as-is
plugins/gsap.client.ts             # Already correct
plugins/lenis.client.ts            # Already correct
```

## Verification Checklist

After implementation, verify each section manually:

### 1. Hero Section (`/about`)

- [ ] Page loads and headline text is invisible initially, then reveals word-by-word within ~1s
- [ ] Tagline fades in after the headline completes
- [ ] Hero image is visible (or `bg-muted` placeholder if image absent)
- [ ] Slowly scroll down — image should scale down slightly and sharpen (blur decreases)
- [ ] Scroll back up — image should scale back up and blur slightly (scrub reverses)
- [ ] Switch to dark mode — background is `#0e1516`, text is light, image scrub still works

### 2. Mission Statement

- [ ] All `missionLines` are rendered at low opacity (~0.2) when the section is below the viewport
- [ ] As you scroll into the section, each line brightens to full opacity in sequence
- [ ] Scroll backward — lines dim back to low opacity
- [ ] Three pillar words (Preserve / Present / Elevate) are rendered significantly larger than body text
- [ ] Each pillar has a one-sentence description below it
- [ ] In light mode — pillar words use orange accent. In dark mode — rust accent.

### 3. Process Timeline (`md` viewport and above)

- [ ] Left column heading ("How We Capture Reality") stays fixed as you scroll through the five steps
- [ ] Five steps are visible in the right column with incrementing number badges (01–05)
- [ ] Companion image for Step 1 is fully visible when Step 1 is centered in viewport
- [ ] As you scroll to Step 2, the image crossfades from Step 1 to Step 2 (smooth opacity transition)
- [ ] All five crossfades work in sequence without a flash or hard cut
- [ ] Scroll back up — crossfades reverse correctly
- [ ] Left column unpins naturally when you scroll past the last step
- [ ] **Lenis + sticky compatibility check**: The left column sticky does NOT wobble, lag, or lose its position during smooth scroll. If it does, escalate to the GSAP `pin` fallback (see R-002 in research.md).

### 4. Process Timeline (narrow/mobile viewport below `md`)

- [ ] Layout is single-column (no sticky split-screen)
- [ ] Each step has its image rendered inline above the step text
- [ ] No crossfade animation on mobile (images are inline, not stacked)

### 5. Tech Showcase

- [ ] All 7 tech items render in a bento-style grid (varied column spans)
- [ ] On desktop with a pointer device: hovering a card triggers subtle magnetic pull toward cursor
- [ ] On pointer leave: card springs back with elastic overshoot
- [ ] Card border glows with accent color on hover (orange in light / rust in dark)
- [ ] On touch device or mobile: no magnetic effect (cards render flat)
- [ ] Lucide icons render without missing-icon placeholders

### 6. Bottom CTA

- [ ] Section is visible at the bottom of the page
- [ ] Two buttons present: "Start a Project" and "View the Archive"
- [ ] "Start a Project" navigates to `/contact` (SPA navigation, no full reload)
- [ ] "View the Archive" navigates to `/tours`
- [ ] No 404 errors on either destination
- [ ] CTA layout has strong visual contrast in both light and dark modes

### 7. Accessibility & Reduced Motion

- [ ] In Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`:
  - Hero word reveal fires instantly (no stagger delay)
  - Per-line opacity immediately shows all text at full opacity
  - Process crossfade shows images in their initial state without transitions
- [ ] All `<img>` tags have non-empty `alt` text
- [ ] All interactive elements (CTA buttons) are keyboard-focusable with visible focus ring

### 8. SSR Verification

```bash
pnpm build && pnpm preview
```

- [ ] Navigate to `/about` in the browser (no JS executed yet — view source)
- [ ] `view-source:http://localhost:3000/about` contains the mock headline text, pillar words, step titles, and tech item names in the HTML
- [ ] No hydration mismatch warnings in browser console
- [ ] No `document is not defined` or `window is not defined` errors in the build output

## Tech Stack Reference

| Concern                | Solution                                    |
| ---------------------- | ------------------------------------------- |
| Animation              | GSAP 3.14.x via `useNuxtApp().$gsap`        |
| Scroll trigger         | `$ScrollTrigger` from `gsap.client.ts`      |
| Smooth scroll          | Lenis 1.3.x singleton via `$lenis`          |
| Text splitting         | Vue `computed()` + `.split(' ')`            |
| Sticky layout          | CSS `position: sticky` via Tailwind         |
| Magnetic hover         | `components/MagneticWrapper.vue` (existing) |
| Card primitives        | `components/ui/card/` (shadcn-vue)          |
| Icons                  | `lucide-vue-next`                           |
| Theme                  | `@nuxtjs/color-mode` (class strategy)       |
| Responsive breakpoints | Tailwind `md:` (768px)                      |
| Package manager        | pnpm (required — no npm/yarn/bun)           |
