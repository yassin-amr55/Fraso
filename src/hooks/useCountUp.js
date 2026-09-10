import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

/**
 * Animates a number from 0 up to `target` once `start` becomes true.
 * Respects prefers-reduced-motion by snapping straight to the target.
 */
export function useCountUp(target, { start = false, duration = 1400, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();
  const frame = useRef(null);

  useEffect(() => {
    if (!start) return;

    if (reducedMotion) {
      setValue(target);
      return;
    }

    const t0 = performance.now();
    const tick = (now) => {
      const elapsed = now - t0;
      const progressRatio = Math.min(elapsed / duration, 1);
      const eased = easeOutQuint(progressRatio);
      setValue(target * eased);
      if (progressRatio < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => frame.current && cancelAnimationFrame(frame.current);
  }, [start, target, duration, reducedMotion]);

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
