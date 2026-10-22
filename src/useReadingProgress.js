import { useEffect, useLayoutEffect, useState } from 'react';

/** A reversible reading passage, driven only by native scroll position. */
export function useReadingProgress(ref) {
  useLayoutEffect(() => {
    const element = ref.current;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = true;
    function paint() {
      frame = 0;
      if (document.hidden) return;
      const rect = element.getBoundingClientRect();
      const range = Math.max(1, rect.height + innerHeight * .15);
      const progress = preference.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * .75 - rect.top) / range));
      element.style.setProperty('--reading-progress', progress);
      element.dataset.readingProgress = progress.toFixed(3);
    }
    const schedule = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(paint); };
    const onScroll = () => { if (visible) schedule(); };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    });
    observer.observe(element);
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pageshow', schedule);
    document.addEventListener('visibilitychange', schedule);
    preference.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pageshow', schedule);
      document.removeEventListener('visibilitychange', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, [ref]);
}

export function useReadingSection(ref, ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let frame = 0;
    function paint() {
      frame = 0;
      const sections = ids.map(id => ref.current?.querySelector(`[id="${id}"]`)).filter(Boolean);
      const current = sections.filter(section => section.getBoundingClientRect().top <= innerHeight * .35).at(-1);
      setActive(current?.id || ids[0]);
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    paint();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref, ids]);
  return active;
}
