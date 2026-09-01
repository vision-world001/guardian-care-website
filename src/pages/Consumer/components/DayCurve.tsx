import {useRef, useState} from 'react';
import type {PointerEvent as ReactPointerEvent} from 'react';
import {DAY, DAY_CEILING_KW, SURPLUS_WINDOW, clockLabel} from '../../../data/energyDay';
import {cn} from '../../../lib/cn';
import {smooth} from '../../../lib/curve';

/**
 * The day, hour by hour: what the roof made against what the house used.
 *
 * The page keeps telling the reader to run the dishwasher between 1pm and 3pm.
 * Everywhere else that is an assertion they have to take on trust; here it is
 * simply the widest part of the gap, shaded, with the evening demand peak
 * labelled four hours after the sun has gone. The mismatch between when solar
 * arrives and when a household actually uses power is the one fact that
 * explains a solar owner's bill, and it cannot be argued into someone — it has
 * to be seen.
 *
 * Generation carries the area fill because it is the quantity; usage stays a
 * bare line, because two washes stacked on a dark ground turn to mud where they
 * cross. Series identity is never colour alone: the legend is always present,
 * the tooltip names both series in text, and the full table sits below.
 *
 * On the palette: the brand green and blue clear every legibility check for a
 * two-series categorical pair against this surface — CVD separation ΔE 25.6,
 * normal-vision ΔE 27.0, contrast above 3:1. They sit above the usual dark-mode
 * lightness band because the Guardian Care ramp is a bright one; matching the
 * rest of the site matters more than the band, and every check that governs
 * whether two series can be told apart passes comfortably.
 */

const VB = {w: 1200, h: 340};
const PLOT = {x0: 70, x1: 1160, y0: 40, y1: 280};
const LAST_HOUR = 23;
const TIP_W = 186;

function xOf(hour: number): number {
  return PLOT.x0 + (hour / LAST_HOUR) * (PLOT.x1 - PLOT.x0);
}

function yOf(kw: number): number {
  return PLOT.y1 - (kw / DAY_CEILING_KW) * (PLOT.y1 - PLOT.y0);
}

const SOLAR_LINE = smooth(DAY.map((r) => ({x: xOf(r.hour), y: yOf(r.solar)})));
const USAGE_LINE = smooth(DAY.map((r) => ({x: xOf(r.hour), y: yOf(r.usage)})));
const SOLAR_AREA = `${SOLAR_LINE} L ${PLOT.x1} ${PLOT.y1} L ${PLOT.x0} ${PLOT.y1} Z`;

const GRID_KW = [1, 2, 3];
const TICK_HOURS = [0, 6, 12, 18, 23];

/** Where demand peaks — deliberately the only figure labelled on the plot. */
const DEMAND_PEAK = DAY.reduce((best, row) => (row.usage > best.usage ? row : best), DAY[0]);

export default function DayCurve() {
  const ref = useRef<SVGSVGElement>(null);
  const [hour, setHour] = useState<number | null>(null);
  const reading = hour === null ? null : DAY[hour];

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
        <span className="inline-flex items-center gap-2.5">
          <span className="h-2.5 w-4 rounded-[2px] bg-green/35 ring-1 ring-green" />
          Made by your panels
        </span>
        <span className="inline-flex items-center gap-2.5">
          <span className="h-0.5 w-4 rounded-full bg-blue" />
          Used by your home
        </span>
        <span className="ml-auto text-faint">Average kW, hour by hour</span>
      </figcaption>

      {/* A 900-unit viewBox squeezed onto a 320px phone renders 11px axis text
          at under 4px. The plot keeps a floor width and scrolls sideways
          instead, bleeding into the panel's padding so the affordance shows.
          The positioning context is the inner element, so the tooltip travels
          with the chart rather than with the viewport when it is scrolled. */}
      <div className="-mx-5 overflow-x-auto px-5 min-[1000px]:mx-0 min-[1000px]:overflow-x-visible min-[1000px]:px-0">
        <div className="relative min-w-[900px]">
          <svg
            ref={ref}
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="h-auto w-full"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="dc-plot">
                <rect
                  x={PLOT.x0}
                  y={PLOT.y0 - 8}
                  width={PLOT.x1 - PLOT.x0}
                  height={PLOT.y1 - PLOT.y0 + 8}
                />
              </clipPath>
            </defs>

            {/* The recommendation, drawn. */}
            <rect
              x={xOf(SURPLUS_WINDOW.from)}
              y={PLOT.y0}
              width={xOf(SURPLUS_WINDOW.to) - xOf(SURPLUS_WINDOW.from)}
              height={PLOT.y1 - PLOT.y0}
              fill="var(--color-green)"
              opacity="0.07"
            />
            <text
              x={(xOf(SURPLUS_WINDOW.from) + xOf(SURPLUS_WINDOW.to)) / 2}
              y={PLOT.y0 - 12}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              letterSpacing="1.4"
              fill="var(--color-green)"
            >
              {clockLabel(SURPLUS_WINDOW.from).toUpperCase()}
              {'–'}
              {clockLabel(SURPLUS_WINDOW.to).toUpperCase()}
              {' · BIGGEST SURPLUS'}
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

            <g clipPath="url(#dc-plot)">
              <path d={SOLAR_AREA} fill="var(--color-green)" opacity="0.1" />
              <path
                d={SOLAR_LINE}
                fill="none"
                stroke="var(--color-green)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d={USAGE_LINE}
                fill="none"
                stroke="var(--color-blue)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>

            {/* The evening peak: four hours after the roof stopped producing. */}
            <circle
              cx={xOf(DEMAND_PEAK.hour)}
              cy={yOf(DEMAND_PEAK.usage)}
              r="4"
              fill="var(--color-blue)"
              stroke="var(--color-panel)"
              strokeWidth="2"
            />
            <text
              x={xOf(DEMAND_PEAK.hour)}
              y={yOf(DEMAND_PEAK.usage) - 15}
              textAnchor="middle"
              fontSize="12"
              fill="var(--color-muted)"
            >
              Most demand · {clockLabel(DEMAND_PEAK.hour)}
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
                  fill="var(--color-blue)"
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
              className="glass-solid pointer-events-none absolute top-1 rounded-tile border border-line-2 px-3.5 py-3"
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
              <div className="flex items-center justify-between text-[12.5px] text-muted">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green" />
                  Made
                </span>
                <span className="mono text-ink">{reading.solar.toFixed(2)} kW</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[12.5px] text-muted">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                  Used
                </span>
                <span className="mono text-ink">{reading.usage.toFixed(2)} kW</span>
              </div>
              <div
                className={cn(
                  'mt-2.5 border-t border-line-2 pt-2.5 text-[11.5px] font-medium',
                  reading.solar > reading.usage ? 'text-green' : 'text-faint'
                )}
              >
                {reading.solar > reading.usage
                  ? `${(reading.solar - reading.usage).toFixed(2)} kW spare`
                  : 'Drawn from battery or grid'}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Everything the plot shows, for anyone who cannot see it. */}
      <table className="sr-only">
        <caption>Solar generation and home usage, by hour, in kilowatts</caption>
        <thead>
          <tr>
            <th scope="col">Hour</th>
            <th scope="col">Made by your panels (kW)</th>
            <th scope="col">Used by your home (kW)</th>
          </tr>
        </thead>
        <tbody>
          {DAY.map((row) => (
            <tr key={row.hour}>
              <th scope="row">{clockLabel(row.hour)}</th>
              <td>{row.solar.toFixed(2)}</td>
              <td>{row.usage.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
