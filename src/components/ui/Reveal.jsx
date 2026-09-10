import { useInView } from '../../hooks/useInView';

/**
 * Scroll-triggered entrance wrapper. Renders `children` (plain nodes, or a
 * render-prop function receiving `inView`) inside `as` (default: div),
 * fading/rising it into place the first time it enters the viewport.
 * Also usable purely to detect "has this entered view yet" for driving
 * count-up numbers elsewhere on the page.
 */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, inView] = useInView();
  const { style: restStyle, ...restProps } = rest;

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      {...restProps}
      style={{ transitionDelay: `${delay}ms`, ...restStyle }}
    >
      {typeof children === 'function' ? children(inView) : children}
    </Tag>
  );
}
