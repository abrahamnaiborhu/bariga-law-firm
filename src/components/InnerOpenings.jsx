import { sitePath } from '../site.js';
import { useRef } from 'react';
import { useReadingProgress } from '../useReadingProgress.js';
import { TextLink } from './Layout.jsx';

export function PracticeOpening({ intro }) {
  const art = useRef(null);
  useReadingProgress(art);
  return <header className="practice-opening inner-opening">
    <div className="inner-opening-copy section">
      <div><p className="eyebrow">Keahlian Kami</p><h1><em>Practice</em><br />Areas</h1></div>
      <div><p>{intro}</p><TextLink href="#practice-directory">Practice Areas</TextLink></div>
    </div>
    <div className="folio-art" ref={art}>
      <div className="folio-window"><img src={sitePath('/images/desk.jpg')} width="1200" height="800" alt="" /></div>
      <div className="folio-register" aria-hidden="true"><span>Practice Areas</span><span>01 — 07</span></div>
    </div>
  </header>;
}

export function StrategicOpening({ intro }) {
  const art = useRef(null);
  useReadingProgress(art);
  return <header className="strategic-opening inner-opening">
    <div className="inner-opening-copy section">
      <div><p className="eyebrow">Layanan Strategis</p><h1>Training &amp;<br /><em>Consulting</em></h1></div>
      <div><p>{intro}</p><TextLink href="#pendekatan-terpadu">Pendekatan Terpadu</TextLink></div>
    </div>
    <div className="city-triptych" ref={art}>
      {['Hukum', 'Keuangan', 'Manajemen'].map((name, index) => <div className="city-panel" key={name}>
        <div className={`city-slice city-slice-${index}`}><img src={sitePath('/images/city.jpg')} width="1200" height="800" alt="" /></div>
        <span>{name}</span>
      </div>)}
    </div>
  </header>;
}
