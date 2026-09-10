import { sortedWordStats } from '../data/wordStats';
import { Reveal } from './ui/Reveal';
import { useCountUp } from '../hooks/useCountUp';
import './WordStats.css';

const maxCount = Math.max(...sortedWordStats.map((w) => w.count));
// Logarithmic scale so the long tail (7 mentions) stays visible next to the
// runaway leader (1076 mentions) instead of disappearing to a hairline.
const widthFor = (count) => (Math.log(count + 1) / Math.log(maxCount + 1)) * 100;

function WordRow({ entry, rank, inView }) {
  const count = useCountUp(entry.count, { start: inView, duration: 1500 + rank * 60 });

  return (
    <div className={`word-row${rank === 1 ? ' word-row--top' : ''}`}>
      <span className="word-row__rank">{String(rank).padStart(2, '0')}</span>
      <div className="word-row__main">
        <div className="word-row__head">
          <span className="word-row__word">
            {entry.word}
            {rank === 1 && (
              <span className="word-row__crown" aria-hidden="true">
                &#9813;
              </span>
            )}
          </span>
          <span className="word-row__count">{Math.round(count).toLocaleString()}</span>
        </div>
        <div className="word-row__track">
          <div
            className="word-row__fill"
            style={{ width: inView ? `${widthFor(entry.count)}%` : '0%' }}
          />
        </div>
      </div>
    </div>
  );
}

export function WordStats() {
  return (
    <section className="section word-section">
      <div className="container">
        <div className="section-heading">
          <Reveal>
            <p className="eyebrow">The World Of Fraso</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Fraso By The Numbers</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="section-sub">
              The most-spoken names and words across the manuscript so far &mdash; a small window
              into the world taking shape.
            </p>
          </Reveal>
        </div>

        <Reveal className="word-list">
          {(inView) => (
            <>
              {sortedWordStats.map((entry, i) => (
                <WordRow key={entry.word} entry={entry} rank={i + 1} inView={inView} />
              ))}
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
