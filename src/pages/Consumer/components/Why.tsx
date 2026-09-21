import {useId} from 'react';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {ONE_PICTURE, PARTS} from '../../../data/consumer';
import {cn} from '../../../lib/cn';
import {LiveDot} from '../../Home/components/Conduit';
import {Heading, LABEL, dottedRail, ramp, tint} from '../../../components/kit';

/**
 * Why Guardian Care.
 *
 * Most solar households have every piece of an energy system and no picture of
 * it. That is hard to feel in a paragraph and obvious in a drawing, so the
 * section is a drawing: seven parts down the left in grey, each with the one
 * thing it actually tells its owner — and a dotted line from every one of them
 * into a single lit record on the right.
 *
 * The parts are deliberately unlit. They are not broken; they are simply not
 * talking to anybody, and colour is reserved for the thing that joins them.
 * It is the home page's record diagram turned round: there, one record fans
 * out into everything that happens to it; here, everything a household already
 * owns fans in.
 */

/* ---------- Geometry ----------

   The fan is drawn at true pixel size beside rows of fixed height, so every
   curve leaves from the centre of the row it belongs to. Fixed height is safe
   only because the drawn layout starts at 1100px, where the longest line has
   room to spare; below that, the stacked layout lets rows grow freely. */

const ROW_H = 62;
const ROW_GAP = 10;
const FAN_W = 150;
const SPINE_H = PARTS.length * ROW_H + (PARTS.length - 1) * ROW_GAP;
const HUB_Y = SPINE_H / 2;

function rowCentre(index: number): number {
  return index * (ROW_H + ROW_GAP) + ROW_H / 2;
}

export default function Why() {
  return (
    <Section id="why" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Heading
          eyebrow="◇ Why Guardian Care?"
          title="Many parts."
          accent="One clear picture."
          body="Most solar homes have several parts working independently, each reporting on its own small piece. None of them shows you how the whole system is working together — or whether it is working for you."
        />

        {/* ---------- Wide: the parts, the fan, the picture ---------- */}
        <div
          className="hidden min-[1100px]:grid"
          style={{gridTemplateColumns: `minmax(0,1fr) ${FAN_W}px minmax(0,440px)`}}
        >
          <ol className="flex flex-col" style={{gap: ROW_GAP}}>
            {PARTS.map((part, index) => (
              <Reveal
                key={part.name}
                as="li"
                delay={index * 0.05}
                className="flex items-center gap-4 rounded-card border border-line-2 bg-panel/55 px-4 backdrop-blur-[6px]"
                style={{height: ROW_H}}
              >
                <PartRow index={index} />
              </Reveal>
            ))}
          </ol>

          {/* Every part wired into the one picture. The dots travel inward, in
              the direction the information now goes. */}
          <Reveal delay={0.3}>
            <svg
              width={FAN_W}
              height={SPINE_H}
              viewBox={`0 0 ${FAN_W} ${SPINE_H}`}
              overflow="visible"
              aria-hidden="true"
              className="block"
            >
              {PARTS.map((part, index) => {
                const y = rowCentre(index);
                const colour = ramp(index, PARTS.length);
                return (
                  <g key={part.name}>
                    <path
                      d={`M 0 ${y} C ${FAN_W * 0.55} ${y}, ${FAN_W * 0.45} ${HUB_Y}, ${FAN_W} ${HUB_Y}`}
                      fill="none"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeDasharray="2 8"
                      style={{
                        stroke: colour,
                        opacity: 0.75,
                        animation: 'crawl 3s linear infinite',
                        animationDelay: `${index * -0.4}s`
                      }}
                    />
                    <circle cx="0" cy={y} r="3" style={{fill: colour}} />
                  </g>
                );
              })}

              <circle cx={FAN_W} cy={HUB_Y} r="11" style={{fill: tint('var(--logo-green)', 16)}} />
              <circle cx={FAN_W} cy={HUB_Y} r="5" style={{fill: 'var(--logo-green)'}} />
            </svg>
          </Reveal>

          <Reveal animation="animate-card-in" delay={0.2} style={{height: SPINE_H}}>
            <Picture />
          </Reveal>
        </div>

        {/* ---------- Narrow: the parts, then the picture beneath them ---------- */}
        <div className="min-[1100px]:hidden">
          <ol className="grid gap-2.5 min-[620px]:grid-cols-2">
            {PARTS.map((part, index) => (
              <Reveal
                key={part.name}
                as="li"
                delay={0.03}
                className="flex items-center gap-4 rounded-card border border-line-2 bg-panel/55 px-4 py-3.5 backdrop-blur-[6px]"
              >
                <PartRow index={index} />
              </Reveal>
            ))}
          </ol>

          <div
            aria-hidden="true"
            className="mx-auto h-12 w-0.5"
            style={dottedRail('var(--logo-green)')}
          />

          <Reveal animation="animate-card-in" className="mx-auto max-w-[520px]">
            <Picture />
          </Reveal>
        </div>

        {/* ---------- The claim ---------- */}
        <Reveal className="mx-auto mt-20 max-w-[820px] text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-8 h-px max-w-[220px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--logo-pale), var(--logo-green), var(--color-blue), transparent)'
            }}
          />
          <p className="font-display text-[clamp(22px,3.2vw,36px)] font-medium uppercase leading-[1.16] tracking-[-0.005em] text-muted">
            Guardian Care brings the important information into{' '}
            <span className="font-semibold text-amber">one place</span> — and turns it into{' '}
            <span className="font-semibold text-green">clear energy intelligence</span>.
          </p>
        </Reveal>
      </Wrap>
    </Section>
  );
}

