import {TONE_TEXT, TONE_VAR} from '../../../data/command';
import {ENERGY_FLOWS, FLOW_NODES, OPPORTUNITY, type FlowNodeKey} from '../../../data/existing';
import {cn} from '../../../lib/cn';

/**
 * Where the day's electricity actually went.
 *
 * This is the one picture a solar owner has been missing. The readings above it
 * are true but inert — they say what happened without saying how the happenings
 * relate. Drawn as a flow, the same numbers answer the question people are
 * really asking: *my panels made more than my house used, so why did I still
 * buy electricity?* The answer is visible in a second — most of the generation
 * left the building before the evening arrived.
 *
 * The battery slot is drawn empty on purpose, with a dashed path running into
 * it. Everything else on this page argues for storage in prose; this argues for
 * it in geometry, by leaving a hole in the diagram exactly where the exported
 * energy could have gone. A household with a battery would see the same drawing
 * with that path solid and a charge level in the cell.
 *
 * Stroke weight carries magnitude, so 8.1 kWh leaving for the grid is
 * physically the fattest line here and the eye lands on it first.
 *
 * Below 820px the drawing is replaced by the list beneath it — a 760-unit
 * viewBox scaled onto a phone puts every label under legibility. The list is
 * `sr-only` rather than removed at wide sizes, so assistive technology gets the
 * flows at every breakpoint while the SVG stays decorative.
 */

type Point = {x: number; y: number};

const PLATE = {w: 228, h: 88};
const ICON = 52;

/** Node centres. Laid out so no flow has to cross another. */
const CENTRES: Record<FlowNodeKey, Point> = {
  solar: {x: 380, y: 62},
  home: {x: 380, y: 242},
  battery: {x: 126, y: 376},
  grid: {x: 634, y: 376}
};

const GEOMETRY: Record<string, {d: string; label: Point; anchor: 'start' | 'middle' | 'end'}> = {
  'solar-home': {d: 'M 380 108 L 380 196', label: {x: 398, y: 156}, anchor: 'start'},
  'solar-grid': {
    d: 'M 494 62 C 580 62, 634 172, 634 330',
    label: {x: 604, y: 206},
    anchor: 'end'
  },
  'grid-home': {
    d: 'M 520 376 C 464 376, 440 344, 418 288',
    label: {x: 492, y: 326},
    anchor: 'middle'
  }
};

/** The path that is not there: surplus that could have been stored. */
const POTENTIAL = 'M 266 62 C 180 62, 126 172, 126 330';

/** 4.2 kWh reads as a thread, 8.1 as a channel. */
function weight(kwh: number): number {
  return 3 + kwh * 1.35;
}

/* ---------- The four objects ----------

   Drawn in a shared 52×52 box on a 2px stroke so they read as one set rather
   than as four borrowed glyphs. The colour is the node's own palette token,
   passed in rather than baked. */

function NodeArt({node, colour, absent}: {node: FlowNodeKey; colour: string; absent?: boolean}) {
  const line = {stroke: colour, strokeWidth: 2, fill: 'none', strokeLinejoin: 'round' as const};

  if (node === 'solar') {
    /* A module seen slightly off-square, with its cells. The tilt is what
       separates a solar panel from a window at this size. */
    return (
      <g transform={`rotate(-11 ${ICON / 2} ${ICON / 2})`}>
        <rect x="5" y="11" width="42" height="27" rx="2.5" {...line} fill={colour} fillOpacity="0.14" />
        <path d="M15.5 11v27M26 11v27M36.5 11v27M5 24.5h42" stroke={colour} strokeWidth="1.2" />
        <path d="M26 38v7M17 45h18" {...line} strokeLinecap="round" />
      </g>
    );
  }

  if (node === 'home') {
    /* Windows lit, because this page is about a house with somebody in it, and
       an unlit house is a diagram of a building. */
    return (
      <g>
        <path d="M5 25.5 26 7l21 18.5" {...line} strokeLinecap="round" />
        <path d="M11 24v22h30V24" {...line} />
        <rect x="21.5" y="33" width="9" height="13" rx="1" {...line} />
        <rect x="14" y="28" width="5.5" height="5.5" rx="1" fill={colour} fillOpacity="0.5" />
        <rect x="32.5" y="28" width="5.5" height="5.5" rx="1" fill={colour} fillOpacity="0.5" />
      </g>
    );
  }

  if (node === 'battery') {
    /* An empty cell, drawn dashed. The gap is the argument. */
    return (
      <g>
        <rect x="20" y="4" width="12" height="4.5" rx="1.5" {...line} strokeDasharray={absent ? '3 3' : undefined} />
        <rect
          x="12"
          y="8.5"
          width="28"
          height="39"
          rx="5"
          {...line}
          strokeDasharray={absent ? '4 4' : undefined}
          fill={colour}
          fillOpacity={absent ? 0.04 : 0.08}
        />
        <path
          d="M27.5 19l-6 9.5h5L25 37l6.5-10h-5z"
          fill={colour}
          fillOpacity={absent ? 0.22 : 0.95}
        />
      </g>
    );
  }

  /* A transmission tower. Nothing else says "the grid" this fast. */
  return (
    <g {...line} strokeLinecap="round">
      <path d="M12 47 21 11M40 47 31 11M21 11h10" />
      <path d="M9 20h34M6 29h40" />
      <path d="M9 20v4M43 20v4M6 29v4M46 29v4" strokeWidth="1.4" />
      <path d="M15.5 34h21M15.5 34 35 43M36.5 34 17 43" strokeWidth="1.4" />
    </g>
  );
}

