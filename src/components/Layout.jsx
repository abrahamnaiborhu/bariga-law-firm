import SiteLink from './SiteLink.jsx';
import { sitePath } from '../site.js';
import { useEffect, useRef, useState } from 'react';
import content from '../content.json';

export const routes = [
  ['/', 'Home'], ['/about-us/', 'About Us'], ['/practice-areas/', 'Practice Areas'],
  ['/lain-lain/', 'Layanan Strategis'], ['/konsultasi/', 'Konsultasi'],
];
export const whatsapp = 'https://wa.me/6281295798826';
export const email = `mailto:${content.contact.email}`;

export function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 32 16" fill="none"><path d="M0 8h30M23 1l7 7-7 7" stroke="currentColor" strokeWidth="1.3" /></svg>;
}
export function TextLink({ href, children, outlined = false, ...props }) {
  return <SiteLink className={outlined ? 'text-link outlined' : 'text-link'} href={href} {...props}>{children}<Arrow /></SiteLink>;
}
function Brand() {
  return <SiteLink href="/" className="brand" aria-label="Bariga Law Firm — Home"><img src={sitePath('/images/logo.png')} width="526" height="323" alt="" /><span>BARIGA LAW FIRM</span></SiteLink>;
}
export function Header({ current }) {
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape' && open) { setOpen(false); button.current?.focus(); }
    };
    const reset = () => setOpen(false);
    window.addEventListener('keydown', close);
    window.addEventListener('pageshow', reset);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('pageshow', reset); };
  }, [open]);
  return <header className="site-header" onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <Brand />
    <button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)} aria-label={open ? 'Tutup menu' : 'Buka menu'}><span /><span /></button>
    <nav id="primary-nav" aria-label="Navigasi utama" className={open ? 'primary-nav is-open' : 'primary-nav'}>
      {routes.map(([href, label]) => <SiteLink key={href} href={href} aria-current={href === current ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</SiteLink>)}
    </nav>
  </header>;
}
export function ContactInvitation() {
  return <section className="contact-invitation section" data-motion="reveal"><div><p className="eyebrow">Konsultasi</p><h2>Mari Diskusikan<br />Kebutuhan <em>Strategis</em> Anda</h2></div><div><p>{content.consultIntro}</p><TextLink href="/konsultasi/">Jadwalkan Konsultasi</TextLink></div></section>;
}
export function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div><Brand /><p className="footer-note">Integrity, Strategy &amp; Justice</p></div><div><p className="eyebrow">Menu</p><nav aria-label="Navigasi footer">{routes.map(([href, label]) => <SiteLink href={href} key={href}>{label}</SiteLink>)}</nav></div><div><p className="eyebrow">Where We Are</p><address>{content.contact.address}</address><SiteLink href={whatsapp}>{content.contact.whatsapp}</SiteLink><SiteLink href={email}>{content.contact.email}</SiteLink></div></div><div className="footer-bottom"><p>{content.disclaimer}</p><span>© {import.meta.env.SITE_BUILD_YEAR} Bariga Law Firm</span></div></footer>;
}
