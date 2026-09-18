import {useRef, useState} from 'react';
import type {PointerEvent as ReactPointerEvent} from 'react';
import {
  DAY_CEILING_KW,
  EXISTING_DAY,
  IMPORT_PEAK_HOUR,
  SURPLUS_WINDOW,
  clockLabel
} from '../../../data/existing';
import {cn} from '../../../lib/cn';
import {smooth} from '../../../lib/curve';

/**
 * The day, hour by hour: what the roof made against what the house used.
 *
 * The page keeps asserting that surplus leaves the property in the afternoon
 * while the same property buys electricity back after dark. Everywhere else
 * that is a claim the reader has to take on trust. Here it is simply the two
 * shaded regions between the curves — blue where generation runs past the
 * household, amber where the household runs past generation — and the second
 * one sits four hours after the first has closed.
 *
 * The shading is the whole point, so it is done properly rather than
 * approximated. Each wash is one area clipped by the other curve's half-plane:
 * the region under the solar curve *and* above the usage curve is, by
 * construction, exactly where solar exceeds usage — including the partial hours
 * either side of a crossing, which a per-hour fill would square off and get
 * visibly wrong at dawn and dusk.
 *
 * Series identity is never colour alone: the legend is always present, the
 * tooltip names both series in text, and the full table sits below for anyone
 * who cannot see the plot at all.
 */

const VB = {w: 1200, h: 360};
const PLOT = {x0: 68, x1: 1162, y0: 46, y1: 292};
const LAST_HOUR = 23;
const TIP_W = 196;

function xOf(hour: number): number {
  return PLOT.x0 + (hour / LAST_HOUR) * (PLOT.x1 - PLOT.x0);
}

function yOf(kw: number): number {
  return PLOT.y1 - (kw / DAY_CEILING_KW) * (PLOT.y1 - PLOT.y0);
}

const SOLAR_LINE = smooth(EXISTING_DAY.map((row) => ({x: xOf(row.hour), y: yOf(row.solar)})));
const USAGE_LINE = smooth(EXISTING_DAY.map((row) => ({x: xOf(row.hour), y: yOf(row.usage)})));

/** Closed down to the baseline: everything the curve is standing on. */
const SOLAR_AREA = `${SOLAR_LINE} L ${PLOT.x1} ${PLOT.y1} L ${PLOT.x0} ${PLOT.y1} Z`;
const USAGE_AREA = `${USAGE_LINE} L ${PLOT.x1} ${PLOT.y1} L ${PLOT.x0} ${PLOT.y1} Z`;

/** Closed up to the ceiling: everything above the curve. Used as a clip. */
const ROOF = PLOT.y0 - 40;
const ABOVE_SOLAR = `${SOLAR_LINE} L ${PLOT.x1} ${ROOF} L ${PLOT.x0} ${ROOF} Z`;
const ABOVE_USAGE = `${USAGE_LINE} L ${PLOT.x1} ${ROOF} L ${PLOT.x0} ${ROOF} Z`;

const GRID_KW = [1, 2, 3];
const TICK_HOURS = [0, 6, 12, 18, 23];
const PEAK = EXISTING_DAY[IMPORT_PEAK_HOUR];

