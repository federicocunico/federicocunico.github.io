# Spec Delta

## Purpose

Defines the local ingest workspace and processing pipeline that turns photography and astrophotography source images into committed, web-ready WebP assets with full-size watermarks and a generated media catalog.

## ADDED Requirements

### Requirement: Separated ingest trees
The repository SHALL provide an `ingest/` workspace with distinct `photography/` and `astro/` trees, plus a tracked `ingest/README.md` that documents folder layout, supported formats, watermark behavior, and how to run ingest.

#### Scenario: Documented layout is present
- **WHEN** a contributor opens `ingest/README.md`
- **THEN** the document explains the photography vs astro folder trees, supported input formats, and the command used to process images

#### Scenario: Photography and astro stay separate
- **WHEN** source images are placed under `ingest/photography/<series>/` or `ingest/astro/<group>/`
- **THEN** processing routes photography outputs to the photography public tree and astro outputs to the astro public tree without mixing them

### Requirement: Ingest converts sources to WebP
Running the ingest command SHALL convert supported image formats (at least HEIF, HEIC, PNG, JPEG, WebP, and TIFF) into WebP files suitable for the website (good visual quality and compressed size).

#### Scenario: Mixed formats in a series folder
- **WHEN** a photography series folder contains HEIC, JPEG, and PNG sources and ingest is run
- **THEN** each convertible image produces a corresponding WebP under the photography full-image output location for that series

#### Scenario: Unsupported files are skipped safely
- **WHEN** a non-image or unsupported file is present in an ingest folder
- **THEN** ingest skips that file, continues processing other files, and reports the skip without failing the whole run for that reason alone

### Requirement: Watermark on full-size images only
Every ingested full-size output image SHALL include a bottom filigree/signature watermark reading `F.Cunico`. Thumbnail derivatives MUST NOT receive this watermark.

#### Scenario: Full image carries signature
- **WHEN** ingest writes a full-size WebP for an image
- **THEN** the output includes a visible bottom watermark with the text `F.Cunico`

#### Scenario: Thumbnails stay clean
- **WHEN** thumbnails are generated from ingested full images
- **THEN** those thumbnails do not include the `F.Cunico` watermark

### Requirement: Incremental and additive processing
Ingest SHALL process new or updated source files into the existing output collection without requiring a wipe of unrelated series or groups. Adding a new folder under the matching ingest tree SHALL add that series or group to the generated catalog on the next successful run.

#### Scenario: New photography series appears
- **WHEN** a new folder `ingest/photography/<series-id>/` containing images is added and ingest is run
- **THEN** the generated catalog includes that series and its processed images alongside previously ingested series

#### Scenario: New astro group appears
- **WHEN** a new folder `ingest/astro/<group-id>/` containing images is added and ingest is run
- **THEN** the generated catalog includes that group and its processed images alongside previously ingested astro groups

#### Scenario: Unchanged sources are not needlessly rewritten
- **WHEN** ingest is run again with no source changes
- **THEN** outputs that are already up to date relative to their sources are left unchanged

### Requirement: Git tracks outputs, not ingest binaries
Git SHALL track the ingest folder structure markers and `ingest/README.md`, and SHALL ignore ingest source image contents. Processed full-size WebPs and the generated media catalog SHALL be intended for version control so the GitHub Pages build can use them without local originals.

#### Scenario: Source images stay untracked
- **WHEN** a contributor places large originals only under `ingest/`
- **THEN** those source files are ignored by git while `ingest/README.md` remains trackable

#### Scenario: Site build uses committed assets
- **WHEN** CI builds the site without access to local `ingest/` binaries
- **THEN** the build can still use previously committed processed full images and the generated catalog

### Requirement: Ingest entrypoint
The project SHALL expose ingest via `make ingest` and an equivalent npm script that performs conversion, watermarking, output writing, and catalog generation.

#### Scenario: Make target runs ingest
- **WHEN** a developer runs `make ingest` after placing sources in the ingest trees
- **THEN** convertible images are processed and the media catalog is regenerated from the current ingest folders
