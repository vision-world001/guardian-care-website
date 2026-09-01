import type {ReactNode} from 'react';
import Counter from '../../../components/Counter';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import EnergyFlow from './EnergyFlow';
import {GRID_FLOWS, HOME_TODAY} from '../../../data/homeToday';
import {DAY, DAY_CEILING_KW} from '../../../data/energyDay';
import {TONE_BG, TONE_TEXT, TONE_VAR, type StatusTone} from '../../../data/command';
import {smooth} from '../../../lib/curve';
import {cn} from '../../../lib/cn';

/**
 * The day's readings, and then — the part that was missing — how they relate.
 *
 * The section it replaces put five numbers in five identical cells, which is
 * the most ordinary thing a page can do with data and quietly contradicts the
 * headline above it: a row of equal tiles says the five readings matter
 * equally, gives the eye nowhere to land, and still leaves the reader decoding
 * a figure and a unit. "Nothing you need to decode" has to be true of the
 * layout, not just claimed by it.
 *
 * So the cells are weighted the way the facts are. What the roof made is the
 * headline and takes a quarter of the block, carrying the shape of its own day
 * underneath it. What the house used is the comparison, and shows itself as a
 * proportion of that. The battery is a state, so it is drawn as one — a ring,
 * not a number pretending to be a quantity. And the two grid figures are one
 * fact, not two: you sent out far more than you bought back, which only reads
 * as a fact when the bars sit against a shared scale in the same cell.
 *
 * Every reading also says what it means in words. That is not decoration —
 * "Solar · 18.4 kWh" is exactly the decoding the section promised to spare
 * them, and "Made by your roof" is not.
 */

/* ---------- Shell ---------- */

/**
 * One cell. The tone wash is mixed from the palette token rather than hardcoded
 * so it re-mixes itself against whichever theme the route is running.
 */
