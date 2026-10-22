import { readFileSync } from 'node:fs';
import { site, absoluteUrl } from '../config/site.mjs';
const content = JSON.parse(readFileSync(new URL('../src/content.json', import.meta.url), 'utf8'));
const escapeHtml = text => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const safeJson = data => JSON.stringify(data).replace(/</g, '\\u003c');

export function structuredData(page) {
  const businessId = `${site.url}#firm`;
  const websiteId = `${site.url}#website`;
  const business = {
    '@type': 'LegalService', '@id': businessId, name: site.name, url: site.url,
    logo: absoluteUrl('/images/logo.png'), image: absoluteUrl('/images/logo.png'),
    telephone: content.contact.whatsapp, email: content.contact.email,
    address: { '@type': 'PostalAddress', streetAddress: 'Jl. Mayjend. Sutoyo No. 21, RT 09/RW 09, Cililitan, Kramatjati', addressLocality: 'Jakarta Timur', addressRegion: 'DKI Jakarta', postalCode: '13640', addressCountry: 'ID' },
  };
  const graph = [business, { '@type': 'WebSite', '@id': websiteId, name: site.name, url: site.url, inLanguage: 'id-ID', publisher: { '@id': businessId } },
    { '@type': page.path === '/about-us/' ? 'AboutPage' : page.path === '/konsultasi/' ? 'ContactPage' : 'WebPage', '@id': `${absoluteUrl(page.path)}#page`, url: absoluteUrl(page.path), name: page.title, description: page.description, inLanguage: 'id-ID', isPartOf: { '@id': websiteId }, about: { '@id': businessId } }];
  if (page.path === '/about-us/') graph.push({ '@type': 'Person', '@id': `${absoluteUrl(page.path)}#managing-partner`, name: 'Mesa Indra Naiborhu', jobTitle: 'Managing Partner', image: absoluteUrl('/images/partner.jpg'), worksFor: { '@id': businessId } });
  if (['/practice-areas/', '/lain-lain/'].includes(page.path)) {
    const items = page.path === '/practice-areas/' ? content.practices : content.strategic;
    graph.push(...items.map(item => ({ '@type': 'Service', '@id': `${absoluteUrl(page.path)}#${item.id}`, name: item.title, description: item.text, url: `${absoluteUrl(page.path)}#${item.id}`, provider: { '@id': businessId } })));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function metadata(page, is404 = false) {
  const image = absoluteUrl('/images/social-preview.png');
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${!is404 && site.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
    '<meta name="theme-color" content="#faf8f3" />',
  ];
  if (!is404) tags.push(
    `<link rel="canonical" href="${escapeHtml(absoluteUrl(page.path))}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(absoluteUrl(page.path))}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    '<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Bariga Law Firm — Integrity, Strategy &amp; Justice" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<script type="application/ld+json">${safeJson(structuredData(page))}</script>`,
  );
  return tags.join('\n');
}
