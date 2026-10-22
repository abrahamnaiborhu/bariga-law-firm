import { sitePath } from '../site.js';
import { useAboutEntrance } from '../useAboutEntrance.js';
import { useRef } from 'react';
import content from '../content.json';
import { TextLink } from './Layout.jsx';
import { useReadingProgress } from '../useReadingProgress.js';

export default function AboutOpening() {
  const ref = useRef(null);
  useReadingProgress(ref);
  useAboutEntrance(ref);
  return <section className="about-cover section" ref={ref}>
    <div className="about-cover-copy">
      <div className="about-cover-heading"><p className="eyebrow">About Us</p>
      <h1><span className="about-title-first">Tentang</span><br /><em className="about-title-second"><span>Kami</span></em></h1></div>
      <p className="about-cover-intro">{content.aboutIntro}</p>
      <TextLink href="#pesan-partner">Pesan dari Managing Partner</TextLink>
    </div>
    <figure className="about-cover-portrait">
      <div className="cutout-stage">
        <div className="portrait-arch-clip" aria-hidden="true"><div className="portrait-arch-motion"><div className="portrait-arch" /></div></div>
        <svg className="portrait-orbit" viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="300" cy="180" rx="299" ry="179" pathLength="1" /></svg>
        <div className="cutout-mask"><div className="cutout-rise"><img src={sitePath('/images/partner-cutout.webp')} width="756" height="850" alt="Mesa Indra Naiborhu, Managing Partner Bariga Law Firm" fetchPriority="high" /></div></div>
      </div>
      <figcaption>{content.partnerName}<span>Managing Partner</span></figcaption>
    </figure>
    <div className="about-values" aria-hidden="true"><span>Integritas</span><span>Strategi</span><span>Keadilan</span></div>
  </section>;
}
