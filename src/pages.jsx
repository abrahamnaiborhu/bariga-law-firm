import SiteLink from './components/SiteLink.jsx';
import { sitePath } from './site.js';
import AboutOpening from './components/AboutOpening.jsx';
import { PartnerStory, ConsultationProcess } from './components/ReadingStories.jsx';
import CompositionScene from './components/CompositionScene.jsx';
import content from './content.json';
import { ContactInvitation, TextLink, Arrow, whatsapp, email } from './components/Layout.jsx';
import { StrategyDiagram } from './components/Services.jsx';

export function HomePage() {
  return <><CompositionScene /><section className="home-practices section" id="keahlian-kami"><div><p className="eyebrow">Practice Areas</p><h2>Keahlian Mendalam untuk Tantangan Perusahaan Anda</h2><p>{content.homePracticeIntro}</p><TextLink href="/practice-areas/">Lebih Lanjut</TextLink></div><div className="featured-services">{content.featured.map(item => <article key={item.id} data-motion="reveal"><h3><SiteLink href={`/practice-areas/#${item.id}`}>{item.title}</SiteLink></h3><p>{item.text}</p><TextLink href={`/practice-areas/#${item.id}`} aria-label={`Lebih lanjut — ${item.title}`}>Lebih Lanjut</TextLink></article>)}</div></section>
    <section className="home-partner section"><figure data-motion="image"><img src={sitePath('/images/partner.jpg')} width="981" height="1100" alt="Mesa Indra Naiborhu, Managing Partner Bariga Law Firm" loading="lazy" /><figcaption>{content.partnerName}<span>Managing Partner</span></figcaption></figure><div data-motion="reveal"><p className="eyebrow">Our Approach</p><h2>Mitra Strategis Pertumbuhan <em>Bisnis Anda</em></h2><p>{content.homePartnerIntro}</p><TextLink href="/about-us/">Pelajari Pendekatan Kami</TextLink></div></section><ContactInvitation /></>;
}
export function AboutPage() {
  return <><AboutOpening /><PartnerStory /><section className="about-beyond section"><div><h2>{content.beyondTitle}</h2><p>{content.beyondText}</p><TextLink href="/lain-lain/">Layanan Strategis</TextLink></div><div><h2>{content.intersectionTitle}</h2><p>{content.intersectionText}</p><StrategyDiagram /></div></section><ContactInvitation /></>;
}
export function ConsultationPage() {
  return <><section className="consult-opening section"><div><p className="eyebrow">Konsultasi</p><h1 tabIndex="-1">Mari Diskusikan Kebutuhan <em>Strategis</em> Anda</h1><p>{content.consultIntro}</p></div><div className="contact-channels"><SiteLink href={whatsapp}><span className="eyebrow">WhatsApp</span><span>{content.contact.whatsapp}</span><Arrow /></SiteLink><SiteLink href={email}><span className="eyebrow">Email</span><span>{content.contact.email.split('@')[0]}@<wbr />{content.contact.email.split('@')[1]}</span><Arrow /></SiteLink></div></section><ConsultationProcess /><section className="office section"><p className="eyebrow">Alamat Kantor</p><address>{content.contact.address}</address></section></>;
}
