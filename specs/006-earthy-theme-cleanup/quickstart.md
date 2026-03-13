# Quickstart: Earthy Theme Cleanup

**Feature**: 006-earthy-theme-cleanup
**Date**: 2026-03-09

## Prerequisites

- Node.js (Nuxt 4 compatible version)
- pnpm installed globally

## Setup

```bash
# Switch to feature branch
git checkout 006-earthy-theme-cleanup

# Install dependencies (will remove @nuxtjs/color-mode after implementation)
pnpm install

# Start dev server
pnpm dev
```

## Implementation Order

This is a subtractive feature — each step removes code. Work in this order to minimize broken intermediate states:

### Step 1: Remove dark mode CSS and config

1. Delete `.dark { ... }` block from `assets/css/main.css`
2. Remove `darkMode: "class"` from `tailwind.config.ts`
3. Remove `@nuxtjs/color-mode` from `nuxt.config.ts` modules array
4. Remove `colorMode: { ... }` config block from `nuxt.config.ts`
5. Run `pnpm remove @nuxtjs/color-mode`

### Step 2: Remove ThemeToggle

1. Delete `components/ThemeToggle.vue`
2. Remove import and `<ThemeToggle />` usage from `components/SiteNav.vue`

### Step 3: Remove CustomCursor

1. Delete `components/CustomCursor.vue`
2. Remove `<CustomCursor />` from `layouts/default.vue`
3. Remove `data-cursor` attributes from `components/Home/MassiveCTA.vue`

### Step 4: Remove MagneticWrapper

1. Delete `components/MagneticWrapper.vue`
2. Unwrap content in `components/Home/MassiveCTA.vue`
3. Replace with `<div>` in `components/About/TechShowcase.vue` (preserve v-for, key, class)

### Step 5: Fix component dark mode logic

1. Hardcode light theme in `components/Home/HeroCinematic.vue` (remove useColorMode, getGlobeTheme branching, colorMode watcher)
2. Remove `dark:opacity-80` from HeroCinematic Aurora wrapper
3. Update Aurora color stop from `#0E1516` to `#3b2e1f`
4. Remove `.dark .bento-section` rule and clean `--background-dark` in `components/Home/MagicBento.vue`
5. Strip `dark:` prefixed classes from `components/ui/button/index.ts`

## Validation

```bash
# Build should succeed with no errors
pnpm build

# Grep for dead references (all should return 0 results)
grep -r "useColorMode\|ThemeToggle\|CustomCursor\|MagneticWrapper" --include="*.vue" --include="*.ts" components/ layouts/ pages/
grep -r "dark:" --include="*.vue" --include="*.ts" components/
grep -r "\.dark " --include="*.css" assets/
```

## Visual Verification

After running `pnpm dev`, check:

- [ ] All pages show earthy beige background (#f3ebdf)
- [ ] No theme toggle in navigation
- [ ] No custom cursor on hover
- [ ] No magnetic pull on CTA buttons or tech showcase
- [ ] Globe renders with cream/beige tones
- [ ] Aurora animation uses warm brown tones (no dark navy)
- [ ] Set OS to dark mode — site still shows earthy light theme
