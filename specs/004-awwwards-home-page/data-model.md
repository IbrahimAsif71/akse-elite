# Data Model: Awwwards-Level Home Page

**Created**: 2026-03-06  
**Source**: [spec.md](spec.md) → Key Entities + [research.md](research.md)

---

## Overview

All data for this feature is static mock data defined within components. No CMS integration. No database. Entities are TypeScript interfaces used to type the mock arrays.

---

## Entity: TourCard

Represents a heritage tour preview displayed in the FeaturedTours section.

| Field       | Type     | Required | Description                                                     |
| ----------- | -------- | -------- | --------------------------------------------------------------- |
| id          | `string` | yes      | Unique identifier (e.g., `"tour-1"`)                            |
| title       | `string` | yes      | Tour name (e.g., `"Rohtas Fort"`)                               |
| location    | `string` | yes      | Geographic label (e.g., `"Jhelum, Punjab"`)                     |
| description | `string` | yes      | Brief summary (1-2 sentences)                                   |
| image       | `string` | yes      | Path to image in `/public/images/tours/`                        |
| category    | `string` | yes      | Classification (e.g., `"Heritage"`, `"Museum"`, `"Commercial"`) |

**Validation**: All fields are static strings. No user input. No runtime validation needed.

**Relationships**: None. Standalone mock array.

---

## Entity: ProcessStep

Represents one phase in the AKSE workflow, displayed in the ProcessPinned horizontal scroll section.

| Field       | Type     | Required | Description                                     |
| ----------- | -------- | -------- | ----------------------------------------------- |
| number      | `number` | yes      | Step ordinal (1, 2, 3)                          |
| title       | `string` | yes      | Step name (`"Capture"`, `"Craft"`, `"Publish"`) |
| description | `string` | yes      | Explanatory text for the step                   |

**Validation**: Exactly 3 steps, hardcoded. No dynamic changes.

**Relationships**: None. Ordered array.

---

## Entity: GlobeMarker

Represents a geographic pinpoint on the interactive cobe globe in the hero section.

| Field    | Type               | Required | Description                             |
| -------- | ------------------ | -------- | --------------------------------------- |
| name     | `string`           | yes      | City name (display label)               |
| location | `[number, number]` | yes      | `[latitude, longitude]` tuple           |
| size     | `number`           | yes      | Marker radius (0–1 scale, e.g., `0.05`) |

**Fixed data** (from research R-008):

| Name       | Latitude | Longitude | Size |
| ---------- | -------- | --------- | ---- |
| Rawalpindi | 33.5731  | 73.1898   | 0.05 |
| Hasanabdal | 33.7847  | 72.7178   | 0.04 |
| Lahore     | 31.5497  | 74.3436   | 0.05 |
| Gilgit     | 35.9202  | 74.3114   | 0.04 |

**Validation**: Static array of exactly 4 markers. Coordinates verified.

**Relationships**: Marker color is derived from the active theme's accent token at runtime (not stored in model).

---

## Entity: GlobeThemeConfig

Represents the color configuration passed to the cobe globe instance based on active theme.

| Field       | Type                       | Required | Description                     |
| ----------- | -------------------------- | -------- | ------------------------------- |
| markerColor | `[number, number, number]` | yes      | RGB 0-1 array for marker pins   |
| baseColor   | `[number, number, number]` | yes      | RGB 0-1 array for globe surface |
| glowColor   | `[number, number, number]` | yes      | RGB 0-1 array for ambient glow  |
| dark        | `number`                   | yes      | 0 (bright map) or 1 (dark map)  |

**State transitions**: When theme changes from light→dark or dark→light, globe instance is destroyed and recreated with the new GlobeThemeConfig values.

| Mode  | markerColor             | baseColor               | glowColor               | dark |
| ----- | ----------------------- | ----------------------- | ----------------------- | ---- |
| Dark  | `[0.788, 0.396, 0.239]` | `[0.055, 0.082, 0.086]` | `[0.173, 0.478, 0.514]` | `1`  |
| Light | `[0.788, 0.396, 0.239]` | `[0.953, 0.922, 0.875]` | `[0.788, 0.396, 0.239]` | `0`  |

---

## Entity: CursorState

Represents the runtime state of the custom cursor. Not persisted — purely reactive in-memory state.

| Field      | Type      | Required | Description                                                      |
| ---------- | --------- | -------- | ---------------------------------------------------------------- |
| x          | `number`  | yes      | Current cursor X position (viewport px)                          |
| y          | `number`  | yes      | Current cursor Y position (viewport px)                          |
| isExpanded | `boolean` | yes      | Whether cursor is in expanded (hover) state                      |
| label      | `string`  | yes      | Text displayed when expanded (e.g., `"Explore"`, `"Drag"`, `""`) |
| isVisible  | `boolean` | yes      | Whether the cursor is rendered (false on touch devices)          |

**State transitions**:

- Default → Expanded: mouseenter on actionable element
- Expanded → Default: mouseleave from actionable element
- Visible → Hidden: touch device detected / page unmount
- Label changes: depends on hovered element type (link→"Explore", globe→"Drag", default→"")

---

## No Persisted State

This feature has no server-side state, no database entities, no API payloads, and no user-submitted data. All entities are compile-time constants or runtime-only reactive state.
