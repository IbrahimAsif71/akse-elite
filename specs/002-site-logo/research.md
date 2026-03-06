# Research: Site-Wide Logo

**Date**: 2026-03-06 | **Feature**: 002-site-logo

## R1: Logo Image Properties

**Decision**: Use `/akse.png` directly from the `public/` directory via `<img>` tag.

**Findings**:

- Source: `public/akse.png` (2618×864 px, RGBA, ~115KB)
- Aspect ratio: 3.03:1 (wide wordmark)
- Format: PNG with alpha channel (transparency-safe on dark background)
- At 2× Retina: supports crisp rendering up to ~151×50 display pixels (source / 2 per axis)

**Rationale**: The image is already in `public/` and served as a static asset by Nuxt/Nitro. No bundler processing is needed — a standard `<img src="/akse.png">` in SSR templates produces the correct output.

**Alternatives considered**:

- **Nuxt Image (`<NuxtImg>`)**: Not installed; adds a dependency for a single static image. Overkill.
- **Inline SVG conversion**: The source is a raster PNG, not vector. Converting would lose quality or require manual tracing.
- **WebP conversion**: Would reduce file size (~30-50%) but adds a build step. Explicitly out of scope per spec assumptions.

## R2: Display Sizing Strategy

**Decision**: Constrain height with Tailwind `h-*` utility; let width auto-scale. Provide explicit `width`/`height` HTML attributes matching the intrinsic ratio to prevent CLS.

**Findings**:
| Context | Display Height | Computed Width | Tailwind Class |
|---|---|---|---|
| Nav bar (desktop) | 32px | ~97px | `h-8` |
| Nav bar (mobile) | 28px | ~85px | `h-7` |
| Footer | 24px | ~73px | `h-6` |

The nav bar is `h-16` (64px), so a 32px logo height leaves comfortable padding. Mobile can use a slightly smaller height. Footer uses a smaller size for visual hierarchy.

**Rationale**: Height-constrained scaling with `w-auto` keeps the aspect ratio correct regardless of the logo's exact pixel dimensions. Explicit `width`/`height` attributes set to the intrinsic dimensions (2618/864) tell the browser the aspect ratio before the image loads, preventing layout shift.

**Alternatives considered**:

- **Fixed pixel width + height**: Fragile if the logo image is ever updated with slightly different dimensions.
- **`object-contain` with fixed container**: More markup for the same result; unnecessary for a simple `<img>`.

## R3: Removing the "AKSE" Text Span

**Decision**: Remove the text span next to the logo in SiteNav and the text `<p>` in SiteFooter since the image contains the wordmark.

**Rationale**: The akse.png is 3:1 aspect ratio — this is clearly a wordmark (text-based logo), not an icon. Displaying "AKSE" text alongside a wordmark logo would be redundant. The `aria-label="AKSE — Home"` on the parent `<NuxtLink>` already provides screen reader context.

**Alternatives considered**:

- **Keep text alongside image**: Creates visual redundancy if the image already spells "AKSE".
- **Visually hide text with `sr-only`**: Unnecessary since the parent link already has `aria-label`.

## R4: Accessibility Approach

**Decision**: Use `alt=""` (decorative) on the `<img>` since the parent `<NuxtLink>` has `aria-label="AKSE — Home"`. In the footer, the logo is not inside a link, so use `alt="AKSE"` for screen reader identification.

**Rationale**: Per WCAG 2.1: if an image is the sole content of a link, either the image's `alt` or the link's `aria-label` must convey purpose. The nav already has `aria-label`, so `alt=""` avoids double-announcement. The footer logo stands alone, so it needs descriptive `alt` text.

**Alternatives considered**:

- **`alt="AKSE logo"` everywhere**: Would cause screen readers to announce "AKSE logo, link, AKSE — Home" in the nav (redundant).
- **`role="img"` with `aria-label`**: Overengineered for a standard `<img>` tag.

## R5: Legacy Cleanup

**Decision**: Delete `public/logo-placeholder.svg` and remove all references.

**Findings**:

- `public/logo-placeholder.svg`: Created in feature 001 as a temporary diamond placeholder.
- Referenced only in `components/SiteNav.vue` line 88: `src="/logo-placeholder.svg"`.
- No other files reference this path.

**Rationale**: Constitution Principle V requires removing unused artifacts during rewrite phases.
