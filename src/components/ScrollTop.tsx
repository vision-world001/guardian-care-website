import {useEffect, useState} from 'react';
import {cn} from '../lib/cn';

/**
 * Back to the top, with the read position drawn around it.
 *
 * The ring is the reason this is worth building rather than importing. A bare
 * arrow tells someone what the button does; the ring also tells them where
 * they are, which on a seven-section page is the more useful of the two. It
 * costs one extra circle and no extra listener — the scroll position is
 * already being read to decide whether the button should exist at all.
 *
 * It appears after a full screen of travel, because a control that shows up
 * immediately is answering a question nobody has yet.
 *
 * Kept mounted and faded rather than unmounted, so it can transition out
 * instead of vanishing, with `pointer-events` and `tabIndex` withdrawn while
 * it is invisible — a hidden control that still takes a tab stop is worse than
 * no control.
 */

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollTop() {
  const [progress, setProgress] = useState(0);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;

    function paint() {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0);
      setShown(y > window.innerHeight * 0.9);
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

  function toTop() {
    /* The base stylesheet drops <html> to `scroll-behavior: auto` under
       reduced motion, but an explicit `behavior` here outranks the CSS — so
       the preference has to be read rather than assumed, or this one control
       would animate past a reader who asked for no motion. */
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top: 0, behavior: still ? 'auto' : 'smooth'});
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={cn(
        'group ring-lit fixed bottom-6 right-6 z-90 grid h-[52px] w-[52px] place-items-center rounded-full bg-glass backdrop-blur-[14px] transition duration-300 ease-brand',
        'hover:-translate-y-0.5 hover:bg-panel-2/70',
        shown
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      {/* Read position, drawn round the edge. Rotated so it fills clockwise
          from the top rather than from three o'clock. */}
      <svg
        viewBox="0 0 52 52"
        className="absolute inset-0 h-full w-full -rotate-90"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="26"
          cy="26"
          r={RADIUS}
          stroke="var(--color-line-2)"
          strokeWidth="2"
        />
        <circle
          cx="26"
          cy="26"
          r={RADIUS}
          stroke="var(--color-green)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>

      <svg
        viewBox="0 0 24 24"
        className="relative h-[18px] w-[18px] text-muted transition-colors duration-200 group-hover:text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
