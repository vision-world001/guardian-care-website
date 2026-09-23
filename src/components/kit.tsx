import type {ReactNode} from 'react';
import Glyph, {type GlyphName} from './Glyph';
import Reveal from './Reveal';
import {TONE_TEXT, TONE_VAR, type StatusTone} from '../data/command';
import {cn} from '../lib/cn';

/* ============================================================
   The site's small parts.

   All four routes run on one ground now — the brand navy, set in `@theme`
   rather than under a class — and this is the vocabulary they share: the
   uppercase display headline with its gradient second line, the tracked mono
   label, the pill actions, the solid symbol tile and the mark's own colour
   ramp.

   Kept here rather than inside one page's folder because it is no longer one
   page's. Four routes reading from the same file is what stops them drifting
   into four products that happen to share a logo — the job `Glyph` does for
   symbols, done for type and colour.
   ============================================================ */

/* ---------- Actions ---------- */

/**
 * The page's one loud action.
 *
 * Solid brand green with a white label, and the same object on both grounds —
 * the navy hero and the light page below it — because a button that changes
 * colour halfway down a page stops reading as the same control. Hover moves
 * the fill rather than the brightness, so it lands exactly on the palette's
 * own hover value instead of somewhere near it.
 */
export const PRIMARY =
  'inline-flex items-center gap-3 rounded-pill bg-[var(--cta)] px-8 py-[17px] text-[12.5px] ' +
  'font-bold uppercase tracking-[.1em] text-[var(--cta-ink)] ' +
  'shadow-[0_16px_40px_-16px_var(--btn-glow)] transition duration-250 ease-brand ' +
  'hover:-translate-y-0.5 hover:bg-[var(--cta-hover)] ' +
  'hover:shadow-[0_24px_54px_-18px_var(--btn-glow)]';

/**
 * Everything else: an outlined mono pill that takes its colour from whichever
 * ground it is standing on, so one class works in the navy hero and on the
 * white page without a second variant.
 */
export const SECONDARY =
  'mono inline-flex items-center gap-2.5 rounded-pill border border-line-2 px-6 py-[15px] ' +
  'text-[11px] font-semibold uppercase tracking-[.12em] text-ink transition duration-200 ' +
  'hover:border-green/60 hover:text-green';

/* ---------- Type ---------- */

/**
 * The small tracked label that names a panel, a figure or a section.
 *
 * `cn` joins classes rather than resolving them, so a caller that wants its own
 * size or tracking starts from `LABEL_BASE` instead of overriding `LABEL` —
 * two competing `text-[…]` classes would be settled by stylesheet order, not by
 * which one was written last.
 */
export const LABEL_BASE = 'mono font-semibold uppercase';

export const LABEL = `${LABEL_BASE} text-[11.5px] tracking-[.13em]`;

/**
 * A section's opening: a mono eyebrow, the two-line uppercase headline with its
 * second line in the gradient, and one paragraph. The same shape every home
 * page section opens with, so the two pages share a rhythm as well as a palette.
 *
 * The eyebrow is green because the mark is. Measured off the logo, the artwork
 * is 59% navy and blue and 33% green; the gold is 1.7% of it — a flare where
 * the G crosses the C, not a brand colour. An amber eyebrow opening every
 * section on all four pages made the site's most repeated accent the one thing
 * the logo barely contains. Amber is still here, as the status tone for
 * *review*, which is the job it can do honestly.
 */
