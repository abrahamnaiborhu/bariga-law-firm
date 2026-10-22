# Bariga build review — 2026-10-22

Implemented locally from build plan v1 with the user's approved native-source fallback. The five-page React + Vite website carries the preferred intimate editorial boutique direction into working pages. No deployment was performed.

## Delivered

- Home, About Us, Practice Areas, Layanan Strategis and Konsultasi as real HTML entries sharing React components. Native links, direct entry, refresh and browser history require no routing dependency.
- Original `/about-us/`, `/practice-areas/` and `/lain-lain/` URLs retained after comparing reviewed live navigation; `/konsultasi/` is new.
- All seven full practice descriptions, all three strategic offerings, full partner message and source contact/disclaimer content. Only the obsolete form instruction is intentionally changed to WhatsApp/email. New small interface labels support navigation.
- Warm ivory/navy editorial styling, responsive service rows, vertical phone strategy diagram and disclosure navigation with Escape/focus handling. Native scrolling, no loader or blocking introduction.
- Original logo and original partner photo, resized/compressed without AI regeneration. Decorative conceptual architecture on Home only. Georgia/system serif requires no remote font requests.
- Direct `https://wa.me/6281295798826` and `mailto:mesa.naiborhu@barigalawfirm.com` links. No form/backend, data collection or automatic message sending.

## Observed verification

`npm run build` passes and emits five HTML entries. Shared JavaScript is 73.78 kB gzip and CSS 3.57 kB gzip. Optimized opening image is about 193 KiB and partner image about 108 KiB.

[Browser results](build-evidence/results.json) come from the built site at `http://127.0.0.1:4173/`, using isolated headless Chrome 156.0.8078.47 on macOS. Five pages at seven widths (320, 360, 390, 768, 1024, 1280, 1440) showed no document overflow or placeholder `#` links. The compact-laptop check uses 1280×720. Other heights are recorded in the checker. Viewport emulation is not physical-device evidence.

Observed: phone menu opening, Escape closing and focus return; first keyboard Tab reaches the skip link; direct practice anchor, onward consultation, Back and refresh restore the intended section; malformed fragment does not crash the page; reduced-motion removes decorative transitions; blocking images leaves heading/actions usable. No JavaScript exceptions were observed. Expected blocked-image network events are recorded separately. Lazy offscreen images can remain pending during opening checks.

All substantive inner-page source paragraphs (blocks longer than 100 characters) were compared with rendered main content after whitespace normalization; none were missing. Service inventory includes seven practice rows and three strategic rows. This check does not substitute for client editorial review of short labels or every punctuation mark.

A single synthetic cold-cache homepage sample at 390×844, 150 ms added latency, 200,000 bytes/s download and 4× CPU slowdown recorded text LCP at 748 ms and layout shift 0. Initial resource transfer excluding HTML was 380,366 bytes. These local measurements meet proposed budgets in that run; they are not production field data, device benchmarks or a guarantee across networks. Root font-size enlargement produced no overflow but does not certify browser text zoom or assistive-technology use.

## Corrections made during verification

Direct fragment entry originally happened before React mounted its section. Fragment restoration now runs after DOM creation and preserves native history restoration. A 320-pixel strategic heading overflow was fixed with a responsive type scale. Initial focus was adjusted to preserve native keyboard entry through the skip link. Email wrapping now prefers a break after `@`.

## View evidence

| Page | Desktop | Phone |
| --- | --- | --- |
| Home | [Screenshot](build-evidence/home-1440.png) | [Screenshot](build-evidence/home-390.png) |
| About Us | [Screenshot](build-evidence/about-us-1440.png) | [Screenshot](build-evidence/about-us-390.png) |
| Practice Areas | [Screenshot](build-evidence/practice-areas-1440.png) | [Screenshot](build-evidence/practice-areas-390.png) |
| Layanan Strategis | [Screenshot](build-evidence/lain-lain-1440.png) | [Screenshot](build-evidence/lain-lain-390.png) |
| Konsultasi | [Screenshot](build-evidence/konsultasi-1440.png) | [Screenshot](build-evidence/konsultasi-390.png) |

