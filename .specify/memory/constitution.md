<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
	- Template Principle 1 -> I. Core Stack and Package Governance
	- Template Principle 2 -> II. UI System and Brand Fidelity
	- Template Principle 3 -> III. Motion Performance and Runtime Safety
	- Template Principle 4 -> IV. SSR Data and SEO Integrity
	- Template Principle 5 -> V. Code Hygiene and Modular Rewrite Discipline
- Added sections:
	- Technical Standards
	- Delivery Workflow and Quality Gates
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/commands/*.md (directory not present)
- Runtime guidance updates:
	- ✅ updated: README.md (pnpm-only commands)
- Deferred TODOs:
	- None
-->

# akse-elite Constitution

## Core Principles

### I. Core Stack and Package Governance

All rewrite work MUST use Nuxt 4 with Vue 3 Composition API and `script setup` in page and
component implementation. Package management and script execution MUST use pnpm exclusively;
`npm`, `yarn`, and `bun` commands are prohibited for project dependency operations. New
framework-level tooling MUST be compatible with Node.js engines required by Nuxt 4 and locked
through pnpm lockfile updates.
Rationale: One stack and one package manager prevent environment drift and engine mismatch
failures.

### II. UI System and Brand Fidelity

Tailwind CSS and shadcn-vue are the mandatory UI foundation. Structural layout and component
styling MUST be implemented with Tailwind utilities and shadcn variants; raw CSS is limited to
token declarations, animation keyframes, or unavoidable browser-specific fixes. The visual brand
We are implementing a strict Dual-Theme architecture using @nuxtjs/color-mode (class strategy).
Dark Mode (Legacy): Cinematic, Base: #0e1516, Accents: Rust (#C9653D) and Teal (#2C7A83).
Light Mode (New): Modern/Earthy, Base: Beige/Light Neutral, Accent: Orange.
and MUST implement a premium font pairing (body + display heading) consistently
across pages.
Rationale: A unified design system preserves premium brand continuity while improving delivery
speed and consistency.

### III. Motion Performance and Runtime Safety

GSAP and a single modern `lenis` instance are the only approved motion stack. The deprecated
`@studio-freight/lenis` package MUST NOT be used and duplicate smooth-scroll initializations are
forbidden. Animations MUST target 60fps and MUST be registered/cleaned using Vue lifecycle and
Nuxt page hooks to avoid memory leaks, orphaned listeners, and duplicate timelines.
Rationale: Premium motion quality depends on stable frame pacing and leak-free lifecycle usage.

### IV. SSR Data and SEO Integrity

Sanity data fetching MUST default to SSR for all index and detail content that contributes to
discovery, including Tours listings. SEO metadata MUST be authored with `useSeoMeta` inside
`script setup`; metadata logic in style blocks or non-executed contexts is invalid. The app MUST
include sitemap generation and a configured favicon as baseline SEO requirements.
Rationale: Server-rendered content and deterministic metadata are required for crawlability and
search performance.

### V. Code Hygiene and Modular Rewrite Discipline

Unused components, dead routes, duplicate plugins, and broken style or routing states MUST be
removed during rewrite phases. Legal pages MUST serve distinct and accurate content per route.
Complex pages MUST be decomposed into reusable shadcn-based modules with clear ownership,
instead of monolithic page files.
Rationale: Rewrite success depends on reducing legacy entropy and enforcing maintainable module
bounds.

## Technical Standards

- Runtime baseline MUST be Node.js versions supported by Nuxt 4 engine constraints.
- New UI primitives SHOULD be composed from shadcn-vue before introducing custom components.
- Any exception to Tailwind-first structural styling MUST be documented in the feature spec under
  a dedicated "Constitution Exception" note.
- Accessibility MUST include keyboard-focus visibility, semantic landmarks, and contrast-preserving
  usage of brand colors.
- Performance budgets for new animated pages SHOULD maintain smooth interaction under typical
  laptop/mobile hardware; heavy effects MUST provide graceful degradation.

## Delivery Workflow and Quality Gates

- Every plan MUST include a constitution check covering stack, package manager, design system,
  motion safety, SSR SEO, and cleanup scope.
- Every spec MUST include explicit requirements for SSR strategy and SEO metadata when content is
  indexable.
- Every tasks breakdown MUST include concrete cleanup tasks when replacing legacy modules.
- Pull requests MUST fail review if they introduce duplicate smooth-scroll providers, non-pnpm
  install instructions, or non-SSR fetching for indexable content without approved exception.

## Governance

This constitution overrides conflicting local conventions for the rewrite program. Amendments
require: (1) documented change rationale, (2) impact assessment on plan/spec/tasks templates, and
(3) migration notes for in-flight feature branches when behavior changes. Versioning follows
semantic governance: MAJOR for incompatible principle removals/redefinitions, MINOR for new
principles or materially expanded obligations, PATCH for clarifications and wording-only updates.
Compliance review is mandatory at planning, PR review, and pre-release checkpoints.

**Version**: 1.0.0 | **Ratified**: 2026-03-05 | **Last Amended**: 2026-03-05
