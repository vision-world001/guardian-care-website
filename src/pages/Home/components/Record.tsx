import {useId} from 'react';
import type {ReactNode} from 'react';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {RECORD_CLAIM, RECORD_ROOTS, RECORD_SPINE} from '../../../data/platform';
import {cn} from '../../../lib/cn';
import {LiveDot} from './Conduit';

/**
 * One customer. One system record.
 *
 * Drawn as a hub rather than as a chain, and that is the whole redesign. The
 * earlier version stacked seven identical boxes and joined each one to the one
 * above it — which says every stage depends on the stage before it. The
 * platform's actual claim is different: *everything links back to the
 * customer*. So the record sits on the left as the one bright object on the
 * canvas, and a dotted line runs from it to every one of the seven stages. The
 * order is still legible from the numbering and the top-to-bottom reading; the
 * connection to the record is what the geometry now says.
 *
 * The three founding fields — property, system, energy — live inside the
 * record rather than above it. They are not a first step; they are what the
 * record *is* before anything happens to it.
 *
 * Colour runs down the seven stages as one continuous ramp through the mark's
 * own colours, gold to lime to blue. Seven arbitrary tones would read as seven
 * categories; one ramp reads as time passing, which is what the order means.
 */

/* ---------- Geometry ----------

   The fan is an SVG drawn at true pixel size beside rows of fixed height, so
   every curve lands on the centre of the row it belongs to. Fixed height is
   safe here only because the layout that uses it starts at 1180px, where the
   longest line in the data has twice the width it needs; below that, the
   stacked layout lets rows grow freely. */

const ROW_H = 72;
const ROW_GAP = 12;
const FAN_W = 120;
const SPINE_H = RECORD_SPINE.length * ROW_H + (RECORD_SPINE.length - 1) * ROW_GAP;
const ORIGIN_Y = SPINE_H / 2;

function rowCentre(index: number): number {
  return index * (ROW_H + ROW_GAP) + ROW_H / 2;
}

/**
 * The stage's place on the gold → lime → blue ramp, resolved by the browser.
 *
 * Mixed from the theme's own variables rather than from hex values computed
 * here, so the ramp cannot drift from the palette it is supposed to be a
 * reading of. Mixed in OKLab so the midpoints stay saturated — the same
 * interpolation in sRGB greys out between lime and blue.
 */
function tone(index: number): string {
  const t = index / (RECORD_SPINE.length - 1);
  if (t <= 0.5) {
    return `color-mix(in oklab, var(--logo-green) ${Math.round((t / 0.5) * 100)}%, var(--logo-pale))`;
  }
  return `color-mix(in oklab, var(--color-blue) ${Math.round(((t - 0.5) / 0.5) * 100)}%, var(--logo-green))`;
}

/** A tone at low strength, for tile fills and borders. */
function tint(colour: string, percent: number): string {
  return `color-mix(in srgb, ${colour} ${percent}%, transparent)`;
}

