# Homepage composition study v2

The client selected the spatial scroll transformation after rejecting v1's entrance effects. This is the approved opening-to-practice prototype; the other pages have not been reinterpreted in this direction.

## Inspect the experience

Open the homepage locally and scroll through the first scene, then reverse direction. Architecture should remain recognizable as its frame contracts, revealing ivory around the existing copy. The next substantive section is Practice Areas, without an intervening decorative banner. Compare whether the changing composition feels deliberate and coherent with the boutique identity. Technical checks cannot answer that aesthetic question for the client.

Desktop uses one bounded sticky stage and native scroll. Phones and short windows use a vertical crop change in normal flow. There is no scroll interception, intro timer or navigation delay. The introduction and contact actions remain present. A real semantic headline and real links sit beneath an inert, accessibility-hidden white visual copy clipped to the photograph. Keyboard focus dims the image and exposes the real controls and their focus outlines. Reduced motion presents the settled composition without the sticky interval.

## Representative states

| View | Opening | Midpoint | Settled / onward |
| --- | --- | --- | --- |
| Compact laptop 1280×720 | [View](build-evidence/scene-1280-0.png) | [View](build-evidence/scene-1280-0.5.png) | [View](build-evidence/scene-1280-1.png) |
| Desktop 1440×900 | [View](build-evidence/scene-1440-0.png) | [View](build-evidence/scene-1440-0.5.png) | [View](build-evidence/scene-1440-1.png) |
| Phone 390×844 | [View](build-evidence/scene-390-0.png) | [View](build-evidence/scene-390-0.5.png) | [View](build-evidence/scene-390-1.png) |

Phone captures include the viewport's actual movement down the page; the settled frame may already be above the viewport. Static captures describe composition. [Sampled forward/reverse geometry](build-evidence/scene-results.json) records actual scroll-driven progression. The test traverses 0 → 0.5 → 1 → 0.5 → 0 at five viewport sizes, including 1024×600 and 360×640. All 25 states matched requested progress within 0.001, had no horizontal document overflow and contained one semantic h1. Reduced motion settled at progress 1 with relative positioning and zero running animations; direct entry to Practice Areas landed about 30 pixels from the viewport top. No JavaScript exceptions were observed in isolated Chrome 156 on macOS.

The site-wide 35-case layout/navigation and substantive-copy checks passed on the revised scene, including contact URLs, menu, Back, refresh, blocked-image access and source paragraphs. The synthetic loading sample recorded LCP 1424 ms and layout shift 0 under the previously documented cold-cache/throttling conditions. The last phone refinement equalized opposing offsets to keep the scene's document height stable during scroll. Production build passes with shared JS 75.51 kB gzip and CSS 4.87 kB gzip.

## Limits and scope

No physical-device, Safari or screen-reader verification is claimed. No visitor comprehension result or creative approval is inferred from passing tests. The architecture remains conceptual decorative imagery; original content, logo, portrait, routes and WhatsApp/email scope are preserved. Existing inner-page motion awaits a decision based on this homepage study. No new dependency, jcodemunch activation, model handoff or publication occurred. The authorized repository-bounded native-source fallback remains in effect.
