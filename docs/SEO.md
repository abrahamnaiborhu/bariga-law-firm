# SEO implementation

All five routes are prerendered into standalone HTML, then hydrated by React for motion and navigation interactions. Text, links, headings and structured data are available before JavaScript executes, following [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

The build supplies unique Indonesian titles and descriptions, absolute canonicals, Open Graph and Twitter metadata, a local 1200×630 social preview, Indonesian document language, favicon, robots.txt, sitemap.xml and a standalone noindex 404 page. The original wording remains in `src/content.json`; metadata lives in `config/site.mjs`.

JSON-LD uses [LegalService](https://schema.org/LegalService), WebSite and WebPage, with AboutPage/Person, ContactPage and Service entries where relevant. Contact details, office address and services come from the supplied business content. No reviews, ratings, prices, opening hours or unsupported awards were added. Structured data does not guarantee a Google rich result.

Staging defaults to `noindex, follow` and an empty sitemap. For production, use the two deployment variables described in [DEPLOYMENT.md](DEPLOYMENT.md). Never submit the staging sitemap. Production sitemaps include the five canonical routes; service anchors are sections rather than duplicate pages.

Validation covers rendered headings/content, unique metadata, parsed JSON-LD, local links/assets, base paths, crawl settings, social image dimensions and 404 output. Browser smoke checks cover hydration console errors, images, mobile overflow and static HTML without JavaScript. This is implementation verification, not a live ranking, indexation, Search Console or Core Web Vitals audit. Confirm the client's final wording and contact information before production and test the public URL with Google's Rich Results Test and Search Console.

Verification used fresh local output; no prior SEO cache was present. Both the custom-domain staging build and an indexable `/bariga-law-firm/` build passed static validation and ten desktop/mobile hydration checks each. Final output was restored to the custom-domain staging configuration.
