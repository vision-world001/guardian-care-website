import Counter from '../../../components/Counter';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {HAIRLINE_GRID, Section, SectionHead, Wrap} from '../../../components/ui';
import {TONE_BG, TONE_TEXT} from '../../../data/command';
import {CONTINUES, DASHBOARD, GOAL_STEPS, INSTALL_STEPS, STAGES} from '../../../data/plan';
import {cn} from '../../../lib/cn';

/**
 * What happens after the van leaves.
 *
 * This is where the journey stops being a solar quotation. Every competing page
 * ends at installation; this one treats installation as step three of five and
 * spends its last section on what the customer holds a year later. The dashboard
 * readings are one real day on a system with storage — generated splits exactly
 * across used, stored and exported — so the section demonstrates the platform
 * rather than describing it.
 */
export default function Afterwards() {
  return (
    <Section id="after" hairline>
      <Wrap>
        <SectionHead
          eyebrow="From estimate to installation"
          index="05 / 05"
          title="Five steps, and then it keeps going"
          body="If the initial energy position looks right, this is what follows. Note that two of the five happen after the system is producing."
        />

        <ol className={cn(HAIRLINE_GRID, 'grid-cols-1 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-5')}>
          {INSTALL_STEPS.map((step, index) => (
            <Reveal key={step.index} as="li" delay={index * 0.05} className="bg-panel p-6">
              <span className="mono text-[11.5px] font-semibold text-green">{step.index}</span>
              <div className="mt-3 text-[16px] font-medium leading-[1.25] text-ink">{step.name}</div>
              <div className="mt-2 text-[13.5px] font-light leading-[1.5] text-muted">
                {step.line}
              </div>
            </Reveal>
          ))}
        </ol>

        {/* ---------- The dashboard that arrives ---------- */}
        <div className="mt-16">
          <Reveal className="mb-8 max-w-[660px]">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">
              Your customer dashboard
            </div>
            <h3 className="mt-3 font-display text-[clamp(24px,3.2vw,36px)] font-semibold uppercase leading-[1.06] text-ink">
              You do not simply receive panels and an inverter
            </h3>
            <p className="mt-4 text-[15.5px] font-light leading-[1.65] text-muted">
              Guardian Care begins building a real picture of what the system produces, how much you
              use directly, how much the battery stores, how much you export, how much you still
              purchase, and what that grid electricity costs. One day on a connected system looks
              like this.
            </p>
          </Reveal>

          <Reveal className={cn(HAIRLINE_GRID, 'grid-cols-2 min-[760px]:grid-cols-3 min-[1100px]:grid-cols-6')}>
            {DASHBOARD.map((reading) => (
              <div key={reading.key} className="bg-panel px-5 py-6">
                <span className={cn('mb-4 inline-block', TONE_TEXT[reading.tone])}>
                  <Glyph name={reading.glyph} className="h-6 w-6" />
                </span>
                <div className="text-[10.5px] font-bold uppercase leading-[1.4] tracking-[.14em] text-faint">
                  {reading.label}
                </div>
                <div
                  className={cn(
                    'mono mt-2.5 text-[clamp(22px,2.8vw,30px)] font-semibold leading-none',
                    TONE_TEXT[reading.tone]
                  )}
                >
                  <Counter value={reading.value} />
                </div>
                <div className="mono mt-2 text-[11.5px] text-faint">{reading.unit}</div>
              </div>
            ))}
          </Reveal>

          {/* ---------- And what it keeps looking for ---------- */}
          <Reveal className="mt-4 rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-8">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              Guardian Care continues analysing
            </div>
            <ul className="mt-6 grid gap-x-8 gap-y-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3">
              {CONTINUES.map((item) => (
                <li key={item.name} className="flex items-start gap-3.5">
                  <span className={cn('mt-[7px] h-2 w-2 shrink-0 rounded-full', TONE_BG[item.tone])} />
                  <span>
                    <span className="block text-[15px] font-medium leading-[1.3] text-ink">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[13.5px] font-light leading-[1.5] text-muted">
                      {item.line}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---------- The ladder ---------- */}
        <div className="mt-16">
          <Reveal className="mb-8 max-w-[620px]">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              Four positions
            </div>
            <h3 className="mt-3 font-display text-[clamp(24px,3.2vw,36px)] font-semibold uppercase leading-[1.06] text-ink">
              Where you are, and where this goes
            </h3>
          </Reveal>

          <div className="grid gap-3 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-4">
            {STAGES.map((stage, index) => (
              <Reveal
                key={stage.name}
                delay={index * 0.06}
                className={cn(
                  'relative overflow-hidden rounded-[18px] p-6',
                  index === STAGES.length - 1
                    ? 'bg-[linear-gradient(140deg,var(--color-green-glow),var(--color-blue-glow))] ring-1 ring-line'
                    : 'bg-panel ring-1 ring-line-2'
                )}
              >
                <span className={cn('mb-4 block h-2 w-2 rounded-full', TONE_BG[stage.tone])} />
                <div className="font-display text-[19px] font-semibold uppercase leading-[1.12] text-ink">
                  {stage.name}
                </div>
                <p className="mt-3 text-[14px] font-light leading-[1.55] text-muted">{stage.line}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------- The point ---------- */}
        <Reveal className="mt-16 rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-9">
          <div className="grid gap-8 min-[900px]:grid-cols-[1fr_1.1fr]">
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                Your goal
              </div>
              <h3 className="mt-4 font-display text-[clamp(22px,2.9vw,32px)] font-semibold uppercase leading-[1.08] text-ink">
                Guardian Care is not designed to help you own solar panels
              </h3>
              <p className="mt-4 text-[15.5px] font-light leading-[1.68] text-muted">
                It is designed to help you build a more intelligent energy position — which is a
                different objective, and occasionally reaches a different conclusion about whether
                you should buy anything at all.
              </p>
            </div>

            <ol className="space-y-3">
              {GOAL_STEPS.map((line, index) => (
                <li key={line} className="flex items-start gap-4 rounded-[12px] bg-bg-2 px-4 py-3.5 ring-1 ring-line-2">
                  <span className="mono shrink-0 text-[12px] font-semibold text-green">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14.5px] font-light leading-[1.45] text-ink/85">{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Wrap>
    </Section>
  );
}
