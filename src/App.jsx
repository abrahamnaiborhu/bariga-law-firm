import { useLayoutEffect } from 'react';
import { Header, Footer, ContactInvitation } from './components/Layout.jsx';
import { PracticePage, StrategicPage } from './components/Services.jsx';
import { HomePage, AboutPage, ConsultationPage } from './pages.jsx';

const pages = {
  '/': HomePage,
  '/about-us/': AboutPage,
  '/practice-areas/': PracticePage,
  '/lain-lain/': StrategicPage,
  '/konsultasi/': ConsultationPage,
};
export default function App() {
  const path = window.location.pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  const Page = pages[path];
  useLayoutEffect(() => {
    // The browser tries fragment navigation before React creates the section.
    // Preserve native restored scroll on history traversal instead of overriding it.
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation?.type === 'back_forward') return;
    if (window.location.hash) {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return; }
      document.getElementById(id)?.scrollIntoView();
    }
  }, []);
  return <><a className="skip-link" href="#main">Langsung ke konten</a><Header current={path} /><main id="main">{Page ? <Page /> : <section className="section not-found"><h1>Halaman tidak ditemukan.</h1><a href="/">Kembali ke Home</a></section>}{['/practice-areas/', '/lain-lain/'].includes(path) && <ContactInvitation />}</main><Footer /></>;
}
