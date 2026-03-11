# Data Model: Interactive Tours Portal

**Created**: 2026-03-11  
**Source**: [spec.md](spec.md) Key Entities section

---

## Entities

### FeaturedTour

The single active/live tour showcased in the hero section.

| Field         | Type     | Description                                       | Example                            |
| ------------- | -------- | ------------------------------------------------- | ---------------------------------- |
| `id`          | `string` | Unique identifier                                 | `"golra-sharif"`                   |
| `title`       | `string` | Display name                                      | `"Golra Sharif Railway Museum"`    |
| `kicker`      | `string` | Kicker tag above headline                         | `"Featured Experience"`            |
| `year`        | `string` | Founding/historical year                          | `"1881"`                           |
| `style`       | `string` | Architecture or heritage style                    | `"Victorian Architecture"`         |
| `captureType` | `string` | Capture modality                                  | `"360° Capture"`                   |
| `ctaLabel`    | `string` | Primary CTA button text                           | `"Enter Virtual Tour"`             |
| `ctaLink`     | `string` | Destination of the CTA (route or external URL)    | `"/tours/golra-sharif"`            |
| `image`       | `string` | Path to hero background image                     | `"/images/tours/golra-sharif.jpg"` |
| `category`    | `string` | Tour category for filter matching                 | `"Heritage Sites"`                 |
| `status`      | `"live"` | Availability state — always `"live"` for featured | `"live"`                           |

### UpcomingTour

A tour in production, not yet available. Displayed with blur/grayscale treatment.

| Field        | Type              | Description                       | Example                           |
| ------------ | ----------------- | --------------------------------- | --------------------------------- |
| `id`         | `string`          | Unique identifier                 | `"lahore-fort"`                   |
| `title`      | `string`          | Display name                      | `"Lahore Fort"`                   |
| `location`   | `string`          | City or region                    | `"Lahore, Punjab"`                |
| `category`   | `string`          | Tour category for filter matching | `"Heritage Sites"`                |
| `image`      | `string`          | Path to placeholder image         | `"/images/tours/lahore-fort.jpg"` |
| `status`     | `"in-production"` | Availability state                | `"in-production"`                 |
| `badgeLabel` | `string`          | Badge text displayed on card      | `"In Production"`                 |

### TourCategory

A filter category rendered as a pill chip in the FilterRail.

| Field   | Type     | Description                 | Example            |
| ------- | -------- | --------------------------- | ------------------ |
| `label` | `string` | Display text                | `"Heritage Sites"` |
| `slug`  | `string` | Lowercase key for filtering | `"heritage-sites"` |

---

## Mock Data Set

### Categories

| Label          | Slug             |
| -------------- | ---------------- |
| All            | `all`            |
| Heritage Sites | `heritage-sites` |
| Museums        | `museums`        |
| Commercial     | `commercial`     |
| In Production  | `in-production`  |

### Tours (combined list — featured + upcoming)

| ID                  | Title                       | Location           | Category       | Status          | Badge           |
| ------------------- | --------------------------- | ------------------ | -------------- | --------------- | --------------- |
| `golra-sharif`      | Golra Sharif Railway Museum | Rawalpindi, Punjab | Museums        | `live`          | `Live`          |
| `lahore-fort`       | Lahore Fort                 | Lahore, Punjab     | Heritage Sites | `in-production` | `In Production` |
| `mohenjo-daro`      | Mohenjo-Daro                | Larkana, Sindh     | Heritage Sites | `in-production` | `In Production` |
| `faisal-mosque`     | Faisal Mosque               | Islamabad, ICT     | Heritage Sites | `in-production` | `In Production` |
| `taxila-museum`     | Taxila Museum               | Taxila, Punjab     | Museums        | `in-production` | `In Production` |
| `pearl-continental` | Pearl Continental Lobby     | Lahore, Punjab     | Commercial     | `in-production` | `In Production` |

---

## Relationships

```
TourCategory 1 ──── * Tour (FeaturedTour | UpcomingTour)
                       │
                       ├── status: "live" → rendered without filter, full visual treatment
                       └── status: "in-production" → rendered with blur/grayscale + badge
```

- The "All" category matches all tours regardless of their `category` field.
- The "In Production" filter category matches tours where `status === "in-production"`.
- Each tour belongs to exactly one category.

---

## Validation Rules

- `id` must be unique across all tours.
- `title` must not be empty.
- `category` must match one of the defined `TourCategory.slug` values (excluding `all` and `in-production` which are meta-filters).
- `image` must be a valid path. Missing images fall back to a themed gradient placeholder.
- `status` must be either `"live"` or `"in-production"`.

---

## State Transitions

Tours progress through a simple lifecycle:

```
in-production → live
```

- A tour in `in-production` status cannot be clicked or navigated to.
- When a tour becomes `live`, it gains a clickable CTA and its blur/grayscale treatment is removed.
- The featured hero section always displays the first `live` tour (currently only Golra Sharif).
- No backward transitions (`live` → `in-production`) are expected.
