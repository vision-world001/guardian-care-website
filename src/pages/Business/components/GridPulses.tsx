import {useEffect, useRef, useState} from 'react';
import type {CSSProperties} from 'react';

/**
 * Charge moving along the console grid.
 *
 * The grid behind this page says *system*; this says the system is running.
 * Each pulse is a short comet — dim tail, bright head — travelling along one
 * grid line for a few cells and then going dark, and the going dark is the
 * point: travel occupies the first third of each cycle and the rest is rest,
 * so a dozen pulses on unrelated delays read as something happening here and
 * there rather than as an animation looping.
 *
 * Positions are snapped to the same 56px lattice the grid is drawn on, and
 * every pulse re-rolls its line, length and speed each time it finishes, so
 * the field never repeats a pattern the eye can learn.
 *
 * Built from transforms on a handful of absolutely positioned elements rather
 * than on a canvas, for one reason: this field is as tall as the page — six
 * screens — and a canvas that size costs tens of megabytes and a full-page
 * repaint, while these composite on the GPU and scroll with the document for
 * free. Nothing here reads layout during animation.
 *
 * Entirely presentational, and it stops dead under `prefers-reduced-motion`:
 * the base stylesheet collapses the duration, which lands every pulse on its
 * final keyframe — fully transparent.
 */

/** Matches `bg-console-grid`. Both must move together or the traces drift off the lines. */
const PITCH = 56;
const COUNT = 14;
/** Long enough that a comet reads as a comet rather than as a dash. */
const TAIL = 132;

type Pulse = {
  id: number;
  axis: 'x' | 'y';
  /** Offsets in px, already snapped to the lattice. */
  left: number;
  top: number;
  /** How far it runs, in whole cells. */
  travel: number;
  duration: number;
  delay: number;
  tone: 'green' | 'blue';
};

function pick(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** One pulse, placed on a line of the lattice that currently fits on the page. */
function roll(id: number, width: number, height: number): Pulse {
  const axis: 'x' | 'y' = Math.random() < 0.52 ? 'y' : 'x';
  const cols = Math.max(2, Math.floor(width / PITCH));
  const rows = Math.max(2, Math.floor(height / PITCH));
  const cells = Math.round(pick(3, 8));

  return {
    id,
    axis,
    left: Math.floor(pick(1, axis === 'y' ? cols : Math.max(2, cols - cells))) * PITCH,
    top: Math.floor(pick(1, axis === 'x' ? rows : Math.max(2, rows - cells))) * PITCH,
    travel: cells * PITCH,
    duration: pick(6.5, 13),
    delay: pick(0, 11),
    tone: Math.random() < 0.55 ? 'green' : 'blue'
  };
}

export default function GridPulses() {
  const ref = useRef<HTMLDivElement>(null);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const next = useRef(0);

  /* The field is the height of the whole page, so the lattice it can use is
     only known once it has been laid out — and it changes when a section
     opens or the window resizes. */
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      const {width, height} = entry.contentRect;
      if (width < PITCH * 4 || height < PITCH * 6) return;

      setPulses((current) =>
        current.length
          ? current
          : Array.from({length: COUNT}, () => roll(next.current++, width, height))
      );
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /** Re-roll at the end of a cycle, where the pulse is already invisible. */
  function recycle(id: number) {
    const node = ref.current;
    if (!node) return;
    const {offsetWidth, offsetHeight} = node;

    setPulses((current) =>
      current.map((pulse) =>
        pulse.id === id ? {...roll(next.current++, offsetWidth, offsetHeight), delay: 0} : pulse
      )
    );
  }

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {pulses.map((pulse) => {
        const colour = pulse.tone === 'green' ? 'var(--color-green)' : 'var(--color-blue)';
        const vertical = pulse.axis === 'y';

        return (
          <span
            key={pulse.id}
            onAnimationIteration={() => recycle(pulse.id)}
            className="absolute block"
            style={
              {
                left: pulse.left,
                top: pulse.top,
                width: vertical ? 1 : TAIL,
                height: vertical ? TAIL : 1,
                /* The head leads, so the gradient runs bright at the end the
                   pulse is travelling towards. */
                background: `linear-gradient(${vertical ? 180 : 90}deg, transparent 0%, ${colour} 78%, #fff 100%)`,
                opacity: 0,
                '--travel': `${pulse.travel}px`,
                animation: `${vertical ? 'trace-y' : 'trace-x'} ${pulse.duration}s linear ${pulse.delay}s infinite`
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
