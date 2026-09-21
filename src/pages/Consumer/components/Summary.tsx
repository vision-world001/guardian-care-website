import {Fragment} from 'react';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {NEXT_STEPS, type ExistingPosition} from '../../../data/consumer';
import {cn} from '../../../lib/cn';
import Conduit from '../../Home/components/Conduit';
import {Heading, LABEL, SECONDARY} from '../../../components/kit';
import SystemSummary from './steps/SystemSummary';

/**
 * The visitor's own summary — step 02, for real.
 *
 * Rendered by the same component that illustrated step 02, so what the page
 * promised is exactly what arrives. Beside it, the one observation the answers
 * support; beneath it, where this sits on the way to a dashboard. A result that
 * ends on a set of figures leaves the reader holding numbers; one that ends on
 * "you are here, and this is next" leaves them holding a direction.
 */
export default function Summary({position}: {position: ExistingPosition}) {
  const observation = observe(position);

  return (
    <Section id="summary" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Heading
          eyebrow="◇ Your initial system summary"
          title="Your system,"
          accent="at a glance."
          body="Built from your answers alone — a starting point, not a measurement. Every figure stays marked as an estimate until monitoring is connected."
        />

        <div className="grid gap-4 min-[1080px]:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="min-w-0">
            <SystemSummary
              position={position}
              title="Your system summary"
              caption="Once monitoring is connected, these estimates are replaced by what your system actually does."
            />
          </Reveal>

          {/* ---------- What the answers suggest ---------- */}
          <Reveal delay={0.08} className="glass shadow-lift ring-lit flex flex-col overflow-hidden rounded-frame">
            <div className="border-b border-line-2 px-6 py-4">
              <span className={cn(LABEL, 'text-amber')}>◇ Guardian AI · Initial observation</span>
            </div>
            <div className="flex-1 px-6 py-6">
              <p className="font-display text-[clamp(21px,2.4vw,26px)] font-medium uppercase leading-[1.14] text-ink">
                {observation.headline}
              </p>
              <p className="mt-4 text-[15px] font-light leading-[1.65] text-muted">{observation.body}</p>
            </div>
            <div className="border-t border-line-2 bg-bg/40 px-6 py-5">
              <div className={cn(LABEL, 'text-amber')}>What we recommend</div>
              <p className="mt-2.5 border-l-2 border-amber/50 pl-4 text-[15px] font-light leading-[1.6] text-ink/90">
                → {observation.next}
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---------- Where this sits on the way to a dashboard ---------- */}
        <Reveal delay={0.12} className="glass ring-lit mt-4 overflow-hidden rounded-frame">
          <div className="border-b border-line-2 px-6 py-4">
            <span className={cn(LABEL, 'text-faint')}>From here to your dashboard</span>
          </div>

          <ol className="grid gap-6 px-6 py-7 min-[900px]:grid-cols-[1fr_minmax(32px,72px)_1fr_minmax(32px,72px)_1fr] min-[900px]:items-center min-[900px]:gap-4">
            {NEXT_STEPS.map((step, index) => {
              const here = index === 0;

              return (
                <Fragment key={step.index}>
                  {index > 0 ? (
                    <li aria-hidden="true" className="hidden min-[900px]:block">
                      <Conduit direction="right" tone="green" delay={index * -0.9} />
                    </li>
                  ) : null}

                  <li className="flex items-start gap-4">
                    <span
                      className={cn(
                        'mono grid h-10 w-10 shrink-0 place-items-center rounded-full border text-[11px] font-semibold',
                        here ? 'border-green bg-green text-bg' : 'border-line-2 text-faint'
                      )}
                    >
                      {here ? '✓' : step.index}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[19px] font-semibold uppercase leading-none text-ink">
                        {step.name}
                      </span>
                      <span
                        className={cn(
                          'mt-1.5 block text-[13.5px] font-light leading-[1.45]',
                          here ? 'text-green' : 'text-muted'
                        )}
                      >
                        {step.line}
                      </span>
                    </span>
                  </li>
                </Fragment>
              );
            })}
          </ol>

          <div className="flex flex-wrap items-center gap-4 border-t border-line-2 bg-bg/40 px-6 py-5">
            <a href="#account" className={SECONDARY}>
              See what your dashboard shows ↑
            </a>
            <span className="text-[13.5px] font-light text-faint">
              Connecting monitoring is the step that turns every estimate above into a reading.
            </span>
          </div>
        </Reveal>
      </Wrap>
    </Section>
  );
}

/* ---------- What the answers add up to ---------- */

type Observation = {headline: string; body: string; next: string};

/**
 * The one paragraph the check exists to produce.
 *
 * Three cases rather than one generic sentence, because a household with no
 * storage, one whose battery still lets surplus go, and one that looks complete
 * on paper are not looking at the same question — and a page that tells them
 * all the same thing has told none of them anything.
 */
function observe(position: ExistingPosition): Observation {
  const buying = position.monthlyBill !== null && position.monthlyBill > 0;

  if (!position.hasBattery) {
    return {
      headline: 'Your system appears to generate without storage',
      body: buying
        ? 'Surplus that is not used in the home as it is made is exported. Your bill suggests the property still buys electricity from the grid — most likely in the evening, at a rate well above what those exported units earned.'
        : 'Surplus that is not used in the home as it is made is exported, rather than being held back for later in the day.',
      next: 'Measure when your solar is produced, how much of it your home uses, and how much leaves and re-enters through the grid. Until those are measured, whether storage would pay here is a guess.'
    };
  }

  if (position.exporting) {
    return {
      headline: 'You have storage, and surplus is still leaving the property',
      body: 'A battery that exports while it still has room is usually a timing question rather than a hardware one — charge settings made for a tariff that has since changed, or reserve the system does not need.',
      next: 'Measure when your battery charges, when it empties, and how that lines up with the hours your home actually uses electricity.'
    };
  }

  return {
    headline: 'You have generation and storage. The question is timing',
    body: 'On paper this is the complete setup. Whether it delivers depends on the battery filling from surplus rather than from the grid, and emptying into the hours you are at home.',
    next: 'Monitor generation, storage and grid import across a full day, so the system is judged on what it does rather than on what it contains.'
  };
}
