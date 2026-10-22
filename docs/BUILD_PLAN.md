# Bariga website — build plan v1

Status: implemented locally after the client approved building with native file reads. See BUILD_REVIEW.md for evidence and remaining limits. React + Vite, original logo and most source wording are confirmed. No publication is included.

## Visitor experience and visual continuity

Build a contemporary specialist boutique website: warm ivory reading surfaces, dark navy text, restrained blue accents, expressive serif headings and fine rules. Use the v3 homepage and inner-page studies as composition references. Select actual licensed typefaces during implementation; generated raster letterforms are not a font specification. Use original logo and partner photo directly; conceptual architecture belongs on Home only.

Home introduces relevance, Practice Areas explains services, About introduces the partner and approach, Layanan Strategis explains complementary consulting, and Konsultasi makes direct contact clear. Shared masthead, current-page indication, footer and contact access connect all five. Keep English/Indonesian source wording rather than translating incidentally.

## Routes and content ownership

| Destination | Proposed route | Content and connections |
| --- | --- | --- |
| Home | `/` | Existing opening, four featured practices, strategic-partner introduction, consultation invitation; each practice links to its exact section |
| About Us | `/about-us/` | Full firm introduction, original portrait, full partner message/name/credentials, three-lens explanation, onward strategic and contact links |
| Practice Areas | `/practice-areas/` | Full intro and all seven descriptions; stable section anchors; each offers consultation |
| Layanan Strategis | `/layanan-strategis/` | Full intro, exact law/finance/management labels and all three offerings; consultation links |
| Konsultasi | `/konsultasi/` | Existing invitation, prominent WhatsApp/email, full three-step process, office address and disclaimer |

Proposed slugs require comparison with the existing public URLs before routing is finalized. Preserve existing paths or add explicit redirects at the selected hosting layer; do not assume these proposed English paths already exist. Refresh/direct entry must work on the deployed host.

Use `creative/directions/boutique-v3/inner-pages/content-baseline.json` and the reviewed old-site content as copy sources. Record every departure in the content map. The obsolete contact-form sentence becomes “WhatsApp atau email”; remaining process text stays intact. Phone mockup excerpts do not remove any services or About content.

## Implementation boundaries

Keep React + Vite. Use shared header/navigation, footer, contact actions, page title and service-section components, with page-specific compositions. Store service and contact content once in a local content module; no CMS, API, database or inquiry backend. Resolve source structure before choosing precise file edits. A small routing dependency may be justified for browser history, focus and direct entry; inspect the current project and current official documentation before selecting it. No state library is needed for static content and menu state.

Direct contact targets: `https://wa.me/6281295798826` and `mailto:mesa.naiborhu@barigalawfirm.com`. Links open the visitor's chosen application; they do not send a message automatically. The first version has no form, scheduling widget or automatic topic tracking.

## Responsive and interaction treatment

On desktop, preserve generous margins and asymmetric editorial compositions. About pairs portrait/message; Practice uses readable service rows; Strategic connects three perspectives; Konsultasi puts channels near the opening. On narrow screens, stack content in reading order and recompose the diagram vertically. Never shrink a desktop diagram into unreadable columns. Constrain paragraphs to a comfortable measure and let email addresses wrap.

Use a simple disclosure menu on phones, with real buttons, exposed expanded state and keyboard access. Close it on navigation and Escape; restore focus appropriately. Provide skip navigation, visible focus, semantic headings and sufficient contrast. Content cannot depend on hover. Reserve image space and keep all actions usable when imagery fails.

Recommend restrained motion: short underline/color feedback and optional subtle image settling, with text immediately visible. No loader, scroll lock, pinned reading sequence or route-exit delay. Reduced motion removes decorative transforms. Opening images failing or loading slowly must not block navigation. Use native scrolling; section links account for the masthead. Back/Forward should preserve reading position; new-page navigation starts at the title, and direct hashes reach their section. Clean up observers/listeners on departure.

## Connected build batch

1. Establish shared styles, original assets and navigation; build Home → one real practice section → Konsultasi, including direct entry and Back.
2. Populate all seven practices, then complete About and all three strategic offerings using the same shared system.
3. Compare copy to source, refine desktop/phone/short-laptop layouts, and verify contact links and accessible navigation throughout.

Complete the batch continuously once authorized. Adjustable details: spacing, type scale, image crop, breakpoints and subtle interaction timing within v3. Return for material changes to content, visual character, contact channels, backend scope or architecture. No model handoff is proposed.

## Acceptance and evidence

- All five routes load and work on direct entry/refresh; all seven practices and three offerings remain present.
- Every featured service link reaches the correct section; no placeholder `#` actions.
- Phone menu, keyboard navigation, focus and Back/Forward behave as specified; WhatsApp/email targets match the confirmed contacts.
- Exact service/partner/contact copy is compared against source; original logo/photo replace raster approximations.
- Verify 360×640, 390×844, 1280×720 and 1440×900; also inspect landscape and text enlargement. Capture the connected journey, console errors and failed-image behavior.
- Proposed platform targets: current stable Chrome/Edge/Firefox on desktop and Safari on macOS/iOS, plus Chrome on Android. Record actual versions and environments at test time. Desktop viewport emulation does not certify mobile hardware or Safari. Any unavailable platform remains explicitly unverified.
- Proposed budgets: initial compressed JavaScript at most 120 KiB; opening image at most 300 KiB; total initial transfer at most 700 KiB. Measure cold-cache at 390×844 with declared browser/network throttling; target LCP at most 2.5 s and layout shift at most 0.1. These are targets, not measured results; investigate failures before adding dependencies or effects.
- Run production build and browser checks appropriate to implemented behavior. Do not treat raster mockups or a successful build as runtime proof.

## Source-exploration prerequisite

The supplied AGENTS.md restricts jcodemunch use to confirmed non-commercial projects unless an applicable commercial license exists. This client law-firm project has no recorded licensing confirmation. Do not activate indexing based on an assumption. Before source-dependent engineering, either confirm applicable licensing or obtain an explicit bounded native fallback for this repository: targeted `rg`/file reads, source edits and local validation, without jcodemunch. Independent design/content planning is complete and does not depend on that choice.

Resolved prerequisite: the client explicitly selected “Build using native file reads.” This repository-bounded fallback authorizes native exploration, edits and validation without jcodemunch.
