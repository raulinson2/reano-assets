# Graph Report - reano-assets-work  (2026-07-23)

## Corpus Check
- 10 files · ~59,941 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 107 nodes · 182 edges · 13 communities (9 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `81adade6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- aerolineas-fix.js
- reano-ui.js
- manifest.json
- paquetes-internacionales.js
- reano-shell.js
- reano-track.js
- aerolineas-update.js
- README - Reaño Assets Collection
- paquetes-showcase.js
- Athens Acropolis - International Destination Photo
- Los Roques National Park Beach - Destination Photo
- Yummy Corporate Brand Logo
- Bogotá Urban Skyline - International Destination Photo

## God Nodes (most connected - your core abstractions)
1. `run()` - 14 edges
2. `apply()` - 9 edges
3. `moveCard()` - 7 edges
4. `ensureBluestar()` - 7 edges
5. `styleChip()` - 6 edges
6. `mount()` - 6 edges
7. `buildHeader()` - 6 edges
8. `leafs()` - 5 edges
9. `inject()` - 5 edges
10. `buildSection()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `README - Reaño Assets Collection` --references--> `Canaima National Park Waterfall - Destination Photo`  [EXTRACTED]
  README.md → canaima.jpg
- `README - Reaño Assets Collection` --references--> `Reaño Travels Logo - Original Full Version`  [EXTRACTED]
  README.md → logo-reano-original.png
- `Athens Acropolis - International Destination Photo` --conceptually_related_to--> `Rome Colosseum - International Destination Photo`  [INFERRED]
  intl-acropolis.jpg → intl-colosseum.jpg
- `Reaño Travels Logo - Original Full Version` --conceptually_related_to--> `Reaño Travels Logo - White Variant`  [INFERRED]
  logo-reano-original.png → logo-reano-blanco.png
- `Los Roques National Park Beach - Destination Photo` --conceptually_related_to--> `Margarita Island Beach - Destination Photo`  [INFERRED]
  losroques.jpg → margarita.jpg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Travel Destination Photography Collection** — canaima, intl_acropolis, intl_bogota, intl_colosseum, losroques, margarita [INFERRED 0.85]
- **Reaño Travels Brand Identity Assets** — logo_reano_original, logo_reano_blanco [EXTRACTED 0.95]

## Communities (13 total, 4 thin omitted)

### Community 0 - "aerolineas-fix.js"
Cohesion: 0.29
Nodes (17): apply(), cardByName(), chipOf(), ensureBluestar(), fixCounts(), fixDate(), fixModal(), gridOf() (+9 more)

### Community 1 - "reano-ui.js"
Cohesion: 0.22
Nodes (17): aliadosYummy(), buildEmptyCart(), conciertosHero(), conciertosNoche(), crmEnviar(), fiftyCard(), hideLegacyShell(), injectCSS() (+9 more)

### Community 2 - "manifest.json"
Cohesion: 0.15
Nodes (12): background_color, description, display, icons, lang, name, orientation, scope (+4 more)

### Community 3 - "paquetes-internacionales.js"
Cohesion: 0.30
Nodes (13): buildSection(), css(), esc(), hashScroll(), homeCard(), killNavLink(), mount(), onTienda() (+5 more)

### Community 4 - "reano-shell.js"
Cohesion: 0.38
Nodes (11): activeFor(), applyTheme(), boot(), buildFooter(), buildHeader(), cartCount(), isDark(), path() (+3 more)

### Community 5 - "reano-track.js"
Cohesion: 0.54
Nodes (7): eid(), money(), onAdd(), onCheckout(), readProduct(), send(), txt()

### Community 6 - "aerolineas-update.js"
Cohesion: 0.52
Nodes (6): build(), bumpDate(), chev(), inject(), onPage(), wire()

### Community 7 - "README - Reaño Assets Collection"
Cohesion: 0.50
Nodes (4): Canaima National Park Waterfall - Destination Photo, Reaño Travels Logo - White Variant, Reaño Travels Logo - Original Full Version, README - Reaño Assets Collection

### Community 8 - "paquetes-showcase.js"
Cohesion: 0.60
Nodes (5): dec(), inject(), listo(), onTienda(), wire()

## Knowledge Gaps
- **21 isolated node(s):** `name`, `short_name`, `description`, `lang`, `start_url` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `name`, `short_name`, `description` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._