export default function DayBalance() {
  const ref = useRef<SVGSVGElement>(null);
  const [hour, setHour] = useState<number | null>(null);
  const reading = hour === null ? null : EXISTING_DAY[hour];

  function track(event: ReactPointerEvent<SVGRectElement>) {
    const svg = ref.current;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const vbX = ((event.clientX - box.left) / box.width) * VB.w;
    const next = Math.round(((vbX - PLOT.x0) / (PLOT.x1 - PLOT.x0)) * LAST_HOUR);
    setHour(Math.min(LAST_HOUR, Math.max(0, next)));
  }

  return (
    <figure className="m-0">
      <figcaption className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[12.5px] font-light text-muted">
        <Key className="bg-green" label="Made by your panels" />
        <Key className="bg-blue/40 ring-1 ring-blue" label="Surplus exported" />
        <Key className="bg-amber/45 ring-1 ring-amber" label="Bought from the grid" />
        <Key className="bg-ink" label="Used by your home" line />
        <span className="ml-auto text-faint">Average kW, hour by hour</span>
      </figcaption>

      {/* A 1200-unit viewBox squeezed onto a 320px phone renders 11px axis text
          at under 4px. The plot keeps a floor width and scrolls sideways
          instead, bleeding into the panel's padding so the affordance shows. */}
      <div className="-mx-5 overflow-x-auto px-5 min-[1060px]:mx-0 min-[1060px]:overflow-x-visible min-[1060px]:px-0">
        <div className="relative min-w-[920px]">
          <svg ref={ref} viewBox={`0 0 ${VB.w} ${VB.h}`} className="h-auto w-full" aria-hidden="true">
            <defs>
              <clipPath id="db-plot">
                <rect
                  x={PLOT.x0}
                  y={PLOT.y0 - 10}
                  width={PLOT.x1 - PLOT.x0}
                  height={PLOT.y1 - PLOT.y0 + 10}
                />
              </clipPath>
              <clipPath id="db-above-usage">
                <path d={ABOVE_USAGE} />
              </clipPath>
              <clipPath id="db-above-solar">
                <path d={ABOVE_SOLAR} />
              </clipPath>
            </defs>

            {/* The window the recommendation is about. */}
            <rect
              x={xOf(SURPLUS_WINDOW.from)}
              y={PLOT.y0}
              width={xOf(SURPLUS_WINDOW.to) - xOf(SURPLUS_WINDOW.from)}
              height={PLOT.y1 - PLOT.y0}
              fill="var(--color-blue)"
              opacity="0.05"
            />
            <text
              x={(xOf(SURPLUS_WINDOW.from) + xOf(SURPLUS_WINDOW.to)) / 2}
              y={PLOT.y0 - 16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              letterSpacing="1.4"
              fill="var(--color-blue)"
            >
              {clockLabel(SURPLUS_WINDOW.from).toUpperCase()}–
              {clockLabel(SURPLUS_WINDOW.to).toUpperCase()} · MOST SURPLUS
            </text>

            {GRID_KW.map((kw) => (
              <g key={kw}>
                <line
                  x1={PLOT.x0}
                  x2={PLOT.x1}
                  y1={yOf(kw)}
                  y2={yOf(kw)}
                  stroke="var(--color-line-2)"
                  strokeWidth="1"
                />
                <text
                  x={PLOT.x0 - 12}
                  y={yOf(kw) + 4}
                  textAnchor="end"
                  className="mono"
                  fontSize="11"
                  fill="var(--color-faint)"
                >
                  {kw === DAY_CEILING_KW ? `${kw} kW` : kw}
                </text>
              </g>
            ))}

            <line
              x1={PLOT.x0}
              x2={PLOT.x1}
              y1={PLOT.y1}
              y2={PLOT.y1}
              stroke="var(--color-line-2)"
              strokeWidth="1"
            />

            <g clipPath="url(#db-plot)">
              {/* Everything the roof produced. */}
              <path d={SOLAR_AREA} fill="var(--color-green)" opacity="0.09" />

              {/* Under solar AND above usage: the surplus that left. */}
              <path
                d={SOLAR_AREA}
                clipPath="url(#db-above-usage)"
                fill="var(--color-blue)"
                opacity="0.2"
              />

              {/* Under usage AND above solar: the electricity that was bought. */}
              <path
                d={USAGE_AREA}
                clipPath="url(#db-above-solar)"
                fill="var(--color-amber)"
                opacity="0.24"
              />

              <path
                d={SOLAR_LINE}
                fill="none"
                stroke="var(--color-green)"
                strokeWidth="2.2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d={USAGE_LINE}
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity="0.75"
              />
            </g>

            {/* Where the most electricity is bought back. */}
            <circle
              cx={xOf(PEAK.hour)}
              cy={yOf(PEAK.usage)}
              r="4"
              fill="var(--color-amber)"
              stroke="var(--color-panel)"
              strokeWidth="2"
            />
            <text
              x={xOf(PEAK.hour)}
              y={yOf(PEAK.usage) - 14}
              textAnchor="middle"
              fontSize="12"
              fill="var(--color-muted)"
            >
              Most grid import · {clockLabel(PEAK.hour)}
            </text>

            {TICK_HOURS.map((tick) => (
              <text
                key={tick}
                x={xOf(tick)}
                y={PLOT.y1 + 26}
                textAnchor={tick === 0 ? 'start' : tick === LAST_HOUR ? 'end' : 'middle'}
                className="mono"
                fontSize="11"
                fill="var(--color-faint)"
              >
                {clockLabel(tick)}
              </text>
            ))}

            {reading ? (
              <g>
                <line
                  x1={xOf(reading.hour)}
                  x2={xOf(reading.hour)}
                  y1={PLOT.y0}
                  y2={PLOT.y1}
                  stroke="var(--color-line-2)"
                  strokeWidth="1"
                />
                {/* A 2px ring in the surface colour keeps the dots legible
                    where the two curves cross each other. */}
                <circle
                  cx={xOf(reading.hour)}
                  cy={yOf(reading.solar)}
                  r="4.5"
                  fill="var(--color-green)"
                  stroke="var(--color-panel)"
                  strokeWidth="2"
                />
                <circle
                  cx={xOf(reading.hour)}
                  cy={yOf(reading.usage)}
                  r="4.5"
                  fill="var(--color-ink)"
                  stroke="var(--color-panel)"
                  strokeWidth="2"
                />
              </g>
            ) : null}

            {/* No `touch-action` override: the container scrolls sideways on a
                phone, and claiming the gesture here would trap it. */}
            <rect
              x={PLOT.x0}
              y={PLOT.y0}
              width={PLOT.x1 - PLOT.x0}
              height={PLOT.y1 - PLOT.y0}
              fill="transparent"
              onPointerMove={track}
              onPointerDown={track}
              onPointerLeave={() => setHour(null)}
              onPointerCancel={() => setHour(null)}
            />
          </svg>

          {reading ? (
            <div
              className="pointer-events-none absolute top-1 rounded-[12px] bg-panel/95 px-3.5 py-3 ring-1 ring-line-2 backdrop-blur-[10px]"
              style={{
                width: TIP_W,
                /* Clamped against the plot's own box rather than centred and
                   hoped for, so it cannot hang off either edge. */
                left: `clamp(0px, calc(${(xOf(reading.hour) / VB.w) * 100}% - ${TIP_W / 2}px), calc(100% - ${TIP_W}px))`
              }}
            >
              <div className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[.14em] text-faint">
                {clockLabel(reading.hour)}
              </div>
              <TipRow dot="bg-green" label="Made" value={`${reading.solar.toFixed(2)} kW`} />
              <TipRow dot="bg-ink" label="Used" value={`${reading.usage.toFixed(2)} kW`} />
              <div
                className={cn(
                  'mt-2.5 border-t border-line-2 pt-2.5 text-[11.5px] font-medium',
                  reading.solar > reading.usage ? 'text-blue' : 'text-amber'
                )}
              >
                {reading.solar > reading.usage
                  ? `${(reading.solar - reading.usage).toFixed(2)} kW exported`
                  : `${(reading.usage - reading.solar).toFixed(2)} kW bought`}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Everything the plot shows, for anyone who cannot see it.

          `sr-only` goes on a wrapping div rather than on the table itself. The
          utility hides an element by shrinking it to 1px and clipping the
          overflow, and a table will not shrink below its min-content width —
          so an `sr-only` table stays 400-odd pixels wide and pushes a phone
          into horizontal scroll, invisibly. A block wrapper clips properly. */}
      <div className="sr-only">
        <table>
          <caption>Solar generation and home usage, by hour, in kilowatts</caption>
          <thead>
            <tr>
              <th scope="col">Hour</th>
              <th scope="col">Made by your panels (kW)</th>
              <th scope="col">Used by your home (kW)</th>
            </tr>
          </thead>
          <tbody>
            {EXISTING_DAY.map((row) => (
              <tr key={row.hour}>
                <th scope="row">{clockLabel(row.hour)}</th>
                <td>{row.solar.toFixed(2)}</td>
                <td>{row.usage.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function Key({className, label, line}: {className: string; label: string; line?: boolean}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={cn(line ? 'h-0.5 w-4 rounded-full' : 'h-2.5 w-4 rounded-[2px]', className)} />
      {label}
    </span>
  );
}

function TipRow({dot, label, value}: {dot: string; label: string; value: string}) {
  return (
    <div className="mt-1.5 flex items-center justify-between text-[12.5px] text-muted first:mt-0">
      <span className="inline-flex items-center gap-2">
        <span className={cn('h-1.5 w-1.5 rounded-full', dot)} />
        {label}
      </span>
      <span className="mono text-ink">{value}</span>
    </div>
  );
}
