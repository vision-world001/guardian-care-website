import {useEffect, useRef, useState} from 'react';
import type {CSSProperties, ElementType, ReactNode} from 'react';
import {cn} from '../lib/cn';

type RevealProps = {
  as?: ElementType;
  /** Stagger, in seconds, matching the original animation-delay values. */
  delay?: number;
  /**
   * The entrance this uses. Defaults to the site-wide fade-up, which is tuned
   * for type; a large surface can ask for a longer one — see
   * `--animate-card-in`. Passed as the utility name rather than through
   * `className`, because the two would otherwise both apply and the later
   * declaration in the stylesheet, not the later class in the string, would
   * decide which one ran.
   */
  animation?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
};

/**
 * Fades content up once it scrolls into view, mirroring the `.reveal` class and
 * IntersectionObserver pairing from the original page. Without observer support
 * everything starts shown, rather than staying hidden forever.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  animation = 'animate-fadeup',
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      {threshold: 0.08}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  /* The caller's style and the stagger are merged, not raced. `style` used to
     arrive inside `rest`, spread after this component's own — so passing any
     style at all (a height, a border colour) silently discarded the delay, and
     a staggered list would arrive all at once with nothing to say why. */
  const merged: CSSProperties | undefined =
    shown && delay ? {...style, animationDelay: `${delay}s`} : style;

  return (
    <Tag
      ref={ref}
      className={cn(shown ? animation : 'opacity-0', className)}
      style={merged}
      {...rest}
    >
      {children}
    </Tag>
  );
}
