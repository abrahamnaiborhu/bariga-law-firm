# Bariga Law Firm

React + Vite website implementing the preferred boutique v3 direction. Five separate HTML entries share React components and local content. Original logo and partner portrait are supplied assets; the homepage architecture is conceptual decorative imagery.

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Pages

- `/` — Home
- `/about-us/` — About Us
- `/practice-areas/` — seven practices, each with a direct section anchor
- `/lain-lain/` — Layanan Strategis, preserving the existing public URL
- `/konsultasi/` — WhatsApp and email only

Native page navigation preserves browser history without a routing dependency. Vite builds each route into its own directory in `dist/`. Serve that directory from the domain root on a host with directory-index support. No publication or hosting change has been performed. `noindex, nofollow` remains for review; remove only as part of an approved launch.

## Source

- `src/content.json` — preserved source copy, service anchors and contacts
- `src/components/` — masthead, footer, contact actions and service layouts
- `src/pages.jsx` — Home, About and Konsultasi
- `src/App.jsx` — page selection and fragment entry
- `styles/base.css` — responsive editorial design and reduced-motion treatment
- `public/images/` — optimized assets; source originals remain in `creative/old_website/`
- `docs/BUILD_PLAN.md` — agreed implementation scope
- `docs/BUILD_REVIEW.md` — verification and remaining limits
- `docs/build-evidence/` — screenshots and browser observations

Implementation follows Vite's [multi-page build guidance](https://vite.dev/guide/build.html#multi-page-app) and React's [effect lifecycle guidance](https://react.dev/reference/react/useEffect). No backend, forms, analytics, external fonts or animation dependency is included. Finite motion uses native Web Animations and IntersectionObserver, with reduced-motion and static fallbacks. See `docs/MOTION_PLAN.md` and run `node scripts/motion-check.mjs` against the production preview to sample motion states.

The revised homepage is a bounded scroll-composition study. Run `node scripts/scene-check.mjs` against the production preview to check forward/reverse progress, short-window flow and reduced motion. `scripts/motion-check.mjs` now covers the inner-page strategy sequence. See `docs/SCENE_REVIEW.md` for the current study and evidence.

The spatial motion direction is now implemented across the inner pages. Run `node scripts/inner-spatial-check.mjs` for reversible photo scenes, reading passages, active navigation, reduced motion and direct service entry. `scripts/motion-check.mjs` delegates to this current check. The original timed entrance hook has been retired. See `docs/INNER_MOTION_REVIEW.md`.

Current motion direction: the broad-image-to-frame signature is exclusive to Home. Inner pages use distinct editorial/reading mechanisms. Mobile Home keeps its introduction on a separate ivory surface. See `docs/MOBILE_MOTION_REVIEW.md`; the updated `scripts/inner-spatial-check.mjs` verifies the boundary and page distinctions. Earlier v3 documents describe the superseded repeated hero.
