---
"@quartz-community/backlinks": patch
---

The manifest declares what the plugin needs (`quartz.capabilities`): links from crawl-links (required, or the backlinks list is always empty) and parsed frontmatter (optional, for backlink titles). Quartz 5.1+ reports a missing provider at build time instead of rendering an empty list; older versions ignore the field.
