# Homepage-only signature and mobile correction — v4

Implemented from the client's correction: improve mobile, reserve the broad-photo-to-frame transition for Home, and give the other pages distinct motion. This supersedes the repeated inner-page hero documented in v3.

## What changed

- **Home:** desktop keeps its approved transition. Mobile and short windows use a dedicated title/photo panel that becomes inset while the photograph shifts slightly inside it. The real title-group height determines the photo boundary. The introduction and actions sit on their own ivory surface; the mobile white visual duplicate cannot paint them. No paragraph is split across image and paper. Mobile remains in native document flow.
- **Practice Areas:** an ivory editorial foreword leads into a horizontally revealed desk photograph and the live seven-practice reading index. It has no homepage scene or sticky introductory interval.
- **Layanan Strategis:** an ivory foreword leads into three city-image slices that move into alignment, followed by the reversible law/finance/management relationship. Text is separate from the imagery.
- **About:** the original portrait is a fixed-width photographic plate that settles beside the partner's full message, with a drawn caption rule. It no longer repeats the shrinking-frame mechanism.
- **Konsultasi:** retains its distinct guided process, selected-step navigation and reading rail. WhatsApp/email remain immediate, with no form or photographic introduction.

All source wording, seven practices, three strategic offerings, real portrait/logo, contact methods and routes remain. No new image generation, package, backend, model handoff or publication was introduced.

## Observed verification

[Motion/boundary results](build-evidence/distinct-motion-results.json) cover 20 forward/reverse Home states and 64 reading states at 1280×720, 430×718, 390×844 and 360×640. The 430×718 case adds a viewport close to the supplied mobile screenshot's proportions. Mobile introduction rectangles never intersected the photograph; the duplicate body remained hidden at all tested positions. The inner-page checker asserts that all four inner routes contain zero homepage scenes. Computed photo-reveal clipping and city-panel transforms are included in the record, rather than relying only on progress attributes.

All sampled reading states matched intended progress within tolerance, without horizontal overflow or JavaScript exceptions. Reduced motion settles the process to progress 1 with zero running animations. Direct arbitration entry still lands about 30 pixels from the top and marks the correct practice index entry. A separate blocked-responsive-image case verifies that the heading, ivory introduction and consultation route remain available when the architecture image fails.

[Site-wide regression results](build-evidence/results.json) show 35 route/viewport cases without overflow or runtime exceptions. The substantive inner-page copy comparison found no missing paragraphs; navigation/contact/Back/refresh checks pass. The synthetic local loading sample recorded LCP 1428 ms and layout shift 0 under the existing declared throttling conditions; this is not production field data. The production build passes with shared JavaScript 75.70 kB gzip and CSS 6.13 kB gzip.

## Inspect the compositions

| View | Evidence |
| --- | --- |
| Mobile Home, scene beginning | [430-pixel opening](build-evidence/home-mobile-v4-430-0.png) |
| Mobile Home, partway through scroll | [430-pixel midpoint](build-evidence/home-mobile-v4-430-0.5.png) |
| Practice editorial opening | [Desktop](build-evidence/practice-areas-1440.png) |
| Strategic reading introduction | [Phone](build-evidence/lain-lain-390.png) |
| City triptych entering view | [Phone](build-evidence/distinct-lain-lain-390.png) |

Captures are viewport states, not recordings; scene captures begin at the scene's document position and may omit the masthead above. Run the site to judge pacing. Reproduce motion checks with `node scripts/inner-spatial-check.mjs` against the production preview on port 4173; `node scripts/browser-check.mjs` checks the wider regression set.

Observed environment: isolated Chrome 156 on macOS with viewport emulation. Safari, physical iOS/Android devices, screen-reader use and true browser text enlargement remain unverified. No aesthetic approval or universal accessibility claim follows from these technical checks.
