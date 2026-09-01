import {useEffect, useRef, useState} from 'react';
import type {ElementType, ReactNode} from 'react';
import {cn} from '../lib/cn';

type RevealProps = {
  as?: ElementType;
  /** Stagger, in seconds, matching the original animation-delay values. */
  delay?: number;
  className?: string;
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
  className,
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

  return (
    <Tag
      ref={ref}
      className={cn(shown ? 'animate-fadeup' : 'opacity-0', className)}
      style={shown && delay ? {animationDelay: `${delay}s`} : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
