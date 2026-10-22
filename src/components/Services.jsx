import SiteLink from './SiteLink.jsx';
import { useRef } from 'react';
import { PracticeOpening, StrategicOpening } from './InnerOpenings.jsx';
import { useReadingProgress, useReadingSection } from '../useReadingProgress.js';
import content from '../content.json';
import { TextLink } from './Layout.jsx';

export function ServiceList({ items }) {
  return <div className="service-list">{items.map((item, index) => <section className="service-row" key={item.id} id={item.id}><span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h2>{item.title}</h2><div><p>{item.text}</p><TextLink href="/konsultasi/" aria-label={`Konsultasi — ${item.title}`}>Konsultasi</TextLink></div></section>)}</div>;
}
export function StrategyDiagram() {
  const ref = useRef(null);
  useReadingProgress(ref);
  return <div ref={ref} className="strategy-diagram reading-strategy"><p className="eyebrow">Pendekatan Terpadu</p><div className="pillars"><svg className="strategy-spine" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M1 0V100" /></svg>{[
    ['Hukum', 'Advokat, Arbitrase, Litigasi'],
    ['Keuangan', 'Restrukturisasi, Analisis, Korporasi'],
    ['Manajemen', 'Business Process, Training, Leadership'],
  ].map(([name, text]) => <div key={name}><h3>{name}</h3><p>{text}</p></div>)}</div><svg className="strategy-connectors" viewBox="0 0 600 90" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M100 0V30Q100 45 120 45H280Q300 45 300 65V90" /><path pathLength="1" d="M300 0V90" /><path pathLength="1" d="M500 0V30Q500 45 480 45H320Q300 45 300 65V90" /></svg><p className="strategy-result">Legal &amp; Business <em>Strategy</em></p></div>;
}
export function PageIntro({ label, children, intro }) {
  return <section className="page-intro section"><div><p className="eyebrow">{label}</p><h1 tabIndex="-1">{children}</h1></div><p className="intro-copy">{intro}</p></section>;
}
const practiceIds = content.practices.map(item => item.id);

export function PracticePage() {
  const ref = useRef(null);
  const active = useReadingSection(ref, practiceIds);
  return <>
    <PracticeOpening intro={content.practiceIntro} />
    <section className="indexed-services section" id="practice-directory" ref={ref}>
      <aside className="reading-index"><p className="eyebrow">Practice Areas</p>
        <nav aria-label="Daftar bidang praktik">{content.practices.map((item, index) =>
          <SiteLink key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>
            <span>{String(index + 1).padStart(2, '0')}</span>{item.title}
          </SiteLink>)}</nav>
      </aside>
      <ServiceList items={content.practices} />
    </section>
  </>;
}
export function StrategicPage() {
  return <><StrategicOpening intro={content.strategicIntro} />
    <section className="section" id="pendekatan-terpadu"><StrategyDiagram /><ServiceList items={content.strategic} /></section></>;
}
