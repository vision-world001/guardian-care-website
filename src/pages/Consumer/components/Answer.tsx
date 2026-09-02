import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import Glyph from './Glyph';
import StepBack from './StepBack';
import StepField from './StepField';
import SystemIcon from './SystemIcons';
import {ACTION, LABEL, R_CARD, R_TILE, T_LEAD} from './ui';
import {CONCERNS, SYSTEMS} from '../../../data/consumerFlow';
import type {ConcernKey, SystemKey} from '../../../data/consumerFlow';
import {cn} from '../../../lib/cn';

/**
 * The answer to their question, and the one thing asked back.
 *
 * Rebuilt around what matters rather than around what fits. The previous
 * version set the answer and the list of checks as two columns of equal
 * weight, which gave the screen two focal points and let a supporting detail
 * shout as loudly as the thing the visitor actually clicked for. And the
 * action — the only way forward — sat unannounced at the bottom, with no
 * button visible at all until something had been chosen, so the page read as a
 * dead end to anybody who paused.
 *
 * Three tiers now, in the order they are wanted:
 *
 *   1. The answer.   Full width, largest type, nothing beside it competing.
 *   2. The evidence. Deliberately quiet — a plain two-column list on the page
 *      ground, no card, no shadow. It supports the answer; it is not a rival.
 *   3. The action.   Set apart by a heavier rule and real space rather than by
 *      a card. Four buttons and a submit do not need a container drawn around
 *      them to be understood as one zone, and a feature card there was more
 *      packaging than the thing it held. The button is present from the start,
 *      muted until a system is chosen, because a control that appears out of
 *      nowhere is a control nobody was waiting for.
 *
 * Nothing on this screen is raised. The ranking is carried by size, by space
 * and by two rules — which is enough, and leaves elevation meaning something
 * on the screen that follows.
 */
export default function Answer({
  concern,
  system,
  onSystem,
  onGenerate,
  onBack
}: {
  concern: ConcernKey;
  system: SystemKey | null;
  onSystem: (key: SystemKey) => void;
  onGenerate: () => void;
  onBack: () => void;
}) {
  const route = CONCERNS.find((item) => item.key === concern);
  if (!route) return null;

  return (
    <Section id="c-answer" className="slide relative isolate overflow-hidden">
      <StepField tone="blue" />

      <Wrap>
        <div key={route.key} className="animate-fadeup">
          <StepBack label="Choose a different question" onClick={onBack} />

          {/* 1 — the answer. */}
          <Reveal>
            <div className="mb-8 flex items-center gap-4 text-blue">
              <Glyph name={route.key} className="h-11 w-11" />
              <span className={cn(LABEL, 'text-blue')}>The short answer</span>
            </div>

            <h2 className={cn(T_LEAD, 'max-w-[16ch]')}>{route.heading}</h2>

            <p className="mt-7 max-w-[54ch] text-[clamp(17px,1.8vw,20px)] font-light leading-[1.6] text-muted">
              {route.body}
            </p>
          </Reveal>

          {/* 2 — the evidence, kept subordinate. */}
          <Reveal delay={0.06} className="mt-14 border-t border-line-2 pt-9">
            <div className={cn(LABEL, 'mb-6 text-faint')}>What Guardian Care would check</div>

            <ol className="m-0 grid list-none grid-cols-1 gap-x-14 p-0 min-[760px]:grid-cols-2">
              {route.checks.map((check, index) => (
                <li key={check} className="flex items-baseline gap-4 py-2.5">
                  <span className="mono shrink-0 text-[12px] text-green">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15.5px] font-light leading-[1.45] text-ink">{check}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* 3 — the action. The only raised surface on the screen. */}
          <Reveal delay={0.12} className="mt-14 border-t-2 border-ink/10 pt-10">
            <div className="grid grid-cols-1 gap-10 min-[1100px]:grid-cols-[minmax(0,1fr)_auto] min-[1100px]:items-end min-[1100px]:gap-16">
              <div>
                <div className={cn(LABEL, 'mb-6 text-faint')}>One thing — what do you have?</div>

                <div className="grid grid-cols-2 gap-3 min-[900px]:grid-cols-4">
                  {SYSTEMS.map((option) => {
                    const live = option.key === system;

                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => onSystem(option.key)}
                        aria-pressed={live}
                        className={cn(
                          R_CARD,
                          'group relative flex flex-col items-start gap-3.5 overflow-hidden px-4 py-4 text-left transition duration-250 ease-brand',
                          live
                            ? 'bg-green/[0.07] text-ink ring-2 ring-green'
                            : 'text-muted ring-1 ring-line-2 hover:-translate-y-0.5 hover:text-ink hover:ring-ink/25'
                        )}
                      >
                        <span
                          className={cn(
                            R_TILE,
                            'grid h-11 w-11 shrink-0 place-items-center transition-colors duration-250',
                            live ? 'bg-green text-bg' : 'bg-ink/[0.05] text-faint group-hover:text-ink'
                          )}
                        >
                          <SystemIcon system={option.key} />
                        </span>
                        <span className="text-[14.5px] font-medium leading-[1.25] tracking-[-0.01em]">
                          {option.short}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Present from the start, muted until it can be used. */}
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={onGenerate}
                  disabled={!system}
                  className={cn(
                    ACTION,
                    'w-full min-[1100px]:w-auto',
                    !system &&
                      'pointer-events-none bg-none bg-ink/10 text-faint shadow-none hover:translate-y-0'
                  )}
                >
                  {route.cta[0]}
                  <span aria-hidden="true">→</span>
                </button>

                {!system ? (
                  <p className="mt-3 text-center text-[13px] font-light text-faint min-[1100px]:text-right">
                    Pick one to continue
                  </p>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}