export default function Record() {
  return (
    <Section id="record" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Reveal className="mx-auto mb-16 max-w-[680px] text-center">
          <h2 className="font-display text-[clamp(30px,4.6vw,54px)] font-semibold uppercase leading-[0.98] tracking-[-0.015em] text-ink">
            One customer.
            <br />
            <span className="text-brand-gradient">One system record.</span>
          </h2>
        </Reveal>

        {/* ---------- Wide: the record, the fan, the stages ---------- */}
        <div
          className="hidden min-[1180px]:grid min-[1180px]:items-stretch"
          style={{gridTemplateColumns: `360px ${FAN_W}px 1fr`}}
        >
          <Reveal animation="animate-card-in" style={{height: SPINE_H}}>
            <RecordCore />
          </Reveal>

          {/* Every stage wired straight back to the record — not to the stage
              before it. `overflow: visible` so the nodes at both ends can sit
              across the edges of the things they join. */}
          <Reveal delay={0.25}>
            <svg
              width={FAN_W}
              height={SPINE_H}
              viewBox={`0 0 ${FAN_W} ${SPINE_H}`}
              overflow="visible"
              aria-hidden="true"
              className="block"
            >
              {RECORD_SPINE.map((node, index) => {
                const y = rowCentre(index);
                return (
                  <g key={node.name}>
                    <path
                      d={`M 0 ${ORIGIN_Y} C ${FAN_W * 0.55} ${ORIGIN_Y}, ${FAN_W * 0.45} ${y}, ${FAN_W} ${y}`}
                      fill="none"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeDasharray="2 8"
                      style={{
                        stroke: tone(index),
                        opacity: 0.75,
                        animation: 'crawl 3s linear infinite',
                        animationDelay: `${index * -0.4}s`
                      }}
                    />
                    <circle cx={FAN_W} cy={y} r="3.5" style={{fill: tone(index)}} />
                  </g>
                );
              })}

              {/* Where every line starts: one point on the record. */}
              <circle cx="0" cy={ORIGIN_Y} r="11" style={{fill: tint('var(--logo-green)', 16)}} />
              <circle cx="0" cy={ORIGIN_Y} r="5" style={{fill: 'var(--logo-green)'}} />
            </svg>
          </Reveal>

          <ol className="flex flex-col" style={{gap: ROW_GAP}}>
            {RECORD_SPINE.map((node, index) => (
              <Reveal
                key={node.name}
                as="li"
                delay={0.3 + index * 0.06}
                className="flex items-center gap-5 rounded-card border bg-panel/55 px-5 backdrop-blur-[6px]"
                style={{height: ROW_H, borderColor: tint(tone(index), 26)}}
              >
                <StageRow index={index} />
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ---------- Narrow: the record, then the stages beneath it ---------- */}
        <div className="mx-auto max-w-[560px] min-[1180px]:hidden">
          <Reveal animation="animate-card-in">
            <RecordCore />
          </Reveal>

          {/* The line out of the record, into the first stage. */}
          <div className="ml-[19px] h-10 w-0.5" style={dottedRail(tone(0))} aria-hidden="true" />

          <ol>
            {RECORD_SPINE.map((node, index) => (
              <Reveal key={node.name} as="li" delay={0.04} className="flex gap-4">
                {/* The rail runs through every stage and stops at the last. */}
                <div className="relative flex w-10 shrink-0 justify-center">
                  {index < RECORD_SPINE.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 w-0.5"
                      style={dottedRail(tone(index))}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute top-0 h-5 w-0.5"
                      style={dottedRail(tone(index))}
                    />
                  )}
                  <SymbolTile colour={tone(index)} size="rail">
                    <Glyph name={node.glyph} bold className="h-6 w-6" />
                  </SymbolTile>
                </div>

                <div className="min-w-0 flex-1 pb-7 pt-1.5">
                  <div className="flex items-baseline gap-3">
                    <span className="mono text-[10px] text-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-[19px] font-semibold uppercase leading-none text-ink">
                      {node.name}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[13.5px] font-light leading-[1.5] text-muted">
                    {node.line}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ---------- The claim ----------

            The four things the sentence names are lit in the order the page has
            introduced them: gold for the site, lime for the system, blue for
            the operator, warm white for the customer. The words are unchanged;
            only the four nouns carry colour. */}
        <Reveal className="mx-auto mt-20 max-w-[820px] text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-8 h-px max-w-[220px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--logo-pale), var(--logo-green), var(--color-blue), transparent)'
            }}
          />
          {/* The sentence itself sits back in the muted grey so the four nouns
              can come forward. Set in ink it left "customer" — lit in the same
              warm white — indistinguishable from the words around it, and the
              one noun the whole page is about read as the only one not lit. */}
          <p className="font-display text-[clamp(22px,3.2vw,36px)] font-medium uppercase leading-[1.16] tracking-[-0.005em] text-muted">
            <Claim text={RECORD_CLAIM} />
          </p>
        </Reveal>
      </Wrap>
    </Section>
  );
}

/* ---------- The record ---------- */

/**
 * The one bright object in the section.
 *
 * A gradient rim in the mark's three colours, an emblem made of the site's own
 * ◇ inside slowly turning rings, and the three founding fields. It is a picture
 * of a record rather than a card of information — the fields are what make it
 * readable, the emblem is what makes it the centre.
 */
function RecordCore() {
  return (
    <div className="relative h-full">
      {/* Light the record gives off. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-[60px]"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(113,190,19,0.16), rgba(255,210,97,0.06) 45%, transparent 70%)'
        }}
      />

      {/* The rim: a 1px gradient border, drawn as padding round the panel. */}
      <div
        className="h-full rounded-frame p-px"
        style={{
          background:
            'linear-gradient(160deg, var(--logo-pale), var(--logo-green) 48%, var(--color-blue))'
        }}
      >
        <div className="flex h-full flex-col rounded-[5px] bg-[linear-gradient(180deg,#15181c,#0f1114)] px-6 py-6">
          {/* ---- Header ---- */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mono text-[10.5px] font-semibold uppercase tracking-[.2em] text-amber">
                ◇ Customer record
              </div>
              <div className="mono mt-1.5 text-[13px] text-faint">GC-0418</div>
            </div>
            <span className="flex items-center gap-2">
              <LiveDot />
              <span className="mono text-[10px] font-semibold uppercase tracking-[.16em] text-green">
                Active
              </span>
            </span>
          </div>

          {/* ---- Emblem ---- */}
          <div className="flex flex-1 items-center justify-center py-4">
            <Emblem />
          </div>

          {/* ---- What the record is made of ---- */}
          <ul className="space-y-px overflow-hidden rounded-card border border-line-2">
            {RECORD_ROOTS.map((root, index) => (
              <li key={root.name} className="flex items-center gap-3.5 bg-bg/50 px-4 py-3">
                <SymbolTile colour={ROOT_TONES[index]} size="root">
                  <Glyph name={root.glyph} bold className="h-6 w-6" />
                </SymbolTile>
                <span className="min-w-0">
                  <span className="mono block text-[11px] font-semibold uppercase tracking-[.18em] text-ink">
                    {root.name}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] font-light leading-[1.4] text-muted">
                    {root.line}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {/* ---- The stages it holds, as a strip of the ramp ---- */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              {RECORD_SPINE.map((node, index) => (
                <span
                  key={node.name}
                  className="h-1.5 w-5 rounded-pill"
                  style={{background: tone(index)}}
                />
              ))}
            </div>
            <span className="mono text-[10px] uppercase tracking-[.16em] text-faint">
              {RECORD_SPINE.length} / {RECORD_SPINE.length} linked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The site's ◇, inside rings turning in opposite directions.
 *
 * Gradient IDs are generated per instance. The emblem renders twice — once in
 * the wide layout, once in the narrow — and `url(#id)` resolves to the *first*
 * element in the document with that ID. With a fixed ID, the phone layout's ◇
 * was pointing at the gradient inside the wide layout, which is `display:
 * none` at that width, so its edge, core and glow all silently painted as
 * nothing.
 */
function Emblem() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const glowId = `rec-core-glow-${uid}`;
  const edgeId = `rec-core-edge-${uid}`;
  const C = 80;
  const spin = (seconds: number, reverse?: boolean) => ({
    transformOrigin: `${C}px ${C}px`,
    transformBox: 'view-box' as const,
    animation: `orbit ${seconds}s linear infinite${reverse ? ' reverse' : ''}`
  });

  return (
    <svg viewBox="0 0 160 160" className="h-36 w-36 min-[1180px]:h-40 min-[1180px]:w-40" aria-hidden="true">
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor="var(--logo-green)" stopOpacity="0.32" />
          <stop offset="60%" stopColor="var(--logo-green)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--logo-green)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={edgeId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd261" />
          <stop offset="52%" stopColor="var(--logo-green)" />
          <stop offset="100%" stopColor="#3d9ae8" />
        </linearGradient>
      </defs>

      <circle cx={C} cy={C} r="62" fill={`url(#${glowId})`} />

      {/* Outer ring: dotted, slow, clockwise. */}
      <g style={spin(60)}>
        <circle
          cx={C}
          cy={C}
          r="72"
          fill="none"
          stroke="var(--logo-green)"
          strokeWidth="1.6"
          strokeDasharray="2 8"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* One bright bead on it, so the turn is visible at all. */}
        <circle cx={C} cy={C - 72} r="3" fill="var(--logo-green)" />
      </g>

      {/* Middle ring: finer, faster, the other way. */}
      <g style={spin(38, true)}>
        <circle
          cx={C}
          cy={C}
          r="54"
          fill="none"
          stroke="#ffd261"
          strokeWidth="1.3"
          strokeDasharray="1.5 6"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx={C + 54} cy={C} r="2.4" fill="#ffd261" />
      </g>

      {/* Inner ring: still. */}
      <circle cx={C} cy={C} r="36" fill="none" stroke="#3d9ae8" strokeWidth="1" opacity="0.35" />

      {/* The ◇. */}
      <rect
        x={C - 17}
        y={C - 17}
        width="34"
        height="34"
        rx="3"
        transform={`rotate(45 ${C} ${C})`}
        fill="rgba(113,190,19,0.08)"
        stroke={`url(#${edgeId})`}
        strokeWidth="2"
      />
      <rect
        x={C - 5}
        y={C - 5}
        width="10"
        height="10"
        rx="1"
        transform={`rotate(45 ${C} ${C})`}
        fill={`url(#${edgeId})`}
      />
    </svg>
  );
}

/* ---------- A stage ---------- */

function StageRow({index}: {index: number}) {
  const node = RECORD_SPINE[index];
  const colour = tone(index);

  return (
    <>
      <span className="mono w-6 shrink-0 text-[11px] font-semibold text-faint">
        {String(index + 1).padStart(2, '0')}
      </span>

      <SymbolTile colour={colour} size="row">
        <Glyph name={node.glyph} bold className="h-7 w-7" />
      </SymbolTile>

      <span className="min-w-0">
        <span className="block font-display text-[18px] font-semibold uppercase leading-none tracking-[0.01em] text-ink">
          {node.name}
        </span>
        <span className="mt-1.5 block text-[13.5px] font-light leading-[1.35] text-muted">
          {node.line}
        </span>
      </span>
    </>
  );
}

/* ---------- Symbols ---------- */

/**
 * The three founding fields, in the order the closing sentence lights its
 * nouns — gold for the site, lime for the system, blue beyond it — so the
 * record and the claim underneath it agree about what colour things are.
 */
const ROOT_TONES = ['var(--logo-pale)', 'var(--logo-green)', 'var(--color-blue)'];

const TILE = {
  row: 'h-12 w-12 rounded-tile',
  root: 'h-10 w-10 rounded-tile',
  rail: 'relative mt-1 h-11 w-11 rounded-full'
} as const;

/**
 * A symbol set into a solid tile of its own colour.
 *
 * The earlier marks were a thin coloured line on a barely-tinted tile — a
 * one-pixel stroke on a ground at 8% of its own colour, which is two faint
 * things on top of each other. Reversed, the tile carries the colour at full
 * strength and the mark is cut out of it in the page's own near-black: the
 * contrast is the strongest the palette can make, and the shape reads at a
 * glance. The lit top edge and the cast glow are what keep a flat coloured
 * square from looking like a sticker.
 */
function SymbolTile({
  colour,
  size,
  children
}: {
  colour: string;
  size: keyof typeof TILE;
  children: ReactNode;
}) {
  return (
    <span
      className={cn('grid shrink-0 place-items-center text-bg', TILE[size])}
      style={{
        background: colour,
        boxShadow: `0 8px 22px -10px ${tint(colour, 85)}, inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -1px 0 rgba(0,0,0,0.2)`
      }}
    >
      {children}
    </span>
  );
}

/* ---------- Pieces ---------- */

/** A dotted vertical rail, crawling downward, in one stage's colour. */
function dottedRail(colour: string) {
  return {
    backgroundImage: `linear-gradient(180deg, ${colour} 0 2px, transparent 2px)`,
    backgroundSize: '2px 10px',
    backgroundRepeat: 'repeat-y',
    animation: 'rail-crawl-y 2.6s linear infinite'
  };
}

/** The four things the sentence names, and the colour each one is lit in. */
const NOUNS: Record<string, string> = {
  site: 'var(--logo-pale)',
  system: 'var(--logo-green)',
  operator: 'var(--color-blue)',
  customer: 'var(--color-ink)'
};

/**
 * The claim, with its four nouns lit.
 *
 * Split from the data string rather than retyped as JSX, so the sentence can
 * be edited in one place and the highlighting follows it.
 */
function Claim({text}: {text: string}) {
  const parts = text.split(/\b(site|system|operator|customer)\b/);

  return (
    <>
      {parts.map((part, index) =>
        NOUNS[part] ? (
          <span key={index} style={{color: NOUNS[part]}} className="font-semibold">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}
