import type {ReactNode} from 'react';
import type {ConcernKey} from '../../../data/consumerFlow';

/**
 * A picture for every question and every watched thing.
 *
 * Six questions set as text in six boxes is a list a reader works through line
 * by line. The same six with a mark against each are scannable — the eye finds
 * a battery or a bill before it finishes reading either word, and on the one
 * screen where somebody is hunting for their own problem among six, that is
 * the difference.
 *
 * Every mark is built from primitives with checked coordinates rather than
 * from one long hand-written path. An earlier set had a receipt whose trend
 * line ran outside the receipt and a house whose arrow started inside the wall
 * and left through it — the kind of fault that is invisible in the source and
 * obvious the moment it renders. Shapes here are simple enough that their
 * geometry can be read off the numbers: nothing overlaps a container it
 * belongs inside, and nothing sits partly outside one it does not.
 *
 * One 40×40 box, one 1.7px stroke, `currentColor` throughout, so the set reads
 * as one hand and a card can light its own mark.
 */

export type GlyphName = ConcernKey | 'generation' | 'grid' | 'export' | 'health';

const PATHS: Record<GlyphName, ReactNode> = {
  /* A bill. The line that matters is inside it, where a line on a bill is. */
  bill: (
    <>
      <rect x="11" y="6" width="18" height="28" rx="2.5" />
      <path d="M15.5 12.5h9M15.5 17.5h5.5" strokeWidth="1.4" />
      <path d="M15.5 28.5 19.5 24l3 2.5 4-4.5" strokeWidth="1.5" />
      <path d="M23.4 22h3.6v3.6" strokeWidth="1.5" />
    </>
  ),

  /* Energy leaving the house. The arrow starts clear of the roof. */
  export: (
    <>
      <path d="M5 17.5 14.5 9 24 17.5" />
      <path d="M8 19v13.5h13V19" />
      <path d="M27 25.5h8.5" />
      <path d="M32 22 35.5 25.5 32 29" />
    </>
  ),

  /* A cell, and the charge in it. */
  battery: (
    <>
      <rect x="12" y="9" width="16" height="24" rx="3" />
      <path d="M17 6h6" />
      <path d="M20 14.5 16.5 21h4l-1 5.5 4.5-6.5h-4z" strokeWidth="1.5" />
      <path d="M32 14v14" strokeWidth="1.4" />
      <path d="M29.5 24.5 32 27.5l2.5-3" strokeWidth="1.4" />
    </>
  ),

  /* A panel, and output falling away beside it. */
  performance: (
    <>
      <rect x="5" y="12" width="20" height="14" rx="1.5" />
      <path d="M11.6 12v14M18.3 12v14M5 19h20" strokeWidth="1.2" />
      <path d="M15 28v4" strokeWidth="1.4" />
      <path d="M32 13v12.5" />
      <path d="M28.6 22.1 32 25.5l3.4-3.4" />
    </>
  ),

  /* Somebody who is no longer there. */
  installer: (
    <>
      <circle cx="16.5" cy="14" r="5.5" />
      <path d="M7 33c0-5.2 4.3-9.5 9.5-9.5 1.9 0 3.7.6 5.2 1.6" />
      <path d="M26.5 24.5 34.5 32.5M34.5 24.5 26.5 32.5" strokeWidth="1.8" />
    </>
  ),

  /* Simply seeing it. */
  visibility: (
    <>
      <path d="M4 20s6-8.5 16-8.5S36 20 36 20s-6 8.5-16 8.5S4 20 4 20Z" />
      <circle cx="20" cy="20" r="4.5" />
    </>
  ),

  /* The sun, for what the roof makes. */
  generation: (
    <>
      <circle cx="20" cy="20" r="7" />
      <path d="M20 5.5v3.5M20 31v3.5M5.5 20h3.5M31 20h3.5M9.9 9.9l2.5 2.5M27.6 27.6l2.5 2.5M30.1 9.9l-2.5 2.5M12.4 27.6l-2.5 2.5" />
    </>
  ),

  /* A pylon, for what comes back off the grid. */
  grid: (
    <>
      <path d="M11 34 18.5 7M29 34 21.5 7M18.5 7h3" />
      <path d="M8.5 15.5h23M6.5 24h27" />
      <path d="M8.5 15.5v3M31.5 15.5v3M6.5 24v3M33.5 24v3" strokeWidth="1.3" />
    </>
  ),

  /* A shield with a pulse in it: the system being kept an eye on. */
  health: (
    <>
      <path d="M20 5.5 32 9.5v9.2c0 7.4-4.9 12.9-12 14.8-7.1-1.9-12-7.4-12-14.8V9.5z" />
      <path d="M12.5 19.5h3.4l2.3-4.8 2.8 8.6 2.2-3.8h4.3" strokeWidth="1.5" />
    </>
  )
};

export default function Glyph({name, className}: {name: GlyphName; className?: string}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className ?? 'h-9 w-9'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
