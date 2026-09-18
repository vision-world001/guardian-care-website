import Counter from '../../../components/Counter';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {ACTION, Estimated, Section, SectionHead, Wrap} from '../../../components/ui';
import {ERA_LABEL, type ExistingPosition} from '../../../data/existing';
import {cn} from '../../../lib/cn';

/**
 * The initial position, assembled from eight answers.
 *
 * Every figure here is an estimate and every figure says so. That is not
 * hedging — it is the product's argument. The whole point of the next section
 * is that estimates become readings once something is actually measuring, and a
 * page that presented these as facts would have nothing left to offer.
 */

export default function Result({position}: {position: ExistingPosition}) {
  const observation = observe(position);

  return (
    <Section id="position" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Your initial assessment"
          title="What Guardian Care can already tell"
          body="From eight answers and nothing else. This is a starting position, not a measurement — which is exactly why it is worth replacing with one."
        />

        <div className="grid gap-4 min-[980px]:grid-cols-2">
          {/* ---------- The system ---------- */}
          <Reveal className="rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-8">
            <div className="flex items-center gap-3 text-green">
              <Glyph name="existing" className="h-7 w-7" />
              <span className="text-[10.5px] font-bold uppercase tracking-[.18em]">
                Your solar system
              </span>
            </div>

            <dl className="mt-6 divide-y divide-line-2">
              <Row label="Installation" value={position.era ? ERA_LABEL[position.era] : 'Not given'} />
              <Row label="System age" value={position.ageYears === null ? '—' : `${position.ageYears} years`} />
              <Row label="Panels" value={position.panels === null ? '—' : String(position.panels)} />
              <Row
                label="Estimated capacity"
                value={position.systemKw === null ? '—' : `${position.systemKw} kWp`}
              />
              <Row
                label="Battery"
                value={
                  position.hasBattery
                    ? position.batteryKwh
                      ? `${position.batteryKwh} kWh`
                      : 'Yes'
                    : 'None'
                }
              />
              <Row
                label="Potential FIT installation"
                value={position.potentialFit ? 'Yes — confirmation required' : 'Unlikely'}
                tone={position.potentialFit ? 'text-green' : undefined}
              />
            </dl>
          </Reveal>

          {/* ---------- The energy position ---------- */}
          <Reveal delay={0.06} className="rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-8">
            <div className="flex items-center gap-3 text-amber">
              <Glyph name="cost" className="h-7 w-7" />
              <span className="text-[10.5px] font-bold uppercase tracking-[.18em]">
                Your current energy position
              </span>
            </div>

            <dl className="mt-6 divide-y divide-line-2">
              <Row
                label="Monthly electricity bill"
                value={position.monthlyBill === null ? '—' : `£${position.monthlyBill}`}
              />
              <Row
                label="Estimated annual spend"
                value={
                  position.annualSpend === null
                    ? '—'
                    : `£${position.annualSpend.toLocaleString('en-GB')}`
                }
              />
              <Row label="Import rate" value={`${position.importRate}p/kWh`} />
              <Row label="Export rate" value={`${position.exportRate}p/kWh`} />
              <Row label="Standing charge" value={`${position.standingCharge}p/day`} />
              <Row
                label="FIT generation rate"
                value={position.fitRate === null ? 'To be confirmed' : `${position.fitRate}p/kWh`}
              />
            </dl>
          </Reveal>
        </div>

        {/* ---------- The observation ---------- */}
        <Reveal
          delay={0.12}
          className="mt-4 overflow-hidden rounded-[22px] bg-[linear-gradient(115deg,var(--color-green-glow),var(--color-blue-glow))] ring-1 ring-line"
        >
          <div className="p-6 min-[760px]:p-9">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              Initial Guardian Care observation
            </div>
            <p className="mt-4 max-w-[760px] font-display text-[clamp(20px,2.6vw,28px)] font-medium uppercase leading-[1.18] text-ink">
              {observation.headline}
            </p>
            <p className="mt-4 max-w-[720px] text-[15.5px] font-light leading-[1.65] text-muted">
              {observation.body}
            </p>
          </div>

          <div className="border-t border-line bg-panel/60 p-6 backdrop-blur-[10px] min-[760px]:px-9 min-[760px]:py-7">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">
              Opportunity identified
            </div>
            <p className="mt-3 max-w-[760px] text-[15.5px] font-light leading-[1.65] text-muted">
              {observation.opportunity}
            </p>
          </div>
        </Reveal>

        {/* ---------- The three estimated figures ---------- */}
        <Reveal delay={0.18} className="mt-4 grid gap-px overflow-hidden rounded-[22px] bg-line-2 ring-1 ring-line-2 min-[760px]:grid-cols-3">
          <Figure
            label="Estimated annual solar generation"
            value={
              position.annualKwh === null
                ? '—'
                : `${position.annualKwh.toLocaleString('en-GB')}`
            }
            unit="kWh"
            tone="text-green"
          />
          <Figure
            label="Estimated monthly electricity cost"
            value={position.monthlyBill === null ? '—' : `£${position.monthlyBill}`}
            unit="per month"
            tone="text-amber"
          />
          <Figure
            label="Estimated annual electricity spend"
            value={
              position.annualSpend === null
                ? '—'
                : `£${position.annualSpend.toLocaleString('en-GB')}`
            }
            unit="per year"
            tone="text-orange"
          />
        </Reveal>

        {/* ---------- Free electricity ---------- */}
        <Reveal delay={0.24} className="mt-4 rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-9">
          <div className="grid gap-8 min-[900px]:grid-cols-[1fr_320px]">
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                Your free electricity opportunity
              </div>
              <h3 className="mt-4 font-display text-[clamp(24px,3.2vw,36px)] font-semibold uppercase leading-[1.06] text-ink">
                Generation is not the number that matters
              </h3>
              <p className="mt-4 max-w-[560px] text-[15.5px] font-light leading-[1.68] text-muted">
                Your system creates electricity at the property. When your home consumes it directly,
                it reduces what has to be purchased from the grid at that moment. Guardian Care calls
                that your <b className="font-medium text-ink">free electricity use</b> — and the
                objective is to find out how much of your available generation you are actually
                taking advantage of.
              </p>
              <p className="mt-4 max-w-[560px] text-[15.5px] font-light leading-[1.68] text-muted">
                Right now nobody knows. Your system may be producing surplus through the middle of
                the day while the property still depends on the grid outside solar hours. That is a
                pattern, not a fault — and it is invisible without measurement.
              </p>
            </div>

            <div className="rounded-[18px] bg-bg-2 p-6 ring-1 ring-line-2">
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">
                What connecting would establish
              </div>
              <ul className="mt-5 space-y-3.5">
                {[
                  'How much solar you generate',
                  'How much you use directly',
                  'How much you export',
                  'How much you later buy from the grid'
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[14.5px] font-light leading-[1.5] text-ink/85">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-line-2 pt-5 text-[13px] font-light leading-[1.55] text-faint">
                With those four, every estimate on this page becomes a reading.
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line-2 pt-7">
            <a href="#connect" className={ACTION}>
              See what connecting shows
            </a>
            <span className="text-[13.5px] font-light text-faint">
              Everything above stays labelled as an estimate until it is measured.
            </span>
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
      <dt className="text-[14px] font-light text-muted">{label}</dt>
      <dd className={cn('mono text-right text-[14.5px] font-semibold text-ink', tone)}>{value}</dd>
    </div>
  );
}

function Figure({
  label,
  value,
  unit,
  tone
}: {
  label: string;
  value: string;
  unit: string;
  tone: string;
}) {
  return (
    <div className="bg-panel p-6 min-[760px]:p-8">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[11px] font-bold uppercase leading-[1.4] tracking-[.14em] text-faint">
          {label}
        </div>
        <Estimated />
      </div>
      <div className={cn('mono mt-5 text-[clamp(30px,4vw,44px)] font-semibold leading-none', tone)}>
        <Counter value={value} />
      </div>
      <div className="mono mt-2 text-[12px] text-faint">{unit}</div>
    </div>
  );
}

/* ---------- What the answers add up to ---------- */

type Observation = {headline: string; body: string; opportunity: string};

/**
 * The one paragraph the assessment exists to produce.
 *
 * Four cases rather than one generic sentence, because a household with a full
 * battery and a household with none are not looking at the same problem, and a
 * page that tells them both the same thing has told neither of them anything.
 */
function observe(position: ExistingPosition): Observation {
  const buying = position.monthlyBill !== null && position.monthlyBill > 0;

  if (!position.hasBattery) {
    return {
      headline: 'Your system appears to generate solar electricity without storage',
      body: buying
        ? 'Surplus that is not used directly in the home is exported at the moment it is made. At the same time, your monthly electricity cost suggests the property continues to purchase electricity from the grid — most likely outside solar-generation hours, at a rate several times what those exported units earned.'
        : 'Surplus that is not used directly in the home is exported at the moment it is made, rather than being held back for later in the day.',
      opportunity:
        'Guardian Care recommends establishing exactly when your solar is produced, how much of it is used within the property, and how much electricity is leaving or entering through the grid. Until those three are measured, whether storage would pay for itself here is a guess.'
    };
  }

  if (position.exporting) {
    return {
      headline: 'You have storage, and surplus is still leaving the property',
      body: 'A battery that exports while it has capacity left is usually a timing problem rather than a hardware one — charge windows set against a tariff that has since changed, or a system holding reserve it does not need. Both are configuration, and both are invisible without data.',
      opportunity:
        'Guardian Care recommends measuring when your battery charges, when it empties, and how that timing lines up against the hours the property is actually drawing power.'
    };
  }

  return {
    headline: 'You have generation and storage. The question is timing',
    body: 'On paper this is the complete setup. What determines whether it delivers is whether the battery fills from surplus rather than from the grid, and whether it discharges into the hours you are home rather than into the middle of the night.',
    opportunity:
      'Guardian Care recommends monitoring the relationship between generation, storage and grid import across a full day, so that the system can be judged on what it does rather than on what it contains.'
  };
}
