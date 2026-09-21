import type {ReactNode} from 'react';
import {TONE_TEXT, TONE_VAR, type StatusTone} from '../../../data/command';
import {cn} from '../../../lib/cn';

/* ============================================================
   The planning journey's own vocabulary.

   One idea, drawn the same way in four places: a kilowatt-hour is a square,
   and the only question this entire page asks is where each square came from.

   The motif is introduced in the hero as ten hollow squares — every unit the
   property uses is bought — and then answered section by section. Six of them
   fill in when solar arrives. Five more change colour when a battery does. By
   the time a reader reaches the estimate they have watched the same row of
   squares change three times, and the arithmetic underneath it needs no
   explanation, which is the whole reason for drawing it rather than saying it.
   ============================================================ */

/* ---------- Kilowatt-hours ---------- */

/**
 * `hollow` is the load-bearing distinction, not the colour.
 *
 * Solid means the property generated it; hollow means the property bought it.
 * That reads at a glance and survives both colour blindness and a phone in
 * sunlight, which no pair of hues on this palette reliably does — so the fill
 * carries the meaning and the tone only says which kind of unit it is.
 */
export type Segment = {
  tone: StatusTone;
  count: number;
  label?: string;
  hollow?: boolean;
};

export function Units({
  segments,
  /** Pads the row out to a fixed width, so two rows of different totals align. */
  pad,
  className
}: {
  segments: Segment[];
  pad?: number;
  className?: string;
}) {
  const filled = segments.reduce((total, segment) => total + segment.count, 0);
  const columns = Math.max(pad ?? 0, filled);

  const cells: ReactNode[] = [];

  for (const segment of segments) {
    const colour = TONE_VAR[segment.tone];

    for (let index = 0; index < segment.count; index += 1) {
      cells.push(
        <span
          key={`${segment.tone}-${segment.label ?? ''}-${index}`}
          className="block aspect-square rounded-tile"
          style={
            segment.hollow
              ? {
                  /* A bought unit is an outline: present in the total, and
                     owned by somebody else. The rim is an inset shadow rather
                     than a border so it can run at 1.5px — a hairline round a
                     44px square reads as an empty box on a dark page, which is
                     the opposite of what a unit you are paying for should
                     look like. */
                  boxShadow: `inset 0 0 0 1.5px color-mix(in srgb, ${colour} 72%, transparent)`,
                  background: `color-mix(in srgb, ${colour} 15%, transparent)`
                }
              : {
                  background: colour,
                  boxShadow: `0 4px 14px -6px color-mix(in srgb, ${colour} 75%, transparent), inset 0 1px 0 rgba(255,255,255,0.32)`
                }
          }
        />
      );
    }
  }

  /* Empty slots keep a shorter row the same width as the one above it. Drawn
     at almost nothing rather than omitted: a row that simply stops is read as
     a smaller total, which is the opposite of what a padded row means. */
  for (let index = filled; index < columns; index += 1) {
    cells.push(
      <span
        key={`pad-${index}`}
        className="block aspect-square rounded-tile border border-dashed border-line-2"
      />
    );
  }

  return (
    <div
      className={cn('grid gap-[3px] min-[520px]:gap-1.5', className)}
      style={{gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`}}
      aria-hidden="true"
    >
      {cells}
    </div>
  );
}

/** The key beneath a row of units. One line, read left to right like the row. */
export function UnitKey({segments, className}: {segments: Segment[]; className?: string}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {segments
        .filter((segment) => segment.label && segment.count > 0)
        .map((segment) => (
          <li key={segment.label} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="block h-2.5 w-2.5 shrink-0 rounded-[2px]"
              style={
                segment.hollow
                  ? {
                      border: `1px solid color-mix(in srgb, ${TONE_VAR[segment.tone]} 75%, transparent)`,
                      background: `color-mix(in srgb, ${TONE_VAR[segment.tone]} 16%, transparent)`
                    }
                  : {background: TONE_VAR[segment.tone]}
              }
            />
            <span className={cn('mono text-[11.5px] font-semibold', TONE_TEXT[segment.tone])}>
              {segment.count}
            </span>
            <span className="text-[12.5px] font-light leading-none text-muted">
              {segment.label}
            </span>
          </li>
        ))}
    </ul>
  );
}

/* ---------- Borrowed from the command surface ---------- */

/**
 * Re-exported rather than re-declared. The figure, the panel and its caption
 * are the whole command surface's vocabulary now that the business console
 * draws with them too, so they live in `components/kit` — and the five
 * sections of this page that already import them from here should not have to
 * care that they moved.
 */
export {Caption, Figure, Panel} from '../../../components/kit';
