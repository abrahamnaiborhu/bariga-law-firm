# Bariga Law Firm — rechecked source and experience review

Reviewed 2026-10-22. This revision supersedes the initial source-only review.

## Corrections to the first review

The live site is accessible. Direct requests returned HTTP 200 for all four main pages, which subsequently rendered in an isolated Chrome session. The earlier web-tool failure and restricted-network DNS failure reflected those access paths, not a demonstrated public outage.

The first review also conflated text embedded in HTML with content visible to visitors. The lorem ipsum, philosophy template, four unfamiliar lawyer-name entries, family-law template headline and About-page contact form are in hidden sections. They were absent from rendered page text at both tested desktop and phone widths. They should be excluded from a rebuild, but are **not established public-facing content errors**. The unfamiliar names were not independently identified; calling them unrelated lawyers was too strong.

## Evidence and limits

| Material | Review performed | Limits |
| --- | --- | --- |
| Three saved HTML pages in `creative/old_website` | Extracted copy, navigation, images, forms and hidden sections | Browser saves include logged-in WordPress interface material |
| [Home](https://barigalawfirm.com/) | HTTP 200, rendered page, links, imagery, fields, screenshots | No inquiry submission |
| [About](https://barigalawfirm.com/about-us/) | Same; checked visible versus hidden content | Firm claims and credentials not independently certified |
| [Practice Areas](https://barigalawfirm.com/practice-areas/) | Same; all seven practice descriptions | No legal assessment of descriptions |
| [Layanan Strategis](https://barigalawfirm.com/lain-lain/) | Same; diagram, three offerings, consultation form | No recipient or email-delivery test |
| Supplied logo, portraits and strategy diagram | Visual inspection and basic file inventory | Final selection and publication permission remain part of content approval |
| Browser evidence | Chrome 156 on macOS; all four pages at 1440×1000 and 390×844; homepage also at 1280×720 | Headless browser/viewport emulation, not real phone hardware or Safari |

All three saved pages' extracted text matched their live counterparts after excluding the saved WordPress admin interface. No top-level saved homepage exists, so the live homepage supplied important additional context.

Discovery preflight reviewed all eight checks. No GSAP work, dependency changes, application edits, production-site edits or deployment occurred. Native HTML reads served content/reference inspection, not repository symbol/dependency analysis. Bundled vendor scripts were not audited. Any subsequent jcodemunch source exploration for this law-firm project must first establish applicable non-commercial use or commercial licensing; no new index was activated for this review.

## What the site communicates

Bariga presents itself as serving corporations and individuals, with a marked business emphasis. The homepage highlights civil/business law, insolvency and PKPU, arbitration, and banking/finance. The partnership section connects legal advice to business strategy. The managing partner's message adds financial feasibility and management judgment to legal compliance.

The strategic-services page extends the offer into business-process training, financial restructuring and compliance training. A visitor facing a debt, contract or governance problem may need someone who understands the commercial decision alongside its legal consequences. That is a useful interpretation of the site's own positioning, not evidence of specific outcomes or track record.

**Recommended framing for the evolving brief:** a strategic legal practice that considers the legal, financial and management dimensions of a client's problem. Business decision-makers appear to be the strongest primary audience based on existing editorial emphasis. Individual clients are explicitly served and should retain a clear route to relevant help. Final audience priority remains a client decision.

## Page-by-page baseline

| Page | Visible sequence | Useful material | Development opportunity |
| --- | --- | --- | --- |
| Home | Values/general introduction → four business practices → strategic partnership and partner portrait → three consultation steps → form | Existing business emphasis, personal introduction, explanation of contact process | Specific opening proposition; meaningful primary-button destinations; topic-specific service links |
| About | Firm purpose → partner portrait/message → business-strategy explanation → footer | Clearest statement of integrated approach and a real human point of contact | An approved professional biography and relevant experience to substantiate the philosophy |
| Practice Areas | Introduction → seven descriptions → strategic-services explanation → footer | Service breadth and useful paragraph-length descriptions | Help visitors connect their problem to a service and then consultation |
| Layanan Strategis | Three-domain diagram/introduction → three offerings → form/contact details → footer | Most direct expression of the legal/financial/management relationship | Readable phone diagram, clear relationship to legal services, consistent naming |

The seven practices are civil/business; insolvency and PKPU; general/business criminal; arbitration and dispute resolution; family/inheritance; banking/finance; technology/data protection. The three strategic offerings are business-process training; finance/restructuring; law/compliance training.

The consultation sequence already sets useful expectations: arrange a meeting, analyze the situation, discuss initial strategic options. Preserve this content subject to confirming the actual inquiry process.

The current-site profile names Mesa Indra Naiborhu, S.P., S.H., M.H., CPM. as Managing Partner. The supplied/public contact details are +62 812-9579-8826, mesa.naiborhu@barigalawfirm.com, and Jl. Mayjend. Sutoyo No. 21, Cililitan, Kramatjati, East Jakarta 13640. Treat these as source-backed draft facts for final publication confirmation.

## Visual identity and assets

The site combines a blue BLF/scales mark, white backgrounds, teal gradients and circles, Cinzel Decorative headings, Alegreya body copy, classical court imagery and a Lady Justice cutout. This establishes legal symbolism, but much of it explains the profession rather than Bariga's particular approach. The real portrait and integrated-services concept are more specific to this firm.

The ornate type is more effective in short headings. In the narrow lower About panel, long headings wrap into many short lines and compete with the explanation. Consider the partner portrait as a central trust asset alongside a more substantiated biography. These are design judgments from rendered pages, not visitor-tested findings.

| Asset | Observed details | Proposed role, pending creative approval |
| --- | --- | --- |
| `logo_bargia.png` | Blue initials/scales, 526×323; identical hash to archived header logo | Existing identity candidate; retention/redesign undecided |
| `papa_1.jpg` | Standing portrait, 3408×4944, about 3.96 MB | Profile/editorial treatment with room for alternate crops |
| `papa_2.jpg` | Closer portrait, 3408×3827, about 1.31 MB | More personal introduction with deliberate phone crop |
| `layanan_strategis.png` | 1000×1000 raster diagram, expressing the same relationship rendered on the strategic page | Reinterpret with readable text and responsive geometry |

Original portraits are source assets, not intended delivery sizes; prepare appropriate web derivatives during implementation. Supplied files do not approve a particular crop or design.

Header/footer also link to Google Scholar and ORCID. These may inform an approved professional profile, but destination content was not reviewed and the icons do not certify specific credentials.

## Concrete findings

| Finding | Evidence | Visitor consequence / proposed response |
| --- | --- | --- |
| Main homepage buttons have placeholder destinations | “Solusi Hukum Anda” and “Pelajari Pendekatan Kami” both have `href="#"` | Give each a useful consultation, service or approach destination |
| Service links discard selected topic | All four homepage practice links reach the same unanchored practice page | Carry the topic into a relevant section/detail view |
| The differentiator appears after a broad opening | Values headline/general introduction precede integrated approach | Test an opening that explains the value of combined legal and commercial judgment |
| Pale introductory copy | Hero paragraph computes to `rgb(153,153,153)` against white, about 2.85:1 contrast | Strengthen reading contrast |
| Short laptop window delays the primary action | At 1280×720 the 70 px heading/introduction fill the opening viewport; primary button is below it, although header contact icon is present | Compose deliberately for shorter windows |
| Phone opening is vertically long | At 390×844 body copy stays 22 px with 39.6 px line height; main button sits near the bottom and illustration follows | Balance message length, type hierarchy and spacing for faster orientation |
| Long explanation is squeezed beside imagery | Lower About panel alternates narrow text columns with court photographs | Give substantive copy a comfortable measure and hierarchy |
| Naming/language varies | Header “Layanan Strategis,” footer “Lain-lain,” English page heading and “CONTACT ME” elsewhere | Choose consistent visitor-facing terminology and language policy |
| Unfinished footer elements exist in source | Privacy/Terms links point to `#`, but are not visible in tested layouts | Decide real policy content/placement before release; do not report as visible broken policy links |
| Decorative asset request fails | HTTP 404 for Elementor `mask-shapes/custom.svg` on all four pages | Avoid carrying missing dependency into rebuild; primary observed imagery rendered |
| Informative image alternatives need consideration | Image elements, including partner image, have empty alt attributes | Distinguish informative imagery from decoration and provide appropriate alternatives |

The contrast number is calculated from the measured color against white; this is not a full accessibility audit. No field performance score, conversion claim or visitor comprehension rate was measured.

## Runtime results and qualifications

- All four pages rendered at both tested widths without document-level horizontal overflow.
- Phone menu toggle opened and revealed all four main destinations. Keyboard Tab reached it and Enter opened it. Escape left it expanded in the focused check; the visible toggle can close it. This is an observed behavior, not a claim that modal-menu requirements necessarily apply.
- Inquiry forms are visible on Home and Layanan Strategis. About's form is hidden. Submission, recipient routing, spam controls, error recovery and WhatsApp handoff remain untested.
- The review listener captured no uncaught JavaScript exceptions. The shared missing SVG generated the recorded network failure; this does not establish a wholly clean console.
- Initial fast-scroll captures caught staggered entrances mid-animation, temporarily showing faded/displaced cards. Repeating after a settling interval restored the grids. Those early frames do not prove persistent overlap. Retained main screenshots are the settled captures.
- Existing motion mainly supplies staggered entrances and moving decorative shapes. It adds activity but does little to explain the three-domain relationship. This is creative judgment, not a performance measurement.
- Reduced motion, screen readers, full keyboard journeys, real touch hardware, Safari and low-powered devices remain untested. No inquiry or contact message was sent.

## Implications for the new website

Carry forward the integrated proposition, approved service content, partner identity/usable portraits, consultation sequence, contact information and disclaimer. Develop a substantiated professional profile rather than inventing case results, client logos, testimonials, team members or experience metrics.

Improve content hierarchy, meaningful contact paths, language consistency and phone/short-laptop composition. Existing palette, type, stock imagery, page order and effects are candidates to retain or change, not mandatory requirements. React + Vite remains the agreed stack.

A content-specific motion opportunity is to show how legal, financial and management perspectives combine around one client decision. An alternative is a portrait-led editorial experience connecting a service to the partner's approach and consultation process. Both are proposals for later exploration, not approved treatments or completed prototypes. Static text must convey the same substance.

Next, establish the intended degree of redesign and any fixed identity requirements. Final audience emphasis, copy, language, visual direction and motion remain open. No production redesign has been approved or implemented.

## Review evidence

The local capture set is about 12 MB. Full-page captures support hierarchy review; viewport captures better represent first arrival. They are live-site snapshots at review time.

- [Desktop opening](review-evidence/home-desktop-viewport.png) and [whole homepage](review-evidence/home-desktop.png).
- [Compact laptop opening](review-evidence/home-compact-laptop-first-load.png).
- [Phone opening](review-evidence/home-phone-first-load.png) and [open navigation](review-evidence/home-phone-menu.png).
- [About desktop](review-evidence/about-desktop.png) and [phone](review-evidence/about-phone.png).
- [Practice Areas desktop](review-evidence/practice-desktop.png) and [phone](review-evidence/practice-phone.png).
- [Strategic services desktop](review-evidence/strategic-desktop.png) and [phone](review-evidence/strategic-phone.png).
- [Structured observations](review-evidence/observations.json) and [focused styling/keyboard checks](review-evidence/focused-checks.json).
