# Changelog

## 1.0.3

### Patch Changes

- 7abd78e: Uses Quartz's own `preact` instead of bundling a second copy (`noExternal` in the build overrode the externals). Components now share one Preact instance with Quartz and other plugins, so hooks and context work across them, and the bundle is smaller.

## 1.0.2

### Patch Changes

- b8fa846: Bundles `@quartz-community/utils` 1.1.0: a short wikilink to an Obsidian folder note (`[[Topic]]` for `Topic/Topic.md`) reaches the folder page, and anchors to headings use the same slug as heading ids. `github-slugger` is no longer a dependency of this plugin.

## 1.0.1

### Patch Changes

- 2efba1a: The manifest declares what the plugin needs (`quartz.capabilities`): links from crawl-links (required, or the backlinks list is always empty) and parsed frontmatter (optional, for backlink titles). Quartz 5.1+ reports a missing provider at build time instead of rendering an empty list; older versions ignore the field.

## 1.0.0

### Major Changes

- Stable 1.0 release. All `@quartz-community/*` dependencies now use `^1.0.0` ranges.

  Pre-1.0 caret ranges pinned the minor version (`^0.2.1` means `>=0.2.1 <0.3.0`), so
  published fixes to shared packages could never be resolved by dependents. Moving the
  ecosystem to 1.0 makes caret ranges behave conventionally.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Respect the `file.data.unlisted` convention. Pages marked `unlisted` are never shown as backlink sources on other pages. The backlinks list on an unlisted page itself is still rendered normally so users who reached the page by direct URL can see its incoming references.
- Exported `selectBacklinkSources` helper and `BacklinkCandidate` type for testing and reuse.
- Unit tests for `selectBacklinkSources` covering the unlisted-filter behavior.

- Initial Quartz community plugin template.
