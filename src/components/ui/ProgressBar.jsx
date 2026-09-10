import { useCountUp } from '../../hooks/useCountUp';
import './ProgressBar.css';

/**
 * Horizontal progress bar with a count-up percentage. `start` controls
 * when the fill animates and the number counts up — pass inView from a
 * parent <Reveal>.
 */
export function ProgressBar({ label, value, start, decimals = 0, size = 'md' }) {
  const displayValue = useCountUp(value, { start, decimals, duration: 1300 });

  return (
    <div className={`pbar pbar--${size}`}>
      <div className="pbar__row">
        <span className="pbar__label">{label}</span>
        <span className="pbar__value">
          {displayValue.toFixed(decimals)}
          <span className="pbar__percent">%</span>
        </span>
      </div>
      <div className="pbar__track">
        <div
          className="pbar__fill"
          style={{ width: start ? `${value}%` : '0%' }}
        />
        <div className="pbar__track-texture" aria-hidden="true" />
      </div>
    </div>
  );
}
