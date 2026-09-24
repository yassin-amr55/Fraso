import { progress, pagesPercent } from '../data/progress';
import { Reveal } from './ui/Reveal';
import { useCountUp } from '../hooks/useCountUp';
import './MilestoneSection.css';

function MilestoneNumber({ inView }) {
  const value = useCountUp(progress.pagesCompleted, { start: inView, duration: 1800 });
  return (
    <span className="milestone__number">
      {Math.round(value)}
      {progress.pagesTarget && (
        <span className="milestone__number-target">/ {progress.pagesTarget}</span>
      )}
    </span>
  );
}

export function MilestoneSection() {
  return (
    <section className="milestone">
      <div className="milestone__glow" aria-hidden="true" />
      <div className="container milestone__inner">
        <Reveal className="milestone__mark" as="span" aria-hidden="true">
          &#10022;
        </Reveal>

        <Reveal delay={80}>{(inView) => <MilestoneNumber inView={inView} />}</Reveal>

        {progress.pagesTarget && (
          <Reveal delay={140} className="milestone__track-wrap">
            {(inView) => (
              <>
                <div className="milestone__track">
                  <div
                    className="milestone__track-fill"
                    style={{ width: inView ? `${pagesPercent}%` : '0%' }}
                  />
                </div>
                <span className="milestone__track-caption">{pagesPercent}% of pages drafted</span>
              </>
            )}
          </Reveal>
        )}

        <Reveal delay={180} className="milestone__rule" as="span" aria-hidden="true" />

        <Reveal delay={220}>
          <h2 className="milestone__label">Pages Completely Finished</h2>
        </Reveal>

        <Reveal delay={280}>
          <p className="milestone__hand">
            {progress.pagesTarget
              ? `already completed — on the way to ${progress.pagesTarget}`
              : 'already completed — and counting'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
