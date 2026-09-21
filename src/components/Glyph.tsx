import type {ReactNode} from 'react';
import {cn} from '../lib/cn';

/**
 * One hand, drawn once, used on every journey.
 *
 * The three journeys ask the same reader to recognise the same six quantities —
 * generation, consumption, storage, export, import, cost — on a homeowner's
 * dashboard, on a planner's estimate and on an operator's console. If each page
 * drew its own picture of a battery, the platform would read as three products
 * that happen to share a logo.
 *
 * Every mark is built from primitives with checked coordinates rather than from
 * one long hand-written path, because a path that is wrong is invisible in the
 * source and obvious the moment it renders. Nothing here overlaps a container it
 * belongs inside, and nothing sits partly outside one it does not.
 *
 * One 40×40 box, one 1.7px stroke, `currentColor` throughout, so a card can
 * light its own mark from whatever tone it is already wearing.
 */

export type GlyphName =
  /* The six quantities. */
  | 'generation'
  | 'consumption'
  | 'storage'
  | 'export'
  | 'import'
  | 'cost'
  /* The thing on the other side of the meter. */
  | 'grid'
  /* The box between the roof and the house. */
  | 'inverter'
  /* The three doors. */
  | 'solarRoof'
  | 'savings'
  | 'existing'
  | 'plan'
  | 'business'
  /* Everything the journeys ask about or report on. */
  | 'tool'
  | 'connect'
  | 'monitoring'
  | 'fit'
  | 'insight'
  | 'health'
  | 'tariff'
  | 'goal'
  | 'property'
  | 'question'
  | 'acquire'
  | 'capture'
  | 'retain'
  | 'portfolio';

