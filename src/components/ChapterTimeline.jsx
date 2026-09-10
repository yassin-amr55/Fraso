import { progress } from '../data/progress';
import { Reveal } from './ui/Reveal';
import { useCountUp } from '../hooks/useCountUp';
import './ChapterTimeline.css';

function ChapterRow({ chapter, index, inView }) {
  const isLocked = chapter.status === 'locked';
  // A chapter that exists and is underway but has no pages finished yet
  // (0%) — real, not a "coming soon" placeholder, but not red like active
  // progress either.
  const isJustStarted = !isLocked && (chapter.value ?? 0) === 0;
  const value = useCountUp(chapter.value ?? 0, { start: inView && !isLocked, duration: 1400 });

  return (
    <div
      className={`chapter-row${isLocked ? ' chapter-row--locked' : ''}${
        isJustStarted ? ' chapter-row--zero' : ''
      }`}
    >
      <div className="chapter-row__node">
        <span className="chapter-row__dot" />
      </div>

      <div className="chapter-row__body">
        <div className="chapter-row__head">
          <span className="chapter-row__label">{chapter.label}</span>
          {isLocked ? (
            <span className="chapter-row__tag">Coming Soon</span>
          ) : (
            <span className="chapter-row__value">{value.toFixed(0)}%</span>
          )}
        </div>

        <div className="chapter-row__track">
          {isLocked ? (
            <div className="chapter-row__track-locked" />
          ) : (
            <div
              className="chapter-row__fill"
              style={{
                width: inView ? `${chapter.value}%` : '0%',
                transitionDelay: `${index * 120}ms`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function ChapterTimeline() {
  return (
    <section className="section chapter-section" id="chapters">
      <div className="container">
        <div className="section-heading">
          <Reveal>
            <p className="eyebrow">Story Timeline</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Chapters</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="section-sub">
              Fraso unfolds chapter by chapter. Here is exactly how far each one has come &mdash;
              nothing more, nothing invented.
            </p>
          </Reveal>
        </div>

        <Reveal className="chapter-list">
          {(inView) => (
            <>
              {progress.chapters.map((chapter, i) => (
                <ChapterRow key={chapter.key} chapter={chapter} index={i} inView={inView} />
              ))}
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
