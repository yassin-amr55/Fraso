import { useEffect, useRef } from 'react';
import { progress, remainingPercent } from '../data/progress';
import { useCountUp } from '../hooks/useCountUp';
import { useReducedMotion } from '../hooks/useReducedMotion';
import coverArt from '../assets/fraso-cover.jpg';
import coverArtAtmosphere from '../assets/fraso-cover-atmosphere.jpg';
import elentLogo from '../assets/elent-tales-logo.png';
import './Hero.css';

export function Hero() {
  const frameRef = useRef(null);
  const atmosphereRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const statValue = useCountUp(progress.overall, { start: true, decimals: 1, duration: 2200 });

  // Extremely subtle parallax on the cover frame + background as the user
  // scrolls the hero into and out of view. No-op under reduced motion.
  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (frameRef.current) {
          frameRef.current.style.transform = `translateY(${Math.min(y * 0.08, 60)}px) rotate(-1.2deg)`;
        }
        if (atmosphereRef.current) {
          atmosphereRef.current.style.transform = `translateY(${y * 0.15}px) scale(1.06)`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion]);

  return (
    <section className="hero" id="top">
      <div className="hero__atmosphere" ref={atmosphereRef} style={{ backgroundImage: `url(${coverArtAtmosphere})` }} />
      <div className="hero__vignette" />
      <div className="hero__scrim" />

      <div className="container hero__inner">
        <header className="hero__brand">
          <img src={elentLogo} alt="" className="hero__brand-mark" aria-hidden="true" />
          <span className="hero__brand-name">Elent Tales</span>
        </header>

        <div className="hero__content">
          <div className="hero__copy">
            <p className="eyebrow">A Story In The Making</p>
            <h1 className="hero__title">Fraso</h1>

            <div className="hero__tagline-row">
              <span className="hero__tagline-label">Story Progress</span>
              <p className="hero__tagline">The story is being written.</p>
            </div>

            <div className="hero__stat" aria-label={`Overall completion: ${progress.overall} percent`}>
              <span className="hero__stat-number">
                {statValue.toFixed(1)}
                <span className="hero__stat-percent">%</span>
              </span>
              <div className="hero__stat-meta">
                <span className="hero__stat-caption">Overall Completion</span>
                <span className="hero__stat-remaining">{remainingPercent}% of the journey remains</span>
              </div>
            </div>

            <div className="hero__actions">
              <a href="#progress" className="hero__cta">
                Witness the Progress
              </a>
              <a href="#chapters" className="hero__cta hero__cta--ghost">
                Chapters
              </a>
            </div>
          </div>

          <div className="hero__art">
            <div className="hero__art-frame" ref={frameRef}>
              <img src={coverArt} alt="Fraso — official cover art. A hero fights cruelty." className="hero__art-image" />
              <span className="hero__art-caption">Fraso &mdash; Cover Art</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#progress" className="hero__scroll-cue" aria-label="Scroll to progress">
        <span className="hero__scroll-line" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
