import Counter from '../../../components/Counter';
import Reveal from '../../../components/Reveal';
import {Wrap} from '../../../components/ui';
import {TONE_TEXT} from '../../../data/command';
import type {StatusTone} from '../../../data/command';
import {LIVE, VERBS} from '../../../data/platform';
import {cn} from '../../../lib/cn';
import {LiveDot} from './Conduit';
import EnergyField from './EnergyField';

/**
 * One column per verb: what happens to a unit of electricity, what the system
 * is doing about it right now, and which object is doing it. The verbs come
 * from the platform's own vocabulary so they stay in step with every later
 * section; the readings come from the same live figures the background is
 * drawn from, so the two cannot disagree.
 */
const READINGS: Array<{
  verb: string;
  value: string;
  unit: string;
  name: string;
  tone: StatusTone;
}> = [
  {verb: VERBS[0], value: LIVE.solar.toFixed(1), unit: 'kW', name: 'Solar array', tone: 'amber'},
  {verb: VERBS[1], value: String(LIVE.charge), unit: '%', name: 'Battery', tone: 'purple'},
  {verb: VERBS[2], value: LIVE.home.toFixed(1), unit: 'kW', name: 'Home', tone: 'ink'},
  {verb: VERBS[3], value: LIVE.grid.toFixed(1), unit: 'kW', name: 'Grid', tone: 'blue'}
];

/**
 * Two words, one sentence, and the whole system behind them.
 *
 * The energy graph used to be a card under the headline. It is now the ground
 * the headline stands on — drawn across the full width in dotted line, at a
 * scale where the array, the house, the battery and the pylon are objects
 * rather than icons. That trade is worth making: a card is something a visitor
 * reads after the words, and a background is something they have already
 * understood by the time they finish reading them.
 *
 * What the card carried that the background cannot is the platform's voice, so
 * that survives as one line under the action — a live dot, a status and a
 * sentence. It is the smallest possible version of the thing, and it is still
 * the thing.
 *
 * `isolate` keeps the field's negative z-index inside the hero rather than
 * letting it slide under the page's own ground.
 */
export default function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      <EnergyField />

      <Wrap>
        <div className="mx-auto flex min-h-[86vh] max-w-[960px] flex-col justify-center py-24 text-center min-[760px]:min-h-[88vh]">
          <Reveal
            as="h1"
            className="font-display text-[clamp(54px,11vw,140px)] font-semibold uppercase leading-[0.86] tracking-[-0.022em] text-ink"
          >
            Energy,
            <br />
            <span className="text-brand-gradient">Understood.</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.06}
            className="mono mx-auto mt-8 text-[12.5px] font-medium uppercase tracking-[.22em] text-amber"
          >
            AI intelligence for every solar system
          </Reveal>

          <Reveal
            as="p"
            delay={0.12}
            className="mx-auto mt-7 max-w-[620px] text-[17px] font-light leading-[1.65] text-muted min-[760px]:text-[19px]"
          >
            From the first site assessment to everyday monitoring, Guardian Care connects your
            energy system, your team and your customer in one intelligent platform.
          </Reveal>

          <Reveal delay={0.18} className="mt-11">
            <a
              href="#journeys"
              className="inline-flex items-center gap-3 rounded-pill bg-[var(--cta)] px-9 py-[18px] text-[13px] font-bold uppercase tracking-[.1em] text-[var(--cta-ink)] shadow-[0_16px_40px_-16px_var(--btn-glow)] transition duration-250 ease-brand hover:-translate-y-0.5 hover:bg-[var(--cta-hover)] hover:shadow-[0_24px_54px_-18px_var(--btn-glow)]"
            >
              Explore Guardian Care →
            </a>
          </Reveal>

          {/* The platform, speaking. All that is left of the card, and the only
              part of it the background could not carry. */}
          <Reveal
            delay={0.24}
            className="mx-auto mt-12 flex max-w-[620px] flex-col items-center gap-3 rounded-frame border border-line-2 bg-bg/55 px-6 py-4 backdrop-blur-[6px] min-[680px]:flex-row min-[680px]:gap-5"
          >
            <span className="flex shrink-0 items-center gap-2.5">
              <LiveDot />
              <span className="mono whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[.16em] text-green">
                {LIVE.status}
              </span>
            </span>

            <span
              aria-hidden="true"
              className="hidden h-6 w-px shrink-0 bg-line-2 min-[680px]:block"
            />

            <span className="text-[14px] font-light leading-[1.5] text-muted min-[680px]:text-left">
              <span className="mono mr-2 text-[10px] font-semibold uppercase tracking-[.18em] text-amber">
                Guardian AI
              </span>
              {LIVE.ai}
            </span>
          </Reveal>

          {/* The four things that happen to a unit of electricity, each one
              carrying what the system is doing about it right now.

              This is where the readings live. They were SVG text beside each
              object in the background and they collided with the button and the
              status strip — the predictable result of putting two kinds of type
              in the same place. The drawing behind carries the objects; this
              carries the numbers, and the verb row it replaces is folded in
              rather than lost. */}
          <Reveal
            delay={0.3}
            className="mx-auto mt-14 grid w-full max-w-[680px] grid-cols-2 gap-x-6 gap-y-7 min-[620px]:grid-cols-4 min-[620px]:gap-x-4"
          >
            {READINGS.map((reading, index) => (
              <div key={reading.verb} className="relative">
                {/* The arrow between columns, on the row it belongs to. */}
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 top-1/2 hidden -translate-y-1/2 text-faint/40 min-[620px]:block"
                  >
                    →
                  </span>
                ) : null}

                <div className="mono text-[9.5px] font-semibold uppercase tracking-[.2em] text-faint">
                  {reading.verb}
                </div>
                <div
                  className={cn(
                    'mono mt-2 text-[19px] font-semibold leading-none min-[620px]:text-[21px]',
                    TONE_TEXT[reading.tone]
                  )}
                >
                  <Counter value={reading.value} />
                  <span
                    className={cn(
                      'mono font-normal text-faint',
                      reading.unit === '%' ? 'ml-px text-[11px]' : 'ml-1 text-[11px]'
                    )}
                  >
                    {reading.unit}
                  </span>
                </div>
                <div className="mono mt-2 text-[9.5px] uppercase tracking-[.14em] text-faint/80">
                  {reading.name}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Wrap>
    </header>
  );
}
