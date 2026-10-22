# Motion and image pass v1

Authorized by the user's “go” after the proposal for a coordinated homepage opening, portrait reveal, service entrances and animated strategy connection, with additional relevant imagery. Existing native-source fallback and five-page scope continue.

- Home: headline lines rise in a short stagger; the architectural crop settles over roughly one to one-and-a-half seconds. Contact actions are immediately usable. The desk image introduces a visual pause before services; a city detail supports the business context on Strategic.
- Portrait: image settles gently inside its frame as it enters; the partner message follows with a small upward reveal. Preserve actual partner photographs.
- Service rows: restrained staggered entrances and drawn separators, with clearer hover/focus response. All descriptions remain rendered, searchable and selectable.
- Strategy: three labeled perspectives arrive in sequence, connecting strokes draw toward a shared center, then the integrated strategy resolves. Phones use a vertical connecting treatment; compact laptops do not pin content.
- Images: two generated conceptual editorial assets, not representations of the firm's premises or staff. Decorative alt text is empty. No new factual claims.
- Interactions are native scrolling/navigation. No scroll lock, loader, replay requirement or route-exit delay. Direct fragments remain immediately readable. All motion is finite and interruptible by navigation. No continuous background loops.
- Implementation uses IntersectionObserver and the browser Web Animations API; no animation dependency or GSAP scope. Features unavailable means static visible content. Changing reduced-motion preference cancels animation and restores settled states; hidden tabs finish active motion. Owned observers/listeners/animations are cleaned up.
- Maintain prior browser/viewports and resource budgets; lazy-load supporting images. Verify actual sampled animation progress, strategy sequencing, repeated mount/navigation, reduced motion, failed assets and the existing connected-route tests. Screenshots alone do not establish timing quality.

## Client rejection and revised direction — v2 proposal

The client rejected v1's animation quality. Technical passage is not creative approval. Source inspection shows that most behaviors share the same entry-triggered translate/fade or image scale treatment, with no changing relationship between neighboring sections. No further timing-only pass is recommended. Existing copy, routes, logo, original portrait and intimate editorial boutique intent remain required. Native-source exploration fallback remains authorized.

Two mechanisms for a homepage study:

1. Spatial composition (recommended): begin with architecture occupying a generous photographic field and the original headline integrated into its framing. Over a short scroll, the same image contracts into the right-hand frame while the heading settles left on ivory and the introduction comes into a readable composition. The image remains recognizable through the handoff. The settled split composition then releases into the complete practice content. Desktop can use one bounded sticky scene; no scroll interception. Phone uses a shorter vertical crop/frame change in natural flow, with all copy available independently. Reduced motion shows the settled layout. The real partner section supplies a subsequent human moment, rather than another unrelated panorama.
2. Editorial cuts: maintain normal-flow compositions and stable text; use a small number of decisive image-to-image cuts/masks at major chapter boundaries. This emphasizes rhythm and atmosphere with fewer spatial transformations. Less immersive, easier to scan and lighter to integrate across pages.

First study scope, after the client selects the mechanism: homepage opening through the first substantive practice section only, at phone and compact-laptop sizes, retaining the rest of the five-page website. Compare start, middle and settled states plus actual scroll, reverse scroll, quick navigation and reduced motion. No blanket adoption of a new animation library; choose implementation only after the mechanism is agreed. All inner-page extension and production rollout follow the observed study. Do not claim this written proposal establishes rendered quality.

### Approved v2 homepage study

The client selected “Transform the composition with scroll.” This authorizes the bounded opening-to-practice study described above. Implemented as a broad architectural field contracting into a right-hand frame on desktop, with identically positioned dark/white typography clipped at the frame boundary. The visual duplicate is inert and hidden from accessibility APIs; the single semantic headline and actual links remain usable. The introduction is present throughout. No new copy or animation dependency is required.

A 75%-viewport native-scroll interval drives the desktop composition; the stage releases into Practice Areas. Phone and windows shorter than 620 pixels use natural flow with a shorter image frame and vertical text repositioning. Reduced motion shows the settled composition without the sticky interval. The previously repeated homepage entrance effects and intervening desk banner are removed from this study so the opening connects directly to substantive practices. Other pages retain their earlier implementation pending review of this study. Observe actual start/middle/end, reverse scroll, direct entry, navigation and resource behavior before judging the result.