export default function Flow() {
  return (
    <div>
      <svg
        viewBox="0 0 760 450"
        className="mx-auto hidden h-auto w-full max-w-[880px] min-[820px]:block"
        aria-hidden="true"
      >
        {/* The storage that is not installed, and the energy that would have
            reached it. Drawn first so the real flows sit over it. */}
        <path
          d={POTENTIAL}
          fill="none"
          stroke="var(--color-purple)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="7 9"
          opacity="0.34"
        />
        <text
          x="156"
          y="206"
          textAnchor="start"
          fontSize="12.5"
          fontWeight="600"
          fill="var(--color-purple)"
          opacity="0.8"
        >
          could be stored
        </text>

        {ENERGY_FLOWS.map((flow, index) => {
          const key = `${flow.from}-${flow.to}`;
          const geo = GEOMETRY[key];
          /* A flow added to the data without a path here would otherwise take
             the whole section down at render time. */
          if (!geo) return null;
          const colour = TONE_VAR[flow.tone];

          return (
            <g key={key}>
              {/* The channel itself, held well back so the moving light reads. */}
              <path
                d={geo.d}
                fill="none"
                stroke={colour}
                strokeWidth={weight(flow.kwh)}
                strokeLinecap="round"
                opacity={0.2}
              />
              {/* One short dash travelling the length of the path each cycle. */}
              <path
                d={geo.d}
                fill="none"
                stroke={colour}
                strokeWidth={weight(flow.kwh) - 2}
                strokeLinecap="round"
                strokeDasharray="8 92"
                className="animate-flow"
                opacity={0.9}
                style={{animationDelay: `${index * -0.7}s`}}
              />
              <text
                x={geo.label.x}
                y={geo.label.y}
                textAnchor={geo.anchor}
                className="mono"
                fontSize="15"
                fontWeight="600"
                fill={colour}
              >
                {flow.kwh} kWh
              </text>
            </g>
          );
        })}

        {FLOW_NODES.map((node) => {
          const centre = CENTRES[node.key];
          const colour = TONE_VAR[node.tone];
          const left = centre.x - PLATE.w / 2;
          const textX = left + 18 + ICON + 16;

          return (
            <g key={node.key} opacity={node.absent ? 0.6 : 1}>
              <rect
                x={left}
                y={centre.y - PLATE.h / 2}
                width={PLATE.w}
                height={PLATE.h}
                rx="20"
                fill="var(--color-panel)"
                stroke={node.key === 'home' ? 'var(--color-line)' : 'var(--color-line-2)'}
                strokeDasharray={node.absent ? '6 5' : undefined}
              />

              <g transform={`translate(${left + 18} ${centre.y - ICON / 2})`}>
                <NodeArt node={node.key} colour={colour} absent={node.absent} />
              </g>

              <text x={textX} y={centre.y - 6} className="mono" fontSize="23" fontWeight="600" fill={colour}>
                {node.value}
                <tspan fontSize="12" fill="var(--color-faint)">
                  {' '}
                  {node.unit}
                </tspan>
              </text>
              <text
                x={textX}
                y={centre.y + 16}
                fontSize="10.5"
                fontWeight="700"
                letterSpacing="1.4"
                fill="var(--color-faint)"
              >
                {node.name.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      <ul className="overflow-hidden rounded-[18px] bg-line-2 ring-1 ring-line-2 min-[820px]:sr-only">
        {ENERGY_FLOWS.map((flow) => (
          <li
            key={`${flow.from}-${flow.to}`}
            className="mb-px flex items-baseline gap-3 bg-panel px-[18px] py-[15px] last:mb-0"
          >
            <span className={cn('mono shrink-0 text-[15px] font-semibold', TONE_TEXT[flow.tone])}>
              {flow.kwh} kWh
            </span>
            <span className="text-[14.5px] font-light leading-[1.5] text-muted">{flow.label}</span>
          </li>
        ))}
        <li className="flex items-baseline gap-3 bg-panel px-[18px] py-[15px]">
          <span className="mono shrink-0 text-[15px] font-semibold text-purple">
            {OPPORTUNITY.reduction} kWh
          </span>
          <span className="text-[14.5px] font-light leading-[1.5] text-muted">
            Could plausibly have been stored instead of exported and re-bought
          </span>
        </li>
      </ul>
    </div>
  );
}
