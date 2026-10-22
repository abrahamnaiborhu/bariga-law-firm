# Inner-page spatial motion — implemented

Authorized by the client's request to extend the liked homepage animation/taste to other pages. This completes the scoped four-page extension in `MOTION_PLAN.md` v3. The approved homepage retains its behavior.

## Page-specific direction

| Page | Implemented spatial relationship |
| --- | --- |
| About Us | The original portrait remains beside the full partner message on desktop; its frame narrows with reading progress. A deliberate reading measure gives the portrait/message passage room. Phone/short-window layouts keep both in document flow. |
| Practice Areas | The desk image changes from a broad opening into a framed image, then releases into all seven practices. A desktop index follows the section being read; its native links land directly on each service. Phone navigation remains in normal flow. |
| Layanan Strategis | The city image uses the same opening-to-frame mechanism. The three competencies converge and their connector paths draw according to native reading progress; reverse scroll reverses the relationship. All three offerings follow. |
| Konsultasi | WhatsApp and email remain immediately accessible. A desktop process guide stays beside the original three steps, highlights the current step and connects them with a scroll-linked rail. Phone/short-window layouts use an in-flow guide. |

Earlier timed entrances were retired. The shared `CompositionScene` generalizes the approved homepage scene; `useReadingProgress` and `useReadingSection` own reading effects, passive scroll listeners, bounded animation-frame updates, preference handling and cleanup. No new animation package, backend, model configuration or contact method is introduced. Reduced motion settles geometry and removes sticky reading behavior. Source copy, original portrait/logo and existing URLs remain intact.

## Observed checks

- Production build passes: shared JavaScript 75.53 kB gzip, CSS 5.57 kB gzip.
- [Inner-page runtime results](build-evidence/inner-spatial-results.json): 20 forward/reverse photographic scene states and 24 forward/reverse reading states at 1280×720 and 390×844. Progress matches requested positions within the declared tolerance, without horizontal overflow or JavaScript exceptions.
- Reduced motion settles the reading passage to progress 1 with zero running animations. Direct `/practice-areas/#arbitrase` entry lands about 30 pixels from the top and marks the correct index entry. The process guide selects step 2 when entering that step.
- [Site-wide regression results](build-evidence/results.json): 35 route/viewport cases, all seven practice rows and all three strategic rows, source paragraph comparisons, menu/Escape, skip link, Back/refresh, malformed fragments, blocked-image access and direct WhatsApp/email destinations pass. No substantive inner-page copy is missing after whitespace normalization.
- Browser evidence is isolated Chrome 156 on macOS with viewport emulation. It does not establish physical-device performance, Safari behavior, screen-reader use or client aesthetic approval.

## Review the running pages

Review forward and reverse scrolling on each page. Inspect whether the relationships stay understandable while the content moves, whether reading feels comfortable and whether the retained homepage rhythm carries through.

Viewport captures: [Practice opening](build-evidence/practice-areas-1440.png), [About passage](build-evidence/reading-about-us-1280.png), [Strategic passage](build-evidence/reading-lain-lain-1280.png), [phone process](build-evidence/reading-konsultasi-390.png). Reading-passage captures can show intermediate scroll states; they are not a recording or substitute for the runtime sequence.

No deployment occurred. The review build retains `noindex, nofollow`. Actual iOS/Android hardware, Safari/Firefox/Edge, screen-reader and true browser text-enlargement verification remain pending. The existing repository-bounded native exploration fallback continues; no jcodemunch activation occurred.
