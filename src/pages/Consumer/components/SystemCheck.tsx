import Assessment from '../../../components/Assessment/Assessment';
import type {Answers, ProfileLine} from '../../../components/Assessment/types';
// import Photo from '../../../components/Photo';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {ERA_LABEL, EXISTING_STEPS, type ExistingPosition} from '../../../data/consumer';
import {cn} from '../../../lib/cn';
/* `LABEL_BASE` belongs with the commented-out photo block below — put it back
   on this line if that section is re-enabled. */
import {LABEL} from '../../../components/kit';

/**
 * The close, and the thing it asks for.
 *
 * Everything above has been explanation. This is the one section that asks the
 * reader to do something, so it earns the page's only photograph — a real roof,
 * because after six sections of diagrams the object being discussed should be
 * a house again — and then puts the questions directly under it rather than
 * behind another button. A closing call to action that only scrolls somewhere
 * else is one more click between a decided reader and the thing they decided.
 *
 * `#check` sits on the questions rather than on the photograph, so every
 * "Check my system" on the page lands on the first question and not on a
 * headline the reader has to scroll past.
 */
export default function SystemCheck({
  answers,
  position,
  done,
  onChange,
  onComplete,
  onReset
}: {
  answers: Answers;
  position: ExistingPosition;
  done: boolean;
  onChange: (next: Answers) => void;
  onComplete: () => void;
  onReset: () => void;
}) {
  return (
    <Section id="unseen" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        {/* ---------- The closing argument, over the thing it is about ---------- */}
        {/* <Reveal animation="animate-card-in" className="ring-lit overflow-hidden rounded-frame">
          <Photo
            src="/assets/photos/home.jpg"
            alt="A house with solar panels on its roof, photographed at sunset"
            className="h-[500px] min-[760px]:h-[460px]"
            imgClassName="object-[50%_30%]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, color-mix(in srgb, var(--color-bg) 90%, transparent), color-mix(in srgb, var(--color-bg) 62%, transparent) 46%, color-mix(in srgb, var(--color-bg) 10%, transparent) 80%)'
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 min-[760px]:p-12">
              <div className={cn(LABEL_BASE, 'text-[11px] tracking-[.22em] text-amber')}>
                 A long-term energy asset
              </div>
              <h2 className="mt-5 max-w-[680px] font-display text-[clamp(30px,4.6vw,54px)] font-semibold uppercase leading-[0.98] tracking-[-0.015em] text-ink">
                Your solar system should not be
                <br />
                <span className="text-brand-gradient">left unseen.</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[16.5px] font-light leading-[1.65] text-ink/80">
                Solar is a long-term energy asset. Guardian Care gives you ongoing visibility of how
                that asset is performing — and how it is affecting your energy costs.
              </p>
            </div>
          </Photo>
        </Reveal> */}

        {/* ---------- And the thing it asks for ---------- */}
        <div id="check" className="scroll-mt-24 pt-16 min-[760px]:pt-20">
          <Reveal className="mb-10 grid gap-6 min-[1000px]:grid-cols-[1fr_auto] min-[1000px]:items-end">
            <div className="max-w-[640px]">
              <div className={cn(LABEL, 'text-amber')}> Start my system check</div>
              <h3 className="mt-4 font-display text-[clamp(28px,3.8vw,44px)] font-semibold uppercase leading-[1] tracking-[-0.01em] text-ink">
                Check my existing solar system
              </h3>
              <p className="mt-4 text-[16.5px] font-light leading-[1.65] text-muted">
                Tell us a few simple details about your installation and Guardian Care will begin
                building your system profile. Your summary appears the moment you finish.
              </p>
            </div>

            <ul className="mono flex flex-col gap-2 text-[10.5px] uppercase tracking-[.14em] text-faint">
              {['Every question says why it is asked', '“I’m not sure” is always an answer', 'Nothing to download or sign'].map(
                (line) => (
                  <li key={line} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-green" />
                    {line}
                  </li>
                )
              )}
            </ul>
          </Reveal>

          <Reveal>
            <Assessment
              steps={EXISTING_STEPS}
              answers={answers}
              onChange={onChange}
              onComplete={onComplete}
              onReset={onReset}
              done={done}
              finishLabel="Build my system summary"
              profile={{heading: 'Your system profile', lines: profileLines(position)}}
            />
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}

/**
 * What the answers have bought, so far.
 *
 * "Being calculated" rather than a blank wherever a figure genuinely depends on
 * an answer that has not arrived yet — an empty row says the platform has
 * nothing, and this one has something waiting on the reader.
 */
function profileLines(position: ExistingPosition): ProfileLine[] {
  return [
    {
      label: 'Installed',
      value: position.era ? ERA_LABEL[position.era] : null,
      pending: 'Not yet answered'
    },
    {
      label: 'System age',
      value: position.ageYears === null ? null : `${position.ageYears} years`,
      pending: 'Being calculated'
    },
    {
      label: 'Panels',
      value: position.panels === null ? null : String(position.panels)
    },
    {
      label: 'Estimated system size',
      value: position.systemKw === null ? null : `${position.systemKw} kWp`,
      pending: 'Being calculated'
    },
    {
      label: 'Estimated generation',
      value:
        position.annualKwh === null ? null : `${position.annualKwh.toLocaleString('en-GB')} kWh/yr`,
      pending: 'Being calculated'
    },
    {
      label: 'Battery storage',
      value: position.hasBattery
        ? position.batteryKwh
          ? `${position.batteryKwh} kWh`
          : 'Yes'
        : position.era
          ? 'None recorded'
          : null
    },
    {
      label: 'Potential FIT',
      value: position.era ? (position.potentialFit ? 'Yes — to confirm' : 'Unlikely') : null,
      pending: 'Awaiting install date'
    },
    {
      label: 'Monthly bill',
      value: position.monthlyBill === null ? null : `£${position.monthlyBill}`
    },
    {
      label: 'Import rate',
      value: position.monthlyBill === null ? null : `${position.importRate}p/kWh`
    }
  ];
}