export function Heading({
  eyebrow,
  title,
  accent,
  body,
  align = 'center',
  spacing = 'mb-14'
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  body?: ReactNode;
  align?: 'center' | 'left';
  /** The gap to what follows. Replaced rather than added to — see `LABEL`. */
  spacing?: string;
}) {
  const centred = align === 'center';

  return (
    <Reveal className={cn('max-w-[740px]', spacing, centred && 'mx-auto text-center')}>
      {eyebrow ? (
        <div className={cn(LABEL_BASE, 'mb-5 text-[11px] tracking-[.12em] text-green')}>{eyebrow}</div>
      ) : null}

      <h2 className="font-display text-[clamp(30px,4.6vw,54px)] font-semibold uppercase leading-[0.98] tracking-[-0.015em] text-ink">
        {title}
        {accent ? (
          <>
            <br />
            <span className="text-brand-gradient">{accent}</span>
          </>
        ) : null}
      </h2>

      {body ? (
        <p
          className={cn(
            'mt-6 max-w-[560px] text-[16.5px] font-light leading-[1.65] text-muted',
            centred && 'mx-auto'
          )}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ---------- Colour ---------- */

/** A tone at low strength, for tile borders, fills and washes. */
export function tint(colour: string, percent: number): string {
  return `color-mix(in srgb, ${colour} ${percent}%, transparent)`;
}

/**
 * A point on the mark's own ramp, resolved by the browser.
 *
 * The same ramp the home page's record diagram runs down its seven stages, so
 * wherever this page draws a sequence it is lit in the same order. Mixed in
 * OKLab so the midpoints stay saturated.
 *
 * The far end is a token rather than `--logo-pale` because these are fills
 * with type cut out of them. On the navy ground the sequence runs pale into
 * green into blue and the type on it is the ground's own navy; invert the
 * page and that pale end still carries near-white text at about 1.2:1 — the
 * stage simply goes blank. On the day theme it becomes the deep bronze at the
 * other end of the same warm hue, so the sequence keeps its shape and every
 * stage in it keeps its label.
 */
export function ramp(index: number, count: number): string {
  const t = count > 1 ? index / (count - 1) : 0;
  if (t <= 0.5) {
    return `color-mix(in oklab, var(--ramp-mid) ${Math.round((t / 0.5) * 100)}%, var(--ramp-far))`;
  }
  return `color-mix(in oklab, var(--color-blue) ${Math.round(((t - 0.5) / 0.5) * 100)}%, var(--ramp-mid))`;
}

/* ---------- Symbols ---------- */

const TILE_SIZE = {
  sm: 'h-9 w-9 rounded-tile',
  md: 'h-11 w-11 rounded-tile',
  lg: 'h-14 w-14 rounded-card'
} as const;

/**
 * A symbol cut out of a solid tile of its own colour — the home page's record
 * treatment. `colour` takes a palette tone or any CSS colour, so a tile can sit
 * on the brand ramp as easily as on a reading's own tone.
 */
export function Tile({
  tone,
  colour,
  size = 'md',
  className,
  children
}: {
  tone?: StatusTone;
  colour?: string;
  size?: keyof typeof TILE_SIZE;
  className?: string;
  children: ReactNode;
}) {
  /* Green when nothing says otherwise — the brand's colour, not a status. */
  const fill = colour ?? TONE_VAR[tone ?? 'green'];

  return (
    <span
      className={cn('grid shrink-0 place-items-center text-bg', TILE_SIZE[size], className)}
      style={{
        background: fill,
        boxShadow: `0 8px 22px -10px ${tint(fill, 80)}, inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -1px 0 rgba(0,0,0,0.2)`
      }}
    >
      {children}
    </span>
  );
}

/** A dotted vertical rail, crawling downward — the home page's connector. */
export function dottedRail(colour: string) {
  return {
    backgroundImage: `linear-gradient(180deg, ${colour} 0 2px, transparent 2px)`,
    backgroundSize: '2px 10px',
    backgroundRepeat: 'repeat-y',
    animation: 'rail-crawl-y 2.6s linear infinite'
  };
}

/* ---------- Readouts ---------- */

/**
 * A figure set at display size with its unit held small beside it.
 *
 * Every number on these pages is money, kilowatt-hours or a count, and they are
 * constantly next to each other. Typesetting them identically is what stops a
 * reader having to work out which is which every time.
 */
export function Figure({
  value,
  unit,
  tone = 'ink',
  size = 'md',
  className
}: {
  value: ReactNode;
  unit?: string;
  tone?: StatusTone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const scale = {
    sm: 'text-[clamp(20px,2.4vw,26px)]',
    md: 'text-[clamp(28px,3.4vw,38px)]',
    lg: 'text-[clamp(38px,6vw,58px)]'
  }[size];

  return (
    <div className={cn('mono font-semibold leading-none', scale, TONE_TEXT[tone], className)}>
      {value}
      {unit ? (
        <span className="mono ml-1.5 text-[12px] font-normal tracking-normal text-faint">
          {unit}
        </span>
      ) : null}
    </div>
  );
}

/* ---------- Panels ---------- */

/**
 * The site's one card shape: a lit rim, a titled bar, and whatever the section
 * is actually showing beneath it.
 *
 * Declared once so that four pages and forty sections cannot each arrive at a
 * slightly different corner, border and header height — the same job `Glyph`
 * does for symbols and `Heading` does for section openings.
 */
export function Panel({
  title,
  tone = 'green',
  aside,
  glyph,
  className,
  bodyClassName,
  children
}: {
  title: ReactNode;
  tone?: StatusTone;
  /** The right-hand side of the title bar — a badge, a caption, a status. */
  aside?: ReactNode;
  glyph?: GlyphName;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    /* A flex column, so a panel told to fill its row actually can.

       It used to be a plain block. A caller wanting a full-height card wrote
       `className="h-full"` here and `h-full` on the body — and the body's
       100% then resolved against the *whole* card, title bar included, so it
       overflowed the bottom by exactly the height of that bar. On the
       business page that pushed the customer panel's footer clean out of its
       own card.

       As a column with a `flex-1` body, `h-full` on the card is all a caller
       needs: the bar takes its height, the body takes the rest. */
    <div className={cn('glass ring-lit flex flex-col overflow-hidden rounded-frame', className)}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line-2 px-5 py-3.5 min-[520px]:px-6">
        <span className={cn(LABEL, 'flex items-center gap-2.5', TONE_TEXT[tone])}>
          {glyph ? <Glyph name={glyph} className="h-4 w-4" /> : <span aria-hidden="true">&#9671;</span>}
          {title}
        </span>
        {aside ? <span className="ml-auto shrink-0">{aside}</span> : null}
      </div>
      <div className={cn('flex-1 px-5 py-6 min-[520px]:px-6', bodyClassName)}>{children}</div>
    </div>
  );
}

/** The caption a title bar carries on its right: quiet, mono, never a claim. */
export function Caption({children}: {children: ReactNode}) {
  return <span className="mono text-[11px] uppercase tracking-[.12em] text-faint">{children}</span>;
}
