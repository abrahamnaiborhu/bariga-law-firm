# About portrait revision

The client requested a transparent portrait background and a slightly more eccentric About composition. Implemented only on About; Home keeps its original photograph and exclusive scene behavior.

The opening now uses oversized offset “Tentang Kami” typography and a transparent portrait over a tilted navy arch, a fine orbital line and a Managing Partner badge. The decorative values repeat the existing Integritas/Strategi/Keadilan pillars. Phones place the cutout directly after the title, before the complete introduction. The partner's full message follows with an oversized quotation mark and a three-lens motif; the repeated second photograph and decorative desk banner were removed. The existing wording, credentials and routes remain.

The cutout is an AI-assisted background-removal edit using the supplied `papa_2.jpg`. It is not represented as a new documentary photograph or as a pixel-identical copy of the original. The untouched source remains in `creative/old_website/`; generation prompt and PNG outputs are preserved in `creative/about-portrait/`. Client review of portrait fidelity remains part of visual review.

The website uses `public/images/partner-cutout.webp`, 756×850 pixels, approximately 51 KB. Browser image encoding preserved alpha; the transparent-corner test returned alpha 0. The original generated PNG and resized PNG remain outside public delivery. No white backdrop is baked into the site asset.

Production build passes: shared JS 75.78 kB gzip, CSS 7.01 kB gzip. The [35-case Chrome regression report](build-evidence/results.json) shows no horizontal overflow or JavaScript exceptions. All substantive source paragraphs remain, and the portrait loads successfully on desktop and phone. Actual [desktop](build-evidence/about-us-1440.png) and [phone](build-evidence/about-us-390.png) captures were inspected; the phone ordering was refined after the first pass placed the image too low.

The arch and orbital line respond subtly to native reading progress; reduced motion uses settled geometry. The previous approved native-source fallback remains in effect. No package, model handoff, contact integration or deployment was introduced. Physical-device, Safari and screen-reader verification remain unclaimed.

## Current revision: motion, with the circle badge removed

The client clarified that “empty” meant missing motion and rejected the circular Managing Partner label. The earlier badge description above is superseded: the badge is removed entirely; the ordinary role caption remains.

About now has a coordinated finite entrance: opposite-direction title settling, the cutout rising into a fixed mask, a turning navy plate and a drawn orbit. The portrait sequence waits for the decoded image without blocking copy or actions. Afterwards, native reading progress changes the plate/orbit angles and the italic title's offset. The phone portrait stays clear of surrounding copy. Effects are cleaned up on departure, settle on reduced motion and do not loop continuously.

The production build passes at 76.45 kB shared JS gzip and 7.15 kB CSS gzip. [Actual timed observations](build-evidence/about-entrance-results.json) sample start, middle and settled states on desktop and phones, plus reverse-scroll geometry and cancellation when reduced motion is enabled. Settled screenshots: [desktop](build-evidence/about-animated-1440.png), [phone](build-evidence/about-animated-390.png). These are Chrome viewport-emulation observations, not physical-device or Safari certification. Client aesthetic judgment remains separate from passing runtime tests.
