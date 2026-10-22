const rawUrl = process.env.SITE_URL || 'https://barigalawfirm-staging.abrahamnaiborhu.com/';
const url = new URL(rawUrl);
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
  throw new Error('SITE_URL must be an HTTPS URL without credentials, query parameters or a fragment.');
}
url.pathname = `${url.pathname.replace(/\/+$/, '')}/`;
const flag = process.env.SITE_INDEXABLE || 'false';
if (!['true', 'false'].includes(flag)) throw new Error('SITE_INDEXABLE must be true or false.');
export const site = {
  url: url.href,
  base: url.pathname,
  indexable: flag === 'true',
  hostname: url.hostname,
  name: 'Bariga Law Firm',
  locale: 'id_ID',
};
export const pages = [
  { path: '/', title: 'Bariga Law Firm | Solusi Hukum Strategis di Jakarta', name: 'Home', description: 'Bariga Law Firm di Jakarta menyediakan solusi hukum strategis bagi korporasi dan individu, dengan pendekatan terpadu hukum, keuangan, dan manajemen.' },
  { path: '/about-us/', title: 'Tentang Kami & Managing Partner | Bariga Law Firm', name: 'About Us', description: 'Kenali Bariga Law Firm dan Managing Partner Mesa Indra Naiborhu: firma hukum yang berlandaskan integritas, strategi, dan keadilan.' },
  { path: '/practice-areas/', title: 'Bidang Praktik & Layanan Hukum | Bariga Law Firm', name: 'Practice Areas', description: 'Layanan hukum perdata dan bisnis, kepailitan dan PKPU, pidana, arbitrase, keluarga dan waris, perbankan, serta teknologi dan perlindungan data.' },
  { path: '/lain-lain/', title: 'Training & Consulting Bisnis | Bariga Law Firm', name: 'Layanan Strategis', description: 'Layanan strategis Bariga Law Firm: Business Process Training, Finance & Restructuring, serta Law & Compliance Training untuk perusahaan.' },
  { path: '/konsultasi/', title: 'Konsultasi Hukum via WhatsApp & Email | Bariga Law Firm', name: 'Konsultasi', description: 'Hubungi Bariga Law Firm melalui WhatsApp atau email untuk konsultasi rahasia. Kenali proses konsultasi dan alamat kantor di Jakarta Timur.' },
];
export const absoluteUrl = path => new URL(path.replace(/^\//, ''), site.url).href;
