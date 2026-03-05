# akse-elite — Full Project Specification

> **Purpose of this document:** Complete reference of the current website so the codebase can be rebuilt from scratch without losing any context.
> Generated: 2026-03-05

---

## Table of Contents

1. [Brand & Business Overview](#1-brand--business-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Layout & Global Components](#5-layout--global-components)
6. [Pages — Detailed Breakdown](#6-pages--detailed-breakdown)
7. [Components — Detailed Breakdown](#7-components--detailed-breakdown)
8. [Plugins](#8-plugins)
9. [Composables](#9-composables)
10. [CMS — Sanity Integration](#10-cms--sanity-integration)
11. [Forms & Netlify](#11-forms--netlify)
12. [Deployment & Hosting](#12-deployment--hosting)
13. [SEO & Meta](#13-seo--meta)
14. [Animation & Interaction Patterns](#14-animation--interaction-patterns)
15. [Static Assets](#15-static-assets)
16. [Known Quirks & Notes](#16-known-quirks--notes)

---

## 1. Brand & Business Overview

| Field                    | Detail                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Name**                 | akse (stylised lowercase)                                                                                        |
| **Tagline**              | "Heritage Redefined"                                                                                             |
| **One-liner**            | "Building digital archives for cultural spaces worldwide."                                                       |
| **Positioning**          | Preserve • Present • Elevate                                                                                     |
| **What they do**         | Archival-grade 3D and 360° immersive virtual tours for heritage sites, museums, and premium commercial spaces    |
| **Services**             | 360° Immersive Tours · Digital Heritage Preservation · Museum & Cultural Archiving · Commercial Immersive Spaces |
| **Location**             | Islamabad / Rawalpindi, Pakistan                                                                                 |
| **Email**                | akse360@gmail.com                                                                                                |
| **Instagram**            | [@akse.lab](https://instagram.com/akse.lab)                                                                      |
| **LinkedIn / YouTube**   | Placeholder links (not yet live)                                                                                 |
| **Process**              | Assessment → Capture → Pathway Design → Optimization → Deployment                                                |
| **Capabilities**         | Preserve Heritage · Cinematic Experiences · Commercial Impact                                                    |
| **Key stats (homepage)** | 25+ Sites Digitized · 150K+ Sq Ft Captured · 300+ Years Preserved                                                |

### Voice & Tone

- Premium, cinematic, heritage-first
- Copy is aspirational but grounded ("digital memory outlives time", "museum-grade capture")
- CTAs say "Start a Project" or "Explore Tours"

---

## 2. Tech Stack & Dependencies

### Runtime

| Technology     | Version | Role                          |
| -------------- | ------- | ----------------------------- |
| **Nuxt**       | ^4.3.1  | Meta-framework (SSR + static) |
| **Vue**        | ^3.5.28 | UI framework                  |
| **Vue Router** | ^4.6.4  | Routing                       |

### CMS

| Package               | Version | Role                                                   |
| --------------------- | ------- | ------------------------------------------------------ |
| **@sanity/client**    | ^7.16.0 | Sanity API client                                      |
| **@sanity/image-url** | ^2.0.3  | Image URL builder for Sanity assets                    |
| **@portabletext/vue** | ^1.0.14 | Render Sanity Portable Text (rich body content) in Vue |

### Animation & Interaction

| Package                   | Version | Role                                             |
| ------------------------- | ------- | ------------------------------------------------ |
| **gsap**                  | ^3.14.2 | Core animation engine (ScrollTrigger, timelines) |
| **lenis**                 | ^1.3.17 | Smooth scroll (primary)                          |
| **@studio-freight/lenis** | ^1.0.42 | Smooth scroll (legacy duplicate — see quirks)    |

### 3D (available but lightly used)

| Package          | Version | Role                              |
| ---------------- | ------- | --------------------------------- |
| **@tresjs/nuxt** | ^5.3.0  | Three.js integration for Vue/Nuxt |

### Utilities

| Package          | Version | Role                      |
| ---------------- | ------- | ------------------------- |
| **@vueuse/core** | ^14.2.1 | Vue composition utilities |

### Deployment

- **Netlify** (Nitro preset: `netlify`)
- Build command: `npm run build`
- Publish directory: `dist`

---

## 3. Project Structure

```
akse-elite/
├── app.vue                     # Root app shell (<NuxtLayout><NuxtPage /></NuxtLayout>)
├── nuxt.config.ts              # Nuxt config (Nitro preset, Sanity runtime config)
├── package.json                # Dependencies & scripts
├── tsconfig.json               # Nuxt-generated TS config references
├── netlify.toml                # Netlify build/redirect rules
│
├── assets/
│   └── styles/
│       └── main.css            # Global CSS: design tokens, luxury backgrounds, utilities
│
├── layouts/
│   └── default.vue             # Default layout: ScrollProgress, bg-anim, PageVeil, SiteNav, <slot>, SiteFooter
│
├── pages/
│   ├── index.vue               # Home: HeroCinematic + HomeSections + StoryPinned
│   ├── about.vue               # About: Hero, pillars, capabilities tabs, process, archive gallery
│   ├── contact.vue             # Contact form (Netlify Forms)
│   ├── privacy.vue             # Privacy policy (static)
│   ├── terms.vue               # Terms (static — identical to privacy currently)
│   ├── cookies.vue             # Cookies (static — identical to privacy currently)
│   ├── thank-you.vue           # Post-form submission confirmation
│   ├── blog/
│   │   ├── index.vue           # Blog listing: featured post, category filter, grid, inline contact form
│   │   └── [slug].vue          # Blog detail: PortableText body rendering
│   └── tours/
│       ├── index.vue           # Tour listing: search, category filter, featured card, grid
│       ├── [slug].vue          # Tour detail: hero image, metadata, embedded 360° iframe
│       └── test.vue            # Dev test page (placeholder)
│
├── components/
│   ├── HeroCinematic.vue       # Homepage hero with background video + GSAP text animation
│   ├── HomeSections.vue        # Homepage content: features grid, stats, CTA
│   ├── StoryPinned.vue         # Scroll-pinned process steps with GSAP choreography
│   ├── SiteNav.vue             # Fixed top navbar with desktop pill-rail + mobile drawer
│   ├── SiteFooter.vue          # Footer with columns (Company, Legal, Contact, socials)
│   ├── ScrollProgress.vue      # Fixed top scroll progress bar (rust-colored)
│   ├── PageVeil.vue            # Full-screen fade overlay on route transitions
│   ├── Magnetic.vue            # Magnetic hover effect wrapper (mouse-follow translate)
│   ├── CaseGrid.vue            # (Available — not actively used on any page)
│   ├── FAQ.vue                 # (Available — not actively used on any page)
│   ├── FinalCTA.vue            # (Available — not actively used on any page)
│   ├── Hero3D.vue              # (Available — not actively used on any page)
│   ├── ImpactMetrics.vue       # (Available — not actively used on any page)
│   ├── OfferTriptych.vue       # (Available — not actively used on any page)
│   ├── Showcase360.vue         # (Available — not actively used on any page)
│   ├── Testimonials.vue        # (Available — not actively used on any page)
│   └── TrustBar.vue            # (Available — not actively used on any page)
│
├── composables/
│   └── usePageIntro.ts         # Runs animation callback on mount + every page:finish
│
├── plugins/
│   ├── gsap.client.ts          # Registers GSAP + ScrollTrigger, provides $gsap & $ScrollTrigger
│   ├── lenis.client.ts         # Initialises Lenis smooth scroll, provides $lenis
│   ├── smooth.client.ts        # Second Lenis instance (@studio-freight/lenis — legacy duplicate)
│   └── reveal.client.ts        # Adds `page-ready` class to <html> after page:finish
│
├── utils/
│   └── sanity.ts               # createClient + imageUrlBuilder; exports `sanity` and `urlFor`
│
└── public/
    ├── logo.png                # akse logo (used in SiteNav)
    ├── robots.txt              # Allow all crawlers
    ├── _redirects               # Netlify SPA fallback: /* → /index.html 200
    ├── netlify-forms.html      # Hidden HTML form for Netlify form detection at build time
    ├── thank-you/
    │   └── index.html          # Static thank-you page (Netlify redirect target)
    └── video/
        └── hero-v2.mp4         # Homepage background hero video
```

---

## 4. Design System

### Color Tokens

| Token         | Value                                   | Usage                                                    |
| ------------- | --------------------------------------- | -------------------------------------------------------- |
| `--rust`      | `#C9653D` / `#b35a2e` (layout override) | Primary accent — CTAs, tags, progress bar, active states |
| `--rust-ink`  | `rgba(201,101,61,0.18)`                 | Subtle rust glow for backgrounds                         |
| `--teal`      | `#2C7A83`                               | Secondary accent — edge highlights                       |
| `--teal-ink`  | `rgba(44,122,131,0.16)`                 | Subtle teal background glow                              |
| `--text`      | `#F3EDE7`                               | Primary text color (warm off-white)                      |
| `--muted`     | `rgba(243,237,231,0.78)`                | Secondary text                                           |
| `--surface`   | `rgba(10,12,13,0.34)`                   | Dark glass panel background                              |
| `--surface-2` | `rgba(10,12,13,0.46)`                   | Deeper glass panel background                            |
| `--border`    | `rgba(255,255,255,0.14)`                | Subtle white border                                      |
| `--bg`        | `#0e1516`                               | Page background (dark teal-black)                        |

### Background Treatment

The page background is NOT a flat color. It uses layered radial gradients:

- **Layout `default.vue`** sets `--bg: #0e1516` as base
- **`.bg-anim`** (fixed, z-index:0): Two floating radial gradients (rust top-left, teal top-right) with a slow `drift` CSS animation (16s alternate, translating ±12px and scaling to 1.04)
- **`body`** in `main.css`: Additional radial gradients creating depth
- **`body::before`**: Film-grain overlay using repeating-linear-gradient at 0.18 opacity with `mix-blend-mode: overlay`
- Overall color-scheme: `dark`

### Typography

- No custom font loaded — uses system fonts
- Headings: `font-weight: 300` (thin/light), sizes use `clamp()` — typically 38–72px for h1, 34–56px for h2
- Body text: `line-height: 1.8–1.85`, `opacity: 0.85–0.9` for muted effect
- Kicker labels (`.k`): Rust-colored, uppercase, 12px, letter-spacing 1px

### Component Patterns

- **Cards**: `border-radius: 18px`, dark semi-transparent background (`rgba(32,16,14,0.55)`), 1px white-alpha border, `backdrop-filter: blur(12px)`, hover lifts with `-6px translateY` and rust border
- **Buttons (`.btn`, `.cta`)**: `background: var(--rust)`, `border-radius: 999px` (pill), white text, paddings ~12px 18px
- **Ghost buttons**: Transparent background, 1px white-alpha border
- **Chips / filter buttons**: Same glass bg, pill radius, toggle `.on` state with rust bg + border
- **Glass surfaces (`.surface`)**: Gradient from `--surface-2` to `--surface`, blur 16px, 26px border-radius, large box-shadow
- **Teal edge utility (`.teal-edge`)**: `border-top: 1px solid rgba(44,122,131,0.35)` + inset shadow

### Layout Constants

- Max content width: `1100px` (some pages use `900px` or `820px` for narrower content)
- Page padding: `120px 18px` top/bottom + sides
- Nav height: ~66px (fixed top, `backdrop-filter: blur(14px)`)
- Gap / spacing: Predominantly `18px` grid gaps, `14px` smaller gaps

### Responsive Breakpoints

- `640px`: Mobile text centering, CTA alignment
- `768px`: Mobile nav + safe-area padding
- `900px`: Grid collapses from 2-column to 1-column

---

## 5. Layout & Global Components

### `layouts/default.vue`

Wraps every page. Structure:

```
<div class="layoutRoot">
  <ScrollProgress />         ← Fixed rust progress bar at very top
  <div class="bg-anim" />    ← Animated ambient gradient background
  <PageVeil />               ← Full-screen overlay for route transitions
  <SiteNav />                ← Fixed top navigation
  <main class="main">
    <slot />                  ← Page content
  </main>
  <SiteFooter />             ← Footer
</div>
```

### `app.vue`

Minimal: just `<NuxtLayout><NuxtPage /></NuxtLayout>` with page transition CSS (blur + fade + translateY).

---

## 6. Pages — Detailed Breakdown

### 6.1 Home (`/` — `pages/index.vue`)

Composed of three components:

1. **HeroCinematic** — Full-viewport hero with autoplay background video (`/video/hero-v2.mp4`), heading "Heritage Redefined", subtitle, two CTAs ("Explore Tours" → `/tours`, "Start Project" → `/contact`)
2. **HomeSections** — Three sections:
   - **What we build**: 4-card grid (360° Immersive Tours, Digital Heritage Preservation, Museum & Cultural Archiving, Commercial Immersive Spaces)
   - **Digital Preservation Index**: Stats (25+ Sites Digitized, 150K+ Sq Ft Captured, 300+ Years Preserved)
   - **CTA**: "Ready to preserve your space?" with Magnetic-wrapped link
3. **StoryPinned** — Scroll-pinned panel with 5 process steps (Assessment, Capture, Pathway Design, Optimization, Deployment) that reveal progressively via GSAP scrub

### 6.2 About (`/about` — `pages/about.vue`)

Large single page with these sections:

1. **Hero** (2-column grid): Left = heading + description + CTAs + trust badges. Right = parallax orb + glass card ("Preserve • Present • Elevate") + 4 mini stat boxes (3D Capture, 360° Pathways, Archive Intent, Global Ready)
2. **Pillars** (3-column): Who we are / What we do / Why it matters
3. **Capabilities** (interactive tabs): Three modes — Preserve Heritage, Cinematic Experiences, Commercial Impact. Each shows a description + 4 feature sub-cards
4. **Process Teaser** (3-column): 01 Capture, 02 Craft, 03 Publish
5. **Gallery & Archive** — **CMS-driven** (Sanity `archiveItem` type). Filterable by type: All, Photo, Scan, 3D Model, 360 Tour, Story. Each card is clickable and expands inline to show full-size images, thumbnail strip gallery, description, and external link
6. **Bottom CTA**: "Want your site archived?"

**Data**: Fetches `archiveItem` from Sanity at build time (SSR), refreshes on mount.

### 6.3 Tours Index (`/tours` — `pages/tours/index.vue`)

1. **Hero** (2-column): Left = "Tour Library" heading + search input + category chips (All, Heritage, Museum, Commercial). Right = Featured tour card with image
2. **Partner strip**: "Built for" — Heritage Sites, Museums, Hospitality, Commercial Outlets
3. **All tours grid**: Responsive card grid with image, category tag, title, location, summary, "Open tour →"
4. **Bottom CTA**: "Turn your space into a global experience"

**Data**: Fetches `tour` documents from Sanity (client-side). Supports text search + category filter. Featured = first result.

### 6.4 Tour Detail (`/tours/[slug]` — `pages/tours/[slug].vue`)

1. **Top** (2-column): Left = category tag, title (h1), location, summary, CTAs. Right = hero image
2. **Embed section**: "Enter Experience" — `<iframe>` embedding the 360° tour URL from Sanity field `tourUrl`

**Data**: Single `tour` by slug from Sanity. Sets per-tour `<title>` and OG meta tags.

### 6.5 Blog Index (`/blog` — `pages/blog/index.vue`)

1. **Hero**: "Journal" — "Insights on Digital Heritage & Immersive Storytelling"
2. **Featured post** (2-column): Image + title/excerpt + "Read Article →"
3. **Category filter**: Dynamic chips from unique post categories
4. **Blog grid**: Cards with image, category tag, title, excerpt
5. **Contact section** (bottom): Inline "Start a Project" form (Netlify form `start-project`)

**Data**: Fetches `blogPost` from Sanity (SSR). Fields: title, slug, excerpt, category, featured, publishedAt, mainImage.

### 6.6 Blog Detail (`/blog/[slug]` — `pages/blog/[slug].vue`)

- Back link → `/blog`
- Category tag, title (h1), author + date, excerpt, hero image
- **Body** rendered via `<PortableText :value="post.body" />`
- 404 error thrown if post not found

**Data**: Single `blogPost` by slug. Fields: title, slug, excerpt, category, author, publishedAt, mainImage, body (Portable Text).

### 6.7 Contact (`/contact` — `pages/contact.vue`)

- "Start a Project" heading
- Netlify-powered form with fields: Name, Email, Message
- Submits to `/thank-you`
- Hidden duplicate form for Netlify detection at build time
- Honeypot bot field

### 6.8 Thank You (`/thank-you` — `pages/thank-you.vue`)

- "Thanks — we got it." + "We'll reply soon." + link back to home

### 6.9 Legal Pages (`/privacy`, `/terms`, `/cookies`)

- All three are currently identical static pages
- Title "Privacy Policy", effective date 2026-03-01
- Sections: What we collect, How we use it, Third parties, Contact (hello@akse.com)

---

## 7. Components — Detailed Breakdown

### Active Components

| Component          | File                            | Description                                                                                                                                                                                                                                                                                                              |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **HeroCinematic**  | `components/HeroCinematic.vue`  | Full-viewport hero. Background `<video>` (autoplay, muted, loop, playsinline). GSAP timeline animates h1 → subtitle → buttons. iOS autoplay fallback via first touch/click listener.                                                                                                                                     |
| **HomeSections**   | `components/HomeSections.vue`   | Three scroll-triggered sections: feature cards, stats, CTA. Each section fades in via `$gsap.from()` with ScrollTrigger at `top 80%`.                                                                                                                                                                                    |
| **StoryPinned**    | `components/StoryPinned.vue`    | 2-column layout. Left: title + description. Right: 5 process steps. Title reveals at 80%, entire panel pins for 900px of scroll, steps choreograph in via scrub-linked ScrollTrigger (each step at 140px intervals).                                                                                                     |
| **SiteNav**        | `components/SiteNav.vue`        | Fixed header. **Desktop**: pill-rail nav with animated underline that slides to active link (420ms cubic-bezier transition). Links: Home, About, Tours, Blog. Rust "Start Project" CTA. **Mobile**: burger button → slide-in drawer from right (340px wide, dark glass background). Body scroll locked when drawer open. |
| **SiteFooter**     | `components/SiteFooter.vue`     | 3-column footer. Brand section ("akse" + tagline). Company links (About, Blog, Tours, Contact). Legal links (Privacy, Terms, Cookies). Contact info (email, location). Bottom: copyright + social links (LinkedIn, Instagram, YouTube).                                                                                  |
| **ScrollProgress** | `components/ScrollProgress.vue` | 3px fixed bar at top of viewport. Rust-colored fill that tracks scroll percentage. Passive scroll listener, computed width.                                                                                                                                                                                              |
| **PageVeil**       | `components/PageVeil.vue`       | Full-screen overlay (z-index 9999). Activates on `page:start` hook (opacity → 1), deactivates 180ms after `page:finish`. Radial gradient overlay (teal-dark theme).                                                                                                                                                      |
| **Magnetic**       | `components/Magnetic.vue`       | Wrapper component. Tracks mouse position relative to element center, applies `translate(dx*0.12, dy*0.12)` transform. Resets on mouse leave. 220ms ease transition. Used on CTA buttons.                                                                                                                                 |

### Unused / Reserve Components

These exist in the codebase but are **not imported on any page**:

- `CaseGrid.vue`
- `FAQ.vue`
- `FinalCTA.vue`
- `Hero3D.vue`
- `ImpactMetrics.vue`
- `OfferTriptych.vue`
- `Showcase360.vue`
- `Testimonials.vue`
- `TrustBar.vue`

---

## 8. Plugins

All plugins are **client-only** (`.client.ts` suffix).

### `gsap.client.ts`

- Imports `gsap` and `ScrollTrigger`
- Registers `ScrollTrigger` plugin
- Provides `$gsap` and `$ScrollTrigger` to the Nuxt app

### `lenis.client.ts`

- Creates `Lenis` instance with: `duration: 1.1`, easing: cubic ease-out, `smoothWheel: true`
- Runs RAF loop: `lenis.raf(time)` on every frame
- Provides `$lenis`

### `smooth.client.ts` (legacy duplicate)

- Creates a **second** Lenis instance from `@studio-freight/lenis` (older package)
- Settings: `smooth: true`, `lerp: 0.08`
- Runs its own RAF loop
- Does NOT provide anything — fire-and-forget
- ⚠️ This is a duplicate and likely conflicts with `lenis.client.ts`

### `reveal.client.ts`

- Hooks into `page:finish`
- After 60ms delay, adds `page-ready` CSS class to `<html>`
- Intended for reveal animations (`.reveal` class in `main.css` sets `opacity:0; translateY:16px`)

---

## 9. Composables

### `usePageIntro(callback)`

- Takes a function and runs it:
  1. On `onMounted` (double-rAF for layout stability)
  2. On every `page:finish` hook (so animations replay on SPA navigation)
- Used in tour detail page for cinematic entrance

---

## 10. CMS — Sanity Integration

### Connection Config

| Setting     | Value                                                |
| ----------- | ---------------------------------------------------- |
| Project ID  | `44elzz3z` (env: `NUXT_PUBLIC_SANITY_PROJECT_ID`)    |
| Dataset     | `production` (env: `NUXT_PUBLIC_SANITY_DATASET`)     |
| API Version | `2026-03-01` (env: `NUXT_PUBLIC_SANITY_API_VERSION`) |
| CDN         | `true`                                               |

### Utility: `utils/sanity.ts`

- Exports `sanity` — the configured `@sanity/client` instance
- Exports `urlFor(source)` — image URL builder (`imageUrlBuilder(sanity).image(source)`)

### Sanity Document Types (inferred from GROQ queries)

#### `tour`

| Field       | Type                         | Usage                                 |
| ----------- | ---------------------------- | ------------------------------------- |
| `title`     | string                       | Tour name                             |
| `slug`      | slug (`{ current: string }`) | URL slug                              |
| `category`  | string                       | "Heritage", "Museum", or "Commercial" |
| `location`  | string                       | Geographic location                   |
| `summary`   | string                       | Short description                     |
| `heroImage` | image                        | Main visual                           |
| `tourUrl`   | url/string                   | Embeddable 360° tour iframe URL       |

**GROQ queries:**

- List: `*[_type=="tour" && defined(slug.current)] | order(_createdAt desc){ _id, title, slug, category, location, summary, heroImage }`
- Detail: `*[_type=="tour" && slug.current==$slug][0]{ title, category, location, summary, heroImage, tourUrl }`

#### `blogPost`

| Field         | Type                            | Usage                  |
| ------------- | ------------------------------- | ---------------------- |
| `title`       | string                          | Post title             |
| `slug`        | slug                            | URL slug               |
| `excerpt`     | string                          | Short summary          |
| `category`    | string                          | Blog category          |
| `featured`    | boolean                         | Featured flag          |
| `author`      | string                          | Author name            |
| `publishedAt` | datetime                        | Publish date           |
| `mainImage`   | image                           | Hero image             |
| `body`        | Portable Text (array of blocks) | Rich text body content |

**GROQ queries:**

- List: `*[_type=="blogPost"] | order(publishedAt desc){ _id, title, slug, excerpt, category, featured, publishedAt, mainImage }`
- Detail: `*[_type=="blogPost" && slug.current==$slug][0]{ _id, title, slug, excerpt, category, author, publishedAt, mainImage, body }`

#### `archiveItem`

| Field         | Type            | Usage                                               |
| ------------- | --------------- | --------------------------------------------------- |
| `title`       | string          | Item title                                          |
| `type`        | string          | "Photo", "Scan", "3D Model", "360 Tour", or "Story" |
| `location`    | string          | Geographic location                                 |
| `year`        | number          | Year of capture/significance                        |
| `description` | string          | Detailed description                                |
| `thumbnail`   | image           | Card thumbnail                                      |
| `images`      | array of images | Gallery images                                      |
| `url`         | url/string      | External link                                       |

**GROQ query:**

- List: `*[_type=="archiveItem"] | order(year desc, _createdAt desc){ _id, title, type, location, year, description, thumbnail, images, url }`

---

## 11. Forms & Netlify

### Form: `contact`

- **Location**: `/contact` page + `/public/netlify-forms.html` (build-time detection)
- **Fields**: `name` (text, required), `email` (email, required), `message` (textarea, required)
- **Honeypot**: `bot-field` (hidden)
- **Action**: `/thank-you`
- **Method**: POST with `data-netlify="true"`

### Form: `start-project`

- **Location**: Blog index page (bottom contact section)
- **Fields**: `name` (text, required), `email` (email, required), `message` (textarea, required)
- **Honeypot**: `bot-field` (hidden)
- **Action**: `/thank-you`
- **Method**: POST with `data-netlify="true"`

### Static Thank-You Fallback

- `public/thank-you/index.html` — standalone HTML page for Netlify redirect (styled inline, dark bg, minimal "Thank you" message)

---

## 12. Deployment & Hosting

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/thank-you"
  to = "/thank-you/index.html"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200
  force = true
```

- Nitro preset: `netlify` (server-side rendering via Netlify Functions)
- Static fallback: `public/_redirects` → `/* /index.html 200`
- `robots.txt`: Open to all crawlers, no disallow rules

### Environment Variables

| Variable                         | Default      | Description        |
| -------------------------------- | ------------ | ------------------ |
| `NUXT_PUBLIC_SANITY_PROJECT_ID`  | `44elzz3z`   | Sanity project ID  |
| `NUXT_PUBLIC_SANITY_DATASET`     | `production` | Sanity dataset     |
| `NUXT_PUBLIC_SANITY_API_VERSION` | `2026-03-01` | Sanity API version |

---

## 13. SEO & Meta

### Global

- Viewport meta: `width=device-width, initial-scale=1`
- Color scheme: `dark`

### Per-page

- **Tour detail** (`/tours/[slug]`): Dynamic `<title>` ("Tour Title — akse"), `<meta name="description">`, `og:title`, `og:description` via `useHead()`
- Other pages: No explicit per-page meta (use Nuxt defaults)

---

## 14. Animation & Interaction Patterns

### Page Transitions

- **CSS transition** (`app.vue`): `opacity`, `transform` (translateY ±10px, scale 0.995), `filter` (blur 6px) at 550ms cubic-bezier
- **PageVeil** overlay: Teal-dark radial gradient fades in on `page:start`, fades out 180ms after `page:finish`
- **Reveal class**: `.reveal` elements start at `opacity:0; translateY:16px` — intended to be animated in by GSAP/ScrollTrigger

### GSAP Patterns Used

1. **Timeline entrance** (HeroCinematic, tour detail): Sequential `.from()` — elements fly in from below with opacity 0
2. **Scroll-triggered reveal** (HomeSections): `.from()` with `scrollTrigger: { trigger, start: 'top 80%' }`
3. **Scroll-pinned choreography** (StoryPinned): Pin element for 900px of scroll, scrub-linked step reveals at intervals
4. **usePageIntro composable**: Double-rAF + `page:finish` hook to replay animations on SPA navigation

### Smooth Scroll

- Lenis with `duration: 1.1`, cubic ease-out easing, RAF-driven

### Magnetic Effect

- `Magnetic.vue` wrapper: mouse-follow with 12% factor, 220ms cubic-bezier return transition

### Mouse Parallax

- About page hero: Orb element follows mouse with 12px factor based on cursor position within hero bounds

---

## 15. Static Assets

| File                   | Location                      | Usage                                |
| ---------------------- | ----------------------------- | ------------------------------------ |
| `logo.png`             | `public/logo.png`             | Brand logo in SiteNav (38px height)  |
| `hero-v2.mp4`          | `public/video/hero-v2.mp4`    | Homepage hero background video       |
| `robots.txt`           | `public/robots.txt`           | SEO: allow all                       |
| `_redirects`           | `public/_redirects`           | Netlify SPA fallback                 |
| `netlify-forms.html`   | `public/netlify-forms.html`   | Netlify form detection at build time |
| `thank-you/index.html` | `public/thank-you/index.html` | Static post-submit page              |

---

## 16. Known Quirks & Notes

1. **Duplicate Lenis plugins**: Both `lenis.client.ts` (new `lenis` package) and `smooth.client.ts` (old `@studio-freight/lenis`) run simultaneously, each with their own RAF loop. This likely causes scroll conflicts.

2. **`useHead` in `<style>` block**: Both `app.vue` and `layouts/default.vue` have `useHead()` calls placed inside `<style>` tags instead of `<script setup>`. These are likely non-functional (CSS doesn't execute JS).

3. **Legal pages are identical**: `/privacy`, `/terms`, and `/cookies` all share the same "Privacy Policy" content — they need unique content.

4. **Terms page title bug**: `/terms` page displays "Privacy Policy" heading instead of "Terms of Service".

5. **Cookies page title bug**: `/cookies` page also displays "Privacy Policy" heading.

6. **Tour detail `.tag` color is empty**: In `tours/[slug].vue`, the `.tag` CSS rule has `color: ;` (empty value).

7. **Blog form name mismatch**: Blog page uses form name `start-project` while contact page uses `contact` — these are two separate Netlify form endpoints.

8. **Unused components**: 9 components exist but aren't imported anywhere (CaseGrid, FAQ, FinalCTA, Hero3D, ImpactMetrics, OfferTriptych, Showcase360, Testimonials, TrustBar). These are likely from earlier iterations or planned features.

9. **`@tresjs/nuxt` installed but not visibly used**: Three.js integration is available but no 3D scenes are rendered on any current page.

10. **No analytics**: No Google Analytics, Plausible, or other tracking is configured.

11. **No sitemap**: No `nuxt-sitemap` or similar module is installed.

12. **No favicon**: No explicit favicon file referenced (browser will try default `/favicon.ico`).

13. **Image optimization**: All images are served directly from Sanity CDN via `urlFor().width(N).url()` — no local image optimization pipeline.

14. **SSR vs client-side**: Tours fetch with `{ server: false }` (client-only), while blog and archive items use `{ server: true }` (SSR). This means tour listings won't be in the initial HTML for SEO.

---

_End of specification._