## Approved inner-page extension — spatial v3

The client liked the v2 homepage study and explicitly requested the same animation/taste for the other pages. This authorizes implementation across the existing four inner pages, preserving the selected boutique design, wording, real assets, routes and direct-contact scope.

- Practice Areas reuses the continuous broad-photo-to-frame opening with the desk image. It releases into a full seven-practice directory with a desktop reading index. The index highlights the section currently being read, supports direct links and becomes normal-flow navigation on phones/short windows.
- Layanan Strategis uses the city image in the same opening mechanism. The three competencies converge and their connections draw according to actual reading progress, reversing with scroll. All labels and the shared result remain visible. It leads into all three offerings.
- About keeps its editorial introduction. The original portrait stays beside the full partner message on desktop, and its frame narrows as reading progresses. Phones keep the portrait/message in document flow. The relationship diagram uses the same reversible drawing treatment.
- Konsultasi keeps WhatsApp/email in the opening, without a photographic introduction or additional barrier to contact. The three existing process steps gain a sticky desktop guide and a growing reading rail; the current step is indicated. Phone/short-window navigation stays in flow. No forms or booking integration are introduced.

The earlier timed entrance system is retired. CompositionScene owns the shared photographic scene; useReadingProgress and useReadingSection own the reversible passages/indexes. All use native scroll with passive listeners and bounded requestAnimationFrame updates, cleaned up on departure. Reduced motion settles geometry and removes sticky reading behavior. No new package or model configuration is needed. Verify source copy, direct topic/step entry, Back, fast/reverse scrolling, responsive layout and preference changes in Chrome; retain declared platform limits.

## Client correction — v4, supersedes repeated inner-page scene

The client specified that the broad-image-to-frame effect belongs only on Home, requested stronger mobile treatment and supplied a screenshot showing the Strategic introduction crossing the image/ivory boundary. This correction authorizes the affected redesign without another concept-selection round.

Home: preserve the liked desktop scene. On phones/short windows, separate the title/photo panel from the introduction, retain the body on ivory, and pull the image into a shallow inset frame with a small internal vertical shift. Measure the real title-group height rather than relying on a fixed crop height. The mobile white visual duplicate never paints the introduction or actions. There is no vertical image boundary moving through a paragraph and no extra pinned mobile interval.

Practice Areas: replace the repeated hero with an ivory editorial foreword, an opening horizontal photo reveal and its existing live practice index. Layanan Strategis: replace the repeated hero with a plain reading introduction and a city-image triptych; three offset panels align as the reader approaches, introducing the three competencies without repeating Home's transition. About: retain the portrait/message relationship, but use a fixed-width photographic plate that gently settles alongside a drawn caption rule, rather than another shrinking frame. Konsultasi retains its distinct guided steps/reading rail and immediate WhatsApp/email access.

All new passages remain reversible, naturally scrolled and independently readable. Reduced motion uses settled imagery and static geometry. Preserve source wording and existing assets/routes. Verify mobile photo/body separation through forward and reverse scroll, absence of the Home scene on all inner routes, actual reveal/panel transforms, direct service entry, source copy and failed-image access.

## About hero clarification — coordinated entrance and live composition

The client clarified that “empty” referred to missing animation, retained the transparent-portrait direction and rejected the circular Managing Partner badge. Remove the badge; preserve the normal role caption. This authorizes animation of the About hero itself, not another layout redesign.

The title lines settle from opposite horizontal directions. The cutout rises into its masked stage while the navy plate turns behind it, and the fine orbit draws around the composition. These form a coordinated, finite entrance of roughly 1.6 seconds; text remains present and the introduction/actions do not wait. Portrait-layer motion starts when the actual image is decoded and its stage is visible, without a loader. Image failure leaves the static composition and readable copy.

After entry, scroll moves the orbit and plate at different rates and shifts the italic title slightly. The portrait moves only modestly on desktop; phone keeps the portrait clear of surrounding copy. This does not reuse Home's broad-image contraction. Reduced motion shows the settled composition; switching preference cancels active effects. Navigation/unmount disposes observers, listeners and animations. Hidden tabs finish active entrances; entrances do not replay on every scroll or preference toggle.
