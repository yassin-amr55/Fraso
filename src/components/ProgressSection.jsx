import { progress, remainingPercent } from '../data/progress';
import { Reveal } from './ui/Reveal';
import { ProgressBar } from './ui/ProgressBar';
import { RadialGauge } from './ui/RadialGauge';
import './ProgressSection.css';

export function ProgressSection() {
  return (
    <section className="section progress-section" id="progress">
      <div className="container">
        <div className="section-heading">
          <Reveal>
            <p className="eyebrow">Production Status</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Fraso Progress</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="section-sub">
              Fraso is an original dark fantasy story by Yassin Shehab, published under Elent
              Tales. Every stage of it is tracked openly here &mdash; from the first idea to the
              final polished page. The number below is the one that matters most: how much of the
              whole story exists today.
            </p>
          </Reveal>
        </div>

        <div className="progress-overall">
          <Reveal className="progress-overall__gauge-wrap">
            {(inView) => <RadialGauge value={progress.overall} start={inView} size={252} />}
          </Reveal>

          <Reveal delay={120} className="progress-overall__copy">
            <span className="progress-overall__kicker">The Journey Isn&rsquo;t Over</span>
            <p className="progress-overall__lead">
              <strong>{progress.overall}%</strong> of Fraso is complete.
            </p>
            <p className="progress-overall__sub">
              {remainingPercent}% remains &mdash; still being drawn, written, and polished, one page
              at a time.
            </p>
            {progress.currentPhase && (
              <p className="progress-overall__phase">
                Current focus: <span>{progress.currentPhase}</span>
              </p>
            )}
          </Reveal>
        </div>

        <div className="progress-grid">
          {progress.categories.map((cat, i) => (
            <Reveal as="article" key={cat.key} delay={i * 70} className="progress-card">
              {(inView) => (
                <>
                  <span className="progress-card__index">{String(i + 1).padStart(2, '0')}</span>
                  <ProgressBar label={cat.label} value={cat.value} start={inView} />
                </>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
