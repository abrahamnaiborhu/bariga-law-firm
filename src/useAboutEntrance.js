import { useEffect } from 'react';

/** Assemble the portrait and its frame as one finite, interruptible entrance. */
export function useAboutEntrance(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !Element.prototype.animate || !window.IntersectionObserver) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const played = new Set();
    let dispose = () => {};

    function setup() {
      dispose();
      if (preference.matches) return;
      const animations = new Set();
      let alive = true;
      function play(element, frames, duration, delay = 0) {
        const animation = element.animate(frames, {
          duration, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'both',
        });
        animations.add(animation);
        animation.finished.then(() => {
          animation.cancel();
          animations.delete(animation);
        }).catch(() => animations.delete(animation));
      }
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target;
          observer.unobserve(element);
          if (played.has(element)) continue;
          if (element.classList.contains('about-cover-heading')) {
            played.add(element);
            play(root.querySelector('.about-title-first'), [
              { transform: 'translateX(-36px)' }, { transform: 'translateX(0)' },
            ], 1050);
            play(root.querySelector('.about-title-second > span'), [
              { transform: 'translateX(44px)' }, { transform: 'translateX(0)' },
            ], 1150, 100);
          } else {
            const assemble = () => {
              if (!alive || preference.matches) return;
              const rect = element.getBoundingClientRect();
              if (document.hidden || rect.bottom <= 0 || rect.top >= innerHeight) {
                observer.observe(element);
                return;
              }
              played.add(element);
              play(root.querySelector('.cutout-rise'), [
              { transform: 'translateY(76px)' }, { transform: 'translateY(0)' },
            ], 1300, 100);
              play(root.querySelector('.portrait-arch-motion'), [
              { transform: 'translateY(44px) rotate(15deg)' }, { transform: 'translateY(0) rotate(0)' },
            ], 1450);
              play(root.querySelector('.portrait-orbit ellipse'), [
              { strokeDasharray: '1', strokeDashoffset: 1 },
              { strokeDasharray: '1', strokeDashoffset: 0 },
            ], 1400, 220);
            };
            const image = element.querySelector('img');
            // Coordinate the frame with an actually decoded portrait, without
            // holding navigation or the readable introduction behind a loader.
            if (image.complete && image.naturalWidth) assemble();
            else image.decode().then(assemble).catch(() => {});
          }
        }
      }, { threshold: .08 });
      root.querySelectorAll('.about-cover-heading, .cutout-stage').forEach(element => observer.observe(element));
      const settle = () => {
        if (document.hidden) animations.forEach(animation => animation.finish());
        else root.querySelectorAll('.about-cover-heading, .cutout-stage').forEach(element => {
          if (!played.has(element)) { observer.unobserve(element); observer.observe(element); }
        });
      };
      document.addEventListener('visibilitychange', settle);
      dispose = () => {
        alive = false;
        observer.disconnect();
        document.removeEventListener('visibilitychange', settle);
        animations.forEach(animation => animation.cancel());
        animations.clear();
      };
    }
    setup();
    preference.addEventListener('change', setup);
    return () => { dispose(); preference.removeEventListener('change', setup); };
  }, [ref]);
}
