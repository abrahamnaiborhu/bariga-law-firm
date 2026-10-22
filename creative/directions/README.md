# Bariga — visual direction review v0.1

Archived: the client rejected all three directions as not conveying the desired firm character. The original A recommendation below is historical and withdrawn. The client subsequently selected a contemporary specialist boutique target. See the [current v0.2 proposal](boutique-v2/README.md).

Original review question: which direction should be developed into the full multipage design?

These are static compositions for the creative exploration authorized by “oke continue.” They preserve the existing logo and use the reviewed source copy. They do not implement the website, navigation, contact delivery or motion. `Konsultasi` is a proposed navigation label. The page structure and contact method remain open decisions in the [site plan](../../docs/SITE_PLAN.md).

## View the actual compositions

- [Comparison of the three homepage openings](comparison.png).
- **A / The Partner’s Desk:** [complete board](a-board.png), [homepage](a-home.png), [practice content](a-practice.png), [phone opening](a-phone-home.png), [phone content](a-phone-practice.png).
- **B / Strategic Field:** [complete board](b-board.png), [homepage](b-home.png), [practice content](b-practice.png), [phone opening](b-phone-home.png), [phone content](b-phone-practice.png).
- **C / Open Practice:** [complete board](c-board.png), [homepage](c-home.png), [practice content](c-practice.png), [phone opening](c-phone-home.png), [phone content](c-phone-practice.png).

The desktop panels are composed for 1280×720, including short laptop height. Phone openings are 390×844; phone inner-page panels show 1000 pixels of scrolling content. These are distinct authored views, not evidence of a working responsive site. Inner-page examples show selected practice content, not all seven entries. The SVG boards are standalone vector review artifacts with embedded fonts and photographs.

## A / The Partner’s Desk — recommendation

**Organizing idea:** personal accountability and a considered legal practice. The retained values headline becomes an editorial cover. The real partner portrait and original firm introduction share the next reading band. This changes the opening's hierarchy and composition while retaining its words.

**Visual language:** warm paper, ink, restrained rust, Instrument Serif display type and Manrope reading/UI type. The legal symbolism is carried by the retained mark; the photograph supplies the human presence. Practice content becomes a readable, numbered catalogue rather than a set of boxes.

**Site extension:** About develops the portrait into the full partner message; Practice Areas uses generous reading rows; Layanan Strategis explains the three-domain relationship within the editorial system; consultation becomes a clearly titled final destination. No new biography or experience claims are assumed.

**Motion proposal:** on Home → About, keep the actual portrait recognizable as its frame expands into the partner profile, then settle the message into a readable column. Other navigation can use a direct, deliberate cut rather than carrying an unrelated portrait through every route. On phones the portrait changes framing within a single column; the whole page remains scrollable. Reduced motion shows the complete destination immediately. Timing and interruption behavior require a later approved study.

**Tradeoff:** it is the most personal and readable option, but needs careful typography and image direction to avoid feeling like a generic professional-services editorial site. The strategy relationship must receive its own substantive composition as the design develops.

**Why recommend it:** the available real portrait gives us a credible, specific visual subject. It supports a substantial redesign without asking the client to replace their message or supply invented proof. Develop its editorial architecture and consider B's explanatory clarity for the strategic-services page; this does not approve borrowing B's palette or navigation wholesale.

## B / Strategic Field

**Organizing idea:** the relationship between law, finance and management becomes the main visual subject. Three labeled planes form a shared field; the existing values and introduction remain present in the opening. A desktop navigation rail and focused reading area distinguish the information architecture from the other candidates.

**Visual language:** deep blue, cream and layered slate; Space Grotesk display type, Manrope reading type, crisp edges and spatial connections. The original blue logo stays intact on a light field. The diagram uses the supplied concepts; it does not assert a process or outcome the firm has not promised.

