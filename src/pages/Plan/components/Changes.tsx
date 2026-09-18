import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {DIRECT_USE_EXAMPLE, SWAP} from '../../../data/plan';
import {cn} from '../../../lib/cn';

/**
 * What solar actually changes, at the scale of one afternoon.
 *
 * Deliberately small numbers. The mechanism is the thing that has to land —
 * electricity made at the property is electricity not bought at the property —
 * and an annual figure hides it behind four digits. Twelve kilowatt-hours, two
 * bars and one subtraction is the whole idea, and once somebody has it, every
 * larger number on the page follows without further explanation.
 */
export default function Changes() {
  const rate = SWAP.rate / 100;
  const without = SWAP.usage * rate;
  const with_ = SWAP.gridWithSolar * rate;
  const saved = without - with_;

  return (
    <Section id="changes" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Understand what solar actually changes"
          index="02 / 05"
          title="The same house. The same usage. A different bill."
          body="Solar panels generate electricity at the property. When your home uses that electricity at the moment it is generated, it reduces what has to be purchased from your supplier. That is where the immediate grid-cost benefit comes from — and it is the entire mechanism."
        />

        <div className="grid gap-4 min-[1000px]:grid-cols-[1.35fr_1fr]">
          {/* ---------- The swap ---------- */}
          <Reveal className="rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-9">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-faint">
              One period, {SWAP.usage} kWh of household usage, at {SWAP.rate}p/kWh
            </div>

            <div className="mt-8 space-y-8">
              <Bar
                label="Without solar"
                segments={[{kwh: SWAP.usage, tone: 'grid', name: 'Grid supplies'}]}
                total={SWAP.usage}
                cost={without}
              />
              <Bar
                label="With solar"
                segments={[
                  {kwh: SWAP.solarSupplies, tone: 'solar', name: 'Solar supplies'},
                  {kwh: SWAP.gridWithSolar, tone: 'grid', name: 'Grid supplies'}
                ]}
                total={SWAP.usage}
                cost={with_}
              />
            </div>

            <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-t border-line-2 pt-6">
              <span className="text-[14.5px] font-light text-muted">
                Estimated grid-energy reduction for that period
              </span>
              <span className="mono text-[clamp(26px,3.4vw,36px)] font-semibold leading-none text-green">
                £{saved.toFixed(2)}
              </span>
            </div>
          </Reveal>

          {/* ---------- Direct use ---------- */}
          <Reveal delay={0.06} className="rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-9">
            <div className="flex items-center gap-3 text-green">
              <Glyph name="consumption" className="h-7 w-7" />
              <span className="text-[10.5px] font-bold uppercase tracking-[.18em]">
                Free electricity use
              </span>
            </div>

            <p className="mt-5 text-[15.5px] font-light leading-[1.68] text-muted">
              Solar is most valuable for reducing grid cost when it is used directly, at the property,
              at the moment it is made. Guardian Care calls that your free electricity use — and it
              is the number that decides whether a system pays.
            </p>

            <div className="mt-7 space-y-2.5">
              <Step
                tone="green"
                value={`${DIRECT_USE_EXAMPLE.generated} kWh`}
                label="Solar generation"
              />
              <Arrow />
              <Step
                tone="ink"
                value={`${DIRECT_USE_EXAMPLE.usedDirectly} kWh`}
                label="Used directly by the home"
              />
              <Arrow />
              <Step
                tone="blue"
                value={`${DIRECT_USE_EXAMPLE.surplus} kWh`}
                label="Surplus — to a battery, or exported"
              />
            </div>

            <p className="mt-7 border-t border-line-2 pt-5 text-[13.5px] font-light leading-[1.6] text-faint">
              Which of those two the surplus goes to is the question the next section answers.
            </p>
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}

/* ---------- Pieces ---------- */

const TONE_FILL = {
  solar: 'bg-green/35 ring-1 ring-inset ring-green/60',
  grid: 'bg-amber/25 ring-1 ring-inset ring-amber/50'
};

const TONE_TEXT_LOCAL = {solar: 'text-green', grid: 'text-amber'};

function Bar({
  label,
  segments,
  total,
  cost
}: {
  label: string;
  segments: Array<{kwh: number; tone: keyof typeof TONE_FILL; name: string}>;
  total: number;
  cost: number;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="text-[15px] font-medium text-ink">{label}</span>
        <span className="mono text-[15px] font-semibold text-ink">£{cost.toFixed(2)}</span>
      </div>

      <div className="flex h-12 gap-px overflow-hidden rounded-[10px]">
        {segments.map((segment) => (
          <div
            key={segment.name}
            className={cn('flex items-center justify-center', TONE_FILL[segment.tone])}
            style={{width: `${(segment.kwh / total) * 100}%`}}
          >
            <span className={cn('mono text-[12.5px] font-semibold', TONE_TEXT_LOCAL[segment.tone])}>
              {segment.kwh}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1">
        {segments.map((segment) => (
          <span key={segment.name} className="text-[12.5px] font-light text-muted">
            <span className={cn('mono font-semibold', TONE_TEXT_LOCAL[segment.tone])}>
              {segment.kwh} kWh
            </span>{' '}
            {segment.name.toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

const STEP_TONE = {
  green: 'text-green',
  ink: 'text-ink',
  blue: 'text-blue'
};

function Step({tone, value, label}: {tone: keyof typeof STEP_TONE; value: string; label: string}) {
  return (
    <div className="flex items-center gap-4 rounded-[12px] bg-bg-2 px-4 py-3.5 ring-1 ring-line-2">
      <span className={cn('mono w-[72px] shrink-0 text-[17px] font-semibold', STEP_TONE[tone])}>
        {value}
      </span>
      <span className="text-[14px] font-light leading-[1.4] text-muted">{label}</span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center text-faint" aria-hidden="true">
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3v10M4 9.5 8 13.5l4-4" />
      </svg>
    </div>
  );
}