/* ---------- A part ---------- */

function PartRow({index}: {index: number}) {
  const part = PARTS[index];

  return (
    <>
      {/* Hollow and grey: present, working, and connected to nothing. */}
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-tile border border-line-2 bg-bg/50 text-faint">
        <Glyph name={part.glyph} className="h-6 w-6" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-medium leading-tight text-ink">{part.name}</span>
        <span className="mt-1 block text-[13px] font-light leading-snug text-faint">
          {part.says}
        </span>
      </span>
    </>
  );
}

/* ---------- The one picture ---------- */

/**
 * The single bright object in the section: a gradient rim in the mark's three
 * colours, the site's ◇ inside a turning ring, and what joining the parts up
 * actually buys the household.
 */
function Picture() {
  return (
    <div className="relative h-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-[60px]"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(113,190,19,0.14), rgba(255,210,97,0.06) 45%, transparent 70%)'
        }}
      />

      <div
        className="h-full rounded-frame p-px"
        style={{
          background:
            'linear-gradient(160deg, var(--logo-pale), var(--logo-green) 48%, var(--color-blue))'
        }}
      >
        <div className="flex h-full flex-col rounded-[5px] bg-[linear-gradient(180deg,#15181c,#0f1114)] px-6 py-6 min-[520px]:px-7">
          <div className="flex items-center justify-between gap-4">
            <span className={cn(LABEL, 'text-amber')}>◇ Guardian Care</span>
            <span className="flex items-center gap-2">
              <LiveDot />
              <span className="mono text-[10px] font-semibold uppercase tracking-[.16em] text-green">
                Joined up
              </span>
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center py-5">
            <Mark />
          </div>

          <div className="font-display text-[26px] font-semibold uppercase leading-none text-ink">
            One view of your whole system
          </div>

          <ul className="mt-5 space-y-3">
            {ONE_PICTURE.map((line) => (
              <li key={line} className="flex items-start gap-3 text-[14.5px] font-light leading-[1.45] text-ink/85">
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
      </div>
    </div>
  );
}

/**
 * The site's ◇, inside a dotted ring turning slowly.
 *
 * Gradient IDs are generated per instance: the picture renders twice, once in
 * each layout, and `url(#id)` resolves to the first match in the document —
 * which at phone width is inside the hidden wide layout, and paints nothing.
 */
function Mark() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const edgeId = `why-edge-${uid}`;
  const glowId = `why-glow-${uid}`;
  const C = 60;

  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden="true">
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor="var(--logo-green)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--logo-green)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={edgeId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd261" />
          <stop offset="52%" stopColor="var(--logo-green)" />
          <stop offset="100%" stopColor="#3d9ae8" />
        </linearGradient>
      </defs>

      <circle cx={C} cy={C} r="46" fill={`url(#${glowId})`} />

      <g
        style={{
          transformOrigin: `${C}px ${C}px`,
          transformBox: 'view-box',
          animation: 'orbit 50s linear infinite'
        }}
      >
        <circle
          cx={C}
          cy={C}
          r="54"
          fill="none"
          stroke="var(--logo-green)"
          strokeWidth="1.5"
          strokeDasharray="2 8"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx={C} cy={C - 54} r="2.8" fill="var(--logo-green)" />
      </g>

      <circle cx={C} cy={C} r="34" fill="none" stroke="#3d9ae8" strokeWidth="1" opacity="0.35" />

      <rect
        x={C - 15}
        y={C - 15}
        width="30"
        height="30"
        rx="3"
        transform={`rotate(45 ${C} ${C})`}
        fill="rgba(113,190,19,0.08)"
        stroke={`url(#${edgeId})`}
        strokeWidth="2"
      />
      <rect
        x={C - 4.5}
        y={C - 4.5}
        width="9"
        height="9"
        rx="1"
        transform={`rotate(45 ${C} ${C})`}
        fill={`url(#${edgeId})`}
      />
    </svg>
  );
}
