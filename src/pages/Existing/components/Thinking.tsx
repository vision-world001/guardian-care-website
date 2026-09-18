import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Estimated, Section, SectionHead, Wrap} from '../../../components/ui';
import {DAY_TOTALS, OPPORTUNITY, type ExistingPosition} from '../../../data/existing';
import {cn} from '../../../lib/cn';

/**
 * The platform reasoning out loud.
 *
 * Everything above this section is measurement; this is the first place the
 * platform draws a conclusion, and it shows its working on purpose. A saving
 * figure with no arithmetic behind it is a marketing claim. The same figure with
 * five lines of visible multiplication is something the reader can check, argue
 * with, or take to their installer — which is the only version worth printing.
 *
 * The rate comes from the visitor's own answers where they gave one, so the
 * conclusion is about their tariff rather than a national average.
 */
export default function Thinking({position}: {position: ExistingPosition}) {
  const rate = position.importRate;

  /* Recomputed against the visitor's rate rather than read from the data
     module's default, so the sum on screen is the sum for this reader. */
  const costPerDay = (DAY_TOTALS.imported * rate) / 100;
  const savedPerDay = (OPPORTUNITY.reduction * rate) / 100;
  const savedPerMonth = savedPerDay * 30.4;
  const savedPerYear = savedPerDay * 365;

  return (
    <Section id="thinking" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Guardian Care thinks with the data"
          tone="blue"
          index="05 / 06"
          title="The relationship, not the reading"
          body="Any monitor can tell you that you generated 16.8 kWh. The useful observation is that 8.1 of them left the property while 4.2 were bought back a few hours later, at a rate several times what they earned on the way out."
        />

        <div className="grid gap-4 min-[1000px]:grid-cols-[1.15fr_1fr]">
          {/* ---------- The observation ---------- */}
          <Reveal className="rounded-[22px] bg-[linear-gradient(120deg,var(--color-blue-glow),var(--color-green-glow))] p-6 ring-1 ring-line min-[760px]:p-9">
            <div className="flex items-center gap-3 text-purple">
              <Glyph name="storage" className="h-7 w-7" />
              <span className="text-[10.5px] font-bold uppercase tracking-[.18em]">
                Storage opportunity
              </span>
            </div>

            <p className="mt-5 font-display text-[clamp(21px,2.6vw,28px)] font-medium uppercase leading-[1.18] text-ink">
              A significant amount of your generation left the property while electricity was still
              required from the grid later the same day.
            </p>

            <p className="mt-5 text-[15.5px] font-light leading-[1.68] text-muted">
              Guardian Care does not conclude from this that you should buy a battery. It concludes
              that the question is worth asking with numbers attached — which is what the panel
              beside this one does.
            </p>

            <div className="mt-7 border-t border-line pt-6">
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">
                Suggested next step
              </div>
              <p className="mt-2.5 text-[15px] font-light leading-[1.6] text-muted">
                Review whether battery storage could increase the amount of your solar generation
                retained for later use.
              </p>
            </div>
          </Reveal>

          {/* ---------- The arithmetic ---------- */}
          <Reveal delay={0.06} className="overflow-hidden rounded-[22px] bg-panel ring-1 ring-line-2">
            <div className="flex items-start justify-between gap-3 border-b border-line-2 px-6 py-5 min-[760px]:px-8">
              <div>
                <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-amber">
                  Estimated grid cost reduction
                </div>
                <div className="mt-1.5 text-[13px] font-light text-faint">
                  Shown with its working, at your own import rate
                </div>
              </div>
              <Estimated />
            </div>

            <dl className="px-6 py-5 min-[760px]:px-8">
              <Line label="Current grid import" value={`${DAY_TOTALS.imported} kWh/day`} />
              <Line label="Import rate" value={`${rate}p/kWh`} />
              <Line
                label="Current energy cost"
                value={`£${costPerDay.toFixed(2)}/day`}
                tone="text-amber"
              />

              <div className="my-4 border-t border-line-2" />

              <Line label="Possible reduced import" value={`${OPPORTUNITY.reducedImport} kWh`} />
              <Line
                label="Potential reduction"
                value={`${OPPORTUNITY.reduction} kWh`}
                tone="text-green"
              />
            </dl>

            <div className="border-t border-line-2 bg-bg-2 px-6 py-6 min-[760px]:px-8">
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                Indicative saving
              </div>
              <div className="mono mt-3 text-[clamp(30px,4.4vw,44px)] font-semibold leading-none text-green">
                £{savedPerYear.toFixed(0)}
                <span className="mono ml-2 text-[13px] font-normal text-faint">per year</span>
              </div>
              <div className="mono mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-muted">
                <span>{(savedPerDay * 100).toFixed(0)}p/day</span>
                <span>·</span>
                <span>£{savedPerMonth.toFixed(0)}/month</span>
              </div>
              <p className="mt-5 border-t border-line-2 pt-4 text-[12.5px] font-light leading-[1.55] text-faint">
                Actual savings depend on real generation, consumption, battery performance, tariffs
                and customer behaviour. This is an estimated opportunity, not a quotation.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---------- FIT ---------- */}
        <Reveal delay={0.12} className="mt-4 rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-9">
          <div className="grid gap-9 min-[900px]:grid-cols-[1fr_1fr]">
            <div>
              <div className="flex items-center gap-3 text-green">
                <Glyph name="fit" className="h-7 w-7" />
                <span className="text-[10.5px] font-bold uppercase tracking-[.18em]">
                  Your FIT position
                </span>
              </div>

              <h3 className="mt-5 font-display text-[clamp(22px,2.8vw,30px)] font-semibold uppercase leading-[1.08] text-ink">
                Generation income, brought into the same view
              </h3>

              <p className="mt-4 text-[15.5px] font-light leading-[1.68] text-muted">
                {position.potentialFit
                  ? 'Your installation period suggests this system may sit under the Feed-in Tariff scheme.'
                  : 'Where an installation is eligible, Guardian Care brings generation income into the same picture.'}{' '}
                The installation date begins the assessment, but the applicable rate depends on the
                accredited installation details rather than the date alone — so it is confirmed from
                your FIT statement or supplier records before any figure is presented as income.
              </p>

              <p className="mt-4 text-[15.5px] font-light leading-[1.68] text-muted">
                Where applicable, export payments are included too. Some qualifying installations
                without an export meter are paid on a deemed basis rather than on metered export,
                and Guardian Care handles both.
              </p>
            </div>

            <div className="rounded-[18px] bg-bg-2 p-6 ring-1 ring-line-2 min-[760px]:p-7">
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-faint">
                Once the rate is confirmed
              </div>

              {/* Set as a calculation rather than a sentence: this is the one
                  figure on the page a reader may already know by heart, and
                  showing the shape of the sum invites them to check it. */}
              <div className="mt-6 space-y-3">
                <Term label="Generation meter reading" />
                <Operator symbol="×" />
                <Term label="FIT generation rate" value={position.fitRate ? `${position.fitRate}p/kWh` : 'To be confirmed'} />
                <Operator symbol="=" />
                <Term label="Estimated FIT generation income" strong />
              </div>

              <p className="mt-6 border-t border-line-2 pt-4 text-[12.5px] font-light leading-[1.55] text-faint">
                Guardian Care will not print a FIT income figure from an installation date. It asks
                for the statement.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ---------- The three forms of value ---------- */}
        <Reveal delay={0.18} className="mt-4 grid gap-px overflow-hidden rounded-[22px] bg-line-2 ring-1 ring-line-2 min-[760px]:grid-cols-3">
          {[
            {
              index: '01',
              glyph: 'generation' as const,
              name: 'Electricity generated',
              line: 'What your solar system produces.',
              tone: 'text-green'
            },
            {
              index: '02',
              glyph: 'fit' as const,
              name: 'FIT / export income',
              line: 'What you are paid, where applicable.',
              tone: 'text-blue'
            },
            {
              index: '03',
              glyph: 'cost' as const,
              name: 'Grid electricity avoided',
              line: 'What you generate and use yourself instead of purchasing.',
              tone: 'text-amber'
            }
          ].map((item) => (
            <div key={item.index} className="bg-panel p-6 min-[760px]:p-8">
              <div className="flex items-center justify-between">
                <span className={item.tone}>
                  <Glyph name={item.glyph} className="h-7 w-7" />
                </span>
                <span className="mono text-[11px] text-faint">{item.index}</span>
              </div>
              <div className="mt-5 font-display text-[20px] font-semibold uppercase leading-[1.12] text-ink">
                {item.name}
              </div>
              <div className="mt-2 text-[14.5px] font-light leading-[1.55] text-muted">
                {item.line}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.24} className="mt-4 rounded-[18px] border-l-2 border-green/50 bg-panel px-6 py-5 ring-1 ring-line-2">
          <p className="max-w-[820px] text-[15px] font-light leading-[1.65] text-muted">
            Together those three are what the system is actually worth. Most solar owners only ever
            see the first, and it is the least useful of them on its own.
          </p>
        </Reveal>
      </Wrap>
    </Section>
  );
}

/* ---------- Pieces ---------- */

function Line({label, value, tone}: {label: string; value: string; tone?: string}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="text-[14px] font-light text-muted">{label}</dt>
      <dd className={cn('mono text-[14.5px] font-semibold text-ink', tone)}>{value}</dd>
    </div>
  );
}

function Term({label, value, strong}: {label: string; value?: string; strong?: boolean}) {
  return (
    <div
      className={cn(
        'rounded-[12px] px-4 py-3',
        strong ? 'bg-green-glow ring-1 ring-green/40' : 'bg-panel ring-1 ring-line-2'
      )}
    >
      <div className={cn('text-[13.5px] leading-[1.35]', strong ? 'font-medium text-ink' : 'font-light text-muted')}>
        {label}
      </div>
      {value ? <div className="mono mt-1 text-[13px] text-faint">{value}</div> : null}
    </div>
  );
}

function Operator({symbol}: {symbol: string}) {
  return (
    <div className="mono text-center text-[15px] font-semibold text-faint" aria-hidden="true">
      {symbol}
    </div>
  );
}
