import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { site, pages, absoluteUrl } from '../config/site.mjs';
const titles = new Set();
const descriptions = new Set();
for (const page of pages) {
  const html = await readFile(`dist/${page.path.slice(1)}index.html`, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${page.path}: one rendered h1`);
  assert.match(html, /<main[ >]/);
  assert.ok(html.includes(`href="${absoluteUrl(page.path)}"`), 'absolute canonical');
  assert.ok(html.includes(`content="${site.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}"`));
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="(.*?)"/s)?.[1];
  assert.ok(title && description);
  titles.add(title); descriptions.add(description);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema['@graph'][0]['@type'], 'LegalService');
  assert.equal(schema['@graph'][0].url, site.url);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const pathname = match[1];
    assert.ok(pathname.startsWith(site.base), `Unprefixed URL: ${pathname}`);
    let local = decodeURIComponent(pathname.slice(site.base.length));
    if (!local || local.endsWith('/')) local += 'index.html';
    await access(resolve('dist', local));
  }
}
assert.equal(titles.size, 5); assert.equal(descriptions.size, 5);
const notFound = await readFile('dist/404.html', 'utf8');
assert.match(notFound, /noindex, follow/); assert.match(notFound, /<main[ >]/);
assert.ok(!notFound.includes('rel="canonical"'));
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, site.indexable ? 5 : 0);
const robots = await readFile('dist/robots.txt', 'utf8');
assert.match(robots, /Allow: \//);
assert.equal(robots.includes('Sitemap:'), site.indexable);
const png = await readFile('dist/images/social-preview.png');
assert.equal(png.subarray(1,4).toString(), 'PNG');
assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
if (!site.hostname.endsWith('.github.io')) assert.equal((await readFile('dist/CNAME','utf8')).trim(), site.hostname);
await access('dist/.nojekyll');
console.log(`Verified five prerendered pages, local links/assets, metadata, schema, preview image, 404 and crawl settings: ${site.url}`);
