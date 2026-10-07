# folder-driven-galleries Specification

## Purpose

Defines how photography and astrophotography pages discover series and groups from the generated media catalog and present an automatic, polished gallery when ingest folders change.

## Requirements

### Requirement: Photography series from catalog
The photography page SHALL render gallery sections from the generated media catalog’s photography series (one series per ingest photography folder). Series filters and the grid MUST update when the catalog changes after ingest—no hand edit of a media list in `siteContent.js` is required for a new folder of images to appear.

#### Scenario: Multiple series show as filters
- **WHEN** the catalog contains more than one photography series with images
- **THEN** the photography page offers a way to view all images and to filter by each series using titles derived from the catalog

#### Scenario: New series visible after catalog update
- **WHEN** ingest adds a new photography series to the catalog and the site is loaded with that catalog
- **THEN** that series appears in the photography gallery without editing `PHOTOGRAPHY` in `siteContent.js`

#### Scenario: Empty photography catalog
- **WHEN** the catalog has no photography images
- **THEN** the photography page shows the existing empty-state presentation rather than a broken layout

### Requirement: Astro groups from catalog
The astrophotography page SHALL render images and group filters from the generated media catalog’s astro entries (groups corresponding to `ingest/astro/<group>/` folders). Filter chips MUST reflect only groups that have at least one image.

#### Scenario: Dynamic group filters
- **WHEN** the catalog contains astro images under multiple groups
- **THEN** the astrophotography page shows filter controls for all images and for each non-empty group present in the catalog

#### Scenario: New astro group visible after catalog update
- **WHEN** ingest adds a new astro group to the catalog and the site is loaded with that catalog
- **THEN** that group’s images and filter appear on the astrophotography page without editing `ASTRO` in `siteContent.js`

### Requirement: Optional rich metadata for astro
Astro items MAY include optional sidecar or catalog fields (title, catalog name, type, date, integration hours, equipment). When those fields are absent, the UI SHALL still display the image using sensible defaults from the filename and group.

#### Scenario: Image without sidecar still displays
- **WHEN** an astro image has no optional metadata beyond file and group
- **THEN** the gallery and lightbox still show the image with a usable title derived from the filename and the group available for filtering

#### Scenario: Sidecar metadata shown when present
- **WHEN** an astro image has optional metadata such as catalog name, integration, or equipment
- **THEN** the lightbox detail rows include those provided fields

### Requirement: Automatic gallery presentation
Both galleries SHALL present images in the site’s existing visual language (responsive grid, lazy-loaded unwatermarked thumbnails, lightbox for full watermarked images) so adding folders does not require custom per-series layout code.

#### Scenario: Thumbnails load first
- **WHEN** a user opens a gallery page with images
- **THEN** list views load thumbnail images and full-size watermarked images load only when opened in the lightbox (or equivalent on-demand viewer)

#### Scenario: Narrow viewport remains usable
- **WHEN** the gallery is viewed at approximately 390 px width
- **THEN** the layout remains usable without horizontal page scroll caused by the gallery grid
