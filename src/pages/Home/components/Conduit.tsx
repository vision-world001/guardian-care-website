import {TONE_VAR} from '../../../data/command';
import type {StatusTone} from '../../../data/command';
import {cn} from '../../../lib/cn';

/**
 * A charge travelling between two nodes.
 *
 * The page's one motion rule, made into a component: what moves is the energy,
 * not the interface. Every diagram on this page is joined by these, so a
 * reader's eye is always being led along the direction electricity is actually
 * going rather than around a decorative loop.
 *
 * The pulse is a short segment of a tall track and is positioned in percentages
 * of it, so the same two elements work at any length — a 44px gap between two
 * rows in the hero card, and a 700px spine in the record diagram.
 *
 * The track stays visible under `prefers-reduced-motion`: the base stylesheet
 * collapses the animation, and a diagram whose connections disappear for a
 * reader who asked for less motion is a diagram that has lost its edges.
 */
export default function Conduit({
  direction = 'down',
  tone = 'amber',
  delay = 0,
  duration = 2.8,
  className
}: {
  direction?: 'down' | 'right';
  tone?: StatusTone;
  /** Stagger, in seconds. Negative values start the pulse mid-travel. */
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const colour = TONE_VAR[tone];
  const vertical = direction === 'down';

  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative block overflow-hidden',
        vertical ? 'w-px' : 'h-px w-full',
        className
      )}
      style={{background: `color-mix(in srgb, ${colour} 22%, transparent)`}}
    >
      <span
        className="absolute inset-0 block"
        style={{
          /* The lit segment. Sized as a fraction of the track so it scales with
             whatever gap it has been dropped into. */
          [vertical ? 'height' : 'width']: '34%',
          background: vertical
            ? `linear-gradient(180deg, transparent, ${colour}, transparent)`
            : `linear-gradient(90deg, transparent, ${colour}, transparent)`,
          animation: `${vertical ? 'conduit' : 'conduit-x'} ${duration}s linear infinite`,
          animationDelay: `${delay}s`
        }}
      />
    </span>
  );
}

/** The dot that marks a reading as live rather than as a printed figure. */
export function LiveDot({tone = 'green', className}: {tone?: StatusTone; className?: string}) {
  return (
    <span
      aria-hidden="true"
      className={cn('relative block h-2 w-2 shrink-0 rounded-full', className)}
      style={{background: TONE_VAR[tone]}}
    >
      <span
        className="absolute inset-0 block rounded-full"
        style={{
          background: TONE_VAR[tone],
          animation: 'live 2.4s ease-in-out infinite'
        }}
      />
    </span>
  );
}
