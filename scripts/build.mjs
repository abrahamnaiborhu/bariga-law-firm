import { spawnSync } from 'node:child_process';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { site, pages } from '../config/site.mjs';
import { metadata } from './seo.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
function vite(args) {
  const result = spawnSync(process.execPath, [resolve(root, 'node_modules/vite/bin/vite.js'), ...args], { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`Vite failed: ${result.error?.message || result.status}`);
}
try {
  vite(['build']);
  vite(['build', '--ssr', 'src/entry-server.jsx', '--outDir', '.prerender']);
  const { render } = await import('../.prerender/entry-server.js');
  for (const page of [...pages, { path: '/404/', title: 'Halaman Tidak Ditemukan | Bariga Law Firm', description: 'Halaman yang Anda cari tidak ditemukan. Kembali ke situs Bariga Law Firm.', name: '404' }]) {
    const is404 = page.path === '/404/';
    const output = resolve(root, 'dist', is404 ? '404.html' : `${page.path.slice(1)}index.html`);
    let html = await readFile(output, 'utf8');
    html = html.replace('<!-- SEO -->', metadata(page, is404));
    html = html.replace('<div id="root"></div>', `<div id="root">${render(page.path)}</div>`);
    await writeFile(output, html);
  }
  const urls = site.indexable ? pages.map(page => `  <url><loc>${new URL(page.path.slice(1), site.url).href}</loc></url>`).join('\n') : '';
  await writeFile(resolve(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile(resolve(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n${site.indexable ? `\nSitemap: ${site.url}sitemap.xml\n` : '# Staging: HTML pages carry noindex; allow crawling so robots can read it.\n'}`);
  await writeFile(resolve(root, 'dist/.nojekyll'), '');
  // Useful for branch-based hosting too; Actions also needs the domain in Pages settings.
  if (!site.hostname.endsWith('.github.io')) await writeFile(resolve(root, 'dist/CNAME'), `${site.hostname}\n`);
  console.log(`Prerendered ${pages.length} pages + 404. ${site.url} (${site.indexable ? 'indexable' : 'noindex staging'})`);
} finally {
  await rm(resolve(root, '.prerender'), { recursive: true, force: true });
}
