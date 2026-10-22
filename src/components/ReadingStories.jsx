import { useRef } from 'react';
import content from '../content.json';
import { useReadingProgress, useReadingSection } from '../useReadingProgress.js';

export function PartnerStory() {
  const ref = useRef(null);
  useReadingProgress(ref);
  return <section className="partner-message partner-story section" id="pesan-partner" ref={ref}>
    <aside className="partner-story-figure partner-quotation">
      <span className="quotation-mark" aria-hidden="true">“</span>
      <p className="partner-signature">{content.partnerName}</p>
      <p className="partner-role">Managing Partner</p>
      <div className="message-lenses" aria-hidden="true"><span>Hukum</span><span>Keuangan</span><span>Manajemen</span></div>
    </aside>
    <div><p className="eyebrow">Pesan dari Managing Partner</p>
      <h2>Pesan dari<br /><em>Managing Partner</em></h2>
      <blockquote>{content.partnerMessage.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</blockquote>
    </div>
  </section>;
}

const stepIds = content.steps.map((_, index) => `langkah-${index + 1}`);
export function ConsultationProcess() {
  const ref = useRef(null);
  useReadingProgress(ref);
  const active = useReadingSection(ref, stepIds);
  return <section className="consult-process guided-process section" ref={ref} id="proses-konsultasi">
    <div className="process-heading"><p className="eyebrow">Proses Konsultasi</p><h2>Tiga Langkah <em>Awal</em></h2>
      <nav className="process-navigation" aria-label="Langkah konsultasi">{content.steps.map((step, index) =>
        <a href={`#${stepIds[index]}`} key={step.title} aria-current={active === stepIds[index] ? 'location' : undefined}>
          <span>0{index + 1}</span>{step.title.split(': ')[1]}
        </a>)}</nav>
    </div>
    <ol>{content.steps.map((step, index) => <li id={stepIds[index]} key={step.title} className={active === stepIds[index] ? 'is-reading' : ''}>
      <span className="service-number" aria-hidden="true">0{index + 1}</span>
      <div><h3>{step.title}</h3><p>{step.text}</p></div>
    </li>)}</ol>
  </section>;
}