function Cell({
  tone,
  label,
  caption,
  className,
  children
}: {
  tone: StatusTone;
  label: string;
  caption: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'shadow-lift relative flex flex-col overflow-hidden rounded-frame border border-line-2 bg-panel p-6 min-[760px]:p-7',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(158deg, color-mix(in srgb, ${TONE_VAR[tone]} 13%, transparent), transparent 64%)`
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex items-center gap-2.5">
          <span className={cn('h-[7px] w-[7px] shrink-0 rounded-full', TONE_BG[tone])} />
          <span className="text-[10.5px] font-bold uppercase tracking-[.16em] text-faint">
            {label}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between">{children}</div>

        <p className="mt-6 text-[13px] font-light leading-[1.5] text-muted">{caption}</p>
      </div>
    </div>
  );
}

/** The figure itself. One size for the headline cell, one for the rest. */
function Figure({
  value,
  unit,
  tone,
  hero
}: {
  value: string;
  unit: string;
  tone: StatusTone;
  hero?: boolean;
}) {
  return (
    <div
      className={cn(
        'font-display font-semibold leading-[0.9] tracking-[-0.01em]',
        hero ? 'text-[clamp(56px,7.6vw,88px)]' : 'text-[44px]',
        TONE_TEXT[tone]
      )}
    >
      <Counter value={value} />
      <span className={cn('text-faint', hero ? 'ml-2 text-[22px]' : 'ml-1.5 text-[17px]')}>
        {unit}
      </span>
    </div>
  );
}

/* ---------- The day's shape, at tile size ---------- */

const SPARK = {w: 320, h: 74, top: 10, bottom: 66};
const LAST_HOUR = 23;

const SPARK_LINE = smooth(
  DAY.map((row) => ({
    x: (row.hour / LAST_HOUR) * SPARK.w,
    y: SPARK.bottom - (row.solar / DAY_CEILING_KW) * (SPARK.bottom - SPARK.top)
  }))
);

/**
 * The same curve the day chart draws further down the page, at a twentieth of
 * the size and with every label taken off. It is not there to be read — the
 * number above it is the reading — it is there so the headline figure arrives
 * with the shape of the day attached to it.
 */
function Sparkline() {
  return (
    <svg
      viewBox={`0 0 ${SPARK.w} ${SPARK.h}`}
      className="mt-7 h-auto w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={`${SPARK_LINE} L ${SPARK.w} ${SPARK.bottom} L 0 ${SPARK.bottom} Z`}
        fill="var(--color-green)"
        opacity="0.14"
      />
      <path
        d={SPARK_LINE}
        fill="none"
        stroke="var(--color-green)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="0"
        x2={SPARK.w}
        y1={SPARK.bottom}
        y2={SPARK.bottom}
        stroke="var(--color-line-2)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ---------- Battery, drawn as the state it is ---------- */

const RING = {size: 132, r: 54};
const CIRCUMFERENCE = 2 * Math.PI * RING.r;
const CHARGE = Number(HOME_TODAY.battery.value) / 100;

function BatteryRing() {
  return (
    <div className="relative mx-auto w-fit">
      <svg
        width={RING.size}
        height={RING.size}
        viewBox={`0 0 ${RING.size} ${RING.size}`}
        aria-hidden="true"
      >
        <circle
          cx={RING.size / 2}
          cy={RING.size / 2}
          r={RING.r}
          fill="none"
          stroke="var(--color-line-2)"
          strokeWidth="9"
        />
        {/* Started from the top and run clockwise, because that is the only
            direction a charge level reads in. */}
        <circle
          cx={RING.size / 2}
          cy={RING.size / 2}
          r={RING.r}
          fill="none"
          stroke="var(--color-purple)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${CIRCUMFERENCE * CHARGE} ${CIRCUMFERENCE}`}
          transform={`rotate(-90 ${RING.size / 2} ${RING.size / 2})`}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="font-display text-[38px] font-semibold leading-none text-purple">
          <Counter value={HOME_TODAY.battery.value} />
          <span className="text-[17px] text-faint">{HOME_TODAY.battery.unit}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- The two directions of one relationship ---------- */

const GRID_MAX = Math.max(...GRID_FLOWS.map((flow) => flow.value));

function GridBars() {
  return (
    <div className="flex flex-col gap-5">
      {GRID_FLOWS.map((flow) => (
        <div key={flow.label}>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="text-[12.5px] font-light text-muted">{flow.label}</span>
            <span className={cn('mono text-[19px] font-semibold', TONE_TEXT[flow.tone])}>
              {flow.value}
              <span className="ml-1 text-[12px] text-faint">kWh</span>
            </span>
          </div>
          {/* Both bars share one scale, so the ratio is the point rather than
              two separately-full bars that would read as equal. */}
          <div className="h-2 overflow-hidden rounded-pill bg-line-2">
            <div
              className={cn('h-full rounded-pill', TONE_BG[flow.tone])}
              style={{width: `${(flow.value / GRID_MAX) * 100}%`}}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Section ---------- */

const USED_SHARE = Number(HOME_TODAY.usage.value) / Number(HOME_TODAY.solar.value);

export default function HomeToday() {
  return (
    <Section id="c-today">
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="Your home today"
            tone="blue"
            title={
              <>
                Five numbers.
                <br />
                <span className="text-brand-gradient">Nothing you need to decode.</span>
              </>
            }
            body="No graphs to interpret, no technical readouts. What your roof made, where every unit went, and one recommendation if there is something worth doing."
          />
        </Reveal>

        {/* <div className="grid grid-cols-2 gap-3.5 min-[1000px]:grid-cols-4">
          <Reveal className="col-span-2 flex min-[1000px]:row-span-2">
            <Cell
              tone={HOME_TODAY.solar.tone}
              label={HOME_TODAY.solar.label}
              caption={HOME_TODAY.solar.caption}
              className="w-full"
            >
              <Figure
                hero
                value={HOME_TODAY.solar.value}
                unit={HOME_TODAY.solar.unit}
                tone={HOME_TODAY.solar.tone}
              />
              <Sparkline />
            </Cell>
          </Reveal>

          <Reveal delay={0.06} className="col-span-2 flex">
            <Cell
              tone={HOME_TODAY.usage.tone}
              label={HOME_TODAY.usage.label}
              caption={HOME_TODAY.usage.caption}
              className="w-full"
            >
              <Figure
                value={HOME_TODAY.usage.value}
                unit={HOME_TODAY.usage.unit}
                tone={HOME_TODAY.usage.tone}
              />

              <div className="mt-6">
                <div className="h-2.5 overflow-hidden rounded-pill bg-line-2">
                  <div
                    className="h-full rounded-pill bg-blue"
                    style={{width: `${USED_SHARE * 100}%`}}
                  />
                </div>
                <div className="mt-2.5 flex justify-between text-[11.5px] text-faint">
                  <span>Used at home</span>
                  <span className="mono">{HOME_TODAY.solar.value} kWh made</span>
                </div>
              </div>
            </Cell>
          </Reveal>

          <Reveal delay={0.12} className="flex">
            <Cell
              tone={HOME_TODAY.battery.tone}
              label={HOME_TODAY.battery.label}
              caption={HOME_TODAY.battery.caption}
              className="w-full"
            >
              <BatteryRing />
            </Cell>
          </Reveal>

          <Reveal delay={0.18} className="flex">
            <Cell
              tone={HOME_TODAY.grid.tone}
              label={HOME_TODAY.grid.label}
              caption={HOME_TODAY.grid.caption}
              className="w-full"
            >
              <GridBars />
            </Cell>
          </Reveal>
        </div> */}

        <Reveal className="mt-1 overflow-hidden rounded-frame px-5 py-7 min-[760px]:px-8 min-[760px]:py-8">
          <EnergyFlow />
        </Reveal>

        {/* The verdict. Set apart from the readings above it because it is the
            one thing on the block that is a judgement rather than a number. */}
        <Reveal className="relative mt-2.5 overflow-hidden rounded-frame border-line bg-panel">
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(122deg, color-mix(in srgb, var(--color-green) 16%, transparent), transparent 58%)'
            }}
          />
          <div className="relative grid items-start gap-6 p-6 min-[820px]:grid-cols-[260px_1fr] min-[820px]:gap-11 min-[820px]:p-9">
            <div>
              {/* <span className="inline-flex items-center gap-2 rounded-pill border border-line px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-green">
                <span className="animate-blip h-1.5 w-1.5 rounded-full bg-green" />
                Checked this morning
              </span> */}
              <div className="mt-4 font-display text-[44px] font-semibold uppercase leading-[0.95] text-green">
                Healthy
              </div>
            </div>

            <p className="text-[16px] font-light leading-[1.68] text-muted [&_b]:font-medium [&_b]:text-ink">
              Your system is working as it should. <b>Your panels made 18.4 kWh and your home
              needed 12.8</b> — yet you still bought 3.2 kWh from the grid. Nothing is wrong. It is
              timing, and it is the one thing solar owners are never shown.
            </p>
          </div>
        </Reveal>
      </Wrap>
    </Section>
  );
}