const PATHS: Record<GlyphName, ReactNode> = {
  /* The sun, for what the roof makes. */
  generation: (
    <>
      <circle cx="20" cy="20" r="7" />
      <path d="M20 5.5v3.5M20 31v3.5M5.5 20h3.5M31 20h3.5M9.9 9.9l2.5 2.5M27.6 27.6l2.5 2.5M30.1 9.9l-2.5 2.5M12.4 27.6l-2.5 2.5" />
    </>
  ),

  /* A house with its windows lit — a building somebody is using. */
  consumption: (
    <>
      <path d="M5 19.5 20 7l15 12.5" />
      <path d="M9.5 18v15h21V18" />
      <rect x="17" y="25" width="6" height="8" rx="1" />
      <path d="M12.5 21.5h3.5M24 21.5h3.5" strokeWidth="1.4" />
    </>
  ),

  /* A cell, and the charge in it. */
  storage: (
    <>
      <rect x="12" y="9" width="16" height="24" rx="3" />
      <path d="M17 6h6" />
      <path d="M20.5 14.5 17 21h4l-1 5.5 4.5-6.5h-4z" strokeWidth="1.5" />
      <path d="M32 15v12" strokeWidth="1.4" />
      <path d="M8 15v12" strokeWidth="1.4" />
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

  /* The same house, with the arrow pointing back in. */
  import: (
    <>
      <path d="M16 17.5 25.5 9 35 17.5" />
      <path d="M19 19v13.5h13V19" />
      <path d="M4.5 25.5H13" />
      <path d="M9.5 22 13 25.5 9.5 29" />
    </>
  ),

  /* A bill. The line that matters is inside it, where a line on a bill is. */
  cost: (
    <>
      <rect x="11" y="6" width="18" height="28" rx="2.5" />
      <path d="M15.5 12.5h9M15.5 17.5h5.5" strokeWidth="1.4" />
      <path d="M15.5 28.5 19.5 24l3 2.5 4-4.5" strokeWidth="1.5" />
      <path d="M23.4 22h3.6v3.6" strokeWidth="1.5" />
    </>
  ),

  /* A transmission tower. Nothing else says "the grid" this fast — and the
     export mark beside it is a house, so without this the network and the
     property would be wearing the same building. */
  grid: (
    <>
      <path d="M10 34 17.5 7M30 34 22.5 7M17.5 7h5" />
      <path d="M7.5 15.5h25M5.5 24h29" />
      <path d="M7.5 15.5v3M32.5 15.5v3M5.5 24v3M34.5 24v3" strokeWidth="1.3" />
      <path d="M13.5 26.5h13M13.5 26.5 25 34M26.5 26.5 15 34" strokeWidth="1.2" />
    </>
  ),

  /* The electrician's symbol for an inverter: a box split on the diagonal,
     direct current in the upper corner and a sine wave in the lower. The two
     marks sit either side of the diagonal without touching it. */
  inverter: (
    <>
      <rect x="8" y="6" width="24" height="28" rx="3" />
      <path d="M10.5 31.5 29.5 8.5" strokeWidth="1.3" />
      <path d="M12.5 13h7" strokeWidth="1.4" />
      <path d="M12.5 16.5h2.5M17 16.5h2.5" strokeWidth="1.4" />
      <path d="M20.5 26c1.2-2.4 2.8-2.4 4 0s2.8 2.4 4 0" strokeWidth="1.4" />
    </>
  ),

  /* A house whose roof *is* the array.
     ------------------------------------------------------------
     For "I already have solar". The earlier mark put a clock beside a roof and
     asked the reader to assemble "an existing system" out of the two; at 32px
     that is a roof and a smudge. Making the panel the roof means there is
     nothing to assemble — the whole silhouette says it at a glance, and the
     cell lines are drawn to meet the pitch exactly rather than being ruled
     across it. */
  solarRoof: (
    <>
      <path d="M20 6 37 21H3Z" />
      <path d="M11.5 21v-7.5M20 21V6M28.5 21v-7.5" strokeWidth="1.3" />
      <path d="M6.4 18h27.2" strokeWidth="1.3" />
      <path d="M7 21v13h26V21" />
      <path d="M16.5 34v-7.5h7V34" strokeWidth="1.4" />
    </>
  ),

  /* Cost coming down.
     ------------------------------------------------------------
     For "I want to spend less on electricity". Three bars shortening left to
     right, plus the arrow — two channels saying the same thing, because a bar
     chart alone is read as "data" and an arrow alone is read as "down". */
  savings: (
    <>
      <path d="M5 33V15h6v18" />
      <path d="M13.5 33V21h6v12" />
      <path d="M22 33v-6h6v6" />
      <path d="M3.5 33.5h26" strokeWidth="1.3" />
      <path d="M33 13v14" />
      <path d="M29.5 23.5 33 27l3.5-3.5" />
    </>
  ),

  /* A roof that already carries an array, with a clock on it: solar plus time. */
  existing: (
    <>
      <path d="M4 21 18 9.5 32 21" />
      <path d="M8 19.5V33h20V19.5" strokeWidth="1.4" />
      <path d="M12 24.5h12M18 20v13" strokeWidth="1.2" />
      <circle cx="30" cy="29.5" r="6.5" />
      <path d="M30 26v3.8l2.4 1.6" strokeWidth="1.4" />
    </>
  ),

  /* An empty roof and a panel arriving on it: the system that is not there yet. */
  plan: (
    <>
      <path d="M4 22 17 10.5 30 22" />
      <path d="M8 20.5V33h18V20.5" strokeWidth="1.4" />
      <rect x="21" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M26 4.5v11M31 4.5v11M21 10h15" strokeWidth="1.2" />
      <path d="M13 27h8" strokeWidth="1.4" />
    </>
  ),

  /* Three buildings: a portfolio rather than a property. */
  business: (
    <>
      <path d="M5 34V16l8-5v23" />
      <path d="M13 34V20h10v14" />
      <path d="M23 34V12l8 5v17" />
      <path d="M4 34h32" />
      <path d="M16.5 24.5h3M16.5 29h3M26 21.5h2M26 26h2" strokeWidth="1.3" />
    </>
  ),

  /* A spanner. For the stage where something about the installation actually
     changes — as opposed to the stage where it is watched. */
  tool: (
    <>
      <path d="M26.9 6.3a9.7 9.7 0 0 0-11.4 12.6L6.9 27.4a3.7 3.7 0 0 0 5.4 5.4l8.6-8.6a9.7 9.7 0 0 0 12.6-11.4l-5.7 5.7-5.4-1.4-1.4-5.4z" />
    </>
  ),

  /* Two links closing. The hinge of the whole lifecycle: before it the platform
     is estimating, after it the platform is reading. */
  connect: (
    <>
      <path d="M16.8 23.2a6 6 0 0 1 0-8.4l4.6-4.6a6 6 0 0 1 8.4 8.4l-2.4 2.4" />
      <path d="M23.2 16.8a6 6 0 0 1 0 8.4l-4.6 4.6a6 6 0 0 1-8.4-8.4l2.4-2.4" />
    </>
  ),

  /* A meter with a clamp around the line running into it. */
  monitoring: (
    <>
      <circle cx="20" cy="18" r="10.5" />
      <path d="M20 18 25 13" strokeWidth="1.5" />
      <path d="M13.5 18a6.5 6.5 0 0 1 13 0" strokeWidth="1.3" />
      <path d="M11 31.5h18" />
      <path d="M14.5 31.5v4M25.5 31.5v4" strokeWidth="1.4" />
    </>
  ),

  /* A generation dial, and the payment it earns beside it. */
  fit: (
    <>
      <path d="M4.5 25a12 12 0 0 1 23 0" />
      <path d="M16 25 22 16" strokeWidth="1.5" />
      <path d="M4.5 25h23" strokeWidth="1.3" />
      <circle cx="30" cy="12" r="6" />
      <path d="M30 9.2v5.6M28.3 10.6h3.4M28.3 13.4h3.4" strokeWidth="1.3" />
    </>
  ),

  /* A reading that has been understood: a chart inside a thinking frame. */
  insight: (
    <>
      <path d="M20 5a10 10 0 0 0-5.5 18.3V28h11v-4.7A10 10 0 0 0 20 5Z" />
      <path d="M16 31.5h8M17.5 34.5h5" strokeWidth="1.4" />
      <path d="M16.5 20.5 19 17l2.5 2.5 3-4.5" strokeWidth="1.4" />
    </>
  ),

  /* A shield with a pulse in it: the system being kept an eye on. */
  health: (
    <>
      <path d="M20 5.5 32 9.5v9.2c0 7.4-4.9 12.9-12 14.8-7.1-1.9-12-7.4-12-14.8V9.5z" />
      <path d="M12.5 19.5h3.4l2.3-4.8 2.8 8.6 2.2-3.8h4.3" strokeWidth="1.5" />
    </>
  ),

  /* A rate card: what one unit costs, and what it is worth going the other way. */
  tariff: (
    <>
      <rect x="5" y="9" width="30" height="22" rx="2.5" />
      <path d="M5 16h30" strokeWidth="1.3" />
      <path d="M10.5 22h7M10.5 26.5h11" strokeWidth="1.4" />
      <path d="M22.5 21.5h8" strokeWidth="1.4" />
      <path d="M28 19 30.5 21.5 28 24" strokeWidth="1.4" />
      <path d="M30.5 26.5h-8" strokeWidth="1.4" />
      <path d="M25 24 22.5 26.5 25 29" strokeWidth="1.4" />
    </>
  ),

  /* A target with something already in it. */
  goal: (
    <>
      <circle cx="19" cy="21" r="13" />
      <circle cx="19" cy="21" r="7" />
      <circle cx="19" cy="21" r="1.6" fill="currentColor" stroke="none" />
      <path d="M19 21 33 7" strokeWidth="1.5" />
      <path d="M28.5 7h5v5" strokeWidth="1.5" />
    </>
  ),

  /* A plan of a building rather than a picture of one. */
  property: (
    <>
      <path d="M6 34V13.5L20 5l14 8.5V34" />
      <path d="M6 34h28" />
      <path d="M20 34V22M20 22h9M11 22h4" strokeWidth="1.3" />
      <path d="M13.5 27.5h3" strokeWidth="1.3" />
    </>
  ),

  /* Somebody asking. */
  question: (
    <>
      <path d="M6 10.5A3.5 3.5 0 0 1 9.5 7h21a3.5 3.5 0 0 1 3.5 3.5v13a3.5 3.5 0 0 1-3.5 3.5H17l-8 6v-6A3.5 3.5 0 0 1 6 23.5z" />
      <path d="M16.8 15.2a3.3 3.3 0 0 1 6.4 1.1c0 2.2-3.2 2.6-3.2 4.4" strokeWidth="1.5" />
      <path d="M20 23.4h.01" strokeWidth="1.8" />
    </>
  ),

  /* A funnel: many arriving, one route through. */
  acquire: (
    <>
      <path d="M5 7h30L23.5 20v13L16.5 29V20z" />
      <path d="M11.5 12.5h17" strokeWidth="1.3" />
    </>
  ),

  /* A clipboard, filled in on site. */
  capture: (
    <>
      <path d="M14 8H10a2.5 2.5 0 0 0-2.5 2.5v21A2.5 2.5 0 0 0 10 34h20a2.5 2.5 0 0 0 2.5-2.5v-21A2.5 2.5 0 0 0 30 8h-4" />
      <rect x="14" y="5" width="12" height="6" rx="2" />
      <path d="M13.5 20.5 16 23l5-5.5" strokeWidth="1.5" />
      <path d="M13.5 28h13" strokeWidth="1.4" />
    </>
  ),

  /* A cycle that closes rather than a line that ends. */
  retain: (
    <>
      <path d="M33 20a13 13 0 1 1-4.6-9.9" />
      <path d="M33 5.5V12h-6.5" />
      <path d="M20 13.5V20l4.5 3" strokeWidth="1.4" />
    </>
  ),

  /* Many systems seen at once. */
  portfolio: (
    <>
      <rect x="5" y="7" width="12" height="12" rx="2" />
      <rect x="23" y="7" width="12" height="12" rx="2" />
      <rect x="5" y="23" width="12" height="12" rx="2" />
      <rect x="23" y="23" width="12" height="12" rx="2" />
      <path d="M8.5 13.5h5M26.5 13.5h5M8.5 29.5h5" strokeWidth="1.3" />
      <path d="M26.5 31.5 28.8 29l2.2 2 1.5-2.5" strokeWidth="1.4" />
    </>
  )
};

/**
 * `bold` is for a mark set inside a solid tile.
 *
 * At its native 1.7 the stroke renders at about a pixel once the mark is drawn
 * at 24px, and many details carry their own finer width (1.3–1.5) on top of
 * that — fine for a line icon on a dark ground, faint and hard to read as a
 * dark mark cut into a coloured tile. The override is a CSS rule on every
 * descendant rather than a new default on the <svg>, because CSS beats SVG
 * presentation attributes: it reaches the fine details too, and gives the
 * whole mark one even weight.
 */
export default function Glyph({
  name,
  className,
  bold
}: {
  name: GlyphName;
  className?: string;
  bold?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn(className ?? 'h-9 w-9', bold && '[&_*]:[stroke-width:2.4]')}
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
