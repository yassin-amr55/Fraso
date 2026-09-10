import { useCountUp } from '../../hooks/useCountUp';
import './RadialGauge.css';

/**
 * Large circular completion gauge used for the single "overall" number.
 * Pure SVG, animates its stroke on `start` and counts the center label
 * up alongside it.
 */
export function RadialGauge({ value, start, size = 260, stroke = 10, decimals = 1 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const displayValue = useCountUp(value, { start, decimals, duration: 1900 });
  const offset = circumference - (start ? value / 100 : 0) * circumference;

  return (
    <div className="gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="gauge__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className="gauge__fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="gauge__label">
        <span className="gauge__number">
          {displayValue.toFixed(decimals)}
          <span className="gauge__percent">%</span>
        </span>
        <span className="gauge__caption">Complete</span>
      </div>
    </div>
  );
}
