import SiteLink from './SiteLink.jsx';
import { sitePath } from '../site.js';
// Homepage signature: inner pages deliberately use different compositions.
import { useLayoutEffect, useRef } from 'react';
import content from '../content.json';
import { TextLink } from './Layout.jsx';

const clamp = value => Math.max(0, Math.min(1, value));

function OpeningCopy({ visual = false, label, title, intro, action, actionHref }) {
  const Heading = visual ? 'div' : 'h1';
  return <div className="scene-copy">
    <div className="scene-heading-group">
      <p className="eyebrow">{label}</p>
      <Heading className="scene-heading">{title}</Heading>
    </div>
    <div className="scene-body">
    <p className="scene-intro">{intro}</p>
    <div className="scene-actions">
      <TextLink href={actionHref} outlined>{action}</TextLink>
      <SiteLink className="quiet-link" href="/about-us/">Pelajari Pendekatan Kami</SiteLink>
    </div>
    </div>
  </div>;
}

export default function CompositionScene({
  label = 'Bariga Law Firm',
  title = <><span>Integrity,</span><span><em>Strategy</em> &amp;</span><span>Justice</span></>,
  intro = content.homeIntro,
  image = 'architecture',
  target = 'keahlian-kami',
  targetLabel = 'Practice Areas',
  action = 'Solusi Hukum Anda',
  actionHref = '/konsultasi/',
}) {
  const copy = { label, title, intro, action, actionHref };
  const scene = useRef(null);
  useLayoutEffect(() => {
    const element = scene.current;
    const stage = element.querySelector('.scene-stage');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = true;

    function paint() {
      frame = 0;
      if (document.hidden) return;
      const rect = element.getBoundingClientRect();
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const mobile = width <= 850;
      // Small/short windows use ordinary document flow instead of a pinned scene.
      const flowing = mobile || window.innerHeight < 620;
      const progress = media.matches ? 1 : clamp(-rect.top / (flowing ? window.innerHeight * .7 : rect.height - height));
      const gutter = Math.max(24, Math.min(width * .062, 100));
      const top = progress * (flowing ? 24 : height * .06);
      const left = progress * (flowing ? gutter : width * .58);
      const right = progress * gutter;
      const openingHeight = element.querySelector('.scene-heading-group').offsetHeight;
      const bottom = flowing ? height - openingHeight + top : progress * 84;
      element.style.setProperty('--frame-top', `${top}px`);
      element.style.setProperty('--frame-left', `${left}px`);
      element.style.setProperty('--frame-right', `${right}px`);
      element.style.setProperty('--frame-bottom', `${bottom}px`);
      element.style.setProperty('--copy-offset', '0px');
      element.style.setProperty('--scene-progress', progress);
      element.dataset.progress = progress.toFixed(3);
    }
    function schedule() {
      if (!frame && !document.hidden) frame = requestAnimationFrame(paint);
    }
    element.classList.add('scene-enhanced');
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    });
    observer.observe(element);
    const onScroll = () => { if (visible) schedule(); };
    const onVisibility = () => { if (!document.hidden) schedule(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pageshow', schedule);
    document.addEventListener('visibilitychange', onVisibility);
    media.addEventListener('change', schedule);
    paint();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pageshow', schedule);
      document.removeEventListener('visibilitychange', onVisibility);
      media.removeEventListener('change', schedule);
      element.classList.remove('scene-enhanced');
    };
  }, []);

  return <section className="home-scene" ref={scene} aria-label={label}>
    <div className="scene-stage">
      <OpeningCopy {...copy} />
      <div className="scene-photograph" aria-hidden="true">
        <img src={sitePath(`/images/${image}.jpg`)} srcSet={image === 'architecture' ? `${sitePath('/images/architecture-small.jpg')} 700w, ${sitePath('/images/architecture.jpg')} 1500w` : undefined} sizes="100vw" width="1500" height="844" alt="" fetchPriority="high" />
      </div>
      {/* The clipped visual copy keeps white type exactly over the photograph.
          The real, accessible copy and links remain below at identical positions. */}
      <div className="scene-light-copy" aria-hidden="true" inert><OpeningCopy {...copy} visual /></div>
      <div className="scene-caption"><span>Integrity, Strategy &amp; Justice</span><SiteLink href={`#${target}`}>{targetLabel} <span aria-hidden="true">↓</span></SiteLink></div>
      <div className="scene-track" aria-hidden="true"><span /></div>
    </div>
  </section>;
}