**Site extension:** Practice Areas offers an explicit seven-topic index with a focused description. About introduces the person behind that approach; Layanan Strategis expands the relationship into the three existing offerings; consultation uses the same stable navigation frame. On phones the rail becomes a compact header and the diagram becomes a readable stepped arrangement. The selected-topic state needs accessible navigation and direct links during implementation; hidden content must have a usable fallback.

**Motion proposal:** start with three fully labeled, separated perspectives; as the reader advances, move them into relation and settle the shared strategy label. Each subject remains readable while moving. Selecting a practice opens its description within the stable frame. Phone spacing and movement must be authored separately; reduced motion presents the final diagram and complete reading route. No forced pinning, intro delay or hover-only content is implied.

**Tradeoff:** this gives the most explicit visual expression to the firm's integrated proposition, but could feel abstract or institutional without a strong partner section. It also carries the greatest interaction and diagram-validation burden.

## C / Open Practice

**Organizing idea:** help a visitor recognize their need immediately. The existing headline remains prominent, while the four original featured practices occupy the opening as a usable service index. A small partner introduction supports the service-led hierarchy.

**Visual language:** pale blue-white, dark ink and a clear blue action color; Manrope throughout; horizontal rules, typographic scale and an exposed index. The useful content, not decorative imagery, supplies the opening's density.

**Site extension:** Practice Areas reads as a clear catalogue with direct section entry. About becomes a focused professional introduction, strategic services receive an equally explicit index, and consultation remains easy to reach. Phone service rows stack with full descriptions; the examples show the reading rhythm rather than all content.

**Motion proposal:** a chosen service row carries its title into the relevant practice section. Back returns to the originating index position; supporting content stays available during the transition. Phones use a short vertical handoff and retain a normal scroll path. Reduced motion uses direct navigation with the selected topic clearly identified.

**Tradeoff:** strongest for immediate service discovery, but less distinctive in atmosphere and less personal than A. It would need exceptionally good typography, spacing and interaction detail to achieve the client's creative ambition.

## Content and assets

The source of truth is the [reviewed page evidence](../../docs/review-evidence/observations.json). [copy-baseline.json](copy-baseline.json) records the exact introduction, service names and descriptions used. All three opening views use the same existing firm introduction and values headline. The examples use selected existing practice paragraphs rather than inventing deeper content.

The original logo file is embedded without recoloring or redrawing. The portrait comes from `creative/old_website/papa_2.jpg`; the boards change its framing, not the person's appearance. Portrait art direction still needs client review. B reformats the supplied three-domain diagram as geometry and labels. New additions are limited to navigation/interface proposals, numbers and review annotations; the broader copy remains unapproved for final publication.

Fonts were obtained from Google's official font repository: [Instrument Serif](https://github.com/google/fonts/tree/main/ofl/instrumentserif), [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), [Space Grotesk](https://github.com/google/fonts/tree/main/ofl/spacegrotesk). The supplied OFL license files are retained under `fonts/`. Font selection is exploratory.

## What was actually checked

Rendered in isolated Chrome 156 on macOS. Fonts used in each composition loaded successfully. The review script found no horizontal text overflow or copy extending past the declared panel bottoms. The agent inspected all three rendered boards, including the two distinct phone compositions per board. [Render checks](render-checks.json) record those bounded checks; unused font families naturally remain unloaded.

This is composition evidence. It does not prove motion timing, touch interaction, accessibility, route behavior, real-device performance or visitor comprehension. No production code, form integration or hosting configuration was changed. No jcodemunch source exploration was needed for generating SVG review assets; the licensing requirement for later source-dependent engineering remains unresolved.

## Focused review prompts

1. Which opening feels like the firm the client wants to become: personal counsel, integrated strategist or a directly accessible practice?
2. In that direction, can you identify the offer and the next action from the opening and then read a service comfortably on the phone composition?
3. Which specific element needs changing: composition, typography, colors, portrait emphasis or navigation?

A preferred direction is a starting point for refinement. Choosing a static board does not approve the full site's detailed motion or an implementation sprint. Develop the chosen direction's About, strategic-services and consultation compositions before final production planning.
