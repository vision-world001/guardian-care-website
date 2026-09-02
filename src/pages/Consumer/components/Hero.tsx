import Reveal from '../../../components/Reveal';
import {Eyebrow, Wrap} from '../../../components/ui';
import Glyph from './Glyph';
import SolarShine from './SolarShine';
import {LABEL, PAD_CARD, PANEL, PANEL_LIFT, R_TILE} from './ui';
import {CONCERNS} from '../../../data/consumerFlow';
import type {ConcernKey} from '../../../data/consumerFlow';
import {cn} from '../../../lib/cn';

/**
 * Their question, first.
 *
 * A homeowner does not arrive wanting to classify an inverter. They arrive
 * with one nagging question, so that question is already on screen in their
 * own words, and recognising it is the whole first step.
 *
 * Six choices in two columns rather than three. Three columns made each one a
 * small box in a grid of small boxes, which is the shape that reads as
 * generated; at two columns each question gets the width to be *read* rather
 * than scanned. Each one carries its own mark, because the eye finds a battery
 * or a bill before it finishes reading either word — and on the one screen
 * where somebody is hunting for their own problem among six, that is the
 * difference between scanning and working through a list.
 */
export default function Hero({
  concern,
  onSelect
}: {
  concern: ConcernKey | null;
  onSelect: (key: ConcernKey) => void;
}) {
  return (
    <header className="slide relative isolate overflow-hidden py-20 min-[760px]:py-24">
      <SolarShine />

      <Wrap>
        <div className="max-w-[720px]">
          <Reveal>
            <Eyebrow tone="blue" size="hero">
              For solar and battery owners
            </Eyebrow>
          </Reveal>

          <Reveal
            as="h1"
            delay={0.06}
            className="mb-7 font-display text-[clamp(42px,6.2vw,80px)] font-semibold uppercase leading-[0.94] tracking-[-0.015em]"
          >
            Take control of
            <br />
            the energy your
            <br />
            <span className="text-brand-gradient">home already makes.</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.12}
            className="max-w-[42ch] text-[clamp(17px,1.8vw,20px)] font-light leading-[1.55] text-muted"
          >
            Guardian Care reads your own system and explains it in plain words.
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-16">
          <div className={cn(LABEL, 'mb-6 text-faint')}>Which of these is your question?</div>

          <div className="grid grid-cols-1 gap-3 min-[760px]:grid-cols-2">
            {CONCERNS.map((option) => {
              const live = option.key === concern;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => onSelect(option.key)}
                  aria-pressed={live}
                  className={cn(
                    PANEL,
                    'group relative flex items-center gap-5 overflow-hidden text-left transition duration-300 ease-brand hover:-translate-y-1',
                    PAD_CARD,
                    live ? 'text-ink ring-2 ring-blue' : 'text-muted hover:text-ink'
                  )}
                  style={{boxShadow: live ? PANEL_LIFT : undefined}}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute inset-0 transition-opacity duration-300',
                      live ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                    )}
                    style={{
                      background:
                        'linear-gradient(150deg, color-mix(in srgb, var(--color-blue) 11%, transparent), transparent 60%)'
                    }}
                  />

                  <span
                    className={cn(
                      R_TILE,
                      'relative grid h-14 w-14 shrink-0 place-items-center transition-all duration-300 ease-brand',
                      live
                        ? 'bg-blue/12 text-blue'
                        : 'bg-ink/[0.04] text-faint group-hover:bg-blue/10 group-hover:text-blue'
                    )}
                  >
                    <Glyph name={option.key} className="h-8 w-8" />
                  </span>

                  <span className="relative flex-1 text-[clamp(17px,1.8vw,21px)] font-normal leading-[1.28] tracking-[-0.01em]">
                    {option.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      'relative shrink-0 text-[17px] transition-all duration-300 ease-brand',
                      live
                        ? 'translate-x-0 text-blue opacity-100'
                        : '-translate-x-2 text-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                    )}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </Wrap>
    </header>
  );
}
