import {useEffect, useRef} from 'react';
import type {CSSProperties} from 'react';

/**
 * The light the consumer journey sits in — a day, crossed by scrolling.
 *
 * The business journey is a console: cold, blue, operational, lit like a room
 * with screens in it. This page is the opposite thing and should not be lit the
 * same way. It is about somebody's house, so the ground under it moves the way
 * light moves through a house: warm and low at dawn behind the morning digest,
 * high and cool over the middle of the page where the roof is producing, amber
 * again as the story reaches the evening the household actually lives in, then
 * deep blue at the end.
 *
 * That mapping is not decorative — it is the page's argument restated at the
 * scale of the whole frame. Everything here is about the gap between when solar
 * arrives and when a home uses it, and a reader who scrolls from a warm morning
 * through a bright midday into a warm evening has felt that gap before they
 * have finished reading about it.
 *
 * Four crossfading phases rather than one animated gradient: opacity is the
 * cheapest thing to change per frame, the layers are `fixed` so nothing
 * reflows, and each phase can carry its own colour and position instead of
 * interpolating through muddy intermediates. Scroll progress is written to CSS
 * variables from a single rAF-throttled listener.
 *
 * Entirely presentational: `aria-hidden`, no pointer events, negative z-index.
 * The slow drift honours `prefers-reduced-motion` through the base stylesheet;
 * the colour shift is scroll-linked rather than self-animating, so it is not
 * motion the reader did not ask for.
 */

type Phase = {
  /** Where in the scroll this phase is at full strength, 0–1. */
  centre: number;
  /** How far either side of the centre it takes to fade out. */
  reach: number;
};

const PHASES: Phase[] = [
  {centre: 0.0, reach: 0.34},
  {centre: 0.38, reach: 0.36},
  {centre: 0.72, reach: 0.32},
  {centre: 1.0, reach: 0.3}
];

/** Linear falloff from a phase's centre, clamped — no phase ever goes negative. */
function strength(progress: number, phase: Phase): number {
  return Math.max(0, 1 - Math.abs(progress - phase.centre) / phase.reach);
}

export default function HomeLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    function paint() {
      frame = 0;
      if (!node) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      PHASES.forEach((phase, index) => {
        node.style.setProperty(`--phase-${index}`, strength(progress, phase).toFixed(3));
      });
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }

    paint();
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{'--phase-0': 1, '--phase-1': 0, '--phase-2': 0, '--phase-3': 0} as CSSProperties}
    >
      {/* Dawn — warm and low, the hour the morning message arrives. */}
      <div className="absolute inset-0" style={{opacity: 'var(--phase-0)'}}>
        <div
          className="animate-drift absolute -left-[15%] top-[42%] h-[70vw] w-[70vw] rounded-full blur-[120px]"
          style={{background: 'radial-gradient(circle, rgba(255,179,64,0.10), transparent 66%)'}}
        />
        <div
          className="animate-drift absolute -right-[10%] -top-[22%] h-[62vw] w-[62vw] rounded-full blur-[110px]"
          style={{
            background: 'radial-gradient(circle, var(--color-green-glow), transparent 64%)',
            animationDelay: '-9s'
          }}
        />
      </div>

      {/* Midday — high, cool and wide, over the sections about generation. */}
      <div className="absolute inset-0" style={{opacity: 'var(--phase-1)'}}>
        <div
          className="animate-drift absolute -top-[30%] left-[8%] h-[78vw] w-[78vw] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(46,155,255,0.15), transparent 62%)',
            animationDelay: '-4s'
          }}
        />
        <div
          className="animate-drift absolute -right-[18%] top-[8%] h-[64vw] w-[64vw] rounded-full blur-[110px]"
          style={{
            background: 'radial-gradient(circle, rgba(61,220,151,0.13), transparent 64%)',
            animationDelay: '-17s',
            animationDuration: '31s'
          }}
        />
      </div>

      {/* Dusk — the warm hours the household is actually home for, and the ones
          its solar has already stopped covering. */}
      <div className="absolute inset-0" style={{opacity: 'var(--phase-2)'}}>
        <div
          className="animate-drift absolute -right-[14%] top-[30%] h-[74vw] w-[74vw] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,179,64,0.13), transparent 64%)',
            animationDelay: '-11s'
          }}
        />
        <div
          className="animate-drift absolute -bottom-[26%] -left-[12%] h-[60vw] w-[60vw] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.12), transparent 66%)',
            animationDelay: '-22s',
            animationDuration: '35s'
          }}
        />
      </div>

      {/* Night — nearly out, which is the point: the system is still watched. */}
      <div className="absolute inset-0" style={{opacity: 'var(--phase-3)'}}>
        <div
          className="animate-drift absolute -bottom-[30%] left-[18%] h-[80vw] w-[80vw] rounded-full blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(46,155,255,0.11), transparent 66%)',
            animationDelay: '-6s'
          }}
        />
        <div
          className="animate-drift absolute -left-[16%] top-[14%] h-[54vw] w-[54vw] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.09), transparent 68%)',
            animationDelay: '-28s',
            animationDuration: '33s'
          }}
        />
      </div>

      {/* Holds the field off the copy without flattening it. */}
      <div className="bg-home-veil absolute inset-0" />
    </div>
  );
}
