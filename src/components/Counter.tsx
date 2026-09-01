import {useEffect, useRef, useState} from 'react';
import {cn} from '../lib/cn';

/**
 * A figure that arrives rather than one that is typeset.
 *
 * On a page whose whole claim is that these numbers came off a real roof this
 * morning, a value that counts into place when it is scrolled to is telling the
 * truth about what it is — the readings are live, and the page should not
 * present them like print. Used on the daily tiles, the morning digest and the
 * money figures; deliberately not on labels or anything inside the SVGs, which
 * carry their own motion.
 *
 * Takes the formatted string the rest of the app already holds — "18.4",
 * "A$3.48", "71%" — splits off any prefix and suffix, and animates only the
 * number between them, matching its decimal places. Nothing upstream has to
 * change shape to use it.
 *
 * Tabular figures while it runs, and after: a display-weight number whose
 * digits change width mid-count visibly jitters, and holding the alignment
 * costs less than the slight looseness proportional figures would have given.
 */

const PARTS = /^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/;
const DURATION = 1100;

/** Fast out of the gate, settles gently — reads as a reading landing. */
function ease(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export default function Counter({value, className}: {value: string; className?: string}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const [rendered, setRendered] = useState(value);

  /* Adjusting state during render rather than in an effect: if the value prop
     changes, show the new one immediately instead of a frame of the old. */
  if (rendered !== value) {
    setRendered(value);
    setShown(value);
  }

  const match = PARTS.exec(value);
  const prefix = match?.[1] ?? '';
  const digits = match?.[2] ?? '';
  const suffix = match?.[3] ?? '';
  const target = Number(digits.replace(/,/g, ''));
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
  const grouped = digits.includes(',');
  const countable = Boolean(match) && Number.isFinite(target);

  useEffect(() => {
    const node = ref.current;

    /* Anything that did not parse as a number, or a reader who has asked for
       less motion, keeps the value it was rendered with and never animates. */
    if (!node || !countable) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let start = 0;

    function paint(at: number) {
      const [whole, fraction] = at.toFixed(decimals).split('.');
      const body = grouped ? Number(whole).toLocaleString('en-US') : whole;
      setShown(`${prefix}${body}${fraction ? `.${fraction}` : ''}${suffix}`);
    }

    function step(now: number) {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / DURATION);
      paint(target * ease(t));
      if (t < 1) frame = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          frame = requestAnimationFrame(step);
        }
      },
      {threshold: 0.4}
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [countable, prefix, suffix, target, decimals, grouped]);

  return (
    <span ref={ref} className={cn('[font-variant-numeric:tabular-nums]', className)}>
      {shown}
    </span>
  );
}
