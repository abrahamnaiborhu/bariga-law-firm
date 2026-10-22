# GitHub Pages deployment

Repository: https://github.com/abrahamnaiborhu/bariga-law-firm

Staging URL: https://barigalawfirm-staging.abrahamnaiborhu.com/

The workflow publishes only `dist/` from this repository. Your portfolio repository `abrahamnaiborhu.github.io` needs no changes.

## First publication

1. Push this project to the repository's `main` branch.
2. In this repository's **Settings → Pages**, select **GitHub Actions** as the build source. Set the custom domain to `barigalawfirm-staging.abrahamnaiborhu.com`.
3. At the DNS provider for `abrahamnaiborhu.com`, create a **CNAME** record named `barigalawfirm-staging` pointing to **`abrahamnaiborhu.github.io`**. Do not include a repository path. Preserve the portfolio's existing DNS records.
4. In **Actions**, run **Build and deploy Pages** if the initial push ran before Pages was enabled. Following successful deployment and DNS/certificate provisioning, enable **Enforce HTTPS** in Pages settings.

The generated `CNAME` file also supports branch hosting, but Actions deployments require the custom domain to be configured in Pages settings. GitHub's [custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) explains this distinction.

## Build configuration

Node 24 is recorded in `.nvmrc`. Run:

```sh
npm ci
npm test
npm run build
npm run check:build
npm run preview
```

GitHub **Settings → Secrets and variables → Actions → Variables** supports these optional repository variables:

| Variable | Default | Meaning |
| --- | --- | --- |
| `SITE_URL` | `https://barigalawfirm-staging.abrahamnaiborhu.com/` | Full public HTTPS URL, including a repository path if applicable |
| `SITE_INDEXABLE` | `false` | Keep staging out of search results; use exactly `true` for production |

For temporary hosting at the repository URL, set `SITE_URL` to `https://abrahamnaiborhu.github.io/bariga-law-firm/` and remove the custom domain in this repository's Pages settings. Asset paths, navigation and canonicals derive from this value. A custom domain uses `/` as the base, following [Vite's deployment guidance](https://vite.dev/guide/static-deploy.html#github-pages).

Local overrides are process environment variables; `.env` files are not loaded by the build configuration:

```sh
SITE_URL=https://abrahamnaiborhu.github.io/bariga-law-firm/ npm run build
SITE_URL=https://abrahamnaiborhu.github.io/bariga-law-firm/ npm run check:build
```

## Production promotion

Set `SITE_URL` to the final public domain and `SITE_INDEXABLE=true`, update Pages settings and DNS for that domain, then run the workflow. The build updates every canonical, social URL and schema identifier and generates a five-page sitemap. Staging emits `noindex, follow`, permits crawlers to read that directive, and omits URLs from its sitemap. Noindex is a search directive, not access control.

Check the deployed five pages, direct service anchors, mobile menu, images, WhatsApp/email links and an unknown URL. Confirm HTTPS, canonical URLs and robots metadata before submitting the production sitemap in Search Console. No Search Console account or DNS was changed by this implementation.

## Delivery and rollback

Pull requests run tests and build validation without deploying. Pushes to `main` and manual runs on `main` deploy through the `github-pages` environment. Only deployment receives Pages write and OIDC permissions; the build has read-only repository access. See GitHub's [custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

To roll back, revert the faulty commit and push to `main`; the workflow builds and publishes the previous behavior. No server, database, secret, or portfolio deployment is involved.