Screenshots show viewport compositions, not complete scrolling pages. Reproduce browser checks with `node scripts/browser-check.mjs` while `npm run preview` runs at port 4173. On systems without the macOS Chrome path, set `CHROME_BIN` to the browser executable. The checker launches an isolated temporary profile and writes local evidence.

## Remaining limits

Safari, Firefox, Edge, iOS/Android hardware, screen-reader use and true browser text enlargement remain unverified. No universal accessibility or browser-support certification is claimed. Final client design/copy review, hosting directory-index behavior and public-release preparation remain. The review build retains `noindex, nofollow`. Host the built `dist/` at the domain root with directory-index support; there is no automatic deployment configuration.

Source review covered the changed React entry/components/content, CSS, HTML entries and Vite configuration via the authorized native fallback. No repository exists in this folder, so no commit or merge was made. No jcodemunch activation, new package dependency or model handoff occurred.


## Motion and imagery pass — supersedes the static baseline above

The user approved the proposed motion/image revision with “go” and “continue.” Implemented `MOTION_PLAN.md` using native Web Animations and IntersectionObserver: coordinated headline lines, architectural image settling, image-frame reveals, service entrances and a three-perspective strategy sequence. Phone strategy uses a drawn vertical spine; desktop paths converge toward the shared result. All effects are finite and progressively enhanced. Observers/listeners/animations have teardown; preference changes cancel active motion. Navigation and copy remain intact.

Two additional generated editorial images are used as decorative atmosphere: desk detail on Home/About/Practice, city detail on Strategic. They do not depict actual firm premises. Original PNGs and native built-in generation prompts are preserved in `creative/motion-assets/`. Optimized responsive JPEGs and a resized original logo reduce transfer. The real partner photo is unchanged in substance.

Production build passes: JavaScript 74.87 kB gzip, CSS 4.03 kB gzip. All 35 responsive cases and source paragraph comparisons pass again, with no JavaScript errors. Menu, skip link, direct anchors, refresh, Back, failed-image access and reduced-motion checks continue to pass.

[Temporal motion observations](build-evidence/motion-results.json) sample actual running effects at 390×844 and 1280×720: the headline begins with four active animations and settles with none; strategy strokes progress from dash offset 1 through about 0.3 to 0, and the shared result progresses from opacity 0.2 to 1. Both sequences have zero active animations when settled. Enabling reduced motion during active motion cancels everything immediately. No JavaScript errors were observed. These samples establish actual progression and completion, not a universal smoothness or physical-device claim.

[Phone strategy state](build-evidence/strategy-motion-390.png) and [compact-laptop state](build-evidence/strategy-motion-1280.png) show the final responsive compositions. Routine page screenshots may capture intermediate entrance frames.

A loading regression was investigated rather than waived: the broader interaction suite's final loading sample recorded 4.18 s. A separate fresh-browser cold-entry test, isolated from prior navigation/preferences/test mutations, recorded initial text at 804 ms and final image LCP at 1804 ms, with scroll position 0. [Detailed entries and resource timing](build-evidence/loading-detail.json) identify the actual painted elements. Conditions: 390×844, 150 ms latency, 200,000 bytes/s download, 4× CPU slowdown, cache disabled. The interaction-suite sample is retained as evidence rather than overwritten; its same-URL/test-state contamination is a measurement limitation. Future runs now navigate through a blank document before measuring. Neither run is field performance data. Real-device/Safari verification remains pending.

Final visual review also caught incomplete-looking connector strokes caused by non-scaling SVG dashes. Settled strokes now use solid paths; dash drawing is limited to the active animation. The production build and temporal checks were repeated for this correction.
