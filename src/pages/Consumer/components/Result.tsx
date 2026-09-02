import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import DayCurve from './DayCurve';
import EnergyFlow from './EnergyFlow';
import Glyph from './Glyph';
import StepBack from './StepBack';
import StepField from './StepField';
import {ACTION, LABEL, LIFT_FEATURE, PAD_FEATURE, R_FEATURE, R_TILE, STATEMENT} from './ui';
import {DAILY_ADVICE} from '../../../data/consumerFlow';
import {TONE_TEXT} from '../../../data/command';
import type {Derived} from '../useProfile';
import {cn} from '../../../lib/cn';

/**
 * What Guardian Care would do for this home.
 *
 * An earlier version opened this step by restating the heading, the paragraph
 * and the five checks the reader had just been shown on step two — the whole
 * previous screen, repeated as if it were new. That was the worst thing on the
 * page: it made a three-step journey feel like a two-step one padded out, and
 * it wasted the moment the entire flow builds towards.
 *
 * So step two explains the problem and this one shows the answer working: the
 * readouts they would be given, what is watched on a system like theirs, what
 * a day of it sounds like, and who they would be dealing with. Nothing here
 * appears on any earlier screen.
 *
 * The readouts adapt. A battery owner gets the flow diagram, because their
 * question is where each unit went; solar-only gets the day curve, because
 * theirs is about timing.
 *
 * No savings figure. Nothing here has read a meter, and a number built from
 * two multiple-choice answers would be a lie with a currency symbol on it.
 */
export default function Result({
  derived,
  systemLabel,
  concernLabel,
  onBack
}: {
  derived: Derived;
  systemLabel: string | null;
  concernLabel: string | null;
  onBack: () => void;
}) {
  const advice = DAILY_ADVICE.filter(
    (moment) => derived.hasBattery || !moment.reading.toLowerCase().includes('battery')
  ).slice(0, 3);

  return (
    <Section id="c-profile" className="relative isolate overflow-hidden">
      <StepField tone="green" />
      <Wrap>
        <StepBack label="Change my answers" onClick={onBack} />

        <Reveal className="mb-12 max-w-[760px]">
          <div className={cn(LABEL, 'mb-5 text-blue')}>Built for your home</div>
          <h2 className="font-display text-[clamp(36px,5.2vw,66px)] font-semibold uppercase leading-[0.98] tracking-[-0.02em]">
            This is what
            <br />
            <span className="text-brand-gradient">you would get.</span>
          </h2>

          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2 border-t border-line-2 pt-7">
            {[systemLabel?.replace(/^I have /, ''), concernLabel].filter(Boolean).map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-panel px-4 py-1.5 text-[13px] text-muted ring-1 ring-line-2"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>

        {/* The payoff: the readouts themselves. */}
        <Reveal
          className={cn(R_FEATURE, PAD_FEATURE, 'bg-panel')}
          style={{boxShadow: LIFT_FEATURE}}
        >
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <span className={cn(LABEL, 'text-faint')}>Your readouts</span>
              <p className="mt-2 max-w-[46ch] text-[15px] font-light leading-[1.5] text-muted">
                What Guardian Care would put in front of you, every day.
              </p>
            </div>
            <span className="text-[13px] font-light text-faint">
              One illustrative day, not your readings
            </span>
          </div>

          {derived.hasBattery ? <EnergyFlow /> : null}
          <div className={derived.hasBattery ? 'mt-9 border-t border-line-2 pt-9' : ''}>
            <DayCurve />
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 min-[1000px]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <Reveal>
            <div className={cn(LABEL, 'mb-6 border-t border-line-2 pt-6 text-faint')}>
              Watched every day
            </div>

            {derived.watches.map((watch) => (
              <div
                key={watch.key}
                className="flex items-start gap-4 border-t border-line-2 py-5 first:border-t-0 first:pt-0"
              >
                <span
                  className={cn(
                    R_TILE,
                    "grid h-11 w-11 shrink-0 place-items-center bg-ink/[0.04]",
                    TONE_TEXT[watch.tone]
                  )}
                >
                  <Glyph name={watch.glyph} className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-[17px] font-normal leading-[1.3] tracking-[-0.005em] text-ink">
                    {watch.title}
                  </h3>
                  <p className="mt-1.5 max-w-[42ch] text-[14px] font-light leading-[1.55] text-muted">
                    {watch.detail}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.06}>
            <div className={cn(LABEL, "mb-6 border-t border-line-2 pt-6 text-faint")}>
              And what it would say
            </div>

            {advice.map((moment) => (
              <div key={moment.time} className="border-t border-line-2 py-5 first:border-t-0 first:pt-0">
                <div className="mono mb-2 text-[12px] text-faint">{moment.time}</div>
                <p className="text-[16px] font-normal leading-[1.35] tracking-[-0.005em] text-ink">
                  {moment.reading}
                </p>
                <p className="mt-1.5 text-[14px] font-light leading-[1.55] text-muted">
                  {moment.action}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* One action. No form: a name and a phone number buy nothing here that
            the dashboard cannot ask for once somebody is inside it. */}
        <Reveal
          className={cn(R_FEATURE, PAD_FEATURE, "relative mt-6 overflow-hidden bg-panel")}
          style={{boxShadow: LIFT_FEATURE}}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(150deg, color-mix(in srgb, var(--color-green) 14%, transparent), transparent 58%)'
            }}
          />

          <div className="relative max-w-[52ch]">
            <h3 className={STATEMENT}>Open your dashboard and see your own system.</h3>
            <p className="mt-5 text-[16px] font-light leading-[1.65] text-muted">
              Guardian Care reaches you through the company that installed your system — the
              monitoring, the advice and the person on the phone all come from them.
            </p>

            <a href="#c-profile" className={cn(ACTION, 'mt-8')}>
              Go to my dashboard
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </Wrap>
    </Section>
  );
}
