import {useState} from 'react';
import type {ReactNode} from 'react';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {TONE_TEXT, TONE_VAR} from '../../../data/command';
import {
  HOME_POSITION,
  OPPORTUNITIES,
  SERVICE_STEPS,
  STEP_PHASES,
  type PhaseKey,
  type ServiceStep,
  type StepPhase
} from '../../../data/consumer';
import {cn} from '../../../lib/cn';
import {Heading, LABEL, dottedRail, tint} from '../../../components/kit';
import BirdsEye from './steps/BirdsEye';
import Monitoring from './steps/Monitoring';
import {Explanation, OpportunityPicker} from './steps/Opportunities';
import Profile from './steps/Profile';
import SystemSummary from './steps/SystemSummary';
import Tracked from './steps/Tracked';

/**
 * How the service works, in seven steps.
 *
 * Every step is shown rather than described. The brief lists what the profile
 * holds, what the summary contains, what gets tracked and what an insight says
 * — and each of those lists is drawn here as the object it describes, filled in
 * for the same example household. A reader skimming the headlines down the left
 * gets the process; a reader looking at the right gets the product.
 *
 * The rail carries the argument the home page's pipeline makes. For the two
 * estimate steps it is a plain hairline: nothing is flowing, because nothing is
 * measuring. Connect wears a ring, because it is the moment the sequence
 * changes kind. From there the line is the crawling dotted current the rest of
 * the site draws energy with, because from there the house is being read.
 *
 * Steps 06 and 07 share one piece of state. Choosing an opportunity in 06
 * changes the explanation in 07, which is the fastest way to show that every
 * alert arrives with its reasoning attached — two clicks and a reader has seen
 * the pattern without being told it.
 */

const PHASE_BY_KEY = Object.fromEntries(STEP_PHASES.map((phase) => [phase.key, phase])) as Record<
  PhaseKey,
  StepPhase
>;

const HAIRLINE = {background: 'var(--color-line-2)'};

export default function HowItWorks() {
  const [at, setAt] = useState(0);

  const visuals: Record<ServiceStep['key'], ReactNode> = {
    understand: <Profile />,
    summary: (
      <SystemSummary
        position={HOME_POSITION}
        caption="A starting point before live monitoring is connected — and exactly what you receive when you finish the system check."
      />
    ),
    connect: <Monitoring />,
    track: <Tracked />,
    view: <BirdsEye />,
    opportunities: <OpportunityPicker at={at} onPick={setAt} />,
    next: <Explanation opportunity={OPPORTUNITIES[at]} />
  };

  return (
    <Section id="how" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Heading
          eyebrow="◇ How our service works"
          title="Seven steps."
          accent="Guardian Care does the work."
          body="You tell us what you know. We build the picture, connect monitoring where it is suitable, and keep turning your data into clear answers — for as long as you have your system."
        />

        <ol>
          {SERVICE_STEPS.map((step, index) => (
            <Step key={step.key} step={step} index={index}>
              {visuals[step.key]}
            </Step>
          ))}
        </ol>
      </Wrap>
    </Section>
  );
}

/* ---------- One step ---------- */

function Step({step, index, children}: {step: ServiceStep; index: number; children: ReactNode}) {
  const phase = PHASE_BY_KEY[step.phase];
  const tone = TONE_VAR[phase.tone];
  const first = index === 0;
  const last = index === SERVICE_STEPS.length - 1;
  const previous = first ? null : SERVICE_STEPS[index - 1];
  const opensPhase = !previous || previous.phase !== step.phase;

  /* Every step from Connect onward is being read rather than estimated. */
  const live = step.phase !== 'estimate';
  const hinge = step.phase === 'connect';
  const line = live ? dottedRail(tone) : HAIRLINE;

  /* The line above a phase band still belongs to the phase before it. */
  const previousPhase = previous ? PHASE_BY_KEY[previous.phase] : null;
  const lineAbove =
    previous && previous.phase !== 'estimate' && previousPhase
      ? dottedRail(TONE_VAR[previousPhase.tone])
      : HAIRLINE;

  return (
    <li
      id={step.key === 'view' ? 'view' : undefined}
      className="grid scroll-mt-24 grid-cols-[40px_minmax(0,1fr)] gap-x-4 min-[760px]:grid-cols-[64px_minmax(0,1fr)] min-[760px]:gap-x-8"
    >
      {/* ---------- The phase this step opens, above it ---------- */}
      {opensPhase ? (
        <>
          <div className="relative flex justify-center" aria-hidden="true">
            {!first ? (
              <span
                className={cn('absolute inset-y-0', previous?.phase === 'estimate' ? 'w-px' : 'w-0.5')}
                style={lineAbove}
              />
            ) : null}
          </div>
          <Reveal className="pb-9">
            <div className="border-t pt-3" style={{borderColor: tint(tone, 34)}}>
              <span className={cn(LABEL, TONE_TEXT[phase.tone])}>{phase.name}</span>
              <span className="ml-3 text-[12.5px] font-light text-faint">{phase.line}</span>
            </div>
          </Reveal>
        </>
      ) : null}

      {/* ---------- The station ---------- */}
      <div className="relative flex justify-center">
        <span
          aria-hidden="true"
          className={cn(
            'absolute',
            live ? 'w-0.5' : 'w-px',
            first ? 'bottom-0 top-5 min-[760px]:top-8' : 'top-0',
            last ? 'h-5 min-[760px]:h-8' : !first && 'bottom-0'
          )}
          style={line}
        />

        {/* Connect wears a ring: not one more step, the step where the
            sequence changes kind. */}
        {hinge ? (
          <span
            aria-hidden="true"
            className="absolute -top-1.5 h-[52px] w-[52px] rounded-full border min-[760px]:-top-2 min-[760px]:h-20 min-[760px]:w-20"
            style={{borderColor: tint(tone, 34)}}
          />
        ) : null}

        <span
          className={cn(
            'relative grid h-10 w-10 place-items-center rounded-full border min-[760px]:h-16 min-[760px]:w-16',
            live ? TONE_TEXT[phase.tone] : 'text-muted'
          )}
          style={{
            borderColor: live ? tint(tone, 55) : 'var(--color-line-2)',
            background: hinge ? `color-mix(in srgb, ${tone} 12%, var(--color-bg))` : 'var(--color-bg)'
          }}
        >
          <Glyph name={step.glyph} className="h-5 w-5 min-[760px]:h-8 min-[760px]:w-8" />
        </span>
      </div>

      {/* ---------- The words, and the thing they describe ---------- */}
      <div className={cn(!last && 'pb-20 min-[760px]:pb-28')}>
        <div className="grid gap-8 min-[1080px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[1080px]:gap-14">
          <Reveal className="min-[760px]:pt-2">
            <span className="mono text-[11px] font-semibold tracking-[.16em] text-faint">
              STEP {step.index}
            </span>
            <h3 className="mt-3 font-display text-[clamp(25px,2.8vw,34px)] font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-ink">
              {step.name}
            </h3>
            <p className="mt-4 text-[16px] font-light leading-[1.65] text-muted">{step.lead}</p>
            <p
              className="mt-6 border-l-2 pl-4 text-[14.5px] leading-[1.55] text-ink/85"
              style={{borderColor: tint(tone, 55)}}
            >
              {step.reassurance}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            {children}
          </Reveal>
        </div>
      </div>
    </li>
  );
}
