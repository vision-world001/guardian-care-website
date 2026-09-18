import Counter from '../../../components/Counter';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Estimated, Section, SectionHead, Wrap} from '../../../components/ui';
import {SELF_USE, type PlanPosition} from '../../../data/plan';
import {cn} from '../../../lib/cn';

/**
 * The estimate, with its arithmetic on the page.
 *
 * Every solar quotation in existence contains a saving figure. Almost none of
 * them show where it came from, which is why almost none of them are believed.
 * This one prints the multiplication — kilowatt-hours displaced, times the rate
 * the visitor said they pay — so a reader can check it, argue with it, or take
 * it to an installer and ask why their number is different.
 *
 * The standing charge is separated out before anything else happens. Dividing a
 * whole bill by a unit rate silently credits solar with a cost it can never
 * remove, and the resulting figure is wrong in the direction that flatters the
 * seller.
 */
export default function Position({position}: {position: PlanPosition}) {
  const {annualSpend, annualStanding, annualEnergy, importRate} = position;

  /* The share of the bill solar can influence at all, for the split bar. */
  const energyShare =
    annualSpend && annualEnergy ? Math.round((annualEnergy / annualSpend) * 100) : null;

  return (
    <Section id="estimate" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Your energy intelligence estimate"
          tone="blue"
          title="What your position looks like now — and after"
          body="Built from your own answers. Every figure is an estimate and says so; the ones that matter are shown with the sum that produced them."
        />

        <div className="grid gap-4 min-[980px]:grid-cols-2">
          {/* ---------- Now ---------- */}
          <Reveal className="rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-8">
            <div className="flex items-center gap-3 text-amber">
              <Glyph name="cost" className="h-7 w-7" />
              <span className="text-[10.5px] font-bold uppercase tracking-[.18em]">
                Your current position
              </span>
            </div>

            <dl className="mt-6 divide-y divide-line-2">
              <Row
                label="Estimated annual electricity spend"
                value={annualSpend === null ? '—' : `£${annualSpend.toLocaleString('en-GB')}`}
              />
              <Row
                label="Estimated annual usage"
                value={
                  position.annualKwh === null
                    ? '—'
                    : `${position.annualKwh.toLocaleString('en-GB')} kWh`
                }
              />
              <Row label="Import rate" value={`${importRate}p/kWh`} />
              <Row
                label="Off-peak rate"
                value={position.offPeakRate === null ? 'None given' : `${position.offPeakRate}p/kWh`}
              />
              <Row label="Grid dependency" value="High" tone="text-amber" />
              <Row label="Current solar" value="None" />
              <Row label="Battery storage" value="None" />
            </dl>
          </Reveal>

          {/* ---------- After ---------- */}
          <Reveal
            delay={0.06}
            className="rounded-[22px] bg-[linear-gradient(125deg,var(--color-green-glow),var(--color-blue-glow))] p-6 ring-1 ring-line min-[760px]:p-8"
          >
            <div className="flex items-center gap-3 text-green">
              <Glyph name="generation" className="h-7 w-7" />
              <span className="text-[10.5px] font-bold uppercase tracking-[.18em]">
                Potential solar position
              </span>
            </div>

            <dl className="mt-6 divide-y divide-line">
              <Row
                label="Estimated solar capacity"
                value={position.systemKw === null ? '—' : `${position.systemKw} kWp`}
                tone="text-green"
              />
              <Row
                label="Indicative panel count"
                value={position.panels === null ? '—' : `${position.panels} panels`}
              />
              <Row
                label="Estimated annual generation"
                value={
                  position.annualGeneration === null
                    ? '—'
                    : `${position.annualGeneration.toLocaleString('en-GB')} kWh`
                }
                tone="text-green"
              />
              <Row label="Potential grid dependency" value="Reduced" tone="text-green" />
              <Row
                label="Battery opportunity"
                value={
                  position.batteryKwh ? `${position.batteryKwh} kWh — for review` : 'For review'
                }
                tone="text-purple"
              />
            </dl>

            <p className="mt-6 border-t border-line pt-5 text-[13.5px] font-light leading-[1.6] text-muted">
              Generation alone is not the point. The next question is how much of it you could
              actually use.
            </p>
          </Reveal>
        </div>

        {/* ---------- The working ---------- */}
        <Reveal delay={0.12} className="mt-4 overflow-hidden rounded-[22px] bg-panel ring-1 ring-line-2">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line-2 px-6 py-5 min-[760px]:px-9">
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                Estimated grid cost reduction
              </div>
              <div className="mt-1.5 text-[13px] font-light text-faint">
                Shown as the sum, at the rate you gave us
              </div>
            </div>
            <Estimated label="Estimated energy opportunity" />
          </div>

          <div className="grid gap-px bg-line-2 min-[900px]:grid-cols-2">
            <Working
              tone="green"
              heading="Solar used directly"
              note={`Around ${Math.round(SELF_USE.without * 100)}% of generation, capped by what the property actually uses`}
              rows={[
                [
                  'Solar electricity used directly',
                  position.directKwh === null
                    ? '—'
                    : `${position.directKwh.toLocaleString('en-GB')} kWh/yr`
                ],
                ['Import rate', `${importRate}p/kWh`]
              ]}
              total={position.directValue === null ? '—' : `£${position.directValue.toFixed(0)}`}
              totalNote="avoided grid-energy cost, per year"
            />

            <Working
              tone="purple"
              heading="With battery storage"
              note={`Lifts self-consumption to around ${Math.round(SELF_USE.with * 100)}%, by holding surplus back for the evening`}
              rows={[
                [
                  'Additional electricity used',
                  position.batteryExtraKwh === null
                    ? '—'
                    : `${position.batteryExtraKwh.toLocaleString('en-GB')} kWh/yr`
                ],
                ['Import rate', `${importRate}p/kWh`]
              ]}
              total={
                position.batteryExtraValue === null
                  ? '—'
                  : `£${position.batteryExtraValue.toFixed(0)}`
              }
              totalNote="further avoided cost, per year"
            />
          </div>

          <div className="border-t border-line-2 bg-bg-2 px-6 py-7 min-[760px]:px-9">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                  Potential combined avoided grid-energy cost
                </div>
                <div className="mono mt-3 text-[clamp(34px,5vw,54px)] font-semibold leading-none text-green">
                  {position.combinedValue === null ? (
                    '—'
                  ) : (
                    <Counter value={`£${position.combinedValue.toFixed(0)}`} />
                  )}
                  <span className="mono ml-2 text-[13px] font-normal text-faint">per year</span>
                </div>
              </div>

              <ul className="grid max-w-[420px] gap-x-6 gap-y-1 text-[12.5px] font-light text-faint min-[520px]:grid-cols-2">
                {[
                  'Final system size',
                  'Roof suitability',
                  'Weather',
                  'Household electricity use',
                  'Battery capacity',
                  'Tariff',
                  'System configuration',
                  'Export arrangement'
                ].map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>

            <p className="mt-6 border-t border-line-2 pt-4 text-[12.5px] font-light leading-[1.55] text-faint">
              Actual performance depends on everything listed above. This is an estimated energy
              opportunity, not a guaranteed saving and not a quotation.
            </p>
          </div>
        </Reveal>

        {/* ---------- Standing charges ---------- */}
        <Reveal delay={0.18} className="mt-4 rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-9">
          <div className="grid gap-8 min-[900px]:grid-cols-[1fr_1fr]">
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-amber">
                What about standing charges?
              </div>
              <h3 className="mt-4 font-display text-[clamp(21px,2.7vw,30px)] font-semibold uppercase leading-[1.08] text-ink">
                Solar cannot touch all of your bill
              </h3>
              <p className="mt-4 text-[15.5px] font-light leading-[1.68] text-muted">
                Solar and storage reduce the amount of electricity purchased from the grid. The
                standing charge normally remains payable for as long as the property stays connected
                to the network — so Guardian Care separates the two before calculating anything, and
                only ever claims credit for the part solar can realistically influence.
              </p>
            </div>

            <div>
              {annualSpend && annualEnergy && energyShare !== null ? (
                <>
                  {/* The bill, split. One bar says more here than a paragraph:
                      the reader sees immediately which slice is in play. */}
                  <div className="flex h-14 overflow-hidden rounded-[12px] ring-1 ring-line-2">
                    <div
                      className="flex items-center justify-center bg-green/20"
                      style={{width: `${energyShare}%`}}
                    >
                      <span className="mono text-[12px] font-semibold text-green">
                        {energyShare}%
                      </span>
                    </div>
                    <div
                      className="flex flex-1 items-center justify-center bg-amber/15"
                      style={{width: `${100 - energyShare}%`}}
                    >
                      <span className="mono text-[12px] font-semibold text-amber">
                        {100 - energyShare}%
                      </span>
                    </div>
                  </div>

                  <dl className="mt-5 divide-y divide-line-2">
                    <Row
                      label="Electricity usage cost — solar can reduce this"
                      value={`£${annualEnergy.toLocaleString('en-GB')}/yr`}
                      tone="text-green"
                    />
                    <Row
                      label="Standing charge — payable regardless"
                      value={`£${annualStanding.toLocaleString('en-GB')}/yr`}
                      tone="text-amber"
                    />
                    <Row
                      label="Total annual spend"
                      value={`£${annualSpend.toLocaleString('en-GB')}/yr`}
                    />
                  </dl>
                </>
              ) : (
                <div className="rounded-[18px] bg-bg-2 p-6 text-[14.5px] font-light leading-[1.6] text-muted ring-1 ring-line-2">
                  Answer the assessment above and Guardian Care will split your own bill into the
                  part solar can influence and the part it cannot.
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Wrap>
    </Section>
  );
}

/* ---------- Pieces ---------- */

function Row({label, value, tone}: {label: string; value: string; tone?: string}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-[14px] font-light leading-[1.4] text-muted">{label}</dt>
      <dd className={cn('mono shrink-0 text-right text-[14.5px] font-semibold text-ink', tone)}>
        {value}
      </dd>
    </div>
  );
}

function Working({
  tone,
  heading,
  note,
  rows,
  total,
  totalNote
}: {
  tone: 'green' | 'purple';
  heading: string;
  note: string;
  rows: Array<[string, string]>;
  total: string;
  totalNote: string;
}) {
  return (
    <div className="bg-panel p-6 min-[760px]:p-8">
      <div
        className={cn(
          'text-[10.5px] font-bold uppercase tracking-[.18em]',
          tone === 'green' ? 'text-green' : 'text-purple'
        )}
      >
        {heading}
      </div>
      <p className="mt-2 text-[13px] font-light leading-[1.5] text-faint">{note}</p>

      <dl className="mt-5 divide-y divide-line-2">
        {rows.map(([label, value]) => (
          <Row key={label} label={label} value={value} />
        ))}
      </dl>

      <div className="mt-5 border-t border-line-2 pt-5">
        <div
          className={cn(
            'mono text-[clamp(24px,3.2vw,34px)] font-semibold leading-none',
            tone === 'green' ? 'text-green' : 'text-purple'
          )}
        >
          {total}
        </div>
        <div className="mt-2 text-[12.5px] font-light text-faint">{totalNote}</div>
      </div>
    </div>
  );
}
