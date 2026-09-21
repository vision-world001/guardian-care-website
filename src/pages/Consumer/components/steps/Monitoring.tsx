import type {ReactNode} from 'react';
import Glyph, {type GlyphName} from '../../../../components/Glyph';
import type {StatusTone} from '../../../../data/command';
import {cn} from '../../../../lib/cn';
import Conduit, {LiveDot} from '../../../Home/components/Conduit';
import {Tile} from '../../../../components/kit';

/**
 * Step 03: what connecting actually means.
 *
 * Four objects and the lines between them, with the one piece of hardware
 * marked where it sits. A household asked to let somebody "connect monitoring"
 * wants to know two things — what goes where, and whether anything about the
 * system changes — so the drawing answers the first and the strip under it
 * answers the second.
 *
 * The labels are positioned off the tiles rather than stacked under them. The
 * conduits join tile centre to tile centre; a label in the flow would push each
 * node's middle down by half a line and leave every connector visibly off
 * true.
 */

const PROMISES = [
  'Fitted only where suitable',
  'Works with compatible monitoring',
  'Nothing about your system changes'
];

export default function Monitoring() {
  return (
    <div className="glass shadow-lift ring-lit overflow-hidden rounded-frame">
      <div className="px-4 pb-10 pt-12 min-[520px]:px-9">
        {/* The roof, and generation coming down into the house. Centred rather
            than placed in a grid column: the row beneath is symmetric, so the
            house sits exactly on the centre line. */}
        <div className="flex flex-col items-center">
          <Node glyph="generation" tone="amber" label="Solar" labelAbove />
          <Conduit direction="down" tone="amber" className="h-12" />
        </div>

        <div className="mx-auto grid max-w-[460px] grid-cols-[auto_minmax(20px,1fr)_auto_minmax(20px,1fr)_auto] items-center">
          <Node glyph="storage" tone="purple" label="Battery" />
          <Conduit direction="right" tone="purple" delay={-1.2} />
          <Node glyph="consumption" tone="ink" label="Home" />
          <div className="relative">
            <Conduit direction="right" tone="blue" delay={-0.6} />
            <Clamp />
          </div>
          <Node glyph="grid" tone="blue" label="Grid" />
        </div>

        <p className="mono mt-12 flex items-center justify-center gap-2.5 text-[9.5px] font-semibold uppercase tracking-[.14em] text-green min-[520px]:hidden">
          <span aria-hidden="true" className="block h-3 w-3 rounded-full border-2 border-green" />
          CT clamp, on the line to the grid
        </p>
      </div>

      {/* Estimates → readings, in one line. */}
      <div className="mono flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-line-2 bg-bg/40 px-6 py-4 text-[10.5px] font-semibold uppercase tracking-[.16em]">
        <span className="text-amber">Estimated</span>
        <span aria-hidden="true" className="text-faint">
          →
        </span>
        <span className="inline-flex items-center gap-2 text-green">
          <LiveDot />
          Actual system behaviour
        </span>
      </div>

      <ul className="grid gap-px border-t border-line-2 bg-line-2 min-[620px]:grid-cols-3">
        {PROMISES.map((line) => (
          <li
            key={line}
            className="flex items-start gap-2.5 bg-panel px-5 py-4 text-[13.5px] font-light leading-[1.45] text-ink/85"
          >
            <svg
              viewBox="0 0 12 12"
              className="mt-[3px] h-3.5 w-3.5 shrink-0 text-green"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 6.2 4.8 9 10 3.2" />
            </svg>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Node({
  glyph,
  tone,
  label,
  labelAbove
}: {
  glyph: GlyphName;
  tone: StatusTone;
  label: ReactNode;
  labelAbove?: boolean;
}) {
  return (
    <div className="relative flex justify-center">
      <Tile tone={tone} size="lg">
        <Glyph name={glyph} bold className="h-7 w-7" />
      </Tile>
      <span
        className={cn(
          'mono absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[.16em] text-muted',
          labelAbove ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
        )}
      >
        {label}
      </span>
    </div>
  );
}

/** The CT clamp, where it actually sits: on the line between house and grid. */
function Clamp() {
  return (
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <span
        aria-hidden="true"
        className="block h-4 w-4 rounded-full border-2 border-green bg-bg"
        style={{boxShadow: '0 0 0 4px color-mix(in srgb, var(--color-green) 14%, transparent)'}}
      />
      {/* On a phone the connector is shorter than the label, so the label moves
          into a legend under the diagram instead of sitting across two tiles. */}
      <span className="mono absolute bottom-full left-1/2 mb-2.5 hidden -translate-x-1/2 whitespace-nowrap text-[9.5px] font-semibold uppercase tracking-[.14em] text-green min-[520px]:block">
        CT clamp
      </span>
    </span>
  );
}
